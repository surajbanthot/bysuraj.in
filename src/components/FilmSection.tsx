import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { FilmContactSheet } from "@/components/PortfolioInteractions";

export default function FilmSection() {
  return (
    <section id="film" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading no="06" title="Film" kicker="Analogue · Medium format" />

      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
            I shoot medium-format film to slow down — to compose with intent and embrace
            the physicality of the process.
          </p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              A larger negative than 35mm means richer tonal transitions, cleaner detail,
              and a distinctive sense of depth. Fewer frames per roll, more intention per
              click, and a tangible connection to the image once it&apos;s developed.
            </p>
            <p>
              I chase quiet light, strong geometry, and subjects that benefit from
              texture. Film rewards subtlety, so I look for moments that feel honest and
              tactile.
            </p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-5" delay={120}>
          <div className="space-y-6 border-l border-border pl-6">
            <div className="film-fact">
              <h3 className="label text-ink">The Camera</h3>
              <p className="mt-1 font-display text-2xl text-ink">Pentax 67II</p>
              <p className="mt-2 text-lg leading-relaxed text-muted">
                A classic 6×7 system — feels like a tank, shoots like a large SLR.
              </p>
            </div>
            <div className="film-fact">
              <h3 className="label text-ink">Process</h3>
              <p className="mt-2 text-lg leading-relaxed text-muted">
                Meter carefully, compose patiently, keep notes per roll. The goal is
                consistency and character, not speed.
              </p>
            </div>
            <a
              href="https://www.instagram.com/bysuraj.in/"
              target="_blank"
              rel="noreferrer"
              className="micro-link link-underline inline-flex font-mono text-sm uppercase tracking-widest text-ink"
            >
              <span>See frames on Instagram</span>
              <span className="micro-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14" delay={80}>
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="label">Contact sheet</span>
          <span className="label">Notes from the darkroom</span>
        </div>
        <FilmContactSheet />
      </Reveal>
    </section>
  );
}
