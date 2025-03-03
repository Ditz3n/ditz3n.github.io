// context/useLanguage.ts | Seperated useLanguage hook into its own file to avoid ESLint warnings
"use client";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContextTypes";

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};