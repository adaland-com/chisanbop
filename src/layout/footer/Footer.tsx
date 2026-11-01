import styles from "./Footer.module.css";
import { SOCIALS, DEVELOPER_SOCIALS } from "../../constants/DEV_SOCIALS";

const appVersion = "1.0.0";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.copyright}>
      <div className={styles.mxAuto}>
        v{appVersion} Made with{" "}
        <span className={styles.heart}>&hearts;</span> &copy; {currentYear} by{" "}
        <a href="https://the-adaland.web.app/contact">Adaland</a> in{" "}
        <span>Country of Pierogi</span>
      </div>

      <div className={styles.additionalInfo}>
        <div className={styles.logo}>
          {Object.entries(DEVELOPER_SOCIALS).map(([name, social]) => (
            <a
              key={name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              title={social.label}
            >
              {social.logoUrl && (
                <img
                  src={social.logoUrl}
                  alt={social.label}
                  className={styles.socialLogo}
                />
              )}
            </a>
          ))}

          <a
            href={`mailto:${SOCIALS.email.url}`}
            aria-label="Email"
            title={SOCIALS.email.label}
          >
            {SOCIALS.email.logoUrl && (
              <img
                src={SOCIALS.email.logoUrl}
                alt={SOCIALS.email.label}
                className={styles.socialLogo}
              />
            )}
          </a>

          <a
            href={SOCIALS.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title={SOCIALS.linkedin.label}
          >
            {SOCIALS.linkedin.logoUrl && (
              <img
                src={SOCIALS.linkedin.logoUrl}
                alt={SOCIALS.linkedin.label}
                className={styles.socialLogo}
              />
            )}
          </a>
        </div>
      </div>
    </footer>
  );
}