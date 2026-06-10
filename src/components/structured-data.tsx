import * as React from "react"

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Duty Xpert Security Solutions",
    "image": "https://dutyxpert.com/images/og-image.jpg",
    "@id": "https://dutyxpert.com/#organization",
    "url": "https://dutyxpert.com",
    "telephone": "+66-2-XXX-XXXX",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 อาคารสิริโภค ชั้น 15 ถนนรัชดาภิเษก แขวงจตุจักร",
      "addressLocality": "เขตจตุจักร",
      "addressRegion": "กรุงเทพมหานคร",
      "postalCode": "10900",
      "addressCountry": "TH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.8228,
      "longitude": 100.5674
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/dutyxpert",
      "https://www.linkedin.com/company/dutyxpert"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
