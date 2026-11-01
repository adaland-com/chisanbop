
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import styles from "./App.module.css";
import { Header } from "./layout";
import { HomePage, PractisePage, ValuePage } from "./pages";

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
