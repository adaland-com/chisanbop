import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import HandVisual from "../components/hands/HandVisual";

describe("HandVisual - interakcja", () => {
  it("przekazuje właściwy indeks po kliknięciu palca lewej ręki", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <HandVisual
        value={0}
        side="left"
        interactive
        onToggle={onToggle}
      />
    );

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[3]);

    expect(onToggle).toHaveBeenCalledWith(0);
  });
});