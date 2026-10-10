type SplitTextProps = {
  text: string;
  className?: string;
  /** Per-letter class (e.g. the CSS animation). */
  letterClassName?: string;
  /** Delay between letters in ms. */
  stagger?: number;
  /** Delay before the first letter in ms. */
  offset?: number;
  /** Rendered inside the last word so it never wraps onto its own line. */
  trailing?: React.ReactNode;
};

/**
 * Splits text into per-letter spans for staggered animation. Screen readers
 * get the whole string once; the letter spans are hidden from them.
 */
export default function SplitText({
  text,
  className = "",
  letterClassName = "",
  stagger = 40,
  offset = 0,
  trailing,
}: SplitTextProps) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, w, words) => {
        const before = words.slice(0, w).join(" ").length + (w > 0 ? 1 : 0);
        return (
          <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
            {[...word].map((char, c) => (
              <span
                key={c}
                className={`inline-block ${letterClassName}`}
                style={{ animationDelay: `${offset + (before + c) * stagger}ms` }}
              >
                {char}
              </span>
            ))}
            {w < words.length - 1 ? <span className="inline-block">&nbsp;</span> : trailing}
          </span>
        );
      })}
    </span>
  );
}
