import { CalendarDays, ExternalLink, Loader2, Mail } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BOOKING_EMBED_URL, BOOKING_URL, canEmbedBooking } from "@/lib/booking";

/**
 * Google's booking calendar is a white page that can't be restyled from outside, so it is
 * shown as-is (photos and Google's colours stay correct) inside the dark dialog frame.
 */
/** Demo booking window, styled like the "Request access" dialog. */
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
      <DialogContent className="glass flex h-[calc(100dvh-1rem)] max-h-[920px] w-[calc(100%-1rem)] max-w-4xl flex-col gap-0 rounded-2xl border-white/10 bg-popover/95 p-0">
        <DialogHeader className="shrink-0 px-5 pb-3 pt-5 pr-12 sm:px-6">
          <DialogTitle className="flex items-center gap-2 font-display text-xl font-bold">
            <CalendarDays className="size-5 text-primary" />
            Book a ReguLattice demo
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Choose a time for a technical walkthrough of the ReguLattice AI governance platform with
            the <strong className="text-foreground">ReguLattice Team</strong>.
          </DialogDescription>
        </DialogHeader>

        {/* The calendar fills all remaining height so Google's booking popup fits. */}
        <div className="min-h-0 flex-1 px-3 sm:px-6">
          <div
            className={`relative h-full overflow-hidden rounded-xl border border-white/10 ${
              canEmbedBooking ? "bg-white" : "bg-popover"
            }`}
          >
            {canEmbedBooking ? (
              <>
                {!loaded && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-white text-sm text-slate-500">
                    <Loader2 className="size-4 animate-spin text-teal-600" /> Loading available
                    times…
                  </div>
                )}
                <iframe
                  src={BOOKING_EMBED_URL}
                  title="Book a ReguLattice demo"
                  onLoad={() => setLoaded(true)}
                  className="absolute inset-0 h-full w-full border-0"
                  style={{ colorScheme: "light" }}
                />
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <CalendarDays className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  Pick a time on our booking calendar
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  See available slots and book a technical demo with the ReguLattice team.
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-brand-gradient px-6 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]"
                >
                  Open booking calendar <ExternalLink className="size-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center justify-between gap-2 px-6 pb-4 pt-3 text-xs text-muted-foreground sm:flex-row">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <ExternalLink className="size-3.5" /> Open calendar in a new tab
          </a>
          <button
            type="button"
            onClick={onRequestInstead}
            className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
          >
            <Mail className="size-3.5" /> Prefer email? Send a request instead
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
