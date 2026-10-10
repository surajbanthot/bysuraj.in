"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import IstClock from "@/components/IstClock";
import { SITE, navSections } from "@/lib/portfolioData";
import { useStory } from "@/lib/storyStore";

export default function EditorialNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const story = useStory();

  // Anchors work from any page: in-page on home, /#id elsewhere.
  const hrefFor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the home section currently in view.
  useEffect(() => {
    if (!onHome) return;
    const els = navSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  // Inside the live story stage, follow the scene on screen; elsewhere, the section in view.
  // ("top" and "work" are both inside the stage, so the observer can't tell them apart.)
  const inStory = story.live && (story.inStage || active === "" || active === "top" || active === "work");
  const homeCurrent = inStory ? (story.scene === "work" ? "work" : "top") : active;
  const current = onHome ? homeCurrent : pathname.startsWith("/film") ? "film" : pathname.startsWith("/work") ? "work" : "";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || menuOpen ? "border-b border-border bg-paper/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="display-hover inline-flex items-baseline text-2xl leading-none text-ink"
          onClick={() => setMenuOpen(false)}
        >
          <span className="display">{SITE.name}</span>
          <span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6">
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={hrefFor(s.id)}
                  aria-current={current === s.id ? "true" : undefined}
                  className={`label transition-colors hover:!text-ink ${current === s.id ? "!text-accent" : ""}`}
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/film"
                aria-current={current === "film" ? "page" : undefined}
                className={`label transition-colors hover:!text-ink ${current === "film" ? "!text-accent" : ""}`}
              >
                Film
              </Link>
            </li>
          </ul>
          <IstClock className="label tabular-nums" />
        </div>

        <button
          type="button"
          className="label !text-ink md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="h-[calc(100svh-4rem)] bg-paper px-5 pb-8 pt-4 md:hidden">
          <ul className="flex flex-col">
            {navSections.map((s, i) => (
              <li key={s.id} className="border-b border-border">
                <a
                  href={hrefFor(s.id)}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-5xl text-ink">{s.label}</span>
                </a>
              </li>
            ))}
            <li className="border-b border-border">
              <Link href="/film" onClick={() => setMenuOpen(false)} className="flex items-baseline gap-4 py-4">
                <span className="label">{String(navSections.length + 1).padStart(2, "0")}</span>
                <span className="display text-5xl text-ink">Film</span>
              </Link>
            </li>
          </ul>
          <IstClock className="label mt-6 block" />
        </div>
      )}
    </header>
  );
}
