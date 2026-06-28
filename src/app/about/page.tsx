"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShieldCheck, Award, CheckCircle, ChevronRight, Target, Eye, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

// Animation Configuration
const fadeInUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
}

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header Banner (Dark) */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">
          <div className="inline-flex items-center gap-2 bg-secondary/80 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-accent uppercase tracking-wider mb-5">
            <Award className="size-4 text-accent" />
            {t("about.heroTag")}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {t("about.heroTitle")}
          </h1>
          <div className="w-16 h-1 bg-accent mt-4" />
          <p className="text-slate-350 mt-4 text-sm md:text-base max-w-2xl leading-relaxed font-normal">
            {t("about.heroDesc")}
          </p>
        </div>
      </section>

      {/* 2. Company Overview & Real Info (Light) */}
      <section className="py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div {...fadeInUp} className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{t("about.overviewTag")}</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("about.overviewTitle")}
            </h2>
            
            <div className="text-slate-600 leading-relaxed text-sm md:text-base space-y-4 font-normal">
              <p>
                <strong>{t("about.expertTitle")}</strong> {t("about.expertText")}
              </p>
              <p>
                <strong>{t("about.skilledTitle")}</strong> {t("about.skilledText")}
              </p>
              <p dangerouslySetInnerHTML={{ __html: t("about.conclusionText") }} />
            </div>

            {/* ข้อมูลการจดทะเบียนบริษัทจริง */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl text-center">
                <Building className="size-5 text-primary mx-auto mb-2" />
                <span className="text-[10px] text-slate-500 font-semibold block uppercase">{t("about.regCompany")}</span>
                <span className="text-xs font-bold text-slate-800 mt-1 block">{t("about.regCompanyValue")}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl text-center">
                <ShieldCheck className="size-5 text-primary mx-auto mb-2" />
                <span className="text-[10px] text-slate-500 font-semibold block uppercase">{t("about.regCapital")}</span>
                <span className="text-xs font-bold text-slate-800 mt-1 block">{t("about.regCapitalValue")}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl text-center">
                <CheckCircle className="size-5 text-primary mx-auto mb-2" />
                <span className="text-[10px] text-slate-500 font-semibold block uppercase">{t("about.regStatus")}</span>
                <span className="text-xs font-bold text-slate-800 mt-1 block">{t("about.regStatusValue")}</span>
              </div>
            </div>
          </motion.div>
          
          {/* รูปภาพจริงของ รปภ. ดิวตี้ เอคซ์เพิร์ท */}
          <motion.div {...fadeInUp} className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="/images/about-team.jpg"
                alt="พนักงานรักษาความปลอดภัย บริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <p className="font-semibold">{t("about.badgeTitle")}</p>
                <p className="opacity-80 mt-0.5">{t("about.badgeText")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Pre-operation Steps & Real Icons (Light - Alternating background) */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200/50 text-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{t("about.stepsTag")}</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              {t("about.stepsTitle")}
            </h2>
            <p className="text-slate-600 mt-3 text-sm">
              {t("about.stepsDesc")}
            </p>
            <div className="w-16 h-1 bg-accent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: t("about.step1Title"),
                desc: t("about.step1Desc"),
                icon: "/images/process-questionnaire.png"
              },
              {
                step: "02",
                title: t("about.step2Title"),
                desc: t("about.step2Desc"),
                icon: "/images/process-analysis.png"
              },
              {
                step: "03",
                title: t("about.step3Title"),
                desc: t("about.step3Desc"),
                icon: "/images/process-pricing.png"
              },
              {
                step: "04",
                title: t("about.step4Title"),
                desc: t("about.step4Desc"),
                icon: "/images/process-customization.png"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-6 relative hover:shadow-md hover:border-accent/40 transition-all duration-300 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-md mb-4">{item.step}</span>
                <div className="relative size-12 mb-4">
                  <Image 
                    src={item.icon}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-2 font-semibold leading-tight">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Vision & Mission (Dark) */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div {...fadeInUp} className="bg-secondary border border-white/[0.08] p-8 rounded-2xl flex flex-col gap-4">
            <div className="bg-accent/10 text-white p-3 rounded-lg w-fit">
              <Eye className="size-6 text-accent" />
            </div>
            <h3 className="text-2xl font-extrabold text-white font-semibold">{t("about.visionTitle")}</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal whitespace-pre-line">
              {t("about.visionText")}
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-secondary border border-white/[0.08] p-8 rounded-2xl flex flex-col gap-4">
            <div className="bg-accent/10 text-white p-3 rounded-lg w-fit">
              <Target className="size-6 text-accent" />
            </div>
            <h3 className="text-2xl font-extrabold text-white font-semibold">{t("about.missionTitle")}</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal whitespace-pre-line">
              {t("about.missionText")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. Core Values (DUTY) (Light) */}
      <section className="py-24 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{t("about.valuesTag")}</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("about.valuesTitle")}
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { letter: "D", title: t("about.val1Title"), desc: t("about.val1Desc") },
              { letter: "U", title: t("about.val2Title"), desc: t("about.val2Desc") },
              { letter: "T", title: t("about.val3Title"), desc: t("about.val3Desc") },
              { letter: "Y", title: t("about.val4Title"), desc: t("about.val4Desc") }
            ].map((v, index) => (
              <div key={index} className="border border-slate-200/80 rounded-xl p-6 relative bg-slate-50 hover:shadow-md hover:border-accent/40 transition-all group">
                <span className="text-6xl font-extrabold text-primary/[0.04] group-hover:text-accent/10 transition-colors absolute top-4 right-4 leading-none select-none">
                  {v.letter}
                </span>
                <h4 className="font-extrabold text-slate-900 text-lg mb-2 relative z-10 font-semibold">{v.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed relative z-10 font-normal">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact CTA (Dark) */}
      <section className="py-20 bg-secondary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center gap-6">
          <ShieldCheck className="size-12 text-accent animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-semibold">
            {t("about.ctaTitle")}
          </h2>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed font-normal">
            {t("about.ctaDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link href="/contact">
              <Button variant="gold" size="lg" className="rounded-md font-bold">
                {t("about.ctaBtnConsult")}
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="text-white border-white/40 hover:bg-white/10 hover:text-white rounded-md font-semibold">
                {t("about.ctaBtnExplore")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
