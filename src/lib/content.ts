/**
 * CONTENT — structure, not copy.
 * ---------------------------------------------------------------------
 * This file *is* the wireframe. Every section reads its shape from here,
 * so the page can be filled in without opening a component.
 *
 * Fields marked `?:` are SLOTS. Leave one undefined and the UI renders a
 * visibly faint placeholder from `PLACEHOLDER`; write a real value and the
 * same line upgrades itself. Nothing else has to change.
 *
 * Voice is deliberately held back at this fidelity. Personality comes back
 * later through imagery and interaction, not through paragraphs.
 */

export const identity = {
  name: "Morgan Johnson",
  monogram: "MJ",
  /** The single line under the name in the footer. */
  role: "Product Designer & UX Researcher",
  email: "mmcjohnson2@gmail.com",
};

/** Rendered wherever a real value hasn't been written yet. Always faint. */
export const PLACEHOLDER = {
  title: "Project title",
  duration: "0:00",
};

/* ------------------------------------------------------------------ nav */

/**
 * Hrefs are "/#id" rather than bare "#id" because Nav is rendered on every
 * route (it lives in the root layout) — a bare hash only scrolls within the
 * current document, so on a case study page it just jumps to the top of
 * that page instead of reaching the landing page's section. "/#id" always
 * lands on the landing page first.
 */
export const nav = [
  { label: "Work", href: "/#work" },
  // { label: "Shorts", href: "/#shorts" },  ← restore with SHOW_SHORTS in page.tsx
];

export const navCta = { label: "Get in touch", href: "/#contact" };

/* -------------------------------------------------------------- sections
   The formal spine of the page. The hero strip prints this list, so the
   structure of the site is legible before a single word of copy exists. */

export const sections = {
  index: { id: "top", index: "01", title: "Index" },
  work: {
    id: "work",
    index: "02",
    title: "Selected work",
    note: "Long-form case studies — problem, process, outcome.",
  },
  shorts: {
    id: "shorts",
    index: "03",
    title: "Shorts",
    note: "60–120 second narrated walkthroughs of smaller projects.",
  },
  // 03 while Shorts is parked — otherwise the page reads 02 then 04.
  contact: { id: "contact", index: "03", title: "Contact" },
};

/* ----------------------------------------------------------------- hero */

export const hero = {
  headline: "Hi, I'm Morgan.",
  introLead: "A ",
  introTail:
    " turning complex research into accessible, digital experiences that work for everyone.",
  /** Read once by assistive tech, in place of the rotating version. */
  introStatic:
    "A Product Designer turning complex research into accessible, digital experiences that work for everyone.",
};

/**
 * Every entry must start with a consonant sound: the article is printed
 * statically as "A", outside the rotating box. Adding something like
 * "Interaction Designer" would read as "A Interaction Designer".
 */
export const roles = [
  "Product Designer",
  "UX Researcher",
  "UX Designer",
  "UI Designer",
  "Product Manager",
  "Chef",
];

/** Printed uppercase, bullet-separated, under the intro. */
export const credentials = [
  "MPS in Information Science @ Cornell",
  "Product Design @ Cognativ",
];

/**
 * The arched centrepiece. The source is landscape and the arch is 3:4, so
 * `object-cover` crops it — `portraitPosition` chooses which slice survives.
 * Nudge that one value rather than re-cropping the file.
 */
export const portrait: string | null = "/hero/main.jpg";
export const portraitPosition = "16% 50%";

/**
 * The cluster orbiting the portrait. `x`/`y` are the resting offsets from the
 * centre in px — hover pulls every node back to 0,0 — and `w` is the node's
 * width, with height following the same 3:4 arch. Offsets are tuned to the
 * width of the right-hand column, so the cluster only renders at `lg`.
 */
export type ClusterNode = {
  id: string;
  src?: string;
  /** Which slice of a landscape source survives the 3:4 crop. */
  position?: string;
  x: number;
  y: number;
  w: number;
  /** Float amplitude in px, and the period and phase of that drift. */
  drift: number;
  dur: number;
  delay: number;
};

