"use client"

import { useLanguage } from "@/context/language-context"

const privacyContent = {
  th: {
    eyebrow: "Privacy Policy",
    title: "นโยบายความเป็นส่วนตัว",
    intro:
      "บริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้งานเว็บไซต์ ผู้ติดต่อขอข้อมูลบริการ และผู้ดูแลระบบที่ได้รับสิทธิ์ใช้งานระบบจัดการเนื้อหา นโยบายนี้อธิบายข้อมูลที่เว็บไซต์เก็บ ใช้ เปิดเผย เก็บรักษา และมาตรการดูแลข้อมูลที่เกี่ยวข้องกับการใช้งานเว็บไซต์นี้",
    collectedTitle: "ข้อมูลที่เว็บไซต์อาจเก็บ",
    collectedItems: [
      {
        label: "ข้อมูลจากแบบฟอร์มติดต่อ:",
        text: "ชื่อผู้ติดต่อ ชื่อบริษัทหรือหน่วยงาน อีเมล เบอร์โทรศัพท์ ประเภทสถานที่ หัวข้อที่ต้องการติดต่อ รายละเอียดความต้องการ วันที่และเวลาที่ส่งข้อมูล และหมายเลข IP ที่เกี่ยวข้องกับการส่งแบบฟอร์ม",
      },
      {
        label: "ข้อมูลจากระบบจัดการเนื้อหา:",
        text: "ข้อมูลบทความ ข่าวสาร ข้อความหน้าเว็บ รูปภาพที่อัปโหลด สถานะร่าง/เผยแพร่ วันที่สร้าง วันที่แก้ไข และข้อมูลที่ผู้ดูแลระบบกรอกผ่านระบบ",
      },
      {
        label: "ข้อมูลทางเทคนิค:",
        text: "ข้อมูลที่จำเป็นต่อการรักษาความปลอดภัย การจำกัดการส่งแบบฟอร์มถี่เกินไป การตรวจสอบข้อผิดพลาด และการให้เว็บไซต์ทำงานได้ตามปกติ",
      },
      {
        label: "คุกกี้สำหรับผู้ดูแลระบบ:",
        text: "เว็บไซต์ใช้คุกกี้ session สำหรับการเข้าสู่ระบบผู้ดูแลระบบเท่านั้น โดยตั้งค่าเป็น HTTP-only, secure เมื่อใช้งานบน production และมีอายุจำกัดตามระบบ",
      },
    ],
    purposesTitle: "วัตถุประสงค์ในการใช้ข้อมูล",
    purposes: [
      "ติดต่อกลับผู้ที่ส่งแบบฟอร์ม ขอข้อมูลเพิ่มเติม นัดหมายสำรวจพื้นที่ หรือดำเนินการตามคำขอที่ผู้ใช้งานส่งเข้ามา",
      "บันทึกและแจ้งเตือนคำขอติดต่อไปยังทีมงานที่รับผิดชอบผ่านระบบอีเมลของบริษัท เมื่อระบบอีเมลถูกตั้งค่าไว้",
      "จัดการบทความ ข่าวสาร ข้อความหน้าเว็บ และรูปภาพที่แสดงบนเว็บไซต์",
      "ตรวจสอบความถูกต้องของการเข้าสู่ระบบผู้ดูแลระบบ ป้องกันการใช้งานโดยไม่ได้รับอนุญาต และลดความเสี่ยงจาก spam หรือ abuse",
      "ปรับปรุงความเสถียร ความปลอดภัย และประสบการณ์ใช้งานเว็บไซต์",
    ],
    retentionTitle: "การเก็บรักษาและเปิดเผยข้อมูล",
    retention:
      "ข้อมูลจะถูกเก็บไว้เท่าที่จำเป็นต่อวัตถุประสงค์ในการติดต่อกลับ การบริหารเว็บไซต์ การตรวจสอบย้อนหลัง และข้อกำหนดทางกฎหมายที่เกี่ยวข้อง บริษัทไม่จำหน่าย แลกเปลี่ยน หรือให้เช่าข้อมูลส่วนบุคคลแก่บุคคลภายนอก การเปิดเผยข้อมูลอาจเกิดขึ้นเฉพาะกรณีที่จำเป็น เช่น ผู้ให้บริการ hosting, ระบบอีเมล, ผู้ดูแลระบบที่ได้รับมอบหมาย, ที่ปรึกษาหรือผู้ให้บริการที่เกี่ยวข้องกับการดูแลระบบ หรือเมื่อมีกฎหมาย คำสั่งหน่วยงานรัฐ หรือกระบวนการทางกฎหมายกำหนด",
    uploadsTitle: "รูปภาพและเนื้อหาที่ผู้ดูแลระบบอัปโหลด",
    uploads:
      "รูปภาพที่ผู้ดูแลระบบอัปโหลดผ่านระบบจัดการเนื้อหาอาจถูกย่อขนาดและบันทึกไว้บนพื้นที่จัดเก็บของเว็บไซต์เพื่อนำไปแสดงต่อสาธารณะ ผู้ดูแลระบบของบริษัทมีหน้าที่ตรวจสอบว่าไฟล์ รูปภาพ ข้อความ และข้อมูลที่เผยแพร่ไม่มีข้อมูลส่วนบุคคลหรือข้อมูลอ่อนไหวเกินความจำเป็น และมีสิทธิ์ใช้งานหรือได้รับอนุญาตให้เผยแพร่โดยถูกต้อง",
    securityTitle: "มาตรการดูแลความปลอดภัย",
    security:
      "เว็บไซต์ใช้มาตรการตามสมควรเพื่อช่วยลดความเสี่ยง เช่น การจำกัดขนาดข้อมูลที่ส่งเข้า API การตรวจรูปแบบอีเมล การจำกัดจำนวนครั้งในการส่งแบบฟอร์มหรือเข้าสู่ระบบ การใช้คุกกี้แบบ HTTP-only สำหรับ session ผู้ดูแลระบบ และการบันทึกไฟล์ข้อมูลบางประเภทด้วยสิทธิ์การเข้าถึงที่จำกัด อย่างไรก็ตาม ไม่มีระบบออนไลน์ใดสามารถรับประกันความปลอดภัยได้อย่างสมบูรณ์ ผู้ใช้งานและผู้ดูแลระบบควรหลีกเลี่ยงการส่งข้อมูลอ่อนไหวที่ไม่จำเป็นผ่านเว็บไซต์",
    externalTitle: "การเชื่อมโยงไปยังบริการภายนอก",
    external:
      "เว็บไซต์อาจมีลิงก์ไปยังบริการภายนอก เช่น Google Maps, อีเมล, เบอร์โทรศัพท์ หรือเว็บไซต์อื่น ๆ เมื่่อผู้ใช้งานออกจากเว็บไซต์นี้ การเก็บ ใช้ หรือประมวลผลข้อมูลจะอยู่ภายใต้นโยบายของผู้ให้บริการภายนอกนั้น ๆ",
    rightsTitle: "สิทธิของเจ้าของข้อมูล",
    rights:
      "เจ้าของข้อมูลสามารถติดต่อบริษัทเพื่อขอเข้าถึง แก้ไข ลบ จำกัดหรือคัดค้านการใช้ข้อมูลส่วนบุคคล ขอถอนความยินยอมในกรณีที่ใช้ความยินยอมเป็นฐาน หรือสอบถามรายละเอียดการใช้ข้อมูลได้ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลที่เกี่ยวข้อง การดำเนินการบางกรณีอาจต้องตรวจสอบตัวตนของผู้ร้องขอและอาจมีข้อจำกัดตามกฎหมายหรือภาระหน้าที่ที่บริษัทจำเป็นต้องปฏิบัติ",
    contactTitle: "ช่องทางติดต่อ",
    contact: "หากมีคำถามเกี่ยวกับนโยบายนี้หรือการใช้ข้อมูลส่วนบุคคล สามารถติดต่อได้ที่ info@dutyxpert.com หรือ 080-938-7829",
    updated: "ปรับปรุงล่าสุด: 13 กรกฎาคม 2569",
  },
  en: {
    eyebrow: "Privacy Policy",
    title: "Privacy Policy",
    intro:
      "Duty Xpert Security Co., Ltd. values the protection of personal data for website visitors, people who submit service inquiries, and authorized administrators who use the website content management system. This policy explains what information the website may collect, how it is used, disclosed, retained, and the safeguards related to the operation of this website.",
    collectedTitle: "Information We May Collect",
    collectedItems: [
      {
        label: "Contact form information:",
        text: "contact name, company or organization name, email address, phone number, site type, inquiry subject, security requirements, submission date and time, and IP address related to the form submission.",
      },
      {
        label: "Content management information:",
        text: "articles, news, website page text, uploaded images, draft or published status, creation dates, update dates, and information entered by authorized administrators.",
      },
      {
        label: "Technical information:",
        text: "information required for security, rate limiting, error investigation, and normal website operation.",
      },
      {
        label: "Administrator session cookies:",
        text: "the website uses session cookies only for administrator login. In production, these cookies are configured as HTTP-only, secure, and limited by the system session lifetime.",
      },
    ],
    purposesTitle: "How We Use Information",
    purposes: [
      "To contact people who submit forms, request additional details, schedule site assessments, or respond to submitted requests.",
      "To record and notify the responsible team about contact requests through the company email system when email delivery is configured.",
      "To manage articles, news, website page content, and images displayed on the website.",
      "To verify administrator login, prevent unauthorized use, and reduce spam or abuse risks.",
      "To improve website stability, security, and user experience.",
    ],
    retentionTitle: "Retention and Disclosure",
    retention:
      "Information is retained only as long as necessary for follow-up, website administration, audit purposes, and applicable legal requirements. The company does not sell, trade, or rent personal data to third parties. Disclosure may occur only where necessary, such as to hosting providers, email systems, authorized administrators, consultants or service providers related to system maintenance, or where required by law, government order, or legal process.",
    uploadsTitle: "Images and Content Uploaded by Administrators",
    uploads:
      "Images uploaded through the content management system may be resized and stored on the website storage area for public display. Company administrators are responsible for checking that files, images, text, and published information do not contain unnecessary personal or sensitive information and that they have the right or permission to publish such materials.",
    securityTitle: "Security Measures",
    security:
      "The website applies reasonable safeguards to reduce risk, including API payload limits, email format checks, rate limits for form submissions and login attempts, HTTP-only cookies for administrator sessions, and restricted access permissions for certain stored files. However, no online system can guarantee complete security. Users and administrators should avoid submitting unnecessary sensitive information through the website.",
    externalTitle: "Links to External Services",
    external:
      "The website may link to external services such as Google Maps, email, telephone links, or other websites. When users leave this website, the collection, use, or processing of information is governed by the policies of the relevant external service provider.",
    rightsTitle: "Data Subject Rights",
    rights:
      "Data subjects may contact the company to request access, correction, deletion, restriction or objection to processing of personal data, withdrawal of consent where consent is used as a legal basis, or inquiries about data use under applicable personal data protection laws. Some requests may require identity verification and may be subject to legal or operational limitations.",
    contactTitle: "Contact",
    contact: "For questions about this policy or the use of personal data, please contact info@dutyxpert.com or 080-938-7829.",
    updated: "Last updated: July 13, 2026",
  },
}

