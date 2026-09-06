import type { ReactNode } from "react";
import { PLACEHOLDER, sections, shorts, type Short } from "@/lib/content";
import { RevealGroup, RevealItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";

/**
 * SHORTS — the video gallery, empty.
 *
 * Portrait 9:16 frames, because these are reel-format rundowns rather than
 * embedded desktop video. Each slot takes a poster frame or a muted looping
 * <video> as `children` later; the grid and the meta rail don't move.
 */
export function Shorts() {
  const s = sections.shorts;
  const count = String(shorts.length).padStart(2, "0");

  return (
    <section id={s.id} className="border-t border-rule bg-paper-deep/40">
      <div className="mx-auto max-w-shell px-5 py-28 md:px-10 md:py-36">
        <SectionHeader index={s.index} title={s.title} kicker={`${count} videos`} note={s.note} />

        <RevealGroup className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-20 md:grid-cols-4 md:gap-x-6">
          {shorts.map((short) => (
            <RevealItem key={short.id}>
              <ShortCard short={short} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ShortCard({ short }: { short: Short }) {
  return (
    <CardShell href={short.href} className="group block">
      <Slot ratio="9 / 16" media="video" index={short.index} label="Video" />

      <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-rule pt-3">
        <span className="label tabular-nums text-clay">{short.index}</span>
        <span className={`label tabular-nums ${short.duration ? "" : "text-ink-faint"}`}>
          {short.duration ?? PLACEHOLDER.duration}
        </span>
      </div>

      <p className={`mt-2 text-[15px] leading-snug ${short.title ? "text-ink" : "text-ink-faint"}`}>
        {short.title ?? PLACEHOLDER.title}
      </p>
    </CardShell>
  );
}

/** Same rule as the case studies: no anchor until there's somewhere to go. */
function CardShell({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return <div className={className}>{children}</div>;
}
