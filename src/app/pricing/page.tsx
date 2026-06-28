"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShieldCheck, ArrowRight, DollarSign, Calculator, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

// Animation Configuration
const fadeInUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
}

export default function PricingPage() {
  const { t } = useLanguage()

  const costItems = [
    {
      title: t("pricing.c1Title"),
      desc: t("pricing.c1Desc"),
      icon: Calculator
    },
    {
      title: t("pricing.c2Title"),
      desc: t("pricing.c2Desc"),
      icon: ShieldCheck
    },
    {
      title: t("pricing.c3Title"),
      desc: t("pricing.c3Desc"),
      icon: Percent
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header Banner (Dark) */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">
          <div className="inline-flex items-center gap-2 bg-secondary/80 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-accent uppercase tracking-wider mb-5">
            <DollarSign className="size-4 text-accent" />
            {t("pricing.heroTag")}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {t("pricing.heroTitle")}
          </h1>
          <div className="w-16 h-1 bg-accent mt-4" />
          <p className="text-slate-350 mt-4 text-sm md:text-base max-w-2xl leading-relaxed font-normal">
            {t("pricing.heroDesc")}
          </p>
        </div>
      </section>

      {/* 2. Pricing Concept (Light) */}
      <section className="py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div {...fadeInUp} className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{t("pricing.conceptTag")}</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-bold">
              {t("pricing.conceptTitle")}
            </h2>
            
            <div className="text-slate-605 leading-relaxed text-sm md:text-base space-y-4 font-normal">
              <p>
                {t("pricing.conceptParagraph1")}
              </p>
              <p>
                {t("pricing.conceptParagraph2")}
              </p>
              <p>
                {t("pricing.conceptParagraph3")}
              </p>
              <p className="text-xs text-slate-500 italic">
                {t("pricing.conceptNote")}
              </p>
            </div>
          </motion.div>

          {/* รูปภาพ รปภ. ดิวตี้ เอคซ์เพิร์ท */}
          <motion.div {...fadeInUp} className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="/images/pricing-security.jpg"
                alt="การลงพื้นที่ปฏิบัติงานและวางแผนราคาของ ดิวตี้ เอคซ์เพิร์ท"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <p className="font-semibold">{t("pricing.imgBadgeTitle")}</p>
                <p className="opacity-80 mt-0.5">{t("pricing.imgBadgeDesc")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Cost Structure (Light - Alternating background) */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200/50 text-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{t("pricing.structureTag")}</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              {t("pricing.structureTitle")}
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4" />
            <p className="text-slate-600 mt-4 text-sm font-normal">
              {t("pricing.structureDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {costItems.map((item, idx) => {
              const ItemIcon = item.icon
              return (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-8 hover:shadow-md hover:border-accent/40 transition-all duration-300 flex flex-col gap-4">
                  <div className="bg-primary/5 text-primary p-3 rounded-lg w-fit">
                    <ItemIcon className="size-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base font-semibold leading-snug">{item.title}</h4>
                  <p className="text-xs text-slate-605 leading-relaxed font-normal">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Pricing CTA (Dark) */}
      <section className="py-20 bg-secondary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center gap-6">
          <ShieldCheck className="size-12 text-accent animate-pulse" />
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight font-bold">
            {t("pricing.ctaTitle3")}
          </h2>
          <p className="text-slate-350 text-sm max-w-xl leading-relaxed font-normal">
            {t("pricing.ctaDesc3")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link href="/contact">
              <Button variant="gold" size="lg" className="rounded-md font-bold text-base px-8 py-6">
                {t("pricing.ctaBtnQuote")}
                <ArrowRight className="size-5 ml-1.5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="text-white border-white/40 hover:bg-white/10 hover:text-white rounded-md font-semibold text-base px-8 py-6">
                {t("pricing.ctaBtnStd")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
