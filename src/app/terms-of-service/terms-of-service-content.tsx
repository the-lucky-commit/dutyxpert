"use client"

import { useLanguage } from "@/context/language-context"

const termsContent = {
  th: {
    eyebrow: "Website Terms",
    title: "เงื่อนไขการใช้บริการเว็บไซต์",
    intro:
      "เงื่อนไขนี้ใช้กับการเข้าชมเว็บไซต์ dutyxpert.com การส่งแบบฟอร์มติดต่อ การอ่านบทความหรือข่าวสาร และการใช้งานระบบจัดการเนื้อหาสำหรับผู้ดูแลระบบของบริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด เมื่อใช้งานเว็บไซต์นี้ ถือว่าผู้ใช้งานรับทราบและยอมรับเงื่อนไขที่เกี่ยวข้องกับการใช้งานเว็บไซต์",
    sections: [
      {
        title: "ลักษณะของข้อมูลบนเว็บไซต์",
        body: "ข้อมูลบนเว็บไซต์จัดทำขึ้นเพื่อแนะนำบริษัท บริการ ช่องทางติดต่อ บทความ ข่าวสาร และข้อมูลทั่วไปสำหรับการพิจารณาเบื้องต้นเท่านั้น ข้อมูลดังกล่าวไม่ใช่คำรับรองผลลัพธ์ ไม่ใช่ข้อเสนอที่มีผลผูกพัน และไม่ใช่สัญญาจ้างบริการโดยอัตโนมัติ รายละเอียดเชิงพาณิชย์ เช่น ใบเสนอราคา ขอบเขตงาน จำนวนบุคลากร เงื่อนไขบริการ ความรับผิด หรือข้อมูลเฉพาะโครงการ เป็นข้อมูลสำคัญที่ต้องได้รับการตรวจสอบและยืนยันโดยผู้มีอำนาจของ Duty Xpert โดยตรง",
      },
      {
        title: "การส่งแบบฟอร์มติดต่อ",
        body: "ผู้ใช้งานควรกรอกข้อมูลติดต่อและรายละเอียดความต้องการให้ถูกต้อง ครบถ้วน และไม่ใส่ข้อมูลที่ผิดกฎหมาย ละเมิดสิทธิผู้อื่น หรือมีข้อมูลอ่อนไหวเกินความจำเป็น การส่งแบบฟอร์มเป็นเพียงการส่งคำขอให้ทีมงานติดต่อกลับ ไม่ถือเป็นการยืนยันการรับงาน การจองบริการ การรับประกันราคา หรือการเกิดสัญญาระหว่างคู่สัญญา",
      },
      {
        title: "ระบบจัดการเนื้อหาและการเผยแพร่ข้อมูล",
        body: "เว็บไซต์มีระบบผู้ดูแลสำหรับจัดการบทความ ข่าวสาร ข้อความหน้าเว็บ รูปภาพ สถานะแบบร่าง การตรวจตัวอย่าง และการเผยแพร่ ผู้ดูแลระบบของบริษัทเป็นผู้รับผิดชอบในการตรวจสอบความถูกต้อง ความเหมาะสม สิทธิ์การใช้งานรูปภาพ และความครบถ้วนของข้อมูลก่อนเผยแพร่ โดยเฉพาะข้อมูลที่เกี่ยวข้องกับราคา เงื่อนไขบริการ ลูกค้า บุคลากร ข้อมูลภายใน หรือข้อมูลอื่นที่มีความละเอียดอ่อน",
      },
      {
        title: "ทรัพย์สินทางปัญญา",
        body: "ข้อความ ภาพ โลโก้ เครื่องหมายการค้า โครงสร้างหน้าเว็บ งานออกแบบ และองค์ประกอบอื่นบนเว็บไซต์เป็นทรัพย์สินของบริษัทหรือใช้โดยได้รับอนุญาต ห้ามคัดลอก ดัดแปลง เผยแพร่ซ้ำ หรือนำไปใช้เชิงพาณิชย์โดยไม่ได้รับอนุญาต เว้นแต่เป็นการใช้งานตามกฎหมายหรือได้รับความยินยอมเป็นลายลักษณ์อักษร",
      },
    ],
    prohibitedTitle: "การใช้งานที่ไม่อนุญาต",
    prohibited: [
      "พยายามเข้าถึงระบบผู้ดูแล ระบบ API หรือข้อมูลที่ไม่ได้รับอนุญาต",
      "ส่ง spam, bot, malware, script อันตราย หรือข้อมูลที่รบกวนการทำงานของเว็บไซต์",
      "อัปโหลดหรือเผยแพร่ไฟล์ รูปภาพ หรือข้อความที่ละเมิดกฎหมาย ละเมิดสิทธิส่วนบุคคล ละเมิดลิขสิทธิ์ หรือกระทบชื่อเสียงของผู้อื่น",
      "นำข้อมูลจากเว็บไซต์ไปใช้ในลักษณะที่ทำให้เข้าใจผิดว่าได้รับการรับรองจากบริษัทโดยตรง",
    ],
    closingSections: [
      {
        title: "ลิงก์และบริการภายนอก",
        body: "เว็บไซต์อาจเชื่อมโยงไปยังบริการภายนอก เช่น Google Maps, อีเมล, การโทรออก หรือเว็บไซต์อื่น บริษัทไม่สามารถควบคุมเนื้อหา ความพร้อมใช้งาน หรือเงื่อนไขของบริการภายนอกเหล่านั้นได้ ผู้ใช้งานควรตรวจสอบนโยบายและเงื่อนไขของผู้ให้บริการภายนอกก่อนใช้งาน",
      },
      {
        title: "ข้อจำกัดความรับผิดของเว็บไซต์",
        body: "บริษัทพยายามดูแลให้เว็บไซต์ทำงานถูกต้อง ปลอดภัย และแสดงข้อมูลที่เหมาะสม อย่างไรก็ตาม เว็บไซต์อาจมีการปรับปรุง บำรุงรักษา ขัดข้อง หรือแสดงข้อมูลที่ยังรอการตรวจสอบได้เป็นครั้งคราว บริษัทไม่รับประกันว่าเว็บไซต์จะปราศจากข้อผิดพลาดหรือให้บริการได้ต่อเนื่องตลอดเวลา ข้อมูลสำคัญที่มีผลต่อการตัดสินใจทางธุรกิจควรได้รับการยืนยันโดยตรงจากผู้มีอำนาจของบริษัทก่อนนำไปใช้",
      },
      {
        title: "ความเป็นส่วนตัวและข้อมูลส่วนบุคคล",
        body: "การเก็บ ใช้ เปิดเผย และดูแลข้อมูลส่วนบุคคลที่เกิดจากการใช้งานเว็บไซต์นี้เป็นไปตามนโยบายความเป็นส่วนตัวของเว็บไซต์ ซึ่งผู้ใช้งานสามารถอ่านได้ที่หน้านโยบายความเป็นส่วนตัว",
      },
      {
        title: "การเปลี่ยนแปลงเงื่อนไข",
        body: "บริษัทอาจแก้ไขหรือปรับปรุงเงื่อนไขนี้ให้สอดคล้องกับการทำงานของเว็บไซต์ กฎหมาย หรือการดำเนินงานจริง โดยจะแสดงวันที่ปรับปรุงล่าสุดบนหน้านี้ การใช้งานเว็บไซต์ต่อหลังมีการเปลี่ยนแปลงถือว่าผู้ใช้งานรับทราบเงื่อนไขฉบับล่าสุด",
      },
    ],
    updated: "ปรับปรุงล่าสุด: 13 กรกฎาคม 2569",
  },
  en: {
    eyebrow: "Website Terms",
    title: "Website Terms of Service",
    intro:
      "These terms apply to visits to dutyxpert.com, contact form submissions, reading articles or news, and use of the content management system by authorized administrators of Duty Xpert Security Co., Ltd. By using this website, users acknowledge and accept the terms related to website use.",
    sections: [
      {
        title: "Nature of Website Information",
        body: "Information on this website is provided to introduce the company, services, contact channels, articles, news, and general information for preliminary consideration only. Such information is not a performance guarantee, not a binding offer, and does not automatically create a service agreement. Commercial details such as quotations, scope of work, staffing levels, service conditions, liability, or project-specific information must be reviewed and confirmed directly by an authorized representative of Duty Xpert.",
      },
      {
        title: "Contact Form Submissions",
        body: "Users should provide accurate and complete contact information and requirements, and should not submit unlawful content, content that infringes the rights of others, or unnecessary sensitive information. Submitting a form is only a request for the team to contact the user. It does not confirm service acceptance, reserve service, guarantee pricing, or create a contract between the parties.",
      },
      {
        title: "Content Management and Publication",
        body: "The website includes an administrator system for managing articles, news, website text, images, draft status, preview review, and publication. Company administrators are responsible for checking accuracy, appropriateness, image usage rights, and completeness before publishing, especially for information related to pricing, service conditions, clients, personnel, internal information, or other sensitive information.",
      },
      {
        title: "Intellectual Property",
        body: "Text, images, logos, trademarks, website structure, design work, and other website elements are owned by the company or used with permission. Copying, modifying, republishing, or using them commercially without permission is prohibited, except where permitted by law or by written consent.",
      },
    ],
    prohibitedTitle: "Prohibited Use",
    prohibited: [
      "Attempting to access administrator systems, APIs, or information without authorization.",
      "Submitting spam, bots, malware, harmful scripts, or information that disrupts website operation.",
      "Uploading or publishing files, images, or text that violate laws, personal rights, copyrights, or the reputation of others.",
      "Using website information in a way that falsely implies direct endorsement by the company.",
    ],
    closingSections: [
      {
        title: "External Links and Services",
        body: "The website may link to external services such as Google Maps, email, telephone links, or other websites. The company cannot control the content, availability, or terms of those external services. Users should review the policies and terms of external service providers before using them.",
      },
      {
        title: "Website Disclaimer",
        body: "The company makes reasonable efforts to keep the website accurate, secure, and appropriate. However, the website may be updated, maintained, interrupted, or display information pending review from time to time. The company does not guarantee that the website will be error-free or continuously available. Important information that affects business decisions should be confirmed directly with an authorized representative of the company before use.",
      },
      {
        title: "Privacy and Personal Data",
        body: "The collection, use, disclosure, and protection of personal data arising from the use of this website are governed by the website Privacy Policy, which users can read on the Privacy Policy page.",
      },
      {
        title: "Changes to These Terms",
        body: "The company may revise or update these terms to reflect website functionality, legal requirements, or actual operations. The latest update date will be shown on this page. Continued use of the website after changes are made means the user acknowledges the latest version of these terms.",
      },
    ],
    updated: "Last updated: July 13, 2026",
  },
}

export function TermsOfServiceContent() {
  const { language } = useLanguage()
  const content = termsContent[language]

  return (
    <article className="bg-white text-slate-700 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{content.eyebrow}</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">{content.title}</h1>
        <p className="mt-6 leading-7">{content.intro}</p>

        {content.sections.map((section) => (
          <section key={section.title}>
            <h2 className="mt-10 text-xl font-bold text-slate-900">{section.title}</h2>
            <p className="mt-3 leading-7">{section.body}</p>
          </section>
        ))}

        <h2 className="mt-10 text-xl font-bold text-slate-900">{content.prohibitedTitle}</h2>
        <ul className="mt-3 list-disc space-y-3 pl-6 leading-7">
          {content.prohibited.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {content.closingSections.map((section) => (
          <section key={section.title}>
            <h2 className="mt-10 text-xl font-bold text-slate-900">{section.title}</h2>
            <p className="mt-3 leading-7">{section.body}</p>
          </section>
        ))}

        <p className="mt-10 text-sm text-slate-500">{content.updated}</p>
      </div>
    </article>
  )
}
