import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ติดต่อเรา | Duty Xpert Security",
  description: "ติดต่อขอใบเสนอราคา นัดหมายสำรวจพื้นที่ และปรึกษาการวางระบบรักษาความปลอดภัยกับ Duty Xpert",
  alternates: { canonical: "/contact" },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
