/** All copy transcribed from the Figma home page. */

// Hrefs are page-relative (`/#…`) so they resolve from any route, not just
// the home page — About Us is now its own page.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Our Team", href: "/team" },
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
          image: "/img/services/web/framer.png",
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
      title: "Our Work Process",
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

export const PROJECTS = [
  {
    pill: "DeFi and Web3",
    title: "OpulenceX",
    body: "OpulenceX is a decentralised finance protocol on the BNB Chain. Users swap tokens, provide liquidity, stake in yield farms and earn holder rewards, all inside one product.",
    metric: "16",
    metricLabel: "Screens Designed",
    image: "/img/case/opulencex/cover.png",
    href: "/case-study/opulencex",
  },
  {
    pill: "Web3 and Creator Economy",
    title: "StriVe",
    body: "StriVe is a Web3 creator platform. Creators launch campaigns and raise money for their projects, while fans discover them, invest in them and trade creator tokens.",
    metric: "12",
    metricLabel: "Screens Designed",
    image: "/img/case/strive/cover.png",
    href: "/case-study/strive",
  },
  {
    pill: "Retail and Grocery",
    title: "CSD Pakistan",
    body: "CSD Pakistan, The Caring Store, is a grocery ordering app for iOS. Customers set a delivery location, shop from the CSD store that serves it and track the order to their door.",
    metric: "16",
    metricLabel: "Screens Designed",
    image: "/img/case/csd-pakistan/cover.png",
    href: "/case-study/csd-pakistan",
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
    image: "/img/testimonial-lukas.png",
  },
  {
    quote:
      "They turned our rough wireframes into a production-ready platform in under six weeks. Communication was seamless and the result exceeded every expectation.",
    name: "Omar Haddad",
    role: "Founder, Paylinq",
    image: "/img/testimonial-lukas.png",
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

export const TEAM_HERO = {
  eyebrow: "TEAM",
  titleLead: "The People Behind The",
  titleAccent: "Products.",
  subtitle:
    "We're A Team Of Designers, Developers, Strategists, And Problem-Solvers Who Work Together To Turn Ideas Into Meaningful Digital Experiences. Different Skills, One Goal: Building Better Products That Create Real Value.",
};

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

// `photo`: path under /public for the member's portrait.
// `linkedin`: profile URL (set to "#" when no real profile exists yet).
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
} = {
  eyebrow: "OUR TEAM",
  title: "The people behind the work.",
  subtitle:
    "A small, senior team — the people you meet are the people who build.",
  members: [
    { name: "Haseeb ur Rehman", role: "WordPress Developer", initials: "HR", photo: "/img/team/haseeb-ur-rehman.png", linkedin: "#" },
    { name: "Hassan Tahir", role: "Front End Developer", initials: "HT", photo: "/img/team/hassan-tahir.png", linkedin: "#" },
    { name: "Abdul Basit", role: "UI/UX Designer", initials: "AB", photo: "/img/team/abdul-basit.png", linkedin: "#" },
    { name: "Mehroz Waseem", role: "UI/UX Designer", initials: "MW", photo: "/img/team/mehroz-waseem.png", linkedin: "#" },
  ],
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
   Case Study pages — new structure from Figma (5892:54950)
   ============================================================ */

export type CaseStudy = {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  meta: {
    industry: string;
    platform: string;
    scope: string;
    services: string;
  };
  heroGradient: string;
  heroImage?: string;
  liveUrl?: string;
  coverImage: string;
  overview: {
    lead: string;
    challenge: string;
    approach: string;
  };
  features: {
    subtitle: string;
    items: readonly {
      title: string;
      body: string;
      image: string;
    }[];
  };
  screensImage: string;
  selectedWork: readonly string[];
  seo: {
    title: string;
    description: string;
  };
};

const CASE_STUDY_OPULENCEX: CaseStudy = {
  slug: "opulencex",
  name: "OpulenceX",
  title: "One DeFi suite for everything you earn on the XRP Ledger.",
  subtitle:
    "OpulenceX brings token swaps, liquidity pools, yield farming, soft staking and NFT rewards into one product for XRPL holders and the projects that build on it.",
  meta: {
    industry: "DeFi and Crypto",
    platform: "Web app",
    scope: "Marketing site, DeFi suite, user dashboard",
    services: "UI/UX Design, Design System",
  },
  heroGradient: "linear-gradient(263.67deg, #f2c632 7.95%, #2acc5c 51.09%, #1e92f4 110.13%)",
  heroImage: "/img/case/opulencex/hero-bg.png",
  coverImage: "/img/case/opulencex/cover.png",
  overview: {
    lead: "XRPL holders had to move between separate tools to swap, provide liquidity, farm and stake. We designed OpulenceX so every one of those paths lives in one connected product.",
    challenge:
      "Each earning path had its own numbers, rules and reward timing. Users could not compare a farm, a pool and a staking plan side by side, and new projects had no clear way to list their own pool.",
    approach:
      "We gave every product the same structure: TVL, APR and rewards always in the same place, one wallet session across the suite, and a guided listing flow for projects. Complex DeFi steps became short, readable screens.",
  },
  features: {
    subtitle: "Three parts of the product carry most of the daily use.",
    items: [
      {
        title: "Swap and liquidity",
        body: "Live rate, price impact, slippage and fees before confirming, with pools in a grid or table view.",
        image: "/img/case/opulencex/feature-1.png",
      },
      {
        title: "Farming and soft staking",
        body: "Seed, Growth and Harvest plans with clear lock periods and APY, plus farm tables sorted by TVL and APR.",
        image: "/img/case/opulencex/feature-2.png",
      },
      {
        title: "Portfolio dashboard",
        body: "Portfolio value, performance, asset allocation and a full transaction history with CSV export.",
        image: "/img/case/opulencex/feature-3.png",
      },
    ],
  },
  screensImage: "/img/case/opulencex/screens.png",
  selectedWork: ["strive", "trillioner"],
  seo: {
    title: "OpulenceX — Case Study — Dev N Scale",
    description:
      "OpulenceX: a DeFi suite on the XRP Ledger for token swaps, liquidity pools, yield farming, soft staking and NFT rewards in one product.",
  },
};
const CASE_STUDY_STRIVE: CaseStudy = {
  slug: "strive",
  name: "StriVe",
  title: "A launchpad where creators raise funds and fans back them early.",
  subtitle:
    "StriVe is a Web3 creator platform. Creators launch campaigns and raise money for their projects, while fans discover them, invest in them and trade creator tokens.",
  meta: {
    industry: "Web3 and Creator Economy",
    platform: "Website and web app",
    scope: "Marketing site, creator dashboard",
    services: "UI/UX Design",
  },
  heroGradient: "linear-gradient(180deg, #2a2563 0%, #01050e 100%)",
  heroImage: "/img/case/strive/hero-bg.png",
  coverImage: "/img/case/strive/cover.png",
  overview: {
    lead: "Creators had audiences but no simple way to turn them into funding. StriVe gives them a place to launch a campaign, and gives fans a reason to back them early.",
    challenge:
      "The product had to explain launchpads, creator tokens and fundraising to people who are fans first and investors second, without losing the energy of a creator brand.",
    approach:
      "We led with the idea before the mechanics: a bold landing page, a four-part feature story and a three-step how it works. Behind it sits a dashboard built around exploring projects and uploading your own.",
  },
  features: {
    subtitle: "The website sells the idea. The dashboard runs it.",
    items: [
      {
        title: "Creator launchpad",
        body: "Creator-led campaigns where fans invest in a creator and follow the project as it grows.",
        image: "/img/case/strive/feature-1.png",
      },
      {
        title: "Explore and project pages",
        body: "A browsable grid of creator projects, each with its own page and story.",
        image: "/img/case/strive/feature-2.png",
      },
      {
        title: "Upload and portfolio",
        body: "A guided upload flow for new projects and a portfolio view for tracking holdings.",
        image: "/img/case/strive/feature-3.png",
      },
    ],
  },
  screensImage: "/img/case/strive/screens.png",
  selectedWork: ["csd-pakistan", "parrot-bot"],
  seo: {
    title: "StriVe — Case Study — Dev N Scale",
    description:
      "StriVe: a Web3 creator launchpad where fans back projects early and trade creator tokens.",
  },
};

const CASE_STUDY_CSD: CaseStudy = {
  slug: "csd-pakistan",
  name: "CSD Pakistan",
  title: "Grocery shopping from your nearest CSD store, in a few taps.",
  subtitle:
    "CSD Pakistan, The Caring Store, is a grocery ordering app for iOS. Customers set a delivery location, shop from the CSD store that serves it and track the order to their door.",
  meta: {
    industry: "Retail and Grocery",
    platform: "iOS app",
    scope: "Customer ordering app",
    services: "UI/UX Design",
  },
  heroGradient: "linear-gradient(180deg, #2e8f85 0%, #0c2b28 100%)",
  heroImage: "/img/case/csd-pakistan/hero-bg.png",
  coverImage: "/img/case/csd-pakistan/cover.png",
  overview: {
    lead: "We followed the design thinking process from persona to tested prototype, and mapped the full order journey before designing a single screen.",
    challenge:
      "Ordering depends on where the customer is. The app had to find the right store from a delivery location, then keep browsing, cart, payment and tracking simple for everyday shoppers.",
    approach:
      "We mapped one flow from sign in to reorder: location, store, categories, product, cart, delivery slot and payment, confirmation, live tracking and feedback. Each step became one focused screen.",
  },
  features: {
    subtitle:
      "The order journey, from choosing a store to the bag at the door.",
    items: [
      {
        title: "Location and store",
        body: "Set a delivery address and the app detects the CSD store that serves it, or lets you pick one.",
        image: "/img/case/csd-pakistan/feature-1.png",
      },
      {
        title: "Browse, search and cart",
        body: "Categories, top sellers, search and a cart you can edit before checkout.",
        image: "/img/case/csd-pakistan/feature-2.png",
      },
      {
        title: "Checkout and tracking",
        body: "Pick a delivery time slot and payment method, then track the order until it arrives.",
        image: "/img/case/csd-pakistan/feature-3.png",
      },
    ],
  },
  screensImage: "/img/case/csd-pakistan/screens.png",
  selectedWork: ["nk-associate", "y-charter"],
  seo: {
    title: "CSD Pakistan — Case Study — Dev N Scale",
    description:
      "CSD Pakistan: a grocery ordering iOS app with location-based store selection and live order tracking.",
  },
};

const CASE_STUDY_NK: CaseStudy = {
  slug: "nk-associate",
  name: "NK Associate",
  title: "Find a property, a project or an investment in one search.",
  subtitle:
    "NK Associate is a real estate company that sells, rents and develops property. We designed its website around property search, clear listings and the company’s own development projects.",
  meta: {
    industry: "Real Estate",
    platform: "Website",
    scope: "Website, mobile views",
    services: "UI/UX Design",
  },
  heroGradient: "linear-gradient(180deg, #a83a40 0%, #1c0d0e 100%)",
  heroImage: "/img/case/nk-associate/hero-bg.png",
  coverImage: "/img/case/nk-associate/cover.png",
  overview: {
    lead: "People come to a real estate site with one question: what is available, where, and at what price. The homepage answers it with search before anything else.",
    challenge:
      "The company sells, rents and develops property, and also offers services and events. All of it had to live in one site without burying the listings people come for.",
    approach:
      "Search sits at the top of the homepage with property type, price range, project, location and purpose. Listings, projects and services each got an index page and a detail page with the same structure.",
  },
  features: {
    subtitle: "Three routes into the business, all starting from search.",
    items: [
      {
        title: "Property search",
        body: "Filter by property type, price range, project, location and sale or rent, with a map view.",
        image: "/img/case/nk-associate/feature-1.png",
      },
      {
        title: "Listings and projects",
        body: "Sale, rent and inventory listings, plus project pages for the company’s own developments.",
        image: "/img/case/nk-associate/feature-2.png",
      },
      {
        title: "Services, events and careers",
        body: "Service detail pages, an events page and a careers page, with contact always one step away.",
        image: "/img/case/nk-associate/feature-3.png",
      },
    ],
  },
  screensImage: "/img/case/nk-associate/screens.png",
  selectedWork: ["trillioner", "humain-learning"],
  seo: {
    title: "NK Associate — Case Study — Dev N Scale",
    description:
      "NK Associate: a real estate website with property search, listings, project pages and development projects.",
  },
};

const CASE_STUDY_TRILLIONER: CaseStudy = {
  slug: "trillioner",
  name: "Trillioner",
  title: "A crypto banking coin, explained and proven on one page.",
  subtitle:
    "Trillioner is the landing page for Trillioner Coin (TLC), a crypto banking project with a wallet app, instant token swap and listings on major exchanges.",
  meta: {
    industry: "Crypto and Web3",
    platform: "Website",
    scope: "Landing page",
    services: "UI/UX Design",
  },
  heroGradient: "linear-gradient(180deg, #6e5a22 0%, #16120a 100%)",
  heroImage: "/img/case/trillioner/hero-bg.png",
  coverImage: "/img/case/trillioner/cover.png",
  overview: {
    lead: "A token project has one page to earn trust. The Trillioner landing page takes a visitor from the promise to the proof: roadmap, wallet, partners, listings and a legal opinion.",
    challenge:
      "Visitors arrive sceptical. The page had to explain what the coin is for, show that it is real and listed, and lead to the whitepaper without reading like hype.",
    approach:
      "We ordered the page like an argument. Vision and core services come first, then the roadmap and wallet app, then live price, swap, partners, exchange listings, a legal opinion and ratings as proof.",
  },
  features: {
    subtitle:
      "Every section answers the next question a careful investor would ask.",
    items: [
      {
        title: "Services and roadmap",
        body: "Crypto banking and the wider service set, with a quarter by quarter roadmap.",
        image: "/img/case/trillioner/feature-1.png",
      },
      {
        title: "Wallet and swap",
        body: "The Trillioner Wallet app and an instant TLC swap block, each with one clear next step.",
        image: "/img/case/trillioner/feature-2.png",
      },
      {
        title: "Proof of trust",
        body: "Partners, exchange listings, a legal opinion by Legal Kornet USA and project ratings.",
        image: "/img/case/trillioner/feature-3.png",
      },
    ],
  },
  screensImage: "/img/case/trillioner/screens.png",
  selectedWork: ["parrot-bot", "opulencex"],
  seo: {
    title: "Trillioner — Case Study — Dev N Scale",
    description:
      "Trillioner: a crypto banking coin landing page with wallet app, token swap and exchange listings.",
  },
};

const CASE_STUDY_PARROT: CaseStudy = {
  slug: "parrot-bot",
  name: "Parrot Bot",
  title: "Copy the wallets that win on Solana, and see every trade.",
  subtitle:
    "Parrot Bot is a copy trading dashboard for Solana. Traders research wallets, copy the ones they trust and track positions, trades and profit in one place.",
  meta: {
    industry: "Crypto Trading",
    platform: "Web app",
    scope: "Trading dashboard, beta onboarding",
    services: "UI/UX Design",
  },
  heroGradient: "linear-gradient(180deg, #34430f 0%, #191919 100%)",
  heroImage: "/img/case/parrot-bot/hero-bg.png",
  coverImage: "/img/case/parrot-bot/cover.png",
  overview: {
    lead: "Copy traders live in the numbers. We designed Parrot Bot so net worth, PnL and open positions read at a glance, even on a dense screen.",
    challenge:
      "Every copied wallet produces positions, trades and results. Traders needed to research a wallet, decide to copy it and set their risk rules without switching tools.",
    approach:
      "One dashboard shows net worth, realized and unrealized PnL, open positions, copied wallets and trade history. Wallet pages add a 7 day PnL chart, win rate and trade counts, with Copy Wallet as the main action.",
  },
  features: {
    subtitle: "Research a wallet, copy it, then manage the risk.",
    items: [
      {
        title: "Dashboard",
        body: "Net worth, realized and unrealized PnL, open positions, wallets copying and full trade history.",
        image: "/img/case/parrot-bot/feature-1.png",
      },
      {
        title: "Wallet research",
        body: "Search any SOL wallet, see its PnL, win rate and trades, then copy it in one click.",
        image: "/img/case/parrot-bot/feature-2.png",
      },
      {
        title: "Wallet manager",
        body: "Deposit, withdraw and set buy amount, slippage, take profit and stop loss per wallet.",
        image: "/img/case/parrot-bot/feature-3.png",
      },
    ],
  },
  screensImage: "/img/case/parrot-bot/screens.png",
  selectedWork: ["y-charter", "strive"],
  seo: {
    title: "Parrot Bot — Case Study — Dev N Scale",
    description:
      "Parrot Bot: a Solana copy trading dashboard for wallet research, position tracking and risk management.",
  },
};

const CASE_STUDY_YCHARTER: CaseStudy = {
  slug: "y-charter",
  name: "Y Charter",
  title: "Private yacht charters, sold on the feeling of a week at sea.",
  subtitle:
    "Y Charter is a luxury crewed yacht charter brokerage with a curated fleet across the Mediterranean, Caribbean, Middle East and Asia. We designed its marketing website.",
  meta: {
    industry: "Luxury Travel",
    platform: "Website",
    scope: "Marketing website",
    services: "UI/UX Design",
  },
  heroGradient: "linear-gradient(180deg, #22345a 0%, #121c31 100%)",
  heroImage: "/img/case/y-charter/hero-bg.png",
  coverImage: "/img/case/y-charter/cover.png",
  overview: {
    lead: "Charter guests are not comparing engine sizes. They are picturing a week at sea. The site leads with that week and lets the fleet, the advisor and the membership follow.",
    challenge:
      "The brand had to feel exclusive and personal while still showing a real fleet, a membership offer and a simple way to start an enquiry.",
    approach:
      "Large imagery and a restrained palette carry the mood. Every section ends in one clear action: discover the fleet, join the Y Club waiting list or speak with an advisor.",
  },
  features: {
    subtitle:
      "Mood first, then the three things a guest actually needs.",
    items: [
      {
        title: "Fleet",
        body: "A curated yacht carousel with size and key details on every card, and a path to the full fleet.",
        image: "/img/case/y-charter/feature-1.png",
      },
      {
        title: "Y Club membership",
        body: "Priority booking, a dedicated concierge, sale and purchase advisory and member gatherings.",
        image: "/img/case/y-charter/feature-2.png",
      },
      {
        title: "Enquiry",
        body: "A short enquiry form so a single advisor can shortlist yachts to the guest’s brief.",
        image: "/img/case/y-charter/feature-3.png",
      },
    ],
  },
  screensImage: "/img/case/y-charter/screens.png",
  selectedWork: ["humain-learning", "csd-pakistan"],
  seo: {
    title: "Y Charter — Case Study — Dev N Scale",
    description:
      "Y Charter: a luxury yacht charter brokerage website with curated fleet, Y Club membership and advisor enquiry.",
  },
};

const CASE_STUDY_HUMAIN: CaseStudy = {
  slug: "humain-learning",
  name: "Humain Learning",
  title: "AI literacy for schools, from the first visit to the classroom dashboard.",
  subtitle:
    "Humain Learning teaches AI literacy to students aged 13 to 18 and their teachers. We designed the website that explains the programme and the IAAT dashboard schools use to assess and improve teaching.",
  meta: {
    industry: "EdTech",
    platform: "Website and web app",
    scope: "Marketing website, school dashboard",
    services: "UI/UX Design, Design System",
  },
  heroGradient: "linear-gradient(180deg, #4f6b3d 0%, #011813 100%)",
  liveUrl: "https://humainlearning.com",
  heroImage: "/img/case/humain-learning/hero-bg.png",
  coverImage: "/img/case/humain-learning/cover.png",
  overview: {
    lead: "Humain Learning serves two audiences: families deciding whether to enrol, and schools that need to see how teaching is going. We designed one brand across both, a website that earns trust and a dashboard that turns assessment data into action.",
    challenge:
      "The website had to explain AI literacy, a six-pillar framework and a course to parents and students without turning into a wall of text. The dashboard had to give teachers, department heads and principals different answers from the same data.",
    approach:
      "On the website, every section answers one question in order: why AI, why Humain, who teaches it and what the course looks like. In the dashboard, one shared layout adapts to each role, with self assessments, evaluations and comparisons one click away.",
  },
  features: {
    subtitle:
      "One brand, two products, and the three parts people use most.",
    items: [
      {
        title: "Website and framework",
        body: "A calm, human-first site that sets out the promise, the IIT Delhi partnership and the six-pillar AI literacy framework.",
        image: "/img/case/humain-learning/feature-1.png",
      },
      {
        title: "Course page",
        body: "A course detail page with an overview, tabbed details and a step-by-step AI journey through each module.",
        image: "/img/case/humain-learning/feature-2.png",
      },
      {
        title: "School dashboard",
        body: "Role-based views for teachers, department heads and principals, with self assessments and comparisons.",
        image: "/img/case/humain-learning/feature-3.png",
      },
    ],
  },
  screensImage: "/img/case/humain-learning/screens.png",
  selectedWork: ["opulencex", "nk-associate"],
  seo: {
    title: "Humain Learning — Case Study — Dev N Scale",
    description:
      "Humain Learning: AI literacy for schools with a marketing website and role-based classroom dashboard.",
  },
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  opulencex: CASE_STUDY_OPULENCEX,
  strive: CASE_STUDY_STRIVE,
  "csd-pakistan": CASE_STUDY_CSD,
  "nk-associate": CASE_STUDY_NK,
  trillioner: CASE_STUDY_TRILLIONER,
  "parrot-bot": CASE_STUDY_PARROT,
  "y-charter": CASE_STUDY_YCHARTER,
  "humain-learning": CASE_STUDY_HUMAIN,
};

export const CASE_STUDIES_LIST: CaseStudy[] = Object.values(CASE_STUDIES);

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

export const WORK = {
  eyebrow: "SELECTED WORK",
  title: "Case studies we’re proud of.",
  subtitle:
    "A look at products we designed, built, and shipped with teams who trusted us to get it right.",
  cases: CASE_STUDIES_LIST.map((cs) => ({
    name: cs.name,
    industry: cs.meta.industry,
    tags: cs.meta.services.split(" / ").concat(cs.meta.platform.split(" and ")),
    cover: cs.coverImage,
    href: `/case-study/${cs.slug}`,
  })),
} as const;
