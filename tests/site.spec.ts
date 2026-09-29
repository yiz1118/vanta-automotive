import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/builds", "/builds/v01-grand-touring", "/builds/v02-touring-sport", "/builds/v03-lightweight", "/services", "/engineering", "/gallery", "/about", "/enquiry"];

test("all routes render, images load, and no page errors occur", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(`${message.location().url}: ${message.text()}`); });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("main")).not.toContainText("<br");
    await expect(page.getByText("Concept Project").first()).toBeVisible();
    const sources = await page.locator("img[src]").evaluateAll((images) => [...new Set(images.map((image) => image.getAttribute("src")!).filter(Boolean))]);
    const failed = (await Promise.all(sources.map(async (source) => ({ source, status: (await page.request.get(source)).status() })))).filter((item) => item.status !== 200);
    expect(failed, `broken images on ${route}`).toEqual([]);
  }
  expect(errors).toEqual([]);
  await page.goto("/builds/unknown-build");
  await expect(page.getByRole("heading", { name: /That road ends here/i })).toBeVisible();
});

test("header navigation and contextual vehicle links work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Builds" }).click();
  await expect(page).toHaveURL(/\/builds$/);
  await page.getByRole("link", { name: /Grand Touring/i }).first().click();
  await expect(page).toHaveURL(/v01-grand-touring/);
  await expect(page.locator("#specifications")).toContainText("612");
  await page.getByRole("link", { name: /Discuss this build/i }).click();
  await expect(page.locator("#vehicle")).toHaveValue("v01-grand-touring");
});

test("inspection tabs and hotspots work with pointer and keyboard", async ({ page }) => {
  await page.goto("/builds/v01-grand-touring");
  const inspection = page.getByTestId("inspection");
  await inspection.getByRole("tab", { name: "Interior" }).click();
  await expect(inspection.getByRole("heading", { name: "Built around the driver." })).toBeVisible();
  await inspection.getByRole("button", { name: "Inspect Material junction" }).click();
  await expect(inspection.getByRole("button", { name: /Material junction/ }).last()).toHaveAttribute("aria-pressed", "true");
  await inspection.getByRole("tab", { name: "Interior" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(inspection.getByRole("tab", { name: "Performance" })).toHaveAttribute("aria-selected", "true");
});

test("every vehicle inspection section renders and keeps annotations on its image", async ({ page }) => {
  for (const route of routes.filter((route) => route.startsWith("/builds/"))) {
    await page.goto(route);
    const inspection = page.getByTestId("inspection");
    for (const section of ["Exterior", "Interior", "Performance", "Suspension", "Exhaust"]) {
      await inspection.getByRole("tab", { name: section, exact: true }).click();
      await expect(inspection.getByRole("tabpanel")).toContainText("Concept study");
      await inspection.locator(".media-frame img").evaluate((image: HTMLImageElement) => image.decode());
      const imageBounds = await inspection.locator(".media-frame").boundingBox();
      for (const point of await inspection.locator(".hotspot").all()) {
        const bounds = await point.boundingBox();
        expect(bounds!.y + bounds!.height / 2).toBeLessThan(imageBounds!.y + imageBounds!.height);
      }
    }
  }
});

test("services link to related studies and preselect their enquiry context", async ({ page }) => {
  await page.goto("/services");
  await expect(page.locator(".service-example")).toHaveCount(7);
  await page.locator("#suspension").getByRole("link", { name: /Related study/ }).click();
  await expect(page).toHaveURL(/v03-lightweight$/);
  await page.goto("/services");
  await page.locator("#interior").getByRole("link", { name: "Discuss interior" }).click();
  await expect(page.getByRole("checkbox", { name: "Interior" })).toBeChecked();
  await page.goto("/enquiry?vehicle=unknown&service=unknown");
  await expect(page.locator("#vehicle")).toHaveValue("");
  await expect(page.locator('input[type="checkbox"]:checked')).toHaveCount(0);
});

test("comparison supports keyboard endpoints and reset", async ({ page }) => {
  await page.goto("/");
  const slider = page.getByRole("slider", { name: "Reveal before or after concept image" });
  await slider.fill("0");
  await expect(slider).toHaveValue("0");
  await slider.fill("100");
  await slider.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(slider).toHaveValue("99");
  await page.getByRole("button", { name: "Reset 50/50" }).click();
  await expect(slider).toHaveValue("50");
  const image = page.locator(".compare-images");
  await image.scrollIntoViewIfNeeded();
  const bounds = await image.boundingBox();
  await page.mouse.move(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds!.x + bounds!.width * .75, bounds!.y + bounds!.height / 2, { steps: 4 });
  await page.mouse.up();
  expect(Number(await slider.inputValue())).toBeGreaterThan(70);
});

test("gallery filters and lightbox keyboard controls work", async ({ page }) => {
  await page.goto("/gallery");
  await page.getByRole("button", { name: /Interior/ }).first().click();
  await expect(page.locator(".gallery-tile")).toHaveCount(3);
  const opener = page.getByRole("button", { name: /Open V01 \/ Cabin/ });
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog")).toContainText("V02 / Touring cabin");
  await page.getByRole("button", { name: "Next image" }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: /Close/ })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test("enquiry validates, reviews, edits and completes without submission", async ({ page }) => {
  const outbound: string[] = [];
  page.on("request", (request) => { if (request.method() !== "GET") outbound.push(`${request.method()} ${request.url()}`); });
  await page.goto("/enquiry?vehicle=v02-touring-sport&service=suspension");
  await expect(page.locator("#vehicle")).toHaveValue("v02-touring-sport");
  await expect(page.getByRole("checkbox", { name: /Suspension/ })).toBeChecked();
  await page.getByRole("button", { name: "Review enquiry" }).click();
  await expect(page.locator(".error-summary")).toContainText("Enter your name");
  await page.locator("#name").fill("Alex Driver");
  await page.locator("#email").fill("invalid-address");
  await page.getByRole("button", { name: "Review enquiry" }).click();
  await expect(page.locator("#email-error")).toHaveText("Enter a valid email address.");
  await page.locator("#email").fill("alex@example.com");
  await page.locator("#budget").selectOption("Focused upgrade");
  await page.locator("#brief").fill("I would like more steering feel and a composed ride on long journeys.");
  await page.getByRole("button", { name: "Review enquiry" }).click();
  await expect(page.getByRole("heading", { name: "Review your enquiry." })).toBeVisible();
  await expect(page.locator(".form-review")).toContainText("Alex Driver");
  await page.getByRole("button", { name: "Edit details" }).click();
  await expect(page.locator("#brief")).toHaveValue(/composed ride/);
  await page.getByRole("button", { name: "Review enquiry" }).click();
  await page.getByRole("button", { name: "Complete demo" }).click();
  await expect(page.getByText(/No enquiry was sent or stored/)).toBeVisible();
  expect(outbound).toEqual([]);
});

test("mobile navigation, overflow and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/builds/v01-grand-touring", "/gallery", "/enquiry"]) {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow, `horizontal overflow on ${route}`).toBe(false);
  }
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile primary" }).getByRole("link", { name: /About/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  await page.goto("/");
  const transitionSeconds = await page.locator(".media-frame img").first().evaluate((image) => parseFloat(getComputedStyle(image).transitionDuration));
  expect(transitionSeconds).toBeLessThan(.01);
});

