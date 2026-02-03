"use client";

import { usePathname } from "next/navigation";

export default function ResumeButton() {
  const pathname = usePathname();

  if (pathname !== "/hireme") {
    return null;
  }

  return (
    <div className="sticky bottom-0 z-40 flex justify-end px-6 pb-10 sm:px-8">
      <button
        type="button"
        className="mr-4 rounded-full border border-orange-300/70 bg-orange-500/80 px-4 py-2 text-[10px] text-white shadow-[0_0_14px_rgba(251,146,60,0.5)] transition hover:bg-orange-500 dark:bg-orange-500/70 sm:text-sm sm:mr-6"
        aria-label="Resume"
      >
        Resume
      </button>
    </div>
  );
}
