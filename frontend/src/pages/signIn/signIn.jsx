import { useNavigate } from "react-router-dom";
import { use, useState } from "react";
import authApi from "../../api/authApi";

import styles from "./signIn.module.css";

import Button from "../../components/button/button";
import InputField from "../../components/inputField/inputField";

function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailPlaceholder, setEmailPlaceholder] = useState("Email");
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("Password");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  async function handleSignIn() {
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

    try {
      const response = await authApi.signIn({ email, password });
      console.log("Sign in successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Sign in failed:", error.response.data);
      alert(error.response.data.error);
    }
  }

  function handleSignUp() {
    navigate("/sign-up");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.title}>Sign In</p>
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
          placeholder={passwordPlaceholder}
          required={true}
          error={errorPassword}
        />
        <div className={styles.buttonSection}>
          <Button label="Sign In" onClick={handleSignIn} />
          <Button
            label="Don't have an account? Sign Up"
            onClick={handleSignUp}
            textButton={true}
          />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
