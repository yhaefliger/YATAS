import { getFirstAndLast } from "./utils";
import { expect, test } from "@playwright/test";

test("returns first and last element", () => {
  const myElements = [1, 2, 3, 4, 5];
  const { first, last } = getFirstAndLast(myElements);

  expect(first).toBe(1);
  expect(last).toBe(5);
});
