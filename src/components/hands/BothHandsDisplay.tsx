import { useTranslation } from "react-i18next";
import LeftHand from "./LeftHand";
import RightHand from "./RightHand";
import styles from "../steps/StepVisualization.module.css";

interface BothHandsDisplayProps {
  tens: number;
  units: number;
  leftLabel?: string;
  rightLabel?: string;
}

export default function BothHandsDisplay({
  tens,
  units,
  leftLabel,
  rightLabel,
}: BothHandsDisplayProps) {
  const { t } = useTranslation();

  return (
    <>
      <LeftHand value={tens} label={leftLabel || t("hands.leftTens")} />
      <div className={styles.plusDivider}>+</div>
      <RightHand value={units} label={rightLabel || t("hands.rightUnits")} />
    </>
  );
}
