export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-gold/15 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
      [{children}]
    </span>
  );
}
