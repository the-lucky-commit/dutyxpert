export type Language = "th" | "en"

export const DEFAULT_LANGUAGE: Language = "th"
export const LANGUAGE_STORAGE_KEY = "dxs-lang"
export const LANGUAGE_COOKIE_NAME = "dxs-lang"

export function normalizeLanguage(value: unknown): Language {
  return value === "en" ? "en" : DEFAULT_LANGUAGE
}

export function getLanguageLabel(language: Language) {
  return language === "en" ? "English" : "ภาษาไทย"
}
