"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { riseIn, stagger } from "@/lib/motion";

/**
 * Scroll reveal, in two pieces so the sections themselves can stay server
 * components: the group owns the trigger and the stagger, the items only
 * declare the variant they inherit.
 */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={riseIn} className={className}>
      {children}
    </motion.div>
  );
}
