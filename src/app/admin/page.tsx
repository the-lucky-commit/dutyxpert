"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import {
  Save,
  LogOut,
  Globe,
  CheckCircle,
  AlertCircle,
  Building,
  Home,
  Shield,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TranslationsDict } from "@/lib/data-store"

type TabType = "general" | "homepage" | "about" | "services"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export default function AdminDashboard() {
  const router = useRouter()
  const { translations, updateTranslations } = useLanguage()

  const [activeTab, setActiveTab] = React.useState<TabType>("general")
  const [editableDict, setEditableDict] = React.useState<TranslationsDict>(() =>
    structuredClone(translations)
  )
  
  const [isSaving, setIsSaving] = React.useState(false)
  const [saveSuccess, setSaveSuccess] = React.useState(false)
  const [saveError, setSaveError] = React.useState("")

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.replace("/login")
    router.refresh()
  }

  // Handle input changes dynamically nested
  const handleTextChange = (path: string, lang: "th" | "en", val: string) => {
    const paths = path.split(".")
    setEditableDict((previous) => {
      const cloned = structuredClone(previous)
      let current = cloned as unknown as Record<string, unknown>
      for (let i = 0; i < paths.length; i++) {
        const key = paths[i]
        if (i === paths.length - 1) {
          const leaf = isRecord(current[key]) ? { ...current[key] } : {}
          leaf[lang] = val
          current[key] = leaf
        } else {
          const child = isRecord(current[key]) ? { ...current[key] } : {}
          current[key] = child
          current = child
        }
      }
      return cloned
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    setSaveError("")

    try {
      const res = await fetch("/api/translations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editableDict)
      })

      if (res.ok) {
        updateTranslations(editableDict) // Update global context
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        const errorData = await res.json()
        setSaveError(errorData.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล")
      }
    } catch {
      setSaveError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์เพื่อบันทึกข้อมูลได้")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070F1C] text-white flex flex-col">
      {/* 1. Dashboard Navbar */}
      <header className="bg-[#0A1628] border-b border-white/[0.08] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative size-9 bg-white rounded-full p-0.5 shrink-0">
              <Image
                src="/images/dutyxpert-logo.png"
                alt="ดิวตี้ เอคซ์เพิร์ท"
                width={36}
                height={36}
                className="object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-slate-200 uppercase leading-none tracking-wide">
                ดิวตี้ เอคซ์เพิร์ท
              </span>
              <span className="text-[8px] text-accent tracking-[0.2em] font-semibold uppercase mt-0.5 block">
                Dashboard CMS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" target="_blank">
              <Button variant="outline" className="border-white/20 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1">
                ดูหน้าเว็บจริง
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="text-xs font-bold px-3 py-1 flex items-center gap-1.5"
            >
              <LogOut className="size-3.5" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      {/* 2. Main Dashboard Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 flex flex-col gap-2">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-3 mb-2">เมนูการจัดการหน้า</div>
          {[
            { id: "general", label: "ข้อมูลบริษัททั่วไป", icon: Building },
            { id: "homepage", label: "ข้อมูลหน้าแรก", icon: Home },
            { id: "about", label: "ข้อมูลหน้าเกี่ยวกับเรา", icon: Shield },
            { id: "services", label: "ข้อมูลหน้าบริการ", icon: FileText }
          ].map((tab) => {
            const TabIcon = tab.icon
            const isSelected = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-accent text-primary shadow-lg shadow-accent/10"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <TabIcon className="size-4 shrink-0" />
                {tab.label}
              </button>
            )
          })}

          <div className="mt-8 border-t border-white/[0.06] pt-6 flex flex-col gap-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              variant="gold"
              className="w-full py-5 font-extrabold text-xs tracking-wider flex items-center justify-center gap-2"
            >
              <Save className="size-4" />
              {isSaving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
            </Button>

            {saveSuccess && (
              <div className="bg-green-950/60 border border-green-500/30 rounded-lg p-3 flex gap-2 items-center text-[10px] text-green-300 font-semibold animate-fade-in">
                <CheckCircle className="size-3.5 text-green-400 shrink-0" />
                <span>บันทึกข้อมูลลงไฟล์สำเร็จแล้ว!</span>
              </div>
            )}
            
            {saveError && (
              <div className="bg-red-950/60 border border-red-500/30 rounded-lg p-3 flex gap-2 items-center text-[10px] text-red-300 font-semibold">
                <AlertCircle className="size-3.5 text-red-400 shrink-0" />
                <span>{saveError}</span>
              </div>
            )}
          </div>
        </aside>

        {/* Content Form Editor */}
        <main className="lg:col-span-9 bg-[#0A1628] border border-white/[0.08] rounded-xl p-6 md:p-8 flex flex-col gap-8 shadow-md">
          {/* Tab Title */}
          <div className="border-b border-white/[0.06] pb-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                {activeTab === "general" && "ข้อมูลทั่วไปของบริษัท & ที่ตั้งสำนักงาน"}
                {activeTab === "homepage" && "เนื้อหาจัดแสดงในหน้าแรก (Homepage)"}
                {activeTab === "about" && "เนื้อหาจัดแสดงในหน้าเกี่ยวกับเรา (About)"}
                {activeTab === "services" && "เนื้อหาจัดแสดงในหน้าบริการ (Services)"}
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-normal">
                ระบุข้อมูลคำอธิบายจริงได้ทั้งในภาษาไทยและภาษาอังกฤษ
              </p>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-white/5 border border-white/[0.06] px-2.5 py-1 rounded-md">
              <Globe className="size-3 text-accent" />
              <span>โหมดสลับสองภาษา</span>
            </div>
          </div>

          {/* Form Fields container */}
          <div className="flex flex-col gap-8 flex-grow">
            {/* ━━━ TAB 1: GENERAL ━━━ */}
            {activeTab === "general" && (
              <div className="flex flex-col gap-6">
                <GridRow
                  label="ชื่อแบรนด์ / บริษัท"
                  path="navbar.brand"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                />
                <GridRow
                  label="สโลแกนใต้โลโก้"
                  path="navbar.subBrand"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                />
                <GridRow
                  label="ที่อยู่สำนักงานใหญ่"
                  path="footer.address"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                  textarea
                />
                <GridRow
                  label="วันจัดตั้งบริษัท"
                  path="about.regCompanyValue"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                />
                <GridRow
                  label="ทุนจดทะเบียนบริษัท"
                  path="about.regCapitalValue"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                />
                <GridRow
                  label="เบอร์โทรศัพท์ติดต่อ"
                  path="navbar.phone"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                />
              </div>
            )}

            {/* ━━━ TAB 2: HOMEPAGE ━━━ */}
            {activeTab === "homepage" && (
              <div className="flex flex-col gap-6">
                <div className="text-xs font-bold text-accent border-b border-white/[0.04] pb-2">สโลแกนหลัก (Hero Section)</div>
                <GridRow
                  label="สโลแกนหลักขององค์กร"
                  path="home.heroTitle"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                />
                <GridRow
                  label="คำโปรยย่อย Hero"
                  path="home.heroDesc"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                  textarea
                />
                
                <div className="text-xs font-bold text-accent border-b border-white/[0.04] pb-2 mt-4">เสาหลักมาตรฐาน (6 ข้อ)</div>
                <GridRow
                  label="เสาหลักที่ 1 (รายงาน)"
                  path="home.p1Title"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                />
                <GridRow
                  label="เสาหลักที่ 2 (ประเมิน)"
                  path="home.p2Title"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                />
                <GridRow
                  label="เสาหลักที่ 3 (เข้าพบ)"
                  path="home.p3Title"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                />
                <GridRow
                  label="เสาหลักที่ 4 (บริหาร)"
                  path="home.p4Title"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                />
                <GridRow
                  label="เสาหลักที่ 5 (ฝึกอบรม)"
                  path="home.p5Title"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                />
                <GridRow
                  label="เสาหลักที่ 6 (ความซื่อสัตย์)"
                  path="home.p6Title"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                />
              </div>
            )}

            {/* ━━━ TAB 3: ABOUT US ━━━ */}
            {activeTab === "about" && (
              <div className="flex flex-col gap-6">
                <div className="text-xs font-bold text-accent border-b border-white/[0.04] pb-2">ความหมายของจุดแข็งบริษัท</div>
                <GridRow
                  label="ความหมาย เชี่ยวชาญงาน"
                  path="about.expertText"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                  textarea
                  rows={4}
                />
                <GridRow
                  label="ความหมาย ชำนาญคน"
                  path="about.skilledText"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                  textarea
                  rows={4}
                />

                <div className="text-xs font-bold text-accent border-b border-white/[0.04] pb-2 mt-4">วิสัยทัศน์และพันธกิจ</div>
                <GridRow
                  label="ข้อความวิสัยทัศน์ (Vision)"
                  path="about.visionText"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                  textarea
                  rows={3}
                />
                <GridRow
                  label="ข้อความพันธกิจ (Mission)"
                  path="about.missionText"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                  textarea
                  rows={5}
                />
              </div>
            )}

            {/* ━━━ TAB 4: SERVICES ━━━ */}
            {activeTab === "services" && (
              <div className="flex flex-col gap-6">
                <div className="text-xs font-bold text-accent border-b border-white/[0.04] pb-2">ระบบการฝึกอบรม รปภ.</div>
                <GridRow
                  label="ศูนย์ฝึกอบรม (Academy)"
                  path="services.train1Desc"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                  textarea
                  rows={3}
                />
                <GridRow
                  label="การฝึกหน้างาน (On-site)"
                  path="services.train2Desc"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                  textarea
                  rows={3}
                />
                <GridRow
                  label="การฝึกซ้ำรอบ (Retraining)"
                  path="services.train3Desc"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                  textarea
                  rows={3}
                />

                <div className="text-xs font-bold text-accent border-b border-white/[0.04] pb-2 mt-4">คำถามที่พบบ่อย (FAQs)</div>
                <GridRow
                  label="Q1: ความน่าเชื่อถือของบริษัท"
                  path="services.faq1A"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                  textarea
                  rows={3}
                />
                <GridRow
                  label="Q2: การแก้ปัญหาข้อบกพร่อง รปภ."
                  path="services.faq2A"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                  textarea
                  rows={3}
                />
                <GridRow
                  label="Q3: บทปรับกรณีไม่ได้มาตรฐาน"
                  path="services.faq3A"
                  editableDict={editableDict}
                  onChange={handleTextChange}
                  textarea
                  rows={3}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

// Subcomponent: Grid Row editor
function GridRow({
  label,
  path,
  editableDict,
  onChange,
  textarea = false,
  rows = 2
}: {
  label: string
  path: string
  editableDict: TranslationsDict
  onChange: (path: string, lang: "th" | "en", val: string) => void
  textarea?: boolean
  rows?: number
}) {
  // Extract values
  const paths = path.split(".")
  let currentObj: unknown = editableDict
  for (const k of paths) {
    if (isRecord(currentObj)) {
      currentObj = currentObj[k]
    } else {
      currentObj = undefined
      break
    }
  }

  const thValue = isRecord(currentObj) && typeof currentObj.th === "string" ? currentObj.th : ""
  const enValue = isRecord(currentObj) && typeof currentObj.en === "string" ? currentObj.en : ""

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b border-white/[0.03] pb-4">
      <div className="md:col-span-3 text-xs font-bold text-slate-350 pt-2.5">
        {label}
      </div>
      
      <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* TH Input */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">ภาษาไทย (TH)</span>
          {textarea ? (
            <textarea
              value={thValue}
              onChange={(e) => onChange(path, "th", e.target.value)}
              rows={rows}
              className="w-full bg-[#070F1C] border border-white/[0.08] focus:border-accent rounded-lg p-2.5 text-xs text-white focus:outline-none transition-all resize-y"
            />
          ) : (
            <input
              type="text"
              value={thValue}
              onChange={(e) => onChange(path, "th", e.target.value)}
              className="w-full bg-[#070F1C] border border-white/[0.08] focus:border-accent rounded-lg p-2.5 text-xs text-white focus:outline-none transition-all"
            />
          )}
        </div>

        {/* EN Input */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">ภาษาอังกฤษ (EN)</span>
          {textarea ? (
            <textarea
              value={enValue}
              onChange={(e) => onChange(path, "en", e.target.value)}
              rows={rows}
              className="w-full bg-[#070F1C] border border-white/[0.08] focus:border-accent rounded-lg p-2.5 text-xs text-white focus:outline-none transition-all resize-y"
            />
          ) : (
            <input
              type="text"
              value={enValue}
              onChange={(e) => onChange(path, "en", e.target.value)}
              className="w-full bg-[#070F1C] border border-white/[0.08] focus:border-accent rounded-lg p-2.5 text-xs text-white focus:outline-none transition-all"
            />
          )}
        </div>
      </div>
    </div>
  )
}
