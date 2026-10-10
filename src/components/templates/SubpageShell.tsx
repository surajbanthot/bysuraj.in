import type { ReactNode } from "react";

/**
 * Layout for pages outside the story (/film, /work/[slug]): clears the fixed
 * nav and centres content in the site container. `after` renders full-bleed
 * below the container (e.g. the next-case link).
 */
export default function SubpageShell({ children, after }: { children: ReactNode; after?: ReactNode }) {
  return (
    <main id="top" className="pt-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
      {after}
    </main>
  );
}
