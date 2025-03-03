// context/LanguageContext.tsx | The context provider for the language, which automatically sets the language based on the user's browser language
import { useState, useEffect, ReactNode } from "react";
import { LanguageContext } from "./LanguageContextTypes";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");

  // Set the language based on the user's browser language
  useEffect(() => {
    const userLang = navigator.language;
    if (userLang.startsWith("da")) {
      setLanguage("da");
    } else {
      setLanguage("en");
    }
  }, []);

  // Function to toggle the language
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "da" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};