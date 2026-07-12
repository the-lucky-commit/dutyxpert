"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Shield,
  ShieldCheck,
  Clock,
  Users,
  Building2,
  FileText,
  Award,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

export default function ServicesPage() {
  const { t } = useLanguage()

  const serviceItems = [
    {
      id: "guard",
      title: t("services.service1Title"),
      titleTh: t("services.service1TitleTh"),
      icon: ShieldCheck,
      imageUrl: "/images/training-team.jpg",
      description: t("services.service1Desc"),
      standards: [
        t("services.service1Std1"),
        t("services.service1Std2"),
        t("services.service1Std3"),
        t("services.service1Std4")
      ],
      value: t("services.service1Value")
    },
    {
      id: "patrol",
      title: t("services.service2Title"),
      titleTh: t("services.service2TitleTh"),
      icon: Clock,
      imageUrl: "/images/patrol-team.jpg",
      description: t("services.service2Desc"),
      standards: [
        t("services.service2Std1"),
        t("services.service2Std2"),
        t("services.service2Std3"),
        t("services.service2Std4")
      ],
      value: t("services.service2Value")
    },
    {
      id: "consulting",
      title: t("services.service3Title"),
      titleTh: t("services.service3TitleTh"),
      icon: FileText,
      imageUrl: "/images/security-guard.jpg",
      description: t("services.service3Desc"),
      standards: [
        t("services.service3Std1"),
        t("services.service3Std2"),
        t("services.service3Std3"),
        t("services.service3Std4")
      ],
      value: t("services.service3Value")
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-primary text-white py-24 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">
          <div className="inline-flex items-center gap-2 bg-secondary/80 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-accent uppercase tracking-wider mb-5">
            <Shield className="size-4 text-accent" />
            {t("services.heroTag")}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            {t("services.heroTitle")}
          </h1>
          <p className="text-slate-350 mt-5 text-base md:text-lg max-w-3xl leading-relaxed font-normal">
            {t("services.heroDesc")}
          </p>
        </div>
      </section>

      {/* 2. Anchor Menu */}
      <section className="bg-secondary/80 backdrop-blur-md border-b border-white/[0.08] sticky top-[60px] md:top-[74px] z-30 py-4 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-8">
          {serviceItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="text-xs font-bold text-slate-300 hover:text-accent uppercase tracking-wider transition-colors pb-1"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Detailed Services Sections */}
      <div className="flex flex-col">
        {serviceItems.map((service, idx) => {
          const IconComponent = service.icon
          const isLight = idx % 2 === 0
          const isEven = idx % 2 === 0
          
          return (
            <section
              key={service.id}
              id={service.id}
              className={`py-24 md:py-28 scroll-mt-28 ${isLight ? "bg-white text-slate-900 border-b border-slate-100" : "bg-secondary text-white"}`}
            >
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Content block */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`lg:col-span-7 flex flex-col gap-7 ${!isEven ? "lg:order-2" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-4 rounded-xl w-fit ${isLight ? "bg-primary/5 text-primary" : "bg-primary text-accent"}`}>
                      <IconComponent className="size-7" />
                    </div>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-widest block ${isLight ? "text-primary" : "text-accent"}`}>{t("services.heroTag")} {idx + 1}</span>
                      <h2 className={`text-2xl md:text-4xl font-extrabold tracking-tight mt-1 leading-tight ${isLight ? "text-slate-900" : "text-white"}`}>{service.title}</h2>
                    </div>
                  </div>
                  
                  <h4 className={`text-lg md:text-2xl font-extrabold leading-snug ${isLight ? "text-slate-855" : "text-slate-200"}`}>{service.titleTh}</h4>
                  
                  <p className={`text-base md:text-lg leading-relaxed font-normal ${isLight ? "text-slate-600" : "text-slate-350"}`}>
                    {service.description}
                  </p>
                  
                  {/* Service standards checklists */}
                  <div>
                    <h5 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${isLight ? "text-slate-900" : "text-white"}`}>
                      <Award className={`size-5 ${isLight ? "text-primary" : "text-accent"}`} /> {t("services.stdTitle")}
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.standards.map((std, index) => (
                        <li key={index} className="flex gap-3 items-start">
                          <CheckCircle className={`size-5 shrink-0 mt-0.5 ${isLight ? "text-primary" : "text-accent"}`} />
                          <span className={`text-sm md:text-base leading-relaxed font-normal ${isLight ? "text-slate-600" : "text-slate-355"}`}>{std}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Business value box */}
                  <div className={`p-6 md:p-7 rounded-2xl border flex gap-4 items-start shadow-xs ${isLight ? "bg-slate-50 border-slate-200/80" : "bg-surface border-white/[0.08]"}`}>
                    <div className={`p-3 rounded-lg shrink-0 ${isLight ? "bg-primary/5 text-primary" : "bg-accent/15 text-accent"}`}>
                      <ShieldCheck className="size-6" />
                    </div>
                    <div>
                      <h5 className={`text-sm font-bold uppercase tracking-wider ${isLight ? "text-slate-900" : "text-white"}`}>{t("services.valTitle")}</h5>
                      <p className={`text-sm md:text-base mt-2 leading-relaxed font-normal ${isLight ? "text-slate-600" : "text-slate-350"}`}>{service.value}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Illustration block (Image from old site) */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`lg:col-span-5 ${!isEven ? "lg:order-1" : ""}`}
                >
                  <div className={`relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border ${isLight ? "border-slate-200" : "border-white/10"}`}>
                    <Image 
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6 z-10">
                      <div className={`backdrop-blur-xs border p-5 rounded-xl ${isLight ? "bg-slate-50/95 border-slate-200" : "bg-primary/90 border-white/10"}`}>
                        <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${isLight ? "text-primary" : "text-accent"}`}>{t("services.trustTitle")}</span>
                        <p className={`text-sm leading-relaxed font-normal ${isLight ? "text-slate-700" : "text-slate-200"}`}>
                          {t("services.trustText")}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          )
        })}
      </div>

      {/* 4. Training Section (Dark) */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">{t("services.trainTag")}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3 leading-tight">
              {t("services.trainTitle")}
            </h2>
            <p className="text-slate-355 mt-5 text-base md:text-lg leading-relaxed">
              {t("services.trainDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t("services.train1Title"),
                subtitle: t("services.train1Sub"),
                desc: t("services.train1Desc"),
                icon: ShieldCheck
              },
              {
                title: t("services.train2Title"),
                subtitle: t("services.train2Sub"),
                desc: t("services.train2Desc"),
                icon: Building2
              },
              {
                title: t("services.train3Title"),
                subtitle: t("services.train3Sub"),
                desc: t("services.train3Desc"),
                icon: Users
              }
            ].map((train, idx) => {
              const TrainIcon = train.icon
              return (
                <div key={idx} className="bg-secondary border border-white/[0.08] rounded-2xl p-7 md:p-8 flex flex-col gap-5">
                  <div className="bg-accent/10 text-accent p-4 rounded-xl w-fit">
                    <TrainIcon className="size-7 text-accent" />
                  </div>
                  <div>
                    <span className="text-xs text-accent font-bold block uppercase tracking-wider">{train.title}</span>
                    <h4 className="font-extrabold text-white text-xl mt-2 leading-snug">{train.subtitle}</h4>
                  </div>
                  <p className="text-base text-slate-350 leading-relaxed font-normal">{train.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. What Customers Get Section (Light) */}
      <section className="py-24 bg-white text-slate-900 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{t("services.deliverTag")}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 leading-tight">
              {t("services.deliverTitle")}
            </h2>
            <p className="text-slate-600 mt-5 text-base md:text-lg leading-relaxed">
              {t("services.deliverDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider mb-6">{t("services.delCol1Title")}</h3>
              {[
                t("services.delCol1Item1"),
                t("services.delCol1Item2"),
                t("services.delCol1Item3"),
                t("services.delCol1Item4")
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle className="size-5 text-primary shrink-0 mt-1" />
                  <span className="text-base text-slate-600 leading-relaxed font-normal">{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider mb-6">{t("services.delCol2Title")}</h3>
              {[
                t("services.delCol2Item1"),
                t("services.delCol2Item2"),
                t("services.delCol2Item3"),
                t("services.delCol2Item4")
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle className="size-5 text-primary shrink-0 mt-1" />
                  <span className="text-base text-slate-600 leading-relaxed font-normal">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section (Light/Slate - Alternating) */}
      <section className="py-20 bg-slate-50 text-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{t("services.faqTag")}</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              {t("services.faqTitle")}
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: t("services.faq1Q"),
                a: t("services.faq1A")
              },
              {
                q: t("services.faq2Q"),
                a: t("services.faq2A")
              },
              {
                q: t("services.faq3Q"),
                a: t("services.faq3A")
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                <h4 className="font-extrabold text-slate-900 text-base md:text-lg mb-3 flex items-start gap-2">
                  <span className="text-accent font-extrabold text-lg md:text-xl leading-none select-none">Q:</span>
                  <span className="font-semibold">{faq.q}</span>
                </h4>
                <div className="text-sm md:text-base text-slate-600 leading-relaxed pl-5 font-normal flex items-start gap-2">
                  <span className="text-primary font-extrabold leading-none select-none">A:</span>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Consultation CTA (Dark) */}
      <section className="py-24 bg-[#0A1628] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <Shield className="size-14 text-accent mb-2 animate-pulse" />
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-bold">
            {t("services.ctaTitle2")}
          </h2>
          <p className="text-slate-350 text-sm md:text-base max-w-2xl leading-relaxed font-normal">
            {t("services.ctaDesc2")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full sm:w-auto text-base py-6 px-8 rounded-md font-bold">
                {t("services.ctaBtnFree")}
                <ArrowRight className="size-5 ml-1.5" />
              </Button>
            </Link>
            <a href="tel:0809387829" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base text-white border-white/40 hover:bg-white/10 py-6 px-8 rounded-md font-semibold">
                {t("services.ctaBtnCall")}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
