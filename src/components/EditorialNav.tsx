"use client";

import { useEffect, useState } from "react";
import IstClock from "@/components/IstClock";
import { ThemeSwitcher } from "@/components/PortfolioInteractions";
import { SITE, navSections } from "@/lib/portfolioData";

export default function EditorialNav() {
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = navSections.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 sm:h-16 sm:px-8">
        {/* Wordmark */}
        <a
          href="#top"
          className="nav-wordmark display inline-flex h-8 items-center text-xl leading-none text-ink sm:text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          {SITE.name}
          <span className="nav-wordmark-dot text-accent">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden h-8 items-center gap-5 lg:flex">
          <ul className="flex h-full items-center gap-4 xl:gap-6">
            {navSections.map((s) => (
              <li key={s.id} className="flex h-full items-center">
                <a
                  href={`#${s.id}`}
                  className={`nav-link label inline-flex h-full items-center leading-none ${
                    active === s.id ? "is-active text-accent" : ""
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeSwitcher />
          <IstClock className="label inline-flex h-8 items-center !lowercase leading-none tracking-normal text-faint" />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="label inline-flex h-8 items-center leading-none text-ink lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "Close" : "Index"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-paper px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {navSections.map((s, i) => (
              <li key={s.id} className="border-b border-border/60 last:border-0">
                <a
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-nav-link flex items-baseline gap-3 py-3"
                >
                  <span className="mobile-nav-number label text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mobile-nav-title display text-2xl text-ink">
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between gap-4">
            <ThemeSwitcher />
            <IstClock className="label inline-flex h-8 items-center leading-none text-faint" />
          </div>
        </div>
      )}
    </header>
  );
}
