import { test, expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { initialRessources } from "../assets/js/lib/manager/ressources";

test.describe.parallel("manager", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("manager");
    // browsersync redirects to correct page so we have to wait
    await page.waitForLoadState("networkidle");
  });

  test("has correct title", async ({ page }) => {
    expect(await page.title()).toContain("Space Haven Manager");
  });

  test("index matches snapshot", async ({ page }) => {
    // TODO: as we don't have a custom font enabled for manager yet, this looks different on all machines...
    expect(await page.screenshot()).toMatchSnapshot();
  });

  // https://playwright.dev/docs/accessibility-testing
  test("should not have any automatically detectable accessibility issues on the index", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should not have any automatically detectable accessibility issues on the modal", async ({
    page,
  }) => {
    await activateRessource(page, "Infra Block");
    await openPriceHistoryModal(page, "Infra Block");
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("shows all ressources in addable list", async ({ page }) => {
    await page.click("data-testid=toggleRessourceVisibility");

    const ressources = await page.$$(
      "ul.ressources > li.ressources__item.ressources__item--change"
    );

    expect(ressources.length).toBe(initialRessources.length);
  });

  test("can add a new ressource to watch list", async ({ page }) => {
    await activateRessource(page, "Energium");

    const visibleRessources = await page.$$(
      "ul.ressources > li.ressources__item"
    );

    await expect(
      page.locator("ul.ressources li.ressources__item", {
        hasText: "Energium",
      })
    ).toBeVisible();
    // "toggleRessourceVisibility" button has to be subtracted from the count
    expect(visibleRessources.length - 1).toBe(1);
    expect(await page.screenshot()).toMatchSnapshot();
  });

  test("can open modal for empty price history", async ({ page }) => {
    await activateRessource(page, "Energium");
    await openPriceHistoryModal(page, "Energium");
    await expect(page.locator(".modal")).toBeVisible();
    await expect(page.locator(".modal")).toContainText("Energium");
    await expect(page.locator(".modal")).toContainText(
      "no data for graph.. yet"
    );
    // TODO: why doesn't this work on safari?
    // await expect(page.locator(`.modal #number_input`)).toBeFocused();
  });

  test("can enter price history value", async ({ page }) => {
    await activateRessource(page, "Energium");

    await addPriceHistoryEntry(page, "Energium", 90);
    await addPriceHistoryEntry(page, "Energium", 140);

    const priceInfos = page
      .locator("li.ressources__item", {
        hasText: "Energium",
      })
      .locator(".ressources__item__priceinfo");
    await expect(priceInfos).toContainText("90");
    await expect(priceInfos).toContainText("140");
    await expect(priceInfos).toContainText("115");
    // TODO: the diameter sign looks different on all machines...
    expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixels: 1600 });
  });

  test("can clear storage", async ({ page }) => {
    await activateRessource(page, "Energium");
    await addPriceHistoryEntry(page, "Energium", 90);
    await addPriceHistoryEntry(page, "Energium", 140);
    await page.click("data-testid=toggleSettingsMenu");
    await page.click("data-testid=clearStorage");

    await expect(
      page.locator(".ressources__item", { hasText: "Energium" })
    ).not.toBeVisible();
  });

  // this test ist flaky right now, probably because we're adding too many priceHistoryEntries at once
  /* test("can see price history with multiple entries", async ({ page }) => {
    await activateRessource(page, "Energium");
    await addPriceHistoryEntry(page, "Energium", 90);
    await addPriceHistoryEntry(page, "Energium", 102);
    await addPriceHistoryEntry(page, "Energium", 87);
    await addPriceHistoryEntry(page, "Energium", 140);
    await addPriceHistoryEntry(page, "Energium", 168);
    await openPriceHistoryModal(page, "Energium");

    // price history values (top bar)
    expect(page.locator(".modal")).toContainText("168");
    expect(page.locator(".modal")).toContainText("87");
    expect(page.locator(".modal")).toContainText("117");
    expect(await page.screenshot()).toMatchSnapshot();
  }); */

  const activateRessource = async (page: Page, ressourceName: string) => {
    await page.click("data-testid=toggleRessourceVisibility");
    await page
      .locator(".ressources__item.ressources__item--change", {
        hasText: ressourceName,
      })
      .click();
    await page.click("data-testid=toggleRessourceVisibility");
  };

  const openPriceHistoryModal = async (page: Page, ressourceName: string) => {
    await page
      .locator("li.ressources__item", { hasText: ressourceName })
      .click();
    await page.waitForSelector(".modal");
  };

  const addPriceHistoryEntry = async (
    page: Page,
    ressourceName: string,
    price: number
  ) => {
    await openPriceHistoryModal(page, ressourceName);
    await page.fill(".modal #number_input", price.toString());
    await page.click(".modal form button");
    await page.waitForSelector(".modal", { state: "hidden" });
  };
});
