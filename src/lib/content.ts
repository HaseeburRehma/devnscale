/** All copy transcribed from the Figma home page. */

// Hrefs are page-relative (`/#…`) so they resolve from any route, not just
// the home page — About Us is now its own page.
export const NAV_LINKS = [
  { label: "Our Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const HERO_STATS =
  "500+ Projects Shipped  ·  7+ Years of Building  ·  90%+ International Clients";

export const SERVICES = [
  {
    id: "web",
    title: "Web Development",
    body: "Full web development services covering frontend and backend development, custom websites, WordPress, and Framer. Fast, scalable, and built to last.",
    icon: "code",
    featured: true,
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    body: "End-to-end mobile app development for iOS, Android, and cross-platform built for performance and built to grow.",
    icon: "smartphone",
  },
  {
    id: "design",
    title: "Design",
    body: "Professional UI/UX and graphic design services, crafting visuals that speak before words do, from pixel-perfect interfaces to complete brand identities.",
    icon: "layout",
  },
  {
    id: "ai",
    title: "AI Chatbot Development",
    body: "Custom AI chatbot development with intelligent conversational interfaces automating support, qualifying leads, and improving user experience around the clock.",
    icon: "chat",
  },
  {
    id: "qa",
    title: "Software Quality Assurance",
    body: "Thorough QA testing covering manual testing and automation testing, catching bugs before your users do so your product ships with confidence.",
    icon: "shield",
  },
  {
    id: "pitch",
    title: "Pitch Deck",
    body: "Professional pitch deck design and investor presentation services, startup decks, and fundraising decks designed to open doors and close deals.",
    icon: "presentation",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    body: "A results driven digital marketing agency offering SEO, paid ads, and performance marketing - data-driven campaigns that reach the right audience at the right time.",
    icon: "trending",
  },
  {
    id: "crypto",
    title: "Crypto Dashboards Expert",
    body: "Crypto dashboard design and blockchain UX  Web3 dashboards, DeFi platforms, and CRM systems built for the decentralised world.",
    icon: "bitcoin",
  },
] as const;

/* ============================================================
   Service detail pages — one per SERVICES entry, routed under
   /services/[slug]. Content shape mirrors the Figma template at
   frame 4979:40344 (Full Stack Development):
     hero (index + title + body)
     stats (4 short metrics)
     included (section header + N rows, each with title + body)
     process (5–6 timeline entries)
   ============================================================ */

export type ServiceStat = { value: string; label: string };

export type ServiceIncludedRow = {
  title: string;
  body: string;
};

export type ServiceProcessStep = {
  title: string;
  body: string;
};

export type ServiceDetail = {
  slug: string;
  /** Numeric prefix printed above the hero title, e.g. "01". */
  index: string;
  /** Uppercase eyebrow like "WEB DEVELOPMENT". */
  hero: {
    title: string;
    body: string;
  };
  stats: readonly ServiceStat[];
  included: {
    eyebrow: string;
    title: string;
    body: string;
    rows: readonly ServiceIncludedRow[];
  };
  process: {
    eyebrow: string;
    title: string;
    body: string;
    steps: readonly ServiceProcessStep[];
  };
  /** SEO title/description for the page's <head>. */
  meta: { title: string; description: string };
};

/* Every entry keyed by SERVICES[].id so `/services/[slug]` resolves
 * from the same source that drives the home + /services grids.
 *
 * Web Development is transcribed verbatim from Figma frame 4979:40344.
 * The other seven follow the same shape, with copy tailored to each
 * service's specialty.
 */
export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  web: {
    slug: "web-development",
    index: "01",
    hero: {
      title: "Web Development",
      body: "We deliver complete web development services from custom website development and frontend and backend development to WordPress, Framer, and full SaaS platforms. Fast, scalable, and beautifully engineered.",
    },
    stats: [
      { value: "Custom Built", label: "Custom Built for Every Client" },
      { value: "Clean", label: "Clean Scalable Code" },
      { value: "Mobile First", label: "Mobile First Always" },
      { value: "Figma", label: "Figma to Code Handoff" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "End-to-End Web Solutions",
      body: "We handle every layer of the stack from design system to deployment.",
      rows: [
        {
          title: "Frontend Development",
          body: "React, Next.js, Vue — pixel-perfect, responsive web development delivering fully performant interfaces that feel alive across every device and screen size.",
        },
        {
          title: "Backend Development",
          body: "Node.js, Django, Laravel — robust API services, databases, and scalable architecture built to handle growth.",
        },
        {
          title: "Full Stack and SaaS Development",
          body: "Complete SaaS development covering dashboards, portals, and ecommerce solutions built with scalable architecture from concept to launch.",
        },
        {
          title: "WordPress Development",
          body: "Custom WordPress development covering themes, plugins, WooCommerce and CMS configuration for enterprise-grade results.",
        },
        {
          title: "Framer Website Design",
          body: "Fast interactive marketing sites built with Framer featuring advanced animations, CMS, and no-code flexibility.",
        },
        {
          title: "Security, Performance and Optimisation",
          body: "SSL, CDN setup, security hardening, Core Web Vitals optimisation, and regular maintenance to keep your site fast and safe.",
        },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "How We Build",
      body: "Agile development sprints with full transparency and weekly deliverables.",
      steps: [
        {
          title: "Scope and Plan",
          body: "Technical requirements, architecture decisions, and sprint planning.",
        },
        {
          title: "Design Handoff",
          body: "Figma to code — design system setup and component architecture.",
        },
        {
          title: "Development",
          body: "Agile sprints with weekly demo calls and continuous integration.",
        },
        {
          title: "QA and Testing",
          body: "Cross-browser, device, and performance testing before anything goes live.",
        },
        {
          title: "Launch",
          body: "Staged deployments, DNS setup, CMS configuration, monitoring, and go-live checklist.",
        },
        {
          title: "Support",
          body: "Ongoing maintenance retainers, updates, and feature development.",
        },
      ],
    },
    meta: {
      title: "Web Development — Dev N Scale",
      description:
        "Frontend, backend, full-stack SaaS, WordPress, and Framer development. Fast, scalable, and Figma-to-code handoff on every project.",
    },
  },

  mobile: {
    slug: "mobile-app-development",
    index: "02",
    hero: {
      title: "Mobile App Development",
      body: "Native iOS and Android, plus cross-platform React Native and Flutter apps engineered for performance, offline resilience, and App Store readiness on day one.",
    },
    stats: [
      { value: "iOS", label: "Native Swift / SwiftUI" },
      { value: "Android", label: "Kotlin / Jetpack Compose" },
      { value: "Cross", label: "React Native + Flutter" },
      { value: "Ship", label: "App Store & Play Store Ready" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Everything an app needs to ship.",
      body: "From first Figma frame to Store listing — one team, one timeline.",
      rows: [
        {
          title: "iOS Native Development",
          body: "Swift + SwiftUI apps built for performance, ready for TestFlight and App Store review.",
        },
        {
          title: "Android Native Development",
          body: "Kotlin + Jetpack Compose apps with Material 3, Google Play policy compliance, and staged rollouts.",
        },
        {
          title: "React Native & Flutter",
          body: "Cross-platform shipped from a single codebase — for teams that need parity without doubling headcount.",
        },
        {
          title: "App Backend & APIs",
          body: "Auth, sync, push, and analytics wired against Supabase, Firebase, or a bespoke Node/Postgres stack.",
        },
        {
          title: "Offline & Real-Time",
          body: "Local-first storage, sync engines, and WebSocket / MQTT flows for apps that need to work anywhere.",
        },
        {
          title: "Release, Monitoring & Ops",
          body: "CI pipelines, Fastlane submissions, crash reporting, and monthly release trains once you're live.",
        },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "How We Ship Apps",
      body: "Weekly TestFlight/Play internal builds so you feel progress every seven days.",
      steps: [
        { title: "Discovery", body: "User flows, platform decisions, and native-vs-cross-platform framing." },
        { title: "Design System", body: "Figma design system that maps 1:1 to platform-native components." },
        { title: "Build Sprints", body: "Two-week sprints with a TestFlight / Play internal build at the end of each." },
        { title: "Beta", body: "Public TestFlight / Open Testing round, telemetry wired, feedback loop closed." },
        { title: "Launch", body: "Store listing copy, screenshots, review submission, staged rollout." },
        { title: "Iterate", body: "Post-launch retainer for A/B tests, patches, and the next-quarter roadmap." },
      ],
    },
    meta: {
      title: "Mobile App Development — Dev N Scale",
      description:
        "Native iOS, Android, and cross-platform apps built for performance and shipped to the Store with monitoring and release ops in place.",
    },
  },

  design: {
    slug: "design",
    index: "03",
    hero: {
      title: "Design",
      body: "Product, brand, and marketing design that speaks before the copy does — pixel-perfect UI, motion, illustration, and identity work grounded in real research.",
    },
    stats: [
      { value: "UI/UX", label: "Product Design" },
      { value: "Brand", label: "Identity & Guidelines" },
      { value: "Motion", label: "Interaction & Motion" },
      { value: "System", label: "Design Systems at Scale" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Design that ships, not decks.",
      body: "Every artefact is engineered for handoff — component tokens, states, and specs built in from the start.",
      rows: [
        { title: "Product & UX Design", body: "User flows, wireframes, and high-fidelity screens for web and mobile products." },
        { title: "Design Systems", body: "Figma libraries, tokens, and Storybook parity so engineering and design speak the same language." },
        { title: "Brand Identity", body: "Logo, type, colour, and voice — the full identity toolkit and usage guidelines." },
        { title: "Motion & Prototype", body: "Prototype interactions, micro-animations, and Rive / Lottie assets ready for production." },
        { title: "Marketing Design", body: "Landing pages, ad creative, decks, and social kits that stay on brand across every touchpoint." },
        { title: "Illustration & 3D", body: "Custom illustration, iconography, and 3D renders — no generic stock, no compromise on story." },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "How We Design",
      body: "Design paired with real research, delivered in Figma files engineering can actually build from.",
      steps: [
        { title: "Research", body: "Interviews, competitor teardowns, and problem framing before a single pixel lands." },
        { title: "Wireframes", body: "Low-fi flows we can test cheaply before committing to a visual direction." },
        { title: "Visual Design", body: "High-fidelity Figma frames, tokens, and states — the source of truth for build." },
        { title: "Prototype", body: "Clickable Figma prototypes plus motion specs for the interactions." },
        { title: "Handoff", body: "Dev-ready file, component library, and a walkthrough call for the engineering team." },
        { title: "Iterate", body: "Design QA against the build, plus monthly design retainers as the product grows." },
      ],
    },
    meta: {
      title: "Design — Dev N Scale",
      description: "Product, brand, and marketing design — from research to Figma handoff, built to ship, not just to present.",
    },
  },

  ai: {
    slug: "ai-chatbot-development",
    index: "04",
    hero: {
      title: "AI Chatbot Development",
      body: "Custom chat, voice, and workflow agents built on the latest Claude / OpenAI models, wired into your data, guardrailed for production, and observable end-to-end.",
    },
    stats: [
      { value: "Claude", label: "Anthropic + OpenAI Models" },
      { value: "RAG", label: "Retrieval Over Your Data" },
      { value: "Tools", label: "Function Calling & MCP" },
      { value: "Eval", label: "Prompt & Answer Evals" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Agents that do the work.",
      body: "From a support chatbot to a full agentic workflow — designed, built, and evaluated before it faces a user.",
      rows: [
        { title: "Support & Sales Chatbots", body: "Site + WhatsApp bots that qualify leads, answer FAQs, and hand off cleanly to humans." },
        { title: "Retrieval-Augmented Assistants", body: "Grounded on your docs, tickets, and knowledge base — no hallucinated answers, with citations." },
        { title: "Agentic Workflows", body: "Multi-step agents with tools that book, refund, escalate, and reason across systems." },
        { title: "Voice Agents", body: "Inbound and outbound voice built on Vapi / LiveKit — natural, latency-optimised, transcribed." },
        { title: "Guardrails & Safety", body: "PII redaction, moderation, jailbreak resistance, and role-based access on every response." },
        { title: "Observability & Evals", body: "LangSmith / Braintrust traces, offline eval sets, and quality dashboards from day one." },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "How We Build Agents",
      body: "Prompt engineering + real evals, not vibes — every release is measured before it ships.",
      steps: [
        { title: "Discovery", body: "What conversations, what data, what handoffs — the operating manual for the agent." },
        { title: "Data Prep", body: "Chunk, embed, and vet the knowledge base; write the golden question / answer set." },
        { title: "Prompting & Tools", body: "System prompts, tool definitions, MCP servers, and safety layers." },
        { title: "Evaluate", body: "Offline evals on the golden set, red-team pass, and human review before beta." },
        { title: "Deploy", body: "Widget, API, or WhatsApp — with rate limits, cost caps, and observability." },
        { title: "Improve", body: "Weekly review of conversations, prompt tuning, and eval regression tracking." },
      ],
    },
    meta: {
      title: "AI Chatbot Development — Dev N Scale",
      description:
        "Chat, voice, and agentic AI systems on Claude / OpenAI — grounded on your data, guardrailed, and observable in production.",
    },
  },

  qa: {
    slug: "software-quality-assurance",
    index: "05",
    hero: {
      title: "Software Quality Assurance",
      body: "Manual test discipline, automation coverage, and CI-native performance and accessibility checks — ship with the confidence users will never find the bug first.",
    },
    stats: [
      { value: "Manual", label: "Exploratory & Regression" },
      { value: "Auto", label: "Playwright / Cypress" },
      { value: "CI", label: "Every PR, Every Merge" },
      { value: "A11y", label: "WCAG 2.2 AA" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "The full QA stack.",
      body: "One team covering strategy, execution, and continuous quality gates — not just a report at the end.",
      rows: [
        { title: "Test Strategy", body: "Test plan, risk matrix, coverage targets, and entry / exit criteria." },
        { title: "Manual QA", body: "Exploratory, regression, and cross-device passes with concise repro reports." },
        { title: "Automation", body: "Playwright and Cypress suites integrated with your CI, gated on merges." },
        { title: "API Testing", body: "Postman / Bruno collections plus contract tests against the OpenAPI spec." },
        { title: "Performance & Load", body: "k6 and Lighthouse budgets — enforced on every PR, not just before launch." },
        { title: "Accessibility", body: "WCAG 2.2 AA auditing, axe-core CI integration, and remediation walkthroughs." },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "How We Test",
      body: "Quality baked in from sprint one, not tacked on the week before ship.",
      steps: [
        { title: "Assess", body: "Audit the current test coverage, tooling, and gaps." },
        { title: "Plan", body: "Test strategy, coverage matrix, and the automation vs manual split." },
        { title: "Automate", body: "Green baseline suite in CI, gated on every PR." },
        { title: "Execute", body: "Regression + exploratory rounds each sprint, with triaged bug reports." },
        { title: "Release", body: "Sign-off checklist, smoke pack, and post-release monitoring." },
        { title: "Iterate", body: "Retro on escaped defects, tune the suite, and grow coverage over time." },
      ],
    },
    meta: {
      title: "Software Quality Assurance — Dev N Scale",
      description:
        "Manual + automated QA, performance budgets, and WCAG accessibility auditing wired into your CI pipeline.",
    },
  },

  pitch: {
    slug: "pitch-deck",
    index: "06",
    hero: {
      title: "Pitch Deck",
      body: "Investor-ready decks that lead with the story, not the template — narrative structure, tight data viz, and a visual system your team can actually keep on-brand.",
    },
    stats: [
      { value: "Seed", label: "Pre-Seed → Series B" },
      { value: "Story", label: "Narrative-First Structure" },
      { value: "Viz", label: "Clean Data Visualisation" },
      { value: "Kit", label: "Editable Figma / Keynote Kit" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Decks investors read to the end.",
      body: "Copy, structure, and visual — the three levers of a deck that converts.",
      rows: [
        { title: "Narrative & Copywriting", body: "Story arc, positioning, and slide-by-slide copywriting for founders who don't want to freestyle." },
        { title: "Visual Design", body: "Custom typography, iconography, and layout — a deck that doesn't look like every SaaS template." },
        { title: "Data Visualisation", body: "TAM, cohort, retention, and financials rendered as charts investors can actually parse in 10 seconds." },
        { title: "Data Room Assets", body: "One-pager, memo, financial model cover — the supporting kit that lives alongside the deck." },
        { title: "Editable Handoff", body: "Figma + Keynote + Google Slides masters so your team can iterate without going back to the studio." },
        { title: "Pitch Coaching", body: "One session with a former founder to rehearse delivery, Q&A, and demo pacing." },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "How We Build the Deck",
      body: "A two-week sprint from raw brief to investor-ready v1 — one revision round included.",
      steps: [
        { title: "Discovery", body: "60-minute founder call, one round of async questions, review of prior decks and data." },
        { title: "Narrative", body: "Slide-by-slide outline and story arc — written before a pixel is designed." },
        { title: "Design v1", body: "First full pass in Figma with real numbers and stock-free visuals." },
        { title: "Review", body: "One revision round on copy + visual before final polish." },
        { title: "Handoff", body: "Delivery in Figma, Keynote, Google Slides, and PDF — plus a data-room-ready one-pager." },
        { title: "Iterate", body: "Optional retainer for round-two updates, translated variants, and follow-on rounds." },
      ],
    },
    meta: {
      title: "Pitch Deck — Dev N Scale",
      description: "Investor-ready pitch decks with narrative structure, clean data viz, and editable Figma/Keynote handoff.",
    },
  },

  marketing: {
    slug: "digital-marketing",
    index: "07",
    hero: {
      title: "Digital Marketing",
      body: "Growth engineering for founders — SEO, paid, and lifecycle campaigns run against real dashboards, not vanity slides, so every euro is traceable to pipeline.",
    },
    stats: [
      { value: "SEO", label: "Technical + Content" },
      { value: "Ads", label: "Google, Meta, LinkedIn" },
      { value: "CRO", label: "Landing Pages & Experiments" },
      { value: "Data", label: "GA4 + Attribution Dashboards" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Growth, measured.",
      body: "One team for acquisition, activation, and analytics — nothing gets thrown over a fence.",
      rows: [
        { title: "SEO — Technical & Content", body: "Site audits, schema, internal linking, and content calendars aimed at ranking intent." },
        { title: "Paid Media", body: "Google Ads, Meta, and LinkedIn campaigns with weekly reporting and creative iteration." },
        { title: "Conversion & CRO", body: "Landing pages, A/B tests, and funnel analysis to lift pipeline without lifting spend." },
        { title: "Lifecycle & Email", body: "Onboarding, activation, and win-back flows built in Klaviyo, Customer.io, or HubSpot." },
        { title: "Analytics & Attribution", body: "GA4, PostHog, or Mixpanel wired up honestly — with dashboards you'll actually open." },
        { title: "Content & Creative", body: "Ad creative, landing hero copy, and long-form pieces that pull weight beyond one sprint." },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "How We Grow It",
      body: "A 90-day cycle: audit, ship, learn, double down on what's working.",
      steps: [
        { title: "Audit", body: "Current traffic, funnel, and spend — plus a competitor teardown." },
        { title: "Plan", body: "Channel mix, campaign hypotheses, and success metrics for the next 90 days." },
        { title: "Ship", body: "Landing pages, ad creative, sequences — launched, not just briefed." },
        { title: "Measure", body: "Weekly reporting on real KPIs — CAC, activation, MRR — never on likes." },
        { title: "Optimise", body: "Kill what's not working, double down on what is, keep the compounding engine alive." },
        { title: "Report", body: "Monthly written retro with next-cycle plan — no jargon, no hand-waving." },
      ],
    },
    meta: {
      title: "Digital Marketing — Dev N Scale",
      description:
        "SEO, paid media, CRO, and lifecycle campaigns — with GA4/attribution dashboards so every euro maps back to pipeline.",
    },
  },

  crypto: {
    slug: "crypto-dashboards",
    index: "08",
    hero: {
      title: "Crypto Dashboards Expert",
      body: "Web3 UI, DeFi platforms, and CRM systems built for the decentralised world — wallet integrations, on-chain data, and interfaces investors and traders actually trust.",
    },
    stats: [
      { value: "EVM", label: "Ethereum, L2s, XRPL" },
      { value: "DeFi", label: "Swap, Stake, Farm, Lend" },
      { value: "Wallet", label: "WalletConnect + Embedded" },
      { value: "Chain", label: "Indexers & The Graph" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Everything a Web3 product needs.",
      body: "Frontends and dashboards purpose-built for on-chain data, not repurposed SaaS templates.",
      rows: [
        { title: "DeFi Dashboards", body: "Swap, staking, yield, and lending UIs with clean quote flows and slippage guards." },
        { title: "Wallet & Auth", body: "WalletConnect v2, embedded wallets, sign-in-with-Ethereum, and role-based access." },
        { title: "On-Chain Data", body: "The Graph, custom indexers, and RPC caching for portfolio, position, and history views." },
        { title: "NFT Marketplaces", body: "Listings, offers, royalties, and creator dashboards for NFT-first products." },
        { title: "CRM & Analytics", body: "Wallet-first CRM, cohort analysis, and campaign attribution across on-chain events." },
        { title: "Security & Audits", body: "Contract-integration reviews, replay-attack coverage, and coordinated audit remediation." },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "How We Build Web3",
      body: "Web2 rigor on top of Web3 primitives — real testing, real monitoring, real UX.",
      steps: [
        { title: "Chain Discovery", body: "Networks, contracts, RPCs, and data providers scoped before design begins." },
        { title: "UX Prototypes", body: "Wallet flow, transaction UX, and edge-case screens tested with real users." },
        { title: "Build", body: "wagmi + viem stack, indexer or Graph subgraph, gas-safe transaction confirmations." },
        { title: "Testnet Beta", body: "Deploy on Sepolia / testnet, real-money-off beta with the founding community." },
        { title: "Mainnet Launch", body: "Staged mainnet rollout with monitoring, rate limits, and incident runbooks." },
        { title: "Support", body: "Retainer for chain upgrades, new features, and post-audit fixes." },
      ],
    },
    meta: {
      title: "Crypto Dashboards & Web3 Development — Dev N Scale",
      description: "Web3 UI, DeFi platforms, NFT marketplaces, and wallet-first CRM systems built for the decentralised world.",
    },
  },
};

/** Slug → id lookup so `/services/[slug]` can resolve to the SERVICES entry. */
export const SERVICE_SLUGS: Record<string, string> = Object.fromEntries(
  Object.entries(SERVICE_DETAILS).map(([id, detail]) => [detail.slug, id]),
);

/* Home page "Outcomes we're proud of" deck — three real case studies,
 * copy transcribed from the Figma. Pills/titles are verbatim (including
 * "Fintech Saas Application" casing). Covers are the Work-page Figma
 * exports so a visitor sees the exact art from the design source. */
export const PROJECTS = [
  {
    pill: "FinTech Mobile App",
    title: "Merchant Cash Advance Calculator (MCA)",
    body: "MCA Professionals Often Rely On Multiple Tools To Calculate Deals, Manage Templates, And Review Previous Calculations. We Designed One Connected Experience To Bring These Tasks Together In A Faster, More Organized Workflow.",
    metric: "38+",
    metricLabel: "Screens Designed",
    image: "/img/case/work-cover-1-mca.png",
    href: "/case-study",
  },
  {
    pill: "Fintech Saas Application",
    title: "Lend SaaS Application",
    body: "A Centralized Platform That Brings Essential Financial Products, Protocols, Knowledge, And Powerful Calculation Tools Together In One Seamless Experience.",
    metric: "01",
    metricLabel: "Centralized Platform",
    image: "/img/case/work-cover-2-lend-saas.png",
    href: "/case-study/lend-hub",
  },
  {
    pill: "NFT Crypto Market",
    title: "Opulencex",
    body: "Swap Tokens, Farm Yield, Stake For APY, And Earn From NFTs — All Through One Connected DeFi Suite Built For The XRP Ledger.",
    metric: "04",
    metricLabel: "Core DeFi Opportunities",
    image: "/img/case/work-cover-3-opulencex.png",
    href: "/case-study/lend-saas",
  },
];

/**
 * The circular process diagram.
 *
 * Figma ships only the "Consultation" state (the component is interactive),
 * and the file contains a single illustration — the four raster assets in
 * that subtree are the same artwork at different scales. So every step shares
 * `step.png` until per-step artwork is supplied; swap `image` per entry then.
 * The headings and bodies for steps 2–4 follow the pattern of step 1.
 */
export const PROCESS_STEPS = [
  {
    label: "Consultation",
    heading: "We Understand Your Goals",
    body: "Understanding your needs, challenges, and vision for success.",
    image: "/img/process/step.png",
  },
  {
    label: "Strategy",
    heading: "We Map The Right Path",
    body: "Turning your goals into a clear, prioritised plan of action.",
    image: "/img/process/step.png",
  },
  {
    label: "Implementation",
    heading: "We Design And Build",
    body: "Shipping in focused iterations with quality checked at every step.",
    image: "/img/process/step.png",
  },
  {
    label: "Final Result",
    heading: "We Deliver Excellence",
    body: "A working product that performs, adapts, and keeps earning its place after launch.",
    image: "/img/process/step.png",
  },
];

export const CHART_BARS = [
  { value: 60, label: "Build", cap: "#eef3bc", solid: "#bdc61d", text: "#7b8513" },
  { value: 30, label: "Refine", cap: "#c7e8d9", solid: "#1e8c72", text: "#15705d" },
  { value: 10, label: "Launch", cap: "#9cd6bc", solid: "#012a1c", text: "#012a1c" },
];

export const WHY_STATS = [
  { value: "7+", lines: ["Years", "building"] },
  { value: "500+", lines: ["Projects", "shipped"] },
  { value: "90%+", lines: ["International", "Client"] },
];

export const TESTIMONIAL = {
  quote:
    "“DEV N SCALE felt less like an agency and more like the most senior people on our team — they shipped exactly what we needed, on time, and pushed back when it mattered.”",
  name: "Lukas Meyer",
  role: "VP Product, Ledgerly",
  image: "/img/testimonial-lukas.png",
};

export const FAQS = [
  {
    q: "What services do you offer?",
    a: "We provide end-to-end software development services, including custom web applications, mobile app development, UI/UX design, cloud solutions, AI-powered applications, system integrations, and ongoing maintenance and support.",
  },
  {
    q: "How long does it take to complete a software project?",
    a: "It depends on scope. A focused website or MVP typically ships in 4–8 weeks, while a larger platform runs 3–6 months. After the consultation we give you a phased timeline with clear milestones so you always know what lands when.",
  },
  {
    q: "Do you provide ongoing support after the project is completed?",
    a: "Yes. Every launch includes a support window, and we offer ongoing maintenance retainers covering monitoring, updates, bug fixes, and new feature work as your product grows.",
  },
  {
    q: "How do you ensure the quality and security of your software?",
    a: "Quality assurance is built into every sprint — code review, manual and automated testing, and performance budgets. On security we follow least-privilege access, encrypt data in transit and at rest, and run dependency and vulnerability scanning before every release.",
  },
];

export const CONTACT_DETAILS = [
  { icon: "mail", label: "EMAIL", value: "info@devnscale.com" },
  { icon: "phone", label: "PHONE", value: "+92 339 5636702" },
  {
    icon: "pin",
    label: "OFFICE",
    value:
      "Plot No 21, First Floor, Above Smile PhotoStudio, Phase 1 Pakistan Town, Islamabad, Pakistan",
  },
];

export const SERVICE_OPTIONS = [
  "Web Development",
  "Mobile App Development",
  "Design",
  "AI Chatbot Development",
  "Software Quality Assurance",
  "Pitch Deck",
  "Digital Marketing",
  "Crypto Dashboards",
];

/** The two crossing diagonal marquees between About and Services. */
export const MARQUEE_ITEMS = [
  { label: "Scale Fast", icon: "globe" },
  { label: "App Performance", icon: "smartphone" },
  { label: "Zero Bugs", icon: "shield" },
  { label: "Raise Capital", icon: "briefcase" },
  { label: "Perfect Design", icon: "check" },
  { label: "Smart Growth", icon: "trending" },
  { label: "Crypto Vision", icon: "plus" },
  { label: "Smart Chat", icon: "chat" },
];

/* Footer columns as they appear in the Figma. Careers, Blogs, Privacy
 * Policy, and Term & Condition don't have real pages yet — they route to
 * /careers, /blog, /privacy, /terms so a soft-404 lands somewhere the SEO
 * can crawl. Replace href when the actual pages ship. */
export const FOOTER_LINKS = {
  main: [
    { label: "Home", href: "/", active: true },
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Careers", href: "/careers" },
    { label: "Blogs", href: "/blog" },
  ],
  other: [
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Term & Condition", href: "/terms" },
  ],
  contact: ["+92 339 5636702", "info@devnscale.com"],
};

/* ============================================================
   About page — copy transcribed from the Figma "DEV N SCALE — About Us"
   frame. Placeholder headings in the source are replaced with brand copy
   in the same voice as the rest of the site.
   ============================================================ */

export const ABOUT_HERO = {
  eyebrow: "WHO WE ARE",
  // The lime span is highlighted in the headline.
  titleLead: "We Build Digital Products That Move Businesses",
  titleAccent: "Forward.",
  subtitle:
    "At Dev N Scale, we combine strategy, design, and technology to build digital products that solve real business problems. From idea to execution, we create scalable solutions designed to perform, adapt, and grow with your business.",
};

export const ABOUT_STATS = [
  { value: "10+", label: "Years of Design Experience" },
  { value: "90%+", label: "International Clients" },
  { value: "6+", label: "Industries Served" },
];

export const ABOUT_APPROACH = {
  eyebrow: "OUR APPROACH",
  // Rendered as one statement with `accent` highlighted in lime.
  lead: "We keep teams",
  accent: "small, senior, and close to the work.",
  tail: "It is how good software gets built, and how it keeps earning its place.",
};

export const ABOUT_JOURNEY = {
  eyebrow: "OUR JOURNEY",
  title: "From a Spark to a Full-Stack Powerhouse",
  intro:
    "What started as one developer's conviction that software should be built right, not just built fast, grew into a team, a system, and a company that delivers at scale.",
  milestones: [
    {
      year: "2021",
      title: "The Spark",
      body: "It started with a simple belief: businesses deserve software partners who think like founders. DevnScale was born out of that conviction. Lean, hungry, and ready to prove it.",
    },
    {
      year: "2022",
      title: "The First Bet",
      body: "A client took a chance on us. We didn't just deliver, we over-delivered. That first project became our blueprint: understand deeply, build precisely, exceed expectations.",
    },
    {
      year: "2023",
      title: "50+ Projects and Counting",
      body: "What began as one project turned into fifty. Across industries, across borders, each one built with the same standard: no shortcuts, no compromises, just work that speaks for itself.",
    },
    {
      year: "2025",
      title: "Built to Scale",
      body: "From a solo founder to a team of 25 engineers, designers, and strategists. Every hire was intentional, every role earned. What started small now operates at full capacity, and we're only accelerating.",
    },
  ],
};

export const ABOUT_STORY = {
  eyebrow: "OUR STORY",
  title: "Started small, on purpose.",
  // Set to a path under /public (e.g. "/img/about/story.jpg") to swap the
  // branded placeholder panel for a real photo.
  image: "",
  paragraphs: [
    "Dev N Scale began with a simple frustration. Good products kept getting buried under handoffs, status calls, and teams that never quite talked to each other.",
    "So we built the studio we wanted to hire. Senior people who design and ship in the same room, close to the customer, and accountable for the result.",
  ],
  name: "Alex Rehman",
  role: "Founder and Managing Director",
  badge: "Building since 2019",
};

export const ABOUT_VALUES = [
  {
    icon: "eye",
    title: "Clarity",
    body: "Plain answers, honest timelines, and work you can follow at every step.",
  },
  {
    icon: "pencil",
    title: "Craft",
    body: "We sweat the details that people feel, even the ones they never notice.",
  },
  {
    icon: "trending",
    title: "Momentum",
    body: "Small releases, shipped often, so progress stays visible the whole way.",
  },
  {
    icon: "users",
    title: "Partnership",
    body: "We work as part of your team, not a vendor you have to manage.",
  },
] as const;

// `photo`: set to a path under /public (e.g. "/img/team/elias-brandt.jpg") to
// swap the branded monogram tile for a real portrait. `linkedin`: profile URL.
type TeamMember = {
  name: string;
  role: string;
  initials: string;
  photo?: string;
  linkedin?: string;
};

export const ABOUT_TEAM: {
  eyebrow: string;
  title: string;
  subtitle: string;
  members: TeamMember[];
  hiring: { title: string; body: string };
} = {
  eyebrow: "OUR TEAM",
  title: "The people behind the work.",
  subtitle:
    "A small, senior team — the people you meet are the people who build.",
  members: [
    { name: "Elias Brandt", role: "Founder & Principal Eng.", initials: "EB", photo: "/img/team/elias-brandt.png", linkedin: "#" },
    { name: "Omar Haddad", role: "Head of Engineering", initials: "OH", photo: "/img/team/omar-haddad.png", linkedin: "#" },
    { name: "Daniyal Khan", role: "Lead Product Designer", initials: "DK", photo: "/img/team/daniyal-khan.png", linkedin: "#" },
    { name: "Yusuf Raza", role: "Mobile Lead", initials: "YR", photo: "/img/team/yusuf-raza.png", linkedin: "#" },
    { name: "Marco Adler", role: "QA & Automation Lead", initials: "MA", photo: "/img/team/marco-adler.png", linkedin: "#" },
    { name: "Jonas Vogel", role: "AI & Backend Engineer", initials: "JV", photo: "/img/team/jonas-vogel.png", linkedin: "#" },
  ],
  hiring: {
    title: "We're hiring.",
    body: "Join a small, senior team building products people actually use. We're always open to great engineers and designers.",
  },
};

/* ============================================================
   Services page — copy from Figma "DEV N SCALE — Our Services"
   (4697:10764). Hero placeholder replaced with brand copy.
   ============================================================ */

export const SERVICES_HERO = {
  eyebrow: "OUR SERVICES",
  titleLead: "Everything You Need To Build, Launch, And",
  titleAccent: "Scale.",
  subtitle:
    "From product development and UI/UX design to custom software and digital solutions, we bring the right expertise together to turn ideas into reliable, high-performing products built for long-term growth.",
};

export const SERVICES_INTRO = {
  eyebrow: "WHAT WE DO",
  title: "Services built to scale your business.",
  body: "One team for the whole journey. Pick a single service, or let us run the entire product from first sketch to launch.",
};

/** The interactive service showcase list. Bodies + tags per service. */
// Seven services — copy transcribed verbatim from the Figma Services
// showcase component (5304:66287). Figma's numbered dial ends at 07 with
// Digital Marketing; no Crypto card here. (The homepage's separate
// SERVICES card grid is the place that carries the 8th Crypto entry.)
export const SERVICE_SHOWCASE = [
  {
    id: "web",
    title: "Web Development",
    body: "High-performance websites and web apps on modern stacks. Fast, accessible, and ready to scale from a first MVP to enterprise traffic.",
    icon: "code",
    tags: ["Design systems", "Frontend + backend", "SEO ready"],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    body: "Native and cross-platform apps for iOS and Android that people actually keep on their home screen.",
    icon: "smartphone",
    tags: ["iOS + Android", "Offline first", "Store ready"],
  },
  {
    id: "design",
    title: "UI/UX Design",
    body: "Research-led product and brand design. Interfaces that are clear, on brand, and a pleasure to use.",
    icon: "layout",
    tags: ["User research", "Design systems", "Prototyping"],
  },
  {
    id: "ai",
    title: "AI Chatbot Development",
    body: "Custom AI assistants trained on your content to handle support, sales, and internal ops around the clock.",
    icon: "chat",
    tags: ["Trained on your data", "Multi channel", "Human handoff"],
  },
  {
    id: "qa",
    title: "Software Quality Assurance",
    body: "Manual and automated testing that catches issues before your users do, on every release.",
    icon: "shield",
    tags: ["Automated tests", "Manual QA", "CI pipelines"],
  },
  {
    id: "pitch",
    title: "Pitch Deck Presentations",
    body: "Investor and sales ready decks with a sharp narrative and the design that gets you the meeting.",
    icon: "presentation",
    tags: ["Story and script", "Custom visuals", "Data rooms"],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    body: "SEO, paid, and content that turns your launch into a real pipeline. Measured, not guessed.",
    icon: "trending",
    tags: ["SEO + content", "Paid media", "Analytics"],
  },
] as const;

/* ============================================================
   Contact page — copy from Figma "DEV N SCALE — Contact Us" (4758:1685)
   ============================================================ */

export const CONTACT_HERO = {
  eyebrow: "CONTACT US",
  titleLead: "Have An Idea? Let's Build Something That",
  titleAccent: "Matters.",
  subtitle:
    "Whether you're starting something new, improving an existing product, or planning your next stage of growth, we're ready to help. Tell us what you're working on, and let's explore how we can build it together.",
};

export const CONTACT_BOOKING = {
  title: "Book your Appointment",
  body: "Book your appointment with Dev N Scale today and get software built by senior people who care. We turn early ideas into products your customers rely on.",
  note: "We reply within one business day.",
  formTitle: "We're just a message away",
  services: [
    "UI/UX Design",
    "Web Development",
    "Mobile Development",
    "AI Chatbot",
    "QA & Testing",
    "Pitch Decks",
    "Digital Marketing",
  ],
};

export const CONTACT_REACH = {
  eyebrow: "REACH OUT TO US",
  title: "Reach out to us",
  subtitle: "You can reach us by email, by phone, or with a visit to the studio.",
  cards: [
    { icon: "mail", label: "Email", value: "info@devnscale.com" },
    { icon: "phone", label: "Phone", value: "+92 339 5636702" },
    {
      icon: "pin",
      label: "Office",
      value:
        "Plot No 21, First Floor, Above Smile PhotoStudio, Phase 1 Pakistan Town, Islamabad, Pakistan",
    },
  ],
} as const;

/* ============================================================
   Case Study page — copy from Figma "DEV N SCALE — Case Study" (4850:15665)
   Images are empty frames in Figma → branded placeholders in the build.
   ============================================================ */

// A single case study's shape. `CASE_STUDIES` below is a map from slug
// to one of these; individual routes at `/case-study` (MCA, default) and
// `/case-study/lend-saas` render the same components with different data.
export type CaseStudy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  meta: readonly { value: string; label: string }[];
  /** Full-bleed hero background exported from Figma (replaces the default
   *  site grid+glow behind the PageHero title). */
  heroBackground: string;
  heroImage: string;
  overview: {
    eyebrow: string;
    title: string;
    body: string;
    stats: readonly { value: string; label: string }[];
  };
  problem: {
    eyebrow: string;
    title: string;
    body: string;
    image: string;
  };
  designSystem: {
    eyebrow: string;
    title: string;
    body: string;
    image: string;
  };
  results: {
    eyebrow: string;
    title: string;
    body: string;
    image: string;
    stats: readonly { value: string; label: string }[];
  };
  experience: {
    eyebrow: string;
    title: string;
    body: string;
    mock1: string;
    mock2: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    image: string;
  };
  selectedWork: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cases: readonly {
      name: string;
      url: string;
      year: string;
      badge: string;
      tags: readonly string[];
      cover: string;
      href: string;
    }[];
  };
};

/* MCA Calculator — copy transcribed verbatim from Figma frame 4850:15665
 * (title case is authored in Figma, not our style choice — preserved). */
const CASE_STUDY_MCA: CaseStudy = {
  eyebrow: "CASE STUDY · MCA Calculator",
  title: "Simplifying MCA Calculations Into One Powerful Workflow.",
  subtitle:
    "A Smarter Way To Calculate, Manage, And Structure Merchant Cash Advances.",
  meta: [
    { value: "2024", label: "YEAR" },
    { value: "UX/UI, Development", label: "SERVICES" },
    { value: "FinTech · Alternative Finance", label: "INDUSTRY" },
    { value: "iOS · Android", label: "PLATFORM" },
  ],
  heroBackground: "/img/case/mca/hero-bg.png",
  heroImage: "/img/case/mca/hero.png",
  overview: {
    eyebrow: "THE CHALLENGE",
    title: "From Scattered Tools To One Clear View.",
    body: "MCA Professionals Often Rely On Multiple Tools To Calculate Deals, Manage Templates, And Review Previous Calculations. We Designed One Connected Experience To Bring These Tasks Together In A Faster, More Organized Workflow.",
    stats: [
      { value: "38+", label: "Screens Designed" },
      { value: "120+", label: "Product Components" },
      { value: "100%", label: "Mobile-First Experience" },
    ],
  },
  problem: {
    eyebrow: "THE PROBLEM",
    title: "A System That Could Grow With The Workflow.",
    body: "The Challenge Was To Simplify Complex MCA Calculations Without Removing The Flexibility Professionals Need. The Experience Had To Support Different Deal Structures, Reusable Templates, Calculations, And Proposals While Staying Easy To Navigate.",
    image: "/img/case/mca/problem.png",
  },
  designSystem: {
    eyebrow: "DESIGNED FOR REAL WORK",
    title: "Built For The Field, Not The Boardroom.",
    body: "Every Interaction Was Designed Around The Way MCA Professionals Actually Work—From Entering Deal Information And Running Calculations To Reviewing Results And Preparing Proposals.",
    image: "/img/case/mca/system.png",
  },
  results: {
    eyebrow: "THE RESULT",
    title: "Faster Deals, Fewer Repeated Steps.",
    body: "By Bringing Calculations, Templates, History, And Proposals Into One Product, The Experience Reduces Unnecessary Switching And Makes Repetitive Tasks Easier To Manage.",
    image: "/img/case/mca/results.png",
    stats: [
      { value: "31%", label: "Fewer Workflow Steps" },
      { value: "2.4x", label: "Faster Repeat Calculations" },
    ],
  },
  experience: {
    eyebrow: "THE EXPERIENCE",
    title: "Every Screen, Working Together.",
    body: "From Onboarding And User Profiles To Calculations, Templates, History, And Proposals, Every Screen Was Designed As Part Of One Connected Experience With Consistent Navigation And Components.",
    mock1: "/img/case/mca/mock-1.png",
    mock2: "/img/case/mca/mock-2.png",
  },
  gallery: {
    eyebrow: "THE FULL PICTURE",
    /* Figma authors this heading in sentence case, unlike the rest of the
     * MCA page — preserve verbatim. */
    title: "Every screen, working together.",
    image: "/img/case/mca/gallery.png",
  },
  selectedWork: {
    eyebrow: "SELECTED WORK",
    title: "Case studies we're proud of.",
    subtitle:
      "A look at products we designed, built, and shipped with teams who trusted us to get it right.",
    cases: [
      {
        name: "Halo Health",
        url: "halohealth.app.com",
        year: "2025",
        badge: "Mobile App",
        tags: ["iOS", "Android", "UI/UX"],
        cover: "/img/case/cover-halo.png",
        href: "/case-study/lend-saas",
      },
      {
        name: "Ledgerly",
        url: "ledgerly.io.com",
        year: "2025",
        badge: "Web Platform",
        tags: ["Web App", "Design", "QA"],
        cover: "/img/case/cover-ledgerly.png",
        href: "/case-study/lend-hub",
      },
    ],
  },
};

/* Lend SaaS / OpulenceX — the DeFi XRPL case study (Figma 5478:49371). */
const CASE_STUDY_SAAS: CaseStudy = {
  eyebrow: "CASE STUDY · OPULENCEX",
  title: "Every DeFi Opportunity, In One Complete Ecosystem.",
  subtitle:
    "Swap tokens, farm yield, stake for APY, and earn from NFTs — all through one connected DeFi suite built for the XRP Ledger.",
  meta: [
    { value: "2024", label: "YEAR" },
    { value: "UX/UI, Product Design", label: "SERVICES" },
    { value: "FinTech", label: "INDUSTRY" },
    { value: "Web", label: "PLATFORM" },
  ],
  heroBackground: "/img/case/saas/hero-bg.png",
  heroImage: "/img/case/saas/hero.png",
  overview: {
    eyebrow: "THE CHALLENGE",
    title: "Bringing every DeFi opportunity together.",
    body: "DeFi users often have to move between different platforms to swap tokens, earn yield, stake assets, or explore NFT opportunities. OpulenceX was designed to bring these experiences together in one complete ecosystem.",
    stats: [
      { value: "04", label: "Core DeFi Opportunities" },
      { value: "01", label: "Unified Ecosystem" },
      { value: "XRPL", label: "Powered DeFi Experience" },
    ],
  },
  problem: {
    eyebrow: "THE PROBLEM",
    title: "Making DeFi feel less fragmented.",
    body: "With different DeFi activities spread across multiple experiences, users can struggle to navigate the opportunities available to them. The challenge was to create a clear, accessible platform that makes different ways to participate in DeFi easy to discover and understand.",
    image: "/img/case/saas/problem.png",
  },
  designSystem: {
    eyebrow: "DESIGNED FOR REAL WORK",
    title: "Built for the way DeFi users invest and earn.",
    body: "OpulenceX gives users direct access to multiple DeFi opportunities from one platform. Whether they want to swap tokens, farm yield, stake for APY, or earn from NFTs, each experience is designed to fit into one connected workflow.",
    image: "/img/case/saas/system.png",
  },
  results: {
    eyebrow: "THE RESULT",
    title: "More opportunities. One connected experience.",
    body: "By bringing core DeFi opportunities into one ecosystem, OpulenceX makes it easier for users to discover, access, and manage different ways to put their digital assets to work.",
    image: "/img/case/saas/results.png",
    stats: [
      { value: "04", label: "Core DeFi Opportunities" },
      { value: "01", label: "Unified Ecosystem" },
      { value: "XRPL", label: "Powered DeFi Experience" },
    ],
  },
  experience: {
    eyebrow: "THE EXPERIENCE",
    title: "Everything DeFi, within reach.",
    body: "From token swaps and yield farming to staking and NFT earnings, OpulenceX creates a consistent experience across different DeFi activities, helping users move between opportunities with greater clarity and confidence.",
    mock1: "/img/case/saas/mock-1.png",
    mock2: "/img/case/saas/mock-2.png",
  },
  gallery: {
    eyebrow: "THE FULL PICTURE",
    title: "The complete DeFi suite for XRPL.",
    image: "/img/case/saas/gallery.png",
  },
  selectedWork: {
    eyebrow: "SELECTED WORK",
    title: "Case studies we're proud of.",
    subtitle:
      "A look at products we designed, built, and shipped with teams who trusted us to get it right.",
    cases: [
      {
        name: "Halo Health",
        url: "halohealth.app.com",
        year: "2025",
        badge: "Mobile App",
        tags: ["iOS", "Android", "UI/UX"],
        cover: "/img/case/cover-halo.png",
        href: "/case-study",
      },
      {
        name: "Ledgerly",
        url: "ledgerly.io.com",
        year: "2025",
        badge: "Web Platform",
        tags: ["Web App", "Design", "QA"],
        cover: "/img/case/cover-ledgerly.png",
        href: "/case-study/lend-hub",
      },
    ],
  },
};

/* Third case: the "central hub" Lend SaaS, node 5399:40158. Copy is verbatim
 * from Figma. Same shape/components as MCA and OpulenceX. */
const CASE_STUDY_LEND_HUB: CaseStudy = {
  eyebrow: "CASE STUDY · Lend SaaS",
  title: "One Central Hub For Everything Lend SaaS.",
  subtitle:
    "A Centralized Platform That Brings Essential Financial Products, Protocols, Knowledge, And Powerful Calculation Tools Together In One Seamless Experience.",
  meta: [
    { value: "2024", label: "YEAR" },
    { value: "UX/UI, Product Design", label: "SERVICES" },
    { value: "FinTech", label: "INDUSTRY" },
    { value: "Web", label: "PLATFORM" },
  ],
  heroBackground: "/img/case/lend-hub/hero-bg.png",
  heroImage: "/img/case/lend-hub/hero.png",
  overview: {
    eyebrow: "THE CHALLENGE",
    title: "Bringing Everything Lending Into One Place.",
    body: "Lend SaaS Needed To Serve As The Central Hub For Everything The Team Relies On—From Company Products And Protocols To Knowledge And Financial Tools. The Goal Was To Create One Accessible Platform That Could Bring These Resources Together Without Adding Complexity.",
    stats: [
      { value: "01", label: "Centralized Platform" },
      { value: "04+", label: "Core Resource Categories" },
      { value: "01", label: "Integrated Financial Calculator" },
    ],
  },
  problem: {
    eyebrow: "THE PROBLEM",
    title: "Making Complex Financial Workflows Easier To Navigate.",
    body: "Financial Teams Work With Multiple Resources While Handling Calculations, Financial Projections, Loan Analysis, And Underwriting Decisions. Lend SaaS Needed To Make These Resources Easier To Access While Creating A More Seamless Way To Move Between Information And Tools.",
    image: "/img/case/lend-hub/problem.png",
  },
  designSystem: {
    eyebrow: "DESIGNED FOR REAL WORK",
    title: "Built Around The Way Financial Teams Work.",
    body: "Lend SaaS Was Designed To Put The Right Products, Protocols, Knowledge, And Financial Tools Within Easy Reach. The Experience Helps Teams Spend Less Time Looking For Information And More Time Focusing On Analysis, Calculations, And Decision-Making.",
    image: "/img/case/lend-hub/system.png",
  },
  results: {
    eyebrow: "THE RESULT",
    title: "Greater Accuracy. Better Decisions.",
    body: "Lend SaaS Brings Powerful Financial Capabilities Into One Connected Experience, Helping Streamline Complex Calculations, Improve Efficiency, And Support Smarter Underwriting And Financial Decision-Making.",
    image: "/img/case/lend-hub/results.png",
    stats: [
      { value: "01", label: "Centralized Platform" },
      { value: "04+", label: "Core Resource Areas" },
      { value: "100%", label: "Connected Experience" },
    ],
  },
  experience: {
    eyebrow: "THE EXPERIENCE",
    title: "Powerful Tools, Seamlessly Connected.",
    body: "From Financial Products And Protocols To Knowledge And Advanced Calculation Tools, Every Part Of Lend SaaS Works Together To Create A Clear And Efficient Experience. Users Can Access What They Need Through A Single, Consistent Platform.",
    mock1: "/img/case/lend-hub/mock-1.png",
    mock2: "/img/case/lend-hub/mock-2.png",
  },
  gallery: {
    eyebrow: "THE FULL PICTURE",
    title: "Built Today. Ready For What's Next.",
    image: "/img/case/lend-hub/gallery.png",
  },
  selectedWork: {
    eyebrow: "SELECTED WORK",
    title: "Case studies we're proud of.",
    subtitle:
      "A look at products we designed, built, and shipped with teams who trusted us to get it right.",
    cases: [
      {
        name: "Halo Health",
        url: "halohealth.app.com",
        year: "2025",
        badge: "Mobile App",
        tags: ["iOS", "Android", "UI/UX"],
        cover: "/img/case/cover-halo.png",
        href: "/case-study",
      },
      {
        name: "Ledgerly",
        url: "ledgerly.io.com",
        year: "2025",
        badge: "Web Platform",
        tags: ["Web App", "Design", "QA"],
        cover: "/img/case/cover-ledgerly.png",
        href: "/case-study/lend-saas",
      },
    ],
  },
};

/** Slug → CaseStudy map. `/case-study` (default) uses `mca`; slug routes
 *  under `/case-study/[slug]` resolve here. */
export const CASE_STUDIES: Record<string, CaseStudy> = {
  mca: CASE_STUDY_MCA,
  "lend-saas": CASE_STUDY_SAAS,
  "lend-hub": CASE_STUDY_LEND_HUB,
};

/** Kept for backward compat — the default MCA case rendered at `/case-study`. */
export const CASE_STUDY: CaseStudy = CASE_STUDY_MCA;

/* ============================================================
   Work page — copy from Figma "DEV N SCALE — Work" (4833:17865)
   ============================================================ */

export const WORK_HERO = {
  eyebrow: "SELECTED WORK",
  titleLead: "We Turn Complex Ideas Into Products That",
  titleAccent: "Work.",
  subtitle:
    "Explore the digital products and solutions we've designed and built for businesses looking to improve their operations, strengthen their digital presence, and scale with confidence.",
};

// 6 case cards. Cover images exported straight from the Figma Work grid
// (node 4835:15593) — Aster Studio and Fieldnote intentionally share one
// render there, everything else has its own unique cover.
export const WORK = {
  eyebrow: "SELECTED WORK",
  title: "Case studies we're proud of.",
  subtitle:
    "A look at products we designed, built, and shipped with teams who trusted us to get it right.",
  /* Six cards, mirroring the Figma Work-page grid (frame 4833:17865). Covers
   * are exported from Figma with the category pill + lime arrow baked into
   * the image, so WorkGrid renders the cover as-is. Only three case-study
   * pages exist today; the other three cards route to the closest match so
   * users never land on a wrong page. */
  cases: [
    {
      name: "Merchant Cash Advance Calculator (MCA)",
      url: "halohealth.app.com",
      year: "2024",
      badge: "Mobile App",
      tags: ["iOS", "Android", "UI/UX"],
      cover: "/img/case/work-cover-1-mca.png",
      href: "/case-study",
    },
    {
      name: "Lend SaaS Application",
      url: "ledgerly.io.com",
      year: "2024",
      badge: "Web App",
      tags: ["Web App", "Design", "QA"],
      cover: "/img/case/work-cover-2-lend-saas.png",
      href: "/case-study/lend-hub",
    },
    {
      name: "OpulenceX — DeFi Suite",
      url: "opulencex.xyz",
      year: "2024",
      badge: "Brand + Site",
      tags: ["Web App", "DeFi", "XRPL"],
      cover: "/img/case/work-cover-3-opulencex.png",
      href: "/case-study/lend-saas",
    },
    {
      name: "Aster Studio",
      url: "asterstudio.com",
      year: "2024",
      badge: "SaaS",
      tags: ["UI/UX", "Web App", "Motion"],
      cover: "/img/case/work-cover-4-aster.png",
      href: "/case-study/lend-saas",
    },
    {
      name: "Fieldnote",
      url: "fieldnote.app",
      year: "2023",
      badge: "Logistics",
      tags: ["Mobile", "Web", "API"],
      cover: "/img/case/work-cover-5-fieldnote.png",
      href: "/case-study",
    },
    {
      name: "AI Marketplace",
      url: "vantagelabs.ai",
      year: "2023",
      badge: "AI Platform",
      tags: ["AI", "Web", "Marketplace"],
      cover: "/img/case/work-cover-6-marketplace.png",
      href: "/case-study/lend-hub",
    },
  ],
} as const;
