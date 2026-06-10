import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LenisProvider from "@/components/lenis-provider"
import StructuredData from "@/components/structured-data"
import { LanguageProvider } from "@/context/language-context"

export const metadata: Metadata = {
  title: "บริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด | เชี่ยวชาญงาน ชำนาญคน",
  description: "บริการรักษาความปลอดภัยแบบครบวงจร ดูแลทั้งระบบงานและคนในระบบ จดทะเบียนถูกต้อง ทุนจดทะเบียน 5 ล้านบาทถ้วน สายตรวจ 24 ชม. ประเมินหน้างานฟรี",
  keywords: ["รักษาความปลอดภัย", "รปภ", "Duty Xpert", "บริษัทรักษาความปลอดภัย", "สายตรวจ", "เจ้าหน้าที่รักษาความปลอดภัย", "ดิวตี้ เอคซ์เพิร์ท"],
  metadataBase: new URL("https://dutyxpert.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "บริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด | เชี่ยวชาญงาน ชำนาญคน",
    description: "บริการรักษาความปลอดภัยแบบครบวงจร ดูแลทั้งระบบงานและคนในระบบ จดทะเบียนถูกต้อง ทุนจดทะเบียน 5 ล้านบาทถ้วน",
    url: "https://dutyxpert.com",
    siteName: "Duty Xpert Security Solutions",
    locale: "th_TH",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="th"
      className="h-full antialiased scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Thai:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LanguageProvider>
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
