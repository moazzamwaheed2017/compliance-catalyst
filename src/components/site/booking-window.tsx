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
 * Google renders the booking calendar on a white page that can't be restyled from outside.
 * Inverting it (and rotating the hue back) turns it black with light text while keeping
 * Google's blue accents blue; a "lighten" overlay in the dialog colour then replaces the
 * black with the same background as the Request access dialog.
 */
const DARK_CALENDAR_FILTER = "invert(1) hue-rotate(180deg) saturate(1.15)";

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
      <DialogContent className="glass flex max-h-[94vh] w-[calc(100%-1.5rem)] max-w-4xl flex-col gap-0 rounded-2xl border-white/10 bg-popover/95 p-0">
        <DialogHeader className="px-6 pb-4 pt-6 pr-12">
          <DialogTitle className="flex items-center gap-2 font-display text-xl font-bold">
            <CalendarDays className="size-5 text-primary" />
            Book a ReguLattice demo
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Choose a time for a technical walkthrough of the ReguLattice AI governance platform with
            the <strong className="text-foreground">ReguLattice Team</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-popover">
            {canEmbedBooking ? (
              <>
                {!loaded && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-background/60 text-sm text-muted-foreground">
                    <Loader2 className="size-4 animate-spin text-primary" /> Loading available
                    times…
                  </div>
                )}
                <iframe
                  src={BOOKING_EMBED_URL}
                  title="Book a ReguLattice demo"
                  onLoad={() => setLoaded(true)}
                  className="block h-[min(64vh,700px)] w-full border-0"
                  style={{ filter: DARK_CALENDAR_FILTER, colorScheme: "light" }}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-popover mix-blend-lighten"
                  aria-hidden="true"
                />
              </>
            ) : (
              <div className="flex h-[min(50vh,420px)] flex-col items-center justify-center px-6 text-center">
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

        <div className="flex flex-col items-center justify-between gap-2 px-6 pb-5 pt-4 text-xs text-muted-foreground sm:flex-row">
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
