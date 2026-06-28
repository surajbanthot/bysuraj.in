import Reveal from "@/components/Reveal";

type SectionHeadingProps = {
  no: string;
  title: string;
  kicker?: string;
};

/** Shared editorial section header: index number + display title over a rule. */
export default function SectionHeading({ no, title, kicker }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-baseline gap-4">
          <span className="label">{no}</span>
          <h2 className="display text-3xl text-ink sm:text-5xl">{title}</h2>
        </div>
        {kicker && <span className="label hidden sm:block">{kicker}</span>}
      </div>
    </Reveal>
  );
}
