"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { cognativ } from "@/lib/cognativ";
import { AutoVideo } from "@/components/case/AutoVideo";
import { CaseNav } from "@/components/case/CaseNav";

const CONTENTS = [
  { id: cognativ.brief.id, index: cognativ.brief.index, label: cognativ.brief.title },
  { id: cognativ.catalyst.id, index: cognativ.catalyst.index, label: cognativ.catalyst.title },
  { id: cognativ.ia.id, index: cognativ.ia.index, label: cognativ.ia.title },
  { id: cognativ.duel.id, index: cognativ.duel.index, label: cognativ.duel.title },
  { id: cognativ.handoff.id, index: cognativ.handoff.index, label: cognativ.handoff.title },
  { id: cognativ.outcomes.id, index: cognativ.outcomes.index, label: cognativ.outcomes.title },
];

/**
 * COGNATIV — the long read.
 *
 * Same shell as /work/fitlogs and /work/jurni: a 12-col grid wraps the whole
 * page, a sticky rail (back link + contents) holds three columns from the
 * top, and everything else reads down the remaining nine. Client component
 * for the lightbox state; `page.tsx` stays a server component so the route
 * can still export `metadata`.
 */
export default function CognativCaseStudy() {
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
            <Catalyst onExpand={setExpandedImage} />
            <IA onExpand={setExpandedImage} />
            <Duel onExpand={setExpandedImage} />
            <Handoff />
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

/** The bordered artifact/link card reused for both the audit deck and the
    live site — same treatment across every case study on this site. */
function ArtifactLink({
  icon,
  title,
  href,
  cta,
}: {
  icon: ReactNode;
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="mt-6 flex flex-col items-start gap-3 rounded-xl border border-rule bg-paper-deep/40 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-semibold text-ink">{title}</span>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-none whitespace-nowrap text-sm font-medium text-clay transition-colors duration-300 ease-editorial hover:text-ink"
      >
        {cta}
      </a>
    </div>
  );
}

function DocIcon() {
  return (
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
  );
}

function ExternalIcon() {
  return (
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
  );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  return (
    <header className="pb-6 pt-16 md:pb-8 md:pt-20">
      <h1 className="mb-8 font-display text-4xl leading-[1.06] tracking-tight text-ink md:text-5xl lg:whitespace-nowrap lg:text-6xl">
        {cognativ.title}
      </h1>

      <div className="overflow-hidden rounded-2xl border border-rule">
        <AutoVideo src={cognativ.hero} className="aspect-video w-full object-cover" />
      </div>

      <dl className="mt-8 grid grid-cols-1 justify-items-center gap-6 text-center sm:grid-cols-2 md:grid-cols-4">
        {cognativ.meta.map((m) => (
          <div key={m.label}>
            <dt className="label">{m.label}</dt>
            <dd className="mt-2 text-[15px] leading-snug text-ink md:text-base">{m.value}</dd>
          </div>
        ))}

        <div>
          <dt className="label">Team</dt>
          <dd className="mt-2 flex flex-col gap-0.5 text-[15px] leading-snug text-ink md:text-base">
            {cognativ.team.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </dd>
        </div>

        <div>
          <dt className="label">Tech Stack</dt>
          <dd className="mt-3 grid w-fit grid-cols-2 gap-3">
            {cognativ.techLogos.map((logo) => (
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

/* -------------------------------------------------------------- 01 brief */

function Brief() {
  const s = cognativ.brief;
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
    </Section>
  );
}

/* --------------------------------------------------- 02 catalyst / buy-in */

function Catalyst({ onExpand }: { onExpand: (src: string) => void }) {
  const s = cognativ.catalyst;
  const paragraphs = s.narrative.split("\n\n");

  // This section builds its own <section> shell instead of using the shared
  // <Section>: everywhere else the title sits full-width above the grid, but
  // here the whole point is that the image column has to start flush with
  // the top of the title, not the paragraph below it. That only works if
  // the title lives inside the left column of the same items-start grid the
  // images sit in, so both columns share one top edge.
  return (
    <section id={s.id} className="scroll-mt-28 border-t border-rule py-16 md:py-20">
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
            <span className="text-clay tabular-nums">{s.index}</span>
            <span className="mx-3 text-ink-faint">/</span>
            {s.title}
          </h2>

          <div className="mt-10 space-y-5 md:mt-12">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[17px] leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
          <ArtifactLink
            icon={<DocIcon />}
            title={s.audit.title}
            href={s.audit.href}
            cta={s.audit.cta}
          />
        </div>

        <div className="flex flex-col gap-8 md:col-span-7">
          {s.studies.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              sizes="(min-width: 768px) 32rem, 100vw"
              onClick={() => onExpand(img.src)}
              className="mx-auto h-auto w-full max-w-lg cursor-zoom-in rounded-xl border border-rule object-contain shadow-sm"
            />
          ))}

          {/* Just the two strongest slides — curated, not the full deck. */}
          <div className="grid grid-cols-2 gap-4">
            {s.slides.map((img) => (
              <Image
                key={img.src}
                src={img.src}
                alt=""
                width={img.width}
                height={img.height}
                sizes="(min-width: 768px) 320px, 50vw"
                onClick={() => onExpand(img.src)}
                className="h-auto w-full cursor-zoom-in rounded-xl border border-rule object-contain shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ 03 structural IA */

function IA({ onExpand }: { onExpand: (src: string) => void }) {
  const s = cognativ.ia;
  const paragraphs = s.narrative.split("\n\n");

  return (
    <Section id={s.id} index={s.index} title={s.title}>
      {/* Classic sticky split: the write-up stays pinned in the left 5
          columns while the three diagrams scroll past in the right 7.
          items-start on the parent grid is load-bearing — without it the
          row stretches both columns to equal height and the sticky child
          has no room to travel. Native w-full/h-auto sizing (no fill, no
          forced height) keeps every image crisp at its own resolution. */}
      <div className="relative mt-10 grid grid-cols-1 items-start gap-12 md:mt-12 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:sticky md:top-32 md:h-max md:col-span-5">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[17px] leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-16 md:col-span-7 md:mt-0">
          {s.images.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              sizes="(min-width: 768px) 640px, 100vw"
              onClick={() => onExpand(img.src)}
              className="h-auto w-full cursor-zoom-in rounded-xl border border-rule object-contain shadow-sm"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------- 04 design duel */

function Duel({ onExpand }: { onExpand: (src: string) => void }) {
  const s = cognativ.duel;
  const paragraphs = s.narrative.split("\n\n");

  return (
    <Section id={s.id} index={s.index} title={s.title}>
      {/* Full-width write-up, then the three iterations laid out side-by-side
          below it — a comparison reads left-to-right, not pinned beside a
          scroll, so this section skips the sticky split the others use. */}
      <div className="mt-10 max-w-3xl space-y-5 md:mt-12">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[17px] leading-relaxed text-ink-soft">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 md:mt-16">
        {s.images.map((img) => (
          <figure key={img.src} className="flex flex-col">
            {/* Same treatment as the media labels elsewhere on the site
                (e.g. Jurni's audit/mapping captions): a small mono-weight
                line sitting above the asset it introduces, not a caption
                trailing below it. */}
            <figcaption className="mb-3 text-center text-sm text-ink-mute">{img.caption}</figcaption>
            <Image
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              sizes="(min-width: 640px) 33vw, 100vw"
              onClick={() => onExpand(img.src)}
              className="mx-auto h-auto w-full max-w-xs cursor-zoom-in rounded-2xl border border-rule shadow-lift"
            />
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------------------------- 05 hi-fi / handoff */

function Handoff() {
  const s = cognativ.handoff;
  const paragraphs = s.body.split("\n\n");
  return (
    <Section id={s.id} index={s.index} title={s.title}>
      <div className="mt-10 max-w-3xl space-y-5 md:mt-12">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[17px] leading-relaxed text-ink-soft">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-rule shadow-lift md:mt-16">
        <AutoVideo src={s.video.src} className="w-full object-cover" controls />
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------- 06 outcomes */

function Outcomes() {
  const s = cognativ.outcomes;
  const paragraphs = s.narrative.split("\n\n");

  return (
    <Section id={s.id} index={s.index} title={s.title}>
      {/* 5/7 split, both columns starting at the same top edge: the video
          sits flush with the section header's row instead of sitting lower
          than the text beside it, and the live-site link now reads as the
          video's own caption rather than living with the write-up. */}
      <div className="mt-10 grid grid-cols-1 gap-12 md:mt-12 md:grid-cols-12">
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
          <div className="overflow-hidden rounded-2xl border border-rule shadow-lift">
            <AutoVideo src={s.video.src} className="w-full object-cover" controls />
          </div>

          <ArtifactLink
            icon={<ExternalIcon />}
            title={s.liveSite.title}
            href={s.liveSite.href}
            cta={s.liveSite.cta}
          />
        </div>
      </div>
    </Section>
  );
}
