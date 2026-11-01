
import { useMemo, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import {
  ArrowRight,
  RotateCcw,
  Shuffle,
  Hand,
  GraduationCap,
  House,
  Calculator,
} from "lucide-react";
import HandVisual from "./components/HandVisual";
import StepVisualization from "./components/StepVisualization";
import StepsList from "./components/StepsList";
import InteractiveHandCard from "./components/InteractiveHandCard";
import { getSteps, toggleDigit } from "./utils";
import "./styles.css";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-icon"><Hand size={21} /></span>
        Chisanbop
      </Link>

      <nav className="main-nav">
        <NavLink to="/" end><House size={17} /> Start</NavLink>
        <NavLink to="/practise"><GraduationCap size={17} /> Poćwicz</NavLink>
        <NavLink to="/check"><Calculator size={17} /> Wartość</NavLink>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">MATEMATYKA NA PALCACH</span>
          <h1>Policz to<br /><span>na palcach.</span></h1>
          <p>
            Poznaj Chisanbop – prosty sposób na liczenie i dodawanie
            przy użyciu obu dłoni.
          </p>
          <div className="hero-actions">
            <Link to="/practise" className="primary-button">
              Zacznij ćwiczyć <ArrowRight size={18} />
            </Link>
            <Link to="/check" className="secondary-button">
              Otwórz dłonie
            </Link>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-number">25</div>
          <div className="hero-hands">
            <HandVisual value={2} label="Dziesiątki" />
            <HandVisual value={5} label="Jedności" />
          </div>
          <span className="hero-caption">Liczby zapisane na dłoniach</span>
        </div>
      </section>

      <section className="home-features">
        <article className="feature-card">
          <span className="feature-icon"><GraduationCap /></span>
          <h2>Poćwicz</h2>
          <p>Przejdź przez dodawanie krok po kroku i obserwuj zmiany na dłoniach.</p>
          <Link to="/practise">Przejdź do ćwiczeń <ArrowRight size={16} /></Link>
        </article>
        <article className="feature-card">
          <span className="feature-icon"><Hand /></span>
          <h2>Sprawdź wartość</h2>
          <p>Klikaj palce i zobacz, jak zmienia się liczba od 0 do 99.</p>
          <Link to="/check">Otwórz wizualizację <ArrowRight size={16} /></Link>
        </article>
      </section>
    </main>
  );
}

function PracticePage() {
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
    <main className="page-container">
      <div className="page-heading">
        <div>
          <span className="eyebrow">TRENING DODAWANIA</span>
          <h1>Poćwicz</h1>
          <p>Obserwuj, jak zmienia się zapis liczby na dłoniach.</p>
        </div>
        <Link to="/check" className="text-link">
          <Hand size={18} /> Otwórz własne dłonie
        </Link>
      </div>

      <section className="exercise-panel">
        <div className="exercise-input-row">
          <label htmlFor="expression">Twoje działanie</label>
          <div className="expression-controls">
            <input
              id="expression"
              value={expression}
              onChange={(e) => updateExpression(e.target.value)}
              onBlur={validate}
              aria-label="Działanie dodawania"
            />
            <button className="icon-button" onClick={randomExample} title="Losuj działanie">
              <Shuffle size={18} /> Losuj
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        {parsed && current ? (
          <>
            <div className="step-progress">
              <span>KROK {activeStep + 1} <span className="muted">/ {steps.length}</span></span>
              <div className="progress-track">
                <div style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} />
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
          <div className="empty-state">
            <Calculator size={32} />
            <h2>Sprawdź działanie</h2>
            <p>Wpisz dodawanie dwóch liczb, których suma nie przekracza 99.</p>
            <button className="primary-button" onClick={validate}>Sprawdź</button>
          </div>
        )}
      </section>
    </main>
  );
}

function ValuePage() {
  const [tens, setTens] = useState(0);
  const [units, setUnits] = useState(0);

  const value = tens * 10 + units;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
      const key = event.key.toLowerCase();
      const leftKeys = ["q", "w", "e", "r", "t"];
      const rightKeys = ["a", "s", "d", "f", "g"];

      if (leftKeys.includes(key)) {
        event.preventDefault();
        setTens((v) => toggleDigit(v, leftKeys.indexOf(key)));
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
    <main className="page-container">
      <div className="page-heading">
        <div>
          <span className="eyebrow">INTERAKTYWNA WIZUALIZACJA</span>
          <h1>Wartość na dłoniach</h1>
          <p>Kliknij palce lub użyj skrótów klawiaturowych, aby zmienić liczbę.</p>
        </div>
        <button className="secondary-button" onClick={reset}>
          <RotateCcw size={17} /> Wyzeruj
        </button>
      </div>

      <section className="value-dashboard">
        <div className="total-value">
          <span>AKTUALNA WARTOŚĆ</span>
          <strong>{value}</strong>
          <p>{tens} dziesiątek + {units} jedności</p>
        </div>

        <div className="interactive-hands">
          <InteractiveHandCard
            side="left"
            value={tens}
            label="Dziesiątki"
            keys={["Q", "W", "E", "R", "T"]}
            onToggle={(i) => setTens((v) => toggleDigit(v, i))}
          />
          <InteractiveHandCard
            side="right"
            value={units}
            label="Jedności"
            keys={["A", "S", "D", "F", "G"]}
            onToggle={(i) => setUnits((v) => toggleDigit(v, i))}
          />
        </div>

        <div className="keyboard-hint">
          <strong>Skróty klawiaturowe</strong>
          <span>Q W E R T – lewa dłoń</span>
          <span>A S D F G – prawa dłoń</span>
          <span>ESC – wyzeruj obie dłonie</span>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practise" element={<PracticePage />} />
          <Route path="/check" element={<ValuePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <footer className="site-footer">Chisanbop · Nauka liczenia na palcach</footer>
      </div>
    </BrowserRouter>
  );
}
