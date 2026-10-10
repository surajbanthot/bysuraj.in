import Link from "next/link";
import type { ReactNode } from "react";
import IstClock from "@/components/IstClock";
import ShaderFrame from "@/components/ShaderFrame";
import SplitText from "@/components/SplitText";
import { FilmStrip, Halftone, Keyframe, Layer, Scrap, Scribble, Stamp, Tape } from "@/components/Collage";
import { SITE, camera, filmFrames, projects, storyScenes, type StoryScene } from "@/lib/portfolioData";

const scene = (id: string) => storyScenes.find((s) => s.id === id) as StoryScene;

/** One shot of the story. Collage layers fill the frame; copy sits lower-left. */
function Scene({ data, copy, children }: { data: StoryScene; copy?: ReactNode; children: ReactNode }) {
  return (
    <div data-scene={data.id} id={data.id} className="story-scene relative min-h-svh overflow-hidden">
      <div className="relative mx-auto h-svh w-full max-w-7xl">
        {children}
        <Layer
          name="Copy"
          depth={0.15}
          className="bottom-24 left-5 right-5 z-10 sm:bottom-28 sm:left-8 md:right-auto md:max-w-xl"
        >
          {copy ?? (
            <>
              <p className="label text-accent">
                {data.act} — {data.marker}
              </p>
              <h2 className="display mt-3 text-[2.75rem] leading-[0.92] text-ink sm:text-7xl">{data.title}</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{data.body}</p>
            </>
          )}
        </Layer>
      </div>
    </div>
  );
}

function OpenScene() {
  const data = scene("open");
  return (
    <Scene
      data={data}
      copy={
        <div className="collage-in" style={{ animationDelay: "650ms" }}>
          <p className="label flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-2 !text-ink">
              <span className="h-2 w-2 rounded-full bg-accent" /> Open to roles & commissions
            </span>
            <span>{SITE.location}</span>
            <IstClock />
          </p>
          <p className="display mt-4 text-3xl leading-tight text-ink sm:text-4xl">
            <span className="text-accent">{SITE.role}.</span> {data.title}
          </p>
          <p className="label mt-5 !text-ink">{data.body} ↓</p>
        </div>
      }
    >
      <Layer name="Halftone sun" enter="scale" depth={0.8} intro={0} className="-right-[12%] top-[6%] w-[70vw] max-w-[34rem] md:right-[2%]">
        <Halftone className="aspect-square w-full opacity-60" />
      </Layer>

      <Layer name="Title" enter="fade" depth={0.3} className="left-5 right-5 top-[15%] sm:left-8 md:top-[16%]">
        <h1 className="display text-[17vw] leading-[0.82] text-ink lg:text-[11.5rem]">
          <SplitText
            text={SITE.fullName}
            letterClassName="hero-letter"
            stagger={28}
            trailing={
              <span className="hero-letter inline-block text-accent" style={{ animationDelay: "420ms" }}>
                .
              </span>
            }
          />
        </h1>
      </Layer>

      <Layer name="Stamp" enter="spin" depth={0.9} intro={1} className="right-[6%] top-[52%] hidden w-36 md:block">
        <Stamp text="EST · 2018 · BENGALURU · INDIA · " />
      </Layer>

      <Layer name="Contact sheet" enter="right" depth={0.7} rotate={7} drag intro={2} className="right-[20%] top-[50%] hidden w-[24rem] lg:block">
        <FilmStrip>
          {filmFrames.slice(0, 3).map((f) => (
            <ShaderFrame key={f.title} seed={f.seed} src={f.src} alt={f.title} sizes="8rem" className="aspect-square flex-1" />
          ))}
        </FilmStrip>
        <Tape className="-top-2 right-6" rotate={-8} seed={0.7} />
      </Layer>
    </Scene>
  );
}

