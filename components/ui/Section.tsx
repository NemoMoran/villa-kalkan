import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  muted?: boolean;
  dark?: boolean;
};

export function Section({
  children,
  className = "",
  muted = false,
  dark = false,
}: SectionProps) {
  const bg = dark ? "bg-navy" : muted ? "bg-surface-muted" : undefined;
  return (
    <section className={bg}>
      <div className={`mx-auto max-w-6xl px-6 py-16 sm:py-24 ${className}`}>
        {children}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${
            dark ? "text-white/60" : "text-gold"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display mt-3 text-3xl sm:text-4xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 ${dark ? "text-white/70" : "text-ink-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
