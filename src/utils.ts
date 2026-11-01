
export function calculateLeftHandValue(value: number): number {
  return value * 10;
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

  function getDetail() {
    const left = calculateLeftHandValue(tens);
    return `Lewa dłoń: ${left}, prawa dłoń: ${units}. Razem: ${left + units}.`;
  }

  addStep(
    "Ustaw pierwszą liczbę",
    `Pokaż na dłoniach liczbę ${a}.`,
    getDetail()
  );

  const addedTens = Math.floor(b / 10);
  const addedUnits = b % 10;

  if (addedTens > 0) {
    tens += addedTens;

    addStep(
      "Dodaj dziesiątki",
      `Dołóż ${addedTens} dziesiątek na lewej dłoni.`,
      getDetail()
    );
  }

  if (addedUnits > 0) {
    if (units + addedUnits <= 9) {
      const previousUnits = units;
      units += addedUnits;

      addStep(
        "Dodaj jedności",
        `Dodaj ${addedUnits} jedności do ${previousUnits}.`,
        getDetail()
      );
    } else {
      // Przeniesienie jednej dziesiątki.
      tens += 1;

      addStep(
        "Dodaj dziesiątkę",
        "Dodaj jedną dziesiątkę na lewej dłoni.",
        getDetail()
      );

      const toSubtract = 10 - addedUnits;

      if (units >= 5) {
        // Odejmujemy 5 za pomocą kciuka.
        units -= 5;

        addStep(
          "Odejmij 5",
          "Podnieś kciuk prawej dłoni, aby odjąć 5.",
          getDetail()
        );

        const adjustment = 5 - toSubtract;

        if (adjustment > 0) {
          units += adjustment;

          addStep(
            `Dodaj ${adjustment}`,
            `Dodaj ${adjustment} jedności na prawej dłoni.`,
            getDetail()
          );
        } else if (adjustment < 0) {
          units += adjustment;

          addStep(
            `Odejmij ${Math.abs(adjustment)}`,
            `Odejmij ${Math.abs(adjustment)} jedności na prawej dłoni.`,
            getDetail()
          );
        }
      } else {
        units -= toSubtract;

        addStep(
          `Odejmij ${toSubtract}`,
          `Odejmij ${toSubtract} jedności na prawej dłoni.`,
          getDetail()
        );
      }
    }
  }

  return steps;
}

export function toggleDigit(value: number, index: number): number {
  if (value < 0 || value > 9 || index < 0 || index > 4) {
    return value;
  }

  const isThumb = index === 4;

  if (isThumb) {
    const next = value >= 5 ? value - 5 : value + 5;

    return next >= 0 && next <= 9 ? next : value;
  }

  const currentFingers = value % 5;
  const isActive = currentFingers > index;

  const next = isActive ? value - 1 : value + 1;

  return next >= 0 && next <= 9 ? next : value;
}