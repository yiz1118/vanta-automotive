import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/builds", "/builds/v01-grand-touring", "/builds/v02-touring-sport", "/builds/v03-lightweight", "/services", "/engineering", "/gallery", "/about", "/enquiry"];

test("every page credits its independent creator without mixing the build enquiry", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const creator = page.getByRole("region", { name: "Alson Chua" });
    await expect(creator).toContainText("Independent Concept Project");
    await expect(creator).toContainText("Designed & developed by");
    await expect(creator).toContainText("Independent Web & App Developer");
    await expect(creator).toContainText("Malaysia · Working with clients worldwide");
    await expect(creator).toContainText("Available for freelance projects worldwide");
    await expect(creator.getByText("View Portfolio", { exact: true })).toHaveCount(0);
    await expect(page.locator(".footer-cta")).toHaveAttribute("href", "/enquiry");
  }
});

test("start project offers keyboard-accessible email and WhatsApp with project context", async ({ page }) => {
  await page.goto("/");
  const creator = page.getByRole("region", { name: "Alson Chua" });
  const disclosure = creator.locator("details");
  const trigger = disclosure.locator("summary");
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(disclosure).toHaveAttribute("open", "");
  const choices = creator.getByRole("group", { name: "Choose a contact method" });
  const email = choices.getByRole("link", { name: /Email/ });
  const whatsapp = choices.getByRole("link", { name: /WhatsApp/ });
  await expect(email).toBeVisible();
  await expect(whatsapp).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(email).toBeFocused();
  const mail = new URL((await email.getAttribute("href"))!);
  expect(mail.protocol).toBe("mailto:");
  expect(mail.pathname).toBe("alsonchua18@gmail.com");
  expect(mail.searchParams.get("subject")).toBe("Project Inquiry — VANTA Motorworks");
  expect(mail.searchParams.get("body")).toContain("Hi Alson,");
  expect(mail.searchParams.get("body")).toContain("VANTA Motorworks concept project");
  const wa = new URL((await whatsapp.getAttribute("href"))!);
  expect(wa.origin + wa.pathname).toBe("https://wa.me/601158576386");
  expect(wa.searchParams.get("text")).toBe("Hi Alson, I came across your VANTA Motorworks concept project and I'm interested in discussing a website/app project with you.");
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(disclosure).not.toHaveAttribute("open");
});

test("creator contact links are safe, labeled and identifiable for future analytics", async ({ page }) => {
  await page.goto("/");
  const creator = page.getByRole("region", { name: "Alson Chua" });
  await expect(creator.locator('[data-creator-event="start_project"]')).toContainText("Start a Project");
  await expect(creator.locator('[data-creator-event="linkedin"]')).toHaveAttribute("href", "https://www.linkedin.com/in/chua-yiz-063ba9272");
  await expect(creator.locator('[data-creator-event="github"]')).toHaveAttribute("href", "https://github.com/yiz1118");
  const contacts = creator.getByRole("navigation", { name: "Creator contact" });
  await expect(contacts.getByRole("link")).toHaveCount(4);
  await expect(contacts).toContainText("alsonchua18@gmail.com");
  await expect(contacts).toContainText("+60 11-5857 6386");
  for (const external of await creator.locator('a[href^="https://"]').all()) {
    await expect(external).toHaveAttribute("target", "_blank");
    await expect(external).toHaveAttribute("rel", "noopener noreferrer");
  }
  for (const icon of await creator.locator("svg").all()) {
    await expect(icon).toHaveAttribute("stroke", "currentColor");
    await expect(icon).toHaveAttribute("aria-hidden", "true");
  }
  await expect(creator).not.toContainText(/[\u2190-\u21ff\u2600-\u27bf\ufe0e\ufe0f]/u);
  await expect(creator.locator('a[href="#"], a[href^="javascript:"], [data-creator-event="portfolio"]')).toHaveCount(0);
  const accessibility = await new AxeBuilder({ page }).include(".creator-layer").analyze();
  expect(accessibility.violations).toEqual([]);
});

test("creator section fits every requested width and keeps contact targets usable", async ({ browser }) => {
  for (const width of [375, 390, 430, 768, 1024, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width < 900, isMobile: width < 900 });
    const page = await context.newPage();
    await page.goto("/");
    const creator = page.getByRole("region", { name: "Alson Chua" });
    await creator.scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    const trigger = creator.locator("summary");
    if (width < 900) await trigger.tap(); else await trigger.click();
    for (const control of await creator.locator("a, summary").all()) {
      const bounds = await control.boundingBox();
      expect(bounds!.height).toBeGreaterThanOrEqual(44);
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBe(false);
    await creator.screenshot({ path: `screenshots/creator-${width}.png` });
    await context.close();
  }
});
