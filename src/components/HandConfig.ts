export type HandSide = "left" | "right";

export interface HandConfig {
  side: HandSide;
  fingerNames: string[];
  fingerOrder: number[];
  calculateFingers: (value: number) => boolean[];
}

export const handConfigs: Record<HandSide, HandConfig> = {
  left: {
    side: "left",
    fingerNames: ["Wskazujący", "Środkowy", "Serdeczny", "Mały", "Kciuk"],
    fingerOrder: [3, 2, 1, 0, 4],
    calculateFingers: (value: number) => [
      (value & 1) !== 0,
      (value & 2) !== 0,
      (value & 4) !== 0,
      (value & 8) !== 0,
      (value & 16) !== 0,
    ],
  },
  right: {
    side: "right",
    fingerNames: ["Wskazujący", "Środkowy", "Serdeczny", "Mały", "Kciuk"],
    fingerOrder: [4, 0, 1, 2, 3],
    calculateFingers: (value: number) => {
      const thumbActive = value >= 5;
      const ones = value % 5;
      return [ones >= 1, ones >= 2, ones >= 3, ones >= 4, thumbActive];
    },
  },
};
