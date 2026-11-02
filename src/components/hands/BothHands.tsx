import { useTranslation } from "react-i18next";
import InteractiveHandCard from "./InteractiveHandCard";

interface BothHandsProps {
  tens: number;
  units: number;
  onToggleTens: (index: number) => void;
  onToggleUnits: (index: number) => void;
}

export default function BothHands({
  tens,
  units,
  onToggleTens,
  onToggleUnits,
}: BothHandsProps) {
  const { t } = useTranslation();

  return (
    <>
      <InteractiveHandCard
        side="left"
        value={tens}
        label={t("hands.tens")}
        onToggle={onToggleTens}
      />

      <InteractiveHandCard
        side="right"
        value={units}
        label={t("hands.units")}
        onToggle={onToggleUnits}
      />
    </>
  );
}