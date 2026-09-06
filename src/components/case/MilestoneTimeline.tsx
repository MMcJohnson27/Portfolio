/**
 * MilestoneTimeline — a generic N-phase project timeline.
 *
 * Same visual model as Fitlogs' RoadmapTimeline: desktop lays every phase
 * along one horizontal track with captions zigzagging above/below so they
 * never crowd their neighbors; mobile falls back to a left-aligned vertical
 * stack. Generalized to take `phases` as a prop (rather than a hard-coded
 * 4-item array) and to a three-state status model — "completed" phases read
 * as settled history, "active" carries the accent badge, "upcoming" is the
 * plan not yet reached — so it can narrate a pivot mid-timeline rather than
 * only ever pointing at "what's next."
 */
import { Fragment } from "react";

/**
 * Tailwind's content scanner only picks up class names that appear as
 * complete literal strings somewhere in the source — a template literal
 * like `col-start-${i}` isn't statically analyzable. This array exists
 * purely so every `col-start-1`..`col-start-6` utility actually gets
 * generated, however many phases a given timeline passes in.
 */
const COL_START = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];

export type MilestonePhase = {
  n: string;
  title: string;
  desc: string;
  status: "completed" | "active" | "upcoming";
  /** Overrides the default badge text for the active phase (e.g. "Active Pivot"). */
  badge?: string;
};

/* ------------------------------------------------------------------ dot */

function Dot({ status }: { status: MilestonePhase["status"] }) {
  if (status === "active") {
    return <span className="relative h-[15px] w-[15px] rounded-full bg-clay ring-2 ring-paper" />;
  }
  if (status === "completed") {
    return (
      <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full border-[1.5px] border-clay bg-clay/10 ring-2 ring-paper">
        <svg viewBox="0 0 10 10" className="h-[7px] w-[7px] text-clay" fill="none" aria-hidden="true">
          <path d="M1.5 5.2 4 7.5 8.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return <span className="h-[13px] w-[13px] rounded-full border-[1.5px] border-rule bg-paper ring-2 ring-paper" />;
}

/* --------------------------------------------------------- text block */

function PhaseText({ phase }: { phase: MilestonePhase }) {
  const { n, title, desc, status } = phase;
  const active = status === "active";
  return (
    <div className="max-w-[15.5rem] text-center">
      <div className="flex items-center justify-center gap-2">
        <span className={`label ${active ? "text-clay" : ""}`}>Phase {n}</span>
        {active && (
          <span className="rounded-full border border-clay px-2 py-[1px] text-[9.5px] font-semibold uppercase tracking-[0.1em] text-clay">
            {phase.badge ?? "Active"}
          </span>
        )}
      </div>
      <h3 className="mt-1.5 font-display text-[17px] leading-tight text-ink">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-snug text-ink-mute">{desc}</p>
    </div>
  );
}

/* ------------------------- desktop (grid) ------------------------- */
/* One N-column / 3-row grid. Row 2 holds the dots AND the track line
   (spanning all N columns), so the line is centered on the dots
   automatically via the grid's own row alignment — no pixel math.
   Odd phases caption above the track, even phases below it. */

function TimelineDesktop({ phases }: { phases: MilestonePhase[] }) {
  const cols = phases.map((_, i) => COL_START[i] ?? "col-start-1");
  return (
    <div
      className="hidden items-center gap-x-6 md:grid"
      style={{ gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))` }}
    >
      {/* the track itself */}
      <div className="col-start-1 row-start-2 h-px bg-rule" style={{ gridColumn: `1 / span ${phases.length}` }} />

      {phases.map((phase, i) => {
        const above = i % 2 === 0;
        const stem = (
          <div className={`h-4 w-px ${phase.status === "upcoming" ? "bg-rule" : "bg-clay"}`} />
        );
        return (
          <Fragment key={phase.n}>
            {above ? (
              <div
                className={`${cols[i]} row-start-1 flex flex-col items-center justify-end transition-transform duration-300 motion-safe:hover:-translate-y-0.5`}
              >
                <PhaseText phase={phase} />
                <div className="mt-3">{stem}</div>
              </div>
            ) : (
              <div className={`${cols[i]} row-start-1`} />
            )}

            <div className={`${cols[i]} relative z-10 row-start-2 flex items-center justify-center`}>
              <Dot status={phase.status} />
            </div>

            {!above ? (
              <div
                className={`${cols[i]} row-start-3 flex flex-col items-center justify-start transition-transform duration-300 motion-safe:hover:translate-y-0.5`}
              >
                <div className="mb-3">{stem}</div>
                <PhaseText phase={phase} />
              </div>
            ) : (
              <div className={`${cols[i]} row-start-3`} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

/* ------------------------- mobile (stack) ------------------------- */

function TimelineMobile({ phases }: { phases: MilestonePhase[] }) {
  return (
    <div className="flex flex-col pl-1 md:hidden">
      {phases.map((phase, i) => {
        const last = i === phases.length - 1;
        return (
          <div key={phase.n} className="relative flex gap-4 pb-9 last:pb-0">
            {!last && (
              <div className="absolute bottom-0 left-[6px] top-4 w-px bg-rule" aria-hidden="true" />
            )}
            <div className="relative z-10 mt-1 flex-none">
              <Dot status={phase.status} />
            </div>
            <div className="-mt-0.5 pb-0.5 text-left">
              <div className="flex items-center gap-2">
                <span className={`label ${phase.status === "active" ? "text-clay" : ""}`}>Phase {phase.n}</span>
                {phase.status === "active" && (
                  <span className="rounded-full border border-clay px-2 py-[1px] text-[9.5px] font-semibold uppercase tracking-[0.1em] text-clay">
                    {phase.badge ?? "Active"}
                  </span>
                )}
              </div>
              <h3 className="mt-1 font-display text-[16.5px] leading-tight text-ink">{phase.title}</h3>
              <p className="mt-1 max-w-sm text-[13px] leading-snug text-ink-mute">{phase.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ----------------------------- export ----------------------------- */

export default function MilestoneTimeline({ phases }: { phases: MilestonePhase[] }) {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl px-2 py-10 md:px-6">
        <TimelineDesktop phases={phases} />
        <TimelineMobile phases={phases} />
      </div>
    </div>
  );
}
