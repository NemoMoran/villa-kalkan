import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "outline-light";

const variantClasses: Record<Variant, string> = {
  // Uses brand-dark (not brand) for the solid fill: white text on brand
  // (#ff385c) is only ~3.5:1 contrast, below WCAG AA's 4.5:1 for normal
  // text. brand-dark (#e31c5f) clears 4.5:1. brand itself stays reserved
  // for accents/icons/large text where 3:1 is the applicable threshold.
  primary: "bg-brand-dark text-white hover:brightness-90",
  secondary: "bg-surface-muted text-ink hover:bg-border",
  outline: "border border-border text-ink hover:border-ink",
  "outline-light": "border border-white/70 text-white hover:bg-white/10",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  external?: boolean;
};

export function LinkButton({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
