"use client";

import type { MouseEvent } from "react";

export default function ScrollToTopButton() {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-20 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      aria-label="Scroll to top"
    >
      Top
    </button>
  );
}
