"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sticky contents for a case study.
 *
 * The active item is driven by an observer rather than the URL hash, so it
 * tracks free scrolling and not just clicks. The band is deliberately narrow —
 * a section counts as current only while it crosses the upper third of the
 * viewport, which stops two entries lighting up at once on long sections.
 */
export function CaseNav({
  items,
}: {
  items: { id: string; index: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  const inBand = useRef<Set<string>>(new Set());

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const seen = inBand.current;
    const io = new IntersectionObserver(
      (entries) => {
        // A callback only reports what *changed*, so the set has to persist —
        // filtering `entries` alone would forget sections that are still in
        // the band but did not move this tick.
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target.id);
          else seen.delete(e.target.id);
        }
        // The current section is the last one in document order that has
        // entered the band, not the first: at a boundary both the outgoing and
        // incoming section cross it, and the outgoing one starts higher.
        for (let i = items.length - 1; i >= 0; i--) {
          if (seen.has(items[i].id)) {
            setActive(items[i].id);
            return;
          }
        }
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      seen.clear();
    };
  }, [items]);

  return (
    <nav aria-label="Case study contents">
      <ol className="space-y-8">
        {items.map((i) => {
          const on = active === i.id;
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={on ? "true" : undefined}
                className={`flex items-baseline gap-3 font-mono text-sm uppercase tracking-label transition-colors duration-300 ease-editorial hover:text-clay ${
                  on ? "text-clay" : "text-ink-mute"
                }`}
              >
                <span className="tabular-nums">{i.index}</span>
                <span>{i.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
