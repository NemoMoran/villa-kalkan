import type { ReactNode } from "react";

type BadgeTone = "neutral" | "success" | "warning";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface-muted text-ink-muted",
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
};

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
