import {
  ArrowRight,
  CalendarDays,
  Clock,
  ExternalLink,
  Loader2,
  Mail,
  ShieldCheck,
  Video,
} from "lucide-react";
import { useState } from "react";

import logoAsset from "@/assets/regulattice-logo.jpg";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { BOOKING_EMBED_URL, BOOKING_URL, canEmbedBooking } from "@/lib/booking";

/** Contact shown in the booking window. */
const BOOKING_EMAIL = "moazzam@regulattice.com";

const agenda = [
  "Discovering AI systems, agents and Shadow AI across your environment",
  "Risk assessment, policies and human-oversight controls",
  "Continuous monitoring and audit-ready evidence",
];

/**
 * Two-column "Book a demo" window in a light ReguLattice theme: contact details on the left,
 * Google's booking calendar (a white page that can't be restyled from outside) on the right.
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
      <DialogContent className="flex h-[calc(100dvh-1rem)] max-h-[860px] w-[calc(100%-1rem)] max-w-6xl flex-col gap-0 overflow-y-auto rounded-2xl border-slate-200 bg-[#f6f9fb] p-0 text-slate-900 shadow-2xl [&>button]:z-20 [&>button]:text-slate-500 [&>button]:hover:text-slate-900 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:overflow-hidden">
        {/* soft lattice grid + teal glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(15,118,110,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,0.07)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-teal-300/30 blur-3xl"
        />

        {/* left: talk to us */}
        <div className="relative flex flex-col px-6 pb-6 pt-8 sm:px-10 lg:overflow-y-auto lg:py-12">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            <span className="rounded-full bg-teal-600 px-2 py-0.5 text-[11px] font-semibold text-white">
              Demo
            </span>
            Governance, explained <ArrowRight className="size-3 text-teal-600" />
          </div>

          <DialogTitle className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl">
            Let&apos;s talk AI governance.
            <span className="block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              See it in action.
            </span>
          </DialogTitle>
          <DialogDescription className="mt-4 max-w-md text-[15px] leading-7 text-slate-600">
            Pick a time for a technical walkthrough of the ReguLattice AI governance platform with
            the ReguLattice Team, tailored to your AI systems and agents.
          </DialogDescription>

          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-teal-600 shadow-sm ring-1 ring-slate-200">
                <Mail className="size-5" />
              </span>
              <div>
                <div className="font-display text-lg font-semibold">Email us</div>
                <a
                  href={`mailto:${BOOKING_EMAIL}`}
                  className="text-sm font-medium text-teal-700 hover:underline"
                >
                  {BOOKING_EMAIL}
                </a>
                <div className="mt-0.5 text-xs text-slate-500">
                  We usually reply within one business day
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-teal-600 shadow-sm ring-1 ring-slate-200">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <div className="font-display text-lg font-semibold">What we&apos;ll cover</div>
                <ul className="mt-1.5 space-y-1.5 text-sm text-slate-600">
                  {agenda.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-slate-200">
                <Video className="size-3.5 text-teal-600" /> Video call
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-slate-200">
                <Clock className="size-3.5 text-teal-600" /> Time shown in your time zone
              </span>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-8 text-xs text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
            <button
              type="button"
              onClick={onRequestInstead}
              className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-teal-700 hover:underline"
            >
              <Mail className="size-3.5" /> Prefer email? Send a request instead
            </button>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap hover:text-slate-900"
            >
              <ExternalLink className="size-3.5" /> Open calendar in a new tab
            </a>
          </div>
        </div>

        {/* right: booking calendar */}
        <div className="relative flex min-h-[640px] flex-col p-3 sm:p-5 lg:min-h-0 lg:py-6 lg:pl-0 lg:pr-6">
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-teal-900/5">
            <div className="flex shrink-0 items-center gap-3 border-b border-slate-100 px-5 py-3 pr-12">
              <img src={logoAsset} alt="" className="size-8 rounded-lg object-cover" />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">ReguLattice Team</div>
                <div className="text-xs text-slate-500">Technical demo · select a day and time</div>
              </div>
            </div>
            <div className="relative min-h-0 flex-1">
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
                  <div className="flex size-12 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                    <CalendarDays className="size-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">
                    Pick a time on our booking calendar
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    See available slots and book a technical demo with the ReguLattice team.
                  </p>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-teal-600 px-6 text-sm font-semibold text-white hover:bg-teal-700"
                  >
                    Open booking calendar <ExternalLink className="size-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
