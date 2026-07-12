import type { Article } from "@/lib/data-store"

const SITE_NAME = "Duty Xpert Security"
const DEFAULT_ARTICLE_IMAGE = "https://dutyxpert.com/images/patrol-team.jpg"

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function truncate(value: string, maxLength: number) {
  const normalized = normalizeWhitespace(value)
  if (normalized.length <= maxLength) return normalized
  return `${normalized.slice(0, maxLength - 1).trim()}…`
}

export function buildArticleSeoTitle(article: Article) {
  const rawTitle = article.metaTitle || article.title
  const title = truncate(rawTitle, 70)
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
}

export function buildArticleSeoDescription(article: Article) {
  return truncate(article.metaDescription || article.excerpt || article.content, 160)
}

export function getArticleOgImage(article: Article) {
  return article.coverImageUrl || DEFAULT_ARTICLE_IMAGE
}

export function getArticleCanonicalUrl(article: Article) {
  return `https://dutyxpert.com/articles/${article.slug}`
}
