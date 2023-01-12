import { test, expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("vacation page without params", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("vacation");
    // browsersync redirects to correct page so we have to wait
    await page.waitForLoadState("networkidle");
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("can enter vacation date", async ({ page }) => {
    await page.getByTestId("vacationDate").fill("2000-01-01");
    await page.getByTestId("submitButton").click();
    expect(await page.getByTestId("result").innerText()).toContain(
      "?date=2000-01-01"
    );
  });
});

test.describe("vacation page with params", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("vacation?date=01-01-2000");
    // browsersync redirects to correct page so we have to wait
    await page.waitForLoadState("networkidle");
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("can click new vacation date button", async ({ page }) => {
    await page.getByTestId("newVacation").click();
    await expect(page.getByTestId("vacationForm")).toBeVisible();
  });
});
