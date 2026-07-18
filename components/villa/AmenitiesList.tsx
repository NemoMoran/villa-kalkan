export function AmenitiesList({ amenities }: { amenities: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {amenities.map((amenity) => (
        <li key={amenity} className="flex items-center gap-2 text-sm text-ink">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-brand"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          {amenity}
        </li>
      ))}
    </ul>
  );
}
