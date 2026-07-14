import styles from "./Login.module.css";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useState, type FormEvent } from "react";
import { login } from "../../../services/auth.service";
import { setLocalStorage } from "../../../utils/storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const payload = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      setIsLoading(true);
      const result = await login(payload);
      setLocalStorage("auth", result.token);

      return navigate("/orders");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.login}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>WPU Cafe POS</h1>
          <p className={styles.subtitle}>Welcome back! Please enter your details.</p>
        </div>
        <form action="" className={styles.form} onSubmit={handleLogin}>
          <Input
            label="Email"
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <Button type="submit" isLoading={isLoading}>Sign In</Button>
        </form>
      </div>
    </main>
  );
};

export default Login;
