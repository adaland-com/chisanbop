import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { BothHands } from "../components";
import { toggleDigit, calculateLeftHandValue } from "../utils";
import styles from "../App.module.css";

export function ValuePage() {
  const [tens, setTens] = useState(0);
  const [units, setUnits] = useState(0);

  const tensValue = calculateLeftHandValue(tens);
  const value = tensValue + units;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
      const key = event.key.toLowerCase();
      const leftKeys = ["q", "w", "e", "r", "t"];
      const rightKeys = ["a", "s", "d", "f", "g"];

      if (leftKeys.includes(key)) {
        event.preventDefault();
        setTens((v) => toggleDigit(v, leftKeys.indexOf(key), true));
      }
      if (rightKeys.includes(key)) {
        event.preventDefault();
        setUnits((v) => toggleDigit(v, rightKeys.indexOf(key)));
      }
      if (key === "escape") {
        setTens(0);
        setUnits(0);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function reset() {
    setTens(0);
    setUnits(0);
  }

  return (
    <main className={styles.pageContainer}>
      <div className={styles.pageHeading}>
        <div>
          <span className="eyebrow">INTERAKTYWNA WIZUALIZACJA</span>
          <h1 className={styles.pageHeadingH1}>Wartość na dłoniach</h1>
          <p className={styles.pageHeadingP}>Kliknij palce lub użyj skrótów klawiaturowych, aby zmienić liczbę.</p>
        </div>
        <button className={styles.secondaryButton} onClick={reset}>
          <RotateCcw size={17} /> Wyzeruj
        </button>
      </div>

      <section className={styles.valueDashboard}>
        <div className={styles.totalValue}>
          <span className={styles.totalValueSpan}>AKTUALNA WARTOŚĆ</span>
          <strong className={styles.totalValueStrong}>{value}</strong>
          <p className={styles.totalValueP}>{tensValue} dziesiątek + {units} jedności</p>
        </div>

        <div className={styles.interactiveHands}>
          <BothHands
            tens={tens}
            units={units}
            onToggleTens={(i) => setTens((v) => toggleDigit(v, i, true))}
            onToggleUnits={(i) => setUnits((v) => toggleDigit(v, i))}
          />
        </div>

        <div className={styles.keyboardHint}>
          <strong className={styles.keyboardHintStrong}>Skróty klawiaturowe</strong>
          <span>Q W E R T – lewa dłoń</span>
          <span>A S D F G – prawa dłoń</span>
          <span>ESC – wyzeruj obie dłonie</span>
        </div>
      </section>
    </main>
  );
}
