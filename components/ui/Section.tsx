import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  muted?: boolean;
};

export function Section({ children, className = "", muted = false }: SectionProps) {
  return (
    <section className={muted ? "bg-surface-muted" : undefined}>
      <div className={`mx-auto max-w-6xl px-6 py-16 sm:py-20 ${className}`}>
        {children}
      </div>
    </section>
  );
}
