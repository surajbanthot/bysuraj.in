"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavBarProps = {
  fontClassName?: string;
  bungeeClassName?: string;
};

const links = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/code", label: "Code", emoji: "💻" },
  { href: "/motiongraphics", label: "Motion", emoji: "🎬" },

  { href: "/social", label: "Socials", emoji: "✨" },
  { href: "/hireme", label: "Hire me!!", emoji: "🤝" },
];

export default function NavBar({ fontClassName, bungeeClassName }: NavBarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseClasses =
    "inline-flex items-center gap-2 border border-zinc-300/70 px-3 py-1.5 text-zinc-800 transition duration-200 leading-none dark:border-zinc-500/70 dark:text-zinc-100";
  const hoverClasses =
    "hover:border-orange-300 hover:bg-orange-500/80 hover:text-white hover:shadow-[0_0_18px_rgba(251,146,60,0.75),0_8px_18px_rgba(0,0,0,0.35)] dark:hover:bg-orange-500/70 dark:hover:text-white";
  const activeClasses =
    "border-orange-300/70 bg-orange-400/30 text-zinc-900 shadow-[0_0_12px_rgba(251,146,60,0.45),0_6px_12px_rgba(0,0,0,0.2)] dark:bg-orange-500/25 dark:text-zinc-50";

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`hidden items-center justify-center px-4 py-3 text-lg font-normal text-zinc-700 dark:text-zinc-200 sm:flex sm:text-xl ${fontClassName ?? ""}`}
      >
        <div className="flex flex-nowrap items-center justify-center gap-3 whitespace-nowrap sm:gap-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const isHireMe = link.href === "/hireme";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${baseClasses} ${hoverClasses} ${isActive ? activeClasses : ""} ${isHireMe ? "hire-me-btn" : ""} ${fontClassName ?? ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex h-5 w-5 items-center justify-center text-lg sm:text-xl">
                  {link.emoji}
                </span>
                <span className={bungeeClassName ?? ""}>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`flex items-center justify-end px-4 py-2 sm:hidden ${fontClassName ?? ""}`}>
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 rounded border border-zinc-300/70 px-3 py-2 text-lg text-zinc-800 transition hover:border-orange-300 dark:border-zinc-600 dark:text-zinc-100"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="text-xl">☰</span>
          <span>Menu</span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-64 bg-zinc-950 p-4 shadow-2xl border-l border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <span className={`text-xl font-normal text-zinc-100 ${fontClassName ?? ""}`}>
                Navigate
              </span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl text-zinc-400 hover:text-zinc-100"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                const isHireMe = link.href === "/hireme";

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-lg transition ${isActive
                      ? "bg-orange-500/20 text-orange-600 dark:text-orange-400"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                      } ${isHireMe ? "hire-me-btn" : ""} ${fontClassName ?? ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="text-xl">{link.emoji}</span>
                    <span className={bungeeClassName ?? ""}>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
