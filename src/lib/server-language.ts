import { cookies } from "next/headers"
import { LANGUAGE_COOKIE_NAME, normalizeLanguage } from "@/lib/language"

export async function getRequestLanguage() {
  const cookieStore = await cookies()
  return normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE_NAME)?.value)
}
