import Image from "next/image"

type ManagedSiteImageProps = {
  src: string
  alt: string
  className: string
  sizes?: string
  priority?: boolean
}

export function ManagedSiteImage({
  src,
  alt,
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: ManagedSiteImageProps) {
  if (/^https?:\/\//.test(src) || src.startsWith("/uploads/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${className}`} />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  )
}
