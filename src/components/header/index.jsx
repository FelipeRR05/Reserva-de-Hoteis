import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>{"</hotéis>"}</h1>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <Link to={`/`}>
            <li className={styles.navItem}>Home</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
