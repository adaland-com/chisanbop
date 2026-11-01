import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LeftHand from "../components/LeftHand";
import RightHand from "../components/RightHand";
import { handConfigs } from "../components/HandConfig";
import testCases from "./hand-positions.test.json";

describe("LeftHand - podświetlenie palców", () => {
  const config = handConfigs.left;
  const { fingerNames, calculateFingers } = config;

  testCases.leftHandTests.forEach((testCase) => {
    it(testCase.description, () => {
      render(<LeftHand value={testCase.value} interactive={false} />);

      const actualFingers = calculateFingers(testCase.value);
      
      fingerNames.forEach((fingerName, index) => {
        const button = screen.getByTitle(fingerName);
        const isActive = actualFingers[index];
        const className = button.className;
        
        if (isActive) {
          expect(className).toContain("fingerActive");
        } else {
          expect(className).not.toContain("fingerActive");
        }
      });
    });
  });
});

describe("RightHand - podświetlenie palców", () => {
  const config = handConfigs.right;
  const { fingerNames, calculateFingers } = config;

  testCases.rightHandTests.forEach((testCase) => {
    it(testCase.description, () => {
      render(<RightHand value={testCase.value} interactive={false} />);

      const actualFingers = calculateFingers(testCase.value);
      
      fingerNames.forEach((fingerName, index) => {
        const button = screen.getByTitle(fingerName);
        const isActive = actualFingers[index];
        const className = button.className;
        
        if (isActive) {
          expect(className).toContain("fingerActive");
        } else {
          expect(className).not.toContain("fingerActive");
        }
      });
    });
  });
});
