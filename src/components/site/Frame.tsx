import type { ReactNode } from "react";

/**
 * THE FRAME — the structural signature of the site.
 * Outer hairline, paper matte, inner hairline. Optional corner ticks give it
 * the drafting-table register that ties the editorial side to the technical.
 */
export function Frame({
  children,
  className,
  innerClassName,
  corners = false,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  corners?: boolean;
}) {
  return (
    <div className={`frame ${className ?? ""}`}>
      {corners ? <FrameCorners /> : null}
      <div className={`frame-inner ${innerClassName ?? ""}`}>{children}</div>
    </div>
  );
}

function FrameCorners() {
  const arms = [
    "left-[-1px] top-[-1px] border-l border-t",
    "right-[-1px] top-[-1px] border-r border-t",
    "left-[-1px] bottom-[-1px] border-l border-b",
    "right-[-1px] bottom-[-1px] border-r border-b",
  ];
  return (
    <>
      {arms.map((a) => (
        <span key={a} aria-hidden className={`pointer-events-none absolute h-3 w-3 border-clay ${a}`} />
      ))}
    </>
  );
}
