import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | Duty Xpert Security",
  description: "รู้จักบริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด วิสัยทัศน์ พันธกิจ และมาตรฐานการดำเนินงาน",
  alternates: { canonical: "/about" },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
