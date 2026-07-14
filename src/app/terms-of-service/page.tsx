import type { Metadata } from "next"
import { getRequestLanguage } from "@/lib/server-language"
import { TermsOfServiceContent } from "./terms-of-service-content"

const termsMetadata = {
  th: {
    title: "เงื่อนไขการใช้บริการเว็บไซต์ | Duty Xpert Security",
    description:
      "เงื่อนไขการใช้งานเว็บไซต์ Duty Xpert Security ระบบติดต่อ ระบบจัดการเนื้อหา และการเผยแพร่ข้อมูลบนเว็บไซต์",
  },
  en: {
    title: "Website Terms of Service | Duty Xpert Security",
    description:
      "Website terms covering Duty Xpert Security website usage, contact forms, content management, and published information.",
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage()
  const copy = termsMetadata[language]

  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: "/terms-of-service" },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: "https://dutyxpert.com/terms-of-service",
      type: "website",
      locale: language === "en" ? "en_US" : "th_TH",
    },
  }
}

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />
}
