"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";

const DARKROOM_CODE = "suraj";
const THEME_STORAGE_KEY = "suraj-portfolio-theme";
const THEME_EVENT = "suraj:theme-change";
const themes = ["darkroom", "paper"] as const;

type PortfolioTheme = (typeof themes)[number];
type ThemeSource = "switcher" | "easter-egg";
type ThemeEventDetail = { theme: PortfolioTheme; source: ThemeSource };

const themeNames: Record<PortfolioTheme, string> = {
  darkroom: "Darkroom",
  paper: "Paper",
};

const isPortfolioTheme = (value: string | undefined): value is PortfolioTheme =>
  themes.includes(value as PortfolioTheme);

const getCurrentTheme = (): PortfolioTheme => {
  const current = document.documentElement.dataset.theme;
  return isPortfolioTheme(current) ? current : "darkroom";
};

const setPortfolioTheme = (theme: PortfolioTheme, source: ThemeSource) => {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The theme still works for this visit when storage is unavailable.
  }
  window.dispatchEvent(
    new CustomEvent<ThemeEventDetail>(THEME_EVENT, {
      detail: { theme, source },
    }),
  );
};

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<PortfolioTheme>("darkroom");

  useEffect(() => {
    setTheme(getCurrentTheme());

    const handleThemeChange = (event: Event) => {
      setTheme((event as CustomEvent<ThemeEventDetail>).detail.theme);
    };

    window.addEventListener(THEME_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_EVENT, handleThemeChange);
  }, []);

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setPortfolioTheme(nextTheme, "switcher");
    track("theme_change", { theme: nextTheme });
  };

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];

  return (
    <button
      type="button"
      className="theme-switcher"
      onClick={cycleTheme}
      aria-label={`Current theme: ${themeNames[theme]}. Switch to ${themeNames[nextTheme]}.`}
      title={`Theme: ${themeNames[theme]}`}
    >
      <span className="theme-switcher-dots" aria-hidden="true">
        {themes.map((option) => (
          <span
            key={option}
            className={`theme-dot theme-dot-${option} ${
              option === theme ? "is-active" : ""
            }`}
          />
        ))}
      </span>
      <span className="theme-switcher-label">
        Theme · {themeNames[theme]}
      </span>
    </button>
  );
}

export function DarkroomEasterEgg() {
  const bufferRef = useRef("");
  const previousThemeRef = useRef<PortfolioTheme>("paper");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const setDarkroom = (next: boolean) => {
      if (next) {
        const currentTheme = getCurrentTheme();
        if (currentTheme !== "darkroom") previousThemeRef.current = currentTheme;
        setPortfolioTheme("darkroom", "easter-egg");
      } else {
        setPortfolioTheme(previousThemeRef.current, "easter-egg");
      }
      setActive(next);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isTyping) return;

      if (event.key === "Escape" && active) {
        setDarkroom(false);
        bufferRef.current = "";
        return;
      }

      if (event.key.length !== 1) return;

      bufferRef.current = `${bufferRef.current}${event.key.toLowerCase()}`.slice(
        -DARKROOM_CODE.length,
      );

      if (bufferRef.current === DARKROOM_CODE) {
        const next = getCurrentTheme() !== "darkroom";
        setDarkroom(next);
        bufferRef.current = "";
        track("darkroom_easter_egg", { enabled: next });
      }
    };

    const handleThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<ThemeEventDetail>).detail;
      if (detail.source === "switcher" && detail.theme !== "darkroom") {
        setActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(THEME_EVENT, handleThemeChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(THEME_EVENT, handleThemeChange);
    };
  }, [active]);

  return (
    <div
      className={`darkroom-toast ${active ? "is-visible" : ""}`}
      role="status"
      aria-live="polite"
      aria-hidden={!active}
    >
      <span className="darkroom-toast-dot" aria-hidden="true" />
      Darkroom mode developed
      <span className="opacity-60">Esc to exit</span>
    </div>
  );
}

export function InteractiveLens() {
  const lensRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--lens-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--lens-y", y.toFixed(3));
  };

  const resetLens = () => {
    lensRef.current?.style.setProperty("--lens-x", "0");
    lensRef.current?.style.setProperty("--lens-y", "0");
  };

  const takeFrame = () => {
    const nextFrame = (frame % 10) + 1;
    setFrame(nextFrame);
    setCapturing(false);
    window.requestAnimationFrame(() => setCapturing(true));
    navigator.vibrate?.(18);
    track("virtual_shutter", { frame: nextFrame });

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCapturing(false), 650);
  };

  return (
    <div className="absolute left-1/2 top-1/2 aspect-square w-[min(33vw,26rem)] -translate-x-1/2 -translate-y-1/2">
      <button
        ref={lensRef}
        type="button"
        className={`lens-button lens-mark h-full w-full ${capturing ? "is-capturing" : ""}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetLens}
        onBlur={resetLens}
        onClick={takeFrame}
        aria-label="Take a virtual photograph"
      >
        <span className="lens-ring lens-ring-one" aria-hidden="true" />
        <span className="lens-ring lens-ring-two" aria-hidden="true" />
        <span className="lens-ring lens-ring-three" aria-hidden="true" />
        <span className="lens-cross lens-cross-x" aria-hidden="true" />
        <span className="lens-cross lens-cross-y" aria-hidden="true" />
        <span className="lens-aperture" aria-hidden="true" />
        <span className="lens-dot" aria-hidden="true" />
        <span className="lens-instruction label" aria-hidden="true">
          Click to expose
        </span>
      </button>

      <span
        className={`lens-counter label ${frame > 0 ? "is-visible" : ""}`}
        aria-live="polite"
      >
        Frame {String(frame).padStart(2, "0")} exposed
      </span>
    </div>
  );
}

const frames = [
  { label: "6×7", detail: "Negative · 56 × 70 mm" },
  { label: "105mm", detail: "Favorite lens · f/2.4" },
  { label: "ISO 400", detail: "Meter for the shadows" },
  { label: "10 frames", detail: "No throwaway clicks" },
  { label: "Manual", detail: "Focus · Meter · Breathe" },
  { label: "Bengaluru", detail: "Usually chasing soft light" },
];

export function FilmContactSheet() {
  const [revealed, setRevealed] = useState<number | null>(null);

  const toggleFrame = (index: number) => {
    const next = revealed === index ? null : index;
    setRevealed(next);
    if (next !== null) track("contact_sheet_note", { frame: index + 1 });
  };

  return (
    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
      {frames.map((frame, index) => {
        const isRevealed = revealed === index;

        return (
          <button
            key={frame.label}
            type="button"
            className="contact-frame relative aspect-[4/5] overflow-hidden border border-border bg-paper-raised p-3 text-center"
            onClick={() => toggleFrame(index)}
            aria-pressed={isRevealed}
            aria-label={`${frame.label}: reveal darkroom note`}
          >
            <span className={`contact-frame-face ${isRevealed ? "is-hidden" : ""}`}>
              <span className="label !text-current">{frame.label}</span>
              <span className="label mt-2 !text-current/45">Tap to inspect</span>
            </span>
            <span className={`contact-frame-face contact-frame-detail ${isRevealed ? "is-visible" : ""}`}>
              <span className="font-display text-lg leading-snug text-current">
                {frame.detail}
              </span>
            </span>
            <span className="label absolute bottom-1 left-1.5 !text-current/50">
              {String(index + 1).padStart(2, "0")}
            </span>
          </button>
        );
      })}
    </div>
  );
}
