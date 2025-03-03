// context/LanguageContextTypes.ts | TypeScript file that contains the context for the language
import { createContext } from "react";

export interface LanguageContextProps {
  language: string;
  toggleLanguage: () => void;
}

// Create a context for the language
export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);