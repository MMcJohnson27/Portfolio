"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CaseStudy } from "@/lib/content";
import { EASE } from "@/lib/motion";

/**
 * One case study.
 *
 * The thumbnail loop runs by default. On hover the hover-state loop dissolves
 * in over it and the summary fades up centred on the media — with **no scrim,
 * tint or backdrop blur**. The contrast is baked into the hover clip itself,
 * which is why nothing is layered behind the type.
 *
 * The hover clip is only faded up once it is genuinely playing. Fading on
 * `mouseenter` alone would dissolve to a black frame for however long the
 * fetch takes, so the thumbnail holds until `onPlaying` fires.
 */

/**
 * The overlay fades as one object; its lines rise in sequence inside it. The
 * stagger reads as the block settling into place rather than three separate
 * elements arriving.
 */
const overlay: Variants = {
  rest: { opacity: 0, transition: { duration: 0.3, ease: EASE } },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: EASE, staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const overlayLine: Variants = {
  rest: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const reduced = useReducedMotion() ?? false;

  const base = useRef<HTMLVideoElement>(null);
  const hover = useRef<HTMLVideoElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const rewind = useRef<number | null>(null);

  const [hovered, setHovered] = useState(false);
  const [hoverReady, setHoverReady] = useState(false);
  const [inView, setInView] = useState(false);

  // The thumbnails loop "permanently", but there is no reason to decode four
  // of them while the section is off screen.
  useEffect(() => {
    const el = shell.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = base.current;
    if (!v) return;
    // Auto-playing video is exactly what reduced-motion asks us not to do, so
    // that preference parks both clips on the poster frame instead.
    if (inView && !reduced) void v.play().catch(() => {});
    else v.pause();
  }, [inView, reduced]);

  const enter = useCallback(() => {
    if (reduced) return;
    if (rewind.current !== null) {
      window.clearTimeout(rewind.current);
      rewind.current = null;
    }
    setHovered(true);
    void hover.current?.play().catch(() => {});
  }, [reduced]);

  const leave = useCallback(() => {
    setHovered(false);
    // Let it run through the dissolve — pausing on the spot freezes a frame
    // that is still half visible — then rewind for the next hover.
    rewind.current = window.setTimeout(() => {
      const v = hover.current;
      if (!v) return;
      v.pause();
      v.currentTime = 0;
      setHoverReady(false);
      rewind.current = null;
    }, 520);
  }, []);

  useEffect(
    () => () => {
      if (rewind.current !== null) window.clearTimeout(rewind.current);
    },
    []
  );

  const active = hovered && hoverReady;

  return (
    <CardShell href={study.href} className="group block" onEnter={enter} onLeave={leave}>
      <motion.div initial="rest" animate={hovered ? "show" : "rest"} ref={shell}>
        <div className="relative aspect-video w-full overflow-hidden border border-rule bg-ink transition-colors duration-500 ease-editorial group-hover:border-ink/30 group-focus-visible:border-ink/30">
            <video
              ref={base}
              src={study.video}
              poster={study.still}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <motion.video
              ref={hover}
              src={study.hoverVideo}
              loop
              muted
              playsInline
              preload="none"
              aria-hidden="true"
              onPlaying={() => setHoverReady(true)}
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/*
              Type straight onto the video. No background, no tint, no blur —
              the hover clip is graded to carry it.

              `justify-between` puts the index against the top padding and the
              text block against the bottom one, so both are set by the same
              `p-*` value and stay aligned to a single left edge.
            */}
            <motion.div
              aria-hidden="true"
              variants={overlay}
              className="pointer-events-none absolute inset-0 flex flex-col justify-between p-8 md:p-10"
            >
              <motion.span
                variants={overlayLine}
                className="label tabular-nums text-paper/75"
              >
                {study.index}
              </motion.span>

              <div>
                <motion.p
                  variants={overlayLine}
                  className="font-display text-3xl leading-none tracking-tight text-paper md:text-4xl"
                >
                  {study.title}
                </motion.p>
                <motion.p
                  variants={overlayLine}
                  className="mt-3.5 max-w-[54ch] text-[14px] font-medium leading-relaxed text-paper/90 md:mt-4 md:text-[15px]"
                >
                  {study.summary}
                </motion.p>
              </div>
            </motion.div>
        </div>
      </motion.div>

      {/* title left, metadata right, on one hairline */}
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5 border-t border-rule pt-4">
        <h3 className="font-display text-2xl leading-tight tracking-tight text-ink md:text-[28px]">
          {study.title}
        </h3>
        <span className="label tracking-[0.1em]">{study.meta}</span>
      </div>

      {/*
        The reveal needs a pointer. On touch it would never fire, so the summary
        prints in the flow instead — and stays in the a11y tree on hover
        devices, where it is the one accessible copy of the overlay text.
      */}
      <p className="mt-3 max-w-measure text-[14px] leading-relaxed text-ink-soft [@media(hover:hover)]:sr-only">
        {study.summary}
      </p>
    </CardShell>
  );
}

/**
 * A card is only an anchor once it points somewhere, so the grid never ships a
 * dead link — and an unlinked card stays out of the tab order, since there
 * would be nothing for a keyboard to activate.
 */
function CardShell({
  href,
  className,
  onEnter,
  onLeave,
  children,
}: {
  href?: string;
  className?: string;
  onEnter: () => void;
  onLeave: () => void;
  children: ReactNode;
}) {
  const handlers = {
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onFocus: onEnter,
    onBlur: onLeave,
  };

  if (href) {
    return (
      <a href={href} className={className} {...handlers}>
        {children}
      </a>
    );
  }
  return (
    <div className={className} {...handlers}>
      {children}
    </div>
  );
}
