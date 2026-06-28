import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "บริการรักษาความปลอดภัย | Duty Xpert Security",
  description: "บริการเจ้าหน้าที่รักษาความปลอดภัย สายตรวจ และประเมินความเสี่ยงหน้างาน พร้อมระบบควบคุมมาตรฐาน",
  alternates: { canonical: "/services" },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
