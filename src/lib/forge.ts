/**
 * FORGE — every word on /work/forge.
 *
 * Same rule as `cognativ.ts`/`fitlogs.ts`: copy lives here, layout lives in
 * the page. Media paths are kebab-cased for the same reason — source
 * filenames carry spaces, which would ship as %20 in every URL. The final
 * site walkthrough was re-encoded from a 47MB/2940px-wide QuickTime export
 * down to a 1600px-wide H.264 MP4, matching every other case study's clips.
 */

export const forge = {
  title: "Forge: Building and Managing an Educational Hackathon Platform",

  meta: [
    { label: "Role", value: "Founder, Lead Designer & Product Manager" },
    { label: "Timeline", value: "September 2025 – May 2026" },
    { label: "Team", value: "1 Investor, 2 Co-founders, 4 Associate Developers" },
    {
      label: "Skills",
      value: "Co-founder\nUX Research\nProduct Design\nProduct Management",
    },
  ],

  // No dedicated hero clip was provided in the case-content export — reusing
  // the homepage card's own thumbnail video keeps the hero-media block that
  // both Cognativ and Fitlogs have, using an asset that's already Forge's.
  hero: "/case-studies/forge.mp4",

  brief: {
    id: "brief",
    index: "01",
    title: "The Brief & The Pitch",
    problem: {
      heading: "The Problem",
      body: "During my tenure as the Director of Education for UC Davis's branch of the AI Collective, my co-founder and I faced a strategic roadblock. The year prior, an investor had funded a successful collaboration between our organization and a local history museum, teaching students how to apply AI to real-world projects. Looking to build on that momentum, our investor challenged us to create a scalable, recurring model for hands-on technical education. However, traditional single-event hackathons lacked the structural longevity and community integration required to justify ongoing funding, leaving us in need of a sustainable vehicle that could simultaneously engage local students, mobilize community spaces, and secure stakeholder investment.",
    },
    solution: {
      heading: "The Solution",
      body: "To solve this, my co-founder and I designed Forge, a dedicated hackathon hosting platform built from the ground up to foster long-term technical growth rather than short-term competition. To satisfy our investor's vision of deep community impact, we architected a complex 5-sided architecture that seamlessly connected local students as participants, schools and small businesses as physical or virtual hosts, corporate partners as funders who defined core problem statements, and AI Collective members as mentors who facilitated workshops alongside designated charitable beneficiaries. When we presented this platform architecture to our investor, he immediately bought into the unique combination of educational outreach and community engagement, providing the necessary funding to transition from strategy into product design and system mapping.",
    },
  },

  ia: {
    id: "ia",
    index: "02",
    title: "Information Architecture & Benchmarking",
    body: "The core product challenge of Forge was designing a unified platform that simultaneously served five distinct user groups—participants, hosts, funders, beneficiaries, and mentors—each with fundamentally different goals, permissions, and workflows. To understand how existing platforms approached multi-user environments, I conducted competitive benchmarking, analyzing how other portals handled complex onboarding and role separation. Based on these findings, I structured a comprehensive Information Architecture centered around dedicated, role-specific hubs. Rather than forcing all users through a generic interface, I intentionally designed isolated landing portals and customized dashboards for each stakeholder group. This ensured that a host managing venue capacity, a student searching for regional leagues, and a corporate sponsor reviewing submissions could each efficiently navigate their own operational tasks without friction.",
    images: [
      { src: "/forge/benchmarking.png", width: 1164, height: 1250 },
      { src: "/forge/site-map.png", width: 1230, height: 1398 },
    ],
  },

  hifi: {
    id: "hifi",
    index: "03",
    title: "High-Fidelity UX Design",
    body: "With the information architecture locked in, I took sole ownership of translating our structural maps into high-fidelity user interfaces. Operating under a tight one-month sprint at the end of the summer and heading into the first weeks of the academic year, I independently designed the entire site from scratch. My primary objective was to ensure that a fully realized, professional design was ready for immediate implementation the moment we recruited our developer associates. I focused on creating distinct, frictionless workflows for our core user groups, specifically building an intuitive student dashboard for discovering resources and joining events, alongside a robust management interface for hosts to oversee venue capacities and sponsorships. Delivering these polished high-fidelity screens ahead of schedule proved critical, as it established our technical requirements and provided our engineering team with a clear blueprint to begin coding without delay.",
    images: [
      { src: "/forge/hifi-1.png", width: 2876, height: 1756 },
      { src: "/forge/hifi-2.png", width: 2876, height: 1742 },
    ],
  },

  pivot: {
    id: "pivot",
    index: "04",
    title: "Agile Project Management & The Midterm Pivot",
    body: "Development started strong after we successfully recruited four developer associates, with our initial roadmap targeting a complete rollout by the end of the winter quarter. However, as university midterm season arrived, developer velocity plummeted and our delivery schedule was suddenly at severe risk. Recognizing that the project was stalling, I stepped out of the design environment and directly into a rigorous Project Management role. I completely overhauled our Notion workspace, established a strict sprint timeline, and assigned specific development tickets with hard deadlines. By actively holding the team accountable and steering us back on track after the midterm pivot, I ensured we successfully delivered a functional product by the end of the spring quarter, meaning we still accomplished our core goal of having the platform built and operational by the conclusion of the school year.",
    phases: [
      {
        n: "01",
        title: "Initial Roadmap & Winter Target",
        desc: "Four developer associates onboarded against a roadmap targeting a complete rollout by the end of the winter quarter.",
        status: "completed" as const,
      },
      {
        n: "02",
        title: "Midterm Velocity Drop & Sprint Reset",
        desc: "University midterms stalled engineering output. I stepped out of the design file and into a hands-on PM role, overhauling the Notion workspace and resetting the sprint timeline.",
        status: "active" as const,
        badge: "Active Pivot",
      },
      {
        n: "03",
        title: "Spring Quarter Delivery & Handoff",
        desc: "Hard deadlines and direct accountability restored momentum, delivering a fully functional product by the end of the spring quarter.",
        status: "upcoming" as const,
      },
    ],
    image: { src: "/forge/notion-screenshot.png", width: 2938, height: 1756 },
  },

  engineering: {
    id: "engineering",
    index: "05",
    title: "Engineering Alignment & Data Modeling",
    body: "With our agile processes stabilized and developer momentum restored, we turned our full focus to the platform's backend infrastructure. Because Forge operated as a complex 5-sided marketplace, the UX dashboards and routing structures could not function in a vacuum. Working closely with my engineering associates, we translated my UX architecture into a robust, relational database schema using Supabase and PostgreSQL. This engineering alignment ensured our data models could seamlessly support the complex relational logic required to tie participants, hosts, funders, beneficiaries, and mentors together before pushing our code to production.",
    image: { src: "/forge/database-schema.png", width: 1384, height: 1432 },
  },

  outcomes: {
    id: "outcomes",
    index: "06",
    title: "Outcomes & The Live Codebase",
    body: "Through disciplined project management and a scalable design foundation, I successfully led the team to a final handoff by the end of the academic year, delivering a fully functional, live Next.js and Supabase web application ready to be utilized by future cohorts. Dedicating my time to building Forge was an incredibly fulfilling experience that taught me invaluable lessons in cross-functional leadership, technical architecture, and resilient product management. Knowing that this platform will continue to foster long-term community learning and shape the next generation of technical students makes seeing this zero-to-one journey come to life truly rewarding.",
    video: { src: "/forge/final-site.mp4", width: 1600, height: 866 },
  },
};
