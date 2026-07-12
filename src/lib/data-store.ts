import { appendFile, mkdir, readFile, rename, writeFile } from "fs/promises"
import path from "path"
import defaultTranslations from "@/lib/translations.json"
import { type Language, normalizeLanguage } from "@/lib/language"

export type TranslationsDict = typeof defaultTranslations

export type Article = {
  id: string
  translationGroupId: string
  language: Language
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  coverImageUrl: string
  metaTitle: string
  metaDescription: string
  published: boolean
  publishedAt: string
  createdAt: string
  updatedAt: string
}

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
    if (value === undefined) return template
    if (typeof value !== "string" || value.length > 5_000) {
      throw new Error("Invalid translation value")
    }
    return value
  }

  if ((value === undefined || value === null) && isRecord(template)) {
    return template
  }

  if (!isRecord(value) || !isRecord(template)) {
    throw new Error("Invalid translation structure")
  }

  return Object.fromEntries(
    Object.entries(template).map(([key, childTemplate]) => {
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

const ARTICLE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function sanitizeString(value: unknown, maxLength: number, fieldName: string) {
  if (typeof value !== "string") {
    throw new Error(`Invalid article ${fieldName}`)
  }
  const trimmed = value.trim()
  if (trimmed.length > maxLength) {
    throw new Error(`Article ${fieldName} is too long`)
  }
  return trimmed
}

function sanitizeOptionalImageUrl(value: unknown) {
  const imageUrl = sanitizeString(value ?? "", 500, "cover image URL")
  if (!imageUrl) return ""
  if (imageUrl.startsWith("/images/")) return imageUrl

  try {
    const parsed = new URL(imageUrl)
    if (parsed.protocol === "https:" || parsed.protocol === "http:") return imageUrl
  } catch {
    // handled below
  }

  throw new Error("Article cover image URL must be /images/... or http(s)")
}

function sanitizeIsoDate(value: unknown, fallback: string) {
  const candidate = typeof value === "string" && value.trim() ? value.trim() : fallback
  const parsed = Date.parse(candidate)
  if (!Number.isFinite(parsed)) {
    throw new Error("Invalid article date")
  }
  return new Date(parsed).toISOString()
}

export function sanitizeArticle(value: unknown): Article {
  if (!isRecord(value)) {
    throw new Error("Invalid article")
  }

  const now = new Date().toISOString()
  const id = sanitizeString(value.id ?? "", 80, "id")
  const translationGroupId = sanitizeString(value.translationGroupId ?? id, 80, "translation group id")
  const language = normalizeLanguage(value.language)
  const slug = sanitizeString(value.slug, 120, "slug").toLowerCase()
  const title = sanitizeString(value.title, 160, "title")
  const excerpt = sanitizeString(value.excerpt, 320, "excerpt")
  const content = sanitizeString(value.content, 30_000, "content")
  const category = sanitizeString(value.category ?? "ข่าวสาร", 80, "category")
  const metaTitle = sanitizeString(value.metaTitle ?? title, 180, "meta title")
  const metaDescription = sanitizeString(value.metaDescription ?? excerpt, 320, "meta description")

  if (!id) throw new Error("Article id is required")
  if (!ARTICLE_SLUG_PATTERN.test(slug)) throw new Error("Article slug is invalid")
  if (!title) throw new Error("Article title is required")
  if (!excerpt) throw new Error("Article excerpt is required")
  if (!content) throw new Error("Article content is required")

  return {
    id,
    translationGroupId,
    language,
    slug,
    title,
    excerpt,
    content,
    category,
    coverImageUrl: sanitizeOptionalImageUrl(value.coverImageUrl),
    metaTitle,
    metaDescription,
    published: Boolean(value.published),
    publishedAt: sanitizeIsoDate(value.publishedAt, now),
    createdAt: sanitizeIsoDate(value.createdAt, now),
    updatedAt: sanitizeIsoDate(value.updatedAt, now),
  }
}

export function sanitizeArticles(value: unknown): Article[] {
  if (!Array.isArray(value)) {
    throw new Error("Invalid articles collection")
  }
  const articles = value.map(sanitizeArticle)
  const seenIds = new Set<string>()
  const seenSlugs = new Set<string>()

  for (const article of articles) {
    if (seenIds.has(article.id)) throw new Error("Duplicate article id")
    if (seenSlugs.has(article.slug)) throw new Error("Duplicate article slug")
    seenIds.add(article.id)
    seenSlugs.add(article.slug)
  }

  return articles.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
}

export async function readArticles(): Promise<Article[]> {
  try {
    const file = await readFile(path.join(getDataDir(), "articles.json"), "utf8")
    return sanitizeArticles(JSON.parse(file))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error("Unable to read persisted articles:", error)
    }
    return []
  }
}

export async function writeArticles(articles: Article[]) {
  const dataDir = getDataDir()
  const targetPath = path.join(dataDir, "articles.json")
  const temporaryPath = `${targetPath}.${process.pid}.tmp`

  await mkdir(dataDir, { recursive: true })
  await writeFile(temporaryPath, JSON.stringify(sanitizeArticles(articles), null, 2), {
    encoding: "utf8",
    mode: 0o600,
  })
  await rename(temporaryPath, targetPath)
}

export async function readPublishedArticles(language?: Language) {
  const articles = await readArticles()
  return articles.filter((article) => {
    if (!article.published) return false
    return language ? article.language === language : true
  })
}

export async function readPublishedArticleBySlug(slug: string, language?: Language) {
  const articles = await readPublishedArticles()
  return articles.find((article) => {
    if (article.slug !== slug) return false
    return language ? article.language === language : true
  })
}
