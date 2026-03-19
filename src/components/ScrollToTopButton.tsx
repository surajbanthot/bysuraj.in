"use client";

import type { MouseEvent } from "react";
import { useScrollOffset } from "@/lib/useScrollOffset";

export default function ScrollToTopButton() {
  const { isVisible, bottomOffset } = useScrollOffset();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ bottom: `${bottomOffset}px` }}
      className={`fixed right-4 z-20 rounded-full border-2 border-sky-300 bg-sky-500 px-4 py-2 text-lg text-white shadow-[0_0_20px_rgba(56,189,248,0.6),0_0_40px_rgba(56,189,248,0.3)] transition-all duration-500 hover:bg-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.8),0_0_50px_rgba(56,189,248,0.4)] sm:right-10 sm:px-6 sm:py-3 sm:text-2xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      aria-label="Scroll to top"
    >
      Top
    </button>
  );
}
