/** Public Google Calendar appointment booking page for ReguLattice demos. */
export const BOOKING_URL = "https://calendar.app.google/L1svGwNuqiXdjUg38";

/**
 * Embeddable version of the booking page, shown inside the booking window.
 *
 * Google Calendar short links (calendar.app.google/…) can't be shown inside another site,
 * so set this to the embed URL from Google Calendar → your appointment schedule → Share →
 * "Website embed" → "Inline calendar". It looks like:
 *   https://calendar.google.com/calendar/appointments/schedules/<ID>?gv=true
 * Until it is set, the booking window shows a button that opens BOOKING_URL in a new tab.
 */
export const BOOKING_EMBED_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2ytRSFr9SDHtzHxTiuXvfSSItzDFY60s8lG8dQjeRqU6PgoU754EQzcz5nMbRy1OR1DNUGybCe?gv=true";

export const canEmbedBooking = BOOKING_EMBED_URL.includes("/appointments/schedules/");

/** Developer sandbox (14-day trial) sign-up page. */
export const SANDBOX_URL = "https://sandbox.regulattice.com/sandbox";
