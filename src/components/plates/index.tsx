import type { ComponentType } from "react";

/**
 * THE PLATES — PARKED.
 * --------------------
 * Not rendered at the current fidelity: the hero shows blank slots instead
 * while the personality gets told through real imagery later. Kept intact,
 * and now self-contained (its own PlateKey), so nothing here depends on
 * `lib/content.ts` and it can be dropped back in whenever.
 * --------------------
 * Six hand-drawn technical illustrations sharing one visual language:
 * hairline strokes, paper fills, a single clay accent, mono annotation.
 * They sit inside the frame system as stand-ins for real photography and
 * case-study thumbnails — swap the <svg> for an <Image> and the frame,
 * caption and motion are all unchanged.
 *
 * Drawn on a shared 320 x 400 stage so every plate crops identically.
 */

export type PlateKey = "dough" | "court" | "joinery" | "slope" | "wire" | "cognition";

type PlateProps = { className?: string; uid?: string };

const STAGE = "0 0 320 400";
const base = "h-full w-full";

/* --- 01 Interface ------------------------------------------------------ */
export function PlateWire({ className }: PlateProps) {
  return (
    <svg viewBox={STAGE} fill="none" className={`${base} ${className ?? ""}`} aria-hidden="true">
      <g className="stroke-rule" strokeWidth="1">
        <path d="M30 56 v292" />
        {[56, 129, 202, 275, 348].map((y) => (
          <path key={y} d={`M30 ${y} h8`} />
        ))}
      </g>
      <g className="fill-ink-faint font-mono" fontSize="7.5" letterSpacing="0.12em">
        <text x="44" y="60">000</text>
        <text x="44" y="352">072</text>
      </g>

      <rect x="76" y="52" width="212" height="296" rx="10" className="fill-paper stroke-ink" strokeWidth="1.25" />
      <path d="M76 92 h212" className="stroke-rule" strokeWidth="1.25" />
      <circle cx="94" cy="72" r="5" className="stroke-ink-mute" strokeWidth="1.25" />
      <path d="M258 68 h14 M258 76 h14" className="stroke-ink-mute" strokeWidth="1.25" />

      <rect x="94" y="110" width="176" height="62" rx="4" className="fill-paper-deep stroke-rule" strokeWidth="1.25" />
      <path d="M108 133 h96" className="stroke-ink" strokeWidth="2" />
      <path d="M108 148 h58" className="stroke-ink-mute" strokeWidth="1.25" />

      <g className="stroke-rule" strokeWidth="1.25">
        <path d="M94 194 h176 M94 226 h176 M94 258 h176 M94 290 h176" />
      </g>
      <g className="stroke-ink-mute" strokeWidth="1.25">
        <circle cx="106" cy="210" r="6" />
        <circle cx="106" cy="242" r="6" />
        <circle cx="106" cy="274" r="6" />
        <path d="M124 207 h84 M124 216 h50" />
        <path d="M124 239 h68 M124 248 h38" />
        <path d="M124 271 h92 M124 280 h56" />
      </g>

      {/* the one committed action */}
      <rect x="94" y="308" width="86" height="24" rx="12" className="fill-clay" />
      <path d="M200 320 h50" className="stroke-ink" strokeWidth="1.25" />
      <path d="M243 314 l7 6 -7 6" className="stroke-ink" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />

      <g className="stroke-clay" strokeWidth="1">
        <path d="M76 368 h212 M76 364 v8 M288 364 v8" />
      </g>
    </svg>
  );
}

