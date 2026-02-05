"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function SocialPage() {
    const [activeTab, setActiveTab] = useState<"instagram" | "film" | "youtube">(() => {
        if (typeof window === "undefined") {
            return "instagram";
        }
        const stored = window.sessionStorage.getItem("socialTab");
        return stored === "instagram" || stored === "film" || stored === "youtube"
            ? stored
            : "instagram";
    });

    useEffect(() => {
        window.sessionStorage.setItem("socialTab", activeTab);
    }, [activeTab]);

    return (
        <main className="flex min-h-[calc(100vh-56px)] flex-col items-center bg-zinc-50 px-4 pt-24 pb-12 text-center dark:bg-black text-zinc-900 dark:text-zinc-50">
            <div className="flex w-full max-w-5xl flex-col items-center animate-in fade-in zoom-in duration-500">
                {/* Switcher */}
                <div className="mb-12 flex w-full max-w-sm rounded-full bg-zinc-200/50 p-1.5 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800">
                    <button
                        onClick={() => setActiveTab("instagram")}
                        className={`flex-1 rounded-full py-2 text-sm font-medium transition-all duration-200 sm:text-base ${activeTab === "instagram"
                            ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                            }`}
                    >
                        Instagram
                    </button>
                    <button
                        onClick={() => setActiveTab("film")}
                        className={`flex-1 rounded-full py-2 text-sm font-medium transition-all duration-200 sm:text-base ${activeTab === "film"
                            ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                            }`}
                    >
                        Film
                    </button>
                    <button
                        onClick={() => setActiveTab("youtube")}
                        className={`flex-1 rounded-full py-2 text-sm font-medium transition-all duration-200 sm:text-base ${activeTab === "youtube"
                            ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                            }`}
                    >
                        YouTube
                    </button>
                </div>

                {/* Content Cards */}
                <div className="flex w-full justify-center">
                    {activeTab === "instagram" && (
                        <div className="w-full max-w-sm">
                            <a
                                href="https://www.instagram.com/bysuraj.in/"
                                target="_blank"
                                rel="noreferrer"
                                className="group flex flex-col items-center gap-6 rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
                            >
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-500 transition group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-red-500 group-hover:to-purple-500 group-hover:text-white">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">@bysuraj.in</h2>
                                    <p className="mt-2 text-zinc-500 dark:text-zinc-400">Follow for daily updates</p>
                                </div>
                            </a>
                        </div>
                    )}

                    {activeTab === "film" && (
                        <div className="w-full max-w-4xl text-left animate-in fade-in slide-in-from-bottom-4 duration-500 font-[family-name:var(--font-quantico)]">
                            <div className="flex flex-col gap-8 sm:gap-10">
                                <header className="space-y-3 sm:space-y-4">
                                    <h2 className="text-3xl font-normal tracking-tight sm:text-5xl">Film(Analogue)</h2>
                                    <p className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
                                        I am an analogue camera person. My main tool is the{" "}
                                        <a
                                            href="https://www.instagram.com/explore/tags/pentax67/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-zinc-900 underline decoration-orange-400/70 underline-offset-4 transition hover:text-orange-500 dark:text-zinc-100"
                                        >
                                            Pentax 67II
                                        </a>
                                        , and I shoot medium format film to slow down, compose with intent,
                                        and embrace the physicality of the process.
                                    </p>
                                </header>

                                <section className="space-y-3">
                                    <h3 className="text-2xl font-normal tracking-tight sm:text-3xl">
                                        Why Medium Format
                                    </h3>
                                    <p className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
                                        Medium format film uses a larger negative than 35mm, which gives you
                                        richer tonal transitions, cleaner detail, and a distinctive sense of
                                        depth. It is also a more deliberate workflow: fewer frames per roll,
                                        more intention per click, and a tangible connection to the image
                                        once it is developed.
                                    </p>
                                </section>

                                <section className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-3 rounded-md border border-zinc-200/70 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-black/40">
                                        <h3 className="text-xl font-normal tracking-tight sm:text-2xl">
                                            Camera: Pentax 67II
                                        </h3>
                                        <p className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
                                            A classic 6x7 system known for its balance of portability and
                                            image quality. It feels like a tank, but shoots like a large SLR.
                                        </p>
                                    </div>
                                    <div className="space-y-3 rounded-md border border-zinc-200/70 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-black/40">
                                        <h3 className="text-xl font-normal tracking-tight sm:text-2xl">
                                            Process & Practice
                                        </h3>
                                        <p className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
                                            I meter carefully, compose patiently, and keep notes for each
                                            roll. The goal is consistency and character, not speed.
                                        </p>
                                    </div>
                                </section>

                                <section className="space-y-3">
                                    <h3 className="text-2xl font-normal tracking-tight sm:text-3xl">
                                        What I Look For
                                    </h3>
                                    <p className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
                                        Quiet light, strong geometry, and subjects that benefit from
                                        texture. Film rewards subtlety, so I chase moments that feel honest
                                        and tactile.
                                    </p>
                                </section>

                                <section className="space-y-6">
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-normal tracking-tight sm:text-3xl">
                                            Medium Format Film Enquiry
                                        </h3>
                                        <p className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
                                            If you would like to hire me for medium format film photos, share
                                            a few details below and I will get back to you.
                                        </p>
                                    </div>
                                    <form className="grid gap-4 rounded-md border border-zinc-200/70 bg-zinc-50/60 p-5 text-lg text-zinc-700 dark:border-zinc-800 dark:bg-black/40 dark:text-zinc-200 sm:grid-cols-2 sm:text-xl">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name" className="text-base text-zinc-500 sm:text-lg">
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Your name"
                                                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="email" className="text-base text-zinc-500 sm:text-lg">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="project" className="text-base text-zinc-500 sm:text-lg">
                                                Project Type
                                            </label>
                                            <input
                                                id="project"
                                                name="project"
                                                type="text"
                                                placeholder="Portraits, editorial, product, etc."
                                                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="location" className="text-base text-zinc-500 sm:text-lg">
                                                Location
                                            </label>
                                            <input
                                                id="location"
                                                name="location"
                                                type="text"
                                                placeholder="City / Venue"
                                                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="date" className="text-base text-zinc-500 sm:text-lg">
                                                Shoot Date
                                            </label>
                                            <input
                                                id="date"
                                                name="date"
                                                type="text"
                                                placeholder="Preferred date"
                                                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="budget" className="text-base text-zinc-500 sm:text-lg">
                                                Budget Range (Optional)
                                            </label>
                                            <input
                                                id="budget"
                                                name="budget"
                                                type="text"
                                                placeholder="Your budget range"
                                                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 sm:col-span-2">
                                            <label htmlFor="message" className="text-base text-zinc-500 sm:text-lg">
                                                Project Notes
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={4}
                                                placeholder="Tell me about the concept, scope, and deliverables."
                                                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <button
                                                type="button"
                                                className="w-full rounded border border-orange-300/70 bg-orange-500/80 px-4 py-2 text-lg text-white shadow-[0_0_14px_rgba(251,146,60,0.5)] transition hover:bg-orange-500 dark:bg-orange-500/70 sm:text-xl"
                                            >
                                                Send Enquiry
                                            </button>
                                        </div>
                                    </form>
                                </section>
                                <div className="flex justify-center">
                                    <ScrollToTopButton />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "youtube" && (
                        <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-200 shadow-sm dark:border-zinc-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="relative aspect-video w-full">
                                <iframe
                                    className="absolute inset-0 h-full w-full"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=3QZppcO1boBM0kWo&autoplay=1&mute=1"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
