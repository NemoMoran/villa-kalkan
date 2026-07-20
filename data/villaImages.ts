import fs from "fs";
import path from "path";
import type { Villa } from "./villas.schema";
import { villas, getVillaBySlug } from "./villas";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Reads public/images/villas/<slug>/ and returns the web paths of every
 * image file there, naturally sorted (01.jpg, 02.jpg, ... 10.jpg) so filename
 * order controls display order. Drop photos in that folder — no data-file
 * edit needed. Returns [] (falling back to the gradient placeholder) if the
 * folder doesn't exist yet.
 *
 * This reads from the filesystem (fs/path), so it's kept out of
 * data/villas.ts — that module is imported by VillaCard, which is rendered
 * inside the "use client" VillasExplorer, and Node builtins can't be bundled
 * for the browser. Only import this file from Server Components.
 */
function loadVillaImages(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", "villas", slug);
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/images/villas/${slug}/${file}`);
}

function withImages(villa: Villa): Villa {
  return { ...villa, images: loadVillaImages(villa.slug) };
}

export function getVillasWithImages(): Villa[] {
  return villas.map(withImages);
}

export function getFeaturedVillasWithImages(): Villa[] {
  return getVillasWithImages().filter((villa) => villa.featured);
}

export function getVillaWithImagesBySlug(slug: string): Villa | undefined {
  const villa = getVillaBySlug(slug);
  return villa ? withImages(villa) : undefined;
}