/* --- 02 Market Pizza --------------------------------------------------- */
export function PlateDough({ className }: PlateProps) {
  // Circle with a wedge removed, and the wedge lifted clear of it.
  const body =
    "M160 175 L255.2 219.4 A105 105 0 1 1 258.7 139.1 Z";
  const crust =
    "M239.8 212.2 A88 88 0 1 1 242.7 144.9";
  const wedge =
    "M160 175 L255.2 219.4 A105 105 0 0 0 258.7 139.1 Z";

  return (
    <svg viewBox={STAGE} fill="none" className={`${base} ${className ?? ""}`} aria-hidden="true">
      <path d={body} className="fill-paper-deep stroke-ink" strokeWidth="1.4" strokeLinejoin="round" />
      <path d={crust} className="stroke-rule" strokeWidth="1.25" strokeDasharray="3 6" />

      <g className="fill-clay">
        <circle cx="118" cy="132" r="11" />
        <circle cx="176" cy="108" r="7" />
        <circle cx="96" cy="206" r="9" />
        <circle cx="158" cy="230" r="10.5" />
        <circle cx="206" cy="252" r="6.5" />
        <circle cx="128" cy="176" r="5.5" />
      </g>

      {/* the lifted slice */}
      <g transform="translate(40 -10) rotate(7 160 175)">
        <path d={wedge} className="fill-paper stroke-ink" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="222" cy="176" r="7.5" className="fill-clay" />
        <circle cx="245" cy="196" r="5" className="fill-clay" />
      </g>

      {/* flour */}
      <g className="fill-ink-faint">
        {[
          [42, 78], [58, 300], [30, 190], [104, 44], [252, 66],
          [292, 292], [186, 318], [76, 336], [268, 118], [216, 46],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.9" />
        ))}
      </g>

      <path d="M30 356 h260" className="stroke-rule" strokeWidth="1" />
      <text x="30" y="378" className="fill-ink-mute font-mono" fontSize="9" letterSpacing="0.16em">
        DECK 812°F
      </text>
      <text x="222" y="378" className="fill-clay font-mono" fontSize="9" letterSpacing="0.16em">
        62% HYD
      </text>
    </svg>
  );
}

/* --- 03 Cognitive Science ---------------------------------------------- */
const COG_NODES: [number, number][] = [
  [80, 80], [172, 52], [256, 104], [54, 168], [158, 146],
  [250, 196], [96, 246], [196, 236], [68, 330], [164, 322], [262, 296],
];
const COG_EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [0, 4], [1, 4], [2, 4], [2, 5], [3, 4],
  [3, 6], [4, 6], [4, 7], [5, 7], [5, 10], [6, 8], [6, 9], [7, 9], [7, 10], [8, 9], [9, 10],
];
/** The route attention actually takes through the network. */
const COG_PATH: number[] = [1, 4, 6, 9, 10];

export function PlateCognition({ className }: PlateProps) {
  const routeSet = new Set(
    COG_PATH.slice(0, -1).map((n, i) => `${Math.min(n, COG_PATH[i + 1])}-${Math.max(n, COG_PATH[i + 1])}`)
  );
  return (
    <svg viewBox={STAGE} fill="none" className={`${base} ${className ?? ""}`} aria-hidden="true">
      <g className="fill-rule">
        {Array.from({ length: 9 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={38 + c * 41} cy={44 + r * 40} r="1.2" />
          ))
        )}
      </g>

      <g className="stroke-ink-mute" strokeWidth="1" opacity="0.55">
        {COG_EDGES.filter(([a, b]) => !routeSet.has(`${Math.min(a, b)}-${Math.max(a, b)}`)).map(([a, b], i) => (
          <path key={i} d={`M${COG_NODES[a][0]} ${COG_NODES[a][1]} L${COG_NODES[b][0]} ${COG_NODES[b][1]}`} />
        ))}
      </g>

      <g className="stroke-clay" strokeWidth="1.9" strokeLinecap="round">
        {COG_PATH.slice(0, -1).map((n, i) => (
          <path
            key={i}
            d={`M${COG_NODES[n][0]} ${COG_NODES[n][1]} L${COG_NODES[COG_PATH[i + 1]][0]} ${COG_NODES[COG_PATH[i + 1]][1]}`}
          />
        ))}
      </g>

      {COG_NODES.map(([cx, cy], i) => {
        const hot = COG_PATH.includes(i);
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={hot ? 8 : 5.5}
            strokeWidth="1.25"
            className={hot ? "fill-clay stroke-clay" : "fill-paper stroke-ink-mute"}
          />
        );
      })}

      <path d="M30 356 h260" className="stroke-rule" strokeWidth="1" />
      <text x="30" y="378" className="fill-ink-mute font-mono" fontSize="9" letterSpacing="0.16em">
        ATTENTION IS A BUDGET
      </text>
    </svg>
  );
}

