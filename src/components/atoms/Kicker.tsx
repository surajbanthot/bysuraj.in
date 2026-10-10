import type { ReactNode } from "react";

/**
 * The accent marginalia above a heading — "09 — Credits". Pass `no` for an
 * act/section number, or just children for a plain kicker.
 */
export default function Kicker({
  no,
  as: Tag = "p",
  className = "",
  children,
}: {
  no?: string;
  as?: "p" | "span";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Tag className={`label text-accent ${className}`}>
      {no}
      {no && children ? " — " : null}
      {children}
    </Tag>
  );
}
