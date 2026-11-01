import styles from "./HandVisual.module.css";
import { handConfigs } from "./HandConfig";
import type { HandProps } from "./HandProps";

export default function RightHand({
  value,
  label,
  interactive = false,
  onToggle,
  keys = [],
}: HandProps) {
  const config = handConfigs.right;
  const { fingers: fingerConfigs, fingerOrder, calculateFingers } = config;

  const activeFingers = calculateFingers(value);

  return (
    <div className={styles.handVisual}>
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
                  active ? "aktywny" : "nieaktywny"
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

      <div className={styles.handDigit}>{value}</div>
    </div>
  );
}