
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    Hand,
    Shuffle,
    Calculator,
    CheckCircle2,
    XCircle,
} from "lucide-react";

import { StepVisualization, StepsList } from "../components";
import { getSteps } from "../logic/utils";
import styles from "./PractisePage.module.css";

export function PractisePage() {
    const { t } = useTranslation();

    const [showSteps, setShowSteps] = useState(false);
    const [expression, setExpression] = useState("7 + 6");
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState("");
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState<
        "correct" | "incorrect" | "empty" | null
    >(null);

    const parsed = useMemo(() => {
        const match = expression.match(
            /^\s*(\d{1,2})\s*\+\s*(\d{1,2})\s*$/
        );

        if (!match) return null;

        const a = Number(match[1]);
        const b = Number(match[2]);

        if (a > 99 || b > 99 || a + b > 99) return null;

        return { a, b };
    }, [expression]);

    const steps = useMemo(
        () => (parsed ? getSteps(parsed.a, parsed.b) : []),
        [parsed]
    );

    useEffect(() => {
        setActiveStep(0);
    }, [expression]);

    const current = steps[activeStep];

    function resetAnswer() {
        setAnswer("");
        setFeedback(null);
    }

    function randomExample() {
        const a = Math.floor(Math.random() * 80) + 1;
        const b = Math.floor(Math.random() * (99 - a)) + 1;

        setExpression(`${a} + ${b}`);
        setError("");
        resetAnswer();
        setShowSteps(false);
    }

    function updateExpression(value: string) {
        setExpression(value);
        setError("");
        resetAnswer();
        setShowSteps(false);
    }

    function validate() {
        if (!parsed) {
            setError(t("practice.expressionInvalid"));
            return false;
        }

        setError("");
        return true;
    }

    function checkAnswer() {
        if (!answer.trim()) {
            setFeedback("empty");
            return;
        }

        if (!parsed) return;

        const correctAnswer = parsed.a + parsed.b;

        if (Number(answer) === correctAnswer) {
            setFeedback("correct");
        } else {
            setFeedback("incorrect");
            setShowSteps(true);
        }
    }

    return (
        <main className={styles.pageContainer}>
            <div className={styles.pageHeading}>
                <div>
                    <span className="eyebrow">
                        {t("practice.eyebrow")}
                    </span>

                    <h1 className={styles.pageHeadingH1}>
                        {t("practice.title")}
                    </h1>

                    <p className={styles.pageHeadingP}>
                        {t("practice.subtitle")}
                    </p>
                </div>

                <Link to="/value" className={styles.textLink}>
                    <Hand size={18} />
                    {t("practice.openHands")}
                </Link>
            </div>

            <section className={styles.exercisePanel}>
                <div className={styles.exerciseTopRow}>
                    <div className={styles.exerciseInputRow}>
                        <span className={styles.topCardLabel}>
                            {t("practice.exerciseLabel")}
                        </span>

                        <h2 className={styles.topCardTitle}>
                            {t("practice.yourExpression")}
                        </h2>

                        <div className={styles.expressionControls}>
                            <input
                                id="expression"
                                value={expression}
                                onChange={(e) =>
                                    updateExpression(e.target.value)
                                }
                                onBlur={validate}
                                aria-label={t("practice.expressionAriaLabel")}
                                className={styles.expressionControlsInput}
                            />

                            <button
                                className={styles.iconButton}
                                onClick={randomExample}
                                title={t("practice.randomTitle")}
                                type="button"
                            >
                                <Shuffle size={18} />
                                {t("common.random")}
                            </button>
                        </div>

                        {error && (
                            <p className={styles.errorMessage} role="alert">
                                {error}
                            </p>
                        )}
                    </div>

                    <div className={styles.answerCard}>
                        <span className={styles.topCardLabel}>
                            {t("practice.checkLabel")}
                        </span>

                        <h2 className={styles.topCardTitle}>
                            {t("practice.yourAnswer")}
                        </h2>

                        {parsed ? (
                            <>
                                <p className={styles.answerDescription}>
                                    {t("practice.calculate", {
                                        a: parsed.a,
                                        b: parsed.b,
                                    })}
                                </p>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        checkAnswer();
                                    }}
                                >
                                    <div className={styles.answerControls}>
                                        <input
                                            id="answer"
                                            type="number"
                                            min="0"
                                            max="99"
                                            value={answer}
                                            onChange={(e) => {
                                                setAnswer(e.target.value);
                                                setFeedback(null);
                                            }}
                                            placeholder={t(
                                                "practice.answerPlaceholder"
                                            )}
                                            aria-label={t(
                                                "practice.answerAriaLabel"
                                            )}
                                            className={styles.answerInput}
                                        />

                                        <button
                                            type="submit"
                                            className={styles.primaryButton}
                                        >
                                            <Calculator size={17} />
                                            {t("practice.checkAnswer")}
                                        </button>
                                    </div>
                                </form>

                                {feedback === "correct" && (
                                    <p
                                        className={`${styles.answerFeedback} ${styles.answerCorrect}`}
                                        role="status"
                                    >
                                        <CheckCircle2 size={18} />
                                        {t("practice.correct")}
                                    </p>
                                )}

                                {feedback === "incorrect" && (
                                    <p
                                        className={`${styles.answerFeedback} ${styles.answerIncorrect}`}
                                        role="status"
                                    >
                                        <XCircle size={18} />
                                        {t("practice.incorrect")}
                                    </p>
                                )}

                                {feedback === "empty" && (
                                    <p
                                        className={styles.errorMessage}
                                        role="alert"
                                    >
                                        {t("practice.emptyAnswer")}
                                    </p>
                                )}
                            </>
                        ) : (
                            <p className={styles.answerDescription}>
                                {t("practice.enterValidExpression")}
                            </p>
                        )}
                    </div>
                </div>

                {parsed && current ? (
                    <>
                        <div className={styles.stepProgress}>
                            <span>
                                {t("practice.step")} {activeStep + 1}{" "}
                                <span className={styles.muted}>
                                    / {steps.length}
                                </span>
                            </span>

                            <div className={styles.progressTrack}>
                                <div
                                    className={styles.progressTrackDiv}
                                    style={{
                                        width: `${
                                            ((activeStep + 1) / steps.length) *
                                            100
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className={styles.practiceLayout}>
                            <div className={styles.visualizationColumn}>
                                <StepVisualization
                                    step={current}
                                    stepNumber={activeStep}
                                    totalSteps={steps.length}
                                    onNext={() =>
                                        setActiveStep((s) =>
                                            Math.min(s + 1, steps.length - 1)
                                        )
                                    }
                                    onPrevious={() =>
                                        setActiveStep((s) =>
                                            Math.max(s - 1, 0)
                                        )
                                    }
                                    onNewExample={randomExample}
                                />
                            </div>

                            <aside className={styles.stepsSidebar}>
                                <div className={styles.stepsCard}>
                                    <div className={styles.stepsHeader}>
                                        <div>
                                            <span
                                                className={styles.topCardLabel}
                                            >
                                                {t("practice.helpLabel")}
                                            </span>

                                            <h2
                                                className={styles.sectionTitle}
                                            >
                                                {t("practice.stepsTitle")}
                                            </h2>
                                        </div>

                                        <button
                                            type="button"
                                            className={styles.stepsToggle}
                                            onClick={() =>
                                                setShowSteps((visible) => !visible)
                                            }
                                            aria-expanded={showSteps}
                                        >
                                            {showSteps
                                                ? t("practice.hideSteps")
                                                : t("practice.showSteps")}
                                        </button>
                                    </div>

                                    <div className={styles.stepsContent}>
                                        <div
                                            className={
                                                !showSteps
                                                    ? styles.stepsBlurred
                                                    : undefined
                                            }
                                            aria-hidden={!showSteps}
                                        >
                                            <StepsList
                                                steps={steps}
                                                activeStep={activeStep}
                                                onSelectStep={setActiveStep}
                                            />
                                        </div>

                                        {!showSteps && (
                                            <div
                                                className={
                                                    styles.stepsOverlay
                                                }
                                            >
                                                <span>
                                                    {t("practice.tryYourself")}
                                                </span>

                                                <small>
                                                    {t("practice.stepsHidden")}
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyState}>
                        <Calculator size={32} />

                        <h2 className={styles.emptyStateH2}>
                            {t("practice.invalidTitle")}
                        </h2>

                        <p>
                            {t("practice.invalidDescription")}
                        </p>

                        <button
                            className={styles.primaryButton}
                            onClick={validate}
                            type="button"
                        >
                            {t("common.check")}
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
