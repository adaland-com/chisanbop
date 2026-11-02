import { useTranslation } from "react-i18next";
import styles from "./StepVisualization.module.css";
import { ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import { BothHandsDisplay } from "../hands";
import type { Step } from "../../logic/utils";

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
  const { t } = useTranslation();

  return (
    <div className={styles.currentStep}>
      <div className={styles.stepTitleRow}>
        <span className={styles.stepNumber}>{String(stepNumber + 1).padStart(2, "0")}</span>
        <div>
          <span className="eyebrow">{t("stepVisualization.eyebrow")}</span>
          <h2 className={styles.stepTitleRowH2}>{t(step.titleKey, step.titleParams)}</h2>
        </div>
      </div>
      <p className={styles.stepDescription}>{t(step.descriptionKey, step.descriptionParams)}</p>

      <div className={styles.visualizationCard}>
        <div className={styles.visualizationHeading}>
          <span>{t("stepVisualization.valueOnHands")}</span>
          <div className={styles.valueBox}>
            <span className={styles.valueBoxSpan}>{t("stepVisualization.currentValue")}</span>
            <strong className={styles.valueBoxStrong}>{step.tens * 10 + step.units}</strong>
          </div>
        </div>
        <div className={styles.handsRow}>
          <BothHandsDisplay
            tens={step.tens}
            units={step.units}
            leftLabel={t("stepVisualization.leftTens")}
            rightLabel={t("stepVisualization.rightUnits")}
          />
        </div>
        <p className={styles.visualizationDetail}>{t(step.detailKey, step.detailParams)}</p>
      </div>

      <div className={styles.stepNavigation}>
        <button
          className={styles.secondaryButton}
          disabled={stepNumber === 0}
          onClick={onPrevious}
        >
          <ArrowLeft size={17} /> {t("stepVisualization.previousStep")}
        </button>
        {stepNumber < totalSteps - 1 ? (
          <button className={styles.primaryButton} onClick={onNext}>
            {t("stepVisualization.nextStep")} <ArrowRight size={17} />
          </button>
        ) : (
          <button className={styles.primaryButton} onClick={onNewExample}>
            {t("stepVisualization.newExample")} <Shuffle size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
