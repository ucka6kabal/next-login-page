"use client";
import React from "react";
import styles from "../styles/Form.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function TextInput({ label, ...props }: Props) {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={styles.input} {...props} />
    </div>
  );
}
