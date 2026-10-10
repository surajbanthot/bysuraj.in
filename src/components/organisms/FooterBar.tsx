import Anchor from "@/components/atoms/Anchor";
import TextLink from "@/components/atoms/TextLink";
import { SITE, socials } from "@/lib/portfolioData";

export default function FooterBar() {
  return (
    <footer data-site-footer className="border-t border-border px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <TextLink href={`mailto:${SITE.email}`} className="font-mono text-sm text-ink">
            {SITE.email}
          </TextLink>
          <p className="label">
            © {new Date().getFullYear()} {SITE.fullName} · Designed and built in Bengaluru
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {socials.map((s) => (
            <Anchor key={s.label} href={s.href} className="label transition-colors hover:!text-accent">
              {s.label} ↗
            </Anchor>
          ))}
          <a href="#top" className="label transition-colors hover:!text-accent">
            ↑ Top
          </a>
        </div>
      </div>
    </footer>
  );
}
