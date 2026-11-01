import InteractiveHandCard from "./InteractiveHandCard";

interface BothHandsProps {
  tens: number;
  units: number;
  onToggleTens: (index: number) => void;
  onToggleUnits: (index: number) => void;
  leftKeys?: string[];
  rightKeys?: string[];
}

export default function BothHands({
  tens,
  units,
  onToggleTens,
  onToggleUnits,
  leftKeys = ["Q", "W", "E", "R", "T"],
  rightKeys = ["A", "S", "D", "F", "G"],
}: BothHandsProps) {
  return (
    <>
      <InteractiveHandCard
        side="left"
        value={tens}
        label="Dziesiątki"
        keys={leftKeys}
        onToggle={onToggleTens}
      />
      <InteractiveHandCard
        side="right"
        value={units}
        label="Jedności"
        keys={rightKeys}
        onToggle={onToggleUnits}
      />
    </>
  );
}
