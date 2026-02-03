"use client";

import { useEffect, useState } from "react";

export default function HireMePage() {
  const [activeTab, setActiveTab] = useState<"fulltime" | "freelance">(() => {
    if (typeof window === "undefined") {
      return "freelance";
    }
    const stored = window.sessionStorage.getItem("hireMeTab");
    return stored === "fulltime" || stored === "freelance"
      ? stored
      : "freelance";
  });

  useEffect(() => {
    window.sessionStorage.setItem("hireMeTab", activeTab);
  }, [activeTab]);

  return (
    <main className="min-h-[calc(100vh-56px)] bg-white px-6 py-10 text-zinc-900 dark:bg-black dark:text-zinc-50 sm:px-8">
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
            className={`rounded-full px-4 py-2 text-xs transition sm:text-sm ${
              activeTab === "fulltime"
                ? "bg-orange-500/80 text-white shadow-[0_0_12px_rgba(251,146,60,0.45)]"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
            }`}
          >
            Full time hire
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "freelance"}
            onClick={() => setActiveTab("freelance")}
            className={`rounded-full px-4 py-2 text-xs transition sm:text-sm ${
              activeTab === "freelance"
                ? "bg-orange-500/80 text-white shadow-[0_0_12px_rgba(251,146,60,0.45)]"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
            }`}
          >
            Freelance
          </button>
          </div>
        </div>

        <div className="text-sm text-zinc-600 dark:text-zinc-300 sm:text-base">
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
                        className={`relative flex items-center ${
                          isLeft ? "justify-start pr-2" : "justify-end pl-2"
                        }`}
                      >
                        <span
                          className={`absolute left-1/2 top-1/2 h-1 w-8 -translate-y-1/2 rounded-full bg-green-500/70 ${
                            isLeft ? "-translate-x-full" : "translate-x-0"
                          }`}
                        />
                        <span
                          className={`text-zinc-700 dark:text-zinc-200 ${
                            isLeft ? "text-left" : "text-right"
                          }`}
                        >
                          {year}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <p>Freelance details will go here.</p>
          )}
        </div>
      </div>
    </main>
  );
}
