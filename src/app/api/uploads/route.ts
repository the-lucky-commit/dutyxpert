import { randomUUID } from "crypto"
import { mkdir, writeFile } from "fs/promises"
import path from "path"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { isValidSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth"

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

async function requireAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  return isValidSessionToken(token)
}

function parseBase64Image(dataUrl: unknown) {
  if (typeof dataUrl !== "string") {
    throw new Error("Invalid image")
  }

  const match = dataUrl.match(/^data:image\/(webp|jpeg|jpg|png);base64,([a-zA-Z0-9+/=]+)$/)
  if (!match) {
    throw new Error("Invalid image format")
  }

  const extension = match[1] === "jpg" || match[1] === "jpeg" ? "jpg" : match[1]
  const buffer = Buffer.from(match[2], "base64")
  if (buffer.byteLength > 1_500_000) {
    throw new Error("Image is too large")
  }

  return { buffer, extension }
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) return unauthorized()

  const contentLength = Number(request.headers.get("content-length") || "0")
  if (contentLength > 2_200_000) {
    return NextResponse.json({ error: "รูปมีขนาดใหญ่เกินไป" }, { status: 413 })
  }

  try {
    const body = (await request.json()) as { image?: unknown }
    const { buffer, extension } = parseBase64Image(body.image)
    const uploadDir = path.join(process.cwd(), "public", "uploads", "articles")
    const filename = `${randomUUID()}.${extension}`
    const targetPath = path.join(uploadDir, filename)

    await mkdir(uploadDir, { recursive: true })
    await writeFile(targetPath, buffer, { mode: 0o644 })

    return NextResponse.json({ url: `/uploads/articles/${filename}` })
  } catch (error) {
    console.error("Unable to upload article image:", error)
    return NextResponse.json({ error: "ไม่สามารถอัปโหลดรูปได้" }, { status: 400 })
  }
}
