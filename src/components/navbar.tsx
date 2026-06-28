"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/language-context"

export default function Navbar() {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isServicesOpen, setIsServicesOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const navLinks = [
    { label: t("navbar.home"), href: "/" },
    { label: t("navbar.about"), href: "/about" },
    { label: t("navbar.services"), href: "/services" },
    { label: t("navbar.pricing"), href: "/pricing" },
    { label: t("navbar.contact"), href: "/contact" },
  ]

  const servicesList = [
    { name: t("navbar.dropdownGuard"), href: "/services#guard" },
    { name: t("navbar.dropdownPatrol"), href: "/services#patrol" },
    { name: t("navbar.dropdownConsult"), href: "/services#consulting" },
  ]

  // Scroll detection
  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const isActive = (path: string) => pathname === path

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "glassmorphism shadow-lg"
            : "bg-[#0A1628]/95 border-b border-white/[0.08]"
        )}
      >
        {/* ── Top Bar ── */}
        <div
          className={cn(
            "border-b border-white/[0.06] transition-all duration-300 overflow-hidden",
            isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          )}
        >
          <div className="max-w-7xl mx-auto px-6 h-8 flex justify-between items-center text-xs text-[#94A3B8]">
            <a
              href="tel:0863682323"
              className="flex items-center gap-1.5 hover:text-[#E8C547] transition-colors"
            >
              <Phone className="size-3 text-[#E8C547]" />
              <span>{t("navbar.phone")}</span>
            </a>
            
            {/* Language Selector */}
            <button 
              onClick={() => setLanguage(language === "th" ? "en" : "th")}
              className="flex items-center gap-1.5 hover:text-[#E2E8F0] transition-colors text-[#E8C547] font-extrabold"
            >
              <Globe className="size-3" />
              <span>{language === "th" ? "TH" : "EN"}</span>
            </button>
          </div>
        </div>

        {/* ── Main Nav Bar ── */}
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-[72px] flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative size-9 md:size-10 bg-white rounded-full p-0.5 transition-transform group-hover:scale-105">
              <Image
                src="/images/dutyxpert-logo.png"
                alt={t("navbar.brand")}
                width={40}
                height={40}
                className="object-contain rounded-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#E2E8F0] text-sm md:text-base leading-none tracking-wide">
                {t("navbar.brand")}
              </span>
              <span className="text-[8px] md:text-[9px] text-[#E8C547] tracking-[0.2em] font-semibold uppercase mt-0.5">
                {t("navbar.subBrand")}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) =>
              link.label === t("navbar.services") ? (
                <div key={link.label} ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setIsServicesOpen((v) => !v)}
                    onMouseEnter={() => setIsServicesOpen(true)}
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#E8C547]",
                      pathname.startsWith("/services")
                        ? "text-[#E8C547]"
                        : "text-[#E2E8F0]"
                    )}
                  >
                    {t("navbar.services")}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        isServicesOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Dropdown Panel */}
                  <div
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className={cn(
                      "absolute top-full left-0 mt-3 w-80 rounded-lg py-1 z-50 transition-all duration-200 origin-top",
                      "bg-[#0A1628] border border-white/[0.08] shadow-xl",
                      isServicesOpen
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    )}
                  >
                    {servicesList.map((service, idx) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        onClick={() => setIsServicesOpen(false)}
                        className={cn(
                          "block px-4 py-3 text-sm text-[#94A3B8] hover:bg-[#121F33] hover:text-[#E2E8F0] transition-colors",
                          idx < servicesList.length - 1 &&
                            "border-b border-white/[0.05]"
                        )}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#E8C547]",
                    isActive(link.href) ? "text-[#E8C547]" : "text-[#E2E8F0]"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button variant="gold" size="sm" className="rounded-md font-bold">
                {t("navbar.contact")}
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden text-[#E2E8F0] hover:text-[#E8C547] transition-colors focus:outline-none"
            aria-label={isOpen ? "ปิดเมนู" : "เปิดเมนู"}
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/* ── Mobile Full-Screen Overlay ── */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-[#0A1628]/[0.98] backdrop-blur-xl transition-all duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        style={{ top: "64px" }}
      >
        <nav className="flex flex-col px-6 pt-6 pb-8 h-full overflow-y-auto">
          {/* Main links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.label === t("navbar.services") ? (
                <div key={link.label} className="border-b border-white/[0.06]">
                  <button
                    onClick={() => setIsServicesOpen((v) => !v)}
                    className={cn(
                      "w-full flex justify-between items-center py-4 text-base font-medium transition-colors",
                      pathname.startsWith("/services")
                        ? "text-[#E8C547]"
                        : "text-[#E2E8F0] hover:text-[#E8C547]"
                    )}
                  >
                    {t("navbar.services")}
                    <ChevronDown
                      className={cn(
                        "size-5 transition-transform duration-200 text-[#94A3B8]",
                        isServicesOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-200",
                      isServicesOpen ? "max-h-60 pb-3" : "max-h-0"
                    )}
                  >
                    <div className="pl-4 flex flex-col gap-1 bg-[#121F33]/40 rounded-lg p-3">
                      {servicesList.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          onClick={() => setIsOpen(false)}
                          className="text-sm text-[#94A3B8] hover:text-[#E8C547] transition-colors py-2"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "py-4 text-base font-medium border-b border-white/[0.06] transition-colors",
                    isActive(link.href)
                      ? "text-[#E8C547]"
                      : "text-[#E2E8F0] hover:text-[#E8C547]"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Language Switcher */}
          <div className="flex justify-between items-center py-4 border-b border-white/[0.06]">
            <span className="text-sm font-medium text-slate-400">ภาษา / Language</span>
            <button
              onClick={() => setLanguage(language === "th" ? "en" : "th")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-accent"
            >
              <Globe className="size-4" />
              <span>{language === "th" ? "TH / ไทย" : "EN / English"}</span>
            </button>
          </div>

          {/* Mobile CTA */}
          <div className="mt-8">
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block">
              <Button variant="gold" className="w-full py-6 text-base rounded-lg font-bold">
                {t("navbar.contact")}
              </Button>
            </Link>
          </div>

          {/* Mobile contact info */}
          <div className="mt-auto pt-8 border-t border-white/[0.06]">
            <a
              href="tel:0863682323"
              className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#E8C547] transition-colors"
            >
              <Phone className="size-4 text-[#E8C547]" />
              {t("navbar.phone")}
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
