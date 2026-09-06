/**
 * Three abstract marks for the insight cards — drawn, not borrowed, on one
 * 28px stage at a single stroke weight so they read as a set. They take the
 * accent from `currentColor`, so the card decides the colour.
 */

const stage = {
  viewBox: "0 0 28 28",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  width: 28,
  height: 28,
  "aria-hidden": true,
} as const;

/** A gate: the circle is whole, but barred. */
export function MarkPaywall() {
  return (
    <svg {...stage}>
      <circle cx="14" cy="14" r="9.5" />
      <path d="M14 2.5v23" />
      <path d="M8.5 8.5h-4M23.5 19.5h-4" strokeLinecap="round" />
    </svg>
  );
}

/** Scatter with a hollow centre: data everywhere, nothing in the middle. */
export function MarkVoid() {
  return (
    <svg {...stage}>
      <circle cx="14" cy="14" r="9.5" strokeDasharray="1.5 4" />
      <circle cx="14" cy="14" r="2.75" />
      <path d="M14 4.5v3M14 20.5v3" strokeLinecap="round" />
    </svg>
  );
}

/** Two frames out of register — the unfinished interface. */
export function MarkUnfinished() {
  return (
    <svg {...stage}>
      <rect x="3" y="3" width="15" height="15" />
      <path d="M10 25h15V10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 18h8v-8" />
    </svg>
  );
}

export const marks = [MarkPaywall, MarkVoid, MarkUnfinished];

/** A framed quadrant: scope held inside a boundary. */
export function MarkScope() {
  return (
    <svg {...stage}>
      <rect x="5" y="5" width="18" height="18" rx="1" />
      <path d="M5 11h18M11 5v18" />
    </svg>
  );
}

/** Ascending bars, unevenly spaced — rigor as measurement. */
export function MarkRigor() {
  return (
    <svg {...stage}>
      <path d="M4 23V14M11 23V8M18 23V17M25 23V4" strokeLinecap="round" />
    </svg>
  );
}

/** A shield with a check — trust, verified. */
export function MarkTrust() {
  return (
    <svg {...stage}>
      <path d="M14 3l9 4v7c0 6-4 9.5-9 11-5-1.5-9-5-9-11V7l9-4z" strokeLinejoin="round" />
      <path d="M9.5 14.5l3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const takeawayMarks = [MarkScope, MarkRigor, MarkTrust];
