import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "การเสนอราคา | Duty Xpert Security",
  description: "ประเมินราคาและออกแบบบริการรักษาความปลอดภัยตามความเสี่ยงจริงของแต่ละพื้นที่ นัดหมายสำรวจหน้างานฟรี",
  alternates: { canonical: "/pricing" },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