test("touch inspection and comparison remain usable", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto("/builds/v01-grand-touring");
  const inspection = page.getByTestId("inspection");
  await inspection.getByRole("tab", { name: "Suspension" }).tap();
  await expect(inspection.getByRole("tab", { name: "Suspension" })).toHaveAttribute("aria-selected", "true");
  await inspection.getByRole("button", { name: "Inspect Brake system" }).tap();
  await expect(inspection.getByRole("button", { name: "Inspect Brake system" })).toHaveAttribute("aria-pressed", "true");
  await page.goto("/");
  const slider = page.getByRole("slider", { name: "Reveal before or after concept image" });
  await slider.scrollIntoViewIfNeeded();
  const box = await slider.boundingBox();
  expect(box).not.toBeNull();
  await page.touchscreen.tap(box!.x + box!.width * .8, box!.y + box!.height / 2);
  expect(Number(await slider.inputValue())).toBeGreaterThan(50);
  const image = page.locator(".compare-images");
  await image.scrollIntoViewIfNeeded();
  const imageBounds = await image.boundingBox();
  await page.touchscreen.tap(imageBounds!.x + imageBounds!.width * .3, imageBounds!.y + imageBounds!.height / 2);
  expect(Number(await slider.inputValue())).toBeLessThan(40);
  await context.close();
});

test("responsive breakpoint matrix has no horizontal overflow", async ({ page }) => {
  for (const viewport of [{ width: 360, height: 780 }, { width: 768, height: 1024 }, { width: 844, height: 390 }, { width: 901, height: 900 }, { width: 1180, height: 900 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator(".concept-label")).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(overflow, `${route} at ${viewport.width}×${viewport.height}`).toBe(false);
    }
  }
});

for (const route of ["/", "/builds", "/builds/v01-grand-touring", "/services", "/engineering", "/gallery", "/about", "/enquiry"]) {
  test(`axe accessibility: ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((violation) => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.map((node) => node.target) }))).toEqual([]);
  });
}

test("portfolio screenshots", async ({ page }) => {
  async function loadPageImages() {
    for (const reveal of await page.locator(".reveal").all()) {
      await reveal.scrollIntoViewIfNeeded();
      await expect(reveal).toHaveClass(/is-visible/);
      await expect(reveal).toHaveCSS("opacity", "1");
    }
    const images = page.locator("main img");
    for (let index = 0; index < await images.count(); index++) {
      await images.nth(index).scrollIntoViewIfNeeded();
      await images.nth(index).evaluate((image: HTMLImageElement) => image.decode());
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.evaluate(() => document.fonts.ready);
  }
  await page.goto("/");
  await loadPageImages();
  await page.screenshot({ path: "screenshots/home-hero-desktop.png" });
  await page.screenshot({ path: "screenshots/home-full-desktop.png", fullPage: true });
  await page.goto("/builds/v01-grand-touring");
  await loadPageImages();
  await page.screenshot({ path: "screenshots/vehicle-overview-desktop.png" });
  await page.locator("#specifications").screenshot({ path: "screenshots/vehicle-specs-desktop.png" });
  await page.getByTestId("inspection").screenshot({ path: "screenshots/build-inspection-desktop.png" });
  await page.goto("/gallery");
  await loadPageImages();
  await page.screenshot({ path: "screenshots/gallery-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await loadPageImages();
  await page.screenshot({ path: "screenshots/home-mobile.png" });
  await page.goto("/builds/v01-grand-touring");
  await loadPageImages();
  await page.screenshot({ path: "screenshots/vehicle-mobile.png", fullPage: true });
  await page.goto("/enquiry");
  await page.screenshot({ path: "screenshots/enquiry-mobile.png", fullPage: true });
});
