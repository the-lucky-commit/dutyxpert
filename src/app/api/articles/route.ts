import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { isValidSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth"
import {
  type Article,
  readArticles,
  sanitizeArticle,
  writeArticles,
} from "@/lib/data-store"

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

async function requireAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  return isValidSessionToken(token)
}

function normalizeArticlePayload(value: unknown, existing?: Article): Article {
  const now = new Date().toISOString()
  const payload = value && typeof value === "object" ? value : {}

  return sanitizeArticle({
    ...existing,
    ...payload,
    id: existing?.id || randomUUID(),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    publishedAt:
      typeof (payload as { publishedAt?: unknown }).publishedAt === "string"
        ? (payload as { publishedAt: string }).publishedAt
        : existing?.publishedAt || now,
  })
}

export async function GET() {
  if (!(await requireAdminSession())) return unauthorized()
  return NextResponse.json(await readArticles())
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) return unauthorized()

  const contentLength = Number(request.headers.get("content-length") || "0")
  if (contentLength > 750_000) {
    return NextResponse.json({ error: "ข้อมูลบทความมีขนาดใหญ่เกินไป" }, { status: 413 })
  }

  try {
    const articles = await readArticles()
    const article = normalizeArticlePayload(await request.json())

    if (articles.some((item) => item.slug === article.slug)) {
      return NextResponse.json({ error: "Slug นี้ถูกใช้งานแล้ว" }, { status: 409 })
    }

    await writeArticles([article, ...articles])
    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error("Unable to create article:", error)
    return NextResponse.json({ error: "ข้อมูลบทความไม่ถูกต้อง" }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  if (!(await requireAdminSession())) return unauthorized()

  const contentLength = Number(request.headers.get("content-length") || "0")
  if (contentLength > 750_000) {
    return NextResponse.json({ error: "ข้อมูลบทความมีขนาดใหญ่เกินไป" }, { status: 413 })
  }

  try {
    const body = (await request.json()) as { id?: unknown }
    if (typeof body.id !== "string") {
      return NextResponse.json({ error: "ไม่พบรหัสบทความ" }, { status: 400 })
    }

    const articles = await readArticles()
    const existing = articles.find((article) => article.id === body.id)
    if (!existing) {
      return NextResponse.json({ error: "ไม่พบบทความ" }, { status: 404 })
    }

    const updatedArticle = normalizeArticlePayload(body, existing)
    if (articles.some((item) => item.id !== updatedArticle.id && item.slug === updatedArticle.slug)) {
      return NextResponse.json({ error: "Slug นี้ถูกใช้งานแล้ว" }, { status: 409 })
    }

    await writeArticles(
      articles.map((article) => (article.id === updatedArticle.id ? updatedArticle : article))
    )
    return NextResponse.json(updatedArticle)
  } catch (error) {
    console.error("Unable to update article:", error)
    return NextResponse.json({ error: "ข้อมูลบทความไม่ถูกต้อง" }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  if (!(await requireAdminSession())) return unauthorized()

  try {
    const body = (await request.json()) as { id?: unknown }
    if (typeof body.id !== "string") {
      return NextResponse.json({ error: "ไม่พบรหัสบทความ" }, { status: 400 })
    }

    const articles = await readArticles()
    const nextArticles = articles.filter((article) => article.id !== body.id)
    if (nextArticles.length === articles.length) {
      return NextResponse.json({ error: "ไม่พบบทความ" }, { status: 404 })
    }

    await writeArticles(nextArticles)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unable to delete article:", error)
    return NextResponse.json({ error: "ไม่สามารถลบบทความได้" }, { status: 400 })
  }
}
