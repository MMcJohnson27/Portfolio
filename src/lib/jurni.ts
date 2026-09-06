/**
 * JURNI — every word on /work/jurni.
 *
 * Same rule as `content.ts`: copy lives here, layout lives in the page. The
 * media paths are kebab-cased because the source filenames contain spaces,
 * which would ship as %20 in every URL.
 *
 * Each section's `id` is the anchor the sticky contents column links to, so
 * the nav and the sections can never drift apart.
 */

export const jurni = {
  title: "Jurni: A Data-Driven GLP-1 Ecosystem",

  meta: [
    { label: "Role", value: "Lead UX Researcher & Product Designer" },
    { label: "Timeline", value: "6 Weeks (June – July 2025)" },
    { label: "Team", value: "1 Lead Designer, 1 Founder" },
    {
      label: "Skills",
      value: "UX Research\nProduct Design\nProduct Management",
    },
  ],

  hero: "/jurni/hero.mp4",

  hook: {
    id: "hook",
    index: "01",
    title: "The Brief",
    problem: {
      heading: "The Problem",
      body: "Users are forced to choose between two frustrating extremes: settling for superficial, vibe-coded apps with lackluster features, or suffering through tedious, data-mining onboarding flows only to hit an expensive paywall before they can even explore the interface.",
    },
    solution: {
      heading: "The Solution",
      body: "Jurni is a fully integrated ecosystem designed by and for the real GLP-1 users. It pairs best in class clinical tracking with conversational AI assistance, a curated marketplace, and community support to help users along their Jurni. This is packaged in a freemium subscription system allowing users to experience core utilities for free, building trust before offering premium upgrades.",
    },
    metrics: [
      { value: "18", label: "Competitors Analyzed" },
      { value: "6-Week", label: "MVP Turnaround" },
      { value: "100%", label: "Client Buy-in" },
    ],
  },

  problemSpace: {
    id: "problem-space",
    index: "02",
    title: "Defining the Landscape",
    narrative:
      "Working from the initial client proposal to final handoff, my role required balancing UX research with rigorous product management. To position Jurni at the top of the market, we first had to diagnose the landscape it would be entering. To learn more, I initiated a comprehensive competitive audit and visual benchmarking process to identify exactly where existing apps were succeeding and failing. With a highly ambitious client bringing new feature ideas to our daily syncs, this research did more than just build user empathy; it became our primary mechanism to prevent scope creep, define feature value, and lock in a realistic, market-leading MVP.",
    cards: [
      {
        title: "Onboarding Trap.",
        body: "Competitors frustrated users with lengthy onboarding flows that mined personal data but led straight to mandatory paywalls. We defined a transparent freemium model with a purposeful onboarding sequence that actually uses collected data to personalize the experience from day one, proving value before asking for a subscription.",
      },
      {
        title: "The Data Void.",
        body: "Users lacked an accessible, centralized data dashboard. The client requested a Bloomberg Terminal-style dashboard for GLP metrics that was intuitive enough for the everyday consumer, but had the nitty-gritty details for hyper-trackers.",
      },
      {
        title: "Speed Over Understanding",
        body: "Many existing apps felt vibe-coded and rushed, sacrificing accessibility and high-fidelity design for speed to market. We took the time to get it right, creating an app backed by real data that puts the user experience first.",
      },
    ],
    audit: {
      src: "/jurni/audit.mp4",
      caption: "Narrowing 18 competitors down to the 3 primary market leaders.",
    },
    benchmarking: {
      src: "/jurni/benchmarking.png",
      width: 1842,
      height: 1296,
      caption:
        "Comprehensive visual benchmarking evaluating features, tone, onboarding, and subscription models.",
    },
  },

  architecture: {
    id: "architecture",
    index: "03",
    title: "Information Architecture & Scope",
    narrative:
      "With the competitive landscape defined, we translated our insights into a tangible Information Architecture (IA). I developed a dynamic feature map to anchor our initial designs, mapping out each necessary screen and filtering every mandatory feature into its proper place based on insights from our audit and benchmark. This map became our primary tool for protecting the MVP scope; every new feature the client proposed was evaluated, assigned to a specific screen, and explicitly categorized as a free utility, a premium upgrade, or banked for a post-launch roadmap. Once the feature set was locked, I built formal user flows and journey maps to ensure this complex ecosystem felt intuitive and genuinely supported users in reaching their health goals.",
    figures: [
      {
        src: "/jurni/feature-mapping.png",
        width: 868,
        height: 1160,
        caption:
          "Feature Mapping: Categorizing client requests against user needs and assigning MVP priority.",
      },
      {
        src: "/jurni/user-journey.png",
        width: 1554,
        height: 1162,
        caption:
          "User Journey Mapping: Tracking emotional and functional milestones across the ecosystem.",
      },
      {
        src: "/jurni/user-flow.png",
        width: 2260,
        height: 1186,
        caption:
          "User Flow Diagram: The final architectural blueprint spanning track, transform, adapt, and connect.",
      },
    ],
  },

  execution: {
    id: "execution",
    index: "04",
    title: "High-Fidelity Execution",
    narrative:
      "With our scope locked and the user needs clearly defined, I transitioned from research into high-fidelity design, partnering closely with our Lead Designer to bring the MVP to life. I took ownership of designing two core features that would differentiate Jurni in the market and drive its premium value: the conversational AI companion and the curated marketplace.",
    blocks: [
      {
        eyebrow: "Jurni GPT",
        heading: "The AI Companion.",
        body: "Jurni GPT acts as a personalized GLP-focused health assistant and a conversational interface for the entire ecosystem. Rather than leaving users to dig through complex data dashboards, the AI proactively helps them navigate the app, offers contextual suggestions to ease their GLP-1 Jurni, and surfaces personalized insights based on their initial onboarding profile and daily tracking logs.",
        src: "/jurni/gpt-mockup.mp4",
      },
      {
        eyebrow: "Curated Marketplace",
        heading: "The Curated Marketplace.",
        body: "This feature is designed to connect users with the exact tools they need to ease their GLP-1 Jurni. The shopping experience is heavily categorized, allowing users to filter by specific side-effect remedies, browse recommendations from trusted GLP-1 content creators, or explore product offerings from GLP-1 friendly brands. Additionally, this structure integrates frictionless affiliate links, generating a passive revenue stream for Jurni without passing any extra costs to the user.",
        src: "/jurni/marketplace-mockup.mp4",
      },
    ],
  },

  outcomes: {
    id: "outcomes",
    index: "05",
    title: "Outcomes",
    narrative:
      "This project proved that proper market research is the true foundation of effective product strategy. By deeply understanding the competitive landscape and putting user needs first, I was able to channel the client's ambitions into a viable, structured ecosystem. The final feature architecture and high-fidelity screens were successfully handed off for development, providing a clear, actionable roadmap from MVP to a mature, market-leading product.",
    walkthrough: "/jurni/full-walkthrough.mp4",
    takeaways: [
      {
        title: "Strategic Scoping.",
        body: "Stepping into a PM role demonstrated how continuous feature mapping can be used to balance a client's high-level ambitions with realistic development constraints.",
      },
      {
        title: "Architectural Rigor.",
        body: "Conducting deep competitive benchmarking and defining the information architecture early on made the transition into high-fidelity UI design frictionless.",
      },
      {
        title: "Data-Driven Trust.",
        body: "Anchoring our feature prioritization and freemium monetization strategy in objective market data secured 100% client buy-in on a tightly constrained product.",
      },
    ],
  },
};
