"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LenisProvider from "@/components/lenis-provider"
import { LanguageProvider } from "@/context/language-context"
import type { TranslationsDict } from "@/lib/data-store"

type SiteShellProps = {
  children: React.ReactNode
  initialTranslations: TranslationsDict
}

export default function SiteShell({ children, initialTranslations }: SiteShellProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")

  return (
    <LanguageProvider initialTranslations={initialTranslations}>
      <LenisProvider>
        {!isAdminRoute && <Navbar />}
        <main className={isAdminRoute ? "flex-grow" : "flex-grow pt-20 lg:pt-[104px]"}>
          {children}
        </main>
        {!isAdminRoute && <Footer />}
      </LenisProvider>
    </LanguageProvider>
  )
}
