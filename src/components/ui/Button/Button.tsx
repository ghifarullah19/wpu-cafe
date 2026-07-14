import styles from "./Button.module.css";
import React from "react";

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: "primary" | "secondary";
  isLoading?: boolean;
}

const Button = ({
  type = "button",
  children,
  color = "primary",
  className,
  isLoading,
  disabled,
  ...props
}: PropTypes) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[`button-${color}`]} ${className || ""} ${isLoading ? styles.loading : ""}`.trim()}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
