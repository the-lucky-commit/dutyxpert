import { mkdir, readFile, rename, writeFile } from "fs/promises"
import path from "path"
import {
  readTranslations,
  sanitizeTranslations,
  type TranslationsDict,
  writeTranslations,
} from "@/lib/data-store"
import {
  DEFAULT_SITE_ASSETS,
  type SiteAssets,
  type SiteContentDraft,
} from "@/lib/site-content-defaults"

const DEFAULT_DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "dutyxpert-data")
  : path.join(process.cwd(), "data")

function getDataDir() {
  return process.env.DUTYXPERT_DATA_DIR || DEFAULT_DATA_DIR
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function sanitizeAssetPath(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback
  const trimmed = value.trim()
  if (!trimmed) return fallback
  if (trimmed.length > 500) throw new Error("Site image URL is too long")
  if (
    trimmed.startsWith("/images/") ||
    trimmed.startsWith("/uploads/site/") ||
    trimmed.startsWith("/uploads/articles/")
  ) {
    return trimmed
  }

  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol === "https:" || parsed.protocol === "http:") return trimmed
  } catch {
    // handled below
  }

  throw new Error("Site image URL must be /images/..., /uploads/site/..., or http(s)")
}

export function sanitizeSiteAssets(value: unknown): SiteAssets {
  const source = isRecord(value) ? value : {}
  return {
    homeHeroImage: sanitizeAssetPath(source.homeHeroImage, DEFAULT_SITE_ASSETS.homeHeroImage),
    homeWhyImage: sanitizeAssetPath(source.homeWhyImage, DEFAULT_SITE_ASSETS.homeWhyImage),
    homeGalleryImage1: sanitizeAssetPath(source.homeGalleryImage1, DEFAULT_SITE_ASSETS.homeGalleryImage1),
    homeGalleryImage2: sanitizeAssetPath(source.homeGalleryImage2, DEFAULT_SITE_ASSETS.homeGalleryImage2),
    aboutOverviewImage: sanitizeAssetPath(
      source.aboutOverviewImage,
      DEFAULT_SITE_ASSETS.aboutOverviewImage
    ),
    servicesGuardImage: sanitizeAssetPath(
      source.servicesGuardImage,
      DEFAULT_SITE_ASSETS.servicesGuardImage
    ),
    servicesPatrolImage: sanitizeAssetPath(
      source.servicesPatrolImage,
      DEFAULT_SITE_ASSETS.servicesPatrolImage
    ),
    servicesConsultingImage: sanitizeAssetPath(
      source.servicesConsultingImage,
      DEFAULT_SITE_ASSETS.servicesConsultingImage
    ),
    pricingConceptImage: sanitizeAssetPath(
      source.pricingConceptImage,
      DEFAULT_SITE_ASSETS.pricingConceptImage
    ),
  }
}

async function writeJsonFile(relativePath: string, value: unknown) {
  const dataDir = getDataDir()
  const targetPath = path.join(dataDir, relativePath)
  const temporaryPath = `${targetPath}.${process.pid}.tmp`

  await mkdir(path.dirname(targetPath), { recursive: true })
  await writeFile(temporaryPath, JSON.stringify(value, null, 2), {
    encoding: "utf8",
    mode: 0o600,
  })
  await rename(temporaryPath, targetPath)
}

export async function readSiteAssets(): Promise<SiteAssets> {
  try {
    const file = await readFile(path.join(getDataDir(), "site-assets.json"), "utf8")
    return sanitizeSiteAssets(JSON.parse(file))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error("Unable to read site assets:", error)
    }
    return DEFAULT_SITE_ASSETS
  }
}

export async function writeSiteAssets(assets: SiteAssets) {
  await writeJsonFile("site-assets.json", sanitizeSiteAssets(assets))
}

export async function readSiteDraft(): Promise<SiteContentDraft> {
  try {
    const file = await readFile(path.join(getDataDir(), "site-draft.json"), "utf8")
    const parsed = JSON.parse(file)
    if (!isRecord(parsed)) throw new Error("Invalid site draft")

    return {
      translations: sanitizeTranslations(parsed.translations),
      assets: sanitizeSiteAssets(parsed.assets),
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error("Unable to read site draft:", error)
    }
    return {
      translations: await readTranslations(),
      assets: await readSiteAssets(),
      updatedAt: new Date().toISOString(),
    }
  }
}

export async function writeSiteDraft(input: {
  translations: TranslationsDict
  assets: SiteAssets
}) {
  const draft: SiteContentDraft = {
    translations: sanitizeTranslations(input.translations),
    assets: sanitizeSiteAssets(input.assets),
    updatedAt: new Date().toISOString(),
  }
  await writeJsonFile("site-draft.json", draft)
  return draft
}

export async function publishSiteContent(input: {
  translations: TranslationsDict
  assets: SiteAssets
}) {
  const draft = await writeSiteDraft(input)
  await writeTranslations(draft.translations)
  await writeSiteAssets(draft.assets)
  return draft
}
