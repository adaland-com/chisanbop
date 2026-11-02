export type HandSide = "left" | "right";

export interface FingerConfig {
  name: string;
  index: number;
  key: string;
}

export interface HandConfig {
  side: HandSide;
  fingers: FingerConfig[];
  fingerOrder: number[];
  calculateFingers: (value: number) => boolean[];
}

export const handConfigs: Record<HandSide, HandConfig> = {
  left: {
    side: "left",

    fingers: [
      { name: "Wskazujący", index: 0, key: "R" },
      { name: "Środkowy", index: 1, key: "E" },
      { name: "Serdeczny", index: 2, key: "W" },
      { name: "Mały", index: 3, key: "Q" },
      { name: "Kciuk", index: 4, key: "T" },
    ],

    fingerOrder: [3, 2, 1, 0, 4],

    calculateFingers: (value) => {
      const thumbActive = value >= 5;
      const fingers = value % 5;

      return [
        fingers >= 1,
        fingers >= 2,
        fingers >= 3,
        fingers >= 4,
        thumbActive,
      ];
    },
  },

  right: {
    side: "right",

    fingers: [
      { name: "Wskazujący", index: 0, key: "U" },
      { name: "Środkowy", index: 1, key: "I" },
      { name: "Serdeczny", index: 2, key: "O" },
      { name: "Mały", index: 3, key: "P" },
      { name: "Kciuk", index: 4, key: "Y" },
    ],

    fingerOrder: [4, 0, 1, 2, 3],

    calculateFingers: (value) => {
      const thumbActive = value >= 5;
      const ones = value % 5;

      return [
        ones >= 1,
        ones >= 2,
        ones >= 3,
        ones >= 4,
        thumbActive,
      ];
    },
  },
};