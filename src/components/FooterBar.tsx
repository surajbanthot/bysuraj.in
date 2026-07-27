import { SITE } from "@/lib/portfolioData";

const footerSocials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bysuraj.in/",
  },
  {
    label: "X",
    href: "https://x.com/SurajBanthot",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@bysuraj.in",
  },
];

export default function FooterBar() {
  return (
    <footer
      data-site-footer
      className="relative z-10 border-t border-border bg-paper px-5 py-10 sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <a
            href={`mailto:${SITE.email}`}
            className="link-underline font-mono text-sm text-ink"
          >
            {SITE.email}
          </a>
          <p className="label">
            {SITE.location} — Est. {SITE.estYear}
          </p>
        </div>

        <div className="flex items-center gap-5">
          {footerSocials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="label !text-muted transition-colors hover:!text-accent"
            >
              {s.label} ↗
            </a>
          ))}
          <a href="#top" className="label transition-colors hover:text-accent">
            ↑ Top
          </a>
        </div>
      </div>

      <p className="label mt-8">© {SITE.estYear}–26 {SITE.fullName} · Designed and built in Bengaluru</p>
    </footer>
  );
}