/* --- 04 Baseline (tennis) ---------------------------------------------- */
export function PlateCourt({ className }: PlateProps) {
  return (
    <svg viewBox={STAGE} fill="none" className={`${base} ${className ?? ""}`} aria-hidden="true">
      <rect x="58" y="40" width="204" height="300" className="fill-paper-deep stroke-ink" strokeWidth="1.25" />
      <g className="stroke-rule" strokeWidth="1.25">
        <path d="M80 40 v300 M240 40 v300" />
        <path d="M80 132 h160 M80 248 h160 M160 132 v116" />
        <path d="M160 40 v10 M160 330 v10" />
      </g>

      {/* net */}
      <path d="M48 190 h224" className="stroke-ink" strokeWidth="1.4" />
      <path d="M48 180 v20 M272 180 v20" className="stroke-ink" strokeWidth="1.4" />
      <g className="stroke-rule" strokeWidth="0.8">
        {Array.from({ length: 15 }).map((_, i) => (
          <path key={i} d={`M${52 + i * 16} 185 v10`} />
        ))}
      </g>

      {/* the rally */}
      <path d="M104 316 C 152 240, 106 172, 148 122" className="stroke-clay" strokeWidth="1.4" strokeDasharray="4 5" />
      <path d="M148 122 C 198 170, 230 208, 212 288" className="stroke-ink-mute" strokeWidth="1.25" strokeDasharray="4 5" />
      <circle cx="148" cy="122" r="6" className="fill-clay" />
      <circle cx="104" cy="316" r="3.5" className="fill-ink-mute" />
      <circle cx="212" cy="288" r="3.5" className="fill-ink-mute" />

      <path d="M30 356 h260" className="stroke-rule" strokeWidth="1" />
      <text x="30" y="378" className="fill-ink-mute font-mono" fontSize="9" letterSpacing="0.16em">
        SAME SWING, 12 YRS
      </text>
    </svg>
  );
}

/* --- 05 Joinery -------------------------------------------------------- */
const TAILS = [88, 160, 232];
const T_HALF = 26;
const B_HALF = 12;

const PIN_BOARD = [
  "M44 118 L44 52 L276 52 L276 118",
  ...[...TAILS].reverse().flatMap((cx) => [
    `L${cx + T_HALF} 118`,
    `L${cx + B_HALF} 74`,
    `L${cx - B_HALF} 74`,
    `L${cx - T_HALF} 118`,
  ]),
  "L44 118 Z",
].join(" ");

const TAIL_BOARD = [
  "M44 288 L44 176",
  ...TAILS.flatMap((cx) => [
    `L${cx - B_HALF} 176`,
    `L${cx - T_HALF} 130`,
    `L${cx + T_HALF} 130`,
    `L${cx + B_HALF} 176`,
  ]),
  "L276 176 L276 288 Z",
].join(" ");

/**
 * `uid` keeps the clipPath ids unique when more than one copy of this plate
 * is mounted at once (the hero renders a deck plus satellites).
 */
