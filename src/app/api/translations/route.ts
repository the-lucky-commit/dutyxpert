import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { isValidSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth"
import {
  readTranslations,
  sanitizeTranslations,
  writeTranslations,
} from "@/lib/data-store"

export async function GET() {
  return NextResponse.json(await readTranslations())
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!isValidSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const contentLength = Number(request.headers.get("content-length") || "0")
  if (contentLength > 500_000) {
    return NextResponse.json({ error: "ข้อมูลมีขนาดใหญ่เกินไป" }, { status: 413 })
  }

  try {
    const translations = sanitizeTranslations(await request.json())
    await writeTranslations(translations)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unable to save translations:", error)
    return NextResponse.json({ error: "ข้อมูลภาษาไม่ถูกต้อง" }, { status: 400 })
  }
}
