"use client";

import { useEffect, useState } from "react";

export default function HireMePage() {
  const [activeTab, setActiveTab] = useState<"fulltime" | "freelance">(() => {
    if (typeof window === "undefined") {
      return "freelance";
    }
    const stored = window.sessionStorage.getItem("hireMeTab");
    // Return stored value if valid, otherwise default to 'freelance' for first-time users
    return stored === "fulltime" || stored === "freelance"
      ? stored
      : "freelance";
  });

  useEffect(() => {
    window.sessionStorage.setItem("hireMeTab", activeTab);
    const btn = document.getElementById("resume-button-container");
    if (btn) {
      btn.style.display = activeTab === "freelance" ? "none" : "flex";
    }
  }, [activeTab]);

  return (
    <main className="min-h-[calc(100vh-56px)] bg-white px-4 pb-28 pt-8 text-zinc-900 dark:bg-black dark:text-zinc-50 sm:px-8 sm:pb-12 sm:pt-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <div
          className="flex justify-center"
          role="tablist"
          aria-label="Hire type"
        >
          <div className="inline-flex w-fit rounded-full border border-zinc-200/70 bg-zinc-50/60 p-1.5 dark:border-zinc-800 dark:bg-black/40">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "fulltime"}
              onClick={() => setActiveTab("fulltime")}
              className={`rounded-full px-5 py-2.5 text-lg font-medium transition sm:px-6 sm:py-3 sm:text-xl font-[family-name:var(--font-bungee)] ${activeTab === "fulltime"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-zinc-50 dark:hover:bg-zinc-900"
                }`}
            >
              Full time
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "freelance"}
              onClick={() => setActiveTab("freelance")}
              className={`rounded-full px-5 py-2.5 text-lg font-medium transition sm:px-6 sm:py-3 sm:text-xl font-[family-name:var(--font-bungee)] ${activeTab === "freelance"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-zinc-50 dark:hover:bg-zinc-900"
                }`}
            >
              Freelance
            </button>
          </div>
        </div>

        <div className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl font-[family-name:var(--font-quantico)]">
          {activeTab === "fulltime" ? (
            <div className="mx-auto w-full max-w-6xl space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* 1. Header Section - Expanded & Larger */}
              <div className="flex flex-col gap-10 rounded-3xl border border-zinc-200 bg-zinc-50/80 p-8 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-12 shadow-sm">

                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-5 py-2 text-base font-bold text-green-800 dark:bg-green-900/40 dark:text-green-300 ring-1 ring-inset ring-green-600/20">
                      <span className="mr-2.5 h-3 w-3 rounded-full bg-green-600 animate-pulse"></span>
                      Open to full-time
                    </span>
                    <span className="text-base font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-2">
                      <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      Bengaluru (Remote/Hybrid)
                    </span>
                  </div>
                </div>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest dark:text-zinc-400">
                      Preferred Roles
                    </h3>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                      Senior Software Engineer <br /> React / Next.js
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest dark:text-zinc-400">
                      Notice Period
                    </h3>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                      Immediate
                    </p>
                  </div>

                  <div className="space-y-3 md:col-span-2 lg:col-span-3">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest dark:text-zinc-400">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {["React", "Next.js", "Node.js", "TypeScript", "Python", "Testing", "Figma", "Framer", "Rive", "After Effects", "Premiere Pro", "Illustrator", "Blender3D"].map(tag => (
                        <span key={tag} className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-base font-semibold text-zinc-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Timeline Tree - Large Text Variant */}
              <div className="relative py-8">
                {/* Central Line */}
                <div className="absolute left-6 md:left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-zinc-200 dark:bg-zinc-800"></div>

                <div className="space-y-16">
                  {/* Tech Mahindra - Right */}
                  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between group">
                    <div className="md:w-1/2 md:pr-16 md:text-right order-2 md:order-1 hidden md:block"></div>
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border-[6px] border-zinc-50 bg-orange-500 shadow-lg dark:border-zinc-950 z-10 box-content">
                      {/* box-content to keep size consistent with border */}
                      <div className="h-3 w-3 rounded-full bg-white"></div>
                    </div>
                    <div className="md:w-1/2 md:pl-16 pl-16 order-1 md:order-2">
                      <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 text-left">
                        <span className="mb-3 block font-mono text-base font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Feb 2024 – Sep 2025</span>
                        <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Tech Mahindra</h3>
                        <div className="mb-6 text-xl font-bold text-orange-600 dark:text-orange-400">
                          Senior Software Engineer
                        </div>
                        <ul className="list-disc list-outside ml-5 space-y-3 text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                          <li>Developed scalable front-end components for <strong className="font-extrabold text-black dark:text-white">Microsoft Teams</strong> using <strong className="font-extrabold text-black dark:text-white">React.js</strong>.</li>
                          <li>Optimized performance and ensured accessibility/<strong className="font-extrabold text-black dark:text-white">WCAG</strong> compliance across the application.</li>
                          <li>Collaborated with cross-functional teams to ship feature-rich updates in an <strong className="font-extrabold text-black dark:text-white">agile</strong> environment.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Mirafra - Left */}
                  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between group">
                    <div className="md:w-1/2 md:pr-16 pl-16 md:pl-0 order-1">
                      <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 text-left">
                        <span className="mb-3 block font-mono text-base font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Sep 2022 – Nov 2023</span>
                        <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Mirafra Technologies</h3>
                        <div className="mb-6 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                          Senior Software Engineer
                        </div>
                        <ul className="list-disc list-outside ml-5 space-y-3 text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                          <li>Built interactive features for the digital storytelling platform <strong className="font-extrabold text-black dark:text-white">PrathamBooks.org</strong>.</li>
                          <li>Collaborated closely with designers to implement <strong className="font-extrabold text-black dark:text-white">pixel-perfect UI</strong> and smooth interactions.</li>
                          <li>Enhanced user engagement metrics through <strong className="font-extrabold text-black dark:text-white">responsive design</strong> implementation.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border-[6px] border-zinc-50 bg-zinc-300 dark:bg-zinc-700 dark:border-zinc-950 z-10 box-content">
                    </div>
                    <div className="md:w-1/2 md:pl-16 order-2 hidden md:block"></div>
                  </div>

                  {/* Liftoff - Right */}
                  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between group">
                    <div className="md:w-1/2 md:pr-16 md:text-right order-2 md:order-1 hidden md:block"></div>
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border-[6px] border-zinc-50 bg-zinc-300 dark:bg-zinc-700 dark:border-zinc-950 z-10 box-content">
                    </div>
                    <div className="md:w-1/2 md:pl-16 pl-16 order-1 md:order-2">
                      <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40">
                        <span className="mb-3 block font-mono text-base font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Nov 2021 – Feb 2022</span>
                        <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Liftoff LLC</h3>
                        <div className="mb-6 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                          Front-end Developer (React.js)
                        </div>
                        <ul className="list-disc list-outside ml-5 space-y-3 text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                          <li>Developed core features for the Sphere Web platform using <strong className="font-extrabold text-black dark:text-white">React</strong> and <strong className="font-extrabold text-black dark:text-white">Redux</strong>.</li>
                          <li>Integrated complex <strong className="font-extrabold text-black dark:text-white">RESTful APIs</strong> and managed application state efficiently.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Broadridge - Left */}
                  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between group">
                    <div className="md:w-1/2 md:pr-16 pl-16 md:pl-0 order-1">
                      <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 text-left">
                        <span className="mb-3 block font-mono text-base font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Jun 2018 – Oct 2020</span>
                        <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Broadridge Financial Solutions</h3>
                        <div className="mb-6 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                          Front-end Developer (React.js)
                        </div>
                        <ul className="list-disc list-outside ml-5 space-y-3 text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                          <li>Worked on the Global Post Trade Management system for enterprise clients.</li>
                          <li>Migrated legacy UI views to modern, component-based <strong className="font-extrabold text-black dark:text-white">React</strong> architecture.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border-[6px] border-zinc-50 bg-zinc-300 dark:bg-zinc-700 dark:border-zinc-950 z-10 box-content">
                    </div>
                    <div className="md:w-1/2 md:pl-16 order-2 hidden md:block"></div>
                  </div>

                  {/* Education - Right */}
                  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between group">
                    <div className="md:w-1/2 md:pr-16 md:text-right order-2 md:order-1 hidden md:block"></div>
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border-[6px] border-zinc-50 bg-zinc-300 dark:bg-zinc-700 dark:border-zinc-950 z-10 box-content">
                    </div>
                    <div className="md:w-1/2 md:pl-16 pl-16 order-1 md:order-2">
                      <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40">
                        <span className="mb-3 block font-mono text-base font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Jun 2015 – May 2018</span>
                        <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Ramaiah Institute of Technology</h3>
                        <div className="mb-6 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                          B.E. Information Science & Engineering
                        </div>
                        <ul className="list-disc list-outside ml-5 space-y-3 text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                          <li>Specialized in Information Science fundamentals and software engineering. <strong className="font-extrabold text-black dark:text-white">7.92 CGPA</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header */}
              <div className="text-center space-y-6 max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold sm:text-5xl text-zinc-900 dark:text-zinc-100">
                  Freelance Services
                </h2>
                <p className="text-xl sm:text-2xl text-zinc-700 dark:text-zinc-200 font-medium leading-relaxed">
                  Help me make black money 💰🕶️ <br className="hidden sm:block" />
                  Here is how I can help you.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* 1. Motion Graphics */}
                <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 text-left flex flex-col gap-4">
                  <div className="absolute top-8 right-8 flex gap-2 z-10">
                    <a href="https://contra.com/suraj_kumar_b_c_0uicot57" target="_blank" rel="noreferrer" className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300 shadow-sm transition-colors">Contra</a>
                    <a href="mailto:surajcommercial@gmail.com" className="group relative rounded-full bg-white border border-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 shadow-sm transition-colors">
                      Email
                      <span className="absolute right-0 top-full mt-2 hidden whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white shadow-lg group-hover:block dark:bg-zinc-100 dark:text-zinc-900 z-50">
                        surajcommercial@gmail.com
                      </span>
                    </a>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl dark:bg-purple-900/30 dark:text-purple-400">
                    🎬
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 pr-24">Motion Graphics Artist</h3>
                    <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                      Compelling storytelling through motion and visual effects.
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {["Premiere Pro", "After Effects", "Illustrator", "Blender 3D"].map(tag => (
                      <span key={tag} className="rounded-lg bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Rive Expert */}
                <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 text-left flex flex-col gap-4">
                  <div className="absolute top-8 right-8 flex gap-2 z-10">
                    <a href="https://contra.com/suraj_kumar_b_c_0uicot57" target="_blank" rel="noreferrer" className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300 shadow-sm transition-colors">Contra</a>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl dark:bg-orange-900/30 dark:text-orange-400">
                    ⚡️
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 pr-20">Rive Expert</h3>
                    <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                      High-performance interactive UI animations for the web.
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {["Rive", "State Machines", "Interactive UI", "Web Runtime"].map(tag => (
                      <span key={tag} className="rounded-lg bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Frontend Dev */}
                <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 text-left flex flex-col gap-4">
                  <div className="absolute top-8 right-8 flex gap-2 z-10">
                    <a href="mailto:surajcommercial@gmail.com" className="group relative rounded-full bg-white border border-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 shadow-sm transition-colors">
                      Email
                      <span className="absolute right-0 top-full mt-2 hidden whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white shadow-lg group-hover:block dark:bg-zinc-100 dark:text-zinc-900 z-50">
                        surajcommercial@gmail.com
                      </span>
                    </a>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl dark:bg-blue-900/30 dark:text-blue-400">
                    💻
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 pr-16">Frontend Developer</h3>
                    <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                      Scalable, accessible, and pixel-perfect web applications.
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS"].map(tag => (
                      <span key={tag} className="rounded-lg bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Analogue Photography */}
                <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 text-left flex flex-col gap-4">
                  <div className="absolute top-8 right-8 flex gap-2 z-10">
                    <a href="mailto:surajcommercial@gmail.com" className="group relative rounded-full bg-white border border-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 shadow-sm transition-colors">
                      Email
                      <span className="absolute right-0 top-full mt-2 hidden whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white shadow-lg group-hover:block dark:bg-zinc-100 dark:text-zinc-900 z-50">
                        surajcommercial@gmail.com
                      </span>
                    </a>
                    <a href="https://www.instagram.com/bysuraj.in/" target="_blank" rel="noreferrer" className="rounded-full bg-pink-100 border border-pink-200 px-3 py-1.5 text-xs font-bold text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:border-pink-800 dark:text-pink-300 dark:hover:bg-pink-900/50 shadow-sm transition-colors">Instagram</a>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-zinc-100 text-zinc-600 flex items-center justify-center text-2xl dark:bg-zinc-800 dark:text-zinc-400">
                    📷
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 pr-24">Analogue Photographer</h3>
                    <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                      Portrait and editorial photography on medium format film.
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {["Pentax 67II", "Medium Format", "Portrait", "Editorial"].map(tag => (
                      <span key={tag} className="rounded-lg bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 5. Hiking & Gym Partner */}
                <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 text-left flex flex-col gap-4">
                  <div className="absolute top-8 right-8 flex gap-2 z-10">
                    <span className="flex items-center rounded-full bg-zinc-100 border border-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 cursor-default">
                      Weekends
                    </span>
                    <a href="mailto:surajcommercial@gmail.com" className="group relative rounded-full bg-white border border-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 shadow-sm transition-colors">
                      Email
                      <span className="absolute right-0 top-full mt-2 hidden whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white shadow-lg group-hover:block dark:bg-zinc-100 dark:text-zinc-900 z-50">
                        surajcommercial@gmail.com
                      </span>
                    </a>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl dark:bg-emerald-900/30 dark:text-emerald-400">
                    🏔️
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 pr-16">Hiking & Gym Partner</h3>
                    <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                      Explorations in Bangalore & Coorg or spotting each other at the gym. <br />
                      I'm fat as fuck, help me!! <br />
                      <span className="text-base italic opacity-80">(This service is free of charge)</span>
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {["Bangalore", "Kodagu (Coorg)", "Hiking", "Gym Partner"].map(tag => (
                      <span key={tag} className="rounded-lg bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 6. BaaS */}
                <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 text-left flex flex-col gap-4">
                  <div className="absolute top-8 right-8 flex gap-2 z-10">
                    <a href="mailto:surajcommercial@gmail.com" className="group relative rounded-full bg-white border border-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 shadow-sm transition-colors">
                      Email
                      <span className="absolute right-0 top-full mt-2 hidden whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white shadow-lg group-hover:block dark:bg-zinc-100 dark:text-zinc-900 z-50">
                        surajcommercial@gmail.com
                      </span>
                    </a>
                    <a href="https://www.instagram.com/bysuraj.in/" target="_blank" rel="noreferrer" className="rounded-full bg-pink-100 border border-pink-200 px-3 py-1.5 text-xs font-bold text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:border-pink-800 dark:text-pink-300 dark:hover:bg-pink-900/50 shadow-sm transition-colors">Instagram</a>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl dark:bg-pink-900/30 dark:text-pink-400">
                    🌹
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 pr-16">Boyfriend as a Service (BaaS)</h3>
                    <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                      Professional plus-one for weddings, family dinners, and awkward social events.
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {["6ft", "Average looking", "Well behaved", "Aries & Leo", "90's", "Honda Dio (I'm broke 💸)"].map(tag => (
                      <span key={tag} className="rounded-lg bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>


            </div>
          )}
        </div>
      </div>
    </main>
  );
}
