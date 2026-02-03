"use client";

import { useEffect } from "react";

export default function LayoutChromeSizer() {
  useEffect(() => {
    const update = () => {
      const header = document.querySelector(
        "[data-site-header]",
      ) as HTMLElement | null;
      const footer = document.querySelector(
        "[data-site-footer]",
      ) as HTMLElement | null;
      const height =
        (header?.getBoundingClientRect().height ?? 0) +
        (footer?.getBoundingClientRect().height ?? 0);

      document.documentElement.style.setProperty(
        "--app-chrome",
        `${Math.round(height)}px`,
      );
    };

    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
