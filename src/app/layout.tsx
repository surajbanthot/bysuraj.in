import type { Metadata } from "next";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";

import EditorialNav from "@/components/EditorialNav";
import FooterBar from "@/components/FooterBar";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "bysuraj.in";
  const forwardedProto = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProto ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Suraj Banthot — Design Engineer & Film Photographer";
  const description =
    "Design engineer building precise interfaces and conversational AI, with a practice in motion and medium-format film. Based in Bengaluru.";

  return {
    metadataBase: new URL(origin),
    title,
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
          alt: "Suraj — Design Engineer and Film Photographer in Bengaluru",
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <EditorialNav />
        {children}
        <FooterBar />
        <Analytics />
      </body>
    </html>
  );
}
