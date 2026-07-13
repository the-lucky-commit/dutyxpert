"use client"

import * as React from "react"
import {
  DEFAULT_SITE_ASSETS,
  type SiteAssets,
} from "@/lib/site-content-defaults"

export function useSiteAssets() {
  const [siteAssets, setSiteAssets] = React.useState<SiteAssets>(DEFAULT_SITE_ASSETS)

  React.useEffect(() => {
    const controller = new AbortController()

    fetch("/api/public/site-content", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : undefined))
      .then((payload: { assets?: Partial<SiteAssets> } | undefined) => {
        if (!payload?.assets) return
        setSiteAssets({ ...DEFAULT_SITE_ASSETS, ...payload.assets })
      })
      .catch((error: unknown) => {
        if ((error as Error).name !== "AbortError") setSiteAssets(DEFAULT_SITE_ASSETS)
      })

    return () => controller.abort()
  }, [])

  return siteAssets
}
