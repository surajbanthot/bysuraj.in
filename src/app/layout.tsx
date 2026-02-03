import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-30 bg-white/80 pt-3 backdrop-blur dark:bg-black/70">
          <div className="px-4 pb-2 text-center text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400 sm:px-8">
            checking
          </div>
          <nav
            className={`mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-3 text-[10px] font-normal text-zinc-700 dark:text-zinc-200 sm:px-8 sm:text-sm ${pressStart.className}`}
          >
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <Link
                href="/"
                className="border border-zinc-300/70 px-3 py-1.5 text-zinc-800 transition duration-200 hover:border-orange-300 hover:bg-orange-500/80 hover:text-white hover:shadow-[0_0_18px_rgba(251,146,60,0.75),0_8px_18px_rgba(0,0,0,0.35)] dark:border-zinc-500/70 dark:text-zinc-100 dark:hover:bg-orange-500/70 dark:hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/work"
                className="border border-zinc-300/70 px-3 py-1.5 text-zinc-800 transition duration-200 hover:border-orange-300 hover:bg-orange-500/80 hover:text-white hover:shadow-[0_0_18px_rgba(251,146,60,0.75),0_8px_18px_rgba(0,0,0,0.35)] dark:border-zinc-500/70 dark:text-zinc-100 dark:hover:bg-orange-500/70 dark:hover:text-white"
              >
                Work
              </Link>
              <Link
                href="/playground"
                className="border border-zinc-300/70 px-3 py-1.5 text-zinc-800 transition duration-200 hover:border-orange-300 hover:bg-orange-500/80 hover:text-white hover:shadow-[0_0_18px_rgba(251,146,60,0.75),0_8px_18px_rgba(0,0,0,0.35)] dark:border-zinc-500/70 dark:text-zinc-100 dark:hover:bg-orange-500/70 dark:hover:text-white"
              >
                Playground
              </Link>
              <Link
                href="/about"
                className="border border-zinc-300/70 px-3 py-1.5 text-zinc-800 transition duration-200 hover:border-orange-300 hover:bg-orange-500/80 hover:text-white hover:shadow-[0_0_18px_rgba(251,146,60,0.75),0_8px_18px_rgba(0,0,0,0.35)] dark:border-zinc-500/70 dark:text-zinc-100 dark:hover:bg-orange-500/70 dark:hover:text-white"
              >
                About
              </Link>
              <Link
                href="/timeline"
                className="border border-zinc-300/70 px-3 py-1.5 text-zinc-800 transition duration-200 hover:border-orange-300 hover:bg-orange-500/80 hover:text-white hover:shadow-[0_0_18px_rgba(251,146,60,0.75),0_8px_18px_rgba(0,0,0,0.35)] dark:border-zinc-500/70 dark:text-zinc-100 dark:hover:bg-orange-500/70 dark:hover:text-white"
              >
                Timeline
              </Link>
              <Link
                href="/contact"
                className="border border-zinc-300/70 px-3 py-1.5 text-zinc-800 transition duration-200 hover:border-orange-300 hover:bg-orange-500/80 hover:text-white hover:shadow-[0_0_18px_rgba(251,146,60,0.75),0_8px_18px_rgba(0,0,0,0.35)] dark:border-zinc-500/70 dark:text-zinc-100 dark:hover:bg-orange-500/70 dark:hover:text-white"
              >
                Contact
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
