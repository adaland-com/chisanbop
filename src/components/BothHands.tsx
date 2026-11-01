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
  return (
    <>
      <InteractiveHandCard
        side="left"
        value={tens}
        label="Dziesiątki"
        onToggle={onToggleTens}
      />

      <InteractiveHandCard
        side="right"
        value={units}
        label="Jedności"
        onToggle={onToggleUnits}
      />
    </>
  );
}