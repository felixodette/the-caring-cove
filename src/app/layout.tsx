import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import Script from "next/script";
import { SITE_URL } from "@/lib/constants";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NursingHome",
  "@id": `${SITE_URL}/#organization`,
  name: "The Caring Cove",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description:
    "Kenya's most exclusive 1:1 memory care boutique. UK clinical standards, boutique living in Karen. Alzheimer's, dementia, palliative care.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karen",
    addressRegion: "Nairobi",
    addressCountry: "KE",
  },
  email: "info@thecaringcove.co.ke",
  telephone: "+254 XXX XXX XXX",
  areaServed: { "@type": "Country", name: "Kenya" },
  priceRange: "$$$",
  sameAs: [],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Caring Cove | Luxury Memory Care Karen Nairobi",
    template: "%s | The Caring Cove",
  },
  description:
    "Kenya's most exclusive 1:1 memory care boutique. UK clinical standards, boutique living in Karen. Alzheimer's, dementia, palliative care.",
  keywords: [
    "memory care Nairobi",
    "dementia care Karen",
    "Alzheimer's care Kenya",
    "palliative care Nairobi",
    "elderly care Karen",
    "1:1 care Kenya",
    "UK standard care Nairobi",
    "boutique nursing home Kenya",
  ],
  authors: [{ name: "The Caring Cove", url: SITE_URL }],
  creator: "The Caring Cove",
  publisher: "The Caring Cove",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: "The Caring Cove",
    title: "The Caring Cove | Luxury Memory Care Karen Nairobi",
    description:
      "Kenya's most exclusive 1:1 memory care boutique. UK clinical standards, boutique living in Karen. Alzheimer's, dementia, palliative care.",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "The Caring Cove - Luxury Memory Care Karen Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Caring Cove | Luxury Memory Care Karen Nairobi",
    description:
      "Kenya's most exclusive 1:1 memory care boutique. UK clinical standards, boutique living in Karen.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          strategy="afterInteractive"
        />
        <Providers>{children}</Providers>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
