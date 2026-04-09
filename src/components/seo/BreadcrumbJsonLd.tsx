"use client";

import Script from "next/script";

type BreadcrumbItem = {
  name: string;
  item: string;
};

export default function BreadcrumbJsonLd({
  id,
  items,
}: {
  id: string;
  items: BreadcrumbItem[];
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item,
    })),
  };

  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      strategy="afterInteractive"
    />
  );
}

