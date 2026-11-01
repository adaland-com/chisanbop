
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import BothHands from "../../components/BothHands";
import { handConfigs } from "../../components/HandConfig";
import testCases from "../data/highlighting/addition-tests.json";

describe("Wyświetlanie wyniku dodawania na dłoniach", () => {
  const testCase = testCases.find(
    (test) => test.expected === 91
  );

  it("13 + 78 = 91 - wskazuje aktywne palce", () => {
    expect(testCase).toBeDefined();

    if (!testCase) return;

    const tens = testCase.expectedTens;
    const units = testCase.expectedUnits;

    expect(tens).toBe(9);
    expect(units).toBe(1);
    expect(tens * 10 + units).toBe(91);

    const { container } = render(
      <BothHands
        tens={tens}
        units={units}
        onToggleTens={() => {}}
        onToggleUnits={() => {}}
      />
    );

    const leftConfig = handConfigs.left;
    const rightConfig = handConfigs.right;

    const leftActive = leftConfig.calculateFingers(tens);
    const rightActive = rightConfig.calculateFingers(units);

    const buttons = Array.from(
      container.querySelectorAll("button")
    );

    expect(buttons).toHaveLength(10);

    const leftButtons = buttons.slice(0, 5);
    const rightButtons = buttons.slice(5, 10);

    console.log(
  "Nazwy w konfiguracji:",
  leftConfig.fingers.map((finger) => finger.name)
);

console.log(
  "Nazwy oczekiwane z JSON:",
  testCase.expectedLeftFingers
);
    leftConfig.fingerOrder.forEach((index, displayIndex) => {
      const finger = leftConfig.fingers[index];

      const expected =
        testCase.expectedLeftFingers.includes(finger.name);

      expect(leftActive[finger.index]).toBe(expected);

      expect(leftButtons[displayIndex]).toHaveAttribute(
        "aria-pressed",
        String(expected)
      );
    });

    rightConfig.fingerOrder.forEach((index, displayIndex) => {
      const finger = rightConfig.fingers[index];

      const expected =
        testCase.expectedRightFingers.includes(finger.name);

      expect(rightActive[finger.index]).toBe(expected);

      expect(rightButtons[displayIndex]).toHaveAttribute(
        "aria-pressed",
        String(expected)
      );
    });
  });
});
