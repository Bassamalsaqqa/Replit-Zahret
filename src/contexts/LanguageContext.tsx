import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (ar: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("app-lang");
    return (saved === "ar" || saved === "en") ? saved : "ar";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-lang", lang);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.dir = language === "ar" ? "rtl" : "ltr";
    root.lang = language;
    
    // Apply appropriate font family
    if (language === "ar") {
      document.body.style.fontFamily = "var(--font-cairo)";
    } else {
      document.body.style.fontFamily = "var(--font-inter)";
    }
  }, [language]);

  const t = (ar: string, en: string) => {
    return language === "ar" ? ar : en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
