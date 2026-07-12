import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, ChevronRight, Newspaper } from "lucide-react"
import { readPublishedArticles } from "@/lib/data-store"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "บทความและข่าวสาร | Duty Xpert Security",
  description:
    "บทความ ความรู้ และข่าวสารด้านการรักษาความปลอดภัยจาก บริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "บทความและข่าวสาร | Duty Xpert Security",
    description: "ความรู้ด้านระบบรักษาความปลอดภัย การบริหาร รปภ. และข่าวสารจาก Duty Xpert",
    url: "https://dutyxpert.com/articles",
    type: "website",
  },
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

function ArticleCoverImage({ src, alt }: { src: string; alt: string }) {
  if (/^https?:\/\//.test(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover group-hover:scale-105 transition-transform duration-500"
    />
  )
}

export default async function ArticlesPage() {
  const articles = await readPublishedArticles()

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="bg-primary text-white py-24 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">
          <div className="inline-flex items-center gap-2 bg-secondary/80 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-accent uppercase tracking-wider mb-5">
            <Newspaper className="size-4 text-accent" />
            Articles & News
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            บทความและข่าวสาร
          </h1>
          <div className="w-16 h-1 bg-accent mt-4" />
          <p className="text-slate-350 mt-5 text-base md:text-lg max-w-3xl leading-relaxed font-normal">
            ความรู้ด้านการรักษาความปลอดภัย การบริหารเจ้าหน้าที่ รปภ. และข่าวสารจากดิวตี้ เอคซ์เพิร์ท
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {articles.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
              <h2 className="text-2xl font-extrabold text-slate-900">ยังไม่มีบทความเผยแพร่</h2>
              <p className="text-slate-600 mt-3">
                โปรดกลับมาใหม่อีกครั้งหลังจากทีมงานเผยแพร่บทความแรก
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Link href={`/articles/${article.slug}`} className="block">
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      {article.coverImageUrl ? (
                        <ArticleCoverImage src={article.coverImageUrl} alt={article.title} />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Newspaper className="size-12 text-accent" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-semibold">
                        <span className="bg-primary/5 text-primary px-2.5 py-1 rounded-full">
                          {article.category}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="size-3.5" />
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                      <h2 className="text-xl font-extrabold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:text-accent transition-colors mt-auto">
                        อ่านต่อ
                        <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
