
import { describe, it, expect } from "vitest";
import { handConfigs } from "../components/HandConfig";

import leftHandTests from "./data/left-hand-tests.json";
import rightHandTests from "./data/right-hand-tests.json";
import bothHandsTests from "./data/both-hands-tests.json";

describe("LeftHand - pozycje palców", () => {
  const config = handConfigs.left;
  const { calculateFingers } = config;

  leftHandTests.forEach((testCase) => {
    it(testCase.description, () => {
      const fingers = calculateFingers(testCase.value);

      expect(fingers).toEqual(testCase.expectedFingers);
    });
  });
});

describe("RightHand - pozycje palców", () => {
  const config = handConfigs.right;
  const { calculateFingers } = config;

  rightHandTests.forEach((testCase) => {
    it(testCase.description, () => {
      const fingers = calculateFingers(testCase.value);

      expect(fingers).toEqual(testCase.expectedFingers);
    });
  });
});

describe("BothHands - pozycje obu rąk", () => {
  const leftConfig = handConfigs.left;
  const rightConfig = handConfigs.right;

  bothHandsTests.forEach((testCase) => {
    it(testCase.description, () => {
      const leftFingers = leftConfig.calculateFingers(testCase.tens);
      const rightFingers = rightConfig.calculateFingers(testCase.units);

      const leftDisplayFingers = leftConfig.fingerOrder.map(
        (index) => leftFingers[index]
      );

      const rightDisplayFingers = rightConfig.fingerOrder.map(
        (index) => rightFingers[index]
      );

      expect(leftDisplayFingers).toEqual(testCase.expectedLeftFingers);
      expect(rightDisplayFingers).toEqual(testCase.expectedRightFingers);
    });
  });
});

describe("FingerOrder - kolejność wyświetlania", () => {
  it("wyświetla lewą rękę od małego palca do kciuka", () => {
    expect(handConfigs.left.fingerOrder).toEqual([3, 2, 1, 0, 4]);
  });

  it("wyświetla prawą rękę od kciuka do małego palca", () => {
    expect(handConfigs.right.fingerOrder).toEqual([4, 0, 1, 2, 3]);
  });
});
