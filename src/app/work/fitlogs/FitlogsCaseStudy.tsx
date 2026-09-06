"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { fitlogs } from "@/lib/fitlogs";
import { AutoVideo } from "@/components/case/AutoVideo";
import { CaseNav } from "@/components/case/CaseNav";
import RoadmapTimeline from "@/components/case/RoadmapTimeline";

const CONTENTS = [
  { id: fitlogs.catalyst.id, index: fitlogs.catalyst.index, label: fitlogs.catalyst.title },
  { id: fitlogs.architecture.id, index: fitlogs.architecture.index, label: fitlogs.architecture.title },
  { id: fitlogs.wireframes.id, index: fitlogs.wireframes.index, label: fitlogs.wireframes.title },
  { id: fitlogs.hifi.id, index: fitlogs.hifi.index, label: fitlogs.hifi.title },
  { id: fitlogs.development.id, index: fitlogs.development.index, label: fitlogs.development.title },
  { id: fitlogs.outcomes.id, index: fitlogs.outcomes.index, label: fitlogs.outcomes.title },
];

/**
 * FITLOGS — the long read.
 *
 * Same shell as /work/jurni: a 12-col grid wraps the whole page, a sticky
 * rail (back link + contents) holds three columns from the top, and
 * everything else reads down the remaining nine. This is a client
 * component (state for the lightbox), with `page.tsx` staying a server
 * component so the route can still export `metadata` — same split as Jurni.
 */
