/**
 * COGNATIV — every word on /work/cognativ.
 *
 * Same rule as `fitlogs.ts`: copy lives here, layout lives in the page. Media
 * paths are kebab-cased for the same reason — source filenames carry spaces
 * (and, in the raw export, literal slashes), which would ship as %20/%2F in
 * every URL. The two screen recordings were re-encoded from ~70MB/~236MB
 * QuickTime exports down to web-sized H.264 MP4s at the same width as every
 * other case study's clips.
 */

export const cognativ = {
  title: "Cognativ: Orchestrating an Enterprise Redesign",

  meta: [
    { label: "Role", value: "UX Designer, UX Researcher, & Project Manager" },
    { label: "Timeline", value: "July - September 2025" },
  ],

  team: ["2 Executives", "1 Lead Designer & PM", "2 UX Designers"],

  techLogos: [
    { src: "/cognativ/logo-figma.svg", width: 16, height: 16, name: "Figma" },
    { src: "/cognativ/logo-figma-make.svg", width: 16, height: 16, name: "Figma Make" },
    { src: "/cognativ/logo-sheets.svg", width: 16, height: 16, name: "Google Sheets" },
    { src: "/cognativ/logo-webflow.svg", width: 16, height: 16, name: "Webflow" },
  ],

  hero: "/cognativ/hero.mp4",

  brief: {
    id: "brief",
    index: "01",
    title: "The Brief",
    problem: {
      heading: "The Problem",
      body: "Cognativ was considering a complete redesign of their corporate website, but leadership was hesitant to allocate resources without concrete proof of ROI. Beyond an outdated aesthetic, the legacy site failed to establish enterprise credibility, lacked conversion pathways, and left prospective clients with no proof of past work. Furthermore, the existing design team was entirely at capacity with client deliverables, leaving no dedicated owner for internal web initiatives.",
    },
    solution: {
      heading: "The Solution",
      body: "As an intern, I recognized the urgent need for a modernized digital presence and took the initiative to build a data-backed pitch. After presenting my competitive audit directly to the COO, I successfully secured executive buy-in to launch an end-to-end redesign. I then stepped up into a dual role as both Lead Designer and Project Manager. Taking ownership of the project, I orchestrated a rotating team of designers juggling client work, managed the production timeline, and personally architected the UX and high-fidelity interfaces. Ultimately, I delivered a fully functional Webflow staging site built on a scalable foundation, successfully managing stakeholder priorities.",
    },
  },

  catalyst: {
    id: "catalyst",
    index: "02",
    title: "Research Foundations & Executive Buy-in",
    narrative:
      "To determine if a redesign was truly necessary, I initiated a competitive audit and benchmarking study. The data revealed critical gaps in our user experience and market positioning, causing us to miss out on critical retention and sales opportunities. I synthesized these findings into a strategic pitch deck and presented it directly to Cognativ Inc's leadership team.\n\nThe research proved that an overhauled digital presence was imperative for business growth. Leadership immediately greenlit the project, providing the mandate needed to begin structural ideation.",
    audit: {
      title: "Competitive Audit",
      cta: "View Full Competitive Audit ↗",
      href: "https://docs.google.com/spreadsheets/d/1Iibl5QsX1UFsXG-Q2UIUfUraoZlwJc-IXDDmw91STuA/edit?usp=sharing",
    },
    studies: [
      { src: "/cognativ/audit.png", width: 1974, height: 1212 },
      { src: "/cognativ/benchmarking.png", width: 2514, height: 680 },
    ],
    slides: [
      { src: "/cognativ/slide-1.png", width: 2940, height: 1658 },
      { src: "/cognativ/slide-2.png", width: 2940, height: 1698 },
    ],
  },

  ia: {
    id: "ia",
    index: "03",
    title: "Product Management & Structural IA",
    narrative:
      "Because the core design team was tied up with client work, they could only contribute to the redesign intermittently. To keep the project moving, I stepped up as the dedicated Project Manager. I established the production timelines, facilitated cross-functional alignment, and met regularly with the COO and Design Lead to integrate stakeholder input and define deliverables. My most critical PM responsibility was mitigating scope creep. When rotating designers jumped into the project, they often pitched out-of-scope features or attempted to revise locked designs. I instituted a strict sync process to bring them up to speed on our progress and protect our defined scope, ensuring we hit our delivery targets.\n\nMy first design priority was establishing the site's structural integrity. Leveraging insights from my competitive audit, I developed the Information Architecture and user flows based on industry navigation best practices. A critical finding from my research was that our existing site lacked case studies; a major competitive disadvantage, as prospective clients rely on seeing past work to build confidence in our abilities. I successfully architected a dedicated case study flow into the core navigation, ensuring our new structure functioned not just as a brochure, but as an active sales tool.",
    images: [
      { src: "/cognativ/user-flow.png", width: 1492, height: 1224 },
      { src: "/cognativ/ia.png", width: 1970, height: 996 },
      { src: "/cognativ/site-map.png", width: 2492, height: 890 },
    ],
  },

  duel: {
    id: "duel",
    index: "04",
    title: "Iterative A/B Testing",
    narrative:
      "While the rotating cast of designers caused some scope creep, it also offered a unique creative advantage: a constant influx of fresh perspectives. To maximize the limited collaborative time when another designer was available, we implemented a rapid A/B testing methodology.\n\nRather than designing by committee, we treated their intermittent availability as an opportunity for parallel ideation. For every core page in the user flow, the assisting designer and I would independently build our own versions. We would then reconvene, critically compare the two iterations, and join together a final solution that combined the strongest UX patterns and visual elements from both ideas. This collaborative process transformed a resource constraint into a major design asset, ensuring every layout was heavily scrutinized, preventing groupthink, and optimizing the UI before development.",
    images: [
      { src: "/cognativ/ab-1.png", width: 776, height: 1398, caption: "My lo-fi design" },
      { src: "/cognativ/ab-2.png", width: 1328, height: 680, caption: "My Coworker's hi-fi design" },
      { src: "/cognativ/ab-3.png", width: 410, height: 1030, caption: "Final Hi-fi iteration" },
    ],
  },

  handoff: {
    id: "handoff",
    index: "05",
    title: "High-Fidelity & Webflow Handoff",
    body: "I designed the high-fidelity screens to intentionally guide prospective clients from initial interest to booking a meeting. The home page acts as the main hub, summarizing who we are and clearly connecting users to the rest of the site. To move them down the funnel, the services page provides a transparent view of what we offer, linking directly to the new case studies section. This was a critical addition to the architecture, showing our direct experience, providing actual proof that we have done the work before and can do it again. To build personal trust, the about page gives a glimpse into who we are, where we are from, and how we think. Finally, the contact page removes all friction, allowing prospective clients to easily get in touch and book a meeting.\n\nAfter securing final approval from the COO and Design Lead, I moved the project into development. I assisted in building the final design in Webflow, handing over a fully functional, developer-ready site strictly on schedule. This allowed the executive team to easily take over and drop in their content and finalized copywriting. Meeting all deadlines and deliverables, the leadership team was incredibly excited to finally have this new tool at their disposal to drive sales.",
    video: { src: "/cognativ/hi-fi.mp4", width: 1600, height: 960 },
  },

  outcomes: {
    id: "outcomes",
    index: "06",
    title: "Outcomes & The Strategic Pivot",
    narrative:
      "Following the final handoff, I returned to university. During the months it took leadership to finalize the remaining content, Cognativ made a massive strategic pivot, shifting their entire business model to focus on the private equity space.\n\nThis strategic pivot meant leadership had to modify our delivered site to appeal directly to this new market. However, this transition ultimately underscored the true value of our foundational work. My initial competitive research was what originally brought the urgent need for a redesign to light, and those data-driven insights proved even more critical when the company needed to rapidly reposition itself for an entirely different client base. The scalable Information Architecture and structural roots established in our original redesign provided the exact foundation Cognativ needed to successfully launch their new digital presence and capture their new market.",
    liveSite: {
      title: "Cognativ Inc. - Live",
      cta: "Experience the Live Site ↗",
      href: "https://www.cognativinc.com/",
    },
    video: { src: "/cognativ/new-site.mp4", width: 1600, height: 868 },
  },
};
