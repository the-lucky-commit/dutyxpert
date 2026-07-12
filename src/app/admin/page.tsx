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
  Globe2,
  LogOut,
  Newspaper,
  PlusCircle,
  Rows3,
  Save,
  Send,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Article } from "@/lib/data-store"
import { type Language, getLanguageLabel } from "@/lib/language"

type ArticleDraft = Pick<
  Article,
  | "id"
  | "language"
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
    language: "th",
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
    language: article.language,
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

function makeFallbackSlug() {
  return `article-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Date.now()
    .toString(36)
    .slice(-5)}`
}

function getPlainExcerpt(draft: ArticleDraft) {
  return draft.excerpt.trim() || draft.content.trim().replace(/\s+/g, " ").slice(0, 180)
}

function buildArticlePayload(draft: ArticleDraft, published: boolean): ArticleDraft {
  const title = draft.title.trim()
  const excerpt = getPlainExcerpt(draft)
  const slug = draft.slug.trim() || makeSlug(title) || makeFallbackSlug()

  return {
    ...draft,
    slug,
    title,
    excerpt,
    content: draft.content.trim(),
    category: draft.category.trim() || "ข่าวสาร",
    coverImageUrl: draft.coverImageUrl.trim(),
    metaTitle: title,
    metaDescription: excerpt,
    published,
  }
}

function splitPreviewParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
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

            <div
              className={`bg-amber-50 text-amber-900 ${
                isSidebarCollapsed
                  ? "mx-auto flex size-11 items-center justify-center rounded-xl"
                  : "rounded-xl px-3 py-3"
              }`}
            >
              <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"}`}>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-slate-950">
                  <Newspaper className="size-4" />
                </div>
                {!isSidebarCollapsed && (
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold">บทความและข่าวสาร</p>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-amber-800">อัปเดตข่าว/บทความ</p>
                  </div>
                )}
              </div>
            </div>

            {!isSidebarCollapsed && (
              <div className="px-3 py-2 text-xs leading-relaxed text-slate-500">
                <p className="font-bold text-slate-800">สำหรับ Admin</p>
                <p className="mt-1">
                  เขียนข่าว ดูตัวอย่าง บันทึกแบบร่าง และเผยแพร่เมื่อพร้อม
                </p>
              </div>
            )}
          </div>
        </aside>

        <main className="w-full overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
            <div className="border-b border-slate-200 pb-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold text-amber-800">
                    Duty Xpert Articles CMS
                  </p>
                  <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">
                    จัดการบทความและข่าวสาร
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    เขียนเนื้อหา เลือกภาษา ตรวจตัวอย่าง บันทึกแบบร่าง แล้วค่อยเผยแพร่เมื่อเรียบร้อย
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
  const [viewMode, setViewMode] = React.useState<"edit" | "preview">("edit")
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
    setViewMode("edit")
    setMessage("")
    setError("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSaveArticle = async (published = draft.published) => {
    setIsSaving(true)
    setMessage("")
    setError("")

    try {
      const payload = buildArticlePayload(draft, published)
      const method = draft.id ? "PUT" : "POST"
      const response = await fetch("/api/articles", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      setViewMode("edit")
      setMessage(published ? "เผยแพร่บทความสำเร็จแล้ว" : "บันทึกแบบร่างสำเร็จแล้ว")
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
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[300px_1fr]">
      <section className="self-start bg-slate-50">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-950">
              <Rows3 className="size-4 text-amber-600" />
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
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-5 text-sm text-slate-500">
              กำลังโหลดบทความ...
            </div>
          ) : articles.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-5 text-sm leading-6 text-slate-500">
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
                className={`rounded-xl border p-4 text-left transition ${
                  draft.id === article.id
                    ? "border-amber-300 bg-amber-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="line-clamp-2 text-sm font-extrabold leading-5 text-slate-950">
                    {article.title}
                  </span>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold text-blue-700">
                      {article.language.toUpperCase()}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
                        article.published
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {article.published ? "เผยแพร่" : "ร่าง"}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">/{article.slug}</p>
              </button>
            ))
          )}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-950">
              <FilePenLine className="size-5 text-amber-600" />
              {draft.id ? "แก้ไขบทความ" : "เพิ่มบทความใหม่"}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              กรอกหัวข้อ คำโปรย เนื้อหา เลือกภาษา และเปิดเผยแพร่เมื่อพร้อม
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              onClick={() => setViewMode("edit")}
              variant={viewMode === "edit" ? "gold" : "outline"}
              className="h-10 px-4 text-xs font-extrabold"
            >
              เขียนบทความ
            </Button>
            <Button
              type="button"
              onClick={() => setViewMode("preview")}
              variant={viewMode === "preview" ? "gold" : "outline"}
              className="h-10 px-4 text-xs font-extrabold"
            >
              ดูตัวอย่างก่อนเผยแพร่
            </Button>
            {selectedArticle?.published && (
              <Link
                href={`/articles/${selectedArticle.slug}`}
                target="_blank"
                className="inline-flex h-10 items-center text-xs font-extrabold text-amber-700 transition hover:text-amber-900"
              >
                ดูบทความจริง
                <ExternalLink className="ml-1.5 size-3.5" />
              </Link>
            )}
          </div>
        </div>

        {viewMode === "preview" ? (
          <ArticlePreview draft={draft} />
        ) : (
          <div className="mt-6 flex flex-col gap-5">
            <ArticleLanguagePicker
              value={draft.language}
              onChange={(value) => updateDraft("language", value)}
            />

            <AdminInput
              label="หัวข้อบทความ"
              value={draft.title}
              onChange={(value) => {
                updateDraft("title", value)
                if (!draft.id && !draft.slug) updateDraft("slug", makeSlug(value))
              }}
              placeholder="เช่น บริษัทควรเลือก รปภ. อย่างไรให้เหมาะกับหน้างาน"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <AdminInput
                label="หมวดหมู่"
                value={draft.category}
                onChange={(value) => updateDraft("category", value)}
                placeholder="ข่าวสาร / ความรู้ความปลอดภัย"
              />
              <AdminInput
                label="วันที่เผยแพร่"
                type="date"
                value={draft.publishedAt}
                onChange={(value) => updateDraft("publishedAt", value)}
              />
            </div>

            <AdminTextarea
              label="คำโปรย / สรุปบทความ"
              value={draft.excerpt}
              onChange={(value) => updateDraft("excerpt", value)}
              rows={3}
              placeholder="เขียนสรุปสั้น ๆ ให้ลูกค้าเข้าใจว่าบทความนี้เกี่ยวกับอะไร"
            />

            <AdminTextarea
              label="เนื้อหาบทความ"
              value={draft.content}
              onChange={(value) => updateDraft("content", value)}
              rows={16}
              placeholder="เขียนเนื้อหาบทความ แยกย่อหน้าด้วยการเว้นบรรทัด"
            />

            <AdminInput
              label="รูปปก (URL)"
              value={draft.coverImageUrl}
              onChange={(value) => updateDraft("coverImageUrl", value)}
              placeholder="/images/patrol-team.jpg หรือ https://..."
              helpText="ถ้ายังไม่มีรูป สามารถเว้นว่างไว้ก่อนได้"
            />
          </div>
        )}

        {(message || error) && (
          <div
            className={`mt-5 flex items-start gap-2 rounded-xl p-4 text-sm font-bold ${
              error
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {error ? <AlertCircle className="mt-0.5 size-4 shrink-0" /> : <CheckCircle className="mt-0.5 size-4 shrink-0" />}
            {error || message}
          </div>
        )}

        <div className="sticky bottom-0 mt-6 flex flex-col gap-3 border-t border-slate-200 bg-slate-50/95 py-4 backdrop-blur sm:flex-row">
          <Button
            type="button"
            onClick={() => handleSaveArticle(false)}
            disabled={isSaving}
            variant="outline"
            className="h-12 bg-white font-extrabold"
          >
            <Save className="mr-2 size-4" />
            {isSaving ? "กำลังบันทึก..." : "บันทึกแบบร่าง"}
          </Button>
          <Button
            type="button"
            onClick={() => setViewMode("preview")}
            disabled={isSaving}
            variant="outline"
            className="h-12 bg-white font-extrabold"
          >
            ดูตัวอย่าง
          </Button>
          <Button
            type="button"
            onClick={() => handleSaveArticle(true)}
            disabled={isSaving}
            variant="gold"
            className="h-12 font-extrabold"
          >
            <Send className="mr-2 size-4" />
            เผยแพร่บทความ
          </Button>
          {draft.id && (
            <Button
              type="button"
              onClick={handleDeleteArticle}
              disabled={isSaving}
              variant="destructive"
              className="h-12 font-bold sm:ml-auto"
            >
              <Trash2 className="mr-2 size-4" />
              ลบบทความ
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}

function ArticlePreview({ draft }: { draft: ArticleDraft }) {
  const title = draft.title.trim() || "หัวข้อบทความจะแสดงที่นี่"
  const excerpt = getPlainExcerpt(draft) || "คำโปรยบทความจะแสดงตรงนี้ เพื่อให้ตรวจทานก่อนเผยแพร่"
  const category = draft.category.trim() || "ข่าวสาร"
  const paragraphs = splitPreviewParagraphs(draft.content)

  return (
    <div className="mt-6 bg-white">
      <div className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong>Preview:</strong> หน้านี้เป็นตัวอย่างสำหรับตรวจข้อความและรูปแบบก่อนกดเผยแพร่ ยังไม่แสดงบนหน้า public จนกว่าจะกด “เผยแพร่บทความ”
        <span className="ml-2 font-bold">ภาษา: {getLanguageLabel(draft.language)}</span>
      </div>

      <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="bg-slate-950 px-6 py-10 text-white sm:px-8">
          <div className="mb-4 inline-flex rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-slate-950">
            {category}
          </div>
          <h3 className="text-2xl font-extrabold leading-tight sm:text-4xl">{title}</h3>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{excerpt}</p>
        </div>

        {draft.coverImageUrl.trim() && (
          <div className="border-b border-slate-200 bg-slate-100 px-6 py-6 sm:px-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={draft.coverImageUrl.trim()}
              alt={title}
              className="max-h-[360px] w-full rounded-xl object-cover"
            />
          </div>
        )}

        <div className="px-6 py-8 sm:px-8">
          {paragraphs.length === 0 ? (
            <p className="text-sm leading-7 text-slate-500">
              เนื้อหาบทความจะแสดงตรงนี้หลังจากเริ่มเขียนในช่องเนื้อหา
            </p>
          ) : (
            paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-5 text-base leading-8 text-slate-700">
                {paragraph}
              </p>
            ))
          )}
        </div>
      </article>
    </div>
  )
}

function ArticleLanguagePicker({
  value,
  onChange,
}: {
  value: Language
  onChange: (value: Language) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700">
        <Globe2 className="size-4 text-amber-600" />
        ภาษาเนื้อหา
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(["th", "en"] as const).map((language) => {
          const active = value === language
          return (
            <button
              key={language}
              type="button"
              onClick={() => onChange(language)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                active
                  ? "border-amber-300 bg-amber-50 text-slate-950 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <span className="text-sm font-extrabold">{getLanguageLabel(language)}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                {language === "th"
                  ? "แสดงเมื่อผู้ชมเลือกภาษาไทย"
                  : "แสดงเมื่อผู้ชมเลือก English"}
              </span>
            </button>
          )
        })}
      </div>
      <p className="text-xs leading-5 text-slate-500">
        ระบบไม่แปลให้อัตโนมัติ ถ้าต้องการสองภาษา ให้สร้างบทความไทยและอังกฤษแยกกัน
      </p>
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
