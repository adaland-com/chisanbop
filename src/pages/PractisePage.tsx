import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Hand, Shuffle, Calculator } from "lucide-react";
import { StepVisualization, StepsList } from "../components";
import { getSteps } from "../utils";
import styles from "../App.module.css";

export function PractisePage() {
  const [expression, setExpression] = useState("7 + 6");
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");

  const parsed = useMemo(() => {
    const match = expression.match(/^\s*(\d{1,2})\s*\+\s*(\d{1,2})\s*$/);
    if (!match) return null;
    const a = Number(match[1]);
    const b = Number(match[2]);
    if (a > 99 || b > 99 || a + b > 99) return null;
    return { a, b };
  }, [expression]);

  const steps = useMemo(
    () => parsed ? getSteps(parsed.a, parsed.b) : [],
    [parsed]
  );

  useEffect(() => {
    setActiveStep(0);
  }, [expression]);

  function randomExample() {
    const a = Math.floor(Math.random() * 80) + 1;
    const b = Math.floor(Math.random() * (99 - a)) + 1;
    setExpression(`${a} + ${b}`);
    setError("");
  }

  function updateExpression(value: string) {
    setExpression(value);
    setError("");
  }

  function validate() {
    if (!parsed) setError("Wpisz działanie w formacie, np. 7 + 6. Wynik nie może przekraczać 99.");
  }

  const current = steps[activeStep];

  return (
    <main className={styles.pageContainer}>
      <div className={styles.pageHeading}>
        <div>
          <span className="eyebrow">TRENING DODAWANIA</span>
          <h1 className={styles.pageHeadingH1}>Poćwicz</h1>
          <p className={styles.pageHeadingP}>Obserwuj, jak zmienia się zapis liczby na dłoniach.</p>
        </div>
        <Link to="/check" className={styles.textLink}>
          <Hand size={18} /> Otwórz własne dłonie
        </Link>
      </div>

      <section className={styles.exercisePanel}>
        <div className={styles.exerciseInputRow}>
          <label htmlFor="expression" className={styles.exerciseInputRowLabel}>Twoje działanie</label>
          <div className={styles.expressionControls}>
            <input
              id="expression"
              value={expression}
              onChange={(e) => updateExpression(e.target.value)}
              onBlur={validate}
              aria-label="Działanie dodawania"
              className={styles.expressionControlsInput}
            />
            <button className={styles.iconButton} onClick={randomExample} title="Losuj działanie">
              <Shuffle size={18} /> Losuj
            </button>
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>

        {parsed && current ? (
          <>
            <div className={styles.stepProgress}>
              <span>KROK {activeStep + 1} <span className={styles.muted}>/ {steps.length}</span></span>
              <div className={styles.progressTrack}>
                <div className={styles.progressTrackDiv} style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} />
              </div>
            </div>

            <StepVisualization
              step={current}
              stepNumber={activeStep}
              totalSteps={steps.length}
              onNext={() => setActiveStep((s) => s + 1)}
              onPrevious={() => setActiveStep((s) => s - 1)}
              onNewExample={randomExample}
            />

            <StepsList
              steps={steps}
              activeStep={activeStep}
              onSelectStep={setActiveStep}
            />
          </>
        ) : (
          <div className={styles.emptyState}>
            <Calculator size={32} />
            <h2 className={styles.emptyStateH2}>Sprawdź działanie</h2>
            <p>Wpisz dodawanie dwóch liczb, których suma nie przekracza 99.</p>
            <button className={styles.primaryButton} onClick={validate}>Sprawdź</button>
          </div>
        )}
      </section>
    </main>
  );
}
