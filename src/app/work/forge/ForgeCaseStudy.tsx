"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { forge } from "@/lib/forge";
import { AutoVideo } from "@/components/case/AutoVideo";
import { CaseNav } from "@/components/case/CaseNav";
import MilestoneTimeline from "@/components/case/MilestoneTimeline";

const ARCHITECTURE_NODES = [
  { label: "Participants", sublabel: "Students" },
  { label: "Hosts", sublabel: "Schools & Venues" },
  { label: "Funders", sublabel: "Corporate Partners" },
  { label: "Beneficiaries", sublabel: "Non-Profits" },
  { label: "Mentors", sublabel: "AI Collective" },
];

const CONTENTS = [
  { id: forge.brief.id, index: forge.brief.index, label: forge.brief.title },
  { id: forge.ia.id, index: forge.ia.index, label: forge.ia.title },
  { id: forge.hifi.id, index: forge.hifi.index, label: forge.hifi.title },
  { id: forge.pivot.id, index: forge.pivot.index, label: forge.pivot.title },
  { id: forge.engineering.id, index: forge.engineering.index, label: forge.engineering.title },
  { id: forge.outcomes.id, index: forge.outcomes.index, label: forge.outcomes.title },
];

/**
 * FORGE — the long read.
 *
 * Same shell as /work/fitlogs and /work/cognativ: a 12-col grid wraps the
 * whole page, a sticky rail (back link + contents) holds three columns from
 * the top, and everything else reads down the remaining nine. Client
 * component for the lightbox state; `page.tsx` stays a server component so
 * the route can still export `metadata`.
 */
