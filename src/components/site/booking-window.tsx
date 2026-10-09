import { CalendarDays, ExternalLink, Loader2, Mail } from "lucide-react";
import { useState } from "react";

import logoAsset from "@/assets/regulattice-logo.jpg";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { BOOKING_EMBED_URL, BOOKING_URL, canEmbedBooking } from "@/lib/booking";

/**
 * Light-themed window that shows the Google Calendar booking page, so the white calendar
 * sits in a matching white frame instead of the dark site background.
 */
export function BookingWindow({
  open,
  onOpenChange,
  onRequestInstead,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Switch to the email request form. */
  onRequestInstead: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) setLoaded(false);
        onOpenChange(o);
      }}
    >
      <DialogContent className="flex max-h-[94vh] w-[calc(100%-1.5rem)] max-w-4xl flex-col gap-0 overflow-hidden rounded-2xl border-0 bg-white p-0 text-slate-900 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] [&>button]:text-slate-500 [&>button:hover]:text-slate-900">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 pr-12 sm:px-6">
          <img src={logoAsset} alt="" className="size-10 shrink-0 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <DialogTitle className="font-display text-lg font-semibold text-slate-900">
              Book a ReguLattice demo
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Choose a time for a technical walkthrough of the ReguLattice AI governance platform.
            </DialogDescription>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 sm:flex"
          >
            Open in new tab <ExternalLink className="size-3.5" />
          </a>
        </div>

        {/* calendar */}
        <div className="relative min-h-0 flex-1 bg-white">
          {canEmbedBooking ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-slate-500">
                  <Loader2 className="size-4 animate-spin" /> Loading available times…
                </div>
              )}
              <iframe
                src={BOOKING_EMBED_URL}
                title="Book a ReguLattice demo"
                onLoad={() => setLoaded(true)}
                className="relative block h-[min(72vh,760px)] w-full border-0 bg-white"
              />
            </>
          ) : (
            <div className="flex h-[min(56vh,460px)] flex-col items-center justify-center px-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <CalendarDays className="size-7" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-slate-900">
                Pick a time on our booking calendar
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                See available slots and book a technical demo with the ReguLattice team.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              >
                Open booking calendar <ExternalLink className="size-4" />
              </a>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs text-slate-500 sm:flex-row sm:px-6">
          <span>
            {canEmbedBooking
              ? "Times are shown in your local time zone."
              : "Booking opens in Google Calendar."}
          </span>
          <button
            type="button"
            onClick={onRequestInstead}
            className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-slate-900"
          >
            <Mail className="size-3.5" /> Prefer email? Send a request instead
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
