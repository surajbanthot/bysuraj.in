/** A halftone disc, like a cut-out from a printed page. */
export default function Halftone({ className = "", tone = "accent" }: { className?: string; tone?: "accent" | "ink" }) {
  return <div aria-hidden="true" className={`halftone halftone-${tone} rounded-full ${className}`} />;
}
