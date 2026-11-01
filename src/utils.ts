export type Step = {
  title: string;
  description: string;
  tens: number;
  units: number;
  detail: string;
};

export function getSteps(a: number, b: number): Step[] {
  let tens = Math.floor(a / 10);
  let units = a % 10;

  const steps: Step[] = [];

  function addStep(
    title: string,
    description: string,
    detail: string
  ) {
    steps.push({
      title,
      description,
      tens,
      units,
      detail,
    });
  }

  addStep(
    "Ustaw pierwszą liczbę",
    `Pokaż na dłoniach liczbę ${a}.`,
    `Lewa dłoń: ${tens * 10}, prawa dłoń: ${units}. Razem: ${tens * 10 + units}.`
  );

  const addedTens = Math.floor(b / 10);
  const addedUnits = b % 10;

  if (addedTens > 0) {
    tens += addedTens;

    addStep(
      "Dodaj dziesiątki",
      `Dołóż ${addedTens} dziesiątek na lewej dłoni.`,
      `Lewa dłoń: ${tens * 10}, prawa dłoń: ${units}. Razem: ${tens * 10 + units}.`
    );
  }

  if (addedUnits > 0) {
    if (units + addedUnits <= 9) {
      const previousUnits = units;
      units += addedUnits;

      addStep(
        "Dodaj jedności",
        `Dodaj ${addedUnits} jedności do ${previousUnits}.`,
        `Lewa dłoń: ${tens * 10}, prawa dłoń: ${units}. Razem: ${tens * 10 + units}.`
      );
    } else {
      // Przeniesienie jednej dziesiątki.
      tens += 1;

      addStep(
        "Dodaj dziesiątkę",
        "Opuść palec wskazujący lewej dłoni, aby dodać 10.",
        `Lewa dłoń: ${tens * 10}, prawa dłoń: ${units}. Razem: ${tens * 10 + units}.`
      );

      const toSubtract = 10 - addedUnits;

      if (units >= 5) {
        // Najpierw odejmujemy 5 za pomocą kciuka.
        units -= 5;

        addStep(
          "Odejmij 5",
          "Podnieś kciuk prawej dłoni, aby odjąć 5.",
          `Lewa dłoń: ${tens * 10}, prawa dłoń: ${units}. Razem: ${tens * 10 + units}.`
        );

        // Następnie korygujemy różnicę.
        const adjustment = 5 - toSubtract;

        if (adjustment > 0) {
          units += adjustment;

          addStep(
            `Dodaj ${adjustment}`,
            `Opuść ${adjustment} dodatkowy palec na prawej dłoni.`,
            `Lewa dłoń: ${tens * 10}, prawa dłoń: ${units}. Razem: ${tens * 10 + units}.`
          );
        } else if (adjustment < 0) {
          units += adjustment;

          addStep(
            `Odejmij ${Math.abs(adjustment)}`,
            `Podnieś ${Math.abs(adjustment)} dodatkowe palce prawej dłoni.`,
            `Lewa dłoń: ${tens * 10}, prawa dłoń: ${units}. Razem: ${tens * 10 + units}.`
          );
        }
      } else {
        // Gdy nie ma 5 jedności do odjęcia, odejmujemy bezpośrednio.
        units -= toSubtract;

        addStep(
          `Odejmij ${toSubtract}`,
          `Odejmij ${toSubtract} jedności na prawej dłoni.`,
          `Lewa dłoń: ${tens * 10}, prawa dłoń: ${units}. Razem: ${tens * 10 + units}.`
        );
      }
    }
  }

  return steps;
}

export function toggleDigit(value: number, index: number) {
  const isThumb = index === 4;
  const isActive = isThumb ? value >= 5 : value % 5 > index;
  const next = value + (isActive ? (isThumb ? -5 : -1) : (isThumb ? 5 : 1));
  return next >= 0 && next <= 9 ? next : value;
}
