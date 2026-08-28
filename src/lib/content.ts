/** All copy transcribed from the Figma home page. */

// Hrefs are page-relative (`/#…`) so they resolve from any route, not just
// the home page — About Us is now its own page.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Our Team", href: "/about#team" },
  { label: "Contact Us", href: "/contact" },
];

export const HERO_STATS =
  "500+ Projects Shipped  ·  7+ Years of Building  ·  90%+ International Clients";

export const SERVICES = [
  {
    id: "web",
    title: "Full Stack Development",
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
    title: "UI/UX Design",
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
    title: "Pitch Deck Presentations",
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
    id: "staff",
    title: "Staff Augmentation",
    body: "Senior developers, designers, QA engineers, and project managers placed directly into your workflow so you can scale without the overhead of traditional hiring.",
    icon: "briefcase",
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
  /** Optional visual paired with the row. Falls back to the lime
   *  gradient placeholder in ServiceDetail when unset. */
  image?: string;
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
    slug: "full-stack-development",
    index: "01",
    hero: {
      title: "Full Stack Development",
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
          image: "/img/services/web/frontend.png",
        },
        {
          title: "Backend Development",
          body: "Node.js, Django, Laravel — robust API services, databases, and scalable architecture built to handle growth.",
          image: "/img/services/web/backend.png",
        },
        {
          title: "Full Stack and SaaS Development",
          body: "Complete SaaS development covering dashboards, portals, and ecommerce solutions built with scalable architecture from concept to launch.",
          image: "/img/services/web/saas.png",
        },
        {
          title: "WordPress Development",
          body: "Custom WordPress development covering themes, plugins, WooCommerce and CMS configuration for enterprise-grade results.",
          image: "/img/services/web/wordpress.png",
        },
        {
          title: "Framer Website Design",
          body: "Fast interactive marketing sites built with Framer featuring advanced animations, CMS, and no-code flexibility.",
          image: "/img/services/web/framer.svg",
        },
        {
          title: "Security, Performance and Optimisation",
          body: "SSL, CDN setup, security hardening, Core Web Vitals optimisation, and regular maintenance to keep your site fast and safe.",
          image: "/img/services/web/security.png",
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
      title: "Full Stack Development — Dev N Scale",
      description:
        "Frontend, backend, full-stack SaaS, WordPress, and Framer development. Fast, scalable, and Figma-to-code handoff on every project.",
    },
  },

  mobile: {
    slug: "mobile-app-development",
    index: "02",
    hero: {
      title: "Mobile app development",
      body: "We specialise in end-to-end mobile app development, building iOS, Android, and cross-platform apps that users actually love. From startup MVPs to enterprise scale — smooth, fast and intuitive.",
    },
    stats: [
      { value: "iOS and Android", label: "iOS and Android Covered" },
      { value: "Cross-Platform", label: "Cross-Platform Capable" },
      { value: "Delivery", label: "End-to-End Delivery" },
      { value: "Performance", label: "Built for Performance" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Apps That Stand Out",
      body: "Everything from UI/UX to deployment is handled under one roof.",
      rows: [
        {
          title: "iOS Development",
          body: "Native Swift development for seamless iPhone and iPad experiences with full Apple ecosystem integration.",
          image: "/img/services/mobile/row-0.jpg",
        },
        {
          title: "Android Development",
          body: "Kotlin-based Android apps optimised for the full range of Android devices and screen sizes.",
          image: "/img/services/mobile/row-1.jpg",
        },
        {
          title: "Cross-Platform Apps — React Native and Flutter",
          body: "Cross-platform apps that share code efficiently while delivering native level performance on both iOS and Android.",
          image: "/img/services/mobile/row-2.jpg",
        },
        {
          title: "API and Backend Integration",
          body: "RESTful and GraphQL API development, third-party integrations, push notifications, and cloud backends.",
          image: "/img/services/mobile/row-3.jpg",
        },
        {
          title: "In App Purchases and Subscriptions",
          body: "Monetisation setup covering subscriptions, one-time purchases, freemium models, and payment gateway integration.",
          image: "/img/services/mobile/row-4.jpg",
        },
        {
          title: "App Store Launch and ASO",
          body: "Complete App Store and Play Store submission, optimisation, and post-launch support.",
          image: "/img/services/mobile/row-5.jpg",
        },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "From Wireframe to App Store",
      body: "A proven approach to shipping quality mobile apps.",
      steps: [
        { title: "Discovery", body: "User personas, feature list, technical stack decisions, and timeline scoping." },
        { title: "UX/UI Design and Prototyping", body: "Wireframes, user flows, and high-fidelity screens before writing a single line of code." },
        { title: "Development", body: "Agile sprints, code reviews, and daily communication with your team." },
        { title: "QA and Testing", body: "Device lab testing, performance profiling, and user acceptance testing." },
        { title: "Submission", body: "App Store and Play Store submission, compliance checks, and launch preparation" },
        { title: "Growth", body: "Analytics setup, crash monitoring, user feedback loops, and iterative updates." },
      ],
    },
    meta: {
      title: "Mobile app development — Dev N Scale",
      description: "Native iOS, Android, and cross-platform apps built for performance and shipped to the Store with monitoring and release ops in place.",
    },
  },

  design: {
    slug: "design",
    index: "03",
    hero: {
      title: "Ui/ux design",
      body: "As a dedicated design agency, we turn complex ideas into elegant, intuitive experiences. Our team delivers full UI/UX and graphic design services — bridging creativity and strategy to produce visuals that don't just look great but drive real results.",
    },
    stats: [
      { value: "10+ Years", label: "10+ Years of Design Experience" },
      { value: "90%+", label: "90%+ International Clients" },
      { value: "6+ Industries", label: "6+ Industries Served" },
      { value: "Craft First", label: "Founded on Craft and Strategy" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Everything Design — Under One Roof",
      body: "Whether it's a full product or a brand identity, we handle every pixel.",
      rows: [
        {
          title: "UI Design",
          body: "Clean, conversion-focused interfaces designed in Figma with atomic design systems and developer-ready handoffs — built for SaaS UI UX, dashboard UX, and mobile UI.",
          image: "/img/services/design/row-0.png",
        },
        {
          title: "UX Research and Strategy",
          body: "In-depth UX research — user interviews, journey mapping, wireframes, and usability testing to validate every design decision before a pixel is placed.",
          image: "/img/services/design/row-1.jpg",
        },
        {
          title: "Graphic Design",
          body: "Logos, brand guidelines, marketing collateral, social media visuals, and everything in between — graphic design services for every touchpoint.",
          image: "/img/services/design/row-2.png",
        },
        {
          title: "Brand Identity",
          body: "Full brand development — from naming to visual language — that positions you as a premium player in your market.",
          image: "/img/services/design/row-3.png",
        },
        {
          title: "Design Systems",
          body: "Scalable design systems with component libraries and design tokens that keep your product consistent as it grows.",
          image: "/img/services/design/row-4.jpg",
        },
        {
          title: "Interaction Design and Prototyping",
          body: "Interaction design and interactive prototypes for stakeholder buy-in, investor demos, and user testing — before a single line of code.",
          image: "/img/services/design/row-5.png",
        },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "How We Bring Your Vision to Life",
      body: "A structured creative process that's transparent and collaborative at every step.",
      steps: [
        { title: "Discovery", body: "Deep-dive into your goals, users, competitors, and market positioning." },
        { title: "Strategy", body: "Define the design direction, tone, and visual language that fits your brand." },
        { title: "Wireframes", body: "Low-fidelity wireframes to validate structure and flow before visual design begins." },
        { title: "Visual Design", body: "High-fidelity screens with full brand integration, visual design, and motion concepts." },
        { title: "Prototype and Usability Testing", body: "Interactive prototypes tested with real users through usability testing for continuous feedback loops." },
        { title: "Handoff", body: "Developer-ready files, assets, and design system documentation." },
      ],
    },
    meta: {
      title: "Ui/ux design — Dev N Scale",
      description: "Product, brand, and marketing design — from research to Figma handoff, built to ship, not just to present.",
    },
  },

  ai: {
    slug: "ai-chatbot-development",
    index: "04",
    hero: {
      title: "Ai chatbot development",
      body: "Always on and always smart. We deliver end-to-end AI chatbot development — building intelligent conversational interfaces and AI support bots that automate support, qualify leads, and create seamless user experiences at scale.",
    },
    stats: [
      { value: "GPT Powered", label: "GPT Powered Development" },
      { value: "Multi-Platform", label: "Multi-Platform Deployment" },
      { value: "CRM Ready", label: "CRM and Helpdesk Integration" },
      { value: "Real Use", label: "Built and Tested for Real Use" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Intelligent Bots — Real Business Results",
      body: "Every chatbot we build is trained on your data, tested on real scenarios, and tuned for your use case.",
      rows: [
        {
          title: "AI Support Bots",
          body: "Bots that handle FAQs, tickets, order tracking, and escalation — reducing support load with expert conversational design.",
          image: "/img/services/ai/row-0.png",
        },
        {
          title: "Lead Generation Bots",
          body: "Qualify, capture, and route leads around the clock — synced with your CRM and sales pipeline automatically.",
          image: "/img/services/ai/row-1.png",
        },
        {
          title: "Internal HR and Operations Bots",
          body: "Employee onboarding, IT helpdesk, policy Q&A, and internal knowledge base chatbots.",
          image: "/img/services/ai/row-2.png",
        },
        {
          title: "E-commerce Assistants",
          body: "Product recommendation engines, cart recovery bots, and post-purchase support integrated directly into your store.",
          image: "/img/services/ai/row-3.png",
        },
        {
          title: "Multi-Platform Deployment",
          body: "Deploy on your website, WhatsApp, Telegram, Slack, and any platform your customers use.",
          image: "/img/services/ai/row-4.png",
        },
        {
          title: "Analytics and Optimisation",
          body: "Conversation analytics, fallback rate monitoring, and continuous fine-tuning to keep bots sharp and relevant.",
          image: "/img/services/ai/row-5.png",
        },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "From Prompt to Production",
      body: "A rigorous development process built for bots that work in the real world.",
      steps: [
        { title: "Use Case Mapping", body: "Define conversational flows, edge cases, and success metrics." },
        { title: "Knowledge Base", body: "Structure your FAQs, documents, and business logic into a clean, trainable knowledge source." },
        { title: "Bot Training", body: "Fine-tune on your data — tone, industry terms, escalation rules, and brand voice for a natural interface." },
        { title: "Integration", body: "Connect to your CRM, helpdesk, e-commerce, or internal tools via API." },
        { title: "QA and Testing", body: "Conversation testing across hundreds of scenarios, validating flows, happy paths, and edge cases." },
        { title: "Deploy and Monitor", body: "Live deployment with real-time dashboards and monthly performance reviews." },
      ],
    },
    meta: {
      title: "Ai chatbot development — Dev N Scale",
      description: "Chat, voice, and agentic AI systems on Claude / OpenAI — grounded on your data, guardrailed, and observable in production.",
    },
  },

  qa: {
    slug: "software-quality-assurance",
    index: "05",
    hero: {
      title: "Software quality assurance",
      body: "Ship with confidence. Our QA testing services cover everything from manual testing and automation testing to performance testing and mobile QA. Our engineers find the bugs before your users do.",
    },
    stats: [
      { value: "Functional QA", label: "Functional and Regression Testing" },
      { value: "Manual + Auto", label: "Manual and Automation Coverage" },
      { value: "Cross Device", label: "Cross Device and Cross Browser" },
      { value: "Bug Tracking", label: "Detailed Bug Tracking Reports" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Comprehensive Quality — Every Layer",
      body: "From functional to security — our QA covers everything.",
      rows: [
        {
          title: "Manual Testing",
          body: "Exploratory, regression, smoke, and acceptance testing by experienced QA engineers who think like your users.",
          image: "/img/services/qa/row-0.png",
        },
        {
          title: "Automation Testing",
          body: "Selenium, Cypress, Playwright — automation suites that catch regressions with every code push.",
          image: "/img/services/qa/row-1.png",
        },
        {
          title: "Mobile QA",
          body: "Real device testing across iOS and Android versions, screen sizes, and OS combinations.",
          image: "/img/services/qa/row-2.png",
        },
        {
          title: "Performance Testing",
          body: "Load testing, stress testing, and bottleneck analysis to ensure your app holds up under real traffic.",
          image: "/img/services/qa/row-3.png",
        },
        {
          title: "Security Testing",
          body: "OWASP based vulnerability assessments, penetration testing, and security audit reports.",
          image: "/img/services/qa/row-4.jpg",
        },
        {
          title: "QA Documentation and Bug Tracking",
          body: "Detailed test plans, bug tracking reports, test cases, and traceability matrices delivered with every engagement.",
          image: "/img/services/qa/row-5.png",
        },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "Systematic Testing — Zero Surprises",
      body: "A structured QA process integrated into your development workflow.",
      steps: [
        { title: "Requirement Analysis", body: "Review specs, define test scope, and create a comprehensive QA strategy." },
        { title: "Test Planning", body: "Test cases, test data, environment setup, and tool configuration." },
        { title: "Test Execution", body: "Manual and automation testing across all browsers, devices, and scenarios." },
        { title: "Bug Tracking and Reporting", body: "Detailed reports with reproduction steps, screenshots, and severity ratings." },
        { title: "Regression", body: "Retesting after fixes and a full regression suite to ensure nothing broke during fixes." },
        { title: "Sign Off", body: "Final QA report with test coverage metrics and issue clearance confirmation." },
      ],
    },
    meta: {
      title: "Software quality assurance — Dev N Scale",
      description: "Manual + automated QA, performance budgets, and WCAG accessibility auditing wired into your CI pipeline.",
    },
  },

  pitch: {
    slug: "pitch-deck",
    index: "06",
    hero: {
      title: "Pitch deck presentation",
      body: "Your idea deserves a pitch deck that gets funded. We craft startup pitch decks and fundraising decks that work as professional investor presentations, balancing narrative, data, and design to open doors and close deals.",
    },
    stats: [
      { value: "Story Led", label: "Story Led Always" },
      { value: "Investor Ready", label: "Investor Ready Decks" },
      { value: "Design Led", label: "Design Made Visual" },
      { value: "Figma + PPT", label: "Delivered in Figma and PowerPoint" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Decks That Investors Remember",
      body: "Strategy meets design — every slide earns its place.",
      rows: [
        {
          title: "Story and Narrative",
          body: "We help you find the through line — the storytelling that makes investors lean in and feel the problem before they see the solution.",
          image: "/img/services/pitch/row-0.png",
        },
        {
          title: "Data Visualisation",
          body: "Complex market data, financials, and metrics turned into clear, compelling slides that tell the full picture at a glance.",
          image: "/img/services/pitch/row-1.png",
        },
        {
          title: "Visual Slide Design",
          body: "Premium slide design that reflects your brand — professional and polished slides that command attention in any room.",
          image: "/img/services/pitch/row-2.png",
        },
        {
          title: "Investor Deck — Series A/B/C",
          body: "Structured investor presentations for fundraising rounds covering problem, solution, market, traction, team, and ask.",
          image: "/img/services/pitch/row-3.png",
        },
        {
          title: "SaaS Pitch and Product Launch Decks",
          body: "SaaS pitch decks, sales decks, and partnership presentations designed to drive action at every stage of growth.",
          image: "/img/services/pitch/row-4.png",
        },
        {
          title: "Speaker Notes and Prep",
          body: "We don't just design — we prepare you to deliver. Full speaker notes included with every deck.",
          image: "/img/services/pitch/row-5.png",
        },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "From Brief to Board Room",
      body: "A fast collaborative process built for founders on a timeline.",
      steps: [
        { title: "Brief", body: "Onboarding call to understand your vision, stage, audience, and key messages." },
        { title: "Outline", body: "Slide-by-slide structure and storytelling arc for your approval before design starts." },
        { title: "Content", body: "Copywriting, data research, and chart recommendations for each slide." },
        { title: "Design", body: "High fidelity slide design in Figma or PowerPoint with your branding built in." },
        { title: "Revisions", body: "Two rounds of revisions included." },
        { title: "Delivery", body: "Editable source files, PDF export, and speaker notes. Ready to pitch." },
      ],
    },
    meta: {
      title: "Pitch deck presentation — Dev N Scale",
      description: "Investor-ready pitch decks with narrative structure, clean data viz, and editable Figma/Keynote handoff.",
    },
  },

  marketing: {
    slug: "digital-marketing",
    index: "07",
    hero: {
      title: "Digital marketing",
      body: "We are a results-driven digital marketing agency that doesn't just run campaigns — we engineer growth. Our team specialises in performance marketing, combining creative strategy with data analysis to deliver results that matter.",
    },
    stats: [
      { value: "Performance Driven", label: "Performance Driven Approach" },
      { value: "Certified", label: "Google Ads and Meta Certified" },
      { value: "Full Funnel", label: "Full Funnel Coverage" },
      { value: "GTM Tracking", label: "GTM and Conversion Tracking Included" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Full Funnel Growth — Every Channel",
      body: "We cover every touchpoint of your customer's digital journey.",
      rows: [
        {
          title: "SEO Services",
          body: "Technical audits, on-page optimisation, keyword research, content strategy, and link building that earn lasting organic rankings.",
          image: "/img/services/marketing/row-0.png",
        },
        {
          title: "Paid Ads — PPC and Google Ads",
          body: "Google Ads, Meta, LinkedIn, and TikTok campaigns built for conversions, not just clicks. Includes conversion optimisation on every campaign.",
          image: "/img/services/marketing/row-1.png",
        },
        {
          title: "Social Media Marketing",
          body: "Content calendars, community management, influencer outreach, and growth strategies for every platform.",
          image: "/img/services/marketing/row-2.jpg",
        },
        {
          title: "Search Engine Advertising",
          body: "Precision targeted campaigns with smart bidding strategies, continuous A/B testing, and conversion optimisation for maximum ROI.",
          image: "/img/services/marketing/row-3.jpg",
        },
        {
          title: "Email Marketing",
          body: "Automated drip campaigns, newsletters, and lifecycle emails that nurture leads into loyal customers.",
          image: "/img/services/marketing/row-4.png",
        },
        {
          title: "Analytics and Reporting",
          body: "Custom dashboards, monthly reports, and actionable insights so you always know what's working and what to do next.",
          image: "/img/services/marketing/row-5.png",
        },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "From Audit to Accelerated Growth",
      body: "A repeatable system that turns data into decisions and decisions into results.",
      steps: [
        { title: "Audit", body: "Full audit of your digital presence, keyword landscape, competitors, and market gaps." },
        { title: "Strategy", body: "Channel mix, budget allocation, KPIs, and a 90-day growth roadmap." },
        { title: "Launch", body: "Campaign setup, creative production, Google Ads and paid ads configuration, and technical implementation." },
        { title: "Optimise", body: "Weekly analysis, A/B testing, real-time bid adjustments, and conversion optimisation." },
        { title: "Scale", body: "Doubling down on what works and expanding to new channels and audiences." },
        { title: "Report", body: "Monthly performance reviews with clear metrics and next month's plan." },
      ],
    },
    meta: {
      title: "Digital marketing — Dev N Scale",
      description: "SEO, paid media, CRO, and lifecycle campaigns — with GA4/attribution dashboards so every euro maps back to pipeline.",
    },
  },

  staff: {
    slug: "staff-augmentation",
    index: "08",
    hero: {
      title: "Staff augmentation",
      body: "Your team shouldn't slow down because you can't hire fast enough. We place senior developers, designers, QA engineers, and project managers directly into your workflow so you can scale without the overhead of traditional hiring.",
    },
    stats: [
      { value: "Plug and Play", label: "Plug and Play Talent" },
      { value: "48 Hours", label: "Vetted in 48 Hours" },
      { value: "Flexible", label: "Flexible Engagements" },
      { value: "Timezone Aligned", label: "Timezone Aligned Teams" },
    ],
    included: {
      eyebrow: "WHAT IS INCLUDED",
      title: "Your Team, Extended",
      body: "The right people in the right seats. No recruitment headaches, no onboarding delays.",
      rows: [
        {
          title: "Frontend and Backend Developers",
          body: "React, Next.js, Node, Python, Laravel and more. Engineers who write clean code and ship on time, embedded in your sprints from week one.",
          image: "/img/services/staff/row-0.png",
        },
        {
          title: "UI/UX Designers",
          body: "Product designers and visual designers who understand your brand and your users. Figma natives who collaborate, not just decorate.",
          image: "/img/services/staff/row-1.png",
        },
        {
          title: "QA Engineers",
          body: "Manual and automation testers who catch what others miss. They integrate into your pipeline and hold the quality bar so your team can move faster.",
          image: "/img/services/staff/row-2.png",
        },
        {
          title: "Project Managers",
          body: "PMs who keep scope tight, communication clear, and timelines honest. They bridge the gap between your vision and the team executing it.",
          image: "/img/services/staff/row-3.png",
        },
        {
          title: "DevOps Engineers",
          body: "CI/CD, cloud infrastructure, and deployment pipelines handled by engineers who keep your systems stable while your product evolves.",
          image: "/img/services/staff/row-4.png",
        },
        {
          title: "Security, Performance and Optimisation",
          body: "SSL, CDN setup, security hardening, Core Web Vitals optimisation, and regular maintenance to keep your site fast and safe.",
          image: "/img/services/staff/row-5.png",
        },
      ],
    },
    process: {
      eyebrow: "OUR PROCESS",
      title: "From Request to Kickoff",
      body: "Built for speed without cutting corners.",
      steps: [
        { title: "Brief", body: "Discovery call to understand your tech stack, team culture, and what kind of talent you actually need." },
        { title: "Match", body: "We shortlist vetted candidates from our bench within 48 hours. You review profiles and interview who you want." },
        { title: "Onboard", body: "Your chosen resource gets access to your tools, joins your standups, and starts contributing from the first week." },
        { title: "Deliver", body: "They work as part of your team, not ours. Daily syncs, sprint participation, and full accountability." },
        { title: "Scale", body: "Need more people? Need to wind down? Adjust the engagement anytime with no long term lock ins." },
        { title: "Support", body: "Ongoing maintenance retainers, updates, and feature development." },
      ],
    },
    meta: {
      title: "Staff augmentation — Dev N Scale",
      description: "Senior developers, designers, QA engineers, and project managers placed directly into your workflow so you can scale without the overhead of traditional hiring.",
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
    pill: "FinTech Mobile App Design",
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

export const TESTIMONIALS = [
  {
    quote:
      `DEV N SCALE felt less like an agency and more like the most senior people on our team — they shipped exactly what we needed, on time, and pushed back when it mattered.`,
    name: "Lukas Meyer",
    role: "VP Product, Ledgerly",
    image: "/img/testimonial-lukas.png",
  },
  {
    quote:
      "From day one they understood our vision better than teams we had worked with for years. The quality of code and speed of delivery was genuinely impressive.",
    name: "Jonas Vogel",
    role: "CTO, NovaBridge",
    image: "/img/team/jonas-vogel.png",
  },
  {
    quote:
      "They turned our rough wireframes into a production-ready platform in under six weeks. Communication was seamless and the result exceeded every expectation.",
    name: "Omar Haddad",
    role: "Founder, Paylinq",
    image: "/img/team/omar-haddad.png",
  },
];

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
  "Full Stack Development",
  "Mobile App Development",
  "Design",
  "AI Chatbot Development",
  "Software Quality Assurance",
  "Pitch Deck",
  "Digital Marketing",
  "Staff Augmentation",
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
  contact: [
    { label: "+92 339 5636702", href: "tel:+923395636702" },
    { label: "info@devnscale.com", href: "mailto:info@devnscale.com" },
  ],
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
    title: "Full Stack Development",
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
  {
    id: "staff",
    title: "Staff Augmentation",
    body: "Senior developers, designers, and QA engineers placed directly into your workflow so you can scale without the overhead.",
    icon: "briefcase",
    tags: ["Embedded teams", "Flexible scale", "Senior talent"],
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
    "Full Stack Development",
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
    /** Optional body paragraph shown under the "Full Picture" title.
     *  MCA doesn't have one in Figma; OpulenceX + Central Hub do. */
    body?: string;
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
    body: "OpulenceX Brings The XRP Ledger's DeFi Opportunities Together In One Place, Creating A Growing Ecosystem Where Users Can Explore New Ways To Swap, Stake, Farm, And Earn From Their Digital Assets.",
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
    body: "Lend SaaS Is Continuously Evolving With The Potential For More Powerful Tools, Seamless Integrations, And Valuable Knowledge-Sharing Resources. The Platform Provides A Strong Foundation For Expanding Its Capabilities And Creating Even More Value For Its Users.",
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
      year: "2025",
      badge: "Mobile App",
      tags: ["iOS", "Android", "UI/UX"],
      cover: "/img/case/work-cover-1-mca.png",
      href: "/case-study",
    },
    {
      name: "Lend SaaS Application",
      url: "ledgerly.io.com",
      year: "2025",
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
      tags: ["AI", "Backend", "QA"],
      cover: "/img/case/work-cover-6-marketplace.png",
      href: "/case-study/lend-hub",
    },
  ],
} as const;
