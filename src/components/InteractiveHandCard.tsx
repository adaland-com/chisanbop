import styles from "./InteractiveHandCard.module.css";
import HandVisual from "./HandVisual";

interface InteractiveHandCardProps {
  side: "left" | "right";
  value: number;
  label: string;
  keys: string[];
  onToggle: (index: number) => void;
}

export default function InteractiveHandCard({
  side,
  value,
  label,
  keys,
  onToggle,
}: InteractiveHandCardProps) {
  const displayValue = side === "left" ? value * 10 : value;

  return (
    <div className={styles.interactiveHandCard}>
      <div className={styles.handCardHeading}>
        <div>
          <span className="eyebrow">{side === "left" ? "LEWA DŁOŃ" : "PRAWA DŁOŃ"}</span>
          <h2 className={styles.handCardHeadingH2}>{label}</h2>
        </div>
        <strong className={styles.handCardHeadingStrong}>{displayValue}</strong>
      </div>
      <HandVisual
        side={side}
        value={value}
        interactive
        onToggle={onToggle}
        keys={keys}
      />
    </div>
  );
}
