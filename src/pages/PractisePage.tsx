
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Hand,
    Shuffle,
    Calculator,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { StepVisualization, StepsList } from "../components";
import { getSteps } from "../utils";
import styles from "./PractisePage.module.css";

export function PractisePage() {
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
            setError(
                "Wpisz działanie w formacie, np. 7 + 6. Wynik nie może przekraczać 99."
            );
            return false;
        }

        setError("");
        return true;
    }

    const checkAnswer = () => {
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
    };

    return (
        <main className={styles.pageContainer}>
            <div className={styles.pageHeading}>
                <div>
                    <span className="eyebrow">TRENING DODAWANIA</span>
                    <h1 className={styles.pageHeadingH1}>Poćwicz</h1>
                    <p className={styles.pageHeadingP}>
                        Obserwuj, jak zmienia się zapis liczby na dłoniach.
                    </p>
                </div>

                <Link to="/check" className={styles.textLink}>
                    <Hand size={18} />
                    Otwórz własne dłonie
                </Link>
            </div>

            <section className={styles.exercisePanel}>

                <div className={styles.exerciseTopRow}>
                    <div className={styles.exerciseInputRow}>
                        <span className={styles.topCardLabel}>ĆWICZENIE</span>

                        <h2 className={styles.topCardTitle}>Twoje działanie</h2>

                        <div className={styles.expressionControls}>
                            <input
                                id="expression"
                                value={expression}
                                onChange={(e) => updateExpression(e.target.value)}
                                onBlur={validate}
                                aria-label="Działanie dodawania"
                                className={styles.expressionControlsInput}
                            />

                            <button
                                className={styles.iconButton}
                                onClick={randomExample}
                                title="Losuj działanie"
                                type="button"
                            >
                                <Shuffle size={18} />
                                Losuj
                            </button>
                        </div>

                        {error && (
                            <p className={styles.errorMessage} role="alert">
                                {error}
                            </p>
                        )}
                    </div>

                    <div className={styles.answerCard}>
                        <span className={styles.topCardLabel}>SPRAWDŹ SIĘ</span>

                        <h2 className={styles.topCardTitle}>Twoja odpowiedź</h2>

                        {parsed ? (
                            <>
                                <p className={styles.answerDescription}>
                                    Ile wynosi {parsed.a} + {parsed.b}?
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
                                            placeholder="Wpisz wynik"
                                            aria-label="Wpisz wynik"
                                            className={styles.answerInput}
                                        />

                                        <button
                                            type="submit"
                                            className={styles.primaryButton}
                                        >
                                            <Calculator size={17} />
                                            Sprawdź
                                        </button>
                                    </div>
                                </form>

                                {feedback === "correct" && (
                                    <p
                                        className={`${styles.answerFeedback} ${styles.answerCorrect}`}
                                        role="status"
                                    >
                                        <CheckCircle2 size={18} />
                                        Świetnie! Poprawna odpowiedź.
                                    </p>
                                )}

                                {feedback === "incorrect" && (
                                    <p
                                        className={`${styles.answerFeedback} ${styles.answerIncorrect}`}
                                        role="status"
                                    >
                                        <XCircle size={18} />
                                        Nie tym razem. Spróbuj ponownie!
                                    </p>
                                )}

                                {feedback === "empty" && (
                                    <p className={styles.errorMessage} role="alert">
                                        Wpisz odpowiedź przed sprawdzeniem.
                                    </p>
                                )}
                            </>
                        ) : (
                            <p className={styles.answerDescription}>
                                Najpierw wpisz poprawne działanie.
                            </p>
                        )}
                    </div>
                </div>



                {parsed && current ? (
                    <>

                        <div className={styles.stepProgress}>
                            <span>
                                KROK {activeStep + 1}{" "}
                                <span className={styles.muted}>
                                    / {steps.length}
                                </span>
                            </span>

                            <div className={styles.progressTrack}>
                                <div
                                    className={styles.progressTrackDiv}
                                    style={{
                                        width: `${((activeStep + 1) / steps.length) *
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
                                        setActiveStep((s) => Math.max(s - 1, 0))
                                    }
                                    onNewExample={randomExample}
                                />
                            </div>


                          
<aside className={styles.stepsSidebar}>
    <div className={styles.stepsCard}>
        <div className={styles.stepsHeader}>
            <div>
                <span className={styles.topCardLabel}>
                    POMOC
                </span>

                <h2 className={styles.sectionTitle}>
                    Przebieg działania
                </h2>
            </div>

            <button
                type="button"
                className={styles.stepsToggle}
                onClick={() => setShowSteps((visible) => !visible)}
                aria-expanded={showSteps}
            >
                {showSteps ? "Ukryj" : "Pokaż przebieg"}
            </button>
        </div>

        <div className={styles.stepsContent}>
            <div
                className={
                    !showSteps ? styles.stepsBlurred : undefined
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
                <div className={styles.stepsOverlay}>
                    <span>Spróbuj samodzielnie!</span>
                    <small>Przebieg rozwiązania jest ukryty</small>
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
                            Sprawdź działanie
                        </h2>

                        <p>
                            Wpisz dodawanie dwóch liczb, których suma nie
                            przekracza 99.
                        </p>

                        <button
                            className={styles.primaryButton}
                            onClick={validate}
                            type="button"
                        >
                            Sprawdź
                        </button>
                    </div>
                )}
            </section>
        </main>
    );


}
