import type { ReactNode } from "react";

const tones = {
  default: "border-border text-muted",
  accent: "border-accent bg-accent text-paper",
} as const;

/** A small pill label — skills, tech, statuses. */
export default function Tag({
  tone = "default",
  className = "",
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={`inline-block rounded-full border px-3 py-1 font-mono text-sm uppercase tracking-wider ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
