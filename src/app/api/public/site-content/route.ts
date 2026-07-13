import { NextResponse } from "next/server"
import { readSiteAssets } from "@/lib/site-content-store"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({ assets: await readSiteAssets() })
}
