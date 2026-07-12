"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FilePenLine,
  LayoutList,
  LogOut,
  Newspaper,
  PlusCircle,
  Save,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Article } from "@/lib/data-store"

type ArticleDraft = Pick<
  Article,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "content"
  | "category"
  | "coverImageUrl"
  | "metaTitle"
  | "metaDescription"
  | "published"
  | "publishedAt"
>

function createEmptyArticleDraft(): ArticleDraft {
  return {
    id: "",
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    category: "ข่าวสาร",
    coverImageUrl: "",
    metaTitle: "",
    metaDescription: "",
    published: false,
    publishedAt: new Date().toISOString().slice(0, 10),
  }
}

function articleToDraft(article: Article): ArticleDraft {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    coverImageUrl: article.coverImageUrl,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    published: article.published,
    publishedAt: article.publishedAt.slice(0, 10),
  }
}

function makeSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120)
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)

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
                Articles CMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/articles" target="_blank">
              <Button
                variant="outline"
                className="h-10 border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                <ExternalLink className="mr-1.5 size-3.5" />
                ดูหน้าบทความ
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
            isSidebarCollapsed ? "lg:w-[76px]" : "lg:w-[260px]"
          }`}
        >
          <div className="flex h-full flex-col gap-4 p-3">
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed((value) => !value)}
              className="hidden h-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 lg:flex"
              aria-label={isSidebarCollapsed ? "ขยายเมนู" : "ย่อเมนู"}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="size-4" />
              ) : (
                <ChevronLeft className="size-4" />
              )}
            </button>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-amber-900">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-950">
                  <Newspaper className="size-5" />
                </div>
                {!isSidebarCollapsed && (
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold">บทความและข่าวสาร</p>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-amber-800">
                      จัดการเนื้อหา SEO สำหรับลูกค้า
                    </p>
                  </div>
                )}
              </div>
            </div>

            {!isSidebarCollapsed && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
                <p className="font-bold text-slate-900">โฟกัสของหน้านี้</p>
                <p className="mt-1">
                  เพิ่ม แก้ไข ลบ และเผยแพร่บทความเท่านั้น เพื่อลดความซับซ้อนให้ลูกค้าจัดการเองได้ง่าย
                </p>
              </div>
            )}
          </div>
        </aside>

        <main className="w-full overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold text-amber-800">
                    Duty Xpert Articles CMS
                  </p>
                  <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">
                    จัดการบทความและข่าวสาร
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    หน้า admin ถูกลดให้เหลือเฉพาะงานที่จำเป็นจริง: เขียนบทความ ใส่ข้อมูล SEO และเลือกเผยแพร่ขึ้นหน้าเว็บ
                  </p>
                </div>
                <Link
                  href="/"
                  target="_blank"
                  className="inline-flex items-center text-xs font-bold text-slate-500 transition hover:text-slate-950"
                >
                  ดูหน้าเว็บจริง
                  <ExternalLink className="ml-1.5 size-3.5" />
                </Link>
              </div>
            </div>

            <ArticleManager />
          </div>
        </main>
      </div>
    </div>
  )
}

function ArticleManager() {
  const [articles, setArticles] = React.useState<Article[]>([])
  const [draft, setDraft] = React.useState<ArticleDraft>(() => createEmptyArticleDraft())
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSaving, setIsSaving] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [error, setError] = React.useState("")

  const selectedArticle = articles.find((article) => article.id === draft.id)

  const loadArticles = React.useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("/api/articles", { cache: "no-store" })
      if (!response.ok) throw new Error("Unable to load articles")
      setArticles((await response.json()) as Article[])
    } catch {
      setError("ไม่สามารถโหลดรายการบทความได้")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadArticles()
    }, 0)
    return () => window.clearTimeout(timeoutId)
  }, [loadArticles])

  const updateDraft = <K extends keyof ArticleDraft>(key: K, value: ArticleDraft[K]) => {
    setDraft((previous) => ({ ...previous, [key]: value }))
  }

  const resetForm = () => {
    setDraft(createEmptyArticleDraft())
    setMessage("")
    setError("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSaveArticle = async () => {
    setIsSaving(true)
    setMessage("")
    setError("")

    try {
      const method = draft.id ? "PUT" : "POST"
      const response = await fetch("/api/articles", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      })
      const result = (await response.json()) as Article | { error?: string }
      if (!response.ok) {
        setError("error" in result && result.error ? result.error : "ไม่สามารถบันทึกบทความได้")
        return
      }

      const savedArticle = result as Article
      setArticles((previous) => {
        const exists = previous.some((article) => article.id === savedArticle.id)
        const nextArticles = exists
          ? previous.map((article) => (article.id === savedArticle.id ? savedArticle : article))
          : [savedArticle, ...previous]
        return nextArticles.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
      })
      setDraft(articleToDraft(savedArticle))
      setMessage("บันทึกบทความสำเร็จแล้ว")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์เพื่อบันทึกบทความได้")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteArticle = async () => {
    if (!draft.id || !confirm("ต้องการลบบทความนี้ใช่ไหม? การลบไม่สามารถย้อนกลับได้")) {
      return
    }

    setIsSaving(true)
    setMessage("")
    setError("")
    try {
      const response = await fetch("/api/articles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: draft.id }),
      })
      if (!response.ok) {
        const result = (await response.json()) as { error?: string }
        setError(result.error || "ไม่สามารถลบบทความได้")
        return
      }
      setArticles((previous) => previous.filter((article) => article.id !== draft.id))
      resetForm()
      setMessage("ลบบทความสำเร็จแล้ว")
    } catch {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์เพื่อลบบทความได้")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
      <section className="self-start rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-950">
              <LayoutList className="size-4 text-amber-600" />
              รายการบทความ
            </h2>
            <p className="mt-1 text-xs text-slate-500">{articles.length} รายการทั้งหมด</p>
          </div>
          <Button
            type="button"
            onClick={resetForm}
            variant="gold"
            className="h-10 px-3 text-xs font-extrabold"
          >
            <PlusCircle className="mr-1.5 size-3.5" />
            เพิ่มใหม่
          </Button>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {isLoading ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
              กำลังโหลดบทความ...
            </div>
          ) : articles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-500">
              ยังไม่มีบทความ กด “เพิ่มใหม่” แล้วเริ่มเขียนบทความแรกได้เลย
            </div>
          ) : (
            articles.map((article) => (
              <button
                key={article.id}
                type="button"
                onClick={() => {
                  setDraft(articleToDraft(article))
                  setMessage("")
                  setError("")
                }}
                className={`rounded-2xl border p-4 text-left transition ${
                  draft.id === article.id
                    ? "border-amber-300 bg-amber-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="line-clamp-2 text-sm font-extrabold leading-5 text-slate-950">
                    {article.title}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
                      article.published
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {article.published ? "เผยแพร่" : "ร่าง"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">/{article.slug}</p>
              </button>
            ))
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-950">
              <FilePenLine className="size-5 text-amber-600" />
              {draft.id ? "แก้ไขบทความ" : "เพิ่มบทความใหม่"}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              กรอกหัวข้อ คำโปรย เนื้อหา และเปิดเผยแพร่เมื่อพร้อม ระบบจะใช้ข้อมูลนี้บนหน้าเว็บจริง
            </p>
          </div>
          {selectedArticle?.published && (
            <Link
              href={`/articles/${selectedArticle.slug}`}
              target="_blank"
              className="inline-flex items-center text-xs font-extrabold text-amber-700 transition hover:text-amber-900"
            >
              ดูบทความจริง
              <ExternalLink className="ml-1.5 size-3.5" />
            </Link>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-5">
          <AdminInput
            label="หัวข้อบทความ"
            value={draft.title}
            onChange={(value) => {
              updateDraft("title", value)
              if (!draft.id && !draft.slug) updateDraft("slug", makeSlug(value))
            }}
            placeholder="เช่น 5 วิธีเลือกบริษัทรักษาความปลอดภัย"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AdminInput
              label="Slug URL"
              value={draft.slug}
              onChange={(value) => updateDraft("slug", makeSlug(value))}
              placeholder="security-company-selection"
              helpText="ใช้ภาษาอังกฤษ ตัวเลข และขีดกลาง เพื่อ URL ที่อ่านง่าย"
            />
            <AdminInput
              label="หมวดหมู่"
              value={draft.category}
              onChange={(value) => updateDraft("category", value)}
              placeholder="ข่าวสาร / ความรู้ความปลอดภัย"
            />
          </div>

          <AdminTextarea
            label="คำโปรย / สรุปบทความ"
            value={draft.excerpt}
            onChange={(value) => updateDraft("excerpt", value)}
            rows={3}
            placeholder="สรุปสั้น ๆ สำหรับหน้า list และ meta description"
          />

          <AdminTextarea
            label="เนื้อหาบทความ"
            value={draft.content}
            onChange={(value) => updateDraft("content", value)}
            rows={14}
            placeholder="เขียนเนื้อหาบทความ แยกย่อหน้าด้วยการเว้นบรรทัด"
          />

          <AdminInput
            label="รูปปก (URL)"
            value={draft.coverImageUrl}
            onChange={(value) => updateDraft("coverImageUrl", value)}
            placeholder="/images/patrol-team.jpg หรือ https://..."
            helpText="ถ้ายังไม่มีรูป สามารถเว้นว่างไว้ก่อนได้"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AdminInput
              label="SEO Title"
              value={draft.metaTitle}
              onChange={(value) => updateDraft("metaTitle", value)}
              placeholder="ปล่อยว่างได้ ระบบจะใช้หัวข้อบทความ"
            />
            <AdminInput
              label="วันที่เผยแพร่"
              type="date"
              value={draft.publishedAt}
              onChange={(value) => updateDraft("publishedAt", value)}
            />
          </div>

          <AdminTextarea
            label="SEO Description"
            value={draft.metaDescription}
            onChange={(value) => updateDraft("metaDescription", value)}
            rows={3}
            placeholder="ปล่อยว่างได้ ระบบจะใช้คำโปรย"
          />

          <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(event) => updateDraft("published", event.target.checked)}
              className="mt-0.5 size-4 accent-[#E8C547]"
            />
            <span>
              <span className="block font-extrabold text-slate-950">เผยแพร่บทความบนหน้าเว็บไซต์</span>
              <span className="mt-0.5 block text-xs text-slate-500">
                ถ้ายังไม่ติ๊ก บทความจะถูกเก็บเป็นร่างและไม่แสดงบนหน้า public
              </span>
            </span>
          </label>

          {(message || error) && (
            <div
              className={`flex items-start gap-2 rounded-2xl border p-4 text-sm font-bold ${
                error
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-green-200 bg-green-50 text-green-700"
              }`}
            >
              {error ? <AlertCircle className="mt-0.5 size-4 shrink-0" /> : <CheckCircle className="mt-0.5 size-4 shrink-0" />}
              {error || message}
            </div>
          )}

          <div className="sticky bottom-0 -mx-5 mt-2 flex flex-col gap-3 border-t border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:-mx-6 sm:flex-row sm:px-6">
            <Button
              type="button"
              onClick={handleSaveArticle}
              disabled={isSaving}
              variant="gold"
              className="h-12 font-extrabold"
            >
              <Save className="mr-2 size-4" />
              {isSaving ? "กำลังบันทึก..." : "บันทึกบทความ"}
            </Button>
            {draft.id && (
              <Button
                type="button"
                onClick={handleDeleteArticle}
                disabled={isSaving}
                variant="destructive"
                className="h-12 font-bold"
              >
                <Trash2 className="mr-2 size-4" />
                ลบบทความ
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function AdminInput({
  label,
  value,
  onChange,
  placeholder,
  helpText,
  type = "text",
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  helpText?: string
  type?: string
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-extrabold text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
      />
      {helpText && <span className="text-xs leading-5 text-slate-500">{helpText}</span>}
    </label>
  )
}

function AdminTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-extrabold text-slate-700">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
      />
    </label>
  )
}
