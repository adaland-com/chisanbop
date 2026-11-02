import { useTranslation } from "react-i18next";
import styles from "./HandVisual.module.css";
import { calculateLeftHandValue } from "../../logic/utils";
import { handConfigs } from "../../types/HandConfig";
import type { HandProps } from "../../types/HandProps";

export default function LeftHand({
  value,
  label,
  interactive = false,
  onToggle,
  keys = [],
}: HandProps) {
  const { t } = useTranslation();

  const config = handConfigs.left;
const {
  fingers: fingerConfigs,
  fingerOrder,
  calculateFingers,
} = config;

const activeFingers = calculateFingers(value);
  const displayValue = calculateLeftHandValue(value);

  return (
    <div className={`${styles.handVisual} ${styles.handLeft}`}>
      {label && <div className={styles.handLabel}>{label}</div>}

      <div className={styles.handDrawing}>
        <div className={styles.palm}>
          {fingerOrder.map((index, displayIndex) => {
            const finger = fingerConfigs[index];
            const active = activeFingers[index];
            const key = keys[displayIndex];

            return (
              <button
                key={finger.index}
                type="button"
                className={[
                  styles.finger,
                  styles[`finger${index}`],
                  active ? styles.fingerActive : "",
                  interactive ? styles.fingerClickable : "",
                ].join(" ")}
                onClick={() => interactive && onToggle?.(finger.index)}
                disabled={!interactive}
                aria-label={`${finger.name}: ${
                  active ? t("fingers.active") : t("fingers.inactive")
                }`}
                aria-pressed={active}
                title={`${finger.name}${key ? ` (${key})` : ""}`}
              >
                {interactive && key && (
                  <span className={styles.fingerKey}>{key}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.handDigit}>{displayValue}</div>
    </div>
  );
}