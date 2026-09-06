"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { roles } from "@/lib/content";
import { EASE } from "@/lib/motion";

const HOLD_MS = 2200;

export function RotatingRole() {
  const reduced = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const [running, setRunning] = useState(true);

  const host = useRef<HTMLSpanElement>(null);
  const sizers = useRef<Array<HTMLSpanElement | null>>([]);

  // Loops are a battery cost nobody is watching when the hero is scrolled past
  // or the tab is in the background.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting));
    io.observe(el);
    const onVisibility = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (reduced || !running) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduced, running]);

  // Re-measure on mount, on index change, and whenever the font or viewport
  // could have changed the metrics.
  useEffect(() => {
    const measure = () => {
      const el = sizers.current[index];
      if (el) setWidth(el.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener("resize", measure);
    if (document.fonts?.ready) void document.fonts.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [index]);

  return (
    <span ref={host} className="relative inline-flex align-bottom">
      {/* off-screen sizers: one per role, measured, never painted */}
      <span aria-hidden="true" className="pointer-events-none invisible absolute left-0 top-0 h-0 overflow-hidden">
        {roles.map((role, i) => (
          <span
            key={role}
            ref={(el) => {
              sizers.current[i] = el;
            }}
            className="absolute whitespace-nowrap"
          >
            {role}
          </span>
        ))}
      </span>

      <motion.span
        aria-hidden="true"
        className="relative inline-flex overflow-hidden whitespace-nowrap text-[#B95800]"
        animate={{ width: width ?? "auto" }}
        transition={{ duration: 0.42, ease: EASE }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={roles[index]}
            initial={reduced ? { opacity: 0 } : { y: "105%", opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { y: "0%", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: "-105%", opacity: 0 }}
            transition={{ duration: 0.52, ease: EASE }}
            className="whitespace-nowrap"
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}
