import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono, VT323, Bungee_Spice, Bungee, Quantico } from "next/font/google";
import NavBarShell from "@/components/NavBarShell";
import LayoutChromeSizer from "@/components/LayoutChromeSizer";
import FooterBar from "@/components/FooterBar";
import ResumeButton from "@/components/ResumeButton";
import F1Car from "@/components/F1Car";
import JohnnyBravo from "@/components/JohnnyBravo";
import WIPSidebar from "@/components/WIPSidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-retro",
  display: "swap",
});

const bungeeSpice = Bungee_Spice({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee-spice",
  display: "swap",
});

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
  display: "swap",
});

const quantico = Quantico({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-quantico",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Suraj's Web",
  description: "My Digital Playground & Portfolio :)",
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='0.9em' font-size='90'%3E%F0%9F%A4%96%3C/text%3E%3C/svg%3E",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable} ${bungeeSpice.variable} ${bungee.variable} ${quantico.variable} ${vt323.className} antialiased text-xl`}
      >
        <LayoutChromeSizer />
        <header
          data-site-header
          className="sticky top-0 z-30 bg-white/80 pt-3 backdrop-blur dark:bg-black/70 relative after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-5 after:h-5 after:bg-gradient-to-b after:from-black/20 after:to-transparent dark:after:from-black/60"
        >
          <NavBarShell fontClassName={vt323.className} bungeeClassName={bungee.className} />
        </header>
        {children}
        <ResumeButton />
        <F1Car />
        <WIPSidebar />
        <FooterBar />
        <Analytics />
      </body>
    </html>
  );
}
