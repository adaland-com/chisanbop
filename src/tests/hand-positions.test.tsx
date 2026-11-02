import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import LeftHand from "../../components/LeftHand";
import RightHand from "../../components/RightHand";
import { handConfigs } from "../../types/HandConfig";
import testCases from "./data/highlighting/hand-positions.test.json";

describe("LeftHand - podświetlenie palców", () => {
  const config = handConfigs.left;

  testCases.leftHandTests.forEach((testCase) => {
    it(testCase.description, () => {
      const { container } = render(
        <LeftHand value={testCase.value} interactive={false} />
      );

      const buttons = Array.from(
        container.querySelectorAll("button")
      );

      const actualFingers = config.calculateFingers(testCase.value);

      config.fingers.forEach((finger) => {
        const displayIndex = config.fingerOrder.indexOf(finger.index);
        const button = buttons[displayIndex];

        expect(button.getAttribute("aria-pressed")).toBe(
          String(actualFingers[finger.index])
        );
      });
    });
  });
});

describe("RightHand - podświetlenie palców", () => {
  const config = handConfigs.right;

  testCases.rightHandTests.forEach((testCase) => {
    it(testCase.description, () => {
      const { container } = render(
        <RightHand value={testCase.value} interactive={false} />
      );

      const buttons = Array.from(
        container.querySelectorAll("button")
      );

      const actualFingers = config.calculateFingers(testCase.value);

      config.fingers.forEach((finger) => {
        const displayIndex = config.fingerOrder.indexOf(finger.index);
        const button = buttons[displayIndex];

        expect(button.getAttribute("aria-pressed")).toBe(
          String(actualFingers[finger.index])
        );
      });
    });
  });
});