export default function ForgeCaseStudy() {
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
                top-24 (96px) clears the fixed nav's own 80px height. */}
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
            <Brief />
            <IA onExpand={setExpandedImage} />
            <Hifi onExpand={setExpandedImage} />
            <Pivot onExpand={setExpandedImage} />
            <Engineering onExpand={setExpandedImage} />
            <Outcomes />
          </div>
        </div>
      </div>

      {expandedImage ? (
        <div
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-4 md:p-8"
          onClick={() => setExpandedImage(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- runtime-picked src, not a static import next/image can optimize */}
          <img
            src={expandedImage}
            alt=""
            onClick={() => setExpandedImage(null)}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
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
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-rule py-16 md:py-20">
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
    <header className="pb-6 pt-16 md:pb-8 md:pt-20">
      <h1 className="mb-8 font-display text-4xl leading-[1.06] tracking-tight text-ink md:text-5xl lg:whitespace-nowrap lg:text-6xl">
        {forge.title}
      </h1>

      <div className="overflow-hidden rounded-2xl border border-rule">
        <AutoVideo src={forge.hero} className="aspect-video w-full object-cover" />
      </div>

      <dl className="mt-8 grid grid-cols-1 justify-items-center gap-6 text-center sm:grid-cols-2 md:grid-cols-4">
        {forge.meta.map((m) => (
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

/* -------------------------------------------------------------- 01 brief */

function Brief() {
  const s = forge.brief;
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-2 md:gap-12">
        {[s.problem, s.solution].map((col) => (
          <div key={col.heading}>
            <h3 className="label">{col.heading}</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{col.body}</p>
          </div>
        ))}
      </div>

      {/* A low-profile banner naming the 5-sided architecture the text just
          described — a single hairline-bordered strip, not a standalone
          graphic, so it reads as a footnote to the paragraph rather than a
          second visual centerpiece. */}
      <div className="mt-10 md:mt-12">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-rule" />
          <span className="label whitespace-nowrap text-clay">The 5-Sided Architecture</span>
          <span className="h-px flex-1 bg-rule" />
        </div>

        <div className="mt-4 grid grid-cols-2 divide-y divide-rule border-y border-rule sm:grid-cols-5 sm:divide-y-0 sm:divide-x">
          {ARCHITECTURE_NODES.map((n) => (
            <div key={n.label} className="px-3 py-3 text-center">
              <div className="text-[13px] font-semibold leading-tight text-ink">{n.label}</div>
              <div className="mt-0.5 text-[11px] leading-tight text-ink-mute">{n.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ 02 ia */

function IA({ onExpand }: { onExpand: (src: string) => void }) {
  const s = forge.ia;
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      {/* Full-width editorial paragraph, then the assets sit side-by-side
          directly beneath it — tight mt values throughout so the image row
          reads as an extension of the text, not a separate block floating
          below a dead gap. */}
      <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-ink-soft md:mt-8">{s.body}</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-10">
        {s.images.map((img) => (
          <Image
            key={img.src}
            src={img.src}
            alt=""
            width={img.width}
            height={img.height}
            sizes="(min-width: 640px) 50vw, 100vw"
            onClick={() => onExpand(img.src)}
            className="h-auto w-full cursor-zoom-in rounded-2xl border border-rule shadow-lift"
          />
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- 03 hifi */

function Hifi({ onExpand }: { onExpand: (src: string) => void }) {
  const s = forge.hifi;
  // Same split-screen shell as Section 05: title lives inside the left
  // column so it top-aligns with the image column, rather than sitting
  // full-width above the grid.
  return (
    <section id={s.id} className="scroll-mt-28 border-t border-rule py-16 md:py-20">
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
            <span className="text-clay tabular-nums">{s.index}</span>
            <span className="mx-3 text-ink-faint">/</span>
            {s.title}
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-soft md:mt-8">{s.body}</p>
        </div>

        <div className="flex flex-col gap-8 md:col-span-7">
          {s.images.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              sizes="(min-width: 768px) 640px, 100vw"
              onClick={() => onExpand(img.src)}
              className="h-auto w-full cursor-zoom-in rounded-2xl border border-rule shadow-lift"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 05 engineering */

function Engineering({ onExpand }: { onExpand: (src: string) => void }) {
  const s = forge.engineering;
  // This section builds its own <section> shell instead of using the shared
  // <Section>: the schema image needs to start flush with the top of the
  // title, not the paragraph below it, and that only works if the title
  // lives inside the same items-start grid the image column belongs to —
  // same technique as Cognativ's Section 02.
  return (
    <section id={s.id} className="scroll-mt-28 border-t border-rule py-16 md:py-20">
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
            <span className="text-clay tabular-nums">{s.index}</span>
            <span className="mx-3 text-ink-faint">/</span>
            {s.title}
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-soft md:mt-8">{s.body}</p>
        </div>

        <div className="md:col-span-7">
          <Image
            src={s.image.src}
            alt=""
            width={s.image.width}
            height={s.image.height}
            sizes="(min-width: 768px) 640px, 100vw"
            onClick={() => onExpand(s.image.src)}
            className="h-auto w-full cursor-zoom-in rounded-2xl border border-rule shadow-lift"
          />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- 04 pivot */

function Pivot({ onExpand }: { onExpand: (src: string) => void }) {
  const s = forge.pivot;
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      <div className="mt-10 grid grid-cols-1 items-start gap-12 md:mt-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-[17px] leading-relaxed text-ink-soft">{s.body}</p>
        </div>

        <div className="md:col-span-7">
          <Image
            src={s.image.src}
            alt=""
            width={s.image.width}
            height={s.image.height}
            sizes="(min-width: 768px) 640px, 100vw"
            onClick={() => onExpand(s.image.src)}
            className="h-auto w-full cursor-zoom-in rounded-2xl border border-rule shadow-lift"
          />
        </div>
      </div>

      {/* The three-phase arc sits below the side-by-side block rather than
          interrupting it — a summary of the same story the paragraph and
          screenshot just told, not a replacement for either. Same visual
          model as Fitlogs' RoadmapTimeline. */}
      <div className="mt-14 md:mt-20">
        <MilestoneTimeline phases={s.phases} />
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- 06 outcomes */

function Outcomes() {
  const s = forge.outcomes;
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      <p className="mt-10 max-w-3xl text-[17px] leading-relaxed text-ink-soft md:mt-12">
        {s.body}
      </p>

      <div className="mt-12 overflow-hidden rounded-2xl border border-rule shadow-lift md:mt-16">
        <AutoVideo src={s.video.src} className="w-full object-cover" controls />
      </div>
    </Section>
  );
}
