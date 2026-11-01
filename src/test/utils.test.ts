import { describe, it, expect } from "vitest";
import { getSteps } from "../utils";

describe("getSteps", () => {
  it("generuje trzy kroki dla działania 7 + 6", () => {
    const steps = getSteps(7, 6);

    expect(steps).toHaveLength(3);
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

  it("odejmuje 4 jedności na prawej dłoni", () => {
    const steps = getSteps(7, 6);

    expect(steps[2].tens).toBe(1);
    expect(steps[2].units).toBe(3);
  });

  it("każdy krok ma poprawną wartość liczbową", () => {
    const steps = getSteps(7, 6);

    const values = steps.map(
      (step) => step.tens * 10 + step.units
    );

    expect(values).toEqual([7, 17, 13]);
  });

  it("ostatni krok zawiera poprawny wynik dodawania", () => {
    const steps = getSteps(7, 6);
    const lastStep = steps[steps.length - 1];

    expect(lastStep.tens * 10 + lastStep.units).toBe(13);
  });
});