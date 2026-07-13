import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { isValidSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth"
import {
  publishSiteContent,
  readSiteAssets,
  readSiteDraft,
  sanitizeSiteAssets,
  writeSiteDraft,
} from "@/lib/site-content-store"
import { sanitizeTranslations } from "@/lib/data-store"

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

async function requireAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  return isValidSessionToken(token)
}

async function parseSiteContentPayload(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0")
  if (contentLength > 1_000_000) {
    throw new Error("ข้อมูลมีขนาดใหญ่เกินไป")
  }

  const body = (await request.json()) as {
    translations?: unknown
    assets?: unknown
  }

  return {
    translations: sanitizeTranslations(body.translations),
    assets: sanitizeSiteAssets(body.assets),
  }
}

export async function GET() {
  if (!(await requireAdminSession())) return unauthorized()
  const draft = await readSiteDraft()
  const publishedAssets = await readSiteAssets()

  return NextResponse.json({ draft, publishedAssets })
}

export async function PUT(request: Request) {
  if (!(await requireAdminSession())) return unauthorized()

  try {
    const payload = await parseSiteContentPayload(request)
    return NextResponse.json(await writeSiteDraft(payload))
  } catch (error) {
    console.error("Unable to save site draft:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "บันทึกแบบร่างไม่สำเร็จ" },
      { status: 400 }
    )
  }
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) return unauthorized()

  try {
    const payload = await parseSiteContentPayload(request)
    return NextResponse.json(await publishSiteContent(payload))
  } catch (error) {
    console.error("Unable to publish site content:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "เผยแพร่ไม่สำเร็จ" },
      { status: 400 }
    )
  }
}
