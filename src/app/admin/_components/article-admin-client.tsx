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
  PlusCircle,
  Rows3,
  Save,
  Send,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Article } from "@/lib/data-store"
import type { Language } from "@/lib/language"

type ArticleCategory = "ข่าวสาร" | "บทความ"

type LocalizedDraft = {
  id: string
  slug: string
  title: string
  summary: string
  content: string
}

type ArticleDraft = {
  translationGroupId: string
  category: ArticleCategory
  coverImageUrl: string
  publishedAt: string
  published: boolean
  th: LocalizedDraft
  en: LocalizedDraft
}

const CATEGORY_OPTIONS: Array<{ label: ArticleCategory; description: string }> = [
  { label: "ข่าวสาร", description: "ข่าวอัปเดตจากบริษัท" },
  { label: "บทความ", description: "ความรู้หรือคำแนะนำ" },
]

function createEmptyLocalizedDraft(): LocalizedDraft {
  return {
    id: "",
    slug: "",
    title: "",
    summary: "",
    content: "",
  }
}

function createEmptyArticleDraft(): ArticleDraft {
  return {
    translationGroupId: "",
    category: "ข่าวสาร",
    coverImageUrl: "",
    published: false,
    publishedAt: new Date().toISOString().slice(0, 10),
    th: createEmptyLocalizedDraft(),
    en: createEmptyLocalizedDraft(),
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

function makeFallbackSlug(language: Language) {
  return `${language}-article-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Date.now()
    .toString(36)
    .slice(-5)}`
}

function isLocalizedDraftFilled(draft: LocalizedDraft) {
  return Boolean(draft.title.trim() || draft.summary.trim() || draft.content.trim())
}

function isLocalizedDraftComplete(draft: LocalizedDraft) {
  return Boolean(draft.title.trim() && draft.summary.trim() && draft.content.trim())
}

function getCategoryForLanguage(category: ArticleCategory, language: Language) {
  if (language === "th") return category
  return category === "ข่าวสาร" ? "News" : "Article"
}

function splitPreviewParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function getGroupId(article: Article) {
  return article.translationGroupId || article.id
}

function groupArticles(articles: Article[]) {
  const groups = new Map<string, { id: string; th?: Article; en?: Article }>()

  for (const article of articles) {
    const id = getGroupId(article)
    const existing = groups.get(id) ?? { id }
    if (article.language === "en") existing.en = article
    else existing.th = article
    groups.set(id, existing)
  }

  return Array.from(groups.values()).sort((a, b) => {
    const aDate = Date.parse((a.th ?? a.en)?.updatedAt ?? "")
    const bDate = Date.parse((b.th ?? b.en)?.updatedAt ?? "")
    return bDate - aDate
  })
}

function groupToDraft(group: { id: string; th?: Article; en?: Article }): ArticleDraft {
  const mainArticle = group.th ?? group.en
  return {
    translationGroupId: group.id,
    category: (group.th?.category === "บทความ" || group.en?.category === "Article" ? "บทความ" : "ข่าวสาร"),
    coverImageUrl: mainArticle?.coverImageUrl ?? "",
    published: Boolean(group.th?.published || group.en?.published),
    publishedAt: (mainArticle?.publishedAt ?? new Date().toISOString()).slice(0, 10),
    th: {
      id: group.th?.id ?? "",
      slug: group.th?.slug ?? "",
      title: group.th?.title ?? "",
      summary: group.th?.excerpt ?? "",
      content: group.th?.content ?? "",
    },
    en: {
      id: group.en?.id ?? "",
      slug: group.en?.slug ?? "",
      title: group.en?.title ?? "",
      summary: group.en?.excerpt ?? "",
      content: group.en?.content ?? "",
    },
  }
}

function buildArticlePayload({
  draft,
  language,
  published,
}: {
  draft: ArticleDraft
  language: Language
  published: boolean
}) {
  const localized = draft[language]
  const title = localized.title.trim()
  const summary = localized.summary.trim()
  const slug = localized.slug.trim() || makeSlug(title) || makeFallbackSlug(language)

  return {
    id: localized.id,
    translationGroupId: draft.translationGroupId,
    language,
    slug,
    title,
    excerpt: summary,
    content: localized.content.trim(),
    category: getCategoryForLanguage(draft.category, language),
    coverImageUrl: draft.coverImageUrl.trim(),
    metaTitle: title,
    metaDescription: summary,
    published,
    publishedAt: draft.publishedAt,
  }
}

async function resizeImage(file: File) {
  const imageBitmap = await createImageBitmap(file)
  const maxWidth = 1600
  const maxHeight = 1000
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

type AdminMode = "list" | "new" | "edit"

export function ArticleAdminShell({
  mode,
  groupId,
}: {
  mode: AdminMode
  groupId?: string
}) {
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

            <Link
              href="/admin"
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
                    <p className="mt-0.5 text-[10px] leading-relaxed text-amber-800">
                      อัปเดตข่าว/บทความ
                    </p>
                  </div>
                )}
              </div>
            </Link>
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
                    {mode === "list"
                      ? "ดูรายการทั้งหมด เพิ่มข่าวใหม่ หรือเปิดเข้าไปแก้ไขทีละรายการ"
                      : "กรอกภาษาไทยและอังกฤษในหน้าเดียว ตรวจตัวอย่าง แล้วค่อยเผยแพร่"}
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

            <ArticleManager mode={mode} groupId={groupId} />
          </div>
        </main>
      </div>
    </div>
  )
}

