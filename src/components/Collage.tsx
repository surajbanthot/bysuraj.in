import type { CSSProperties, ReactNode } from "react";

// Collage kit for the story stage: torn paper, tape, halftone, stamps and
// hand-drawn marks. Everything is CSS/SVG and deterministic (seeded), so the
// server and client render identical markup.

/** Seeded PRNG (mulberry32) — same seed, same torn edge, every render. */
function random(seed: number) {
  let t = Math.floor(seed * 2 ** 31) || 1;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

type Side = "top" | "right" | "bottom" | "left";

/** A clip-path polygon with ragged, hand-torn edges on the chosen sides. */
export function tornEdge(
  seed: number,
  { sides = ["top", "right", "bottom", "left"], depth = 2.5, steps = 14 }: { sides?: Side[]; depth?: number; steps?: number } = {},
) {
  const r = random(seed);
  const jag = (side: Side) => (sides.includes(side) ? r() * depth : 0);
  const pts: string[] = [];
  const pt = (x: number, y: number) => pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  for (let i = 0; i < steps; i++) pt((i / steps) * 100, jag("top"));
  for (let i = 0; i < steps; i++) pt(100 - jag("right"), (i / steps) * 100);
  for (let i = 0; i < steps; i++) pt(100 - (i / steps) * 100, 100 - jag("bottom"));
  for (let i = 0; i < steps; i++) pt(jag("left"), 100 - (i / steps) * 100);
  return `polygon(${pts.join(", ")})`;
}

export type Enter = "up" | "down" | "left" | "right" | "scale" | "spin" | "drop" | "fade";

type LayerProps = {
  /** Layer name — shown in keyframe view, like an After Effects layer. */
  name: string;
  /** How the layer animates in when its scene starts. */
  enter?: Enter;
  /** Parallax depth 0–1: how far it drifts on scroll and with the pointer. */
  depth?: number;
  rotate?: number;
  /** Let visitors pick the layer up and move it (fine pointers only). */
  drag?: boolean;
  /** Stagger index for the first scene's on-load intro. */
  intro?: number;
  /** Positioning classes — layers are absolutely placed within their scene. */
  className?: string;
  children: ReactNode;
};

/**
 * One collage element. Three nested boxes so three systems never fight over
 * the same transform: the outer one belongs to the scroll timeline, the
 * middle one to Draggable (and the load intro), the inner one to pointer
 * parallax + resting rotation.
 */
export function Layer({ name, enter = "up", depth = 0.5, rotate = 0, drag, intro, className = "", children }: LayerProps) {
  return (
    <div data-layer={name} data-enter={enter} data-depth={depth} className={`absolute ${className}`}>
      <div
        data-drag={drag || undefined}
        data-cursor={drag ? "Drag" : undefined}
        className={`${drag ? "touch-none" : ""} ${intro !== undefined ? "collage-in" : ""}`}
        style={intro !== undefined ? { animationDelay: `${900 + intro * 160}ms` } : undefined}
      >
        <div className="layer-inner" style={{ "--d": depth, rotate: `${rotate}deg` } as CSSProperties}>
          {children}
        </div>
      </div>
    </div>
  );
}

const scrapTones = {
  light: "bg-ink text-paper",
  dark: "bg-paper-raised text-ink",
  accent: "bg-accent text-paper",
} as const;

/** A torn scrap of paper. `light` is cream stock with dark ink. */
export function Scrap({
  tone = "light",
  seed = 0.5,
  className = "",
  children,
}: {
  tone?: keyof typeof scrapTones;
  seed?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`paper ${scrapTones[tone]} ${className}`} style={{ clipPath: tornEdge(seed, { depth: 1.6 }) }}>
      {children}
    </div>
  );
}

/** A strip of translucent masking tape. */
export function Tape({ className = "", rotate = -4, seed = 0.4 }: { className?: string; rotate?: number; seed?: number }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 block h-7 w-24 bg-ink/30 backdrop-blur-[1px] ${className}`}
      style={{ rotate: `${rotate}deg`, clipPath: tornEdge(seed, { sides: ["left", "right"], depth: 6, steps: 6 }) }}
    />
  );
}

/** A halftone disc, like a cut-out from a printed page. */
export function Halftone({ className = "", tone = "accent" }: { className?: string; tone?: "accent" | "ink" }) {
  return <div aria-hidden="true" className={`halftone halftone-${tone} rounded-full ${className}`} />;
}

/** A rubber stamp with text running round the rim. Turns as you scroll (data-spin). */
export function Stamp({ text, className = "" }: { text: string; className?: string }) {
  const id = `stamp-${text.replace(/[^a-z]/gi, "").slice(0, 12)}`;
  return (
    <svg data-spin viewBox="0 0 160 160" aria-hidden="true" className={`text-accent ${className}`}>
      <defs>
        <path id={id} d="M80,80 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" />
      </defs>
      <circle cx="80" cy="80" r="76" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="80" cy="80" r="44" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text fill="currentColor" fontFamily="var(--font-mono)" fontSize="14" letterSpacing="2.4">
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
      <text x="80" y="90" textAnchor="middle" fill="currentColor" fontSize="26">
        ✦
      </text>
    </svg>
  );
}

/** A hand-drawn mark. Paths with data-draw are drawn on by the scroll timeline. */
export function Scribble({
  d,
  viewBox,
  className = "",
  strokeWidth = 3,
}: {
  d: string | string[];
  viewBox: string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" fill="none" className={`overflow-visible text-accent ${className}`}>
      {[d].flat().map((path) => (
        <path
          key={path}
          data-draw
          d={path}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/** A keyframe diamond, as on an After Effects timeline. */
export function Keyframe({ className = "", filled = true }: { className?: string; filled?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-3 w-3 rotate-45 border border-accent ${filled ? "bg-accent" : ""} ${className}`}
    />
  );
}

/** A length of 120 film with sprocket rebates top and bottom. */
export function FilmStrip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`paper bg-paper p-2 shadow-2xl ${className}`}>
      <div className="sprockets h-3" />
      <div className="flex gap-2 py-2">{children}</div>
      <div className="sprockets h-3" />
    </div>
  );
}