export function PlateJoinery({ className, uid = "jt" }: PlateProps) {
  return (
    <svg viewBox={STAGE} fill="none" className={`${base} ${className ?? ""}`} aria-hidden="true">
      <defs>
        <clipPath id={`${uid}-pin`}>
          <path d={PIN_BOARD} />
        </clipPath>
        <clipPath id={`${uid}-tail`}>
          <path d={TAIL_BOARD} />
        </clipPath>
      </defs>

      <path d={PIN_BOARD} className="fill-paper-deep stroke-ink" strokeWidth="1.3" strokeLinejoin="round" />
      <path d={TAIL_BOARD} className="fill-paper-deep stroke-ink" strokeWidth="1.3" strokeLinejoin="round" />

      <g className="stroke-ink-faint" strokeWidth="0.9" clipPath={`url(#${uid}-pin)`}>
        <path d="M40 66 C 118 58, 202 74, 280 62" />
        <path d="M40 92 C 126 84, 196 100, 280 88" />
        <path d="M40 110 C 112 103, 210 118, 280 106" />
      </g>
      <g className="stroke-ink-faint" strokeWidth="0.9" clipPath={`url(#${uid}-tail)`}>
        <path d="M40 200 C 124 192, 200 208, 280 196" />
        <path d="M40 232 C 118 224, 206 240, 280 228" />
        <path d="M40 262 C 132 254, 194 270, 280 258" />
      </g>
      {/* end grain */}
      <g className="stroke-ink-faint" strokeWidth="0.8" clipPath={`url(#${uid}-tail)`}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${44 + i * 7} 52 l-14 240`} />
        ))}
      </g>

      {/* the slope that makes it hold */}
      <g className="stroke-clay" strokeWidth="1.1">
        <path d="M220 176 V126" strokeDasharray="3 4" />
        <path d="M220 148 A 12 12 0 0 0 213 140" />
      </g>
      <text x="228" y="150" className="fill-clay font-mono" fontSize="8" letterSpacing="0.12em">
        1:6
      </text>

      <path d="M30 356 h260" className="stroke-rule" strokeWidth="1" />
      <text x="30" y="378" className="fill-ink-mute font-mono" fontSize="9" letterSpacing="0.16em">
        THROUGH DOVETAIL
      </text>
    </svg>
  );
}

/* --- 06 Fall Line ------------------------------------------------------ */
const CONTOURS = [
  "M204 84 C 220 84, 226 100, 214 116 C 200 134, 176 148, 162 142 C 150 137, 152 120, 166 108 C 180 96, 194 84, 204 84 Z",
  "M212 58 C 240 60, 248 88, 230 116 C 210 148, 172 178, 146 170 C 122 163, 120 134, 142 110 C 164 86, 190 57, 212 58 Z",
  "M216 30 C 258 32, 274 74, 250 118 C 226 162, 176 206, 138 202 C 104 199, 88 168, 104 132 C 116 105, 100 96, 112 78 C 128 54, 186 28, 216 30 Z",
  "M224 6 C 282 10, 300 66, 268 124 C 238 178, 178 240, 126 234 C 82 229, 58 186, 76 138 C 90 100, 62 84, 80 58 C 104 24, 184 3, 224 6 Z",
  "M238 -20 C 308 -14, 328 56, 288 130 C 250 200, 180 278, 114 270 C 58 263, 26 208, 48 148 C 64 104, 24 72, 50 38 C 82 -4, 190 -24, 238 -20 Z",
];

export function PlateSlope({ className }: PlateProps) {
  return (
    <svg viewBox={STAGE} fill="none" className={`${base} ${className ?? ""}`} aria-hidden="true">
      <g className="stroke-rule" strokeWidth="1.1">
        {CONTOURS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* the line you actually ski */}
      <path
        d="M204 96 C 180 124, 214 144, 192 174 C 172 202, 128 210, 118 246 C 108 282, 128 316, 152 344"
        className="stroke-ink"
        strokeWidth="1.5"
        strokeDasharray="7 5"
        strokeLinecap="round"
      />

      <path d="M204 78 L213 94 L195 94 Z" className="fill-clay" />
      <path d="M212 82 L238 62" className="stroke-rule" strokeWidth="1" />
      <text x="240" y="60" className="fill-ink-mute font-mono" fontSize="9" letterSpacing="0.16em">
        1,842
      </text>
      <circle cx="152" cy="344" r="4" className="fill-ink" />

      <path d="M30 372 h260" className="stroke-rule" strokeWidth="1" />
      <text x="30" y="392" className="fill-ink-mute font-mono" fontSize="9" letterSpacing="0.16em">
        READ THE FALL LINE
      </text>
    </svg>
  );
}

const REGISTRY: Record<PlateKey, ComponentType<PlateProps>> = {
  wire: PlateWire,
  dough: PlateDough,
  cognition: PlateCognition,
  court: PlateCourt,
  joinery: PlateJoinery,
  slope: PlateSlope,
};

/**
 * `uid` is forwarded so that mounting the same plate twice (a deck card and a
 * satellite, say) can't collide on the clipPath ids inside PlateJoinery.
 */
export function Plate({
  name,
  className,
  uid,
}: {
  name: PlateKey;
  className?: string;
  uid?: string;
}) {
  const Component = REGISTRY[name];
  return <Component className={className} uid={uid} />;
}
