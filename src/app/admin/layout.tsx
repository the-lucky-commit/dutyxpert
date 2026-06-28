import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { isValidSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | Duty Xpert",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!isValidSessionToken(token)) {
    redirect("/login")
  }

  return children
}