function ArticleManager({
  mode,
  groupId,
}: {
  mode: AdminMode
  groupId?: string
}) {
  const router = useRouter()
  const [articles, setArticles] = React.useState<Article[]>([])
  const [draft, setDraft] = React.useState<ArticleDraft>(() => createEmptyArticleDraft())
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSaving, setIsSaving] = React.useState(false)
  const [isUploadingImage, setIsUploadingImage] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<"edit" | "preview">("edit")
  const [message, setMessage] = React.useState("")
  const [error, setError] = React.useState("")

  const articleGroups = React.useMemo(() => groupArticles(articles), [articles])

  const loadArticles = React.useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("/api/articles", { cache: "no-store" })
      if (!response.ok) throw new Error("Unable to load articles")
      setArticles((await response.json()) as Article[])
    } catch {
      setError("โหลดรายการไม่สำเร็จ")
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

  React.useEffect(() => {
    if (mode !== "edit" || !groupId || isLoading) return

    const group = articleGroups.find((item) => item.id === groupId)
    const timeoutId = window.setTimeout(() => {
      if (!group) {
        setError("ไม่พบรายการที่ต้องการแก้ไข")
        return
      }

      setDraft(groupToDraft(group))
      setMessage("")
      setError("")
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [articleGroups, groupId, isLoading, mode])

  const updateDraft = <K extends keyof ArticleDraft>(key: K, value: ArticleDraft[K]) => {
    setDraft((previous) => ({ ...previous, [key]: value }))
  }

  const updateLocalizedDraft = (
    language: Language,
    key: keyof LocalizedDraft,
    value: string
  ) => {
    setDraft((previous) => ({
      ...previous,
      [language]: {
        ...previous[language],
        [key]: value,
        ...(key === "title" && !previous[language].id && !previous[language].slug
          ? { slug: makeSlug(value) }
          : {}),
      },
    }))
  }

  const upsertSavedArticle = (savedArticle: Article) => {
    setArticles((previous) => {
      const exists = previous.some((article) => article.id === savedArticle.id)
      const nextArticles = exists
        ? previous.map((article) => (article.id === savedArticle.id ? savedArticle : article))
        : [savedArticle, ...previous]
      return nextArticles.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    })
  }

  const saveOneArticle = async (language: Language, published: boolean, groupId: string) => {
    const localized = draft[language]
    if (!isLocalizedDraftFilled(localized)) return undefined

    if (!isLocalizedDraftComplete(localized)) {
      throw new Error(language === "th" ? "กรอกภาษาไทยให้ครบก่อนบันทึก" : "กรอกภาษาอังกฤษให้ครบก่อนบันทึก")
    }

    const payload = buildArticlePayload({
      draft: { ...draft, translationGroupId: groupId },
      language,
      published,
    })
    const response = await fetch("/api/articles", {
      method: localized.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const result = (await response.json()) as Article | { error?: string }

    if (!response.ok) {
      throw new Error("error" in result && result.error ? result.error : "บันทึกไม่สำเร็จ")
    }

    return result as Article
  }

  const handleSaveArticle = async (published = draft.published) => {
    setIsSaving(true)
    setMessage("")
    setError("")

    try {
      const hasThai = isLocalizedDraftFilled(draft.th)
      const hasEnglish = isLocalizedDraftFilled(draft.en)

      if (!hasThai && !hasEnglish) {
        setError("กรอกข้อมูลอย่างน้อย 1 ภาษา ก่อนบันทึก")
        return
      }

      if (published && (!isLocalizedDraftComplete(draft.th) || !isLocalizedDraftComplete(draft.en))) {
        setError("ถ้าจะเผยแพร่ กรุณากรอกทั้งภาษาไทยและภาษาอังกฤษให้ครบ")
        return
      }

      const groupId = draft.translationGroupId || crypto.randomUUID()
      const savedThai = await saveOneArticle("th", published, groupId)
      const savedEnglish = await saveOneArticle("en", published, groupId)

      if (savedThai) upsertSavedArticle(savedThai)
      if (savedEnglish) upsertSavedArticle(savedEnglish)

      setDraft((previous) => ({
        ...previous,
        translationGroupId: groupId,
        published,
        th: savedThai
          ? {
              id: savedThai.id,
              slug: savedThai.slug,
              title: savedThai.title,
              summary: savedThai.excerpt,
              content: savedThai.content,
            }
          : previous.th,
        en: savedEnglish
          ? {
              id: savedEnglish.id,
              slug: savedEnglish.slug,
              title: savedEnglish.title,
              summary: savedEnglish.excerpt,
              content: savedEnglish.content,
            }
          : previous.en,
      }))
      setViewMode("edit")
      setMessage(published ? "เผยแพร่เรียบร้อยแล้ว" : "บันทึกแบบร่างแล้ว")
      if (mode === "new") {
        router.replace(`/admin/articles/${groupId}`)
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "บันทึกไม่สำเร็จ")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteArticle = async () => {
    const ids = [draft.th.id, draft.en.id].filter(Boolean)
    if (ids.length === 0) return
    if (!confirm("ต้องการลบบทความชุดนี้ใช่ไหม? การลบไม่สามารถย้อนกลับได้")) return

    setIsSaving(true)
    setMessage("")
    setError("")
    try {
      for (const id of ids) {
        const response = await fetch("/api/articles", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        })
        if (!response.ok) throw new Error("ลบบทความไม่สำเร็จ")
      }
      setArticles((previous) => previous.filter((article) => !ids.includes(article.id)))
      setDraft(createEmptyArticleDraft())
      router.push("/admin")
      setMessage("ลบบทความแล้ว")
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "ลบบทความไม่สำเร็จ")
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (file: File | undefined) => {
    if (!file) return
    setIsUploadingImage(true)
    setMessage("")
    setError("")

    try {
      if (!file.type.startsWith("image/")) {
        throw new Error("กรุณาเลือกไฟล์รูปภาพ")
      }

      const resizedImage = await resizeImage(file)
      const response = await fetch("/api/uploads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: resizedImage }),
      })
      const result = (await response.json()) as { url?: string; error?: string }

      if (!response.ok || !result.url) {
        throw new Error(result.error || "อัปโหลดรูปไม่สำเร็จ")
      }

      updateDraft("coverImageUrl", result.url)
      setMessage("อัปโหลดรูปแล้ว")
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "อัปโหลดรูปไม่สำเร็จ")
    } finally {
      setIsUploadingImage(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {mode === "list" && (
      <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-950">
              <Rows3 className="size-4 text-amber-600" />
              รายการบทความและข่าวสาร
            </h2>
            <p className="mt-1 text-xs text-slate-500">{articleGroups.length} รายการทั้งหมด</p>
          </div>
          <Link href="/admin/articles/new">
            <Button type="button" variant="gold" className="h-11 px-4 text-xs font-extrabold">
              <PlusCircle className="mr-1.5 size-3.5" />
              เพิ่มรายการใหม่
            </Button>
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-2">
          {isLoading ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
              กำลังโหลด...
            </div>
          ) : articleGroups.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm leading-6 text-slate-500 xl:col-span-2">
              ยังไม่มีรายการ กด “เพิ่มรายการใหม่” เพื่อเริ่มเขียน
            </div>
          ) : (
            articleGroups.map((group) => {
              const mainArticle = group.th ?? group.en
              return (
                <Link
                  key={group.id}
                  href={`/admin/articles/${group.id}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50/40 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="line-clamp-2 text-base font-extrabold leading-6 text-slate-950">
                      {group.th?.title || group.en?.title || "ไม่มีหัวข้อ"}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
                        mainArticle?.published
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {mainArticle?.published ? "เผยแพร่" : "ร่าง"}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.th && <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">TH</span>}
                    {group.en && <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-700">EN</span>}
                  </div>
                  <p className="mt-4 text-xs font-bold text-slate-400">คลิกเพื่อแก้ไข</p>
                </Link>
              )
            })
          )}
        </div>
      </section>
      )}

      {mode !== "list" && (
      <section className="bg-slate-50">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-950">
              <FilePenLine className="size-5 text-amber-600" />
              {mode === "edit" ? "แก้ไขรายการ" : "เพิ่มรายการใหม่"}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              กรอกข้อมูลภาษาไทยด้านบน และภาษาอังกฤษด้านล่าง
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin">
              <Button
                type="button"
                variant="outline"
                className="h-10 bg-white px-4 text-xs font-extrabold"
              >
                กลับไปรายการ
              </Button>
            </Link>
            <Button
              type="button"
              onClick={() => setViewMode("edit")}
              variant={viewMode === "edit" ? "gold" : "outline"}
              className="h-10 px-4 text-xs font-extrabold"
            >
              เขียนเนื้อหา
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

        {viewMode === "preview" ? (
          <ArticlePreview draft={draft} />
        ) : (
          <div className="mt-6 flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-extrabold text-slate-700">ประเภท</span>
                <select
                  value={draft.category}
                  onChange={(event) => updateDraft("category", event.target.value as ArticleCategory)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.label} value={option.label}>
                      {option.label} — {option.description}
                    </option>
                  ))}
                </select>
              </label>
              <AdminInput
                label="วันที่เผยแพร่"
                type="date"
                value={draft.publishedAt}
                onChange={(value) => updateDraft("publishedAt", value)}
              />
            </div>

            <ImageUploader
              imageUrl={draft.coverImageUrl}
              isUploading={isUploadingImage}
              onUpload={handleImageUpload}
            />

            <LanguageFields
              title="ภาษาไทย"
              description="ข้อความนี้จะแสดงบนหน้าเว็บภาษาไทย"
              value={draft.th}
              onChange={(key, value) => updateLocalizedDraft("th", key, value)}
            />

            <LanguageFields
              title="English"
              description="This content appears on the English version."
              value={draft.en}
              onChange={(key, value) => updateLocalizedDraft("en", key, value)}
            />
          </div>
        )}

        {(message || error) && (
          <div
            className={`mt-5 flex items-start gap-2 rounded-xl p-4 text-sm font-bold ${
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

        <div className="sticky bottom-0 mt-6 flex flex-col gap-3 border-t border-slate-200 bg-slate-50/95 py-4 backdrop-blur sm:flex-row">
          <Button
            type="button"
            onClick={() => handleSaveArticle(false)}
            disabled={isSaving || isUploadingImage}
            variant="outline"
            className="h-12 bg-white font-extrabold"
          >
            <Save className="mr-2 size-4" />
            {isSaving ? "กำลังบันทึก..." : "บันทึกแบบร่าง"}
          </Button>
          <Button
            type="button"
            onClick={() => setViewMode("preview")}
            disabled={isSaving || isUploadingImage}
            variant="outline"
            className="h-12 bg-white font-extrabold"
          >
            ดูตัวอย่าง
          </Button>
          <Button
            type="button"
            onClick={() => handleSaveArticle(true)}
            disabled={isSaving || isUploadingImage}
            variant="gold"
            className="h-12 font-extrabold"
          >
            <Send className="mr-2 size-4" />
            เผยแพร่
          </Button>
          {(draft.th.id || draft.en.id) && (
            <Button
              type="button"
              onClick={handleDeleteArticle}
              disabled={isSaving || isUploadingImage}
              variant="destructive"
              className="h-12 font-bold sm:ml-auto"
            >
              <Trash2 className="mr-2 size-4" />
              ลบรายการนี้
            </Button>
          )}
        </div>
      </section>
      )}
    </div>
  )
}

function ImageUploader({
  imageUrl,
  isUploading,
  onUpload,
}: {
  imageUrl: string
  isUploading: boolean
  onUpload: (file: File | undefined) => void
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
            <ImagePlus className="size-4 text-amber-600" />
            รูปปก
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            เลือกรูปจากเครื่อง ระบบจะย่อและแปลงเป็น WebP ให้อัตโนมัติ
          </p>
        </div>
        <label className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-4 text-xs font-extrabold text-white transition hover:bg-slate-800">
          {isUploading ? "กำลังอัปโหลด..." : "เลือกรูป"}
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
          <img src={imageUrl} alt="รูปปกบทความ" className="max-h-72 w-full object-cover" />
        </div>
      )}
    </div>
  )
}

function LanguageFields({
  title,
  description,
  value,
  onChange,
}: {
  title: string
  description: string
  value: LocalizedDraft
  onChange: (key: keyof LocalizedDraft, value: string) => void
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 border-b border-slate-200 pb-4">
        <h3 className="text-lg font-extrabold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <div className="flex flex-col gap-5">
        <AdminInput
          label="หัวข้อ"
          value={value.title}
          onChange={(nextValue) => onChange("title", nextValue)}
          placeholder={title === "ภาษาไทย" ? "เช่น 5 วิธีเลือกบริษัทรักษาความปลอดภัย" : "e.g. 5 tips for choosing a security company"}
        />
        <AdminTextarea
          label="สรุปสั้น ๆ"
          value={value.summary}
          onChange={(nextValue) => onChange("summary", nextValue)}
          rows={3}
          placeholder={title === "ภาษาไทย" ? "เขียนสั้น ๆ ว่าเนื้อหานี้เกี่ยวกับอะไร" : "Briefly describe what this article is about."}
        />
        <AdminTextarea
          label="เนื้อหา"
          value={value.content}
          onChange={(nextValue) => onChange("content", nextValue)}
          rows={12}
          placeholder={title === "ภาษาไทย" ? "เขียนเนื้อหา แยกย่อหน้าด้วยการเว้นบรรทัด" : "Write the content. Use blank lines between paragraphs."}
        />
      </div>
    </div>
  )
}

function ArticlePreview({ draft }: { draft: ArticleDraft }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ArticleLanguagePreview
        label="ภาษาไทย"
        category={draft.category}
        imageUrl={draft.coverImageUrl}
        draft={draft.th}
      />
      <ArticleLanguagePreview
        label="English"
        category={getCategoryForLanguage(draft.category, "en")}
        imageUrl={draft.coverImageUrl}
        draft={draft.en}
      />
    </div>
  )
}

function ArticleLanguagePreview({
  label,
  category,
  imageUrl,
  draft,
}: {
  label: string
  category: string
  imageUrl: string
  draft: LocalizedDraft
}) {
  const title = draft.title.trim() || "หัวข้อจะแสดงตรงนี้"
  const summary = draft.summary.trim() || "สรุปสั้น ๆ จะแสดงตรงนี้"
  const paragraphs = splitPreviewParagraphs(draft.content)

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="border-b border-slate-200 px-5 py-4">
        <p className="text-xs font-extrabold uppercase tracking-wide text-amber-700">{label}</p>
      </div>
      {imageUrl && (
        <div className="bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} className="h-52 w-full object-cover" />
        </div>
      )}
      <div className="p-5">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800">
          {category}
        </span>
        <h3 className="mt-4 text-2xl font-extrabold leading-tight text-slate-950">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{summary}</p>
        <div className="mt-6 border-t border-slate-200 pt-5">
          {paragraphs.length === 0 ? (
            <p className="text-sm leading-7 text-slate-500">
              เนื้อหาจะแสดงตรงนี้หลังจากเริ่มเขียน
            </p>
          ) : (
            paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 text-sm leading-7 text-slate-700">
                {paragraph}
              </p>
            ))
          )}
        </div>
      </div>
    </article>
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
