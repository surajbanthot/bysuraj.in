/** A hand-drawn mark. Paths carry data-draw, so the story timeline draws them on. */
export default function Scribble({
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
