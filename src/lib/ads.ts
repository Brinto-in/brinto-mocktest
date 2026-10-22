// Google AdSense fixed-size units. Add new sizes here after creating them in AdSense.
// Units with an empty slot are skipped by <GAd> until a slot ID is filled in.
export const AD_CLIENT = "ca-pub-2802077463779448";

export const AD_UNITS = {
  "728x90": { slot: "5770582790", width: 728, height: 90 },
  "320x100": { slot: "4569181768", width: 320, height: 100 },
  "300x250": { slot: "9765668120", width: 300, height: 250 },
  "300x600": { slot: "8205174440", width: 300, height: 600 },
  // Custom size for the MCQ question column (610px wide).
  "600x90": { slot: "3564357327", width: 600, height: 90 },
  // Custom size for the MCQ right panel (340px wide).
  "340x280": { slot: "3835820062", width: 340, height: 280 },
  // Wide skyscraper for the exam page side rails (laptop widths).
  "160x600": { slot: "2487079376", width: 160, height: 600 },
} as const;

export type AdSizeKey = keyof typeof AD_UNITS;

// Breakpoints used by <GAd sizes={...}>: mobile < 768px ≤ tablet < 1024px ≤ desktop.
export const AD_BREAKPOINTS = { tablet: 768, desktop: 1024 } as const;
export type AdBreakpoint = "mobile" | "tablet" | "desktop";
