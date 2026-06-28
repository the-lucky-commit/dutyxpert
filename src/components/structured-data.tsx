import * as React from "react"

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Duty Xpert Security Solutions",
    "image": "https://dutyxpert.com/images/patrol-team.jpg",
    "@id": "https://dutyxpert.com/#organization",
    "url": "https://dutyxpert.com",
    "telephone": "+66-86-368-2323",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "225 ถนนสุขุมวิท 105 แขวงบางนาใต้",
      "addressLocality": "เขตบางนา",
      "addressRegion": "กรุงเทพมหานคร",
      "postalCode": "10260",
      "addressCountry": "TH"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:30",
      "closes": "17:00"
    },
    "sameAs": ["https://www.facebook.com/dutyxpert"]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
