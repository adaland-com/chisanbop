import "@testing-library/jest-dom/vitest";

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, number | string>) => {
      const translations: Record<string, string> = {
        "stepsList.eyebrow": "Kroki",
        "stepsList.title": "Lista kroków",
        "stepsList.stepsCount": "kroki",
        "fingers.index": "Wskazujący",
        "fingers.middle": "Środkowy",
        "fingers.ring": "Serdeczny",
        "fingers.pinky": "Mały",
        "fingers.thumb": "Kciuk",
        "fingers.active": "aktywny",
        "fingers.inactive": "nieaktywny",
      };

      if (params) {
        let text = translations[key] || key;
        return text.replace(/\{\{(\w+)\}\}/g, (_, param) => String(params[param] || ""));
      }
      return translations[key] || key;
    },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: vi.fn(),
  },
}));

afterEach(() => {
  cleanup();
});
