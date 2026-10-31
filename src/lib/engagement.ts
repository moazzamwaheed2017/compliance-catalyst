import { firstTouch } from "@/lib/cta";

const SESSION_KEY = "rl_session";
/** Ignore anything longer than this for one page view (e.g. a laptop left open). */
const MAX_SECONDS = 4 * 60 * 60;

type View = { id: string; page: string; activeMs: number; visibleSince: number | null };

let view: View | null = null;
let listening = false;

function randomId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

/** Anonymous id for this browser tab's visit (cleared when the tab closes). */
function sessionId() {
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = randomId();
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "no-storage";
  }
}

function activeSeconds(v: View) {
  const running = v.visibleSince === null ? 0 : performance.now() - v.visibleSince;
  return Math.min(MAX_SECONDS, Math.round((v.activeMs + running) / 1000));
}

/** Send the current page view's visible time; the server keeps the latest value per view. */
function flush() {
  if (!view) return;
  const seconds = activeSeconds(view);
  if (seconds < 1) return;
  const { utm_source, utm_medium, utm_campaign, landing } = firstTouch();
  const body = JSON.stringify({
    viewId: view.id,
    sessionId: sessionId(),
    page: view.page,
    seconds,
    landing,
    referrer: document.referrer || "",
    utm_source,
    utm_medium,
    utm_campaign,
  });
  try {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon?.("/api/public/engagement", blob)) return;
  } catch {
    // fall through to fetch
  }
  fetch("/api/public/engagement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

function onVisibilityChange() {
  if (!view) return;
  if (document.visibilityState === "hidden") {
    if (view.visibleSince !== null) {
      view.activeMs += performance.now() - view.visibleSince;
      view.visibleSince = null;
    }
    flush();
  } else if (view.visibleSince === null) {
    view.visibleSince = performance.now();
  }
}

/** Start timing a page view; sends the previous page's time first. Counts visible time only. */
export function trackPageView(page: string) {
  if (typeof window === "undefined") return;
  if (!listening) {
    listening = true;
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", flush);
  }
  flush();
  view = {
    id: randomId(),
    page: page.slice(0, 200),
    activeMs: 0,
    visibleSince: document.visibilityState === "visible" ? performance.now() : null,
  };
}
