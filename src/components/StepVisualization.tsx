import styles from "./StepVisualization.module.css";
import { ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import HandVisual from "./HandVisual";
import type { Step } from "../utils";

interface StepVisualizationProps {
  step: Step;
  stepNumber: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onNewExample: () => void;
}

export default function StepVisualization({
  step,
  stepNumber,
  totalSteps,
  onNext,
  onPrevious,
  onNewExample,
}: StepVisualizationProps) {
  return (
    <div className={styles.currentStep}>
      <div className={styles.stepTitleRow}>
        <span className={styles.stepNumber}>{String(stepNumber + 1).padStart(2, "0")}</span>
        <div>
          <span className="eyebrow">AKTUALNY KROK</span>
          <h2 className={styles.stepTitleRowH2}>{step.title}</h2>
        </div>
      </div>
      <p className={styles.stepDescription}>{step.description}</p>

      <div className={styles.visualizationCard}>
        <div className={styles.visualizationHeading}>
          <span>Wartość na dłoniach</span>
          <div className={styles.valueBox}>
            <span className={styles.valueBoxSpan}>AKTUALNA WARTOŚĆ</span>
            <strong className={styles.valueBoxStrong}>{step.tens * 10 + step.units}</strong>
          </div>
        </div>
        <div className={styles.handsRow}>
          <HandVisual side="left" value={step.tens} label="Lewa dłoń · dziesiątki" />
          <div className={styles.plusDivider}>+</div>
          <HandVisual side="right" value={step.units} label="Prawa dłoń · jedności" />
        </div>
        <p className={styles.visualizationDetail}>{step.detail}</p>
      </div>

      <div className={styles.stepNavigation}>
        <button
          className={styles.secondaryButton}
          disabled={stepNumber === 0}
          onClick={onPrevious}
        >
          <ArrowLeft size={17} /> Poprzedni krok
        </button>
        {stepNumber < totalSteps - 1 ? (
          <button className={styles.primaryButton} onClick={onNext}>
            Następny krok <ArrowRight size={17} />
          </button>
        ) : (
          <button className={styles.primaryButton} onClick={onNewExample}>
            Nowe działanie <Shuffle size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
