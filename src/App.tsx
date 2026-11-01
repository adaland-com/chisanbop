
import {
  Calculator,
  GraduationCap,
  Hand,
  House
} from "lucide-react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import styles from "./App.module.css";
import { HomePage, PractisePage, ValuePage } from "./pages";

function Header() {
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

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.appShell}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practise" element={<PractisePage />} />
          <Route path="/value" element={<ValuePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <footer className={styles.siteFooter}>Chisanbop · Nauka liczenia na palcach</footer>
      </div>
    </BrowserRouter>
  );
}
