
import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { LeftHand, RightHand } from "../components";

import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <main className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className="eyebrow">MATEMATYKA NA PALCACH</span>
          <h1 className={styles.heroH1}>Policz to<br /><span className={styles.heroH1Span}>na palcach.</span></h1>
          <p className={styles.heroCopyP}>
            Poznaj Chisanbop – prosty sposób na liczenie i dodawanie
            przy użyciu obu dłoni.
          </p>
          <div className={styles.heroActions}>
            <Link to="/practise" className={styles.primaryButton}>
              Zacznij ćwiczyć <ArrowRight size={18} />
            </Link>
            <Link to="/check" className={styles.secondaryButton}>
              Otwórz dłonie
            </Link>
          </div>
        </div>

        <div className={styles.heroArt}>
          <div className={styles.heroNumber}>25</div>
          <div className={styles.heroHands}>
            <LeftHand value={2} label="Dziesiątki" />
            <RightHand value={5} label="Jedności" />
          </div>
          <span className={styles.heroCaption}>Liczby zapisane na dłoniach</span>
        </div>
      </section>

      <section className={styles.homeFeatures}>
        <article className={styles.featureCard}>
          <span className={styles.featureIcon}><GraduationCap /></span>
          <h2 className={styles.featureCardH2}>Poćwicz</h2>
          <p className={styles.featureCardP}>Przejdź przez dodawanie krok po kroku i obserwuj zmiany na dłoniach.</p>
          <Link to="/practise" className={styles.featureCardLink}>Przejdź do ćwiczeń <ArrowRight size={16} /></Link>
        </article>
        <article className={styles.featureCard}>
          <span className={styles.featureIcon}><GraduationCap /></span>
          <h2 className={styles.featureCardH2}>Sprawdź wartość</h2>
          <p className={styles.featureCardP}>Klikaj palce i zobacz, jak zmienia się liczba od 0 do 99.</p>
          <Link to="/check" className={styles.featureCardLink}>Otwórz wizualizację <ArrowRight size={16} /></Link>
        </article>
      </section>
    </main>
  );
}
