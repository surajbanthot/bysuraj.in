"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type NavBarProps = {
  fontClassName?: string;
  bungeeClassName?: string;
};

const links = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/code", label: "Code", emoji: "💻" },
  // { href: "/motiongraphics", label: "Motion", emoji: "🎬" },

  { href: "/social", label: "Socials", emoji: "✨" },
  { href: "/hireme", label: "Hire me!!", emoji: "🤝" },
];

export default function NavBar({ fontClassName, bungeeClassName }: NavBarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animateHireMe, setAnimateHireMe] = useState(false);
  const [hasVisitedHireMe, setHasVisitedHireMe] = useState(false);

  // Mark as visited when navigating to /hireme
  useEffect(() => {
    if (pathname === "/hireme") {
      setHasVisitedHireMe(true);
    }
  }, [pathname]);

  // Trigger lightning animation every 15s (unless visited)
  useEffect(() => {
    if (hasVisitedHireMe) return;

    const interval = setInterval(() => {
      setAnimateHireMe(true);
      setTimeout(() => setAnimateHireMe(false), 1000);
    }, 15000);
    return () => clearInterval(interval);
  }, [hasVisitedHireMe]);

  // Add class to body when menu is open to hide other fixed elements
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMenuOpen]);

  // Close menu when route changes to avoid "flash" of old page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
                className={`${baseClasses} ${hoverClasses} ${isActive ? activeClasses : ""} ${isHireMe ? "hire-me-btn relative overflow-visible" : ""} ${isHireMe && animateHireMe ? "force-hover border-orange-300 bg-orange-500/80 text-white shadow-[0_0_18px_rgba(251,146,60,0.75),0_8px_18px_rgba(0,0,0,0.35)] dark:bg-orange-500/70 dark:text-white" : ""} ${fontClassName ?? ""}`}
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

      {/* Mobile Navigation - Fixed to top right */}
      <nav className={`fixed top-4 right-4 z-40 sm:hidden ${fontClassName ?? ""}`}>
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 rounded-md border border-zinc-500/20 bg-black/60 px-3 py-2 text-lg text-zinc-100 backdrop-blur-md transition hover:border-orange-300 font-[family-name:var(--font-bungee)]"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="text-xl">☰</span>
          <span>Menu</span>
        </button>
      </nav>

      {/* Mobile Menu - Full Screen Centered Overlay via Portal */}
      {isMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-y-auto py-16 sm:hidden">
            {/* Close button - Top Right */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 rounded-full p-3 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Menu Items - Centered */}
            <div className="flex flex-col items-center gap-3 w-full max-w-[280px] px-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                const isHireMe = link.href === "/hireme";

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group flex items-center justify-center gap-3 w-full rounded-xl border px-4 py-3 transition-all duration-200 ${isActive
                      ? "border-orange-300 bg-orange-500 text-white shadow-[0_0_18px_rgba(251,146,60,0.75),0_8px_18px_rgba(0,0,0,0.35)]"
                      : "border-white/10 bg-white/5 hover:border-orange-300 hover:bg-orange-500 hover:text-white hover:shadow-[0_0_18px_rgba(251,146,60,0.75),0_8px_18px_rgba(0,0,0,0.35)]"
                      } ${isHireMe ? "hire-me-btn" : ""}`}
                  >
                    <span className={`text-xl transition-all ${isActive ? "grayscale-0 text-white" : "grayscale group-hover:grayscale-0 group-hover:text-white"}`}>{link.emoji}</span>
                    <span className={`text-lg font-bold transition-colors ${isActive ? "text-white" : "text-zinc-200 group-hover:text-white"} ${bungeeClassName ?? ""}`}>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
