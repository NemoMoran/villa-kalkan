type PlaceholderImageProps = {
  gradient: [string, string];
  label?: string;
  /** Meaningful description for this stand-in image. Omit for purely decorative uses. */
  alt?: string;
  className?: string;
  /** Hide the villa glyph, e.g. for small thumbnails or busy layouts. */
  plain?: boolean;
};

/**
 * Stand-in for real villa photography. Layered gradients + a soft light
 * bloom + wave lines keep it feeling designed rather than unfinished.
 * Swap for <Image> once real photos are available.
 */
export function PlaceholderImage({
  gradient,
  label,
  alt,
  className = "",
  plain = false,
}: PlaceholderImageProps) {
  const [from, to] = gradient;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 20% 0%, rgba(255,255,255,0.28), transparent 55%), linear-gradient(150deg, ${from}, ${to})`,
      }}
      role={alt ? "img" : undefined}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
    >
      {/* Wave lines along the bottom */}
      <svg
        className="absolute inset-x-0 bottom-0 h-1/3 w-full"
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 60 Q 50 40 100 60 T 200 60 T 300 60 T 400 60"
          stroke="white"
          strokeOpacity="0.18"
          strokeWidth="2"
        />
        <path
          d="M0 80 Q 50 60 100 80 T 200 80 T 300 80 T 400 80"
          stroke="white"
          strokeOpacity="0.12"
          strokeWidth="2"
        />
      </svg>

      {!plain && (
        <svg
          width="16%"
          height="16%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeOpacity="0.8"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm"
          aria-hidden="true"
        >
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
        </svg>
      )}

      {label && (
        <span className="absolute bottom-2 right-3 rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
