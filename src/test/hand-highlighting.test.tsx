
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import LeftHand from "../components/LeftHand";
import RightHand from "../components/RightHand";
import { handConfigs } from "../components/HandConfig";

import testCases from "./data/highlighting/hand-positions.test.json";

describe("LeftHand - podświetlenie palców", () => {
  const config = handConfigs.left;
  const { fingers, calculateFingers } = config;

  testCases.leftHandTests.forEach((testCase) => {
    it(testCase.description, () => {
      render(<LeftHand value={testCase.value} interactive={false} />);

      const actualFingers = calculateFingers(testCase.value);

      fingers.forEach((finger) => {
        const button = screen.getByTitle(finger.name);
        const isActive = actualFingers[finger.index];

        if (isActive) {
          expect(button.className).toContain("fingerActive");
        } else {
          expect(button.className).not.toContain("fingerActive");
        }
      });
    });
  });
});

describe("RightHand - podświetlenie palców", () => {
  const config = handConfigs.right;
  const { fingers, calculateFingers } = config;

  testCases.rightHandTests.forEach((testCase) => {
    it(testCase.description, () => {
      render(<RightHand value={testCase.value} interactive={false} />);

      const actualFingers = calculateFingers(testCase.value);

      fingers.forEach((finger) => {
        const button = screen.getByTitle(finger.name);
        const isActive = actualFingers[finger.index];

        if (isActive) {
          expect(button.className).toContain("fingerActive");
        } else {
          expect(button.className).not.toContain("fingerActive");
        }
      });
    });
  });
});
