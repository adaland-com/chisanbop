import { handConfigs, type HandSide } from "../../types/HandConfig";
import LeftHand from "./LeftHand";
import RightHand from "./RightHand";

interface InteractiveHandCardProps {
  side: HandSide;
  value: number;
  label: string;
  onToggle: (index: number) => void;
}

export default function InteractiveHandCard({
  side,
  value,
  label,
  onToggle,
}: InteractiveHandCardProps) {
  const HandComponent = side === "left" ? LeftHand : RightHand;

  const config = handConfigs[side];

  const displayKeys = config.fingerOrder.map(
    (index) => config.fingers[index].key
  );

  return (
    <div>
      <h3>{label}</h3>

      <HandComponent
        value={value}
        interactive
        onToggle={onToggle}
        keys={displayKeys}
      />
    </div>
  );
}