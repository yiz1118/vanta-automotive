import { expect, test } from "@playwright/test";

const routes = ["/", "/builds", "/builds/v01-grand-touring", "/builds/v02-touring-sport", "/builds/v03-lightweight", "/services", "/engineering", "/gallery", "/about", "/enquiry"];
const textIcons = /[\u2190-\u21ff\u2600-\u27bf\ufe0e\ufe0f]/u;

test("interface icons cannot fall back to platform emoji glyphs", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("body")).not.toContainText(textIcons);
    const icons = page.locator("svg.ui-icon");
    expect(await icons.count(), `SVG action icons on ${route}`).toBeGreaterThan(0);
    for (const icon of await icons.all()) {
      await expect(icon).toHaveAttribute("aria-hidden", "true");
      await expect(icon).toHaveAttribute("stroke", "currentColor");
      await expect(icon).toHaveAttribute("fill", "none");
    }
  }
});

test("navigation keeps its geometry and inherits monochrome color at requested widths", async ({ browser }, testInfo) => {
  for (const width of [375, 390, 430, 768, 1024, 1440]) {
    const mobile = width <= 900;
    const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: mobile, isMobile: mobile });
    const page = await context.newPage();
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    if (mobile) await page.getByRole("button", { name: "Menu", exact: true }).tap();
    const icons = page.locator(mobile ? ".mobile-menu nav a svg" : ".header-enquiry svg");
    await expect(icons).toHaveCount(mobile ? 6 : 1);
    await expect(icons.first()).toBeVisible();
    const metrics = await page.evaluate(() => ({
      headerHeight: document.querySelector(".header-inner")!.getBoundingClientRect().height,
      rowHeights: Array.from(document.querySelectorAll(".mobile-menu nav a"), (row) => row.getBoundingClientRect().height),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    }));
    expect(metrics.headerHeight).toBe(width <= 700 ? 70 : 82);
    expect(metrics.overflow).toBe(false);
    if (mobile) expect(metrics.rowHeights).toEqual([58, 58, 58, 58, 58, 58]);
    for (const icon of await icons.all()) {
      const color = await icon.evaluate((svg) => ({ stroke: getComputedStyle(svg).stroke, inherited: getComputedStyle(svg.parentElement!).color, background: getComputedStyle(svg).backgroundColor }));
      expect(color.stroke).toBe(color.inherited);
      expect(color.background).toBe("rgba(0, 0, 0, 0)");
    }
    if (testInfo.project.name) await page.screenshot({ path: `screenshots/icons-${testInfo.project.name}-${width}.png` });
    if (mobile) {
      const row = page.getByRole("navigation", { name: "Mobile primary" }).getByRole("link", { name: /Builds/ });
      const bounds = await row.boundingBox();
      await page.touchscreen.tap(bounds!.x + bounds!.width - 15, bounds!.y + bounds!.height / 2);
      await expect(page).toHaveURL(/\/builds$/);
    } else {
      const link = page.locator(".header-enquiry");
      await link.hover();
      await expect(link).toHaveCSS("background-color", "rgb(197, 133, 96)");
      const color = await icons.first().evaluate((svg) => ({ stroke: getComputedStyle(svg).stroke, inherited: getComputedStyle(svg.parentElement!).color }));
      expect(color.stroke).toBe(color.inherited);
      await link.click();
      await expect(page).toHaveURL(/\/enquiry$/);
    }
    await context.close();
  }
});

test("gallery SVG controls retain navigation and close behavior", async ({ page }) => {
  await page.goto("/gallery");
  await page.getByRole("button", { name: "Open V01 / Form and intent", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const initialTitle = await dialog.locator("h2").textContent();
  await page.getByRole("button", { name: "Next image" }).click();
  await expect(dialog.locator("h2")).not.toHaveText(initialTitle!);
  await page.getByRole("button", { name: "Previous image" }).click();
  await expect(dialog.locator("h2")).toHaveText(initialTitle!);
  await expect(dialog).not.toContainText(textIcons);
  await expect(dialog.locator("svg.ui-icon")).toHaveCount(3);
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await expect(dialog).not.toBeVisible();
});