export const cluster: ClusterNode[] = [
  { id: "n1", src: "/hero/node-1.jpg", x: -224, y: -120, w: 88, drift: 15, dur: 7.5, delay: 0 },
  { id: "n2", src: "/hero/node-2.jpg", x: 218, y: -130, w: 72, drift: 14, dur: 8.6, delay: 0.8 },
  { id: "n3", src: "/hero/node-5.jpg", x: -238, y: 40, w: 76, drift: 15, dur: 9.4, delay: 1.6 },
  { id: "n4", src: "/hero/node-3.jpg", x: 226, y: 96, w: 94, drift: 13, dur: 7.9, delay: 0.4 },
  { id: "n5", src: "/hero/node-4.jpg", x: -206, y: 178, w: 58, drift: 15, dur: 8.2, delay: 1.2 },
];

/* --------------------------------------------------------- case studies */

export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  /** Role • Category • Year. Printed verbatim — the uppercase is CSS. */
  meta: string;
  summary: string;
  /** Plays on loop by default — "<Project> Thumbnail.mp4". */
  video: string;
  /** Crossfades in on hover — "<Project> Thumbnail Hover.mp4". */
  hoverVideo: string;
  /** First paint, before either clip has data. */
  still: string;
  /** No anchor until there's somewhere to go — see CardShell. */
  href?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "jurni",
    index: "01",
    title: "Jurni",
    meta: "UX Research & Product Design • Health Tech • 2025",
    summary:
      "Led UX research and spearheaded the product design for the platform's integrated marketplace and AI-powered conversational assistant to support patients on GLP-1 medications.",
    video: "/case-studies/jurni.mp4",
    hoverVideo: "/case-studies/jurni-hover.mp4",
    still: "/case-studies/jurni-still.jpg",
    href: "/work/jurni",
  },
  {
    id: "fitlogs",
    index: "02",
    title: "Fitlogs",
    meta: "Product Design & Founder • Fitness App • 2026",
    summary:
      "Founded a progression-based fitness app tailored for strength training, dieting, and functional athleticism. Validated core user flows through extensive usability testing and mixed-methods research.",
    video: "/case-studies/fitlogs.mp4",
    hoverVideo: "/case-studies/fitlogs-hover.mp4",
    still: "/case-studies/fitlogs-still.jpg",
    href: "/work/fitlogs",
  },
  {
    id: "cognativ",
    index: "03",
    title: "Cognativ",
    meta: "UX Design & Project Management • Website Redesign • 2025",
    summary:
      "Acted as Product Manager and Lead UX Researcher, directly contributing to the interface design and front-end development of a complete corporate website redesign.",
    video: "/case-studies/cognativ.mp4",
    hoverVideo: "/case-studies/cognativ-hover.mp4",
    still: "/case-studies/cognativ-still.jpg",
    href: "/work/cognativ",
  },
  {
    id: "forge",
    index: "04",
    title: "Forge",
    meta: "Product Management & Co-Founder • EdTech Platform • 2026",
    summary:
      "Co-founded an educationally focused hackathon hosting platform, driving the complete product vision from end to end as the sole designer and product manager.",
    video: "/case-studies/forge.mp4",
    hoverVideo: "/case-studies/forge-hover.mp4",
    still: "/case-studies/forge-still.jpg",
    href: "/work/forge",
  },
];

/* --------------------------------------------------------------- shorts */

export type Short = {
  id: string;
  index: string;
  /** Slots. `duration` prints as-is — keep it mm:ss. */
  title?: string;
  duration?: string;
  href?: string;
};

/** Portrait 9:16 gallery — the reel / TikTok / YouTube Short format. */
export const shorts: Short[] = [
  { id: "sh-01", index: "01" },
  { id: "sh-02", index: "02" },
  { id: "sh-03", index: "03" },
  { id: "sh-04", index: "04" },
];

/* --------------------------------------------------------------- footer */

export type FooterLink = { label: string; value: string; href?: string };

export const footer = {
  links: [
    { label: "Email", value: identity.email, href: `mailto:${identity.email}` },
    {
      label: "LinkedIn",
      value: "morgan-johnson-b59587210",
      href: "https://www.linkedin.com/in/morgan-johnson-b59587210/",
    },
    { label: "Resume", value: "PDF", href: "/morgan-johnson-resume.pdf" },
  ] as FooterLink[],
  /** The year is stamped by <Footer/> on the server, so it never goes stale. */
  rights: identity.name,
};
