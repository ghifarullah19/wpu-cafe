import styles from "./Skeleton.module.css";

interface SkeletonProps {
  type?: "menuCard" | "orderCard";
  count?: number;
}

const Skeleton = ({ type = "menuCard", count = 1 }: SkeletonProps) => {
  const elements = Array.from({ length: count }).map((_, i) => (
    <div key={i} className={`${styles.skeleton} ${styles[type]}`}>
      {type === "menuCard" && (
        <>
          <div className={styles.imagePlaceholder} />
          <div className={styles.titlePlaceholder} />
          <div className={styles.bottomPlaceholder}>
            <div className={styles.pricePlaceholder} />
            <div className={styles.buttonPlaceholder} />
          </div>
        </>
      )}
      {type === "orderCard" && (
        <>
          <div className={styles.row} />
          <div className={styles.row} />
          <div className={styles.row} />
        </>
      )}
      <div className={styles.shimmer} />
    </div>
  ));

  return <>{elements}</>;
};

export default Skeleton;
