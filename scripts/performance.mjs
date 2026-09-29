import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";

const origin = process.env.AUDIT_ORIGIN || "http://127.0.0.1:3206";
const output = new URL("../qa/", import.meta.url);
const routes = [{ name: "home", path: "/" }, { name: "v01", path: "/builds/v01-grand-touring" }, { name: "gallery", path: "/gallery" }];
await fs.mkdir(output, { recursive: true });

// Warm only Next's image conversion cache; Lighthouse still performs a new page load.
const warmBrowser = await chromium.launch({ channel: "chrome" });
try {
  const page = await warmBrowser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  for (const route of routes) { await page.goto(origin + route.path); await page.locator("main img").first().evaluate(async (image) => { await image.decode(); }); }
} finally { await warmBrowser.close(); }

for (const route of routes) {
  const profile = new URL(`.profiles/${route.name}/`, output);
  await fs.mkdir(profile, { recursive: true });
  const chrome = await launch({ chromeFlags: ["--headless", "--no-sandbox"], userDataDir: fileURLToPath(profile) });
  try {
    const result = await lighthouse(origin + route.path, { port: chrome.port, output: ["json", "html"], onlyCategories: ["performance", "accessibility", "best-practices", "seo"] });
    if (!result || result.lhr.runtimeError) throw new Error(result?.lhr.runtimeError?.message || "Lighthouse returned no result");
    await fs.writeFile(new URL(`lighthouse-${route.name}-mobile.json`, output), result.report[0]);
    await fs.writeFile(new URL(`lighthouse-${route.name}-mobile.html`, output), result.report[1]);
    console.log(JSON.stringify({ route: route.path, scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([name, category]) => [name, Math.round(category.score * 100)])), metrics: Object.fromEntries(["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index"].map((key) => [key, result.lhr.audits[key].displayValue])) }));
  } finally { await chrome.kill(); }
}
