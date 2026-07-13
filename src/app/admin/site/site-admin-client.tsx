"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  FilePenLine,
  ImagePlus,
  LogOut,
  Newspaper,
  Save,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import defaultTranslations from "@/lib/translations.json"
import type { TranslationsDict } from "@/lib/data-store"
import {
  DEFAULT_SITE_ASSETS,
  type SiteAssets,
  type SiteContentDraft,
} from "@/lib/site-content-defaults"

type TextFieldConfig = {
  label: string
  path: string
  rows?: number
}

type TextGroupConfig = {
  title: string
  description: string
  fields: TextFieldConfig[]
}

type ImageFieldConfig = {
  key: keyof SiteAssets
  label: string
  description: string
}

const TEXT_GROUPS: TextGroupConfig[] = [
  {
    title: "ข้อมูลหลักของเว็บ",
    description: "เมนู ส่วนท้ายเว็บ และข้อมูลติดต่อที่ใช้ซ้ำหลายหน้า",
    fields: [
      { label: "ชื่อแบรนด์", path: "navbar.brand" },
      { label: "ข้อความใต้โลโก้", path: "navbar.subBrand" },
      { label: "เบอร์โทรบนเว็บ", path: "navbar.phone" },
      { label: "เมนูหน้าแรก", path: "navbar.home" },
      { label: "เมนูเกี่ยวกับเรา", path: "navbar.about" },
      { label: "เมนูบริการ", path: "navbar.services" },
      { label: "เมนูบทความ", path: "navbar.articles" },
      { label: "เมนูการเสนอราคา", path: "navbar.pricing" },
      { label: "เมนูติดต่อเรา", path: "navbar.contact" },
      { label: "เมนูย่อยบริการ รปภ.", path: "navbar.dropdownGuard" },
      { label: "เมนูย่อยสายตรวจ", path: "navbar.dropdownPatrol" },
      { label: "เมนูย่อยประเมินหน้างาน", path: "navbar.dropdownConsult" },
      { label: "คำอธิบาย Footer", path: "footer.desc", rows: 3 },
      { label: "หัวข้อ Footer - ลิงก์ด่วน", path: "footer.quickLinks" },
      { label: "หัวข้อ Footer - บริการ", path: "footer.ourServices" },
      { label: "หัวข้อ Footer - ติดต่อ", path: "footer.contactTitle" },
      { label: "สำนักงานใหญ่ Footer", path: "footer.hq" },
      { label: "ที่อยู่ Footer", path: "footer.address", rows: 3 },
      { label: "ลิขสิทธิ์ Footer", path: "footer.rights", rows: 2 },
      { label: "ลิงก์ Privacy", path: "footer.privacy" },
      { label: "ลิงก์ Terms", path: "footer.terms" },
      { label: "เบอร์ติดต่อหลัก", path: "contact.phoneVal", rows: 2 },
      { label: "อีเมลติดต่อหลัก", path: "contact.emailVal" },
      { label: "เวลาทำการ", path: "contact.hoursVal", rows: 2 },
    ],
  },
  {
    title: "Banner หน้าแรก",
    description: "ข้อความส่วนแรกที่ผู้ชมเห็นทันที",
    fields: [
      { label: "ป้ายสั้น", path: "home.heroTag" },
      { label: "หัวข้อหลัก", path: "home.heroTitle" },
      { label: "คำอธิบาย", path: "home.heroDesc", rows: 3 },
      { label: "ปุ่มหลัก", path: "home.heroBtnEstimate" },
      { label: "ปุ่มรอง", path: "home.heroBtnServices" },
    ],
  },
  {
    title: "บริการ",
    description: "กล่องบริการ 3 รายการบนหน้าแรก",
    fields: [
      { label: "ป้าย section", path: "home.servicesTag" },
      { label: "หัวข้อ section", path: "home.servicesTitle" },
      { label: "บริการ 1 - หัวข้อ", path: "home.service1Title" },
      { label: "บริการ 1 - รายละเอียด", path: "home.service1Desc", rows: 3 },
      { label: "บริการ 2 - หัวข้อ", path: "home.service2Title" },
      { label: "บริการ 2 - รายละเอียด", path: "home.service2Desc", rows: 3 },
      { label: "บริการ 3 - หัวข้อ", path: "home.service3Title" },
      { label: "บริการ 3 - รายละเอียด", path: "home.service3Desc", rows: 3 },
      { label: "ข้อความปุ่ม", path: "home.serviceBtnMore" },
    ],
  },
  {
    title: "ทำไมต้องเลือกเรา",
    description: "ข้อความอธิบายจุดต่างของบริษัท",
    fields: [
      { label: "ป้าย section", path: "home.whyChooseUsTag" },
      { label: "หัวข้อ section", path: "home.whyChooseUsTitle" },
      { label: "รายละเอียด", path: "home.whyChooseUsDesc", rows: 4 },
      { label: "Badge รูป", path: "home.patrolBadge" },
      { label: "ข้อความ Badge รูป", path: "home.patrolBadgeText", rows: 2 },
      { label: "จุดเด่น 1 - หัวข้อ", path: "home.diff1Title" },
      { label: "จุดเด่น 1 - รายละเอียด", path: "home.diff1Desc", rows: 2 },
      { label: "จุดเด่น 2 - หัวข้อ", path: "home.diff2Title" },
      { label: "จุดเด่น 2 - รายละเอียด", path: "home.diff2Desc", rows: 2 },
      { label: "จุดเด่น 3 - หัวข้อ", path: "home.diff3Title" },
      { label: "จุดเด่น 3 - รายละเอียด", path: "home.diff3Desc", rows: 2 },
      { label: "จุดเด่น 4 - หัวข้อ", path: "home.diff4Title" },
      { label: "จุดเด่น 4 - รายละเอียด", path: "home.diff4Desc", rows: 2 },
    ],
  },
  {
    title: "กระบวนการทำงาน",
    description: "6 เสาหลักมาตรฐานการบริการ",
    fields: [
      { label: "ป้าย section", path: "home.processTag" },
      { label: "หัวข้อ section", path: "home.processTitle" },
      { label: "ข้อ 1 - หัวข้อ", path: "home.p1Title" },
      { label: "ข้อ 1 - รายละเอียด", path: "home.p1Desc", rows: 2 },
      { label: "ข้อ 2 - หัวข้อ", path: "home.p2Title" },
      { label: "ข้อ 2 - รายละเอียด", path: "home.p2Desc", rows: 2 },
      { label: "ข้อ 3 - หัวข้อ", path: "home.p3Title" },
      { label: "ข้อ 3 - รายละเอียด", path: "home.p3Desc", rows: 2 },
      { label: "ข้อ 4 - หัวข้อ", path: "home.p4Title" },
      { label: "ข้อ 4 - รายละเอียด", path: "home.p4Desc", rows: 2 },
      { label: "ข้อ 5 - หัวข้อ", path: "home.p5Title" },
      { label: "ข้อ 5 - รายละเอียด", path: "home.p5Desc", rows: 2 },
      { label: "ข้อ 6 - หัวข้อ", path: "home.p6Title" },
      { label: "ข้อ 6 - รายละเอียด", path: "home.p6Desc", rows: 2 },
    ],
  },
  {
    title: "ภาพการปฏิบัติงาน และ CTA",
    description: "ข้อความส่วนท้ายหน้าแรก",
    fields: [
      { label: "ป้าย gallery", path: "home.galleryTag" },
      { label: "หัวข้อ gallery", path: "home.galleryTitle" },
      { label: "คำอธิบายรูป 1", path: "home.img1Desc", rows: 2 },
      { label: "คำอธิบายรูป 2", path: "home.img2Desc", rows: 2 },
      { label: "หัวข้อ CTA", path: "home.ctaTitle" },
      { label: "รายละเอียด CTA", path: "home.ctaDesc", rows: 3 },
    ],
  },
  {
    title: "Hero หน้าสำคัญ",
    description: "หัวข้อด้านบนของหน้าเกี่ยวกับเรา บริการ ราคา และติดต่อเรา",
    fields: [
      { label: "เกี่ยวกับเรา - ป้ายสั้น", path: "about.heroTag" },
      { label: "เกี่ยวกับเรา - หัวข้อ", path: "about.heroTitle" },
      { label: "เกี่ยวกับเรา - คำอธิบาย", path: "about.heroDesc", rows: 3 },
      { label: "บริการ - ป้ายสั้น", path: "services.heroTag" },
      { label: "บริการ - หัวข้อ", path: "services.heroTitle" },
      { label: "บริการ - คำอธิบาย", path: "services.heroDesc", rows: 3 },
      { label: "ราคา - ป้ายสั้น", path: "pricing.heroTag" },
      { label: "ราคา - หัวข้อ", path: "pricing.heroTitle" },
      { label: "ราคา - คำอธิบาย", path: "pricing.heroDesc", rows: 3 },
      { label: "ติดต่อเรา - ป้ายสั้น", path: "contact.heroTag" },
      { label: "ติดต่อเรา - หัวข้อ", path: "contact.heroTitle" },
      { label: "ติดต่อเรา - คำอธิบาย", path: "contact.heroDesc", rows: 3 },
    ],
  },
  {
    title: "หน้าเกี่ยวกับเรา",
    description: "ข้อความแนะนำบริษัท ขั้นตอนการทำงาน วิสัยทัศน์ และค่านิยม",
    fields: [
      { label: "ป้ายภาพรวม", path: "about.overviewTag" },
      { label: "หัวข้อภาพรวม", path: "about.overviewTitle" },
      { label: "หัวข้อความเชี่ยวชาญ", path: "about.expertTitle" },
      { label: "รายละเอียดความเชี่ยวชาญ", path: "about.expertText", rows: 3 },
      { label: "หัวข้อชำนาญคน", path: "about.skilledTitle" },
      { label: "รายละเอียดชำนาญคน", path: "about.skilledText", rows: 3 },
      { label: "สรุปภาพรวม", path: "about.conclusionText", rows: 3 },
      { label: "ชื่อข้อมูลจดทะเบียน", path: "about.regCompany" },
      { label: "ค่าข้อมูลจดทะเบียน", path: "about.regCompanyValue" },
      { label: "ชื่อทุนจดทะเบียน", path: "about.regCapital" },
      { label: "ค่าทุนจดทะเบียน", path: "about.regCapitalValue" },
      { label: "ชื่อสถานะบริษัท", path: "about.regStatus" },
      { label: "ค่าสถานะบริษัท", path: "about.regStatusValue" },
      { label: "หัวข้อ badge รูป", path: "about.badgeTitle" },
      { label: "รายละเอียด badge รูป", path: "about.badgeText", rows: 2 },
      { label: "ป้ายขั้นตอน", path: "about.stepsTag" },
      { label: "หัวข้อขั้นตอน", path: "about.stepsTitle" },
      { label: "รายละเอียดขั้นตอน", path: "about.stepsDesc", rows: 3 },
      { label: "ขั้นตอน 1 - หัวข้อ", path: "about.step1Title" },
      { label: "ขั้นตอน 1 - รายละเอียด", path: "about.step1Desc", rows: 2 },
      { label: "ขั้นตอน 2 - หัวข้อ", path: "about.step2Title" },
      { label: "ขั้นตอน 2 - รายละเอียด", path: "about.step2Desc", rows: 2 },
      { label: "ขั้นตอน 3 - หัวข้อ", path: "about.step3Title" },
      { label: "ขั้นตอน 3 - รายละเอียด", path: "about.step3Desc", rows: 2 },
      { label: "ขั้นตอน 4 - หัวข้อ", path: "about.step4Title" },
      { label: "ขั้นตอน 4 - รายละเอียด", path: "about.step4Desc", rows: 2 },
      { label: "หัวข้อวิสัยทัศน์", path: "about.visionTitle" },
      { label: "รายละเอียดวิสัยทัศน์", path: "about.visionText", rows: 4 },
      { label: "หัวข้อพันธกิจ", path: "about.missionTitle" },
      { label: "รายละเอียดพันธกิจ", path: "about.missionText", rows: 4 },
      { label: "ป้ายค่านิยม", path: "about.valuesTag" },
      { label: "หัวข้อค่านิยม", path: "about.valuesTitle" },
      { label: "ค่านิยม 1 - หัวข้อ", path: "about.val1Title" },
      { label: "ค่านิยม 1 - รายละเอียด", path: "about.val1Desc", rows: 2 },
      { label: "ค่านิยม 2 - หัวข้อ", path: "about.val2Title" },
      { label: "ค่านิยม 2 - รายละเอียด", path: "about.val2Desc", rows: 2 },
      { label: "ค่านิยม 3 - หัวข้อ", path: "about.val3Title" },
      { label: "ค่านิยม 3 - รายละเอียด", path: "about.val3Desc", rows: 2 },
      { label: "ค่านิยม 4 - หัวข้อ", path: "about.val4Title" },
      { label: "ค่านิยม 4 - รายละเอียด", path: "about.val4Desc", rows: 2 },
      { label: "CTA - หัวข้อ", path: "about.ctaTitle" },
      { label: "CTA - รายละเอียด", path: "about.ctaDesc", rows: 3 },
      { label: "CTA - ปุ่มหลัก", path: "about.ctaBtnConsult" },
      { label: "CTA - ปุ่มรอง", path: "about.ctaBtnExplore" },
    ],
  },
  {
    title: "หน้าบริการ",
    description: "รายละเอียดบริการ มาตรฐาน Training FAQ และ CTA",
    fields: [
      { label: "บริการ 1 - หัวข้อ", path: "services.service1Title" },
      { label: "บริการ 1 - หัวข้อรอง", path: "services.service1TitleTh" },
      { label: "บริการ 1 - รายละเอียด", path: "services.service1Desc", rows: 3 },
      { label: "บริการ 1 - มาตรฐาน 1", path: "services.service1Std1" },
      { label: "บริการ 1 - มาตรฐาน 2", path: "services.service1Std2" },
      { label: "บริการ 1 - มาตรฐาน 3", path: "services.service1Std3" },
      { label: "บริการ 1 - มาตรฐาน 4", path: "services.service1Std4" },
      { label: "บริการ 1 - คุณค่าที่ได้รับ", path: "services.service1Value", rows: 3 },
      { label: "บริการ 2 - หัวข้อ", path: "services.service2Title" },
      { label: "บริการ 2 - หัวข้อรอง", path: "services.service2TitleTh" },
      { label: "บริการ 2 - รายละเอียด", path: "services.service2Desc", rows: 3 },
      { label: "บริการ 2 - มาตรฐาน 1", path: "services.service2Std1" },
      { label: "บริการ 2 - มาตรฐาน 2", path: "services.service2Std2" },
      { label: "บริการ 2 - มาตรฐาน 3", path: "services.service2Std3" },
      { label: "บริการ 2 - มาตรฐาน 4", path: "services.service2Std4" },
      { label: "บริการ 2 - คุณค่าที่ได้รับ", path: "services.service2Value", rows: 3 },
      { label: "บริการ 3 - หัวข้อ", path: "services.service3Title" },
      { label: "บริการ 3 - หัวข้อรอง", path: "services.service3TitleTh" },
      { label: "บริการ 3 - รายละเอียด", path: "services.service3Desc", rows: 3 },
      { label: "บริการ 3 - มาตรฐาน 1", path: "services.service3Std1" },
      { label: "บริการ 3 - มาตรฐาน 2", path: "services.service3Std2" },
      { label: "บริการ 3 - มาตรฐาน 3", path: "services.service3Std3" },
      { label: "บริการ 3 - มาตรฐาน 4", path: "services.service3Std4" },
      { label: "บริการ 3 - คุณค่าที่ได้รับ", path: "services.service3Value", rows: 3 },
      { label: "หัวข้อมาตรฐาน", path: "services.stdTitle" },
      { label: "หัวข้อคุณค่าที่ได้รับ", path: "services.valTitle" },
      { label: "หัวข้อกล่องความเชื่อมั่น", path: "services.trustTitle" },
      { label: "รายละเอียดกล่องความเชื่อมั่น", path: "services.trustText", rows: 3 },
      { label: "ป้าย Training", path: "services.trainTag" },
      { label: "หัวข้อ Training", path: "services.trainTitle" },
      { label: "รายละเอียด Training", path: "services.trainDesc", rows: 3 },
      { label: "Training 1 - หัวข้อ", path: "services.train1Title" },
      { label: "Training 1 - หัวข้อรอง", path: "services.train1Sub" },
      { label: "Training 1 - รายละเอียด", path: "services.train1Desc", rows: 3 },
      { label: "Training 2 - หัวข้อ", path: "services.train2Title" },
      { label: "Training 2 - หัวข้อรอง", path: "services.train2Sub" },
      { label: "Training 2 - รายละเอียด", path: "services.train2Desc", rows: 3 },
      { label: "Training 3 - หัวข้อ", path: "services.train3Title" },
      { label: "Training 3 - หัวข้อรอง", path: "services.train3Sub" },
      { label: "Training 3 - รายละเอียด", path: "services.train3Desc", rows: 3 },
      { label: "ป้ายสิ่งที่ลูกค้าได้รับ", path: "services.deliverTag" },
      { label: "หัวข้อสิ่งที่ลูกค้าได้รับ", path: "services.deliverTitle" },
      { label: "รายละเอียดสิ่งที่ลูกค้าได้รับ", path: "services.deliverDesc", rows: 3 },
      { label: "สิ่งที่ลูกค้าได้รับ กลุ่ม 1 - หัวข้อ", path: "services.delCol1Title" },
      { label: "สิ่งที่ลูกค้าได้รับ กลุ่ม 1 - ข้อ 1", path: "services.delCol1Item1" },
      { label: "สิ่งที่ลูกค้าได้รับ กลุ่ม 1 - ข้อ 2", path: "services.delCol1Item2" },
      { label: "สิ่งที่ลูกค้าได้รับ กลุ่ม 1 - ข้อ 3", path: "services.delCol1Item3" },
      { label: "สิ่งที่ลูกค้าได้รับ กลุ่ม 1 - ข้อ 4", path: "services.delCol1Item4" },
      { label: "สิ่งที่ลูกค้าได้รับ กลุ่ม 2 - หัวข้อ", path: "services.delCol2Title" },
      { label: "สิ่งที่ลูกค้าได้รับ กลุ่ม 2 - ข้อ 1", path: "services.delCol2Item1" },
      { label: "สิ่งที่ลูกค้าได้รับ กลุ่ม 2 - ข้อ 2", path: "services.delCol2Item2" },
      { label: "สิ่งที่ลูกค้าได้รับ กลุ่ม 2 - ข้อ 3", path: "services.delCol2Item3" },
      { label: "สิ่งที่ลูกค้าได้รับ กลุ่ม 2 - ข้อ 4", path: "services.delCol2Item4" },
      { label: "FAQ - ป้าย", path: "services.faqTag" },
      { label: "FAQ - หัวข้อ", path: "services.faqTitle" },
      { label: "FAQ 1 - คำถาม", path: "services.faq1Q" },
      { label: "FAQ 1 - คำตอบ", path: "services.faq1A", rows: 3 },
      { label: "FAQ 2 - คำถาม", path: "services.faq2Q" },
      { label: "FAQ 2 - คำตอบ", path: "services.faq2A", rows: 3 },
      { label: "FAQ 3 - คำถาม", path: "services.faq3Q" },
      { label: "FAQ 3 - คำตอบ", path: "services.faq3A", rows: 3 },
      { label: "CTA - หัวข้อ", path: "services.ctaTitle2" },
      { label: "CTA - รายละเอียด", path: "services.ctaDesc2", rows: 3 },
      { label: "CTA - ปุ่มหลัก", path: "services.ctaBtnFree" },
      { label: "CTA - ปุ่มโทร", path: "services.ctaBtnCall" },
    ],
  },
  {
    title: "หน้าการเสนอราคา",
    description: "แนวคิดราคา โครงสร้างต้นทุน และ CTA",
    fields: [
      { label: "ป้ายแนวคิด", path: "pricing.conceptTag" },
      { label: "หัวข้อแนวคิด", path: "pricing.conceptTitle" },
      { label: "ย่อหน้า 1", path: "pricing.conceptParagraph1", rows: 3 },
      { label: "ย่อหน้า 2", path: "pricing.conceptParagraph2", rows: 3 },
      { label: "ย่อหน้า 3", path: "pricing.conceptParagraph3", rows: 3 },
      { label: "หมายเหตุ", path: "pricing.conceptNote", rows: 2 },
      { label: "หัวข้อ badge รูป", path: "pricing.imgBadgeTitle" },
      { label: "รายละเอียด badge รูป", path: "pricing.imgBadgeDesc", rows: 2 },
      { label: "ป้ายโครงสร้างราคา", path: "pricing.structureTag" },
      { label: "หัวข้อโครงสร้างราคา", path: "pricing.structureTitle" },
      { label: "รายละเอียดโครงสร้างราคา", path: "pricing.structureDesc", rows: 3 },
      { label: "ต้นทุน 1 - หัวข้อ", path: "pricing.c1Title" },
      { label: "ต้นทุน 1 - รายละเอียด", path: "pricing.c1Desc", rows: 3 },
      { label: "ต้นทุน 2 - หัวข้อ", path: "pricing.c2Title" },
      { label: "ต้นทุน 2 - รายละเอียด", path: "pricing.c2Desc", rows: 3 },
      { label: "ต้นทุน 3 - หัวข้อ", path: "pricing.c3Title" },
      { label: "ต้นทุน 3 - รายละเอียด", path: "pricing.c3Desc", rows: 3 },
      { label: "CTA - หัวข้อ", path: "pricing.ctaTitle3" },
      { label: "CTA - รายละเอียด", path: "pricing.ctaDesc3", rows: 3 },
      { label: "CTA - ปุ่มขอราคา", path: "pricing.ctaBtnQuote" },
      { label: "CTA - ปุ่มดูบริการ", path: "pricing.ctaBtnStd" },
    ],
  },
  {
    title: "หน้าติดต่อเรา",
    description: "ข้อความในกล่องข้อมูลติดต่อ แบบฟอร์ม และแผนที่",
    fields: [
      { label: "ป้ายข้อมูลติดต่อ", path: "contact.infoTag" },
      { label: "หัวข้อข้อมูลติดต่อ", path: "contact.infoTitle" },
      { label: "หัวข้อสำนักงานใหญ่", path: "contact.hqLabel" },
      { label: "ที่อยู่สำนักงานใหญ่", path: "contact.hqAddress", rows: 3 },
      { label: "หัวข้อเบอร์โทร", path: "contact.phoneLabel" },
      { label: "หัวข้ออีเมล", path: "contact.emailLabel" },
      { label: "หัวข้อเวลาทำการ", path: "contact.hoursLabel" },
      { label: "หัวข้อแบบฟอร์ม", path: "contact.formTitle" },
      { label: "คำอธิบายแบบฟอร์ม", path: "contact.formDesc", rows: 2 },
      { label: "ข้อความสำเร็จ - หัวข้อ", path: "contact.formSuccessTitle" },
      { label: "ข้อความสำเร็จ - รายละเอียด", path: "contact.formSuccessDesc", rows: 3 },
      { label: "ข้อความสำเร็จ - ปุ่ม", path: "contact.formSuccessBtn" },
      { label: "ข้อความ error", path: "contact.formErrorVal" },
      { label: "Label ชื่อผู้ติดต่อ", path: "contact.lblName" },
      { label: "Label บริษัท", path: "contact.lblCompany" },
      { label: "Label อีเมล", path: "contact.lblEmail" },
      { label: "Label เบอร์โทร", path: "contact.lblPhone" },
      { label: "Label ประเภทสถานที่", path: "contact.lblSiteType" },
      { label: "Label หัวข้อที่ติดต่อ", path: "contact.lblSubject" },
      { label: "Label รายละเอียด", path: "contact.lblMessage" },
      { label: "Placeholder ชื่อ", path: "contact.phName" },
      { label: "Placeholder บริษัท", path: "contact.phCompany" },
      { label: "Placeholder อีเมล", path: "contact.phEmail" },
      { label: "Placeholder เบอร์โทร", path: "contact.phPhone" },
      { label: "Placeholder รายละเอียด", path: "contact.phMessage", rows: 2 },
      { label: "Option โรงงาน", path: "contact.optFactory" },
      { label: "Option คลังสินค้า", path: "contact.optWarehouse" },
      { label: "Option สำนักงาน", path: "contact.optOffice" },
      { label: "Option โรงพยาบาล", path: "contact.optHospital" },
      { label: "Option สถานศึกษา", path: "contact.optEducation" },
      { label: "Option อื่น ๆ", path: "contact.optOther" },
      { label: "Option ขอใบเสนอราคา", path: "contact.optProposal" },
      { label: "Option สำรวจพื้นที่", path: "contact.optSurvey" },
      { label: "Option ติดต่อทั่วไป", path: "contact.optGeneral" },
      { label: "ปุ่มส่งฟอร์ม", path: "contact.btnSubmit" },
      { label: "ปุ่มระหว่างส่งฟอร์ม", path: "contact.btnSubmitting" },
      { label: "หัวข้อแผนที่", path: "contact.mapTitle" },
      { label: "ชื่อสถานที่บนแผนที่", path: "contact.mapCardTitle" },
      { label: "ปุ่มเปิด Google Maps", path: "contact.mapBtnOpen" },
      { label: "หัวข้อการเดินทาง", path: "contact.mapBtsLabel" },
      { label: "คำอธิบายการเดินทาง", path: "contact.mapBtsText", rows: 3 },
    ],
  },
]

