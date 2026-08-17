const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 20000,
  workers: 1,
  use: {
    trace: "off",
    screenshot: "off",
    video: "off",
  },
  projects: [
    {
      name: "chromium",
      testMatch: "e2e/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "a11y",
      testMatch: "a11y/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
