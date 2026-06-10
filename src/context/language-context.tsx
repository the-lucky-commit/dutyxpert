"use client"

import * as React from "react"
import defaultTranslations from "@/lib/translations.json"

type Language = "th" | "en"
type TranslationsDict = typeof defaultTranslations

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (keyPath: string) => string
  updateTranslations: (newDict: TranslationsDict) => void
  translations: TranslationsDict
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>("th")
  const [translations, setTranslations] = React.useState<TranslationsDict>(defaultTranslations)

  // Load language preference from LocalStorage
  React.useEffect(() => {
    const savedLang = localStorage.getItem("dxs-lang") as Language
    if (savedLang === "th" || savedLang === "en") {
      setLanguageState(savedLang)
    }

    // Proactively fetch updated translations from API route (to reflect Admin changes)
    const fetchTranslations = async () => {
      try {
        const res = await fetch("/api/translations")
        if (res.ok) {
          const data = await res.json()
          setTranslations(data)
        }
      } catch (err) {
        console.error("Failed to fetch translations from API, using defaults:", err)
      }
    }
    fetchTranslations()
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("dxs-lang", lang)
  }

  const updateTranslations = (newDict: TranslationsDict) => {
    setTranslations(newDict)
  }

  // T Function: retrieve nested translation value
  const t = React.useCallback(
    (keyPath: string): string => {
      const keys = keyPath.split(".")
      let currentObj: any = translations

      for (const key of keys) {
        if (currentObj && typeof currentObj === "object" && key in currentObj) {
          currentObj = currentObj[key]
        } else {
          // Fallback to default translations
          let fallbackObj: any = defaultTranslations
          for (const fallbackKey of keys) {
            if (fallbackObj && typeof fallbackObj === "object" && fallbackKey in fallbackObj) {
              fallbackObj = fallbackObj[fallbackKey]
            } else {
              fallbackObj = undefined
              break
            }
          }
          currentObj = fallbackObj
          break
        }
      }

      if (currentObj && typeof currentObj === "object") {
        const textVal = currentObj[language]
        if (typeof textVal === "string") return textVal
      }
      
      return keyPath // Fallback if key not found
    },
    [language, translations]
  )

  const contextValue = React.useMemo(
    () => ({
      language,
      setLanguage,
      t,
      updateTranslations,
      translations
    }),
    [language, t, translations]
  )

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
