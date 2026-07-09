import styles from "./Button.module.css";

interface PropTypes {
  type?: "button" | "submit" | "reset";
  children: string;
  onClick?: () => void;
  className?: string;
  color?: "primary" | "secondary";
}

const Button = (props: PropTypes) => {
  const { type = "button", children, color = "primary", className } = props;
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[`button-${color}`]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
