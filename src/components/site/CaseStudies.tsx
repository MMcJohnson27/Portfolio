import { caseStudies, sections } from "@/lib/content";
import { CaseStudyCard } from "./CaseStudyCard";
import { RevealGroup, RevealItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

/**
 * CASE STUDIES — a staggered two-column grid.
 *
 * The right column drops 48px on large screens, so the two columns never line
 * up into a table. `mt` rather than `translate-y` on purpose: the offset is
 * part of the row's height, so nothing overhangs into the next section and the
 * two columns keep matching vertical gaps between cards.
 *
 * Those two numbers add up — the gap a reader sees between cards in one column
 * is `gap-y` plus the offset, so 48 + 48 lands at 96px rather than the 176px
 * that a 112px offset produced.
 *
 * A single full-bleed rule opens the section and the header hangs beneath it —
 * no closing border, so the band reads as a masthead rather than a boxed
 * banner. The gap below the header is the band's own `pb` plus the grid's
 * `pt`; the two add up, so change one and check the other.
 *
 * The stagger sits on the reveal wrapper rather than the card, because the
 * wrapper animates `y` — a Tailwind translate on the same node would be
 * silently overwritten by Framer Motion's inline transform.
 */
export function CaseStudies() {
  const s = sections.work;

  return (
    /* scroll-mt clears the fixed nav: with the top padding this tight, an
       anchor jump would otherwise tuck the first card under the header. */
    <section id={s.id} className="scroll-mt-24">
      {/* Full-bleed so the rule runs edge to edge; only the contents are
          held to the shell. */}
      <div className="border-t border-rule">
        <div className="mx-auto max-w-shell px-5 pb-6 pt-12 md:px-10 md:pt-14">
          <SectionHeader
            index={s.index}
            title={s.title}
            kicker={`${String(caseStudies.length).padStart(2, "0")} projects`}
            note={s.note}
          />
        </div>
      </div>

      <RevealGroup className="mx-auto grid max-w-shell grid-cols-1 gap-x-10 gap-y-16 px-5 pb-24 pt-12 md:px-10 md:pb-28 md:pt-16 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-12">
        {caseStudies.map((study, i) => (
          <RevealItem key={study.id} className={i % 2 === 1 ? "lg:mt-12" : undefined}>
            <CaseStudyCard study={study} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
