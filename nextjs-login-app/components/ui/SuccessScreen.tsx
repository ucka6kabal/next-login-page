"use client";
import React from "react";
import styles from "../styles/Success.module.css";

export default function SuccessScreen({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      {subtitle && <p className={styles.sub}>{subtitle}</p>}
      <div>{children}</div>
    </div>
  );
}
