/** A keyframe diamond, as on an After Effects timeline. */
export default function Keyframe({ className = "", filled = true }: { className?: string; filled?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-3 w-3 rotate-45 border border-accent ${filled ? "bg-accent" : ""} ${className}`}
    />
  );
}
