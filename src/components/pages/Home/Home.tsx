import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Button from "../../ui/Button";

const Home = () => {
  return (
    <main className={styles.home}>
      <div className={styles.glassPanel}>
        <h1>Welcome To WPU Cafe</h1>
        <p className={styles.description}>
          Kelola pesanan kafe Anda dengan mudah, cepat, dan elegan.
        </p>
        <Link to="/login" className={styles.action}>
          <Button>Mulai Sekarang</Button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
