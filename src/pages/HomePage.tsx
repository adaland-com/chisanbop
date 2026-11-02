
import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LeftHand, RightHand } from "../components";

import styles from "./HomePage.module.css";

export function HomePage() {
  const { t } = useTranslation();

  return (
    <main className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className="eyebrow">{t("home.eyebrow")}</span>
          <h1 className={styles.heroH1}>{t("home.title")}<br /><span className={styles.heroH1Span}>{t("home.titleSpan")}</span></h1>
          <p className={styles.heroCopyP}>
            {t("home.subtitle")}
          </p>
          <div className={styles.heroActions}>
            <Link to="/practise" className={styles.primaryButton}>
              {t("home.startPractise")} <ArrowRight size={18} />
            </Link>
            <Link to="/value" className={styles.secondaryButton}>
              {t("home.openHands")}
            </Link>
          </div>
        </div>

        <div className={styles.heroArt}>
          <div className={styles.heroNumber}>25</div>
          <div className={styles.heroHands}>
            <LeftHand value={2} label={t("home.tens")} />
            <RightHand value={5} label={t("home.units")} />
          </div>
          <span className={styles.heroCaption}>{t("home.heroCaption")}</span>
        </div>
      </section>

      <section className={styles.homeFeatures}>
        <article className={styles.featureCard}>
          <span className={styles.featureIcon}><GraduationCap /></span>
          <h2 className={styles.featureCardH2}>{t("home.practiceTitle")}</h2>
          <p className={styles.featureCardP}>{t("home.practiceDescription")}</p>
          <Link to="/practise" className={styles.featureCardLink}>{t("home.practiceLink")} <ArrowRight size={16} /></Link>
        </article>
        <article className={styles.featureCard}>
          <span className={styles.featureIcon}><GraduationCap /></span>
          <h2 className={styles.featureCardH2}>{t("home.checkValueTitle")}</h2>
          <p className={styles.featureCardP}>{t("home.checkValueDescription")}</p>
          <Link to="/value" className={styles.featureCardLink}>{t("home.checkValueLink")} <ArrowRight size={16} /></Link>
        </article>
      </section>
    </main>
  );
}
