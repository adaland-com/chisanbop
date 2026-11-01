import { describe, it, expect } from "vitest";
import { getSteps, toggleDigit } from "../utils";

describe("getSteps", () => {
  it("generuje cztery kroki dla działania 7 + 6", () => {
    const steps = getSteps(7, 6);

    expect(steps).toHaveLength(4);
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
      (step) => step.tens * 10 + step.units
    );

    expect(values).toEqual([7, 17, 12, 13]);
  });

  it("ostatni krok zawiera poprawny wynik dodawania", () => {
    const steps = getSteps(7, 6);
    const lastStep = steps[steps.length - 1];

    expect(lastStep.tens * 10 + lastStep.units).toBe(13);
  });
});

describe("toggleDigit", () => {
  it("dodaje 1 dla prawej dłoni (index 0)", () => {
    expect(toggleDigit(0, 0)).toBe(1);
  });

  it("odejmuje 1 dla prawej dłoni (index 0)", () => {
    expect(toggleDigit(1, 0)).toBe(0);
  });

  it("dodaje 5 dla prawej dłoni (kciuk)", () => {
    expect(toggleDigit(0, 4)).toBe(5);
  });

  it("odejmuje 5 dla prawej dłoni (kciuk)", () => {
    expect(toggleDigit(5, 4)).toBe(0);
  });

  it("q (index 0) dla lewej dłoni", () => {
    expect(toggleDigit(0, 0, true)).toBe(1);
  });

  it("w (index 1) dla lewej dłoni", () => {
    expect(toggleDigit(0, 1, true)).toBe(2);
  });

  it("e (index 2) dla lewej dłoni", () => {
    expect(toggleDigit(0, 2, true)).toBe(4);
  });

  it("r (index 3) dla lewej dłoni", () => {
    expect(toggleDigit(0, 3, true)).toBe(8);
  });

  it("t (index 4) dla lewej dłoni", () => {
    expect(toggleDigit(0, 4, true)).toBe(16);
  });

  it("q+w (1+2=3) dla lewej dłoni", () => {
    expect(toggleDigit(1, 1, true)).toBe(3);
  });

  it("q+e (1+4=5) dla lewej dłoni", () => {
    expect(toggleDigit(1, 2, true)).toBe(5);
  });

  it("q+r (1+8=9) dla lewej dłoni", () => {
    expect(toggleDigit(1, 3, true)).toBe(9);
  });

  it("q+t (1+16=17) dla lewej dłoni", () => {
    expect(toggleDigit(1, 4, true)).toBe(17);
  });

  it("w+e (2+4=6) dla lewej dłoni", () => {
    expect(toggleDigit(2, 2, true)).toBe(6);
  });

  it("usuwa q z q+w (3-1=2) dla lewej dłoni", () => {
    expect(toggleDigit(3, 0, true)).toBe(2);
  });
});