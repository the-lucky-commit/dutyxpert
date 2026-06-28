import { NextResponse } from "next/server"
import {
  createSessionToken,
  hasValidAdminCredentials,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth"

const attempts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const current = attempts.get(ip)
  if (!current || current.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 })
    return false
  }
  current.count += 1
  return current.count > 10
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "ลองเข้าสู่ระบบหลายครั้งเกินไป กรุณารอ 15 นาที" },
      { status: 429 }
    )
  }

  try {
    const body = (await request.json()) as { username?: unknown; password?: unknown }
    if (typeof body.username !== "string" || typeof body.password !== "string") {
      return NextResponse.json({ error: "ข้อมูลเข้าสู่ระบบไม่ถูกต้อง" }, { status: 400 })
    }

    if (!hasValidAdminCredentials(body.username, body.password)) {
      return NextResponse.json({ error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 })
    }

    attempts.delete(ip)
    const response = NextResponse.json({ success: true })
    response.cookies.set(SESSION_COOKIE_NAME, createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    })
    return response
  } catch (error) {
    console.error("Admin login failed:", error)
    return NextResponse.json({ error: "ระบบเข้าสู่ระบบยังไม่พร้อมใช้งาน" }, { status: 503 })
  }
}
