import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "iTechie - Best IT Solution",
  description: "Creating a better IT solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
