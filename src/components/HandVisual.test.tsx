import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import HandVisual from "../components/HandVisual";

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

    await user.click(
      screen.getByRole("button", { name: /wskazujący/i })
    );

    expect(onToggle).toHaveBeenCalledWith(0);
  });
});