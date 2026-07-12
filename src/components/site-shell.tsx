"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/context/language-context"
import type { TranslationsDict } from "@/lib/data-store"

type SiteShellProps = {
  children: React.ReactNode
  initialTranslations: TranslationsDict
}

export default function SiteShell({ children, initialTranslations }: SiteShellProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")

  if (isAdminRoute) {
    return (
      <LanguageProvider initialTranslations={initialTranslations}>
        <main className="min-h-screen flex-grow bg-slate-50">{children}</main>
      </LanguageProvider>
    )
  }

  return (
    <LanguageProvider initialTranslations={initialTranslations}>
      <Navbar />
      <main className="flex-grow pt-20 lg:pt-[104px]">{children}</main>
      <Footer />
    </LanguageProvider>
  )
}
