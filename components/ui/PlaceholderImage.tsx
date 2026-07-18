type PlaceholderImageProps = {
  gradient: [string, string];
  label?: string;
  /** Meaningful description for this stand-in image. Omit for purely decorative uses. */
  alt?: string;
  className?: string;
};

export function PlaceholderImage({
  gradient,
  label,
  alt,
  className = "",
}: PlaceholderImageProps) {
  const [from, to] = gradient;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      role={alt ? "img" : undefined}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
    >
      <svg
        width="20%"
        height="20%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeOpacity="0.85"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-sm"
        aria-hidden="true"
      >
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
      </svg>
      {label && (
        <span className="absolute bottom-2 right-3 text-[10px] font-medium uppercase tracking-wide text-white/70">
          {label}
        </span>
      )}
    </div>
  );
}
