import type { ReactNode } from "react";
import type { AmenityKey } from "@/data/villas.schema";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons: Record<AmenityKey, ReactNode> = {
  privatePool: (
    <svg {...iconProps}>
      <path d="M2 17c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0" />
      <path d="M2 21c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0" />
      <path d="M14 4v9M8 4v9M8 7h6M8 11h6" />
    </svg>
  ),
  privateInfinityPool: (
    <svg {...iconProps}>
      <path d="M2 17c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0" />
      <path d="M2 21c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0" />
      <path d="M14 4v9M8 4v9M8 7h6M8 11h6" />
    </svg>
  ),
  rooftopPool: (
    <svg {...iconProps}>
      <path d="M2 17c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0" />
      <path d="M2 21c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0" />
      <path d="M14 4v9M8 4v9M8 7h6M8 11h6" />
    </svg>
  ),
  seaView: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
    </svg>
  ),
  mountainView: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
    </svg>
  ),
  wifi: (
    <svg {...iconProps}>
      <path d="M5 12.5a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  ),
  ac: (
    <svg {...iconProps}>
      <path d="M12 3v18M5.5 6.5l13 11M18.5 6.5l-13 11" />
    </svg>
  ),
  kitchen: (
    <svg {...iconProps}>
      <path d="M4 3v7a2 2 0 0 0 2 2v9M8 3v7a2 2 0 0 1-2 2M8 3v4M16 3c-1.5 1.5-2 3.5-2 5v2h4V8c0-1.5-.5-3.5-2-5zM16 12v9" />
    </svg>
  ),
  parking: (
    <svg {...iconProps}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 16V8h4a2.5 2.5 0 0 1 0 5H9" />
    </svg>
  ),
  bbq: (
    <svg {...iconProps}>
      <path d="M5 10h14a7 7 0 0 1-14 0zM12 17v4M8.5 15.5 6 21M15.5 15.5 18 21" />
      <path d="M9 6c0-1 .5-1 .5-2M13 6c0-1 .5-1 .5-2" />
    </svg>
  ),
  garden: (
    <svg {...iconProps}>
      <path d="M12 21V9M12 9c0-3.5 2.5-6 6-6 0 3.5-2.5 6-6 6zM12 13c0-2.5-2-4.5-5-4.5 0 2.5 2 4.5 5 4.5z" />
    </svg>
  ),
  housekeeping: (
    <svg {...iconProps}>
      <path d="M19 4 9 14M9 14l-4.5 6L11 16.5M9 14l2.5 2.5" />
    </svg>
  ),
};

export function AmenitiesList({
  amenityKeys,
  dict,
}: {
  amenityKeys: AmenityKey[];
  dict: Dictionary["amenities"];
}) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {amenityKeys.map((key) => (
        <li
          key={key}
          className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-ink"
        >
          <span className="text-brand">{icons[key]}</span>
          {dict[key]}
        </li>
      ))}
    </ul>
  );
}
