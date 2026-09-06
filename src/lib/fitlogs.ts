/**
 * FITLOGS — every word on /work/fitlogs.
 *
 * Same rule as `jurni.ts`: copy lives here, layout lives in the page. Media
 * paths are kebab-cased for the same reason — source filenames carry spaces,
 * which would ship as %20 in every URL.
 */

export const fitlogs = {
  title: "Fitlogs: Evidence-Based Fitness Tracking",

  meta: [
    { label: "Role", value: "UX Researcher, Product Designer, Founder" },
    { label: "Timeline", value: "March 2026 - Present" },
    { label: "Platform", value: "Web App (Transitioning to iOS/Android)" },
  ],

  techLogos: [
    { src: "/fitlogs/logo-claude.svg", width: 16, height: 16, name: "Claude" },
    { src: "/fitlogs/logo-figma.svg", width: 16, height: 16, name: "Figma" },
    { src: "/fitlogs/logo-figma-make.svg", width: 16, height: 16, name: "Figma Make" },
    { src: "/fitlogs/logo-slides.svg", width: 16, height: 16, name: "Google Slides" },
  ],

  hero: "/fitlogs/hero.mp4",

  catalyst: {
    id: "catalyst",
    index: "01",
    title: "The Brief",
    spark: {
      heading: "The Academic Spark",
      body: "This project originated from a 50-page academic UX research study I conducted evaluating the market leading fitness application, MyFitnessPal. Through contextual observation and user interviews, I discovered that severe interface friction and overcomplicated tracking tools were driving users to abandon secondary features entirely, forcing them into a single flow. My mission was to build a better alternative from the ground up: a unified, data-driven ecosystem designed to effortlessly manage both nutrition and strength training in one platform.",
      paper: {
        title: "UWP 110: MyFitnessPal UX Research & Retention Strategy",
        href: "https://docs.google.com/document/d/13APQNS0hRqCDr8aqGgn8OI5V-dgYQRTWxkFTz7GcN6Q/edit?usp=sharing",
      },
    },
    problem: {
      heading: "The Problem",
      body: "The fitness app market forces users to choose between bloated free apps that excel at only one function, or premium tools locked behind paywalls. My academic research on MyFitnessPal revealed severe friction points, high cognitive load, and cluttered interfaces that actively harm user retention.",
    },
    solution: {
      heading: "The Solution",
      body: "Fitlogs is a cohesive ecosystem built from the ground up to manage dieting and strength training data in tandem. This provides users a holistic view of their health and fitness progression, helping them track their progress completely for free. Why? Because taking care of your health deserves to be easy and accessible.",
    },
  },

  architecture: {
    id: "architecture",
    index: "02",
    title: "Academic Rigor & Strategic Architecture",
    narrative:
      "To diagnose the problem space, I conducted semi-structured user interviews and contextual observation sessions. The research revealed a singleflow trap: 75% of participants exclusively engaged with food logging. By mapping the decision matrix for this specific task, I identified areas of high cognitive load that caused users like Casual Jane to struggle with consistency and eventually abandon the app.\n\nMeanwhile, secondary features were neglected entirely. After trying the app's exercise tracker, the Macro Mark persona abandoned it, reverting to a physical notebook because the interface was overcomplicated and the data was inaccurate.\n\nThese insights directly informed the product's foundation. By analyzing these distinct behaviors, I established the 2+1 architecture: a framework where both frictionless nutrition and progressive overload share top-level priority, funneling seamlessly into a centralized health dashboard.",
    personas: [
      {
        src: "/fitlogs/persona-2.png",
        width: 1266,
        height: 602,
        name: "Casual Jane",
        caption: "Casual Jane: Wants to monitor her general health.",
      },
      {
        src: "/fitlogs/persona-1.png",
        width: 1316,
        height: 672,
        name: "Macro Mark",
        caption: "Macro Mark: Requires detailed fitness progression tracking.",
      },
    ],
    userFlow: {
      src: "/fitlogs/user-flow.png",
      width: 2800,
      height: 1078,
    },
  },

  wireframes: {
    id: "wireframes",
    index: "03",
    title: "Wireframing the Workout Experience",
    narrative:
      "Transitioning from research to structure, my primary focus was solving the frustrations of the Macro Mark persona. While existing market solutions may have cluttered dietary tracking user flows, their exercise logging systems are fundamentally flawed.\n\nBecause the industry standard for nutrition tracking was already established, I dedicated my initial structural ideation to reinventing the workout experience. The wireframes focused on stripping away complex navigation to create a dense, highly scannable layout. The objective was to ensure a user could log a set, compare historical data, and track progressive overload seamlessly within a single breakpoint, establishing a frictionless foundation before moving into high-fidelity design.",
    caption: "Early wireframes stripping away complex navigation for a dense, scannable workout-logging layout.",
    images: [
      { src: "/fitlogs/wireframe-1.png", width: 393, height: 852 },
      { src: "/fitlogs/wireframe-2.png", width: 393, height: 852 },
    ],
  },

  hifi: {
    id: "hifi",
    index: "04",
    title: "High-Fidelity Design",
    blocks: [
      {
        heading: "Frictionless Dietary Tracking",
        body: "I polished the food diary interface to completely eliminate the cognitive load identified during the research phase. By restructuring the information architecture, all entry fields remain explicitly visible immediately upon opening the tab. I stripped away the static advertisements and nested menus that plague market leaders, ensuring users no longer face the friction that previously caused them to abandon their tracking habits. Macro targets are visualized through intuitive, color-coded components, making daily adherence scannable at a glance.",
      },
      {
        heading: "The Progressive Overload Engine",
        body: "To solve the frustrations of Macro Mark, I designed a training logger that rivals a physical notebook in speed, but far exceeds it in utility. The interface allows users to seamlessly log lifts, track plateaus, and view historical progression inline. To provide deeper analytical value without added complexity, the system leverages the Epley formula to dynamically calculate and chart a user's estimated one-rep max across all logged sets, transforming raw data into a clear progression curve.",
        formula: "1RM = W(1 + R/30)",
      },
      {
        heading: "The Holistic Dashboard",
        body: "The main hub serves as the ultimate convergence point for the 2+1 architecture. Rather than isolating metrics, the dashboard unifies daily nutritional adherence and exercise volume, directly correlating those inputs to the user's overarching weight tracking goals. This provides actionable, unified insights, proving that the kitchen and the gym are inherently connected.",
      },
    ],
    screens: [
      [
        { src: "/fitlogs/hifi-dieting-1.png", width: 862, height: 1598 },
        { src: "/fitlogs/hifi-dieting-2.png", width: 862, height: 1598 },
      ],
      [{ src: "/fitlogs/hifi-fitness-1.png", width: 862, height: 1598 }],
      [{ src: "/fitlogs/hifi-dashboard-1.png", width: 862, height: 1598 }],
    ],
  },

  development: {
    id: "development",
    index: "05",
    title: "AI-Assisted Development",
    blocks: [
      {
        heading: "The Figma Make MVP",
        body: "To bridge the gap between static high-fidelity design and a functional product, I initially leveraged Figma Make. This tool was instrumental in rapidly translating my static layouts into a tangible web application using React, HTML, and CSS. It allowed for immediate structural validation and proved the viability of the 2+1 architecture in a live environment.",
      },
      {
        heading: "The React Native Pivot",
        body: "However, as the product roadmap evolved toward App Store deployment, the limitations of Figma Make became apparent. Transitioning a web-based codebase to React Native requires a level of dynamic architectural control, state management, and custom logic that static code generation cannot provide. To achieve this engineering freedom, I pivoted my workflow and utilized Claude Code. This transition empowered me to refactor the web ecosystem into a robust, mobile-native codebase with strict component reusability.",
      },
      {
        heading: "Rapid Feature Iteration",
        body: "Iterative development with AI unlocked the ability to rapidly ship and modify features on the fly. For instance, during the engineering phase, I recognized the need for greater nuance in the training logger. Using Claude, I quickly engineered and implemented a dynamic warm-up set toggle. This ensures that preliminary lifting data does not skew the user's historical progression or Epley calculations, actively preserving the data integrity of the entire ecosystem.",
      },
    ],
    fullApp: "/fitlogs/full-app.mp4",
    process: [
      { src: "/fitlogs/make.png", width: 2940, height: 1912 },
      { src: "/fitlogs/claude.png", width: 2940, height: 1912 },
    ],
  },

  outcomes: {
    id: "outcomes",
    index: "06",
    title: "Future Vision & Outcomes",
    roadmap: {
      heading: "The Technical Roadmap",
      body: "Fitlogs is an actively evolving ecosystem. While the immediate focus is on finalizing the native iOS and Android applications for App Store deployment, the long term trajectory centers on intelligent automation. By integrating AI driven personal training and contextual post-workout insights, the platform will evolve from a passive tracking tool into an active coaching system designed to dynamically prevent user plateaus.",
    },
    reflections: {
      heading: "Outcomes & Reflections",
      body: "Building Fitlogs fundamentally shifted my perspective from a UX Researcher to an end-to-end Product Founder. While translating dense academic research into a functional react native codebase redefined how I architect digital products, the greatest reward has been entirely personal. I designed a tool that I genuinely rely on every single day. Since pushing Fitlogs live, I have experienced the best fitness gains of my life. The interface makes the core principle of progressive overload effortless, allowing me to quickly look back at exactly what I lifted last week and incrementally push those numbers higher. Experiencing firsthand how that compounding progress can genuinely change your life has been the ultimate validation of this entire product journey. Because taking control of your health shouldn't be locked behind a premium subscription, Fitlogs is completely free, and I would love for you to try it for yourself.",
    },
    liveApp: {
      title: "Experience Fitlogs Live",
      href: "https://fitlogs.figma.site/",
    },
  },
};
