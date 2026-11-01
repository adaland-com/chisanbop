
import styles from "./HandVisual.module.css";

type HandVisualProps = {
  value: number;
  label?: string;
  interactive?: boolean;
  onToggle?: (index: number) => void;
  keys?: string[];
  side?: "left" | "right";
};

export default function HandVisual({
  value,
  label,
  interactive = false,
  onToggle,
  keys = [],
  side = "right",
}: HandVisualProps) {
  const thumbActive = value >= 5;
  const ones = value % 5;

  // Nazwy palców według ich indeksów logicznych.
  const fingerNames = [
    "Wskazujący",
    "Środkowy",
    "Serdeczny",
    "Mały",
    "Kciuk",
  ];

  // Kolejność wyświetlania palców.
  const fingerOrder =
    side === "left"
      ? [3, 2, 1, 0, 4]
      : [4, 0, 1, 2, 3];

  // Aktywność według indeksów logicznych.
  const fingers = side === "left"
    ? [
        value >= 1,
        value >= 2,
        value >= 3,
        value >= 4,
        value >= 5,
      ]
    : [
        ones >= 1,
        ones >= 2,
        ones >= 3,
        ones >= 4,
        thumbActive,
      ];

  return (
    <div
      className={`${styles.handVisual} ${
        side === "left" ? styles.handLeft : ""
      }`}
    >
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
