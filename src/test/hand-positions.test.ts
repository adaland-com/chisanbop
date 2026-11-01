import { describe, it, expect } from "vitest";
import { handConfigs } from "../components/HandConfig";
import testCases from "./hand-positions.test.json";

describe("LeftHand - pozycje palców", () => {
  const config = handConfigs.left;
  const { calculateFingers } = config;

  testCases.leftHandTests.forEach((testCase) => {
    it(testCase.description, () => {
      const fingers = calculateFingers(testCase.value);
      expect(fingers).toEqual(testCase.expectedFingers);
    });
  });
});

describe("RightHand - pozycje palców", () => {
  const config = handConfigs.right;
  const { calculateFingers } = config;

  testCases.rightHandTests.forEach((testCase) => {
    it(testCase.description, () => {
      const fingers = calculateFingers(testCase.value);
      expect(fingers).toEqual(testCase.expectedFingers);
    });
  });
});

describe("BothHands - pozycje obu rąk", () => {
  const leftConfig = handConfigs.left;
  const rightConfig = handConfigs.right;

  testCases.bothHandsTests.forEach((testCase) => {
    it(testCase.description, () => {
      const leftFingers = leftConfig.calculateFingers(testCase.tens);
      const rightFingers = rightConfig.calculateFingers(testCase.units);

      
      const leftDisplayFingers = leftConfig.fingerOrder.map(i => leftFingers[i]);
      const rightDisplayFingers = rightConfig.fingerOrder.map(i => rightFingers[i]);

      expect(leftDisplayFingers).toEqual(testCase.expectedLeftFingers);
      expect(rightDisplayFingers).toEqual(testCase.expectedRightFingers);
    });
  });
});
