import { randomUUID } from "crypto"
import nodemailer from "nodemailer"
import { NextResponse } from "next/server"
import { recordContactSubmission, type ContactSubmission } from "@/lib/data-store"

type ContactBody = {
  name?: unknown
  company?: unknown
  email?: unknown
  phone?: unknown
  siteType?: unknown
  subject?: unknown
  message?: unknown
  website?: unknown
}

const requests = new Map<string, { count: number; resetAt: number }>()
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const current = requests.get(ip)
  if (!current || current.resetAt <= now) {
    requests.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 })
    return false
  }
  current.count += 1
  return current.count > 5
}

async function sendNotification(submission: ContactSubmission) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return

  const port = Number(SMTP_PORT || "465")
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  })

  await transporter.sendMail({
    from: `Duty Xpert Website <${SMTP_USER}>`,
    to: process.env.CONTACT_RECIPIENT || "info@dutyxpert.com",
    replyTo: submission.email,
    subject: `[Duty Xpert Website] ${submission.subject} - ${submission.name}`,
    text: [
      `ชื่อ: ${submission.name}`,
      `บริษัท: ${submission.company || "-"}`,
      `อีเมล: ${submission.email}`,
      `โทรศัพท์: ${submission.phone}`,
      `ประเภทสถานที่: ${submission.siteType}`,
      `หัวข้อ: ${submission.subject}`,
      "",
      submission.message,
    ].join("\n"),
  })
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0")
  if (contentLength > 20_000) {
    return NextResponse.json({ error: "ข้อมูลมีขนาดใหญ่เกินไป" }, { status: 413 })
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "ส่งข้อมูลบ่อยเกินไป กรุณารอสักครู่" }, { status: 429 })
  }

  try {
    const body = (await request.json()) as ContactBody
    if (cleanString(body.website, 200)) {
      return NextResponse.json({ success: true })
    }

    const submission: ContactSubmission = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name: cleanString(body.name, 120),
      company: cleanString(body.company, 160),
      email: cleanString(body.email, 200).toLowerCase(),
      phone: cleanString(body.phone, 50),
      siteType: cleanString(body.siteType, 80),
      subject: cleanString(body.subject, 120),
      message: cleanString(body.message, 5_000),
      ip,
    }

    if (
      !submission.name ||
      !EMAIL_PATTERN.test(submission.email) ||
      !submission.phone ||
      !submission.message
    ) {
      return NextResponse.json({ error: "กรุณาตรวจสอบข้อมูลที่จำเป็น" }, { status: 400 })
    }

    await recordContactSubmission(submission)
    try {
      await sendNotification(submission)
    } catch (error) {
      console.error("Contact email notification failed:", error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact submission failed:", error)
    return NextResponse.json({ error: "ไม่สามารถบันทึกข้อมูลได้ในขณะนี้" }, { status: 500 })
  }
}
