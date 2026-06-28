import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";

import EditorialNav from "@/components/EditorialNav";
import FooterBar from "@/components/FooterBar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Suraj — Design Engineer & Film Photographer",
  description:
    "A design engineer who shoots medium-format film. Frontend, cinematography, and conversational AI — based in Bengaluru.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='34' fill='none' stroke='%23FF7A29' stroke-width='8'/%3E%3Ccircle cx='50' cy='50' r='9' fill='%23FF7A29'/%3E%3C/svg%3E",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
      >
        <EditorialNav />
        {children}
        <FooterBar />
        <Analytics />
      </body>
    </html>
  );
}