const IMAGE_FIELDS: ImageFieldConfig[] = [
  {
    key: "homeHeroImage",
    label: "รูป Banner หน้าแรก",
    description: "รูปใหญ่ด้านบนสุดของหน้าแรก",
  },
  {
    key: "homeWhyImage",
    label: "รูป section ทำไมต้องเลือกเรา",
    description: "รูปประกอบข้างข้อความจุดเด่น",
  },
  {
    key: "homeGalleryImage1",
    label: "รูปภาพการปฏิบัติงาน 1",
    description: "รูปแรกใน section ภาพการปฏิบัติงาน",
  },
  {
    key: "homeGalleryImage2",
    label: "รูปภาพการปฏิบัติงาน 2",
    description: "รูปที่สองใน section ภาพการปฏิบัติงาน",
  },
  {
    key: "aboutOverviewImage",
    label: "รูปหน้าเกี่ยวกับเรา",
    description: "รูปประกอบภาพรวมบริษัท",
  },
  {
    key: "servicesGuardImage",
    label: "รูปบริการ รปภ.",
    description: "รูปประกอบบริการเจ้าหน้าที่รักษาความปลอดภัย",
  },
  {
    key: "servicesPatrolImage",
    label: "รูปบริการสายตรวจ",
    description: "รูปประกอบบริการตรวจการณ์และสายตรวจ",
  },
  {
    key: "servicesConsultingImage",
    label: "รูปบริการประเมินหน้างาน",
    description: "รูปประกอบบริการประเมินความเสี่ยงและวิเคราะห์หน้างาน",
  },
  {
    key: "pricingConceptImage",
    label: "รูปหน้าการเสนอราคา",
    description: "รูปประกอบแนวคิดการคิดราคา",
  },
]

