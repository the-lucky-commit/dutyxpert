import type { MetadataRoute } from "next"
import { readPublishedArticles } from "@/lib/data-store"

const baseUrl = "https://dutyxpert.com"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about", "/services", "/articles", "/pricing", "/contact", "/privacy-policy", "/terms-of-service"].map((pagePath, index) => {
    const changeFrequency: "weekly" | "monthly" = index === 0 ? "weekly" : "monthly"
    return {
      url: `${baseUrl}${pagePath}`,
      changeFrequency,
      priority: index === 0 ? 1 : 0.8,
    }
  })

  const articles = await readPublishedArticles()
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...pages, ...articlePages]
}
