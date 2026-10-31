import { SANDBOX_URL } from "@/lib/booking";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "rl_first_touch";

type FirstTouch = Partial<Record<(typeof UTM_KEYS)[number], string>> & { landing?: string };

/** Campaign tags from the visitor's first page this session (e.g. a YouTube ad link). */
export function firstTouch(): FirstTouch {
  if (typeof window === "undefined") return {};
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as FirstTouch;
    const params = new URLSearchParams(window.location.search);
    const touch: FirstTouch = { landing: window.location.pathname };
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) touch[key] = value.slice(0, 100);
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(touch));
    return touch;
  } catch {
    return {};
  }
}

/** Remember campaign tags as soon as the visitor lands, before they navigate away. */
export function captureFirstTouch() {
  firstTouch();
}

/** Record a call-to-action click (no personal data), e.g. `trackCta("sandbox", "hero")`. */
export function trackCta(cta: "demo" | "sandbox" | "request" | "video" | "readiness", placement: string) {
  if (typeof window === "undefined") return;
  const body = JSON.stringify({
    cta,
    placement,
    page: window.location.pathname,
    referrer: document.referrer || "",
    ...firstTouch(),
  });
  try {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon?.("/api/public/cta-click", blob)) return;
  } catch {
    // fall through to fetch
  }
  fetch("/api/public/cta-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

/** Sandbox link carrying the visitor's campaign so sign-ups can be attributed. */
export function sandboxHref(placement: string) {
  const url = new URL(SANDBOX_URL);
  const touch = firstTouch();
  url.searchParams.set("utm_source", touch.utm_source ?? "regulattice.com");
  url.searchParams.set("utm_medium", touch.utm_medium ?? "website");
  if (touch.utm_campaign) url.searchParams.set("utm_campaign", touch.utm_campaign);
  url.searchParams.set("utm_content", placement);
  return url.toString();
}
