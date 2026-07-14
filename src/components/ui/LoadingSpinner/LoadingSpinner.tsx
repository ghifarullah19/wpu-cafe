import styles from "./LoadingSpinner.module.css";

interface PropTypes {
  size?: number | string;
  color?: string;
  className?: string;
  centered?: boolean;
}

const LoadingSpinner = (props: PropTypes) => {
  const { size = 24, color = "var(--color-primary)", className, centered } = props;
  const resolvedSize = typeof size === "number" ? `${size}px` : size;

  const spinner = (
    <span
      className={`${styles.spinner} ${className ?? ""}`.trim()}
      role="status"
      aria-label="Loading"
      style={{
        width: resolvedSize,
        height: resolvedSize,
        color: color,
      }}
    />
  );

  if (centered) {
    return <div className={styles.centeredWrapper}>{spinner}</div>;
  }

  return spinner;
};

export default LoadingSpinner;
