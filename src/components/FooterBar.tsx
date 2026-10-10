import { SITE, socials } from "@/lib/portfolioData";

export default function FooterBar() {
  return (
    <footer data-site-footer className="border-t border-border px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <a href={`mailto:${SITE.email}`} className="link-underline font-mono text-sm text-ink">
            {SITE.email}
          </a>
          <p className="label">
            © {new Date().getFullYear()} {SITE.fullName} · Designed and built in Bengaluru
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="label transition-colors hover:!text-accent"
            >
              {s.label} ↗
            </a>
          ))}
          <a href="#top" className="label transition-colors hover:!text-accent">
            ↑ Top
          </a>
        </div>
      </div>
    </footer>
  );
}
