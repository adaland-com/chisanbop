export function calculateLeftHandValue(tens: number): number {
  return ((tens & 1) ? 10 : 0) +
         ((tens & 2) ? 10 : 0) +
         ((tens & 4) ? 10 : 0) +
         ((tens & 8) ? 10 : 0) +
         ((tens & 16) ? 50 : 0);
}

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

  const tensDisplay = calculateLeftHandValue(tens);

  addStep(
    "Ustaw pierwszą liczbę",
    `Pokaż na dłoniach liczbę ${a}.`,
    `Lewa dłoń: ${tensDisplay}, prawa dłoń: ${units}. Razem: ${tensDisplay + units}.`
  );

  const addedTens = Math.floor(b / 10);
  const addedUnits = b % 10;

  if (addedTens > 0) {
    tens += addedTens;

    addStep(
      "Dodaj dziesiątki",
      `Dołóż ${addedTens} dziesiątek na lewej dłoni.`,
      `Lewa dłoń: ${calculateLeftHandValue(tens)}, prawa dłoń: ${units}. Razem: ${calculateLeftHandValue(tens) + units}.`
    );
  }

  if (addedUnits > 0) {
    if (units + addedUnits <= 9) {
      const previousUnits = units;
      units += addedUnits;

      addStep(
        "Dodaj jedności",
        `Dodaj ${addedUnits} jedności do ${previousUnits}.`,
        `Lewa dłoń: ${calculateLeftHandValue(tens)}, prawa dłoń: ${units}. Razem: ${calculateLeftHandValue(tens) + units}.`
      );
    } else {
      // Przeniesienie jednej dziesiątki.
      tens += 1;

      addStep(
        "Dodaj dziesiątkę",
        "Opuść palec wskazujący lewej dłoni, aby dodać 10.",
        `Lewa dłoń: ${calculateLeftHandValue(tens)}, prawa dłoń: ${units}. Razem: ${calculateLeftHandValue(tens) + units}.`
      );

      const toSubtract = 10 - addedUnits;

      if (units >= 5) {
        // Najpierw odejmujemy 5 za pomocą kciuka.
        units -= 5;

        addStep(
          "Odejmij 5",
          "Podnieś kciuk prawej dłoni, aby odjąć 5.",
          `Lewa dłoń: ${calculateLeftHandValue(tens)}, prawa dłoń: ${units}. Razem: ${calculateLeftHandValue(tens) + units}.`
        );

        // Następnie korygujemy różnicę.
        const adjustment = 5 - toSubtract;

        if (adjustment > 0) {
          units += adjustment;

          addStep(
            `Dodaj ${adjustment}`,
            `Opuść ${adjustment} dodatkowy palec na prawej dłoni.`,
            `Lewa dłoń: ${calculateLeftHandValue(tens)}, prawa dłoń: ${units}. Razem: ${calculateLeftHandValue(tens) + units}.`
          );
        } else if (adjustment < 0) {
          units += adjustment;

          addStep(
            `Odejmij ${Math.abs(adjustment)}`,
            `Podnieś ${Math.abs(adjustment)} dodatkowe palce prawej dłoni.`,
            `Lewa dłoń: ${calculateLeftHandValue(tens)}, prawa dłoń: ${units}. Razem: ${calculateLeftHandValue(tens) + units}.`
          );
        }
      } else {
        // Gdy nie ma 5 jedności do odjęcia, odejmujemy bezpośrednio.
        units -= toSubtract;

        addStep(
          `Odejmij ${toSubtract}`,
          `Odejmij ${toSubtract} jedności na prawej dłoni.`,
          `Lewa dłoń: ${calculateLeftHandValue(tens)}, prawa dłoń: ${units}. Razem: ${calculateLeftHandValue(tens) + units}.`
        );
      }
    }
  }

  return steps;
}

export function toggleDigit(value: number, index: number, isLeftHand: boolean = false) {
  if (isLeftHand) {
    // Left hand: toggle individual finger using bitmask
    // q=1, w=2, e=4, r=8, t=16
    const bit = 1 << index;
    return value ^ bit;
  } else {
    // Right hand: standard Chisanbop (thumb=5, others=1-4)
    const isThumb = index === 4;
    const isActive = isThumb ? value >= 5 : value % 5 > index;
    const next = value + (isActive ? (isThumb ? -5 : -1) : (isThumb ? 5 : 1));
    return next >= 0 && next <= 9 ? next : value;
  }
}
