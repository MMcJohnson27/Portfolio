/**
 * RoadmapTimeline — the 4-phase Fitlogs roadmap.
 *
 * Desktop (md+): a single horizontal track, phases alternating above and
 * below it in a zigzag so captions never crowd their neighbors. Mobile: a
 * conventional left-aligned vertical timeline.
 *
 * Ported from a hand-off draft that used arbitrary hex/shadow values —
 * redrawn with this site's tokens (rule/ink/clay, hairline borders, no
 * shadows) so it reads as part of the same system as every other section.
 */
import { Fragment } from "react";

type Phase = {
  n: string;
  title: string;
  desc: string;
  status: "active" | "upcoming";
};

const PHASES: Phase[] = [
  {
    n: "01",
    title: "Web App MVP",
    desc: "Transitioning high-fidelity Figma designs into a functional, coded web prototype.",
    status: "upcoming",
  },
  {
    n: "02",
    title: "App Store Launch",
    desc: "Refactoring the web ecosystem into a native iOS and Android application.",
    status: "active",
  },
  {
    n: "03",
    title: "AI Personal Training",
    desc: "Integrating intelligent workout generation to dynamically prevent user plateaus.",
    status: "upcoming",
  },
  {
    n: "04",
    title: "Post-Workout Insights",
    desc: "Automated, contextual summaries providing actionable feedback after every lift.",
    status: "upcoming",
  },
];

/* ------------------------------ dot ------------------------------ */

function Dot({ active }: { active: boolean }) {
  if (active) {
    return <span className="relative h-[15px] w-[15px] rounded-full bg-clay ring-2 ring-paper" />;
  }
  return <span className="h-[13px] w-[13px] rounded-full border-[1.5px] border-rule bg-paper ring-2 ring-paper" />;
}

/* --------------------------- text block --------------------------- */

function PhaseText({ phase }: { phase: Phase }) {
  const { n, title, desc, status } = phase;
  const active = status === "active";
  return (
    <div className="max-w-[15.5rem] text-center">
      <div className="flex items-center justify-center gap-2">
        <span className={`label ${active ? "text-clay" : ""}`}>Phase {n}</span>
        {active && (
          <span className="rounded-full border border-clay px-2 py-[1px] text-[9.5px] font-semibold uppercase tracking-[0.1em] text-clay">
            Active
          </span>
        )}
      </div>
      <h3 className="mt-1.5 font-display text-[17px] leading-tight text-ink">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-snug text-ink-mute">{desc}</p>
    </div>
  );
}

/* ------------------------- desktop (grid) ------------------------- */
/* One 4-column / 3-row grid. Row 2 holds the dots AND the track line
   (spanning all four columns), so the line is centered on the dots
   automatically via the grid's own row alignment — no pixel math.
   Odd phases caption above the track, even phases below it. */

function TimelineDesktop() {
  const cols = ["col-start-1", "col-start-2", "col-start-3", "col-start-4"];
  return (
    <div className="hidden grid-cols-4 items-center gap-x-6 md:grid">
      {/* the track itself */}
      <div className="col-start-1 col-span-4 row-start-2 h-px bg-rule" />

      {PHASES.map((phase, i) => {
        const above = i % 2 === 0;
        const active = phase.status === "active";
        const stem = <div className={`h-4 w-px ${active ? "bg-clay" : "bg-rule"}`} />;
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
              <Dot active={active} />
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

function TimelineMobile() {
  return (
    <div className="flex flex-col pl-1 md:hidden">
      {PHASES.map((phase, i) => {
        const active = phase.status === "active";
        const last = i === PHASES.length - 1;
        return (
          <div key={phase.n} className="relative flex gap-4 pb-9 last:pb-0">
            {!last && (
              <div className="absolute bottom-0 left-[6px] top-4 w-px bg-rule" aria-hidden="true" />
            )}
            <div className="relative z-10 mt-1 flex-none">
              <Dot active={active} />
            </div>
            <div className="-mt-0.5 pb-0.5 text-left">
              <div className="flex items-center gap-2">
                <span className={`label ${active ? "text-clay" : ""}`}>Phase {phase.n}</span>
                {active && (
                  <span className="rounded-full border border-clay px-2 py-[1px] text-[9.5px] font-semibold uppercase tracking-[0.1em] text-clay">
                    Active
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

export default function RoadmapTimeline() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl px-2 py-10 md:px-6">
        <TimelineDesktop />
        <TimelineMobile />
      </div>
    </div>
  );
}
