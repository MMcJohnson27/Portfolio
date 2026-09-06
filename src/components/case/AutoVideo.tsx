"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A looping silent clip that only fetches once it is near the viewport.
 *
 * This page carries ~75MB of screen capture. `preload="none"` plus an observer
 * means a visitor who never reaches a section never pays for it, and the clips
 * stop decoding as soon as they scroll away.
 */
export function AutoVideo({
  src,
  poster,
  className,
  controls = false,
  onClick,
}: {
  src: string;
  poster?: string;
  className?: string;
  controls?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // rootMargin gives the clip a head start so it is playing by the time it
    // is actually on screen, rather than starting cold at the boundary.
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "200px 0px",
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    if (inView) void v.play().catch(() => {});
    else v.pause();
  }, [inView, reduced]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      controls={controls}
      preload="none"
      aria-hidden={!controls}
      className={className}
      onClick={onClick}
    />
  );
}
