import { Play } from "lucide-react";
import { useRef, useState } from "react";

import { trackCta } from "@/lib/cta";

export const DEMO_VIDEO = {
  mp4: "/shadow-ai-demo.mp4",
  /** Fallback for browsers without H.264. */
  webm: "/shadow-ai-demo.webm",
  poster: "/shadow-ai-demo-poster.jpg",
  title: "How shadow AI enters your company, and how ReguLattice governs it",
  duration: "1:18",
};

/**
 * Product walkthrough video. Shows the poster until clicked, so the 4 MB file only loads for
 * visitors who want it. `placement` records where the play happened.
 */
export function DemoVideo({
  placement,
  className = "",
}: {
  placement: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    trackCta("video", placement);
    // Play within the click so browsers allow sound.
    void videoRef.current?.play().catch(() => {});
  };

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#e8f3ef] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ${className}`}
    >
      <video
        ref={videoRef}
        poster={DEMO_VIDEO.poster}
        preload="none"
        playsInline
        controls={started}
        title={DEMO_VIDEO.title}
        className="absolute inset-0 h-full w-full"
      >
        <source src={DEMO_VIDEO.mp4} type="video/mp4" />
        <source src={DEMO_VIDEO.webm} type="video/webm" />
      </video>
      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={`Play video: ${DEMO_VIDEO.title} (${DEMO_VIDEO.duration})`}
          className="group absolute inset-0 flex items-center justify-center bg-slate-950/10 transition-colors hover:bg-slate-950/20"
        >
          <span className="flex items-center gap-3 rounded-full bg-slate-950/85 py-2.5 pl-2.5 pr-5 text-sm font-semibold text-white shadow-xl ring-1 ring-white/10 transition-transform group-hover:scale-105">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground">
              <Play className="size-4 translate-x-px fill-current" />
            </span>
            Watch the demo · {DEMO_VIDEO.duration}
          </span>
        </button>
      )}
    </div>
  );
}
