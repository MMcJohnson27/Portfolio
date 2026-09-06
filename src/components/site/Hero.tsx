"use client";

import { motion, type Variants } from "framer-motion";
import { credentials, hero } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { GravityCluster } from "./GravityCluster";
import { RotatingRole } from "./RotatingRole";

/**
 * HERO — deliberately short.
 *
 * No `min-h-screen`: the hero is sized to leave the top of the case-study grid
 * showing above the fold, so the first thing a recruiter sees on a laptop is
 * the work, not an empty screen they have to scroll past. Its bottom padding
 * and the work section's top padding are a matched pair — change one, check
 * the other.
 */

const sequence: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

/** Everything enters the same way — up 20px, fading, on the site's ease-out. */
const riseUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Hero() {
  return (
    <section
      id="top"
      /*
        No background of its own and no bottom rule: the page is one colour,
        and the work section's top border is the divider between them.

        Clipped because the cluster's satellites sit wider than the right-hand
        column at some viewports — without this the page gains a horizontal
        scrollbar around the lg breakpoint.
      */
      className="relative w-full overflow-hidden"
    >
      <motion.div
        variants={sequence}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid max-w-shell grid-cols-1 items-center gap-x-10 gap-y-12 px-5 pb-20 pt-28 md:px-10 lg:grid-cols-12"
      >
        {/* ---------------- typography ---------------- */}
        <div className="lg:col-span-6">
          <motion.h1
            variants={riseUp}
            className="font-display text-5xl leading-[1.03] tracking-tight text-ink md:text-6xl lg:text-7xl"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={riseUp}
            className="mt-6 max-w-xl text-lg font-light leading-relaxed text-ink-soft md:text-xl"
          >
            {/* One stable sentence for assistive tech; the animated one is hidden. */}
            <span className="sr-only">{hero.introStatic}</span>
            <span aria-hidden="true">
              <span className="text-ink">{hero.introLead}</span>
              <RotatingRole />
              {hero.introTail}
            </span>
          </motion.p>

          <motion.ul
            variants={riseUp}
            className="mt-10 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2"
          >
            {credentials.map((c, i) => (
              <li key={c} className="label flex items-center gap-3 text-ink/60">
                {c}
                {/* Trailing, not leading: a wrapped line must never open on a bullet. */}
                {i < credentials.length - 1 ? (
                  <span aria-hidden="true" className="hidden text-ink-faint sm:inline">
                    •
                  </span>
                ) : null}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---------------- the cluster ---------------- */}
        <motion.div variants={riseUp} className="lg:col-span-6 lg:col-start-7">
          <GravityCluster />
        </motion.div>
      </motion.div>
    </section>
  );
}
