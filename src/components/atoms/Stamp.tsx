/** A rubber stamp with text running round the rim. Turns as you scroll (data-spin). */
export default function Stamp({ text, className = "" }: { text: string; className?: string }) {
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
