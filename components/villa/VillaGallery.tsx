import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function VillaGallery({
  gradient,
  count,
  villaName,
}: {
  gradient: [string, string];
  count: number;
  villaName: string;
}) {
  const thumbCount = Math.min(4, Math.max(count - 1, 0));
  const extra = count - 1 - thumbCount;

  return (
    <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-2xl sm:grid-cols-4 sm:grid-rows-2 sm:gap-2">
      <PlaceholderImage
        gradient={gradient}
        alt={`${villaName}, photo 1 of ${count}`}
        className="aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:h-full"
      />
      {Array.from({ length: thumbCount }).map((_, i) => (
        <div key={i} className="relative">
          <PlaceholderImage
            gradient={gradient}
            alt={`${villaName}, photo ${i + 2} of ${count}`}
            className="aspect-[4/3] h-full w-full opacity-90 sm:aspect-auto"
          />
          {i === thumbCount - 1 && extra > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold text-white">
              +{extra} more
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
