import { test, expect, Page } from "@playwright/test";

test.use({ browserName: "chromium" });

test.describe("print cv page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("cv");
    // browsersync redirects to correct page so we have to wait
    await page.waitForLoadState("networkidle");
  });

  test("print to pdf", async ({ page }) => {
    await page.pdf({ path: "./_site/cv/cv_fschoenfeldt.pdf", format: "A4" });
  });
});