function BriefScene() {
  return (
    <Scene data={scene("brief")}>
      <Layer name="Brief doc" enter="drop" depth={0.4} rotate={2} className="right-4 top-[12%] w-[min(26rem,calc(100vw-2.5rem))] md:right-[6%]">
        <Scrap tone="light" seed={0.13} className="p-6 sm:p-7">
          <p className="font-mono text-sm uppercase tracking-wider text-paper/60">Creative brief</p>
          <dl className="mt-4 space-y-3 text-paper">
            {[
              ["Client", "Shell × Quantzig"],
              ["Problem", "Thousands of documents. Nobody can find anything."],
              ["Goal", "Answers people trust, with the source attached."],
              ["Due", "Yesterday."],
            ].map(([k, v]) => (
              <div key={k} className="relative grid grid-cols-[5rem_1fr] gap-2">
                <dt className="font-mono text-sm uppercase text-paper/60">{k}</dt>
                <dd className="text-base leading-snug">{v}</dd>
                {k === "Goal" && (
                  <Scribble
                    viewBox="0 0 300 70"
                    className="pointer-events-none absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)]"
                    d="M20 40 C 20 8, 280 2, 290 30 C 298 60, 60 70, 14 52 C 0 44, 30 20, 80 14"
                  />
                )}
              </div>
            ))}
          </dl>
        </Scrap>
        <Tape className="-top-3 left-8" rotate={-6} />
        <Tape className="-bottom-3 right-10" rotate={5} seed={0.9} />
      </Layer>

      <Layer name="Sticky — who" enter="drop" depth={0.8} rotate={-8} drag className="right-[38%] top-[13%] hidden lg:block">
        <Scrap tone="accent" seed={0.33} className="w-44 p-4">
          <p className="display text-2xl leading-tight">Who is it for?</p>
        </Scrap>
      </Layer>
      <Layer name="Sticky — change" enter="right" depth={0.6} rotate={6} drag className="right-[2%] top-[64%] hidden md:block">
        <Scrap tone="dark" seed={0.47} className="w-48 p-4">
          <p className="display text-2xl leading-tight">What has to change?</p>
        </Scrap>
      </Layer>
      <Layer name="Sticky — proof" enter="up" depth={0.7} rotate={-3} drag className="right-[31%] top-[52%] hidden lg:block">
        <Scrap tone="light" seed={0.61} className="w-52 p-4">
          <p className="display text-2xl leading-tight">How will we know it worked?</p>
        </Scrap>
      </Layer>
      <Layer name="Halftone" enter="scale" depth={0.9} className="right-[22%] top-[6%] hidden w-40 md:block">
        <Halftone tone="ink" className="aspect-square w-full" />
      </Layer>
    </Scene>
  );
}

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

function StoryboardScene() {
  return (
    <Scene data={scene("storyboard")}>
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

function DesignScene() {
  return (
    <Scene data={scene("design")}>
      <Layer name="UI window" enter="up" depth={0.35} rotate={-2} className="right-4 top-[12%] w-[min(30rem,calc(100vw-2.5rem))] md:right-[5%]">
        <Scrap tone="dark" seed={0.29} className="p-4">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full bg-border" />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="col-span-3 h-16 bg-paper" />
            <div className="col-span-2 space-y-2">
              <div className="h-3 w-3/4 bg-ink/70" />
              <div className="h-3 w-full bg-border" />
              <div className="h-3 w-5/6 bg-border" />
              <span className="mt-2 inline-block rounded-full bg-accent px-3 py-1 font-mono text-sm text-paper">Send ↗</span>
            </div>
            <div className="aspect-square bg-paper" />
          </div>
        </Scrap>
        <Tape className="-top-3 right-12" rotate={6} />
      </Layer>

      <Layer name="Type specimen" enter="left" depth={0.6} rotate={5} drag className="right-[36%] top-[50%] hidden lg:block">
        <Scrap tone="light" seed={0.52} className="px-6 py-4">
          <p className="display text-7xl leading-none">Aa</p>
          <p className="mt-1 font-mono text-sm uppercase text-paper/60">Fraunces · Geist</p>
        </Scrap>
      </Layer>

      <Layer name="Swatches" enter="right" depth={0.7} rotate={-4} drag className="right-[4%] top-[60%] hidden md:block">
        <Scrap tone="light" seed={0.66} className="p-4">
          <div className="flex gap-2">
            {["bg-paper", "bg-paper-raised", "bg-muted", "bg-accent"].map((c) => (
              <span key={c} className={`h-11 w-11 rounded-full border border-paper/20 ${c}`} />
            ))}
          </div>
          <p className="mt-2 font-mono text-sm uppercase text-paper/60">Tokens</p>
        </Scrap>
      </Layer>

      <Layer name="Toggle" enter="drop" depth={0.9} drag className="right-[46%] top-[26%] hidden lg:block">
        <span className="flex h-9 w-16 items-center justify-end rounded-full bg-accent p-1">
          <span className="h-7 w-7 rounded-full bg-ink" />
        </span>
      </Layer>

      <Layer name="Grid" enter="fade" depth={0.1} className="inset-y-[8%] right-[3%] hidden w-[46%] md:block">
        <div className="grid h-full grid-cols-12 gap-3 opacity-30">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="border-x border-accent/40" />
          ))}
        </div>
      </Layer>
    </Scene>
  );
}

