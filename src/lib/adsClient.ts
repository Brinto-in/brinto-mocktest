// Browser-side AdSense helpers shared by <GAd> and <GAdRails>.

type W = Window & { adsbygoogle?: unknown[] };

export interface AdUnitInfo {
  slot: string;
  width: number;
  height: number;
}

// Load the AdSense library once if the page doesn't already include it.
export function ensureAdLoader(client: string) {
  if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;
  const s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
  document.head.appendChild(s);
}

// Insert one fixed-size ad into `box` and ask AdSense to fill it.
export function renderAd(box: HTMLElement, unit: AdUnitInfo, client: string, test?: string) {
  ensureAdLoader(client);

  const ins = document.createElement("ins");
  ins.className = "adsbygoogle";
  ins.style.display = "inline-block";
  ins.style.width = `${unit.width}px`;
  ins.style.height = `${unit.height}px`;
  ins.dataset.adClient = client;
  ins.dataset.adSlot = unit.slot;
  if (test) ins.dataset.adtest = test;
  box.appendChild(ins);

  try {
    ((window as W).adsbygoogle = (window as W).adsbygoogle || []).push({});
  } catch (err) {
    console.warn("AdSense push failed:", err);
  }
}
