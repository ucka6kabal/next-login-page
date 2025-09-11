"use client";
import React, { useState, useEffect } from "react";

export default function LanguageSwitcher({
  onChange,
  value,
}: {
  onChange: (lang: string) => void;
  value: string;
}) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <label style={{ fontSize: 12 }}>
        {value === "bg" ? "Език" : "Language"}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="en">English</option>
        <option value="bg">Български</option>
      </select>
    </div>
  );
}
