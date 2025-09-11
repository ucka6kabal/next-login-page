"use client";
import React, { useState, useEffect } from "react";
import TextInput from "../../components/inputs/TextInput";
import Button from "../../components/ui/Button";
import SuccessScreen from "../../components/ui/SuccessScreen";
import styles from "../../components/styles/Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/slices";
import {
  setCredentials,
  setError,
  clearError,
} from "../../store/slices/authSlice";
import Link from "next/link";
import LanguageSwitcher from "../../components/LanguageSwitcher";

// simple i18n loader (client) - reads public locale JSONs
async function loadLocale(lang: string) {
  const res = await fetch(`/locales/${lang}/common.json`);
  return await res.json();
}

export default function LoginPage() {
  const dispatch = useDispatch();
  const auth = useSelector((s: RootState) => s.auth);

  const [lang, setLang] = useState("en");
  const [t, setT] = useState<any>({});

  useEffect(() => {
    loadLocale(lang).then(setT);
  }, [lang]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successName, setSuccessName] = useState<string | null>(null);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    dispatch(clearError());

    try {
      const res = await fetch("/api/auth/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data?.ok) {
        dispatch(setCredentials({ email: data.email, name: data.name }));
        setSuccessName(data.name);
      } else {
        dispatch(setError(t?.loginError || "Invalid credentials"));
      }
    } catch (err) {
      dispatch(setError(t?.loginError || "Invalid credentials"));
    } finally {
      setLoading(false);
    }
  }

  if (successName) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
        <SuccessScreen
          title={
            t?.loginSuccess?.replace("{{name}}", successName) ||
            `Login successful!`
          }
        />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
      <div className={styles.formCard}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}>
          <h1 style={{ margin: 0 }}>{t?.loginTitle || "Sign in"}</h1>
          <LanguageSwitcher value={lang} onChange={setLang} />
        </div>

        <form onSubmit={handleLogin}>
          <TextInput
            label={t?.email || "Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <TextInput
            label={t?.password || "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          {auth.error && (
            <div className={styles.error} role="alert">
              {auth.error}
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 12,
            }}>
            <Link href="/forgot-password" className={styles.link}>
              {t?.forgotPassword || "Forgot Password?"}
            </Link>
            <Button type="submit" disabled={loading}>
              {t?.login || "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
