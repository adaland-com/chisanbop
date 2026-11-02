
import { describe, it, expect } from "vitest";
import testCases from "../data/operations/addition-tests.json";

function addChisanbop(a: number, b: number) {
  const tensA = Math.floor(a / 10);
  const unitsA = a % 10;

  const tensB = Math.floor(b / 10);
  const unitsB = b % 10;

  const totalUnits = unitsA + unitsB;
  const carry = Math.floor(totalUnits / 10);
  const finalUnits = totalUnits % 10;

  const finalTens = tensA + tensB + carry;

  return {
    result: finalTens * 10 + finalUnits,
    carry
  };
}

describe("Dodawanie Chisanbop", () => {
  testCases.additionTests.forEach((testCase) => {
    it(testCase.description, () => {
      const result = addChisanbop(testCase.a, testCase.b);

      expect(result.result).toBe(testCase.expected);
      expect(result.carry).toBe(testCase.expectedCarry);
    });
  });
});
