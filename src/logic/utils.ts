
export function calculateLeftHandValue(value: number): number {
  return value * 10;
}

export type Step = {
  titleKey: string;
  titleParams?: Record<string, number | string>;
  descriptionKey: string;
  descriptionParams?: Record<string, number | string>;
  detailKey: string;
  detailParams?: Record<string, number | string>;
  tens: number;
  units: number;
};

export function getSteps(a: number, b: number): Step[] {
  let tens = Math.floor(a / 10);
  let units = a % 10;

  const steps: Step[] = [];

  function addStep(
    titleKey: string,
    titleParams: Record<string, number | string> | undefined,
    descriptionKey: string,
    descriptionParams: Record<string, number | string> | undefined,
    detailKey: string,
    detailParams: Record<string, number | string> | undefined
  ) {
    steps.push({
      titleKey,
      titleParams,
      descriptionKey,
      descriptionParams,
      detailKey,
      detailParams,
      tens,
      units,
    });
  }

  function getDetail() {
    const left = calculateLeftHandValue(tens);
    return {
      key: "steps.detail",
      params: { left, units, total: left + units }
    };
  }

  const detail = getDetail();
  addStep(
    "steps.setFirstNumber",
    { a },
    "steps.showNumberOnHands",
    { a },
    detail.key,
    detail.params
  );

  const addedTens = Math.floor(b / 10);
  const addedUnits = b % 10;

  if (addedTens > 0) {
    tens += addedTens;

    const detail = getDetail();
    addStep(
      "steps.addTens",
      { addedTens },
      "steps.addTensOnLeftHand",
      { addedTens },
      detail.key,
      detail.params
    );
  }

  if (addedUnits > 0) {
    if (units + addedUnits <= 9) {
      const previousUnits = units;
      units += addedUnits;

      const detail = getDetail();
      addStep(
        "steps.addUnits",
        { addedUnits, previousUnits },
        "steps.addUnitsTo",
        { addedUnits, previousUnits },
        detail.key,
        detail.params
      );
    } else {
      tens += 1;

      const detail = getDetail();
      addStep(
        "steps.addTen",
        {},
        "steps.addTenOnLeftHand",
        {},
        detail.key,
        detail.params
      );

      const toSubtract = 10 - addedUnits;

      if (units >= 5) {
        units -= 5;

        const detail = getDetail();
        addStep(
          "steps.subtractFive",
          {},
          "steps.raiseThumb",
          {},
          detail.key,
          detail.params
        );

        const adjustment = 5 - toSubtract;

        if (adjustment > 0) {
          units += adjustment;

          const detail = getDetail();
          addStep(
            "steps.addNumber",
            { adjustment },
            "steps.addUnitsOnRightHand",
            { adjustment },
            detail.key,
            detail.params
          );
        } else if (adjustment < 0) {
          units += adjustment;

          const detail = getDetail();
          addStep(
            "steps.subtractNumber",
            { adjustment: Math.abs(adjustment) },
            "steps.subtractUnitsOnRightHand",
            { adjustment: Math.abs(adjustment) },
            detail.key,
            detail.params
          );
        }
      } else {
        units -= toSubtract;

        const detail = getDetail();
        addStep(
          "steps.subtractNumber",
          { adjustment: toSubtract },
          "steps.subtractUnitsOnRightHand",
          { adjustment: toSubtract },
          detail.key,
          detail.params
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