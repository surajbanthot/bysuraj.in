import Tape from "@/components/atoms/Tape";
import CaseCard from "@/components/molecules/CaseCard";
import Layer from "@/components/motion/Layer";
import Scene from "@/components/templates/Scene";
import { getScene, projects } from "@/lib/portfolioData";

const cutPositions = [
  { cls: "left-5 top-[10%] w-[42%] md:left-auto md:right-[40%] md:top-[11%] md:w-[19rem]", rotate: -5 },
  { cls: "right-5 top-[13%] w-[42%] md:right-[8%] md:top-[9%] md:w-[19rem]", rotate: 4 },
  { cls: "left-[29%] top-[41%] w-[42%] md:left-auto md:right-[22%] md:top-[50%] md:w-[19rem]", rotate: -2 },
];

/** 07 — the three projects taped up as prints, each opening its case study. */
export default function FinalCutScene() {
  return (
    <Scene data={getScene("work")}>
      {projects.map((p, i) => (
        <Layer key={p.slug} name={`Case ${p.no}`} enter={(["drop", "right", "up"] as const)[i]} depth={0.4 + i * 0.15} rotate={cutPositions[i].rotate} className={`z-20 ${cutPositions[i].cls}`}>
          <CaseCard project={p} captionSeed={0.2 + i * 0.3} />
          <Tape className="-top-3 left-1/3" rotate={i % 2 ? 6 : -6} seed={0.3 + i * 0.2} />
        </Layer>
      ))}
    </Scene>
  );
}
