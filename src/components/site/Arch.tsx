import Image from "next/image";
import { identity } from "@/lib/content";

/**
 * The arch — one shape, used at every size in the hero cluster.
 *
 * `rounded-t-full` makes the radius half the element's own width, so nesting
 * two of these with equal padding yields genuinely concentric arcs: each layer
 * grows by exactly its inset, at the crown and at the springline alike.
 */
export function Arch({
  src,
  monogram = false,
  sizes,
  position = "50% 50%",
  framed = false,
  priority = false,
}: {
  src?: string | null;
  monogram?: boolean;
  sizes?: string;
  /** `object-position` — the sources are landscape, the arch is 3:4. */
  position?: string;
  /** Adds an outer mat, so the centrepiece rests on two concentric outlines. */
  framed?: boolean;
  priority?: boolean;
}) {
  const arch = "rounded-t-full rounded-b-sm";

  const plate = (
    <div className={`relative aspect-[3/4] w-full overflow-hidden bg-paper-deep ${arch}`}>
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition: position }}
          className="object-cover"
        />
      ) : monogram ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center font-display text-4xl text-ink-faint"
        >
          {identity.monogram}
        </span>
      ) : null}
    </div>
  );

  const lined = <div className={`border border-ink/40 ${arch}`}>{plate}</div>;

  // The mat's radius grows by exactly its own inset, so the two arcs stay
  // concentric — same gap at the crown as at the springline.
  if (!framed) return lined;
  return <div className={`border border-rule p-2 ${arch}`}>{lined}</div>;
}
