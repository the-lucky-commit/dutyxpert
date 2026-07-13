import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Newspaper } from "lucide-react"
import {
  buildArticleSeoDescription,
  buildArticleSeoTitle,
  getArticleCanonicalUrl,
  getArticleOgImage,
} from "@/lib/article-seo"
import { readPublishedArticleBySlug } from "@/lib/data-store"
import { type Language } from "@/lib/language"

export const dynamic = "force-dynamic"

type ArticlePageProps = {
  params: Promise<{ slug: string }>
}

const DETAIL_COPY: Record<Language, { back: string; cta: string; notFoundTitle: string }> = {
  th: {
    back: "กลับไปหน้าบทความ",
    cta: "ปรึกษาผู้เชี่ยวชาญด้านความปลอดภัย",
    notFoundTitle: "ไม่พบบทความ | Duty Xpert",
  },
  en: {
    back: "Back to articles",
    cta: "Talk to a security specialist",
    notFoundTitle: "Article not found | Duty Xpert",
  },
}

function formatDate(date: string, language: Language) {
  return new Intl.DateTimeFormat(language === "en" ? "en-US" : "th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

function splitParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function ArticleHeroImage({ src, alt }: { src: string; alt: string }) {
  if (/^https?:\/\//.test(src) || src.startsWith("/uploads/articles/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 1024px"
      className="object-cover"
    />
  )
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await readPublishedArticleBySlug(slug)

  if (!article) {
    return {
      title: "ไม่พบบทความ | Duty Xpert",
      robots: { index: false, follow: false },
    }
  }

  const title = buildArticleSeoTitle(article)
  const description = buildArticleSeoDescription(article)
  const canonicalUrl = getArticleCanonicalUrl(article)
  const ogImage = getArticleOgImage(article)

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      locale: article.language === "en" ? "en_US" : "th_TH",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [{ url: ogImage, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await readPublishedArticleBySlug(slug)
  if (!article) notFound()

  const paragraphs = splitParagraphs(article.content)
  const copy = DETAIL_COPY[article.language]

  return (
    <article className="min-h-screen bg-white text-slate-900">
      <section className="bg-primary text-white py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 pt-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            {copy.back}
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-semibold mb-5">
            <span className="inline-flex items-center gap-2 bg-secondary/80 border border-white/10 px-3.5 py-1.5 rounded-full text-accent uppercase tracking-wider">
              <Newspaper className="size-4" />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4 text-accent" />
              {formatDate(article.publishedAt, article.language)}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {article.title}
          </h1>
          <p className="text-slate-300 mt-5 text-base md:text-lg leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </section>

      {article.coverImageUrl && (
        <div className="max-w-5xl mx-auto px-6 -mt-10 md:-mt-14 relative z-20">
          <div className="relative aspect-[16/8] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-100">
            <ArticleHeroImage src={article.coverImageUrl} alt={article.title} />
          </div>
        </div>
      )}

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-slate max-w-none">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg leading-8 text-slate-700 mb-6 whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-secondary transition-colors"
            >
              {copy.cta}
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
