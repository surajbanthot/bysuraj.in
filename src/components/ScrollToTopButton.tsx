"use client";

import { useState, useEffect } from "react";
import type { MouseEvent } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(40);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY > 100);

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

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ bottom: `${bottomOffset}px` }}
      className={`fixed right-10 z-20 rounded-full border-2 border-sky-300 bg-sky-500 px-6 py-3 text-xl text-white shadow-[0_0_20px_rgba(56,189,248,0.6),0_0_40px_rgba(56,189,248,0.3)] transition-all duration-500 hover:bg-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.8),0_0_50px_rgba(56,189,248,0.4)] sm:text-2xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      aria-label="Scroll to top"
    >
      Top
    </button>
  );
}
