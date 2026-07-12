"use client"

import * as React from "react"
import defaultTranslations from "@/lib/translations.json"
import type { TranslationsDict } from "@/lib/data-store"
import {
  LANGUAGE_COOKIE_NAME,
  LANGUAGE_STORAGE_KEY,
  type Language,
  normalizeLanguage,
} from "@/lib/language"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (keyPath: string) => string
  updateTranslations: (newDict: TranslationsDict) => void
  translations: TranslationsDict
}

const LANGUAGE_CHANGE_EVENT = "dxs-language-change"
const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

function getCookieLanguage(): Language | undefined {
  if (typeof document === "undefined") return undefined
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${LANGUAGE_COOKIE_NAME}=`))
  if (!cookie) return undefined
  return normalizeLanguage(decodeURIComponent(cookie.split("=")[1] ?? ""))
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function subscribeToLanguage(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener(LANGUAGE_CHANGE_EVENT, callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, callback)
  }
}

function getLanguageSnapshot(): Language {
  return getCookieLanguage() ?? "th"
}

function findTranslation(source: unknown, keyPath: string, language: Language) {
  let current: unknown = source
  for (const key of keyPath.split(".")) {
    if (!isRecord(current) || !(key in current)) return undefined
    current = current[key]
  }

  if (!isRecord(current)) return undefined
  const value = current[language]
  return typeof value === "string" ? value : undefined
}

export function LanguageProvider({
  children,
  initialTranslations = defaultTranslations,
  initialLanguage = "th",
}: {
  children: React.ReactNode
  initialTranslations?: TranslationsDict
  initialLanguage?: Language
}) {
  const language = React.useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    () => initialLanguage
  )
  const [translations, setTranslations] = React.useState<TranslationsDict>(initialTranslations)

  const setLanguage = React.useCallback((nextLanguage: Language) => {
    const normalizedLanguage = normalizeLanguage(nextLanguage)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage)
    document.cookie = `${LANGUAGE_COOKIE_NAME}=${normalizedLanguage}; Path=/; Max-Age=31536000; SameSite=Lax`
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT))
  }, [])

  const t = React.useCallback(
    (keyPath: string) =>
      findTranslation(translations, keyPath, language) ??
      findTranslation(defaultTranslations, keyPath, language) ??
      keyPath,
    [language, translations]
  )

  const contextValue = React.useMemo(
    () => ({
      language,
      setLanguage,
      t,
      updateTranslations: setTranslations,
      translations,
    }),
    [language, setLanguage, t, translations]
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
