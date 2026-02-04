"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ResumeButton() {
  const pathname = usePathname();
  const [showTopButton, setShowTopButton] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(40);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 100);

      // Check footer overlap
      const footer = document.querySelector('[data-site-footer]');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerRect.top < windowHeight) {
          const visibleFooterHeight = windowHeight - footerRect.top;
          setBottomOffset(40 + visibleFooterHeight);
        } else {
          setBottomOffset(40);
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname !== "/hireme") {
    return null;
  }

  return (
    <div
      className="fixed right-10 z-40 flex flex-col items-end gap-6 transition-all duration-300 ease-out"
      style={{ bottom: `${bottomOffset}px` }}
    >
      {/* Top button - appears above Resume when visible */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`rounded-full border-2 border-sky-300 bg-sky-500 px-6 py-3 text-xl text-white shadow-[0_0_20px_rgba(56,189,248,0.6),0_0_40px_rgba(56,189,248,0.3)] transition-all duration-500 ease-out hover:bg-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.8),0_0_50px_rgba(56,189,248,0.4)] sm:text-2xl ${showTopButton
          ? "opacity-100 scale-100"
          : "opacity-0 scale-0 pointer-events-none absolute"
          }`}
        aria-label="Scroll to top"
      >
        Top
      </button>
      {/* Resume button - always at bottom */}
      <button
        type="button"
        className="rounded-full border border-orange-300/70 bg-orange-500/80 px-6 py-3 text-xl text-white shadow-[0_0_14px_rgba(251,146,60,0.5)] transition hover:bg-orange-500 dark:bg-orange-500/70 sm:text-2xl"
        aria-label="Resume"
      >
        Resume
      </button>
    </div>
  );
}
