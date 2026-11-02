import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BothHands } from "../components";
import {
  toggleDigit,
  calculateLeftHandValue,
} from "../logic/utils";
import { handConfigs } from "../types/HandConfig";
import styles from "./ValuePage.module.css";

export function ValuePage() {
  const { t } = useTranslation();
  const [tens, setTens] = useState(0);
  const [units, setUnits] = useState(0);

  const tensValue = calculateLeftHandValue(tens);
  const value = tensValue + units;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      ) {
        return;
      }

      const key = event.key.toUpperCase();

      if (key === "ESCAPE") {
        setTens(0);
        setUnits(0);
        return;
      }

      const leftFinger = handConfigs.left.fingers.find(
        (finger) => finger.key === key
      );

      const rightFinger = handConfigs.right.fingers.find(
        (finger) => finger.key === key
      );

      // Lewa dłoń – dziesiątki.
      if (leftFinger) {
        event.preventDefault();
        setTens((v) => toggleDigit(v, leftFinger.index));
        return;
      }

      if (rightFinger) {
        event.preventDefault();
        setUnits((v) => toggleDigit(v, rightFinger.index));
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function reset() {
    setTens(0);
    setUnits(0);
  }

  const leftKeyboard = handConfigs.left.fingerOrder
    .map((index) => handConfigs.left.fingers[index].key)
    .join(" ");

  const rightKeyboard = handConfigs.right.fingerOrder
    .map((index) => handConfigs.right.fingers[index].key)
    .join(" ");

  return (
    <main className={styles.pageContainer}>
      <div className={styles.pageHeading}>
        <div>
          <span className="eyebrow">
            {t("value.eyebrow")}
          </span>

          <h1 className={styles.pageHeadingH1}>
            {t("value.title")}
          </h1>

          <p className={styles.pageHeadingP}>
            {t("value.subtitle")}
          </p>
        </div>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={reset}
        >
          <RotateCcw size={17} />
          {t("value.reset")}
        </button>
      </div>

      <section className={styles.valueDashboard}>
        <div className={styles.totalValue}>
          <span className={styles.totalValueSpan}>
            {t("value.currentValue")}
          </span>

          <strong className={styles.totalValueStrong}>
            {value}
          </strong>

          <p className={styles.totalValueP}>
            {t("value.tensUnits", { tensValue, units })}
          </p>
        </div>

        <div className={styles.interactiveHands}>
          <BothHands
            tens={tens}
            units={units}
            onToggleTens={(i) =>
              setTens((v) => toggleDigit(v, i))
            }
            onToggleUnits={(i) =>
              setUnits((v) => toggleDigit(v, i))
            }
          />
        </div>

        <div className={styles.keyboardHint}>
          <strong className={styles.keyboardHintStrong}>
            {t("value.keyboardShortcuts")}
          </strong>

          <span>{leftKeyboard} – {t("value.leftHand")}</span>
          <span>{rightKeyboard} – {t("value.rightHand")}</span>
          <span>ESC – {t("value.resetBoth")}</span>
        </div>
      </section>
    </main>
  );
}