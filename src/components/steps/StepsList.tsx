import { useTranslation } from "react-i18next";
import styles from "./StepsList.module.css";
import { ArrowRight } from "lucide-react";
import type { Step } from "../../logic/utils";

interface StepsListProps {
  steps: Step[];
  activeStep: number;
  onSelectStep: (index: number) => void;
}

export default function StepsList({ steps, activeStep, onSelectStep }: StepsListProps) {
  const { t } = useTranslation();

  return (
    <section className={styles.allSteps}>
      <div className={styles.sectionHeading}>
        <div>
          <span className="eyebrow">{t("stepsList.eyebrow")}</span>
          <h2 className={styles.sectionHeadingH2}>{t("stepsList.title")}</h2>
        </div>
        <span className={styles.stepsCount}>{steps.length} {t("stepsList.stepsCount")}</span>
      </div>

      <div className={styles.stepsList}>
        {steps.map((step, index) => (
          <button
            data-testid={`step-item-${index}`}
            className={`${styles.stepListItem} ${index === activeStep ? styles.stepListItemSelected : ""} ${index < activeStep ? styles.completed : ""}`}
            key={`${step.titleKey}-${index}`}
            onClick={() => onSelectStep(index)}
          >
            <span className={`${styles.stepListNumber} ${index === activeStep ? styles.selected : ""}`}>{index + 1}</span>
            <span className={styles.stepListCopy}>
              <strong className={styles.stepListCopyStrong}>{t(step.titleKey, step.titleParams)}</strong>
              <small className={styles.stepListCopySmall}>{t(step.descriptionKey, step.descriptionParams)}</small>
              <small className={styles.stepListDetail}>{t(step.detailKey, step.detailParams)}</small>
            </span>
            <span className={styles.stepListValue}>{step.tens * 10 + step.units}</span>
            <ArrowRight className={styles.stepListArrow} size={18} />
          </button>
        ))}
      </div>
    </section>
  );
}
