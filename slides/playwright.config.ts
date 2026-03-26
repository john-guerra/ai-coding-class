import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:1948",
    viewport: { width: 960, height: 700 },
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  webServer: {
    command: "npx reveal-md . --port 1948",
    port: 1948,
    reuseExistingServer: true,
  },
});
