import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Anchor from "@/components/atoms/Anchor";

export type ButtonVariant = "primary" | "outline" | "accent" | "quiet";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex shrink-0 items-center justify-center rounded-full font-mono text-sm uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-accent disabled:hover:bg-ink",
  outline: "border border-border text-ink hover:border-accent hover:text-accent",
  accent: "border border-accent bg-accent text-paper",
  quiet: "border border-border text-muted hover:border-accent hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 px-3",
  md: "gap-2 px-5 py-2.5",
  lg: "gap-3 px-7 py-3.5",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Toggle state. Sets aria-pressed and switches to the accent look while on. */
  pressed?: boolean;
  /** Trailing glyph (arrow etc.), hidden from screen readers. */
  icon?: ReactNode;
  /** Square button holding only an icon — give it an aria-label. */
  iconOnly?: boolean;
  className?: string;
  children?: ReactNode;
};

type AsButton = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };
type AsLink = CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

/** The pill button. Renders a link when given `href`, otherwise a <button>. */
export default function Button(props: AsButton | AsLink) {
  const { variant = "primary", size = "md", pressed, icon, iconOnly, className = "", children, ...rest } = props;
  const classes = [
    base,
    variants[pressed ? "accent" : variant],
    iconOnly ? "h-9 w-9" : sizes[size],
    className,
  ].join(" ");
  const content = (
    <>
      {children}
      {icon && <span aria-hidden="true">{icon}</span>}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <Anchor {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} href={rest.href} className={classes}>
        {content}
      </Anchor>
    );
  }
  const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} aria-pressed={pressed} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
