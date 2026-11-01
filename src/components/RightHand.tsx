import styles from "./HandVisual.module.css";
import { handConfigs } from "./HandConfig";

type RightHandProps = {
  value: number;
  label?: string;
  interactive?: boolean;
  onToggle?: (index: number) => void;
  keys?: string[];
};

export default function RightHand({
  value,
  label,
  interactive = false,
  onToggle,
  keys = [],
}: RightHandProps) {
  const config = handConfigs.right;
  const { fingerNames, fingerOrder, calculateFingers } = config;
  const fingers = calculateFingers(value);

  return (
    <div className={styles.handVisual}>
      {label && <div className={styles.handLabel}>{label}</div>}

      <div className={styles.handDrawing}>
        <div className={styles.palm}>
          {fingerOrder.map((index) => {
            const active = fingers[index];

            return (
              <button
                key={fingerNames[index]}
                type="button"
                className={[
                  styles.finger,
                  styles[`finger${index}`],
                  active ? styles.fingerActive : "",
                  interactive ? styles.fingerClickable : "",
                ].join(" ")}
                onClick={() => interactive && onToggle?.(index)}
                disabled={!interactive}
                aria-label={`${fingerNames[index]}: ${
                  active ? "aktywny" : "nieaktywny"
                }`}
                aria-pressed={active}
                title={`${fingerNames[index]}${
                  keys[index] ? ` (${keys[index]})` : ""
                }`}
              >
                {interactive && keys[index] && (
                  <span className={styles.fingerKey}>{keys[index]}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.handDigit}>{value}</div>
    </div>
  );
}
