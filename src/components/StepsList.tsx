import styles from "./StepsList.module.css";
import { ArrowRight } from "lucide-react";
import type { Step } from "../utils";

interface StepsListProps {
  steps: Step[];
  activeStep: number;
  onSelectStep: (index: number) => void;
}

export default function StepsList({ steps, activeStep, onSelectStep }: StepsListProps) {
  return (
    <section className={styles.allSteps}>
      <div className={styles.sectionHeading}>
        <div>
          <span className="eyebrow">CAŁE ROZWIĄZANIE</span>
          <h2 className={styles.sectionHeadingH2}>Kroki działania</h2>
        </div>
        <span className={styles.stepsCount}>{steps.length} kroki</span>
      </div>

      <div className={styles.stepsList}>
        {steps.map((step, index) => (
          <button
            data-testid={`step-item-${index}`}
            className={`${styles.stepListItem} ${index === activeStep ? styles.stepListItemSelected : ""} ${index < activeStep ? styles.completed : ""}`}
            key={`${step.title}-${index}`}
            onClick={() => onSelectStep(index)}
          >
            <span className={`${styles.stepListNumber} ${index === activeStep ? styles.selected : ""}`}>{index + 1}</span>
            <span className={styles.stepListCopy}>
              <strong className={styles.stepListCopyStrong}>{step.title}</strong>
              <small className={styles.stepListCopySmall}>{step.description}</small>
              <small className={styles.stepListDetail}>{step.detail}</small>
            </span>
            <span className={styles.stepListValue}>{step.tens * 10 + step.units}</span>
            <ArrowRight className={styles.stepListArrow} size={18} />
          </button>
        ))}
      </div>
    </section>
  );
}
