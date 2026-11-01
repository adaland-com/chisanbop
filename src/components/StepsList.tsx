import { ArrowRight } from "lucide-react";
import type { Step } from "../utils";

interface StepsListProps {
  steps: Step[];
  activeStep: number;
  onSelectStep: (index: number) => void;
}

export default function StepsList({ steps, activeStep, onSelectStep }: StepsListProps) {
  return (
    <section className="all-steps">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CAŁE ROZWIĄZANIE</span>
          <h2>Kroki działania</h2>
        </div>
        <span className="steps-count">{steps.length} kroki</span>
      </div>

      <div className="steps-list">
        {steps.map((step, index) => (
          <button
            className={`step-list-item ${index === activeStep ? "selected" : ""} ${index < activeStep ? "completed" : ""}`}
            key={`${step.title}-${index}`}
            onClick={() => onSelectStep(index)}
          >
            <span className="step-list-number">{index + 1}</span>
            <span className="step-list-copy">
              <strong>{step.title}</strong>
              <small>{step.description}</small>
            </span>
            <span className="step-list-value">{step.tens * 10 + step.units}</span>
            <ArrowRight className="step-list-arrow" size={18} />
          </button>
        ))}
      </div>
    </section>
  );
}
