import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "src/lib/translations.json")

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, "utf8")
    return NextResponse.json(JSON.parse(data))
  } catch (err) {
    console.error("API GET Error:", err)
    return NextResponse.json({ error: "Failed to read translations" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Write file back to local storage
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf8")
    
    return NextResponse.json({ success: true, message: "Translations saved successfully" })
  } catch (err) {
    console.error("API POST Error:", err)
    return NextResponse.json({ error: "Failed to write translations" }, { status: 500 })
  }
}
