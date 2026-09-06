"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cluster, portrait, portraitPosition } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { Arch } from "./Arch";

/**
 * GRAVITY CLUSTER — the hero's one authored moment.
 *
 * At rest: an arched portrait with five smaller arches drifting around it.
 * On hover the portrait takes hold of the composition — the satellites are
 * drawn slowly to dead centre and collapse, while the single hairline frame
 * around the portrait — two concentric outlines — echoes outward into four.
 *
 * The pull is deliberately slower than the fade: gravity should look like it
 * costs something.
 *
 * The satellites' offsets are absolute pixels tuned to the right-hand column,
 * so they render only at `lg`. Below that the portrait stands alone, which is
 * also the honest answer for touch, where there is no hover to trigger any of
 * this.
 */

/**
 * Two rings, which with the arch's own hairline makes three frames on hover.
 * They fade as they travel so the echo dissipates instead of stopping hard.
 */
const RIPPLES = [
  { scale: 1.06, opacity: 0.34, delay: 0 },
  { scale: 1.12, opacity: 0.2, delay: 0.06 },
];

export function GravityCluster() {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(false);
  const [wide, setWide] = useState(false);

  // Rendered, not just hidden: display:none would still run five float loops.
  // Resolving after mount also keeps the server and client markup identical.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div
      className="relative mx-auto w-full max-w-[200px] sm:max-w-[230px] lg:max-w-[260px]"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* ---- the echo: ten rings, stacked at rest ---- */}
      {wide
        ? RIPPLES.map((r, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-b-sm rounded-t-full border border-ink"
              initial={false}
              animate={{
                scale: active && !reduced ? r.scale : 1,
                opacity: active ? r.opacity : 0,
              }}
              style={{ willChange: "transform, opacity" }}
              transition={{
                duration: active ? 0.75 : 0.45,
                ease: EASE,
                delay: active ? r.delay : 0,
              }}
            />
          ))
        : null}

      {/* ---- the satellites ---- */}
      {wide
        ? cluster.map((n, i) => (
            <motion.div
              key={n.id}
              aria-hidden="true"
              className="pointer-events-none absolute"
              /* Centred with margins, not a translate class, so Framer's inline
                 transform is the only thing writing to `transform`. */
              style={{
                left: "50%",
                top: "50%",
                width: n.w,
                marginLeft: -n.w / 2,
                marginTop: -((n.w * 4) / 3) / 2,
              }}
              initial={false}
              animate={
                active
                  ? reduced
                    ? { x: n.x, y: n.y, scale: 1, opacity: 0 }
                    : { x: 0, y: 0, scale: 0, opacity: 0 }
                  : { x: n.x, y: n.y, scale: 1, opacity: 1 }
              }
              transition={{
                duration: active ? 0.95 : 0.85,
                ease: active ? "easeInOut" : EASE,
                delay: active ? i * 0.05 : 0,
              }}
            >
              <motion.div
                animate={
                  reduced || active
                    ? { x: 0, y: 0 }
                    : {
                        x: [0, n.drift, -n.drift * 0.7, n.drift * 0.4, 0],
                        y: [0, -n.drift * 0.8, n.drift * 0.9, -n.drift * 0.5, 0],
                      }
                }
                transition={
                  reduced || active
                    ? { duration: 0.4, ease: EASE }
                    : {
                        duration: n.dur,
                        delay: n.delay,
                        ease: "easeInOut",
                        repeat: Infinity,
                        times: [0, 0.25, 0.5, 0.75, 1],
                      }
                }
              >
                <Arch src={n.src} position={n.position} sizes={`${n.w * 2}px`} />
              </motion.div>
            </motion.div>
          ))
        : null}

      {/* ---- the centrepiece ---- */}
      <div className="relative">
        <Arch
          src={portrait}
          position={portraitPosition}
          monogram
          framed
          priority
          sizes="(min-width: 1024px) 260px, 60vw"
        />
      </div>
    </div>
  );
}
