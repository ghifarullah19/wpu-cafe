import type { ChangeEventHandler } from "react";
import styles from "./Input.module.css";

interface PropTypes {
  label?: string;
  name: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = (props: PropTypes) => {
  const {
    label,
    name,
    id,
    type = "text",
    placeholder,
    required = false,
    className,
    value,
    onChange,
  } = props;

  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <input
        type={type}
        id={id}
        className={`${styles.input} ${className || ""}`}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