function cloneTranslations(source: TranslationsDict): TranslationsDict {
  return JSON.parse(JSON.stringify(source)) as TranslationsDict
}

function getTranslationValue(source: TranslationsDict, path: string, language: "th" | "en") {
  let current: unknown = source
  for (const key of path.split(".")) {
    if (typeof current !== "object" || current === null || !(key in current)) return ""
    current = (current as Record<string, unknown>)[key]
  }
  if (typeof current !== "object" || current === null) return ""
  const value = (current as Record<string, unknown>)[language]
  return typeof value === "string" ? value : ""
}

function setTranslationValue(
  source: TranslationsDict,
  path: string,
  language: "th" | "en",
  value: string
) {
  const next = cloneTranslations(source)
  let current: Record<string, unknown> = next as unknown as Record<string, unknown>
  const keys = path.split(".")

  for (const key of keys.slice(0, -1)) {
    const existing = current[key]
    if (typeof existing !== "object" || existing === null) {
      current[key] = {}
    }
    current = current[key] as Record<string, unknown>
  }

  const leafKey = keys[keys.length - 1]
  const leaf = current[leafKey]
  if (typeof leaf !== "object" || leaf === null) {
    current[leafKey] = { th: "", en: "" }
  }
  ;(current[leafKey] as Record<string, unknown>)[language] = value
  return next
}

