import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import { setLocalStorage } from "@/helpers/localStorage";
import { setCookie } from "@/helpers/cookieHelper";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setLogin } = useAppContext();
  const router = useRouter();

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter the credentials");
      return;
    }
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        // expiresInMins: 60, // optional
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          setLogin(true);
          setLocalStorage("token", res.token);
          setCookie("token", res.token, 2);
          router.push("/products");
          return;
        }
        setError(res.message);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div className={styles.form}>
      <h3 className={styles.title}>Login</h3>
      <input
        className={styles.login_fields}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        className={styles.login_fields}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button className={styles.login_fields} onClick={handleLogin}>
        Login
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default LoginPage;
