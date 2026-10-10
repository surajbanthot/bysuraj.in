import Reveal from "@/components/Reveal";

type SectionHeadingProps = {
  no: string;
  title: React.ReactNode;
  kicker?: string;
};

/** Shared section header: index number + oversized display title over a rule. */
export default function SectionHeading({ no, title, kicker }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-baseline gap-5">
          <span className="label text-accent">{no}</span>
          <h2 className="display text-5xl leading-none text-ink sm:text-7xl">{title}</h2>
        </div>
        {kicker && <span className="label hidden pb-2 sm:block">{kicker}</span>}
      </div>
    </Reveal>
  );
}
