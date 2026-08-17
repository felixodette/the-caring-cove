import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import Script from "next/script";
import { CONTACT_EMAIL, CONTACT_PHONE_TEL, SITE_URL } from "@/lib/constants";

const GOOGLE_MAPS_LOCATION_URL =
  "https://www.google.com/maps/place/The+Caring+Cove/@-1.3132311,36.6938284,17z/data=!3m1!4b1!4m6!3m5!1s0x182f1dfd4e60c0f9:0x963d4e77eebdf65b!8m2!3d-1.3132311!4d36.6964033!16s%2Fg%2F11z2lltw6d?entry=ttu";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NursingHome",
  "@id": `${SITE_URL}/#organization`,
  name: "The Caring Cove",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description:
    "Memory care and senior living in Karen, Nairobi. Private tours and family inquiries welcome.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karen",
    addressRegion: "Nairobi",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.3132311,
    longitude: 36.6964033,
  },
  hasMap: GOOGLE_MAPS_LOCATION_URL,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE_TEL,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: CONTACT_PHONE_TEL,
      contactType: "customer service",
      areaServed: "KE",
      availableLanguage: ["en"],
    },
  ],
  areaServed: { "@type": "Country", name: "Kenya" },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61582063697356",
    "https://x.com/thecaringcove",
    "https://www.instagram.com/thecaringcove/",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Caring Cove | Memory Care in Karen, Nairobi",
    template: "%s | The Caring Cove",
  },
  description:
    "Memory care and senior living in Karen, Nairobi. Learn about our services and book a private tour.",
  keywords: [
    "memory care Nairobi",
    "dementia care Karen",
    "senior living Nairobi",
    "elderly care Karen",
    "palliative care Nairobi",
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
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "The Caring Cove - Memory care in Karen, Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
      <body suppressHydrationWarning>
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
