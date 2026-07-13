import { NextResponse } from "next/server"
import { readPublishedArticles } from "@/lib/data-store"
import { normalizeLanguage } from "@/lib/language"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const language = normalizeLanguage(searchParams.get("language"))
  const articles = await readPublishedArticles(language)

  return NextResponse.json(
    articles.slice(0, 3).map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      coverImageUrl: article.coverImageUrl,
      publishedAt: article.publishedAt,
      language: article.language,
    }))
  )
}
