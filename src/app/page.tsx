"use client";

import Link from "next/link";
import PixelatedVideoBackground from "@/components/PixelatedVideoBackground";
import IstClock from "@/components/IstClock";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const whatIDo = [
  {
    emoji: "🎨",
    title: "Design",
    description:
      "Visual systems, UI/UX, and interaction design using Figma and Framer. Crafting interfaces that feel as good as they look.",
    tags: ["Figma", "Framer", "UI/UX"],
  },
  {
    emoji: "💻",
    title: "Code",
    description:
      "React, Next.js, TypeScript, Tailwind. Engineering the frontend from pixel to production — no hand-off required.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    emoji: "🔮",
    title: "Motion",
    description:
      "Three.js, Rive, and Spline. Bringing depth and life to digital experiences through 3D and animation.",
    tags: ["Three.js", "Rive", "Spline"],
  },
];

const stats = [
  { value: "5+", label: "Years designing & building" },
  { value: "20+", label: "Tech stack tools" },
  { value: "✓", label: "Available for freelance" },
];

export default function Home() {
  return (
    <div className="relative flex flex-col">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100svh-var(--app-chrome,0px))] flex-col overflow-hidden">

        <div className="relative z-10 flex flex-1 flex-col">
          {/* IST clock — fades out when hero scrolls away (scroll logic in NavBarShell) */}
          <header className="hidden sm:flex w-full px-4 pt-2 sm:flex-row sm:items-start sm:justify-end sm:px-8 sm:pt-3">
            <IstClock
              id="hero-clock"
              className="text-base text-sky-900 drop-shadow-sm transition-opacity duration-200 dark:text-zinc-200 dark:drop-shadow-md sm:text-xl"
            />
          </header>

          <main className="flex w-full flex-1 flex-col items-center justify-center px-4 pb-4">
            <div className="flex flex-col items-start gap-4 rounded-[3rem] bg-sky-100/50 border border-sky-200/50 px-8 py-6 backdrop-blur-[2px] dark:bg-black/10 dark:border-transparent sm:px-12 sm:py-8">
              <h1 className="font-bold leading-none tracking-tight text-sky-600 drop-shadow-sm dark:drop-shadow-xl">
                <span className="block text-3xl sm:text-5xl -mb-2">hi</span>
                <span className="text-6xl sm:text-8xl">Suraj</span>
                <span className="text-3xl sm:text-5xl ml-2">here</span>
                <span className="text-3xl sm:text-5xl ml-1 inline-block">:)</span>
              </h1>
              <p className="-mt-2 text-2xl text-sky-800 drop-shadow-sm dark:text-sky-200 dark:drop-shadow-lg sm:text-4xl">
                Design engineer (tech.)
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/hireme"
                  className="hire-me-btn relative inline-flex items-center gap-2 overflow-visible border border-sky-400 bg-sky-600/80 px-5 py-2.5 text-base text-white shadow-[0_0_18px_rgba(2,132,199,0.5)] transition hover:bg-sky-600 hover:shadow-[0_0_28px_rgba(2,132,199,0.75)] sm:text-lg"
                >
                  Hire me ⚡
                </Link>
                <Link
                  href="/code"
                  className="inline-flex items-center gap-2 border border-sky-300/80 bg-white/60 px-5 py-2.5 text-base text-sky-900 backdrop-blur-sm transition hover:border-sky-400 hover:bg-white/90 dark:border-zinc-300/50 dark:bg-white/10 dark:text-zinc-100 dark:hover:border-sky-400/50 dark:hover:bg-white/15 sm:text-lg"
                >
                  See my work →
                </Link>
              </div>
            </div>
          </main>

          {/* Scroll hint */}
          <div className="relative z-10 flex justify-center pb-6">
            <div className="flex flex-col items-center gap-1 text-sky-800/60 dark:text-zinc-300/60 text-sm select-none">
              <span>scroll</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── What I Do ────────────────────────────────────── */}
      <section className="bg-sky-50 px-4 py-16 dark:bg-sky-950 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-sky-600">
            What I do
          </p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-sky-900 dark:text-sky-50 sm:text-4xl">
            Design meets engineering.
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {whatIDo.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col gap-4 rounded-3xl border border-zinc-200/50 bg-white p-6 shadow-sm transition-all duration-300 hover:border-sky-200 hover:shadow-md dark:border-sky-800 dark:bg-sky-900/50 dark:hover:border-orange-900/50 dark:hover:bg-sky-900/80"
              >
                <span className="text-4xl">{item.emoji}</span>
                <div>
                  <h3 className="text-xl font-medium text-sky-900 dark:text-sky-50">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base text-slate-500 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-orange-600 dark:bg-sky-600/10 dark:text-sky-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────── */}
      <section className="border-t border-zinc-200/50 bg-white px-4 py-16 dark:border-sky-800 dark:bg-black sm:px-8 sm:py-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 sm:flex-row sm:items-center sm:gap-16">
          {/* Text */}
          <div className="flex-1">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-sky-600">
              About
            </p>
            <h2 className="text-3xl font-bold leading-snug tracking-tight text-sky-900 dark:text-sky-50 sm:text-4xl">
              The rare{" "}
              <span className="text-sky-600">design–code</span>{" "}
              overlap.
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-zinc-400 sm:text-xl">
              I sit at the intersection of design and frontend engineering — fluent in both Figma and TypeScript. I care deeply about visual craft and the engineering required to realise it at production quality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/hireme"
                className="inline-flex items-center gap-2 border border-sky-400/70 bg-sky-600/80 px-5 py-2.5 text-base text-white transition hover:bg-sky-600 sm:text-lg"
              >
                Work with me
              </Link>
              <Link
                href="/code"
                className="inline-flex items-center gap-2 border border-zinc-300/70 px-5 py-2.5 text-base text-sky-700 transition hover:border-sky-400/70 hover:text-sky-900 dark:border-sky-700 dark:text-zinc-300 dark:hover:text-sky-50 sm:text-lg"
              >
                Tech stack →
              </Link>
            </div>
          </div>

          {/* Stat pills */}
          <div className="flex flex-row flex-wrap gap-4 sm:flex-col sm:flex-nowrap">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-2xl border border-zinc-200/50 bg-sky-50 px-5 py-4 dark:border-sky-800 dark:bg-sky-900/50"
              >
                <span className="min-w-[3rem] text-3xl font-bold text-sky-600 sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-sm text-slate-500 dark:text-zinc-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="bg-sky-950 px-4 py-16 text-center sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-sky-500">
            Let's build something
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-sky-50 sm:text-5xl">
            Got a project in mind?
          </h2>
          <p className="mt-4 text-lg text-zinc-400 sm:text-xl">
            I'm open to freelance and full-time roles. Reach out and let's talk.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/hireme"
              className="hire-me-btn relative inline-flex items-center gap-2 overflow-visible border border-sky-400 bg-sky-600 px-6 py-3 text-lg text-white shadow-[0_0_24px_rgba(2,132,199,0.4)] transition hover:shadow-[0_0_36px_rgba(2,132,199,0.65)] sm:text-xl"
            >
              Hire me!! ⚡
            </Link>
            <a
              href="mailto:surajcommercial@gmail.com"
              className="inline-flex items-center gap-2 border border-sky-700 px-6 py-3 text-lg text-zinc-300 transition hover:border-sky-600/50 hover:text-sky-500 sm:text-xl"
            >
              Email me
            </a>
          </div>
        </div>
      </section>

      <ScrollToTopButton />
    </div>
  );
}