function AnimateScene() {
  return (
    <Scene data={scene("animate")}>
      <Layer name="Graph editor" enter="up" depth={0.35} rotate={1.5} className="right-4 top-[11%] w-[min(24rem,calc(100vw-2.5rem))] md:right-[6%]">
        <Scrap tone="dark" seed={0.18} className="p-5">
          <p className="font-mono text-sm uppercase text-faint">Graph editor · power3.inOut</p>
          <svg viewBox="0 0 200 150" aria-hidden="true" fill="none" className="mt-3 w-full overflow-visible">
            <path d="M10 140H195M10 140V5" stroke="var(--border)" strokeWidth="1.5" />
            <path d="M10 140 L 95 140 M 190 10 L 105 10" stroke="var(--faint)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="95" cy="140" r="4" fill="var(--ink)" />
            <circle cx="105" cy="10" r="4" fill="var(--ink)" />
            <path data-draw d="M10 140 C 95 140, 105 10, 190 10" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </Scrap>
      </Layer>

      <Layer name="Keyframe track" enter="right" depth={0.5} className="right-4 top-[52%] w-[min(30rem,calc(100vw-2.5rem))] md:right-[5%] md:top-[60%]">
        <Scrap tone="light" seed={0.44} className="p-5">
          <div className="relative h-10">
            {[0.18, 0.36, 0.54, 0.72].map((x) => (
              <span key={x} className="absolute top-1 h-8 w-8 rounded-full bg-accent" style={{ left: `calc(${x * 100}% - 1rem)`, opacity: x * 0.5 }} />
            ))}
            <span data-move="calc(100% - 2rem)" className="absolute left-0 top-1 h-8 w-8 rounded-full bg-accent" />
          </div>
          <div className="relative mt-3 flex items-center justify-between border-t border-paper/20 pt-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <Keyframe key={i} filled={i % 2 === 0} />
            ))}
          </div>
          <p className="mt-2 font-mono text-sm uppercase text-paper/60">Position · 5 keys · onion skin</p>
        </Scrap>
      </Layer>

      <Layer name="State machine" enter="left" depth={0.7} rotate={-3} drag className="right-[40%] top-[17%] hidden lg:block">
        <Scrap tone="accent" seed={0.83} className="p-4">
          <p className="font-mono text-sm uppercase">Rive state machine</p>
          <p className="mt-2 flex items-center gap-2 font-mono text-sm">
            <span className="border border-paper px-2 py-1">Idle</span>→
            <span className="border border-paper px-2 py-1">Hover</span>→
            <span className="bg-paper px-2 py-1 text-ink">Press</span>
          </p>
        </Scrap>
      </Layer>

      <Layer name="Motion path" enter="fade" depth={0.2} className="right-[30%] top-[40%] hidden w-64 lg:block">
        <Scribble viewBox="0 0 260 120" className="h-28 w-full" strokeWidth={2} d={["M10 100 C 60 10, 160 10, 250 70", "M236 56 L 252 72 L 230 76"]} />
      </Layer>
    </Scene>
  );
}

function BuildScene() {
  return (
    <Scene data={scene("build")}>
      <Layer name="Code" enter="up" depth={0.35} rotate={1.5} className="right-4 top-[11%] w-[min(30rem,calc(100vw-2.5rem))] md:right-[5%]">
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

      <Layer name="Chat" enter="left" depth={0.6} className="right-[34%] top-[46%] hidden w-72 lg:block">
        <div className="space-y-2">
          <p className="ml-auto w-fit rounded-2xl rounded-br-sm bg-paper-raised px-4 py-2 text-ink">Where&apos;s the Q3 safety report?</p>
          <p className="w-fit rounded-2xl rounded-bl-sm bg-accent px-4 py-2 text-paper">Found it, with 3 sources ↗</p>
        </div>
      </Layer>

      <Layer name="Terminal" enter="right" depth={0.7} rotate={-2} className="right-4 top-[54%] md:right-[5%] md:top-[62%]">
        <Scrap tone="dark" seed={0.58} className="px-5 py-4 font-mono text-sm">
          <p className="text-muted">$ vercel --prod</p>
          <p className="mt-1 text-ink">
            <span className="text-accent">✓</span> Deployed to bysuraj.in in 41s
          </p>
        </Scrap>
      </Layer>

      <Layer name="Stamp" enter="spin" depth={0.9} className="right-[3%] top-[40%] hidden w-32 md:block">
        <Stamp text="SHIPPED · SHIPPED · SHIPPED · " />
      </Layer>
    </Scene>
  );
}