async function resizeImage(file: File) {
  const imageBitmap = await createImageBitmap(file)
  const maxWidth = 1800
  const maxHeight = 1200
  const ratio = Math.min(1, maxWidth / imageBitmap.width, maxHeight / imageBitmap.height)
  const width = Math.max(1, Math.round(imageBitmap.width * ratio))
  const height = Math.max(1, Math.round(imageBitmap.height * ratio))
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")

  if (!context) throw new Error("ไม่สามารถย่อรูปได้")

  canvas.width = width
  canvas.height = height
  context.drawImage(imageBitmap, 0, 0, width, height)

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/webp", 0.84)
  })

  if (!blob) throw new Error("ไม่สามารถแปลงรูปได้")

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error("ไม่สามารถอ่านรูปได้"))
    reader.readAsDataURL(blob)
  })
}

export function SiteAdminShell() {
  const router = useRouter()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSaving, setIsSaving] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState<keyof SiteAssets | "">("")
  const [viewMode, setViewMode] = React.useState<"edit" | "preview">("edit")
  const [translations, setTranslations] = React.useState<TranslationsDict>(() =>
    cloneTranslations(defaultTranslations)
  )
  const [assets, setAssets] = React.useState<SiteAssets>(DEFAULT_SITE_ASSETS)
  const [message, setMessage] = React.useState("")
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    const previousBodyBackground = document.body.style.backgroundColor
    const previousHtmlBackground = document.documentElement.style.backgroundColor

    document.body.style.backgroundColor = "#f8fafc"
    document.documentElement.style.backgroundColor = "#f8fafc"

    return () => {
      document.body.style.backgroundColor = previousBodyBackground
      document.documentElement.style.backgroundColor = previousHtmlBackground
    }
  }, [])

  React.useEffect(() => {
    let isMounted = true

    fetch("/api/site-content", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("โหลดข้อมูลหน้าเว็บไม่สำเร็จ")
        return response.json() as Promise<{ draft: SiteContentDraft }>
      })
      .then(({ draft }) => {
        if (!isMounted) return
        setTranslations(draft.translations)
        setAssets(draft.assets)
      })
      .catch((caughtError: unknown) => {
        if (!isMounted) return
        setError(caughtError instanceof Error ? caughtError.message : "โหลดข้อมูลหน้าเว็บไม่สำเร็จ")
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.replace("/login")
    router.refresh()
  }

  const updateTranslation = (path: string, language: "th" | "en", value: string) => {
    setTranslations((previous) => setTranslationValue(previous, path, language, value))
  }

  const saveSiteContent = async (publish: boolean) => {
    setIsSaving(true)
    setMessage("")
    setError("")

    try {
      const response = await fetch("/api/site-content", {
        method: publish ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ translations, assets }),
      })
      const result = (await response.json()) as SiteContentDraft | { error?: string }

      if (!response.ok) {
        throw new Error("error" in result && result.error ? result.error : "บันทึกไม่สำเร็จ")
      }

      setMessage(publish ? "เผยแพร่หน้าเว็บแล้ว" : "บันทึกแบบร่างแล้ว")
      setViewMode("edit")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "บันทึกไม่สำเร็จ")
    } finally {
      setIsSaving(false)
    }
  }

  const uploadImage = async (key: keyof SiteAssets, file: File | undefined) => {
    if (!file) return
    setIsUploading(key)
    setMessage("")
    setError("")

    try {
      if (!file.type.startsWith("image/")) throw new Error("กรุณาเลือกไฟล์รูปภาพ")
      const resizedImage = await resizeImage(file)
      const response = await fetch("/api/uploads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: resizedImage, scope: "site" }),
      })
      const result = (await response.json()) as { url?: string; error?: string }

      if (!response.ok || !result.url) throw new Error(result.error || "อัปโหลดรูปไม่สำเร็จ")
      setAssets((previous) => ({ ...previous, [key]: result.url }))
      setMessage("อัปโหลดรูปแล้ว อย่าลืมบันทึกแบบร่างหรือเผยแพร่")
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "อัปโหลดรูปไม่สำเร็จ")
    } finally {
      setIsUploading("")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative size-10 shrink-0 rounded-full border border-slate-200 bg-white p-0.5 shadow-sm">
              <Image
                src="/images/dutyxpert-logo.png"
                alt="ดิวตี้ เอคซ์เพิร์ท"
                width={40}
                height={40}
                className="rounded-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold leading-tight text-slate-950">
                ดิวตี้ เอคซ์เพิร์ท
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">
                Site CMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank">
              <Button
                variant="outline"
                className="h-10 border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                <ExternalLink className="mr-1.5 size-3.5" />
                ดูหน้าเว็บ
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="h-10 px-3 text-xs font-bold"
            >
              <LogOut className="mr-1.5 size-3.5" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[auto_1fr]">
        <aside
          className={`border-b border-slate-200 bg-white lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:border-b-0 lg:border-r ${
            isSidebarCollapsed ? "lg:w-[68px]" : "lg:w-[220px]"
          }`}
        >
          <div className="flex h-full flex-col gap-3 p-2">
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed((value) => !value)}
              className="hidden h-10 w-full items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:flex"
              aria-label={isSidebarCollapsed ? "ขยายเมนู" : "ย่อเมนู"}
            >
              {isSidebarCollapsed ? (
                <span className="text-lg leading-none">›</span>
              ) : (
                <span className="text-lg leading-none">‹</span>
              )}
            </button>

            <AdminNavLink
              href="/admin"
              icon={<Newspaper className="size-4" />}
              title="บทความและข่าวสาร"
              description="อัปเดตข่าว/บทความ"
              collapsed={isSidebarCollapsed}
            />
            <AdminNavLink
              href="/admin/site"
              icon={<FilePenLine className="size-4" />}
              title="หน้าเว็บ"
              description="แก้ข้อความ/รูปภาพ"
              active
              collapsed={isSidebarCollapsed}
            />
          </div>
        </aside>

        <main className="w-full overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
            <div className="border-b border-slate-200 pb-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold text-amber-800">
                    Duty Xpert Site CMS
                  </p>
                  <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">
                    จัดการหน้าเว็บ
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    แก้ข้อความและรูปภาพหลักของหน้าเว็บ บันทึกแบบร่าง ตรวจตัวอย่าง แล้วค่อยเผยแพร่
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    onClick={() => setViewMode("edit")}
                    variant={viewMode === "edit" ? "gold" : "outline"}
                    className="h-10 px-4 text-xs font-extrabold"
                  >
                    แก้ไข
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setViewMode("preview")}
                    variant={viewMode === "preview" ? "gold" : "outline"}
                    className="h-10 px-4 text-xs font-extrabold"
                  >
                    ดูตัวอย่าง
                  </Button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="rounded-2xl bg-white p-8 text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
                กำลังโหลดข้อมูล...
              </div>
            ) : viewMode === "preview" ? (
              <SitePreview translations={translations} assets={assets} />
            ) : (
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
                <div className="flex flex-col gap-6">
                  {TEXT_GROUPS.map((group) => (
                    <TextGroupEditor
                      key={group.title}
                      group={group}
                      translations={translations}
                      onChange={updateTranslation}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  {IMAGE_FIELDS.map((field) => (
                    <ImageFieldEditor
                      key={field.key}
                      field={field}
                      imageUrl={assets[field.key]}
                      isUploading={isUploading === field.key}
                      onUpload={(file) => uploadImage(field.key, file)}
                    />
                  ))}
                </div>
              </div>
            )}

            {(message || error) && (
              <div
                className={`flex items-start gap-2 rounded-xl p-4 text-sm font-bold ${
                  error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                }`}
              >
                {error ? (
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                ) : (
                  <CheckCircle className="mt-0.5 size-4 shrink-0" />
                )}
                {error || message}
              </div>
            )}

            <div className="sticky bottom-0 z-20 flex flex-col gap-3 border-t border-slate-200 bg-slate-50/95 py-4 backdrop-blur sm:flex-row">
              <Button
                type="button"
                onClick={() => saveSiteContent(false)}
                disabled={isSaving || Boolean(isUploading)}
                variant="outline"
                className="h-12 bg-white font-extrabold"
              >
                <Save className="mr-2 size-4" />
                {isSaving ? "กำลังบันทึก..." : "บันทึกแบบร่าง"}
              </Button>
              <Button
                type="button"
                onClick={() => setViewMode("preview")}
                disabled={isSaving || Boolean(isUploading)}
                variant="outline"
                className="h-12 bg-white font-extrabold"
              >
                ดูตัวอย่าง
              </Button>
              <Button
                type="button"
                onClick={() => saveSiteContent(true)}
                disabled={isSaving || Boolean(isUploading)}
                variant="gold"
                className="h-12 font-extrabold"
              >
                <Send className="mr-2 size-4" />
                เผยแพร่หน้าเว็บ
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function AdminNavLink({
  href,
  icon,
  title,
  description,
  active = false,
  collapsed,
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
  active?: boolean
  collapsed: boolean
}) {
  return (
    <Link
      href={href}
      className={`${active ? "bg-amber-50 text-amber-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"} ${
        collapsed ? "mx-auto flex size-11 items-center justify-center rounded-xl" : "rounded-xl px-3 py-3"
      }`}
    >
      <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
            active ? "bg-amber-400 text-slate-950" : "bg-slate-100 text-slate-500"
          }`}
        >
          {icon}
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-xs font-extrabold">{title}</p>
            <p className="mt-0.5 text-[10px] leading-relaxed">{description}</p>
          </div>
        )}
      </div>
    </Link>
  )
}

function TextGroupEditor({
  group,
  translations,
  onChange,
}: {
  group: TextGroupConfig
  translations: TranslationsDict
  onChange: (path: string, language: "th" | "en", value: string) => void
}) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-extrabold text-slate-950">{group.title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">{group.description}</p>
      </div>
      <div className="mt-5 flex flex-col gap-5">
        {group.fields.map((field) => (
          <div key={field.path} className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <SiteTextarea
              label={`${field.label} (TH)`}
              value={getTranslationValue(translations, field.path, "th")}
              rows={field.rows}
              onChange={(value) => onChange(field.path, "th", value)}
            />
            <SiteTextarea
              label={`${field.label} (EN)`}
              value={getTranslationValue(translations, field.path, "en")}
              rows={field.rows}
              onChange={(value) => onChange(field.path, "en", value)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function SiteTextarea({
  label,
  value,
  rows = 1,
  onChange,
}: {
  label: string
  value: string
  rows?: number
  onChange: (value: string) => void
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-extrabold text-slate-700">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
      />
    </label>
  )
}

function ImageFieldEditor({
  field,
  imageUrl,
  isUploading,
  onUpload,
}: {
  field: ImageFieldConfig
  imageUrl: string
  isUploading: boolean
  onUpload: (file: File | undefined) => void
}) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
            <ImagePlus className="size-4 text-amber-600" />
            {field.label}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{field.description}</p>
        </div>
        <label className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-3 text-xs font-extrabold text-white transition hover:bg-slate-800">
          {isUploading ? "อัปโหลด..." : "เลือกรูป"}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={isUploading}
            onChange={(event) => {
              void onUpload(event.target.files?.[0])
              event.target.value = ""
            }}
          />
        </label>
      </div>
      {imageUrl && (
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={field.label} className="h-44 w-full object-cover" />
        </div>
      )}
    </section>
  )
}

function SitePreview({
  translations,
  assets,
}: {
  translations: TranslationsDict
  assets: SiteAssets
}) {
  const th = (path: string) => getTranslationValue(translations, path, "th")
  const en = (path: string) => getTranslationValue(translations, path, "en")

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <PreviewLanguage label="ภาษาไทย" getText={th} assets={assets} />
      <PreviewLanguage label="English" getText={en} assets={assets} />
    </div>
  )
}

function PreviewLanguage({
  label,
  getText,
  assets,
}: {
  label: string
  getText: (path: string) => string
  assets: SiteAssets
}) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="border-b border-slate-200 px-5 py-4">
        <p className="text-xs font-extrabold uppercase tracking-wide text-amber-700">{label}</p>
      </div>
      <div className="relative min-h-72 bg-slate-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assets.homeHeroImage} alt={getText("home.heroTitle")} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="relative z-10 p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
            {getText("home.heroTag")}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight">
            {getText("home.heroTitle")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            {getText("home.heroDesc")}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
        {[assets.homeWhyImage, assets.homeGalleryImage1, assets.homeGalleryImage2].map((imageUrl, index) => (
          <div key={`${imageUrl}-${index}`} className="overflow-hidden rounded-xl bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={`preview ${index + 1}`} className="h-40 w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="space-y-4 p-5 pt-0">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
            {getText("home.servicesTag")}
          </p>
          <h3 className="mt-2 text-xl font-extrabold text-slate-950">
            {getText("home.servicesTitle")}
          </h3>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
            {getText("home.galleryTag")}
          </p>
          <h3 className="mt-2 text-xl font-extrabold text-slate-950">
            {getText("home.galleryTitle")}
          </h3>
        </div>
        <div className="rounded-xl bg-slate-950 p-4 text-white">
          <h3 className="text-lg font-extrabold">{getText("home.ctaTitle")}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{getText("home.ctaDesc")}</p>
        </div>
      </div>
    </article>
  )
}
