import Anchor, { type AnchorProps } from "@/components/atoms/Anchor";

/**
 * An inline link with the accent underline that draws in on hover. `mono`
 * gives the small uppercase call-to-action style.
 */
export default function TextLink({ mono, className = "", ...rest }: AnchorProps & { mono?: boolean }) {
  return (
    <Anchor
      className={`link-underline ${mono ? "inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-ink" : ""} ${className}`}
      {...rest}
    />
  );
}
