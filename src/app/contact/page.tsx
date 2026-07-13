"use client"

import * as React from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Check, AlertCircle, Building2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97+%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%9B%E0%B8%A5%E0%B8%AD%E0%B8%94%E0%B8%A0%E0%B8%B1%E0%B8%A2+%E0%B8%94%E0%B8%B4%E0%B8%A7%E0%B8%95%E0%B8%B5%E0%B9%89+%E0%B9%80%E0%B8%AD%E0%B8%84%E0%B8%8B%E0%B9%8C%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%97+%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94/@13.6525916,100.6367999,17z/data=!3m1!4b1!4m6!3m5!1s0x311d5fd04a59b66b:0x27f4219baaa31951!8m2!3d13.6525916!4d100.6393748!16s%2Fg%2F11x2v60fg2?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=13.6525916,100.6393748&z=17&output=embed"

export default function ContactPage() {
  const { t } = useLanguage()

  const [formData, setFormData] = React.useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    siteType: "factory",
    subject: "request_proposal",
    message: "",
    website: ""
  })

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg("")

    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMsg(t("contact.formErrorVal"))
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const result = (await response.json()) as { error?: string }
        throw new Error(result.error || t("contact.formErrorVal"))
      }

      setSubmitSuccess(true)
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        siteType: "factory",
        subject: "request_proposal",
        message: "",
        website: ""
      })
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : t("contact.formErrorVal"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">
          <div className="inline-flex items-center gap-2 bg-secondary/80 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-accent uppercase tracking-wider mb-5">
            <Building2 className="size-4 text-accent" />
            {t("contact.heroTag")}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {t("contact.heroTitle")}
          </h1>
          <p className="text-slate-300 mt-4 text-sm md:text-base max-w-2xl leading-relaxed font-normal">
            {t("contact.heroDesc")}
          </p>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Block: Contact Info Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{t("contact.infoTag")}</h2>
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight font-semibold">
                {t("contact.infoTitle")}
              </p>
            </div>

            <div className="flex flex-col gap-6 text-sm text-slate-600">
              <div className="flex gap-4 items-start border-b border-slate-200 pb-5">
                <MapPin className="size-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1 font-semibold">{t("contact.hqLabel")}</h4>
                  <p className="leading-relaxed font-normal text-slate-600 whitespace-pre-line">
                    {t("contact.hqAddress")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-b border-slate-200 pb-5">
                <Phone className="size-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1 font-semibold">{t("contact.phoneLabel")}</h4>
                  <p className="leading-relaxed font-normal text-slate-600 whitespace-pre-line">
                    {t("contact.phoneVal")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-b border-slate-200 pb-5">
                <Mail className="size-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1 font-semibold">{t("contact.emailLabel")}</h4>
                  <p className="leading-relaxed font-normal text-slate-600 whitespace-pre-line">
                    {t("contact.emailVal")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Clock className="size-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1 font-semibold">{t("contact.hoursLabel")}</h4>
                  <p className="leading-relaxed font-normal text-slate-600 whitespace-pre-line">
                    {t("contact.hoursVal")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-2xl">
            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center flex flex-col items-center gap-4 animate-fade-in">
                <div className="bg-green-600 text-white p-3 rounded-full">
                  <Check className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-green-800">{t("contact.formSuccessTitle")}</h3>
                <p className="text-sm text-green-700 leading-relaxed max-w-md font-normal">
                  {t("contact.formSuccessDesc")}
                </p>
                <Button onClick={() => setSubmitSuccess(false)} variant="outline" className="border-green-600/30 text-green-700 hover:bg-green-50 mt-4">
                  {t("contact.formSuccessBtn")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="absolute -left-[10000px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 font-semibold">{t("contact.formTitle")}</h3>
                  <p className="text-xs text-slate-600 font-normal">{t("contact.formDesc")}</p>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-2 items-center text-xs text-red-700 font-semibold">
                    <AlertCircle className="size-4 text-red-600 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-800 uppercase">{t("contact.lblName")}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact.phName")}
                      className="border border-slate-300 rounded-md p-2.5 text-xs bg-white text-slate-850 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Company */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-xs font-bold text-slate-800 uppercase">{t("contact.lblCompany")}</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t("contact.phCompany")}
                      className="border border-slate-300 rounded-md p-2.5 text-xs bg-white text-slate-850 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-800 uppercase">{t("contact.lblEmail")}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.phEmail")}
                      className="border border-slate-300 rounded-md p-2.5 text-xs bg-white text-slate-850 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-bold text-slate-800 uppercase">{t("contact.lblPhone")}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("contact.phPhone")}
                      className="border border-slate-300 rounded-md p-2.5 text-xs bg-white text-slate-850 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Site Type */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="siteType" className="text-xs font-bold text-slate-800 uppercase">{t("contact.lblSiteType")}</label>
                    <select
                      id="siteType"
                      name="siteType"
                      value={formData.siteType}
                      onChange={handleChange}
                      className="border border-slate-300 rounded-md p-2.5 text-xs bg-white text-slate-850 focus:outline-hidden focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    >
                      <option value="factory" className="bg-white">{t("contact.optFactory")}</option>
                      <option value="warehouse" className="bg-white">{t("contact.optWarehouse")}</option>
                      <option value="office" className="bg-white">{t("contact.optOffice")}</option>
                      <option value="hospital" className="bg-white">{t("contact.optHospital")}</option>
                      <option value="education" className="bg-white">{t("contact.optEducation")}</option>
                      <option value="other" className="bg-white">{t("contact.optOther")}</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-xs font-bold text-slate-800 uppercase">{t("contact.lblSubject")}</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="border border-slate-300 rounded-md p-2.5 text-xs bg-white text-slate-850 focus:outline-hidden focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    >
                      <option value="request_proposal" className="bg-white">{t("contact.optProposal")}</option>
                      <option value="risk_assessment" className="bg-white">{t("contact.optSurvey")}</option>
                      <option value="other" className="bg-white">{t("contact.optGeneral")}</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-800 uppercase">{t("contact.lblMessage")}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t("contact.phMessage")}
                    className="border border-slate-300 rounded-md p-2.5 text-xs bg-white text-slate-855 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-y"
                    required
                  ></textarea>
                </div>

                <p className="text-[11px] leading-relaxed text-slate-500">
                  เมื่อส่งแบบฟอร์มนี้ ท่านรับทราบว่าเราจะใช้ข้อมูลเพื่อดำเนินการตามคำขอและติดต่อกลับตาม{" "}
                  <Link href="/privacy-policy" className="font-semibold text-primary underline underline-offset-2">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </p>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="gold"
                  disabled={isSubmitting}
                  className="py-5 text-sm rounded-md font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    t("contact.btnSubmitting")
                  ) : (
                    <>
                      {t("contact.btnSubmit")}
                      <Send className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Map Section */}
      <section className="bg-surface border-t border-white/[0.08] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-2">{t("contact.mapTag")}</h3>
            <p className="text-2xl font-extrabold text-white tracking-tight font-semibold">{t("contact.mapTitle")}</p>
          </div>
          
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-primary shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
              <div className="relative min-h-[360px] bg-slate-900 lg:min-h-[450px]">
                <iframe
                  title="Duty Xpert office location on Google Maps"
                  src={GOOGLE_MAPS_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                />
              </div>

              <div className="relative flex flex-col justify-between gap-8 p-6 text-white md:p-8">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-accent p-2">
                      <MapPin className="size-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">{t("contact.mapCardTitle")}</h4>
                      <p className="mt-1 text-xs leading-5 text-slate-300 whitespace-pre-line">
                        {t("contact.hqAddress")}
                      </p>
                    </div>
                  </div>

                  <a
                    href={GOOGLE_MAPS_PLACE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-white/40 bg-secondary px-3.5 py-3 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:bg-secondary/95"
                  >
                    {t("contact.mapBtnOpen")}
                  </a>
                </div>

                <div className="relative z-10 rounded-xl border border-white/10 bg-primary/80 p-5 backdrop-blur-xs">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-accent">
                    {t("contact.mapBtsLabel")}
                  </span>
                  <p className="text-xs font-normal leading-relaxed text-slate-200">
                    {t("contact.mapBtsText")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
