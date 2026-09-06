import type { Transition, Variants } from "framer-motion";

/** One easing curve for the whole site. Editorial: fast out, long settle. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Premium spring — weighty, never bouncy. */
export const spring: Transition = { type: "spring", stiffness: 100, damping: 20 };
export const springSoft: Transition = { type: "spring", stiffness: 64, damping: 18, mass: 1.1 };
export const springSnap: Transition = { type: "spring", stiffness: 260, damping: 26 };

/** Parent orchestrator — children must live in the same client tree. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.12 } },
};

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 22 } },
};

/** Type reveal: the line slides up out of an overflow-hidden mask. */
export const maskUp: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 0.95, ease: EASE } },
};

export const frameIn: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 22 },
  show: { opacity: 1, scale: 1, y: 0, transition: springSoft },
};

/** Hairlines that draw themselves across the page. */
export const ruleDrawX: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.4, ease: EASE } },
};

export const ruleDrawY: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 1.6, ease: EASE } },
};
