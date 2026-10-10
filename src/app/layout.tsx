import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import EditorialNav from "@/components/EditorialNav";
import FooterBar from "@/components/FooterBar";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { SITE } from "@/lib/portfolioData";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "bysuraj.in";
  const forwardedProto = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProto ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = `${SITE.fullName} — ${SITE.role}`;
  const description = `${SITE.role} in ${SITE.location}. ${SITE.headline}`;

  return {
    metadataBase: new URL(origin),
    title: { default: title, template: `%s — ${SITE.fullName}` },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      type: "website",
      url: origin,
      images: [
        {
          url: `${origin}/og.png`,
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
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
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
