"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { jurni } from "@/lib/jurni";
import { AutoVideo } from "@/components/case/AutoVideo";
import { CaseNav } from "@/components/case/CaseNav";
import { marks, takeawayMarks } from "@/components/case/InsightMarks";

const CONTENTS = [
  { id: jurni.hook.id, index: jurni.hook.index, label: jurni.hook.title },
  { id: jurni.problemSpace.id, index: jurni.problemSpace.index, label: jurni.problemSpace.title },
  { id: jurni.architecture.id, index: jurni.architecture.index, label: jurni.architecture.title },
  { id: jurni.execution.id, index: jurni.execution.index, label: jurni.execution.title },
  { id: jurni.outcomes.id, index: jurni.outcomes.index, label: jurni.outcomes.title },
];

const AUDIT_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1Iibl5QsX1UFsXG-Q2UIUfUraoZlwJc-IXDDmw91STuA/edit?gid=2073884517#gid=2073884517";

/** Shared caption treatment for every research deliverable, in both 02 and 03. */
const mediaLabel = "mb-4 text-sm text-ink-mute";

/**
 * JURNI — the long read.
 *
 * The 12-col grid wraps the whole page, hero included: a sticky rail
 * (back link + contents) holds three columns from the very top, and
 * everything else — title through the last takeaway — reads down the
 * remaining nine. This is a client component (state for the lightbox)
 * with `page.tsx` staying a server component so the route can still
 * export `metadata`.
 */
export default function JurniCaseStudy() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <main>
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-12">
          {/* A sticky rail is meaningless on a phone, so it is not rendered there. */}
          <aside className="hidden lg:col-span-3 lg:block">
            {/* h-full matters: a sticky child can only travel inside its
                containing block, and without it that block is just the height
                of the list — so the rail would scroll away immediately.
                top-24 (96px) has to clear the fixed nav's own 80px height —
                top-16 parked this block half-behind the nav bar once lifted. */}
            <div className="h-full pt-16 md:pt-20">
              <div className="lg:sticky lg:top-24">
                <BackLink />
                <div className="mt-10">
                  <CaseNav items={CONTENTS} />
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <Hero />
            <Hook />
            <ProblemSpace onExpand={setExpandedImage} />
            <Architecture onExpand={setExpandedImage} />
            <Execution />
            <Outcomes />
          </div>
        </div>
      </div>

      {expandedImage ? (
        <div
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-4 md:p-8"
          onClick={() => setExpandedImage(null)}
        >
          {expandedImage.endsWith(".mp4") ? (
            <video
              src={expandedImage}
              autoPlay
              loop
              muted
              playsInline
              controls
              onClick={() => setExpandedImage(null)}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- runtime-picked src, not a static import next/image can optimize
            <img
              src={expandedImage}
              alt=""
              onClick={() => setExpandedImage(null)}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          )}
        </div>
      ) : null}
    </main>
  );
}

/* ----------------------------------------------------------------- shell */

function BackLink() {
  return (
    <a
      href="/#work"
      className="label inline-flex items-center gap-2 text-ink-mute transition-colors duration-300 ease-editorial hover:text-clay"
    >
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
        <path
          d="M13 5H1M1 5L5 1M1 5L5 9"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </a>
  );
}

