import { expect, test } from "@playwright/test";

const routes = ["/", "/builds", "/builds/v01-grand-touring", "/builds/v02-touring-sport", "/builds/v03-lightweight", "/services", "/engineering", "/gallery", "/about", "/enquiry"];

test("scroll reveals finish once, including the image shutter and specification group", async ({ page }) => {
  await page.goto("/");
  const photograph = page.locator(".featured-section .reveal-image");
  await expect(photograph).toHaveClass(/reveal-ready/);
  await expect(photograph).not.toHaveClass(/is-visible/);
  await photograph.scrollIntoViewIfNeeded();
  await expect(photograph).toHaveClass(/is-visible/);
  await expect.poll(() => photograph.evaluate(node => getComputedStyle(node, "::after").transform)).toBe("matrix(0, 0, 0, 1, 0, 0)");
  const specs = page.locator(".feature-specs");
  await specs.scrollIntoViewIfNeeded();
  await expect(specs).toHaveClass(/is-visible/);
  for (const value of await specs.locator("strong").all()) await expect(value).toBeVisible();
  const before = await specs.locator("strong").allTextContents();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(photograph).toHaveClass(/is-visible/);
  await expect(specs.locator("strong")).toHaveText(before);
});

test("keyboard focus exposes pending content immediately", async ({ page }) => {
  await page.goto("/");
  const heading = page.locator(".lineup-section .section-heading");
  await expect(heading).toHaveClass(/reveal-ready/);
  await heading.getByRole("link").focus();
  await expect(heading).toHaveClass(/is-visible/);
  await expect(heading.getByRole("link")).toBeFocused();
});

test("reduced motion responds live and removes reveals and hover displacement", async ({ page }) => {
  await page.goto("/");
  const image = page.locator(".featured-section .reveal-image");
  await expect(image).toHaveClass(/reveal-ready/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(image).toHaveClass(/is-visible/);
  await expect(image).toHaveCSS("opacity", "1");
  await expect(image).toHaveCSS("transform", "none");
  expect(await image.evaluate(node => getComputedStyle(node, "::after").display)).toBe("none");
  await page.getByRole("link", { name: "Discuss your build" }).hover();
  await expect(page.locator(".hero-actions .button-primary")).toHaveCSS("transform", "none");
  await expect(page.locator(".home-hero h1")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".media-frame img").first()).toHaveCSS("transition-duration", "0s");
});

test("content remains available without JavaScript or IntersectionObserver", async ({ browser }) => {
  for (const javaScriptEnabled of [false, true]) {
    const context = await browser.newContext({ javaScriptEnabled });
    if (javaScriptEnabled) await context.addInitScript("window.IntersectionObserver = undefined");
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const frame = page.locator(".featured-section .media-frame");
    await expect(frame).not.toHaveClass(/reveal-ready/);
    await expect(frame).toHaveCSS("opacity", "1");
    expect(await frame.evaluate(node => getComputedStyle(node, "::after").transform)).toBe("matrix(0, 0, 0, 1, 0, 0)");
    await expect(page.locator(".feature-specs")).toContainText("612");
    await context.close();
  }
});

test("mobile menu responds immediately, closes safely and marks the active route", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/builds/v01-grand-touring");
  const menu = page.locator("#mobile-navigation");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  const nav = page.getByRole("navigation", { name: "Mobile primary" });
  await expect(nav.getByRole("link", { name: /Builds/ })).toHaveAttribute("aria-current", "page");
  await expect(nav.getByRole("link", { name: /Builds/ })).toBeFocused();
  await nav.getByRole("link", { name: /Gallery/ }).click();
  await expect(page).toHaveURL(/\/gallery$/);
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toHaveAttribute("inert", "");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeFocused();
  await expect(menu).toHaveCSS("visibility", "hidden");
});

test("hover feedback does not change link geometry", async ({ page }) => {
  await page.goto("/");
  await page.locator(".intro-grid").scrollIntoViewIfNeeded();
  await expect(page.locator(".intro-grid")).toHaveCSS("opacity", "1");
  for (const link of [page.locator(".intro-section .text-link"), page.locator(".home-service-list a").first()]) {
    await link.scrollIntoViewIfNeeded();
    const before = await link.boundingBox();
    await link.hover();
    await expect.poll(async () => {
      const after = await link.boundingBox();
      return Math.abs(after!.width - before!.width) + Math.abs(after!.height - before!.height);
    }).toBeLessThan(.1);
  }
});

test("all pages are stable and free of overflow at the requested widths", async ({ browser }) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  for (const width of [375, 390, 430, 768, 1024, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    for (const route of routes) {
      // Isolated documents avoid carrying pending prefetches between routes.
      const page = await context.newPage();
      page.on("pageerror", error => errors.push(`${route}: ${error.message}`));
      page.on("console", message => { if (message.type() === "error") errors.push(`${route}: ${message.text()}`); });
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished)));
      expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1), `${route} at ${width}px`).toBe(false);
      // Closing a document cancels background fetches; it is not a site error.
      page.removeAllListeners("console");
      page.removeAllListeners("pageerror");
      await page.close();
    }
    await context.close();
  }
  expect(errors).toEqual([]);
});
