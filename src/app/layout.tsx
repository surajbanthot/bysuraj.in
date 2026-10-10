import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import EditorialNav from "@/components/organisms/EditorialNav";
import FooterBar from "@/components/organisms/FooterBar";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import { fontVariables } from "@/lib/fonts";
import { SITE } from "@/lib/portfolioData";

import "./globals.css";

const title = `${SITE.fullName} — ${SITE.role}`;
const description = `${SITE.role} in ${SITE.location}. ${SITE.headline}`;

// Static metadata (no request headers), so every page can be prerendered.
// Relative URLs below resolve against metadataBase.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s — ${SITE.fullName}` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1680,
        height: 945,
        alt: `${SITE.fullName} — ${SITE.role} in ${SITE.location}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={fontVariables}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <SmoothScroll />
        <Cursor />
        <EditorialNav />
        {children}
        <FooterBar />
        <Analytics />
      </body>
    </html>
  );
}