function DevelopScene() {
  const data = scene("develop");
  return (
    <Scene
      data={data}
      copy={
        <>
          <p className="label text-accent">
            {data.act} — {data.marker}
          </p>
          <h2 className="display mt-3 text-[2.75rem] leading-[0.92] text-ink sm:text-7xl">{data.title}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{data.body}</p>
          <Link href="/film" className="link-underline mt-5 inline-flex font-mono text-sm uppercase tracking-wider text-ink">
            Open the contact sheet →
          </Link>
        </>
      }
    >
      <Layer name="Film strip" enter="left" depth={0.4} rotate={-4} className="right-4 top-[13%] w-[min(40rem,calc(100vw-2.5rem))] md:right-[3%]">
        <FilmStrip>
          {filmFrames.slice(0, 3).map((f, i) => (
            <figure key={f.title} className="relative flex-1">
              <ShaderFrame seed={f.seed} src={f.src} alt={f.title} sizes="14rem" className="aspect-[7/6]" />
              <figcaption className="mt-1 font-mono text-sm text-faint">{f.stock}</figcaption>
              {i === 1 && (
                <Scribble viewBox="0 0 100 100" className="pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]" d="M50 4 C 90 4, 98 40, 94 60 C 88 94, 20 98, 8 70 C -2 44, 14 6, 56 8" />
              )}
            </figure>
          ))}
        </FilmStrip>
      </Layer>
      <Layer name="Keeper note" enter="drop" depth={0.8} rotate={-6} className="right-[24%] top-[50%] hidden md:block">
        <p className="display text-4xl italic text-accent">keeper!</p>
      </Layer>
      <Layer name="Camera tag" enter="right" depth={0.6} rotate={3} drag className="right-[4%] top-[58%] hidden md:block">
        <Scrap tone="light" seed={0.71} className="px-4 py-3 font-mono text-sm uppercase">
          {camera.name} · 6×7 · Portra 400
        </Scrap>
        <Tape className="-top-3 left-6" rotate={-10} seed={0.2} />
      </Layer>
    </Scene>
  );
}

const cutPositions = [
  { cls: "left-5 top-[10%] w-[42%] md:left-auto md:right-[40%] md:top-[11%] md:w-[19rem]", rotate: -5 },
  { cls: "right-5 top-[13%] w-[42%] md:right-[8%] md:top-[9%] md:w-[19rem]", rotate: 4 },
  { cls: "left-[29%] top-[41%] w-[42%] md:left-auto md:right-[22%] md:top-[50%] md:w-[19rem]", rotate: -2 },
];

function FinalCutScene() {
  return (
    <Scene data={scene("work")}>
      {projects.map((p, i) => (
        <Layer key={p.slug} name={`Case ${p.no}`} enter={(["drop", "right", "up"] as const)[i]} depth={0.4 + i * 0.15} rotate={cutPositions[i].rotate} className={`z-20 ${cutPositions[i].cls}`}>
          <Link
            href={`/work/${p.slug}`}
            data-cursor="View"
            className="display-hover group block transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.03]"
          >
            <ShaderFrame seed={p.seed} src={p.cover} alt={`${p.title} — cover`} sizes="20rem" className="aspect-[4/3]" />
            <Scrap tone="light" seed={0.2 + i * 0.3} className="-mt-3 ml-3 mr-[-0.5rem] p-3 sm:p-4">
              <p className="font-mono text-sm uppercase text-paper/60">
                {p.no} · {p.client}
              </p>
              <p className="display mt-1 text-lg leading-tight sm:text-2xl">{p.title}</p>
            </Scrap>
          </Link>
          <Tape className="-top-3 left-1/3" rotate={i % 2 ? 6 : -6} seed={0.3 + i * 0.2} />
        </Layer>
      ))}
    </Scene>
  );
}

/** The home page's story, in order. StoryStage turns these into a scroll-driven piece. */
export default function StoryScenes() {
  return (
    <>
      <OpenScene />
      <BriefScene />
      <StoryboardScene />
      <DesignScene />
      <AnimateScene />
      <BuildScene />
      <DevelopScene />
      <FinalCutScene />
    </>
  );
}
