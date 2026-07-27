import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading no="02" title="About" kicker="The design–code overlap" />

      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <p className="font-display text-2xl leading-snug text-ink sm:text-4xl">
            I build the front end from{" "}
            <span className="text-accent">pixel to production</span> — and I shoot
            medium-format film to keep my eye honest.
          </p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m a design engineer working where craft meets code. For the last
              several years I&apos;ve shipped React and Next.js interfaces for teams like
              Microsoft Teams and PrathamBooks — and I&apos;m now building conversational
              AI at Quantzig, wiring RAG and LLMs into products people actually talk to.
            </p>
            <p>
              Away from the screen I work in cinematography and motion, and I photograph
              on a Pentax 67II. The thread through all of it is the same: slow down,
              compose with intent, and care about the last 10%.
            </p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-4" delay={120}>
          <dl className="space-y-6 border-l border-border pl-6">
            {[
              ["Now", "Full-stack & conversational AI, Quantzig"],
              ["Based", "Bengaluru, India"],
              ["Shoots", "Medium-format film, Pentax 67II"],
              ["Also", "Cinematography · Motion · Rive"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label">{k}</dt>
                <dd className="mt-1 text-lg text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
