"use client";

import { useState, useEffect } from "react";

export function useScrollOffset(scrollThreshold = 100) {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);

      const footer = document.querySelector("[data-site-footer]");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (footerRect.top < windowHeight) {
          setBottomOffset(24 + (windowHeight - footerRect.top));
        } else {
          setBottomOffset(24);
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  return { isVisible, bottomOffset };
}
