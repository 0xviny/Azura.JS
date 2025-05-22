"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "pt"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Simple translation function
  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        home: "Home",
        docs: "Documentation",
        github: "GitHub",
        // Add more translations as needed
      },
      pt: {
        home: "Início",
        docs: "Documentação",
        github: "GitHub",
        // Add more translations as needed
      },
    }

    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
