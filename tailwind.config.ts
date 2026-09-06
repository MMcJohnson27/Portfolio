import type { Config } from "tailwindcss";

/**
 * Design tokens — "Scandinavian Editorial"
 * ----------------------------------------
 * Warm alabaster carries the whole page: one background, no panels, no
 * pattern. Charcoal does the reading, a warm grey-beige does every rule,
 * and the accent is spent on exactly one word in the hero.
 *
 * These names are the single source of truth. Change a value here, never
 * a hex in a component.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F7F5F2", // warm alabaster — the only page ground
          deep: "#EFECE6", // empty media wells
          edge: "#E9E5DD", // pressed states
        },
        ink: {
          DEFAULT: "#2A2826", // rich charcoal. headings + body
          soft: "#5A5652", // secondary copy — 6.7:1 on paper
          mute: "#6F6A65", // mono labels — 4.9:1, clears AA at 11px
          faint: "#A8A29C", // decorative only, never load-bearing text
        },
        rule: {
          DEFAULT: "#E6E2DA", // every border and divider on the page
          soft: "#EFECE6",
        },
        clay: {
          DEFAULT: "#B95800", // the accent. one word in the hero, and focus
          deep: "#8F4400",
          wash: "#F2E2D4",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-instrument)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        label: "0.18em",
        wide: "0.08em",
      },
      fontSize: {
        // fluid display scale — controlled, never screaming
        display: ["clamp(2.75rem, 6.2vw, 5.25rem)", { lineHeight: "0.94", letterSpacing: "-0.03em" }],
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      maxWidth: {
        shell: "1400px",
        measure: "54ch",
      },
      boxShadow: {
        // tinted to the paper hue, wide and faint — never a glow
        lift: "0 24px 48px -28px rgba(58, 48, 34, 0.30)",
        plate: "0 14px 30px -22px rgba(58, 48, 34, 0.38)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.55)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
        breathe: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.82)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(400%)" },
        },
      },
      animation: {
        drift: "drift 7s ease-in-out infinite",
        breathe: "breathe 2.4s ease-in-out infinite",
        scan: "scan 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
