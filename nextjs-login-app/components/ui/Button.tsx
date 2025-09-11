"use client";
import React from "react";
import styles from "../styles/Button.module.css";

export default function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  );
}
