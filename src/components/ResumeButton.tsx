"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useScrollOffset } from "@/lib/useScrollOffset";

export default function ResumeButton() {
  const pathname = usePathname();
  const { isVisible: showTopButton, bottomOffset } = useScrollOffset();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Poll sessionStorage for tab changes (storage event doesn't fire in same tab)
  useEffect(() => {
    const checkTab = () => {
      setActiveTab(window.sessionStorage.getItem("hireMeTab"));
    };
    checkTab();
    const interval = setInterval(checkTab, 100);
    return () => clearInterval(interval);
  }, []);

  if (pathname !== "/hireme") {
    return null;
  }

  const showResumeButton = activeTab !== "freelance";

  return (
    <div
      id="resume-button-container"
      className="fixed right-4 z-40 flex flex-col items-end gap-4 transition-all duration-300 ease-out sm:right-10 sm:gap-6"
      style={{ bottom: `${bottomOffset}px` }}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`rounded-full border-2 border-sky-300 bg-sky-500 px-4 py-2 text-lg text-white shadow-[0_0_20px_rgba(56,189,248,0.6),0_0_40px_rgba(56,189,248,0.3)] transition-all duration-500 ease-out hover:bg-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.8),0_0_50px_rgba(56,189,248,0.4)] sm:px-6 sm:py-3 sm:text-2xl ${showTopButton ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none absolute"}`}
        aria-label="Scroll to top"
      >
        Top
      </button>
      {showResumeButton && (
        <button
          type="button"
          className="rounded-full border border-orange-300/70 bg-orange-500/80 px-4 py-2 text-lg text-white shadow-[0_0_14px_rgba(251,146,60,0.5)] transition hover:bg-orange-500 dark:bg-orange-500/70 sm:px-6 sm:py-3 sm:text-2xl"
          aria-label="Resume"
        >
          Resume
        </button>
      )}
    </div>
  );
}
