type HandVisualProps = {
  value: number;
  label?: string;
  interactive?: boolean;
  onToggle?: (index: number) => void;
  keys?: string[];
  side?: "left" | "right";
};

const fingerNames = ["Wskazujący", "Środkowy", "Serdeczny", "Mały", "Kciuk"];

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

  const fingers = [
    ones >= 1,
    ones >= 2,
    ones >= 3,
    ones >= 4,
    thumbActive,
  ];

  return (
    <div className={`hand-visual hand-${side}`}>
      {label && <div className="hand-label">{label}</div>}

      <div className="hand-drawing">
        <div className="palm">
          {fingers.map((active, index) => (
            <button
              key={fingerNames[index]}
              type="button"
              className={[
                "finger",
                `finger-${index}`,
                active ? "finger-active" : "",
                interactive ? "finger-clickable" : "",
              ].join(" ")}
              onClick={() => interactive && onToggle?.(index)}
              disabled={!interactive}
              aria-label={`${fingerNames[index]}: ${active ? "aktywny" : "nieaktywny"}`}
              aria-pressed={active}
              title={`${fingerNames[index]}${keys[index] ? ` (${keys[index]})` : ""}`}
            >
              {interactive && keys[index] && (
                <span className="finger-key">{keys[index]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="hand-digit">{value}</div>
    </div>
  );
}