export default function FitlogsCaseStudy() {
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
            <Catalyst />
            <Architecture onExpand={setExpandedImage} />
            <Wireframes onExpand={setExpandedImage} />
            <Hifi onExpand={setExpandedImage} />
            <Development onExpand={setExpandedImage} />
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
        {fitlogs.title}
      </h1>

      <div className="overflow-hidden rounded-2xl border border-rule">
        <AutoVideo src={fitlogs.hero} className="aspect-video w-full object-cover" />
      </div>

      <dl className="mt-8 grid grid-cols-1 justify-items-center gap-6 text-center sm:grid-cols-2 md:grid-cols-4">
        {fitlogs.meta.map((m) => (
          <div key={m.label}>
            <dt className="label">{m.label}</dt>
            <dd className="mt-2 text-[15px] leading-snug text-ink md:text-base">{m.value}</dd>
          </div>
        ))}

        <div>
          <dt className="label">Tech Stack</dt>
          <dd className="mt-3 grid w-fit grid-cols-2 gap-3">
            {fitlogs.techLogos.map((logo) => (
              <div
                key={logo.src}
                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-rule bg-paper shadow-sm"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  sizes="48px"
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </dd>
        </div>
      </dl>
    </header>
  );
}

/* --------------------------------------------------------- 01 catalyst */

function Catalyst() {
  const s = fitlogs.catalyst;
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      <h3 className="label mt-10 md:mt-12">{s.spark.heading}</h3>
      <p className="mt-4 w-full text-[17px] leading-relaxed text-ink-soft">{s.spark.body}</p>

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
          <span className="text-sm font-semibold text-ink">{s.spark.paper.title}</span>
        </div>

        <a
          href={s.spark.paper.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none whitespace-nowrap text-sm font-medium text-clay transition-colors duration-300 ease-editorial hover:text-ink"
        >
          Read Full Paper ↗
        </a>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 md:gap-12">
        {[s.problem, s.solution].map((col) => (
          <div key={col.heading}>
            <h3 className="label">{col.heading}</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{col.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------------------------- 02 architecture */

function Architecture({ onExpand }: { onExpand: (src: string) => void }) {
  const s = fitlogs.architecture;
  const paragraphs = s.narrative.split("\n\n");
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      {/* The narrative sits beside the personas instead of running full-width
          above them — text pinned to the left 5 columns, both personas
          stacked in the right 7. */}
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[17px] leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="flex flex-col gap-8">
            {s.personas.map((p) => (
              <figure key={p.src}>
                <figcaption className="mb-3 text-sm text-ink-mute">{p.caption}</figcaption>
                <Image
                  src={p.src}
                  alt=""
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 768px) 640px, 100vw"
                  onClick={() => onExpand(p.src)}
                  className="h-auto w-full cursor-zoom-in rounded-2xl border border-rule"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 md:mt-20">
        <Image
          src={s.userFlow.src}
          alt=""
          width={s.userFlow.width}
          height={s.userFlow.height}
          sizes="(min-width: 768px) 780px, 100vw"
          onClick={() => onExpand(s.userFlow.src)}
          className="h-auto w-full cursor-zoom-in rounded-2xl border border-rule"
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------ 03 wireframes */

function Wireframes({ onExpand }: { onExpand: (src: string) => void }) {
  const s = fitlogs.wireframes;
  const paragraphs = s.narrative.split("\n\n");

  return (
    <Section id={s.id} index={s.index} title={s.title}>
      <div className="mt-8 space-y-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="w-full text-[17px] leading-relaxed text-ink-soft">
            {p}
          </p>
        ))}
      </div>

      {/* The user-flow diagram moved to section 02 as the ecosystem hub
          image, so this section is just the two wireframes now — no need
          for the toggle that used to separate them. */}
      <p className="mb-3 mt-8 text-center text-sm text-ink-mute">{s.caption}</p>

      <div className="flex flex-row justify-center gap-6">
        {s.images.map((img) => (
          <Image
            key={img.src}
            src={img.src}
            alt=""
            width={img.width}
            height={img.height}
            sizes="240px"
            onClick={() => onExpand(img.src)}
            className="h-auto w-full max-w-[240px] cursor-zoom-in rounded-[2rem] border border-rule object-contain shadow-lift"
          />
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- 04 hifi */

function Hifi({ onExpand }: { onExpand: (src: string) => void }) {
  const s = fitlogs.hifi;
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      {/*
        Segmented sticky scroll: each feature gets its own sticky-split row
        instead of one grid spanning all three, so the pinned text swaps to
        the next feature exactly as its own images scroll through — rather
        than one write-up staying pinned across screens it no longer
        describes. items-start on each row is load-bearing: without it the
        row stretches both columns to equal height and the sticky child has
        no room to travel independently of its row.
      */}
      <div className="mt-12 flex flex-col gap-24 md:mt-16 md:gap-32">
        {s.blocks.map((b, i) => (
          <div
            key={b.heading}
            className="relative grid grid-cols-1 items-start gap-12 md:grid-cols-12"
          >
            <div className="md:sticky md:top-32 md:h-max md:col-span-5">
              <h3 className="font-display text-2xl leading-tight tracking-tight text-ink md:text-3xl">
                {b.heading}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{b.body}</p>
              {"formula" in b && b.formula ? (
                <span className="mt-4 inline-block rounded border border-rule bg-paper-deep px-2 py-1 font-mono text-sm text-ink">
                  {b.formula}
                </span>
              ) : null}
            </div>

            <div className="mt-12 flex flex-col gap-16 md:col-span-7 md:mt-0">
              {s.screens[i].map((shot) => (
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt=""
                  width={shot.width}
                  height={shot.height}
                  sizes="320px"
                  onClick={() => onExpand(shot.src)}
                  className="mx-auto w-full max-w-[320px] cursor-zoom-in rounded-[2rem] border border-rule shadow-lift"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------- 05 development */

function Development({ onExpand }: { onExpand: (src: string) => void }) {
  const s = fitlogs.development;
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      {/* The write-up spans the full width instead of being confined to the
          left 6 columns — that way the process images and the video both
          start from the same top edge below it, instead of the video
          sitting higher than the (text-pushed-down) images beside it. */}
      <div className="mt-10 space-y-10 md:mt-12">
        {s.blocks.map((b) => (
          <div key={b.heading}>
            <h3 className="font-display text-2xl leading-tight tracking-tight text-ink md:text-3xl">
              {b.heading}
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{b.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 items-start gap-x-8 gap-y-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="flex flex-col gap-8">
            {s.process.map((shot) => (
              <Image
                key={shot.src}
                src={shot.src}
                alt=""
                width={shot.width}
                height={shot.height}
                sizes="384px"
                onClick={() => onExpand(shot.src)}
                className="w-full max-w-sm cursor-zoom-in rounded-xl border border-rule shadow-plate"
              />
            ))}
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="md:sticky md:top-32">
            <div className="mx-auto aspect-[734/1446] w-full max-w-[300px] overflow-hidden rounded-[2rem] border border-rule bg-ink shadow-lift">
              <AutoVideo src={s.fullApp} className="h-full w-full object-cover" controls />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------- 06 outcomes */

function Outcomes() {
  const s = fitlogs.outcomes;
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      <h3 className="label mt-10 md:mt-12">{s.roadmap.heading}</h3>
      <p className="mt-4 w-full text-[17px] leading-relaxed text-ink-soft">{s.roadmap.body}</p>

      <h3 className="label mt-10">{s.reflections.heading}</h3>
      <p className="mt-4 w-full text-[17px] leading-relaxed text-ink-soft">{s.reflections.body}</p>

      {/* Same treatment as the Research Artifact card in section 01. */}
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
            <path d="M14 4h6v6" />
            <path d="M9.5 14.5 20 4" />
            <path d="M18 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5.5" />
          </svg>
          <span className="text-sm font-semibold text-ink">{s.liveApp.title}</span>
        </div>

        <a
          href={s.liveApp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none whitespace-nowrap text-sm font-medium text-clay transition-colors duration-300 ease-editorial hover:text-ink"
        >
          Try Fitlogs ↗
        </a>
      </div>

      <div className="mt-14 md:mt-20">
        <RoadmapTimeline />
      </div>
    </Section>
  );
}
