import Image from "next/image";

type ShaderFrameProps = {
  /** Seed 0–1: drives the leak position, tone and grain of the placeholder. */
  seed: number;
  /** Real image in /public. When present it replaces the generative frame. */
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * A frame of "film". Renders the real image when one exists; otherwise a
 * seeded, token-coloured light-leak composition (pure CSS, no WebGL context)
 * so the layout reads as finished before the scans and screenshots arrive.
 */
export default function ShaderFrame({
  seed,
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
}: ShaderFrameProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-paper-raised ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  const x = Math.round(15 + seed * 70);
  const y = Math.round(10 + ((seed * 7.3) % 1) * 80);
  const leak = Math.round(25 + ((seed * 13.1) % 1) * 35);
  const angle = Math.round(seed * 360);

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden bg-paper-raised ${className}`}
      style={{
        backgroundImage: [
          `radial-gradient(circle at ${x}% ${y}%, color-mix(in srgb, var(--accent) ${leak}%, transparent), transparent 55%)`,
          `radial-gradient(ellipse at ${100 - x}% ${100 - y}%, color-mix(in srgb, var(--ink) 10%, transparent), transparent 60%)`,
          `conic-gradient(from ${angle}deg at 50% 50%, var(--paper-raised), var(--paper), var(--paper-raised))`,
        ].join(", "),
      }}
    >
      {/* Rebate edge + frame number, like the border of a medium-format negative */}
      <div className="absolute inset-3 border border-ink/10" />
      <span className="label absolute bottom-4 left-4 !text-ink/40">
        {String(Math.round(seed * 100)).padStart(2, "0")}A
      </span>
    </div>
  );
}
