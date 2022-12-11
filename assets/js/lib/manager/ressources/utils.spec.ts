import {
  ressourceToSafeName,
  getByName,
  minMaxAveragePrice,
  addPriceHistory,
} from "./utils";
import { expect, test } from "@playwright/test";

test("ressourceToSafeName", () => {
  const ressourceName = "A Great Ressource";
  const actual = ressourceToSafeName(ressourceName);
  const expected = "a_great_ressource";

  expect(actual).toBe(expected);
});

test("getByName finds ressource", () => {
  const ressources = [
    { name: "A Great Ressource" },
    { name: "Another Ressource" },
  ];
  const actual = getByName({ ressources }, "A Great Ressource");
  const expected = { name: "A Great Ressource" };

  expect(actual).toEqual(expected);
});

test("getByName doesn't find ressource", () => {
  const ressources = [
    { name: "A Great Ressource" },
    { name: "Another Ressource" },
  ];
  const actual = getByName({ ressources }, "This Ressource Doesn't Exist");
  const expected = undefined;

  expect(actual).toEqual(expected);
});

test("minMaxAveragePrice", () => {
  const priceHistory = [{ value: 10 }, { value: 20 }, { value: 30 }];
  const actual = minMaxAveragePrice(priceHistory);
  const expected = { min: 10, max: 30, average: 20 };

  expect(actual).toEqual(expected);
});

test("addPriceHistory", () => {
  const store = {
    ressources: [
      { name: "A Great Ressource", priceHistory: [] },
      { name: "Another Ressource" },
    ],
  };
  const actual = addPriceHistory(store, "A Great Ressource", { value: 10 });
  const expected = [
    {
      name: "A Great Ressource",
      priceHistory: [{ value: 10 }],
      min: 10,
      max: 10,
      average: 10,
    },
    { name: "Another Ressource" },
  ];

  expect(actual).toEqual(expected);
});
