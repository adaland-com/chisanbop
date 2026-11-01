import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StepsList from "./StepsList";
import type { Step } from "../utils";

const mockSteps: Step[] = [
  {
    title: "Ustaw pierwszą liczbę",
    description: "Ustaw 7 na prawej dłoni",
    tens: 0,
    units: 7,
    detail: "Lewa dłoń: 0, prawa dłoń: 7",
  },
  {
    title: "Dodaj 10",
    description: "Przenieś dziesiątkę na lewą dłoń",
    tens: 1,
    units: 7,
    detail: "Lewa dłoń: 10, prawa dłoń: 7",
  },
  {
    title: "Odejmij 4",
    description: "Zmień prawą dłoń z 7 na 3",
    tens: 1,
    units: 3,
    detail: "Lewa dłoń: 10, prawa dłoń: 3",
  },
];

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

    const items = container.querySelectorAll(".step-list-item");

    expect(items[0]).not.toHaveClass("selected");
    expect(items[1]).toHaveClass("selected");
    expect(items[2]).not.toHaveClass("selected");
  });

  it("oznacza wcześniejsze kroki klasą completed", () => {
    const { container } = render(
      <StepsList
        steps={mockSteps}
        activeStep={2}
        onSelectStep={vi.fn()}
      />
    );

    const items = container.querySelectorAll(".step-list-item");

    expect(items[0]).toHaveClass("completed");
    expect(items[1]).toHaveClass("completed");
    expect(items[2]).not.toHaveClass("completed");
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