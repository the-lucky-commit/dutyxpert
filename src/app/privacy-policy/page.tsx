import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว | Duty Xpert Security",
  description: "นโยบายการเก็บ ใช้ และดูแลข้อมูลส่วนบุคคลของผู้ติดต่อบริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด",
  alternates: { canonical: "/privacy-policy" },
}

export default function PrivacyPolicyPage() {
  return (
    <article className="bg-white text-slate-700 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Privacy Policy</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">นโยบายความเป็นส่วนตัว</h1>
        <p className="mt-6 leading-7">บริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลที่ได้รับผ่านเว็บไซต์นี้</p>

        <h2 className="mt-10 text-xl font-bold text-slate-900">ข้อมูลที่เราเก็บและวัตถุประสงค์</h2>
        <p className="mt-3 leading-7">เราอาจเก็บชื่อ บริษัท อีเมล หมายเลขโทรศัพท์ และรายละเอียดความต้องการ เพื่อพิจารณาคำขอ จัดทำใบเสนอราคา นัดหมายสำรวจพื้นที่ และติดต่อกลับเกี่ยวกับบริการที่ท่านสอบถาม</p>

        <h2 className="mt-10 text-xl font-bold text-slate-900">การเก็บรักษาและเปิดเผยข้อมูล</h2>
        <p className="mt-3 leading-7">ข้อมูลจะถูกเก็บเท่าที่จำเป็นต่อวัตถุประสงค์และข้อกำหนดทางกฎหมาย เราไม่จำหน่ายข้อมูลส่วนบุคคล และจะเปิดเผยเฉพาะแก่ผู้ให้บริการที่จำเป็นหรือเมื่อกฎหมายกำหนด</p>

        <h2 className="mt-10 text-xl font-bold text-slate-900">สิทธิของเจ้าของข้อมูล</h2>
        <p className="mt-3 leading-7">ท่านสามารถขอเข้าถึง แก้ไข ลบ จำกัดหรือคัดค้านการใช้ข้อมูล รวมถึงถอนความยินยอมในกรณีที่เราอาศัยความยินยอมเป็นฐาน โดยติดต่อที่ info@dutyxpert.com หรือ 080-938-7829</p>

        <p className="mt-10 text-sm text-slate-500">ปรับปรุงล่าสุด: 28 มิถุนายน 2569</p>
      </div>
    </article>
  )
}
