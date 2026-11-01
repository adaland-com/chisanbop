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
    <div className="current-step">
      <div className="step-title-row">
        <span className="step-number">{String(stepNumber + 1).padStart(2, "0")}</span>
        <div>
          <span className="eyebrow">AKTUALNY KROK</span>
          <h2>{step.title}</h2>
        </div>
      </div>
      <p className="step-description">{step.description}</p>

      <div className="visualization-card">
        <div className="visualization-heading">
          <span>Wartość na dłoniach</span>
          <div className="value-box">
            <span>AKTUALNA WARTOŚĆ</span>
            <strong>{step.tens * 10 + step.units}</strong>
          </div>
        </div>
        <div className="hands-row">
          <HandVisual side="left" value={step.tens} label="Lewa dłoń · dziesiątki" />
          <div className="plus-divider">+</div>
          <HandVisual side="right" value={step.units} label="Prawa dłoń · jedności" />
        </div>
        <p className="visualization-detail">{step.detail}</p>
      </div>

      <div className="step-navigation">
        <button
          className="secondary-button"
          disabled={stepNumber === 0}
          onClick={onPrevious}
        >
          <ArrowLeft size={17} /> Poprzedni krok
        </button>
        {stepNumber < totalSteps - 1 ? (
          <button className="primary-button" onClick={onNext}>
            Następny krok <ArrowRight size={17} />
          </button>
        ) : (
          <button className="primary-button" onClick={onNewExample}>
            Nowe działanie <Shuffle size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
