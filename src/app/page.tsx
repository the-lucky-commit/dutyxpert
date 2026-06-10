"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ShieldCheck,
  Clock,
  ChevronRight,
  Award,
  Eye,
  FileText,
  UserCheck,
  CheckCircle,
  ArrowRight,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

/* ─── Animation Presets ─── */
const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
}

const stagger = {
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true },
}

const childFade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

/* ─── Page ─── */
export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col">

      {/* ━━━ 1. HERO ━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20 lg:-mt-[104px]">
        {/* Background Image */}
        <Image
          src="https://dutyxpert.com/wp-content/uploads/2025/02/line_album_2042025_250421_77.jpg"
          alt="เจ้าหน้าที่สายตรวจ ดิวตี้ เอคซ์เพิร์ท"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-accent uppercase tracking-widest mb-8 backdrop-blur-sm"
          >
            <ShieldCheck className="size-4" />
            {t("home.heroTag")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"
          >
            {t("home.heroTitle")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {t("home.heroDesc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <Button variant="gold" size="lg" className="text-base px-8 py-6 rounded-lg font-bold">
                {t("home.heroBtnEstimate")}
                <ArrowRight className="size-5 ml-1" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-lg font-semibold text-white border-white/20 hover:bg-white/10 hover:text-white">
                {t("home.heroBtnServices")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ━━━ 2. SERVICES ━━━ */}
      <section id="services" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{t("home.servicesTag")}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              {t("home.servicesTitle")}
            </h2>
            <div className="accent-line mx-auto mt-5" />
          </motion.div>

          <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: t("home.service1Title"),
                desc: t("home.service1Desc"),
                href: "/services#guard"
              },
              {
                icon: Clock,
                title: t("home.service2Title"),
                desc: t("home.service2Desc"),
                href: "/services#patrol"
              },
              {
                icon: FileText,
                title: t("home.service3Title"),
                desc: t("home.service3Desc"),
                href: "/services#consulting"
              },
            ].map((s, i) => (
              <motion.div key={i} {...childFade}>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-7 h-full flex flex-col hover:shadow-md hover:border-accent/40 transition-all duration-300">
                  <div className="bg-primary/5 w-12 h-12 rounded-lg flex items-center justify-center mb-5">
                    <s.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-grow">{s.desc}</p>
                  <Link href={s.href} className="mt-5 inline-flex items-center gap-1 text-primary text-sm font-semibold hover:text-accent hover:gap-2 transition-all">
                    {t("home.serviceBtnMore")} <ChevronRight className="size-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━ 3. WHY CHOOSE US ━━━ */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div {...fadeIn} className="relative">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
              <Image
                src="https://dutyxpert.com/wp-content/uploads/2025/04/73787.jpg"
                alt="การปฏิบัติงานจริงของ Duty Xpert"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glassmorphism p-4 rounded-xl">
                  <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">{t("home.patrolBadge")}</p>
                  <p className="text-xs text-slate-350 leading-relaxed font-normal">{t("home.patrolBadgeText")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div {...fadeIn} className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest">{t("home.whyChooseUsTag")}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 tracking-tight">
                {t("home.whyChooseUsTitle")}
              </h2>
              <div className="accent-line mt-4" />
            </div>

            <p className="text-slate-300 leading-relaxed text-sm md:text-base font-normal">
              {t("home.whyChooseUsDesc")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: Award, title: t("home.diff1Title"), desc: t("home.diff1Desc") },
                { icon: UserCheck, title: t("home.diff2Title"), desc: t("home.diff2Desc") },
                { icon: Eye, title: t("home.diff3Title"), desc: t("home.diff3Desc") },
                { icon: CheckCircle, title: t("home.diff4Title"), desc: t("home.diff4Desc") },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="bg-accent/10 p-2.5 rounded-lg shrink-0">
                    <item.icon className="size-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ 4. QUALITY PROCESS ━━━ */}
      <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{t("home.processTag")}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              {t("home.processTitle")}
            </h2>
            <div className="accent-line mx-auto mt-5" />
          </motion.div>

          <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: "01", title: t("home.p1Title"), desc: t("home.p1Desc") },
              { num: "02", title: t("home.p2Title"), desc: t("home.p2Desc") },
              { num: "03", title: t("home.p3Title"), desc: t("home.p3Desc") },
              { num: "04", title: t("home.p4Title"), desc: t("home.p4Desc") },
              { num: "05", title: t("home.p5Title"), desc: t("home.p5Desc") },
              { num: "06", title: t("home.p6Title"), desc: t("home.p6Desc") },
            ].map((p, i) => (
              <motion.div key={i} {...childFade}>
                <div className="bg-white border border-slate-200/80 rounded-xl p-6 h-full hover:shadow-md hover:border-accent/40 transition-all duration-300">
                  <span className="text-xs font-extrabold text-primary bg-primary/5 px-2.5 py-1 rounded-md inline-block mb-4">{p.num}</span>
                  <h4 className="font-bold text-slate-900 text-base mb-2">{p.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━ 5. GALLERY ━━━ */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">{t("home.galleryTag")}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 tracking-tight">
              {t("home.galleryTitle")}
            </h2>
            <div className="accent-line mx-auto mt-5" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div {...fadeIn} className="relative aspect-[16/10] rounded-2xl overflow-hidden group">
              <Image
                src="https://dutyxpert.com/wp-content/uploads/2025/02/line_album_2042025_250421_77.jpg"
                alt="สายตรวจ รปภ. ดิวตี้ เอคซ์เพิร์ท"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-6 right-6 text-white text-sm font-medium">
                {t("home.img1Desc")}
              </p>
            </motion.div>

            <motion.div {...fadeIn} className="relative aspect-[16/10] rounded-2xl overflow-hidden group">
              <Image
                src="https://dutyxpert.com/wp-content/uploads/2025/11/line_album_ai_251210_6.jpg"
                alt="เจ้าหน้าที่ดิวตี้ เอคซ์เพิร์ท ปฏิบัติหน้าที่"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-6 right-6 text-white text-sm font-medium">
                {t("home.img2Desc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ 6. CTA ━━━ */}
      <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(232,197,71,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(232,197,71,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeIn} className="flex flex-col items-center gap-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t("home.ctaTitle")}
            </h2>
            <p className="text-slate-350 max-w-xl leading-relaxed text-sm md:text-base font-normal">
              {t("home.ctaDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/contact">
                <Button variant="gold" size="lg" className="text-base px-8 py-6 rounded-lg font-bold">
                  {t("home.heroBtnEstimate")}
                  <ArrowRight className="size-5 ml-1" />
                </Button>
              </Link>
              <a href={`tel:${t("navbar.phone").replace(/-/g, "")}`}>
                <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-lg font-semibold text-white border-white/15 hover:bg-white/10 hover:text-white">
                  <Phone className="size-4 mr-1" />
                  {t("navbar.phone")}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
