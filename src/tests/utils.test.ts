
import { describe, it, expect } from "vitest";
import {
  getSteps,
  toggleDigit,
  calculateLeftHandValue,
} from "../logic/utils";

describe("calculateLeftHandValue", () => {
  it.each([
    [0, 0],
    [1, 10],
    [2, 20],
    [3, 30],
    [4, 40],
    [5, 50],
    [6, 60],
    [7, 70],
    [8, 80],
    [9, 90],
  ])("przelicza %i na %i", (input, expected) => {
    expect(calculateLeftHandValue(input)).toBe(expected);
  });
});

describe("getSteps", () => {
  it("generuje cztery kroki dla działania 7 + 6", () => {
    const steps = getSteps(7, 6);

    expect(steps).toHaveLength(4);
    expect(steps[0].titleKey).toBe("steps.setFirstNumber");
    expect(steps[1].titleKey).toBe("steps.addTens");
  });

  it("ustawia pierwszą liczbę na prawej dłoni", () => {
    const steps = getSteps(7, 6);

    expect(steps[0].tens).toBe(0);
    expect(steps[0].units).toBe(7);
  });

  it("dodaje dziesiątkę na lewej dłoni", () => {
    const steps = getSteps(7, 6);

    expect(steps[1].tens).toBe(1);
    expect(steps[1].units).toBe(7);
  });

  it("odejmuje 5 jedności na prawej dłoni", () => {
    const steps = getSteps(7, 6);

    expect(steps[2].tens).toBe(1);
    expect(steps[2].units).toBe(2);
  });

  it("każdy krok ma poprawną wartość liczbową", () => {
    const steps = getSteps(7, 6);

    const values = steps.map(
      (step: { tens: number; units: number }) => step.tens * 10 + step.units
    );

    expect(values).toEqual([7, 17, 12, 13]);
    expect(steps[0].titleParams).toEqual({ a: 7 });
  });

  it("ostatni krok zawiera poprawny wynik dodawania", () => {
    const steps = getSteps(7, 6);
    const lastStep = steps[steps.length - 1];

    expect(lastStep.tens * 10 + lastStep.units).toBe(13);
  });

  it("poprawnie wykonuje dodawanie 13 + 78", () => {
    const steps = getSteps(13, 78);
    const lastStep = steps[steps.length - 1];

    expect(lastStep.tens).toBe(9);
    expect(lastStep.units).toBe(1);
    expect(lastStep.tens * 10 + lastStep.units).toBe(91);
  });

  it("zapisuje poprawne wartości po każdym kroku 13 + 78", () => {
    const steps = getSteps(13, 78);

    const values = steps.map(
      (step: { tens: number; units: number }) => step.tens * 10 + step.units
    );

    expect(values).toEqual([13, 83, 93, 91]);
  });
});

describe("toggleDigit", () => {
  describe("dodawanie i odejmowanie palców", () => {
    it("dodaje 1 przy aktywacji pierwszego palca", () => {
      expect(toggleDigit(0, 0)).toBe(1);
    });

    it("odejmuje 1 przy ponownym kliknięciu aktywnego palca", () => {
      expect(toggleDigit(1, 0)).toBe(0);
    });

    it("dodaje kolejny palec do aktualnej wartości", () => {
      expect(toggleDigit(1, 1)).toBe(2);
    });

    it("cofa wartość po kliknięciu aktywnego drugiego palca", () => {
      expect(toggleDigit(2, 1)).toBe(1);
    });

    it("aktywuje wszystkie cztery palce", () => {
      expect(toggleDigit(3, 3)).toBe(4);
    });

    it("cofa ostatni aktywny palec", () => {
      expect(toggleDigit(4, 3)).toBe(3);
    });
  });

  describe("kciuk", () => {
    it("dodaje 5 po aktywacji kciuka", () => {
      expect(toggleDigit(0, 4)).toBe(5);
    });

    it("odejmuje 5 po ponownym kliknięciu kciuka", () => {
      expect(toggleDigit(5, 4)).toBe(0);
    });

    it("aktywuje kciuk przy wartości 4", () => {
      expect(toggleDigit(4, 4)).toBe(9);
    });

    it("dezaktywuje kciuk przy wartości 9", () => {
      expect(toggleDigit(9, 4)).toBe(4);
    });
  });

  describe("granice wartości", () => {
    it("nie przekracza wartości 9", () => {
      expect(toggleDigit(9, 3)).toBe(8);
    });

    it("nie schodzi poniżej 0", () => {
      expect(toggleDigit(0, 0)).toBe(1);
    });

    it("nie zmienia wartości dla nieprawidłowego indeksu", () => {
      expect(toggleDigit(3, 5)).toBe(3);
    });

    it("nie zmienia wartości dla ujemnego indeksu", () => {
      expect(toggleDigit(3, -1)).toBe(3);
    });
  });

  describe("lewa dłoń – klawisze", () => {
    it("R aktywuje wskazujący: 0 → 1 (10)", () => {
      expect(toggleDigit(0, 0)).toBe(1);
    });

    it("E po R aktywuje środkowy: 1 → 2 (20)", () => {
      expect(toggleDigit(1, 1)).toBe(2);
    });

    it("ponowne E cofa wartość: 2 → 1 (10)", () => {
      expect(toggleDigit(2, 1)).toBe(1);
    });

    it("R + E daje 20", () => {
      const afterR = toggleDigit(0, 0);
      const afterE = toggleDigit(afterR, 1);

      expect(afterE * 10).toBe(20);
    });

    it("T aktywuje kciuk: 0 → 5 (50)", () => {
      expect(toggleDigit(0, 4)).toBe(5);
    });
  });
});
