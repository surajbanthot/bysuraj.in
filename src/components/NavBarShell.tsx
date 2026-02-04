"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IstClock from "@/components/IstClock";
import NavBar from "@/components/NavBar";

type NavBarShellProps = {
  fontClassName?: string;
};

export default function NavBarShell({ fontClassName }: NavBarShellProps) {
  const [showClock, setShowClock] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setShowClock(false);
      return;
    }

    const heroClock = document.getElementById("hero-clock");
    const navShell = document.querySelector(
      "[data-nav-shell]",
    ) as HTMLElement | null;

    if (!heroClock) {
      setShowClock(true);
      return;
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const navHeight = navShell?.getBoundingClientRect().height ?? 0;
      const triggerOffset = navHeight + 12;
      const { top } = heroClock.getBoundingClientRect();
      setShowClock(top <= triggerOffset);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      document.body.classList.remove("nav-clock-visible");
      return;
    }

    document.body.classList.toggle("nav-clock-visible", showClock);

    return () => {
      document.body.classList.remove("nav-clock-visible");
    };
  }, [showClock, isHome]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 sm:gap-x-6">
        <div aria-hidden="true" />
        <div
          data-nav-shell
          className="relative inline-flex justify-self-center rounded-md"
        >
          <NavBar fontClassName={fontClassName} />
        </div>
        <div className="flex items-center justify-end justify-self-end gap-3 sm:gap-4">


          <div
            className={`pointer-events-none flex items-center justify-end whitespace-nowrap text-lg leading-none text-zinc-500 transition duration-200 dark:text-zinc-400 sm:text-xl ${showClock && isHome ? "opacity-100" : "opacity-0"
              }`}
          >
            <IstClock className={`${fontClassName ?? ""} whitespace-nowrap`} />
          </div>
        </div>
      </div>
    </div>
  );
}
