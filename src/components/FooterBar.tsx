"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function FooterBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <footer
        data-site-footer
        className="border-t border-zinc-200/70 bg-white/80 px-6 py-6 text-lg text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-black/70 dark:text-zinc-400 sm:px-8 sm:text-xl"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <a
            href="mailto:surajcommercial@gmail.com"
            className="inline-flex items-center gap-2 text-zinc-900 transition hover:text-orange-500 dark:text-zinc-100"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            <span className="no-underline">:</span>
            <span className="underline decoration-orange-400/70 underline-offset-4">
              surajcommercial@gmail.com
            </span>
          </a>
          <button
            type="button"
            className="rounded-full border border-zinc-300/70 px-4 py-2 text-lg text-zinc-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-orange-400 sm:text-xl"
            onClick={() => setIsOpen(true)}
          >
            Phone
          </button>
          {pathname !== "/code" && (
            <a
              href="https://www.instagram.com/bysuraj.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-zinc-900 transition hover:text-orange-500 dark:text-zinc-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
              <span className="no-underline">:</span>
              <span className="underline decoration-orange-400/70 underline-offset-4">
                @bysuraj.in
              </span>
            </a>
          )}

        </div>
      </footer>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-md border border-zinc-200/70 bg-white p-5 text-zinc-900 shadow-xl dark:border-zinc-800 dark:bg-black dark:text-zinc-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-normal sm:text-3xl">Phone Enquiry</h2>
                <p className="mt-1 text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
                  Leave your number and a short note. This is the <span className="text-orange-500 font-bold">fastest</span> way to reach me! Thank you. :)
                </p>
              </div>
              <button
                type="button"
                className="text-lg text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-200 sm:text-xl"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                Close
              </button>
            </div>

            <form className="mt-4 space-y-3 text-lg sm:text-xl">
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-base text-zinc-500 sm:text-lg">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="note" className="text-base text-zinc-500 sm:text-lg">
                  Message
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={4}
                  placeholder="Please share the project details or how I can help 🙂"
                  className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="rounded border border-zinc-200/70 px-4 py-2 text-lg text-zinc-600 transition hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-100 sm:text-xl"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded border border-orange-300/70 bg-orange-500/80 px-4 py-2 text-lg text-white transition hover:bg-orange-500 sm:text-xl"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
