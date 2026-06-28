import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "เงื่อนไขการใช้บริการเว็บไซต์ | Duty Xpert Security",
  description: "เงื่อนไขการใช้งานเว็บไซต์และการติดต่อขอรับบริการจาก Duty Xpert Security",
  alternates: { canonical: "/terms-of-service" },
}

export default function TermsOfServicePage() {
  return (
    <article className="bg-white text-slate-700 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Website Terms</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">เงื่อนไขการใช้บริการเว็บไซต์</h1>
        <p className="mt-6 leading-7">ข้อมูลบนเว็บไซต์จัดทำขึ้นเพื่อแนะนำบริการรักษาความปลอดภัยและใช้ประกอบการติดต่อเบื้องต้น การส่งแบบฟอร์มยังไม่ถือเป็นการทำสัญญาหรือการยืนยันราคา</p>

        <h2 className="mt-10 text-xl font-bold text-slate-900">ใบเสนอราคาและขอบเขตบริการ</h2>
        <p className="mt-3 leading-7">ราคา ขอบเขตงาน จำนวนบุคลากร และเงื่อนไขความรับผิดจะมีผลเมื่อได้รับการยืนยันเป็นลายลักษณ์อักษรหรือระบุในสัญญาระหว่างคู่สัญญาเท่านั้น</p>

        <h2 className="mt-10 text-xl font-bold text-slate-900">ความถูกต้องของข้อมูล</h2>
        <p className="mt-3 leading-7">ผู้ใช้งานควรให้ข้อมูลติดต่อและรายละเอียดหน้างานที่ถูกต้อง บริษัทอาจติดต่อเพื่อสอบถามเพิ่มเติมก่อนประเมินหรือจัดทำข้อเสนอ</p>

        <h2 className="mt-10 text-xl font-bold text-slate-900">ทรัพย์สินทางปัญญา</h2>
        <p className="mt-3 leading-7">ข้อความ ภาพ เครื่องหมาย และองค์ประกอบของเว็บไซต์เป็นทรัพย์สินของบริษัทหรือใช้โดยได้รับอนุญาต ห้ามนำไปใช้เชิงพาณิชย์โดยไม่ได้รับอนุญาต</p>

        <p className="mt-10 text-sm text-slate-500">ปรับปรุงล่าสุด: 28 มิถุนายน 2569</p>
      </div>
    </article>
  )
}
