import type { ReactNode } from "react";

/** A length of 120 film with sprocket rebates top and bottom; frames go in as children. */
export default function FilmStrip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`paper bg-paper p-2 shadow-2xl ${className}`}>
      <div className="sprockets h-3" />
      <div className="flex gap-2 py-2">{children}</div>
      <div className="sprockets h-3" />
    </div>
  );
}
