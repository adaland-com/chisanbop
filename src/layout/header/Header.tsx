import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { House, GraduationCap, Calculator, Hand, ChevronDown } from "lucide-react";
import styles from "./Header.module.css";
import i18n from "../../i18n";

export default function Header() {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const currentLanguage = i18n.language;

  const changeLanguage = (language: "en" | "pl") => {
    i18n.changeLanguage(language);
    localStorage.setItem("app-language", language);
    setIsLanguageDropdownOpen(false);
  };


  return (
  <header className={styles.siteHeader}>
    <Link to="/" className={styles.brand}>
      <span className={styles.brandIcon}><Hand size={21} /></span>
      Chisanbop
    </Link>

    <nav className={styles.mainNav}>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${styles.mainNavLink} ${isActive ? styles.mainNavLinkActive : ""}`
        }
      >
        <House size={17} /> Start
      </NavLink>

      <NavLink
        to="/practise"
        className={({ isActive }) =>
          `${styles.mainNavLink} ${isActive ? styles.mainNavLinkActive : ""}`
        }
      >
        <GraduationCap size={17} /> Poćwicz
      </NavLink>

      <NavLink
        to="/value"
        className={({ isActive }) =>
          `${styles.mainNavLink} ${isActive ? styles.mainNavLinkActive : ""}`
        }
      >
        <Calculator size={17} /> Wartość
      </NavLink>
    </nav>

    <div className={styles.languageSelector}>
      <button
        className={styles.languageButton}
        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
        aria-expanded={isLanguageDropdownOpen}
      >
        <span>{currentLanguage === "en" ? "🇬🇧 EN" : "🇵🇱 PL"}</span>
        <ChevronDown
          size={16}
          className={isLanguageDropdownOpen ? styles.chevronRotated : ""}
        />
      </button>

      {isLanguageDropdownOpen && (
        <div className={styles.languageDropdown}>
          <button
            className={`${styles.languageOption} ${
              currentLanguage === "en" ? styles.languageOptionActive : ""
            }`}
            onClick={() => {
              changeLanguage("en");
              setIsLanguageDropdownOpen(false);
            }}
          >
            <span className={styles.languageFlag}>🇬🇧</span>
            English
          </button>

          <button
            className={`${styles.languageOption} ${
              currentLanguage === "pl" ? styles.languageOptionActive : ""
            }`}
            onClick={() => {
              changeLanguage("pl");
              setIsLanguageDropdownOpen(false);
            }}
          >
            <span className={styles.languageFlag}>🇵🇱</span>
            Polski
          </button>
        </div>
      )}
    </div>
  </header>
);
}