export function PrivacyPolicyContent() {
  const { language } = useLanguage()
  const content = privacyContent[language]

  return (
    <article className="bg-white text-slate-700 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{content.eyebrow}</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">{content.title}</h1>
        <p className="mt-6 leading-7">{content.intro}</p>

        <h2 className="mt-10 text-xl font-bold text-slate-900">{content.collectedTitle}</h2>
        <ul className="mt-3 list-disc space-y-3 pl-6 leading-7">
          {content.collectedItems.map((item) => (
            <li key={item.label}>
              <span className="font-semibold text-slate-900">{item.label}</span> {item.text}
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl font-bold text-slate-900">{content.purposesTitle}</h2>
        <ul className="mt-3 list-disc space-y-3 pl-6 leading-7">
          {content.purposes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {[
          [content.retentionTitle, content.retention],
          [content.uploadsTitle, content.uploads],
          [content.securityTitle, content.security],
          [content.externalTitle, content.external],
          [content.rightsTitle, content.rights],
          [content.contactTitle, content.contact],
        ].map(([title, body]) => (
          <section key={title}>
            <h2 className="mt-10 text-xl font-bold text-slate-900">{title}</h2>
            <p className="mt-3 leading-7">{body}</p>
          </section>
        ))}

        <p className="mt-10 text-sm text-slate-500">{content.updated}</p>
      </div>
    </article>
  )
}
