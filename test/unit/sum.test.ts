import { sum } from "../../src/sum.ts";
import { test, expect } from "vitest";

test("1+2=3", () => {
  expect(sum(1, 2)).toBe(3);
});
