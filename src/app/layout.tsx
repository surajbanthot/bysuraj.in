import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import NavBarShell from "@/components/NavBarShell";
import LayoutChromeSizer from "@/components/LayoutChromeSizer";
import FooterBar from "@/components/FooterBar";
import ResumeButton from "@/components/ResumeButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

  const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-light ${pressStart.className}`}
      >
        <LayoutChromeSizer />
        <header
          data-site-header
          className="sticky top-0 z-30 bg-white/80 pt-3 backdrop-blur dark:bg-black/70 relative after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-5 after:h-5 after:bg-gradient-to-b after:from-black/20 after:to-transparent dark:after:from-black/60"
        >
          <NavBarShell fontClassName={pressStart.className} />
        </header>
        {children}
        <ResumeButton />
        <FooterBar />
      </body>
    </html>
  );
}
