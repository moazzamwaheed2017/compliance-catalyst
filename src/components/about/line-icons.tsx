/**
 * Minimal line illustrations with restrained motion (disabled under prefers-reduced-motion
 * via the utilities in styles.css). Stroke uses currentColor so the parent sets the tone.
 */

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "size-11",
};

/** Visibility: an eye with a slowly breathing pupil. */
export function VisibilityIcon() {
  return (
    <svg {...base}>
      <path d="M4 24c5-8 12-12 20-12s15 4 20 12c-5 8-12 12-20 12S9 32 4 24z" />
      <circle cx="24" cy="24" r="6" className="breathe" />
      <circle cx="24" cy="24" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Accountability / humans remain accountable: a person beside a shield. */
export function AccountabilityIcon() {
  return (
    <svg {...base}>
      <circle cx="16" cy="16" r="5" />
      <path d="M7 36c0-6 4-10 9-10s9 4 9 10" />
      <path d="M33 14l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10v-7z" className="breathe" />
      <path d="M29.5 24l2.5 2.5 4.5-4.5" pathLength={1} className="draw-loop" />
    </svg>
  );
}

/** Evidence: a document whose check mark draws itself. */
export function EvidenceIcon() {
  return (
    <svg {...base}>
      <path d="M12 6h17l8 8v28H12z" />
      <path d="M29 6v8h8" />
      <path d="M17 22h14M17 28h9" opacity="0.55" />
      <path d="M18 35l4 4 8-8" pathLength={1} className="draw-loop" />
    </svg>
  );
}

/** Continuous over periodic: a slowly rotating monitoring loop. */
export function ContinuousIcon() {
  return (
    <svg {...base}>
      <g className="spin-slow" style={{ transformOrigin: "24px 24px", animationDuration: "14s" }}>
        <path d="M38 24a14 14 0 1 1-4.1-9.9" />
        <path d="M34.5 8.5l-.6 5.6 5.6.6" />
      </g>
      <circle cx="24" cy="24" r="3" className="breathe" />
    </svg>
  );
}

/** Vendor-neutral: connected nodes that pulse in turn. */
export function VendorNeutralIcon() {
  const nodes: [number, number][] = [
    [10, 12],
    [38, 12],
    [10, 36],
    [38, 36],
  ];
  return (
    <svg {...base}>
      {nodes.map(([x, y]) => (
        <line key={`${x}-${y}`} x1={x} y1={y} x2="24" y2="24" opacity="0.5" />
      ))}
      <circle cx="24" cy="24" r="4.5" />
      {nodes.map(([x, y], i) => (
        <circle
          key={`n-${x}-${y}`}
          cx={x}
          cy={y}
          r="3.5"
          className="breathe"
          style={{ animationDelay: `${i * 0.8}s` }}
        />
      ))}
    </svg>
  );
}

/** Local-first: a server stack with status lights. */
export function LocalFirstIcon() {
  return (
    <svg {...base}>
      {[8, 20, 32].map((y, i) => (
        <g key={y}>
          <rect x="8" y={y} width="32" height="9" rx="2.5" />
          <circle
            cx="34"
            cy={y + 4.5}
            r="1.4"
            fill="currentColor"
            className="led-blink"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
          <path d={`M13 ${y + 4.5}h10`} opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}
