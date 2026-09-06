import type { ReactNode } from "react";
import { Frame } from "./Frame";

/**
 * SLOT — a blank visual placeholder inside the frame system.
 *
 * This is the workhorse of the current fidelity. Every image, thumbnail
 * and video still on the page is one of these, so when real media arrives
 * the swap is local: drop an <Image> / <video> in as `children` and the
 * frame, ratio, hover and caption all stay exactly where they are.
 */
export function Slot({
  ratio = "4 / 5",
  label,
  index,
  media = "image",
  corners = false,
  className,
  children,
}: {
  /** Raw CSS aspect-ratio, e.g. "4 / 5". Kept out of Tailwind so data can drive it. */
  ratio?: string;
  label?: string;
  index?: string;
  media?: "image" | "video";
  corners?: boolean;
  className?: string;
  /** Real media, once it exists. Replaces the placeholder marks entirely. */
  children?: ReactNode;
}) {
  return (
    <Frame
      className={`transition-colors duration-500 ease-editorial group-hover:border-clay ${className ?? ""}`}
      innerClassName="overflow-hidden transition-colors duration-500 ease-editorial group-hover:border-clay"
      corners={corners}
    >
      <div className="slot grid place-items-center" style={{ aspectRatio: ratio }}>
        {children ?? (
          <>
            <span className="relative flex flex-col items-center gap-3 px-5">
              {media === "video" ? <PlayMark /> : <ImageMark />}
              {label ? <span className="label text-center">{label}</span> : null}
              <span className="font-mono text-[10px] tabular-nums tracking-wide text-ink-faint">
                {ratio.replace(/\s/g, "")}
              </span>
            </span>

            {index ? (
              <span className="label absolute left-3 top-3 tabular-nums text-ink-faint">
                {index}
              </span>
            ) : null}
          </>
        )}
      </div>
    </Frame>
  );
}

function ImageMark() {
  return (
    <svg width="26" height="22" viewBox="0 0 26 22" fill="none" aria-hidden="true" className="text-ink-faint">
      <rect x="0.5" y="0.5" width="25" height="21" stroke="currentColor" />
      <path d="M0.5 16.5L8 9l6.5 6.5L19 11.5l6.5 6" stroke="currentColor" />
      <circle cx="18.5" cy="6" r="2" stroke="currentColor" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
      className="text-ink-faint transition-colors duration-500 ease-editorial group-hover:text-clay"
    >
      <circle cx="15" cy="15" r="14.5" stroke="currentColor" />
      <path d="M12 10.2l8 4.8-8 4.8V10.2z" stroke="currentColor" strokeLinejoin="round" />
    </svg>
  );
}
