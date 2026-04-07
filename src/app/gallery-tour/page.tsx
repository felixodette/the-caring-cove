import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Gallery Tour | The Caring Cove - Luxury Senior Care Karen Nairobi",
  description:
    "An immersive, room-by-room tour of our boutique care home: suites, sensory garden, dining, and lounge.",
  alternates: { canonical: `${SITE_URL}/gallery-tour` },
};

export default function GalleryTourPage() {
  redirect("/gallery");
}

