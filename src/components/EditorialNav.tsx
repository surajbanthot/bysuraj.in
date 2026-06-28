"use client";

import { useEffect, useState } from "react";
import IstClock from "@/components/IstClock";
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
          className="display text-xl text-ink sm:text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          {SITE.name}
          <span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-6">
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`label transition-colors hover:text-accent ${
                    active === s.id ? "text-accent" : ""
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <IstClock className="label !lowercase tracking-normal text-faint" />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="label text-ink md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "Close" : "Index"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-paper px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {navSections.map((s, i) => (
              <li key={s.id} className="border-b border-border/60 last:border-0">
                <a
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-3 py-3"
                >
                  <span className="label text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-2xl text-ink">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <IstClock className="label mt-4 block text-faint" />
        </div>
      )}
    </header>
  );
}
