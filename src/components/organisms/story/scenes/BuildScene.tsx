import Stamp from "@/components/atoms/Stamp";
import Tape from "@/components/atoms/Tape";
import Scrap from "@/components/molecules/Scrap";
import Layer from "@/components/motion/Layer";
import Scene from "@/components/templates/Scene";
import { getScene } from "@/lib/portfolioData";

/** 05 — code, an AI chat exchange, a deploy and a SHIPPED stamp. */
export default function BuildScene() {
  return (
    <Scene data={getScene("build")}>
      <Layer name="Code" enter="up" depth={0.35} rotate={1.5} className="right-4 top-[11%] w-[min(30rem,calc(100cqw-2.5rem))] @3xl:right-[5%]">
        <Scrap tone="light" seed={0.37} className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
          <pre className="whitespace-pre">
            <span className="text-paper/50">{"// answer with receipts\n"}</span>
            <span className="font-semibold text-accent">const</span>
            {" answer = "}
            <span className="font-semibold text-accent">await</span>
            {" rag\n  .ask(question)\n  .withSources()\n  .stream();\n\n"}
            <span className="font-semibold text-accent">return</span>
            {" <Answer cite={answer.sources} />"}
          </pre>
        </Scrap>
        <Tape className="-top-3 left-10" rotate={-5} />
      </Layer>

      <Layer name="Chat" enter="left" depth={0.6} className="right-[34%] top-[46%] hidden w-72 @5xl:block">
        <div className="space-y-2">
          <p className="ml-auto w-fit rounded-2xl rounded-br-sm bg-paper-raised px-4 py-2 text-ink">Where&apos;s the Q3 safety report?</p>
          <p className="w-fit rounded-2xl rounded-bl-sm bg-accent px-4 py-2 text-paper">Found it, with 3 sources ↗</p>
        </div>
      </Layer>

      <Layer name="Terminal" enter="right" depth={0.7} rotate={-2} className="right-4 top-[54%] @3xl:right-[5%] @3xl:top-[62%]">
        <Scrap tone="dark" seed={0.58} className="px-5 py-4 font-mono text-sm">
          <p className="text-muted">$ vercel --prod</p>
          <p className="mt-1 text-ink">
            <span className="text-accent">✓</span> Deployed to bysuraj.in in 41s
          </p>
        </Scrap>
      </Layer>

      <Layer name="Stamp" enter="spin" depth={0.9} className="right-[3%] top-[40%] hidden w-32 @3xl:block">
        <Stamp text="SHIPPED · SHIPPED · SHIPPED · " />
      </Layer>
    </Scene>
  );
}
