import { tornEdge } from "@/lib/tornEdge";

/** A strip of translucent masking tape. Position it with `className`. */
export default function Tape({ className = "", rotate = -4, seed = 0.4 }: { className?: string; rotate?: number; seed?: number }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 block h-7 w-24 bg-ink/30 backdrop-blur-[1px] ${className}`}
      style={{ rotate: `${rotate}deg`, clipPath: tornEdge(seed, { sides: ["left", "right"], depth: 6, steps: 6 }) }}
    />
  );
}
