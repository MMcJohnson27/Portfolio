"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { EASE } from "@/lib/motion";
import { identity, nav, navCta } from "@/lib/content";

/**
 * NAV — monogram, two links, one button.
 *
 * It arrives last, after the hero's four elements have settled. The delay is
 * hand-matched to that sequence rather than shared through `staggerChildren`,
 * because the nav lives in the layout and the hero in the page: they are
 * different React trees, so no variant context reaches across.
 */
const NAV_DELAY = 0.62;

export function Nav() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 24;
    setLifted((prev) => (prev === next ? prev : next));
  });

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: NAV_DELAY }}
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ease-editorial ${
          lifted ? "border-b border-rule bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-shell items-center justify-between px-5 md:px-10">
          <a
            href="/#top"
            aria-label={`${identity.name} — home`}
            className="font-display text-xl leading-none tracking-tight text-ink transition-colors duration-300 ease-editorial hover:text-clay"
          >
            {identity.monogram}
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rule-draw label text-ink transition-colors duration-300 ease-editorial hover:text-clay"
              >
                {l.label}
              </a>
            ))}

            <a
              href={navCta.href}
              className="label border border-rule px-5 py-2.5 text-ink transition-colors duration-500 ease-editorial hover:border-ink hover:bg-ink hover:text-paper"
            >
              {navCta.label}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] transition-opacity hover:opacity-60 md:hidden"
          >
            <span className="h-px w-5 bg-ink" />
            <span className="h-px w-5 bg-ink" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-50 bg-paper px-5 py-6 md:hidden"
          >
            <div className="flex h-14 items-center justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.1" />
                </svg>
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
              className="mt-10"
            >
              {[...nav, navCta].map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                  className="border-b border-rule"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-5 font-display text-4xl tracking-tight text-ink"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <p className="label absolute inset-x-5 bottom-8">{identity.email}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
