/**
 * EcosystemDiagram — the "2+1" architecture graphic for Fitlogs.
 *
 * Two equal pillars (Dietary Tracking, Progressive Training) converge into
 * one hub (Holistic Weight Tracking). Mobile stacks Pillar → Pillar → Hub
 * top to bottom; desktop lays out Pillar → Hub ← Pillar as a row, both
 * spokes pointing in at the hub. The hub optionally renders a real diagram
 * image (`hubImage`) in place of the generic icon — used to show the
 * actual user-flow artifact instead of an abstract glyph.
 *
 * Ported from a hand-off draft that used arbitrary hex/shadow values —
 * redrawn with this site's tokens (rule/ink/clay, hairline borders, no
 * shadows) so it reads as part of the same system as every other section.
 */
import type { ReactNode } from "react";
import Image from "next/image";

/* ---------------------------- icons ---------------------------- */

function IconApple({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8.2c-2.1-2.6-5.6-2.4-7 .3-1.7 3.2.1 8.1 3 10.5 1.3 1.1 2.7 1.1 4 1.1s2.7 0 4-1.1c2.9-2.4 4.7-7.3 3-10.5-1.4-2.7-4.9-2.9-7-.3z" />
      <path d="M12 8.2V5.4" />
      <path d="M12 5.6c.9-1.3 2.4-1.7 3.6-1.3" />
    </svg>
  );
}

function IconDumbbell({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="8" width="3" height="8" rx="1" />
      <rect x="16" y="8" width="3" height="8" rx="1" />
      <path d="M2.5 10.5v3M21.5 10.5v3" />
      <path d="M8 12h8" />
    </svg>
  );
}

function IconTrend({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 16.5l5-5 3.5 3.5L20.5 7" />
      <path d="M15 7h5.5v5.5" />
    </svg>
  );
}

function ArrowGlyph({ dir = "right", className = "" }: { dir?: "right" | "left" | "down"; className?: string }) {
  const d = {
    right: "M1 6h9M6.5 2.5 10 6l-3.5 3.5",
    left: "M11 6H2M5.5 2.5 2 6l3.5 3.5",
    down: "M6 1v9M2.5 6.5 6 10l3.5-3.5",
  }[dir];
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none">
      <path d={d} stroke="#B95800" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------- cards ---------------------------- */

function PillarCard({
  icon,
  title,
  description,
  order,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  order: string;
}) {
  return (
    <div
      className={`w-full max-w-sm shrink-0 rounded-2xl border border-rule bg-paper p-6 transition-transform duration-300 motion-safe:hover:-translate-y-0.5 md:w-64 md:max-w-none ${order}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-rule bg-clay/[0.06] text-clay">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-[19px] leading-tight text-ink">{title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-snug text-ink-soft">{description}</p>
    </div>
  );
}

function HubCard({
  order,
  image,
  onExpand,
}: {
  order: string;
  image?: { src: string; width: number; height: number };
  onExpand?: (src: string) => void;
}) {
  return (
    <div className={`relative z-10 w-full max-w-md shrink-0 md:w-[26rem] md:max-w-none ${order}`}>
      <div className="relative rounded-2xl border border-rule bg-paper p-6 transition-transform duration-300 motion-safe:hover:-translate-y-1">
        <span className="label text-clay">The Hub</span>

        {image ? (
          <div className="relative mt-3 aspect-[2800/1078] w-full overflow-hidden rounded-lg border border-rule bg-paper-deep/40">
            <Image
              src={image.src}
              alt=""
              fill
              sizes="(min-width: 768px) 410px, 100vw"
              onClick={onExpand ? () => onExpand(image.src) : undefined}
              className={`object-contain ${onExpand ? "cursor-zoom-in" : ""}`}
            />
          </div>
        ) : (
          <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-full border border-rule bg-clay/[0.08] text-clay">
            <IconTrend className="h-6 w-6" />
          </div>
        )}

        <h3 className="mt-4 font-display text-[21px] leading-tight text-ink">Holistic Weight Tracking</h3>
        <p className="mt-1.5 text-[13.5px] leading-snug text-ink-soft">
          The central hub where diet and training data converge.
        </p>
      </div>
    </div>
  );
}

/* -------------------------- connectors -------------------------- */
/* Two independent sets: a vertical chain for the mobile stack
   (Pillar 1 → Pillar 2 → Hub), and a pair of horizontal spokes for
   the desktop row (Pillar 1 → Hub ← Pillar 2). Each set is hidden at
   the breakpoint it doesn't belong to, so it never affects layout there. */

function ConnectorCol({ order }: { order: string }) {
  return (
    <div className={`flex h-9 w-full items-center justify-center md:hidden ${order}`}>
      <div className="relative h-full border-l border-dashed border-rule">
        <ArrowGlyph dir="down" className="absolute -bottom-1 -left-[7px] h-3 w-3" />
      </div>
    </div>
  );
}

function ConnectorRow({ pointing, order }: { pointing: "right" | "left"; order: string }) {
  const isRight = pointing === "right";
  return (
    <div className={`relative hidden flex-1 items-center px-1 md:flex ${order}`}>
      <div className="h-0 w-full border-t border-dashed border-rule" />
      <ArrowGlyph dir={isRight ? "right" : "left"} className={`absolute h-3 w-3 ${isRight ? "right-0" : "left-0"}`} />
    </div>
  );
}

/* ---------------------------- diagram ---------------------------- */

export default function EcosystemDiagram({
  hubImage,
  onExpandHub,
}: {
  hubImage?: { src: string; width: number; height: number };
  onExpandHub?: (src: string) => void;
} = {}) {
  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 md:flex-row md:items-center md:gap-0">
        {/* Mobile stack: Dietary → Training → Hub (hub last, at the bottom).
            Desktop row: Dietary → Hub (centered) ← Training. */}
        <PillarCard
          order="order-1 md:order-1"
          icon={<IconApple className="h-5 w-5" />}
          title="Dietary Tracking"
          description="Frictionless, unified food logging."
        />

        <ConnectorCol order="order-2" />
        <ConnectorRow order="md:order-2" pointing="right" />

        <PillarCard
          order="order-3 md:order-5"
          icon={<IconDumbbell className="h-5 w-5" />}
          title="Progressive Training"
          description="Historical lift logging and plateau prevention."
        />

        <ConnectorCol order="order-4" />
        <ConnectorRow order="md:order-4" pointing="left" />

        <HubCard order="order-5 md:order-3" image={hubImage} onExpand={onExpandHub} />
      </div>
    </div>
  );
}
