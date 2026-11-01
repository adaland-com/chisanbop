import { Link, NavLink } from "react-router-dom";
import { House, GraduationCap, Calculator, Hand } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.siteHeader}>
      <Link to="/" className={styles.brand}>
        <span className={styles.brandIcon}><Hand size={21} /></span>
        Chisanbop
      </Link>

      <nav className={styles.mainNav}>
        <NavLink to="/" end className={({ isActive }) => `${styles.mainNavLink} ${isActive ? styles.mainNavLinkActive : ""}`}><House size={17} /> Start</NavLink>
        <NavLink to="/practise" className={({ isActive }) => `${styles.mainNavLink} ${isActive ? styles.mainNavLinkActive : ""}`}><GraduationCap size={17} /> Poćwicz</NavLink>
        <NavLink to="/value" className={({ isActive }) => `${styles.mainNavLink} ${isActive ? styles.mainNavLinkActive : ""}`}><Calculator size={17} /> Wartość</NavLink>
      </nav>
    </header>
  );
}