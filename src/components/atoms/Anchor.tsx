import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * The one place links are decided: external URLs open in a new tab, internal
 * routes use next/link, and everything else (#anchors, mailto:, files) is a
 * plain <a>.
 */
export default function Anchor({ href, ...rest }: AnchorProps) {
  if (isExternal(href)) return <a href={href} target="_blank" rel="noreferrer" {...rest} />;
  // Route links get client navigation; files like the résumé PDF stay plain links.
  if (href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0])) return <Link href={href} {...rest} />;
  return <a href={href} {...rest} />;
}