function Section({
  id,
  index,
  title,
  children,
  tightTop,
  tightBottom,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
  /** Shrinks this section's own top padding — used on Section 02 so it sits
      close behind Section 01's metrics bar instead of stacking a second
      full gap on top of the bar's own border. */
  tightTop?: boolean;
  /** Drops this section's bottom padding to ~0 — used on Section 01 so the
      metrics bar is the last thing in its box, right against the rule that
      starts the next section. */
  tightBottom?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 border-t border-rule ${tightTop ? "pt-8 md:pt-10" : "pt-16 md:pt-20"} ${
        tightBottom ? "pb-0" : "pb-16 md:pb-20"
      }`}
    >
      <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
        <span className="text-clay tabular-nums">{index}</span>
        <span className="mx-3 text-ink-faint">/</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  return (
    <header className="pb-14 pt-16 md:pb-16 md:pt-20">
      <h1 className="mb-8 font-display text-4xl leading-[1.06] tracking-tight text-ink md:text-5xl lg:whitespace-nowrap lg:text-6xl">
        {jurni.title}
      </h1>

      <div className="overflow-hidden rounded-2xl border border-rule">
        <AutoVideo src={jurni.hero} className="aspect-video w-full object-cover" />
      </div>

      <dl className="mt-8 grid grid-cols-2 justify-items-center gap-6 text-center sm:grid-cols-4">
        {jurni.meta.map((m) => (
          <div key={m.label}>
            <dt className="label">{m.label}</dt>
            <dd className="mt-2 whitespace-pre-line text-[15px] leading-snug text-ink md:text-base">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

/* -------------------------------------------------------------- 01 hook */

function Hook() {
  const s = jurni.hook;
  return (
    <Section id={s.id} index={s.index} title={s.title} tightBottom>
      <div className="mt-12 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-2 md:gap-12">
        {[s.problem, s.solution].map((col) => (
          <div key={col.heading}>
            <h3 className="label">{col.heading}</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{col.body}</p>
          </div>
        ))}
      </div>

      {/* A contained bar instead of floating oversized numerals — the
          top/bottom rule plus dividers between cells reads as one compact,
          editorial strip rather than a tall standalone stats block. */}
      <dl className="mt-12 grid grid-cols-1 divide-y divide-rule border-t border-rule pt-4 pb-8 md:grid-cols-3 md:divide-x md:divide-y-0">
        {s.metrics.map((m) => (
          <div key={m.label} className="px-6 py-4 first:pt-0 last:pb-0 md:py-0">
            <dt className="text-center font-display text-4xl tracking-tight text-ink md:text-5xl">
              {m.value}
            </dt>
            <dd className="mt-2 text-center text-xs font-semibold uppercase tracking-widest text-ink-mute">
              {m.label}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* ----------------------------------------------------- 02 problem space */

function ProblemSpace({ onExpand }: { onExpand: (src: string) => void }) {
  const s = jurni.problemSpace;

  return (
    <Section id={s.id} index={s.index} title={s.title}>
      <p className="mt-10 w-full text-[17px] leading-relaxed text-ink-soft md:mt-12">
        {s.narrative}
      </p>

      {/* Same bordered artifact-link treatment as the Cognativ case study —
          padding, background, border, and text colors all match exactly. */}
      <div className="mt-6 flex flex-col items-start gap-3 rounded-xl border border-rule bg-paper-deep/40 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 flex-none text-ink-mute"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
            <path d="M14 3v5h5" />
            <path d="M9 13h6M9 16.5h6M9 9.5h2" />
          </svg>
          <span className="text-sm font-semibold text-ink">Competitive Audit</span>
        </div>

        <a
          href={AUDIT_SHEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none whitespace-nowrap text-sm font-medium text-clay transition-colors duration-300 ease-editorial hover:text-ink"
        >
          View Full Competitive Audit ↗
        </a>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
        {s.cards.map((c, i) => {
          const Mark = marks[i];
          return (
            <article key={c.title} className="border border-rule p-7">
              {/* The mark draws from currentColor, so the accent is set here. */}
              <span className="block text-[#B95800]">
                <Mark />
              </span>
              <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight text-ink">
                {c.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{c.body}</p>
            </article>
          );
        })}
      </div>

      {/* No wrapper, no forced ratio: w-full + h-auto alone is enough to
          keep every pixel of the source visible. */}
      <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-2">
        <div>
          <p className={mediaLabel}>
            Competitive Audit: Narrowing the scope from 18 to 3 competitors.
          </p>
          <AutoVideo
            src={s.audit.src}
            onClick={() => onExpand(s.audit.src)}
            className="block h-auto w-full cursor-zoom-in rounded-2xl border border-rule bg-white"
          />
        </div>

        <div>
          <p className={mediaLabel}>
            Visual Benchmarking: Evaluating UI patterns and onboarding flows.
          </p>
          <Image
            src={s.benchmarking.src}
            alt=""
            width={s.benchmarking.width}
            height={s.benchmarking.height}
            sizes="(min-width: 768px) 490px, 100vw"
            onClick={() => onExpand(s.benchmarking.src)}
            className="block h-auto w-full cursor-zoom-in rounded-2xl border border-rule bg-white"
          />
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------ 03 architecture */

function Architecture({ onExpand }: { onExpand: (src: string) => void }) {
  const s = jurni.architecture;
  const [mapping, journey, flow] = s.figures;
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      <p className="mt-10 w-full text-[17px] leading-relaxed text-ink-soft md:mt-12">
        {s.narrative}
      </p>

      {/*
        Grid items stretch to the row's height by default, so the left
        column's h-full resolves against whatever the right stack ends up
        being — no explicit height math needed. Both sides use `fill` so
        Next/Image can actually occupy that stretched box; a plain
        width/height image can't be told to grow via className alone.
      */}
      <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-2">
        <figure className="flex h-full flex-col">
          <p className={mediaLabel}>{mapping.caption}</p>
          <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-2xl border border-rule bg-white/40 p-4 md:p-6">
            <Image
              src={mapping.src}
              alt=""
              fill
              sizes="(min-width: 768px) 490px, 100vw"
              onClick={() => onExpand(mapping.src)}
              className="cursor-zoom-in object-contain"
            />
          </div>
        </figure>

        <div className="flex h-full flex-col justify-between gap-8">
          {[flow, journey].map((f) => (
            <figure key={f.src} className="flex flex-1 flex-col">
              <p className={mediaLabel}>{f.caption}</p>
              <div className="relative min-h-[200px] w-full flex-1 overflow-hidden rounded-2xl border border-rule bg-white/40 p-4 md:p-6">
                <Image
                  src={f.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 490px, 100vw"
                  onClick={() => onExpand(f.src)}
                  className="cursor-zoom-in object-contain"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------- 04 execution */

function Execution() {
  const s = jurni.execution;
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      <p className="mt-10 w-full text-[17px] leading-relaxed text-ink-soft md:mt-12">
        {s.narrative}
      </p>

      <div className="mt-12 space-y-20 md:mt-16 md:space-y-28">
        {s.blocks.map((b) => (
          <div key={b.eyebrow} className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            <div className="lg:w-1/3">
              {/* top-28 clears the fixed nav; the rationale holds while the
                  capture scrolls past it. */}
              <div className="lg:sticky lg:top-28">
                <p className="font-display text-3xl leading-tight tracking-tight text-ink">
                  {b.heading}
                </p>
                <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">{b.body}</p>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="mx-auto aspect-[1078/1598] max-w-[460px] overflow-hidden rounded-2xl border border-rule bg-ink">
                <AutoVideo src={b.src} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------- 05 outcomes */

function Outcomes() {
  const s = jurni.outcomes;
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      <p className="mt-10 w-full text-[17px] leading-relaxed text-ink-soft md:mt-12">
        {s.narrative}
      </p>

      <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 lg:grid-cols-2 lg:items-center">
        {/*
          It is the heaviest asset on the site, so AutoVideo's preload="none"
          and viewport observer matter more here than anywhere: nothing is
          fetched until someone reaches it. Controls stay on so a viewer can
          pause the full walkthrough, unlike the ambient loops above.
        */}
        <div className="mx-auto aspect-[1078/1598] w-full max-w-[460px] overflow-hidden rounded-2xl border border-rule bg-ink">
          <AutoVideo src={s.walkthrough} className="h-full w-full object-cover" controls />
        </div>

        <div className="flex flex-col gap-6">
          {s.takeaways.map((t, i) => {
            const Mark = takeawayMarks[i];
            return (
              <article
                key={t.title}
                className="rounded-2xl border border-rule bg-white/40 p-7"
              >
                {/* The mark draws from currentColor, so the accent is set here. */}
                <span className="block text-[#B95800]">
                  <Mark />
                </span>
                <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight text-ink">
                  {t.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{t.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
