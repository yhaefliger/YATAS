import { test, expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("index/home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // browsersync redirects to correct page so we have to wait
    await page.waitForLoadState("networkidle");
  });

  test("matches snapshot", async ({ page }) => {
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  });

  test("matches snapshot in dark mode", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should not have any automatically detectable accessibility issues in dark mode", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
