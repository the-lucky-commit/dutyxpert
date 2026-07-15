"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import {
  ArrowLeft,
  BookOpen,
  Download,
  ExternalLink,
  FilePenLine,
  LogOut,
  Newspaper,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import manualContent from "@/lib/admin-manual-content.json"

export default function AdminManualPage() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.replace("/login")
    router.refresh()
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
                Admin Manual
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

      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[220px_1fr]">
        <aside className="border-b border-slate-200 bg-white lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col gap-3 p-2">
            <AdminManualNavLink
              href="/admin"
              icon={<Newspaper className="size-4" />}
              title="บทความและข่าวสาร"
              description="อัปเดตข่าว/บทความ"
            />
            <AdminManualNavLink
              href="/admin/site"
              icon={<FilePenLine className="size-4" />}
              title="หน้าเว็บ"
              description="แก้ข้อความ/รูปภาพ"
            />
            <AdminManualNavLink
              href="/admin/manual"
              icon={<BookOpen className="size-4" />}
              title="คู่มือ"
              description="วิธีใช้งานระบบ CMS"
              active
            />
          </div>
        </aside>

        <main className="w-full overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
            <section className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-sm">
              <div className="relative p-6 sm:p-8">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                <div className="relative z-10">
                  <Link
                    href="/admin"
                    className="inline-flex items-center text-xs font-bold text-slate-300 transition hover:text-white"
                  >
                    <ArrowLeft className="mr-1.5 size-3.5" />
                    กลับหน้า Admin
                  </Link>
                  <p className="mt-6 inline-flex rounded-full bg-amber-400 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-950">
                    Duty Xpert CMS
                  </p>
                  <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {manualContent.title}
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                    {manualContent.subtitle}
                  </p>
                  <p className="mt-2 text-xs font-bold text-slate-400">{manualContent.version}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={manualContent.pdfPath} target="_blank">
                      <Button variant="gold" className="h-11 text-xs font-extrabold">
                        <ExternalLink className="mr-1.5 size-3.5" />
                        เปิด PDF
                      </Button>
                    </Link>
                    <a href={manualContent.pdfPath} download>
                      <Button
                        variant="outline"
                        className="h-11 border-white/30 bg-white/10 text-xs font-extrabold text-white hover:bg-white/15 hover:text-white"
                      >
                        <Download className="mr-1.5 size-3.5" />
                        ดาวน์โหลด PDF
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
              <h2 className="text-lg font-extrabold text-slate-950">สรุปภาพรวม</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                {manualContent.summary.map((item) => (
                  <div key={item} className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-950 ring-1 ring-amber-100">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
              <h2 className="text-lg font-extrabold text-slate-950">เริ่มใช้งานเร็ว</h2>
              <ManualList items={manualContent.quickStart} ordered />
            </section>

            <div className="grid grid-cols-1 gap-5">
              {manualContent.sections.map((section) => (
                <section key={section.title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                  <h2 className="text-lg font-extrabold text-slate-950">{section.title}</h2>
                  <ManualList items={section.items} />
                </section>
              ))}
            </div>

            <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
              <h2 className="text-lg font-extrabold text-amber-950">หมายเหตุส่งมอบงาน</h2>
              <ManualList items={manualContent.handoffNotes} />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

function AdminManualNavLink({
  href,
  icon,
  title,
  description,
  active = false,
}: {
  href: string
  icon: ReactNode
  title: string
  description: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`${active ? "bg-amber-50 text-amber-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"} rounded-xl px-3 py-3`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
            active ? "bg-amber-400 text-slate-950" : "bg-slate-100 text-slate-500"
          }`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-extrabold">{title}</p>
          <p className="mt-0.5 text-[10px] leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  )
}

function ManualList({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const ListTag = ordered ? "ol" : "ul"

  return (
    <ListTag className={`mt-4 space-y-2 text-sm leading-7 text-slate-600 ${ordered ? "list-decimal pl-5" : "list-disc pl-5"}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ListTag>
  )
}
