"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-bold text-[#E2E8F0] uppercase tracking-wider">
        {children}
      </h4>
      <div className="mt-2 w-8 h-0.5 bg-gradient-to-r from-[#E8C547] to-transparent rounded-full" />
    </div>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  const quickLinks = [
    { label: t("navbar.home"), href: "/" },
    { label: t("navbar.about"), href: "/about" },
    { label: t("navbar.services"), href: "/services" },
    { label: t("navbar.pricing"), href: "/pricing" },
    { label: t("navbar.contact"), href: "/contact" },
  ]

  const serviceLinks = [
    { label: t("navbar.dropdownGuard"), href: "/services#guard" },
    { label: t("navbar.dropdownPatrol"), href: "/services#patrol" },
    { label: t("navbar.dropdownConsult"), href: "/services#consulting" },
  ]

  return (
    <footer className="bg-[#0A1628] border-t border-t-[#E8C547]/20 mt-auto">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* ── Column 1: Brand ── */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group w-max">
              <div className="relative size-10 bg-white rounded-full p-0.5 transition-transform group-hover:scale-105 shrink-0">
                <Image
                  src="https://dutyxpert.com/wp-content/uploads/2025/02/cropped-dxs_main-logo.png"
                  alt={t("navbar.brand")}
                  width={40}
                  height={40}
                  className="object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#E2E8F0] text-base leading-none tracking-wide">
                  {t("navbar.brand")}
                </span>
                <span className="text-[9px] text-[#E8C547] tracking-[0.2em] font-semibold uppercase mt-0.5">
                  {t("navbar.subBrand")}
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <SectionHeading>{t("footer.quickLinks")}</SectionHeading>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#94A3B8] hover:text-[#E8C547] flex items-center gap-1.5 group transition-colors"
                  >
                    <ChevronRight className="size-3.5 text-[#E8C547] opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Services ── */}
          <div>
            <SectionHeading>{t("footer.ourServices")}</SectionHeading>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#94A3B8] hover:text-[#E8C547] flex items-center gap-1.5 group transition-colors"
                  >
                    <ChevronRight className="size-3.5 text-[#E8C547] opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact ── */}
          <div>
            <SectionHeading>{t("footer.contactTitle")}</SectionHeading>
            <ul className="space-y-4 text-sm text-[#94A3B8]">
              <li className="flex gap-3">
                <MapPin className="size-5 text-[#E8C547] shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">
                  {t("footer.address")}
                </span>
              </li>
              <li>
                <a
                  href="tel:0863682323"
                  className="flex items-center gap-3 hover:text-[#E8C547] transition-colors"
                >
                  <Phone className="size-5 text-[#E8C547] shrink-0" />
                  <span>{t("navbar.phone")}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@dutyxpert.com"
                  className="flex items-center gap-3 hover:text-[#E8C547] transition-colors"
                >
                  <Mail className="size-5 text-[#E8C547] shrink-0" />
                  <span>info@dutyxpert.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#94A3B8]">
          <span>
            {t("footer.rights")}
          </span>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-[#E8C547] transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-[#E8C547] transition-colors"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
