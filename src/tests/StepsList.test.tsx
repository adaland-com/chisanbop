
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import stepsData from "./data/steps/steps-data.json";
import { StepsList } from "../components";
import type { Step } from "../logic/utils";

const mockSteps: Step[] = stepsData.mockSteps;
const additionSteps: Step[] = stepsData.additionSteps;

describe("StepsList", () => {
  it("wyświetla wszystkie kroki", () => {
    render(
      <StepsList
        steps={mockSteps}
        activeStep={0}
        onSelectStep={vi.fn()}
      />
    );

    expect(screen.getByText("Ustaw pierwszą liczbę")).toBeInTheDocument();
    expect(screen.getByText("Dodaj 10")).toBeInTheDocument();
    expect(screen.getByText("Odejmij 4")).toBeInTheDocument();
  });

  it("wyświetla poprawną liczbę kroków", () => {
    render(
      <StepsList
        steps={mockSteps}
        activeStep={0}
        onSelectStep={vi.fn()}
      />
    );

    expect(screen.getByText("3 kroki")).toBeInTheDocument();
  });

  it("wyświetla numery kroków", () => {
    render(
      <StepsList
        steps={mockSteps}
        activeStep={0}
        onSelectStep={vi.fn()}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("oblicza i wyświetla wartość każdej dłoni", () => {
    render(
      <StepsList
        steps={mockSteps}
        activeStep={0}
        onSelectStep={vi.fn()}
      />
    );

    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("17")).toBeInTheDocument();
    expect(screen.getByText("13")).toBeInTheDocument();
  });

  it("oznacza aktywny krok klasą selected", () => {
    const { container } = render(
      <StepsList
        steps={mockSteps}
        activeStep={1}
        onSelectStep={vi.fn()}
      />
    );

    const item0 = container.querySelector('[data-testid="step-item-0"]');
    const item1 = container.querySelector('[data-testid="step-item-1"]');
    const item2 = container.querySelector('[data-testid="step-item-2"]');

    expect(item0?.className).not.toContain("stepListItemSelected");
    expect(item1?.className).toContain("stepListItemSelected");
    expect(item2?.className).not.toContain("stepListItemSelected");
  });

  it("oznacza wcześniejsze kroki klasą completed", () => {
    const { container } = render(
      <StepsList
        steps={mockSteps}
        activeStep={2}
        onSelectStep={vi.fn()}
      />
    );

    const item0 = container.querySelector('[data-testid="step-item-0"]');
    const item1 = container.querySelector('[data-testid="step-item-1"]');
    const item2 = container.querySelector('[data-testid="step-item-2"]');

    expect(item0?.className).toContain("completed");
    expect(item1?.className).toContain("completed");
    expect(item2?.className).not.toContain("completed");
  });

  it("wywołuje onSelectStep z indeksem klikniętego kroku", async () => {
    const user = userEvent.setup();
    const onSelectStep = vi.fn();

    render(
      <StepsList
        steps={mockSteps}
        activeStep={0}
        onSelectStep={onSelectStep}
      />
    );

    await user.click(screen.getByText("Dodaj 10"));

    expect(onSelectStep).toHaveBeenCalledWith(1);
  });
});

describe("StepsList - dodawanie 13 + 78 = 91", () => {
  it("wyświetla wszystkie cztery kroki działania", () => {
    render(
      <StepsList
        steps={additionSteps}
        activeStep={0}
        onSelectStep={vi.fn()}
      />
    );

    expect(screen.getByText("Ustaw pierwszą liczbę: 13")).toBeInTheDocument();
    expect(screen.getByText("Dodaj 70")).toBeInTheDocument();
    expect(screen.getByText("Dodaj 10")).toBeInTheDocument();
    expect(screen.getByText("Odejmij 2")).toBeInTheDocument();
  });

  it("wyświetla poprawną liczbę kroków", () => {
    render(
      <StepsList
        steps={additionSteps}
        activeStep={0}
        onSelectStep={vi.fn()}
      />
    );

    expect(screen.getByText("4 kroki")).toBeInTheDocument();
  });

  it("wyświetla poprawne wartości w kolejnych krokach", () => {
    render(
      <StepsList
        steps={additionSteps}
        activeStep={0}
        onSelectStep={vi.fn()}
      />
    );

    expect(screen.getByText("13")).toBeInTheDocument();
    expect(screen.getByText("83")).toBeInTheDocument();
    expect(screen.getByText("93")).toBeInTheDocument();
    expect(screen.getByText("91")).toBeInTheDocument();
  });

  it("wyświetla poprawne opisy kolejnych działań", () => {
    render(
      <StepsList
        steps={additionSteps}
        activeStep={0}
        onSelectStep={vi.fn()}
      />
    );

    expect(screen.getByText("13 + 70 = 83")).toBeInTheDocument();
    expect(screen.getByText("83 + 10 = 93")).toBeInTheDocument();
    expect(screen.getByText("93 - 2 = 91")).toBeInTheDocument();
  });

  it("pozwala wybrać krok dodawania 70", async () => {
    const user = userEvent.setup();
    const onSelectStep = vi.fn();

    render(
      <StepsList
        steps={additionSteps}
        activeStep={0}
        onSelectStep={onSelectStep}
      />
    );

    await user.click(screen.getByTestId("step-item-1"));

    expect(onSelectStep).toHaveBeenCalledWith(1);
  });

  it("pozwala wybrać krok dodawania 10", async () => {
    const user = userEvent.setup();
    const onSelectStep = vi.fn();

    render(
      <StepsList
        steps={additionSteps}
        activeStep={0}
        onSelectStep={onSelectStep}
      />
    );

    await user.click(screen.getByTestId("step-item-2"));

    expect(onSelectStep).toHaveBeenCalledWith(2);
  });

  it("pozwala wybrać krok odejmowania 2", async () => {
    const user = userEvent.setup();
    const onSelectStep = vi.fn();

    render(
      <StepsList
        steps={additionSteps}
        activeStep={0}
        onSelectStep={onSelectStep}
      />
    );

    await user.click(screen.getByTestId("step-item-3"));

    expect(onSelectStep).toHaveBeenCalledWith(3);
  });

  it("oznacza wcześniejsze kroki jako completed", () => {
    const { container } = render(
      <StepsList
        steps={additionSteps}
        activeStep={3}
        onSelectStep={vi.fn()}
      />
    );

    for (let index = 0; index < 3; index++) {
      const item = container.querySelector(
        `[data-testid="step-item-${index}"]`
      );

      expect(item?.className).toContain("completed");
    }
  });

  it("oznacza ostatni krok jako aktywny, ale nie jako completed", () => {
    const { container } = render(
      <StepsList
        steps={additionSteps}
        activeStep={3}
        onSelectStep={vi.fn()}
      />
    );

    const lastStep = container.querySelector(
      '[data-testid="step-item-3"]'
    );

    expect(lastStep?.className).toContain("stepListItemSelected");
    expect(lastStep?.className).not.toContain("completed");
  });
});
