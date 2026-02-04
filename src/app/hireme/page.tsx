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
  }, [activeTab]);

  return (
    <main className="min-h-[calc(100vh-56px)] bg-white px-4 pb-28 pt-8 text-zinc-900 dark:bg-black dark:text-zinc-50 sm:px-8 sm:pb-12 sm:pt-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <div
          className="flex justify-center"
          role="tablist"
          aria-label="Hire type"
        >
          <div className="inline-flex w-fit rounded-full border border-zinc-200/70 bg-zinc-50/60 p-1 dark:border-zinc-800 dark:bg-black/40">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "fulltime"}
              onClick={() => setActiveTab("fulltime")}
              className={`rounded-full px-3 py-1.5 text-base transition sm:px-4 sm:py-2 sm:text-xl ${activeTab === "fulltime"
                ? "bg-orange-500/80 text-white shadow-[0_0_12px_rgba(251,146,60,0.45)]"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                }`}
            >
              Full time
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "freelance"}
              onClick={() => setActiveTab("freelance")}
              className={`rounded-full px-3 py-1.5 text-base transition sm:px-4 sm:py-2 sm:text-xl ${activeTab === "freelance"
                ? "bg-orange-500/80 text-white shadow-[0_0_12px_rgba(251,146,60,0.45)]"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                }`}
            >
              Freelance
            </button>
          </div>
        </div>

        <div className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
          {activeTab === "fulltime" ? (
            <div className="mx-auto w-full max-w-md">
              <div className="relative">
                <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-full bg-green-600/70 dark:bg-green-500/60" />
                <div className="flex flex-col gap-5">
                  {[
                    "2026 (present)",
                    "2025",
                    "2024",
                    "2023",
                    "2022",
                    "2021",
                    "2020",
                    "2019",
                    "2018",
                    "2017",
                    "2016",
                    "2015",
                  ].map((year, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                      <div
                        key={year}
                        className={`relative flex items-center ${isLeft ? "justify-start pr-2" : "justify-end pl-2"
                          }`}
                      >
                        <span
                          className={`absolute left-1/2 top-1/2 h-1 w-8 -translate-y-1/2 rounded-full bg-green-500/70 ${isLeft ? "-translate-x-full" : "translate-x-0"
                            }`}
                        />
                        <span
                          className={`text-xl text-zinc-700 dark:text-zinc-200 sm:text-2xl ${isLeft ? "text-left" : "text-right"
                            }`}
                        >
                          {year}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-8 space-y-4 text-center">
                <p className="text-xl text-zinc-700 dark:text-zinc-200 sm:text-2xl">
                  Over a decade of experience in design engineering and creative technology.
                </p>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
                  I bring a unique blend of design thinking, technical expertise, and creative problem-solving to every project. From startups to enterprise companies, I&apos;ve helped teams build beautiful, functional, and scalable products.
                </p>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
                  Looking for a full-time opportunity where I can make a meaningful impact. Let&apos;s talk!
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xl sm:text-2xl">Freelance details will go here.</p>
          )}
        </div>
      </div>
    </main>
  );
}
