import type { MetadataRoute } from "next"

const baseUrl = "https://dutyxpert.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/services", "/pricing", "/contact", "/privacy-policy", "/terms-of-service"].map((pagePath, index) => ({
    url: `${baseUrl}${pagePath}`,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }))
}
