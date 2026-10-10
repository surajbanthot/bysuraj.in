// Deterministic torn-paper edges for the collage kit. Seeded, so the server
// and client render identical markup.

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
