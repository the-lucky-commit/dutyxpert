import { appendFile, mkdir, readFile, rename, writeFile } from "fs/promises"
import path from "path"
import defaultTranslations from "@/lib/translations.json"

export type TranslationsDict = typeof defaultTranslations

export type ContactSubmission = {
  id: string
  createdAt: string
  name: string
  company: string
  email: string
  phone: string
  siteType: string
  subject: string
  message: string
  ip: string
}

const DEFAULT_DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "dutyxpert-data")
  : path.join(process.cwd(), "data")

function getDataDir() {
  return process.env.DUTYXPERT_DATA_DIR || DEFAULT_DATA_DIR
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function sanitizeUsingTemplate(value: unknown, template: unknown): unknown {
  if (typeof template === "string") {
    if (typeof value !== "string" || value.length > 5_000) {
      throw new Error("Invalid translation value")
    }
    return value
  }

  if (!isRecord(value) || !isRecord(template)) {
    throw new Error("Invalid translation structure")
  }

  return Object.fromEntries(
    Object.entries(template).map(([key, childTemplate]) => {
      if (!(key in value)) throw new Error(`Missing translation key: ${key}`)
      return [key, sanitizeUsingTemplate(value[key], childTemplate)]
    })
  )
}

export function sanitizeTranslations(value: unknown): TranslationsDict {
  return sanitizeUsingTemplate(value, defaultTranslations) as TranslationsDict
}

export async function readTranslations(): Promise<TranslationsDict> {
  try {
    const file = await readFile(path.join(getDataDir(), "translations.json"), "utf8")
    return sanitizeTranslations(JSON.parse(file))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error("Unable to read persisted translations:", error)
    }
    return defaultTranslations
  }
}

export async function writeTranslations(translations: TranslationsDict) {
  const dataDir = getDataDir()
  const targetPath = path.join(dataDir, "translations.json")
  const temporaryPath = `${targetPath}.${process.pid}.tmp`

  await mkdir(dataDir, { recursive: true })
  await writeFile(temporaryPath, JSON.stringify(translations, null, 2), {
    encoding: "utf8",
    mode: 0o600,
  })
  await rename(temporaryPath, targetPath)
}

export async function recordContactSubmission(submission: ContactSubmission) {
  const dataDir = getDataDir()
  await mkdir(dataDir, { recursive: true })
  await appendFile(
    path.join(dataDir, "contact-submissions.jsonl"),
    `${JSON.stringify(submission)}\n`,
    { encoding: "utf8", mode: 0o600 }
  )
}
