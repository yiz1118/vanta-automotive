import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "icons.spec.ts",
  outputDir: "./test-results-icons",
  timeout: 90_000,
  expect: { timeout: 12_000 },
  workers: 2,
  reporter: [["list"], ["json", { outputFile: "qa/icons-browser-results.json" }]],
  use: { baseURL: "http://127.0.0.1:3206", trace: "retain-on-failure" },
  projects: [
    { name: "chrome", use: { ...devices["Desktop Chrome"], channel: "chrome" } },
    { name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge" } },
    { name: "webkit", use: { ...devices["Desktop Safari"], browserName: "webkit" } },
  ],
  webServer: { command: "npm run start -- -p 3206", url: "http://127.0.0.1:3206", reuseExistingServer: !process.env.CI, timeout: 90_000 },
});
