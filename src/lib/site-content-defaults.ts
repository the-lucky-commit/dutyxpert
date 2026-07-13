import type { TranslationsDict } from "@/lib/data-store"

export type SiteAssets = {
  homeHeroImage: string
  homeWhyImage: string
  homeGalleryImage1: string
  homeGalleryImage2: string
  aboutOverviewImage: string
  servicesGuardImage: string
  servicesPatrolImage: string
  servicesConsultingImage: string
  pricingConceptImage: string
}

export type SiteContentDraft = {
  translations: TranslationsDict
  assets: SiteAssets
  updatedAt: string
}

export const DEFAULT_SITE_ASSETS: SiteAssets = {
  homeHeroImage: "/images/patrol-team.jpg",
  homeWhyImage: "/images/security-guard.jpg",
  homeGalleryImage1: "/images/patrol-team.jpg",
  homeGalleryImage2: "/images/training-team.jpg",
  aboutOverviewImage: "/images/about-team.jpg",
  servicesGuardImage: "/images/training-team.jpg",
  servicesPatrolImage: "/images/patrol-team.jpg",
  servicesConsultingImage: "/images/security-guard.jpg",
  pricingConceptImage: "/images/pricing-security.jpg",
}
