import type { Metadata } from "next"
import { Inter, Noto_Sans_Thai } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LenisProvider from "@/components/lenis-provider"
import StructuredData from "@/components/structured-data"
import { LanguageProvider } from "@/context/language-context"
import { readTranslations } from "@/lib/data-store"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-sans-thai",
  display: "swap",
})

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "บริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด | เชี่ยวชาญงาน ชำนาญคน",
  description: "บริการรักษาความปลอดภัยแบบครบวงจร ดูแลทั้งระบบงานและคนในระบบ จดทะเบียนถูกต้อง ทุนจดทะเบียน 5 ล้านบาทถ้วน สายตรวจ 24 ชม. ประเมินหน้างานฟรี",
  keywords: ["รักษาความปลอดภัย", "รปภ", "Duty Xpert", "บริษัทรักษาความปลอดภัย", "สายตรวจ", "เจ้าหน้าที่รักษาความปลอดภัย", "ดิวตี้ เอคซ์เพิร์ท"],
  metadataBase: new URL("https://dutyxpert.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "บริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด | เชี่ยวชาญงาน ชำนาญคน",
    description: "บริการรักษาความปลอดภัยแบบครบวงจร ดูแลทั้งระบบงานและคนในระบบ จดทะเบียนถูกต้อง ทุนจดทะเบียน 5 ล้านบาทถ้วน",
    url: "https://dutyxpert.com",
    siteName: "Duty Xpert Security Solutions",
    locale: "th_TH",
    type: "website",
    images: [{
      url: "/images/patrol-team.jpg",
      width: 1280,
      height: 960,
      alt: "เจ้าหน้าที่สายตรวจ ดิวตี้ เอคซ์เพิร์ท",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "บริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด",
    description: "บริการรักษาความปลอดภัยแบบครบวงจร สายตรวจ 24 ชม. ประเมินหน้างานฟรี",
    images: ["/images/patrol-team.jpg"],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const translations = await readTranslations()

  return (
    <html
      lang="th"
      className={`${inter.variable} ${notoSansThai.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LanguageProvider initialTranslations={translations}>
          <LenisProvider>
            <Navbar />
            <main className="flex-grow pt-20 lg:pt-[104px]">
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
