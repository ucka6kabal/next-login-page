"use client";
import React, { useEffect, useState } from "react";
import TextInput from "@/components/inputs/TextInput";
import Button from "@/components/ui/Button";
import SuccessScreen from "@/components/ui/SuccessScreen";
import styles from "@/components/styles/Form.module.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";

async function loadLocale(lang: string) {
  const res = await fetch(`/locales/${lang}/common.json`);
  return await res.json();
}

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [lang, setLang] = useState("en");
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    loadLocale(lang).then(setTranslations);
  }, [lang]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError(translations?.invalidEmail || "Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/auth/validate/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setSubmitted(true);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch {
      setError("Request failed");
    }
  }

  if (submitted) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
        <SuccessScreen
          title={
            translations?.resetSent?.replace("{{email}}", email) ||
            `Reset link sent to ${email}`
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
          <h1 style={{ margin: 0 }}>{translations?.forgotTitle || "Forgot Password"}</h1>
          <LanguageSwitcher value={lang} onChange={setLang} />
        </div>

        <form onSubmit={handleSubmit}>
          <TextInput
            label={translations?.email || "Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          {error && <div className={styles.error}>{error}</div>}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 12,
            }}>
            <Button type="submit">{translations?.submit || "Submit"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
