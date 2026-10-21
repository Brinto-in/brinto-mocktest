// Poster images for tests, keyed by test id, until the API returns an image.
// Paths are relative to /public; the site base (/mocktest) is added here.
const images: Record<string, string> = {
  "11": "/images/osssc.png", // OSSSC RI/ICDS/VAW/JA/ARI/Amin/SFS Mock Test 2026
  "osssc-typing": "/images/osssc-typing.png", // static entry, see staticTrending.ts
};

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function testImage(id: unknown, apiImage?: string): string {
  if (apiImage) return apiImage;
  const path = images[String(id)];
  return path ? `${base}${path}` : "";
}
