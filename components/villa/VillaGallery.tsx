"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function VillaGallery({
  images,
  gradient,
  count,
  villaName,
  dict,
}: {
  images: string[];
  gradient: [string, string];
  count: number;
  villaName: string;
  dict: Dictionary["villaDetail"];
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photoCount = images.length > 0 ? images.length : count;
  const thumbCount = Math.min(4, Math.max(photoCount - 1, 0));
  const extra = photoCount - 1 - thumbCount;

  const photoAlt = (n: number) =>
    dict.photoAlt
      .replace("{name}", villaName)
      .replace("{n}", String(n))
      .replace("{count}", String(photoCount));

  if (images.length > 0) {
    return (
      <>
        <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-2xl sm:aspect-[21/9] sm:grid-cols-4 sm:grid-rows-2 sm:gap-2">
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            aria-label={photoAlt(1)}
            className="relative block aspect-[4/3] w-full cursor-pointer border-0 bg-transparent p-0 text-left sm:col-span-2 sm:row-span-2 sm:aspect-auto"
          >
            <Image
              src={images[0]}
              alt={photoAlt(1)}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </button>
          {images.slice(1, 1 + thumbCount).map((src, i) => {
            const isLastThumb = i === thumbCount - 1;
            const openAt = isLastThumb && extra > 0 ? 1 + thumbCount : i + 1;
            return (
              <button
                type="button"
                key={src}
                onClick={() => setLightboxIndex(openAt)}
                aria-label={photoAlt(i + 2)}
                className="relative block aspect-[4/3] w-full cursor-pointer border-0 bg-transparent p-0 text-left sm:aspect-auto"
              >
                <Image
                  src={src}
                  alt={photoAlt(i + 2)}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover"
                />
                {isLastThumb && extra > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold text-white">
                    {dict.morePhotos.replace("{count}", String(extra))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onIndexChange={setLightboxIndex}
            photoAlt={photoAlt}
            dict={dict}
          />
        )}
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-2xl sm:aspect-[21/9] sm:grid-cols-4 sm:grid-rows-2 sm:gap-2">
      <PlaceholderImage
        gradient={gradient}
        alt={photoAlt(1)}
        className="aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:h-full"
      />
      {Array.from({ length: thumbCount }).map((_, i) => (
        <div key={i} className="relative">
          <PlaceholderImage
            gradient={gradient}
            alt={photoAlt(i + 2)}
            className="aspect-[4/3] h-full w-full opacity-90 sm:aspect-auto"
          />
          {i === thumbCount - 1 && extra > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold text-white">
              {dict.morePhotos.replace("{count}", String(extra))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
  photoAlt,
  dict,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  photoAlt: (n: number) => string;
  dict: Dictionary["villaDetail"];
}) {
  const total = images.length;
  const goPrev = useCallback(
    () => onIndexChange((index - 1 + total) % total),
    [index, total, onIndexChange]
  );
  const goNext = useCallback(
    () => onIndexChange((index + 1) % total),
    [index, total, onIndexChange]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [goPrev, goNext, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={dict.lightboxClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label={dict.lightboxPrevious}
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
      )}

      <div
        className="relative h-full max-h-[85vh] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={photoAlt(index + 1)}
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-contain"
          priority
        />
      </div>

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label={dict.lightboxNext}
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      )}

      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white">
          {dict.lightboxCounter
            .replace("{n}", String(index + 1))
            .replace("{count}", String(total))}
        </div>
      )}
    </div>
  );
}
