import { SITE } from "@/lib/portfolioData";

const footerSocials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bysuraj.in/",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </>
    ),
    fill: false,
  },
  {
    label: "X",
    href: "https://x.com/SurajBanthot",
    path: (
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
    ),
    fill: true,
    viewBox: "0 0 16 16",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@bysuraj.in",
    path: (
      <>
        <path d="M6.81 9.204c0-.41.197-1.062 1.727-1.062.469 0 .758.034 1.146.121-.124 1.606-.91 1.818-1.674 1.818-.418 0-1.2-.218-1.2-.877Z" />
        <path d="M2.59 16h10.82A2.59 2.59 0 0 0 16 13.41V2.59A2.59 2.59 0 0 0 13.41 0H2.59A2.59 2.59 0 0 0 0 2.59v10.82A2.59 2.59 0 0 0 2.59 16M5.866 5.91c.567-.81 1.315-1.126 2.35-1.126.73 0 1.351.246 1.795.711.443.466.696 1.132.754 1.983q.368.154.678.363c.832.559 1.29 1.395 1.29 2.353 0 2.037-1.67 3.806-4.692 3.806-2.595 0-5.291-1.51-5.291-6.004C2.75 3.526 5.361 2 8.033 2c1.234 0 4.129.182 5.217 3.777l-1.02.264c-.842-2.56-2.607-2.968-4.224-2.968-2.675 0-4.187 1.628-4.187 5.093 0 3.107 1.69 4.757 4.222 4.757 2.083 0 3.636-1.082 3.636-2.667 0-1.079-.906-1.595-.953-1.595-.177.925-.651 2.482-2.733 2.482-1.213 0-2.26-.838-2.26-1.936 0-1.568 1.488-2.136 2.663-2.136.44 0 .97.03 1.247.086 0-.478-.404-1.296-1.426-1.296-.911 0-1.16.288-1.45.624l-.024.027c-.202-.135-.875-.601-.875-.601Z" />
      </>
    ),
    fill: true,
    viewBox: "0 0 16 16",
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
              className="text-muted transition-colors hover:text-accent"
            >
              <svg
                width="22"
                height="22"
                viewBox={s.viewBox ?? "0 0 24 24"}
                fill={s.fill ? "currentColor" : "none"}
                stroke={s.fill ? "none" : "currentColor"}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {s.path}
              </svg>
            </a>
          ))}
          <a href="#top" className="label transition-colors hover:text-accent">
            ↑ Top
          </a>
        </div>
      </div>

      <p className="label mt-8">© {SITE.estYear}–26 {SITE.name} · Built in Next.js</p>
    </footer>
  );
}
