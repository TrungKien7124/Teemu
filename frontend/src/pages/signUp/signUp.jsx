import { useNavigate } from "react-router-dom";
import { useState } from "react";

import authApi from "../../api/authApi";

import styles from "./signUp.module.css";

import Button from "../../components/button/button";
import InputField from "../../components/inputField/inputField";

function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailPlaceholder, setEmailPlaceholder] = useState("Email");
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("Password");
  const [confirmPasswordPlaceholder, setConfirmPasswordPlaceholder] =
    useState("Password");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  async function handleSignUp() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorEmail(true);
      setEmailPlaceholder("Invalid email format");
      setEmail("");
      return;
    }

    if (password.length < 6) {
      setErrorPassword(true);
      setPasswordPlaceholder("Password must be at least 6 characters");
      setPassword("");
      return;
    }

    if (password !== confirmPassword) {
      setErrorPassword(true);
      setConfirmPasswordPlaceholder("Passwords do not match");
      setPasswordPlaceholder("Passwords do not match");
      setConfirmPassword("");
      setPassword("");
      return;
    }
    try {
      const response = await authApi.signUp({ email, password });
      console.log("Sign up successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Sign up failed:", error.response.data);
      alert(error.response.data.error);
    }
  }

  function handleSignIn() {
    navigate("/sign-in");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.title}>Sign Up</p>
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
          required={true}
          error={errorEmail}
        />
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required={true}
          error={errorPassword}
        />
        <InputField
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
          required={true}
          error={errorPassword}
        />
        <div className={styles.buttonSection}>
          <Button label="Sign Up" onClick={handleSignUp} />
          <Button
            label="Already have an account? Sign In"
            onClick={handleSignIn}
            textButton={true}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
