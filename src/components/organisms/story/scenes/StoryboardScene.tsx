import Scribble from "@/components/atoms/Scribble";
import Scrap from "@/components/molecules/Scrap";
import Layer from "@/components/motion/Layer";
import Scene from "@/components/templates/Scene";
import { getScene } from "@/lib/portfolioData";

const boards = [
  { cap: "Hook", d: ["M60 22a22 22 0 1 0 0.1 0", "M60 34v14", "M60 56v1"] },
  { cap: "Problem", d: ["M30 24h40v48H30z", "M46 16h40v48H46z", "M60 34c0-6 12-6 12 0s-6 6-6 12", "M66 56v1"] },
  { cap: "Turn", d: ["M22 66c10-42 64-42 74-8", "M86 46l10 12-14 2"] },
  { cap: "Proof", d: ["M24 74h74", "M34 74V54", "M52 74V40", "M70 74V30", "M88 74V18"] },
  { cap: "Payoff", d: ["M30 46l18 18 40-40"] },
];

const boardPositions = [
  "left-5 top-[13%] w-[28%] md:left-[2%] md:w-[17%]",
  "left-[36%] top-[17%] w-[28%] md:left-[21%] md:top-[15%] md:w-[17%]",
  "right-5 top-[13%] w-[28%] md:right-auto md:left-[40%] md:top-[12%] md:w-[17%]",
  "hidden md:block md:left-[59%] md:top-[16%] md:w-[17%]",
  "hidden md:block md:left-[78%] md:top-[13%] md:w-[17%]",
];

/** 02 — five sketched beats joined by a drawn line. */
export default function StoryboardScene() {
  return (
    <Scene data={getScene("storyboard")}>
      {boards.map((b, i) => (
        <Layer key={b.cap} name={`Panel ${i + 1} — ${b.cap}`} enter="right" depth={0.3 + i * 0.1} rotate={[-3, 2, -1, 3, -2][i]} drag className={boardPositions[i]}>
          <Scrap tone={i % 2 ? "dark" : "light"} seed={0.1 + i * 0.17} className="p-3">
            <svg viewBox="0 0 120 90" aria-hidden="true" fill="none" className="aspect-[4/3] w-full">
              {b.d.map((d) => (
                <path key={d} d={d} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              ))}
            </svg>
            <p className="mt-2 font-mono text-sm uppercase opacity-70">
              {String(i + 1).padStart(2, "0")} {b.cap}
            </p>
          </Scrap>
        </Layer>
      ))}
      <Layer name="Beat line" enter="fade" depth={0.2} className="left-[3%] top-[44%] hidden w-[92%] md:block">
        <Scribble viewBox="0 0 1000 60" className="h-12 w-full" d={["M10 30 C 120 -10, 200 70, 300 30 S 480 -10, 590 30 S 780 70, 880 30 L 985 30", "M960 14 L 988 30 L 960 46"]} />
      </Layer>
      <Layer name="Timing note" enter="drop" depth={0.6} rotate={-4} className="right-[6%] top-[56%] hidden lg:block">
        <Scrap tone="accent" seed={0.77} className="px-4 py-3">
          <p className="font-mono text-sm uppercase">0:00 → 0:45 · 5 beats</p>
        </Scrap>
      </Layer>
    </Scene>
  );
}
