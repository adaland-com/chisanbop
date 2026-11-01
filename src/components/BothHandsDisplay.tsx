import { LeftHand, RightHand } from "./index";
import styles from "./StepVisualization.module.css";

interface BothHandsDisplayProps {
  tens: number;
  units: number;
  leftLabel?: string;
  rightLabel?: string;
}

export default function BothHandsDisplay({
  tens,
  units,
  leftLabel = "Lewa dłoń · dziesiątki",
  rightLabel = "Prawa dłoń · jedności",
}: BothHandsDisplayProps) {
  return (
    <>
      <LeftHand value={tens} label={leftLabel} />
      <div className={styles.plusDivider}>+</div>
      <RightHand value={units} label={rightLabel} />
    </>
  );
}
