"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavBarProps = {
  fontClassName?: string;
};

const links = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/work", label: "Work", emoji: "💼" },
  { href: "/motiongraphics", label: "MotionGraphics", emoji: "🎬" },
  { href: "/film", label: "Film(Analogue)", emoji: "📷" },
  { href: "/hireme", label: "Hire me!!", emoji: "🤝" },
];

export default function NavBar({ fontClassName }: NavBarProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`flex items-center justify-center px-4 py-3 text-lg font-normal text-zinc-700 dark:text-zinc-200 sm:text-xl ${fontClassName ?? ""}`}
    >
      <div className="flex flex-nowrap items-center justify-center gap-3 whitespace-nowrap sm:gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const isHireMe = link.href === "/hireme";
          const baseClasses =
            "inline-flex items-center gap-2 border border-zinc-300/70 px-3 py-1.5 text-zinc-800 transition duration-200 leading-none dark:border-zinc-500/70 dark:text-zinc-100";
          const hoverClasses =
            "hover:border-orange-300 hover:bg-orange-500/80 hover:text-white hover:shadow-[0_0_18px_rgba(251,146,60,0.75),0_8px_18px_rgba(0,0,0,0.35)] dark:hover:bg-orange-500/70 dark:hover:text-white";
          const activeClasses =
            "border-orange-300/70 bg-orange-400/30 text-zinc-900 shadow-[0_0_12px_rgba(251,146,60,0.45),0_6px_12px_rgba(0,0,0,0.2)] dark:bg-orange-500/25 dark:text-zinc-50";

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${baseClasses} ${hoverClasses} ${isActive ? activeClasses : ""
                } ${isHireMe ? "hire-me-btn" : ""} ${fontClassName ?? ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="relative -top-[2px] flex h-5 w-5 items-center justify-center text-lg sm:text-xl">
                {link.emoji}
              </span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
