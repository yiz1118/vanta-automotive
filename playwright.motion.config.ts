import { defineConfig, devices } from "@playwright/test";
import base from "./playwright.config";

export default defineConfig({
  ...base,
  use: { baseURL: "http://127.0.0.1:3206", trace: "retain-on-failure" },
  testMatch: "motion.spec.ts",
  outputDir: "test-results-motion",
  reporter: [["list"], ["json", { outputFile: "qa/motion-browser-results.json" }]],
  projects: [
    { name: "chrome", use: { ...devices["Desktop Chrome"], channel: "chrome" } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
