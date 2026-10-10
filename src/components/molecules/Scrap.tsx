import type { ReactNode } from "react";
import { tornEdge } from "@/lib/tornEdge";

const tones = {
  light: "bg-ink text-paper",
  dark: "bg-paper-raised text-ink",
  accent: "bg-accent text-paper",
} as const;

export type ScrapTone = keyof typeof tones;

/** A torn scrap of paper — the base of most collage pieces. `light` is cream stock with dark ink. */
export default function Scrap({
  tone = "light",
  seed = 0.5,
  className = "",
  children,
}: {
  tone?: ScrapTone;
  seed?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`paper ${tones[tone]} ${className}`} style={{ clipPath: tornEdge(seed, { depth: 1.6 }) }}>
      {children}
    </div>
  );
}
