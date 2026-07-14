import type { Metadata } from "next"
import { getRequestLanguage } from "@/lib/server-language"
import { PrivacyPolicyContent } from "./privacy-policy-content"

const privacyMetadata = {
  th: {
    title: "นโยบายความเป็นส่วนตัว | Duty Xpert Security",
    description:
      "นโยบายการเก็บ ใช้ ดูแล และคุ้มครองข้อมูลส่วนบุคคลบนเว็บไซต์ Duty Xpert Security",
  },
  en: {
    title: "Privacy Policy | Duty Xpert Security",
    description:
      "How Duty Xpert Security collects, uses, protects, and manages personal data on the website.",
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage()
  const copy = privacyMetadata[language]

  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: "/privacy-policy" },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: "https://dutyxpert.com/privacy-policy",
      type: "website",
      locale: language === "en" ? "en_US" : "th_TH",
    },
  }
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}
