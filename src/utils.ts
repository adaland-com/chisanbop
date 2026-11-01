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

  const steps: Step[] = [
    {
      title: "Zacznij od pierwszej liczby",
      description: `Pokaż na dłoniach liczbę ${a}.`,
      tens,
      units,
      detail: `${tens} dziesiątek i ${units} jedności.`,
    },
  ];

  const addedTens = Math.floor(b / 10);
  const addedUnits = b % 10;

  if (addedTens > 0) {
    tens += addedTens;
    steps.push({
      title: "Dodaj dziesiątki",
      description: `Dołóż ${addedTens} dziesiątek z drugiej liczby.`,
      tens,
      units,
      detail: `Po dodaniu dziesiątek otrzymujemy ${tens * 10 + units}.`,
    });
  }

  if (addedUnits > 0) {
    const before = units;
    const totalUnits = units + addedUnits;
    const carry = Math.floor(totalUnits / 10);

    units = totalUnits % 10;
    tens += carry;

    steps.push({
      title: carry ? "Przenieś do dziesiątek" : "Dodaj jedności",
      description: carry
        ? `${before} + ${addedUnits} = ${totalUnits}. Dziesięć jedności zamień na jedną dziesiątkę.`
        : `Dodaj ${addedUnits} jedności do ${before} jedności.`,
      tens,
      units,
      detail: carry
        ? `Przeniesienie: +1 dziesiątka. Zostaje ${units} jedności.`
        : `Wynik po dodaniu jedności: ${tens * 10 + units}.`,
    });
  }

  steps.push({
    title: "Gotowe!",
    description: `${a} + ${b} = ${a + b}`,
    tens: Math.floor((a + b) / 10),
    units: (a + b) % 10,
    detail: `Ostateczny wynik to ${a + b}.`,
  });

  return steps;
}

export function toggleDigit(value: number, index: number) {
  const isThumb = index === 4;
  const isActive = isThumb ? value >= 5 : value % 5 > index;
  const next = value + (isActive ? (isThumb ? -5 : -1) : (isThumb ? 5 : 1));
  return next >= 0 && next <= 9 ? next : value;
}
