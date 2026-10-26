/* Service page "Who it's for" and capability explorer copy, from the Figma
 * service frames (SD · Who it's for, SD · Capabilities, Service/Capability Panel). */

export type FitCard = { title: string; body: string; icon: string };
export type ServiceFit = { title: string; body: string; cards: readonly FitCard[] };
export type CapabilityPanel = { image: string; alt: string; deliverables: readonly string[]; stack: readonly string[] };
export type CapabilityTab = { title: string; body: string; panel: string };
export type ServiceCapabilities = { title: string; body: string; tabs: readonly CapabilityTab[] };

export const SERVICE_FIT: Record<string, ServiceFit> = {
  web: {
    title: "Built for teams that need the whole stack to work.",
    body: "Most projects stall at the seams between design, frontend, backend and hosting. We own all of it, so one team is accountable for the result.",
    cards: [
      { title: "Launching a new product", body: "You have a validated idea and need a production-ready first version, not a prototype that has to be rebuilt later.", icon: "/img/services/fit/web-1.svg" },
      { title: "Outgrowing your current stack", body: "Your site or app slows down, breaks under load or is hard to change. We replatform without stopping the business.", icon: "/img/services/fit/web-2.svg" },
      { title: "Short on senior engineers", body: "You need people who can own architecture and delivery, and work inside your team from the first week.", icon: "/img/services/fit/web-3.svg" },
    ],
  },
  mobile: {
    title: "Built for teams shipping real apps.",
    body: "From a first MVP to apps with thousands of users, one team covers design, build and store launch.",
    cards: [
      { title: "Launching an app MVP", body: "You need an iOS and Android app in front of real users quickly, built on a stack that can grow.", icon: "/img/services/fit/mobile-1.svg" },
      { title: "Rebuilding a struggling app", body: "Your current app is slow, crashes or gets poor reviews. We rebuild it for performance and stability.", icon: "/img/services/fit/mobile-2.svg" },
      { title: "Scaling to more users", body: "Your app is growing and needs a solid backend, payments and analytics to keep up.", icon: "/img/services/fit/mobile-3.svg" },
    ],
  },
  design: {
    title: "Design for teams that care how it feels.",
    body: "Whether it's a full product or a brand identity, we handle every pixel, from research to developer handoff.",
    cards: [
      { title: "Designing a new product", body: "You have an idea or a spec and need flows, screens and a prototype you can test and build from.", icon: "/img/services/fit/design-1.svg" },
      { title: "Redesigning an existing product", body: "Your product works but feels dated or confusing. We modernise it without losing what users rely on.", icon: "/img/services/fit/design-2.svg" },
      { title: "Building a brand", body: "You need an identity, guidelines and visuals that position you as a premium player.", icon: "/img/services/fit/design-3.svg" },
    ],
  },
  ai: {
    title: "Built for teams drowning in conversations.",
    body: "Every chatbot is trained on your data, tested on real scenarios and tuned for your use case.",
    cards: [
      { title: "Overloaded support team", body: "Repetitive questions eat your team's time. A support bot answers them instantly and escalates the rest.", icon: "/img/services/fit/ai-1.svg" },
      { title: "Leads slipping through", body: "Visitors leave without talking to sales. A lead bot qualifies and routes them around the clock.", icon: "/img/services/fit/ai-2.svg" },
      { title: "Knowledge stuck in documents", body: "Your team can't find answers in policies and docs. An internal bot makes them searchable in chat.", icon: "/img/services/fit/ai-3.svg" },
    ],
  },
  qa: {
    title: "For teams that want to ship with confidence.",
    body: "Our QA engineers find the bugs before your users do, at every layer of your product.",
    cards: [
      { title: "Bugs reaching production", body: "Users find issues before your team does. We put testing in place before every release.", icon: "/img/services/fit/qa-1.svg" },
      { title: "Slow manual regression", body: "Every release needs days of retesting. Automation suites catch regressions on every push.", icon: "/img/services/fit/qa-2.svg" },
      { title: "Preparing for launch or audit", body: "You need performance, security and device coverage confirmed before going live.", icon: "/img/services/fit/qa-3.svg" },
    ],
  },
  pitch: {
    title: "For founders with a story to tell.",
    body: "Strategy meets design, so every slide earns its place in front of investors.",
    cards: [
      { title: "Raising a round", body: "You are preparing for Seed or Series A, B or C and need a deck investors remember.", icon: "/img/services/fit/pitch-1.svg" },
      { title: "Launching a product", body: "You need a sales or launch deck that explains your product and drives action.", icon: "/img/services/fit/pitch-2.svg" },
      { title: "Refreshing an old deck", body: "Your story has moved on but your slides haven't. We restructure and redesign them.", icon: "/img/services/fit/pitch-3.svg" },
    ],
  },
  marketing: {
    title: "For brands that want growth they can measure.",
    body: "We cover every touchpoint of your customer's digital journey, backed by data.",
    cards: [
      { title: "Not showing up in search", body: "Customers can't find you on Google. SEO builds rankings that keep bringing traffic.", icon: "/img/services/fit/marketing-1.svg" },
      { title: "Ads that don't convert", body: "You spend on ads without clear returns. We rebuild campaigns around conversions.", icon: "/img/services/fit/marketing-2.svg" },
      { title: "No clear view of results", body: "You can't tell what's working. Tracking and dashboards make every channel measurable.", icon: "/img/services/fit/marketing-3.svg" },
    ],
  },
  staff: {
    title: "For teams that need to move faster.",
    body: "The right people in the right seats, with no recruitment headaches or onboarding delays.",
    cards: [
      { title: "Hiring can't keep up", body: "Your roadmap needs people now, not in three months. We place vetted talent within 48 hours.", icon: "/img/services/fit/staff-1.svg" },
      { title: "Short-term capacity gaps", body: "A launch or migration needs extra hands for a few months, without long-term commitments.", icon: "/img/services/fit/staff-2.svg" },
      { title: "Missing a specialist skill", body: "You need DevOps, QA or design expertise your team doesn't have in-house.", icon: "/img/services/fit/staff-3.svg" },
    ],
  },
};

export const CAPABILITY_PANELS: Record<string, CapabilityPanel> = {
  "web-frontend": {
    image: "/img/services/stages/web-frontend.png",
    alt: "Responsive web app shown on desktop and mobile with Core Web Vitals passing",
    deliverables: ["Responsive UI tuned for every breakpoint", "Reusable component library in code", "Core Web Vitals passing at launch"],
    stack: ["React", "Next.js", "Vue", "TypeScript", "Tailwind"],
  },
  "web-backend": {
    image: "/img/services/stages/web-backend.png",
    alt: "API console showing a JSON response and a list of endpoints",
    deliverables: ["Documented REST or GraphQL API", "Database schema, migrations and seeds", "Auth, roles and permissions built in"],
    stack: ["Node.js", "Django", "Laravel", "PostgreSQL", "Redis"],
  },
  "web-saas": {
    image: "/img/services/stages/web-saas.png",
    alt: "SaaS dashboard with MRR, active users and a revenue chart",
    deliverables: ["Multi-tenant SaaS foundations", "Billing, auth and admin dashboards", "Analytics your team can act on"],
    stack: ["Next.js", "Node.js", "Stripe", "AWS", "PostgreSQL"],
  },
  "web-wordpress": {
    image: "/img/services/stages/web-wordpress.png",
    alt: "WordPress page editor with blocks and a WooCommerce sync status",
    deliverables: ["Custom theme with no page builder bloat", "WooCommerce and third party integrations", "Editor training and handover docs"],
    stack: ["WordPress", "WooCommerce", "PHP", "ACF"],
  },
  "web-framer": {
    image: "/img/services/stages/web-framer.png",
    alt: "Framer timeline editing opacity, offset and spring transitions",
    deliverables: ["Responsive Framer build, ready to edit", "CMS collections for blog and case studies", "Interactions and motion that feel native"],
    stack: ["Framer", "CMS", "Motion", "SEO"],
  },
  "web-security": {
    image: "/img/services/stages/web-security.png",
    alt: "Terminal audit passing SSL, headers and CDN checks next to an uptime monitor",
    deliverables: ["Security hardening and SSL", "CDN, caching and image optimisation", "Monitoring and ongoing maintenance"],
    stack: ["Cloudflare", "SSL", "CI/CD", "Lighthouse"],
  },
  "mobile": {
    image: "/img/services/stages/mobile.png",
    alt: "Two phone screens from an iOS app with a TestFlight build ready for review",
    deliverables: ["Native iOS app built in Swift", "Smooth performance on iPhone and iPad", "App Store ready build and assets"],
    stack: ["Swift", "SwiftUI", "Xcode", "TestFlight"],
  },
  "design": {
    image: "/img/services/stages/design.png",
    alt: "Figma layers panel and a dashboard card selected for design review",
    deliverables: ["Pixel-perfect screens in Figma", "Atomic design system and tokens", "Developer-ready handoff"],
    stack: ["Figma", "Auto layout", "Variables", "Prototypes"],
  },
  "ai": {
    image: "/img/services/stages/ai.png",
    alt: "Support chatbot tracking an order and handing over to a human agent",
    deliverables: ["Bot trained on your FAQs and documents", "Ticket handling and order tracking", "Smooth handover to a human agent"],
    stack: ["OpenAI", "RAG", "Zendesk", "WhatsApp"],
  },
  "qa": {
    image: "/img/services/stages/qa.png",
    alt: "Test run results with passes, a failed case and a high severity bug report",
    deliverables: ["Exploratory and regression testing", "Acceptance testing before each release", "Clear bug reports with steps to reproduce"],
    stack: ["Jira", "TestRail", "BrowserStack", "Postman"],
  },
  "pitch": {
    image: "/img/services/stages/pitch.png",
    alt: "Seed deck slide on the problem with speaker notes",
    deliverables: ["A clear story arc from problem to ask", "Slide-by-slide outline before design", "Messaging investors remember"],
    stack: ["Figma", "PowerPoint", "Keynote", "Google Slides"],
  },
  "marketing": {
    image: "/img/services/stages/marketing.png",
    alt: "Search results with a first position ranking and an organic clicks chart",
    deliverables: ["Technical SEO audit and fixes", "Keyword research and content plan", "On-page optimisation and link building"],
    stack: ["Search Console", "GA4", "Ahrefs", "Screaming Frog"],
  },
  "staff": {
    image: "/img/services/stages/staff.png",
    alt: "Sprint board with tasks and a senior engineer matched in 48 hours",
    deliverables: ["Vetted senior developers", "Embedded in your sprints from week one", "Flexible engagement, scale up or down"],
    stack: ["React", "Node.js", "Python", "Laravel"],
  },
  "mobile-android": {
    image: "/img/services/stages/mobile-android.png",
    alt: "Android app order list with a Play Console build rolling out",
    deliverables: ["Native Android app in Kotlin", "Tested across phones, tablets and screen sizes", "Play Store ready build and listing"],
    stack: ["Kotlin", "Jetpack Compose", "Android Studio", "Firebase"],
  },
  "mobile-cross": {
    image: "/img/services/stages/mobile-cross.png",
    alt: "The same workout app running on iOS and Android from one codebase",
    deliverables: ["One codebase for iOS and Android", "Native look and feel on both platforms", "Faster releases with shared components"],
    stack: ["React Native", "Flutter", "TypeScript", "Expo"],
  },
  "mobile-api": {
    image: "/img/services/stages/mobile-api.png",
    alt: "App activity feed next to an API console sending a push notification",
    deliverables: ["APIs your app can rely on", "Push notifications and third-party integrations", "Secure auth and a cloud backend"],
    stack: ["Node.js", "GraphQL", "Firebase", "AWS"],
  },
  "mobile-iap": {
    image: "/img/services/stages/mobile-iap.png",
    alt: "Paywall with yearly and monthly plans and a started subscription",
    deliverables: ["Subscriptions and one-time purchases", "Paywalls and free trials that convert", "Receipt validation and revenue tracking"],
    stack: ["StoreKit", "Play Billing", "RevenueCat", "Stripe"],
  },
  "mobile-aso": {
    image: "/img/services/stages/mobile-aso.png",
    alt: "App Store listing with rating, chart position and a keyword rank",
    deliverables: ["Store listing, screenshots and metadata", "Keyword research for app store search", "Review compliance and launch support"],
    stack: ["App Store Connect", "Play Console", "ASO", "Analytics"],
  },
  "design-ux": {
    image: "/img/services/stages/design-ux.png",
    alt: "Journey map with sentiment curve, research notes and a usability result",
    deliverables: ["Interview insights and personas", "Journey maps and user flows", "Usability findings with clear fixes"],
    stack: ["User interviews", "Journey maps", "Usability tests", "Maze"],
  },
  "design-graphic": {
    image: "/img/services/stages/design-graphic.png",
    alt: "Grid of campaign creatives with an exported asset kit",
    deliverables: ["Social and ad creatives", "Print and marketing collateral", "Source files ready for your team"],
    stack: ["Illustrator", "Photoshop", "Figma", "InDesign"],
  },
  "design-brand": {
    image: "/img/services/stages/design-brand.png",
    alt: "Brand board with logo, colour swatches and type pairing",
    deliverables: ["Logo system and visual language", "Colour and type guidelines", "Brand book your team can use"],
    stack: ["Logo design", "Colour", "Typography", "Guidelines"],
  },
  "design-system": {
    image: "/img/services/stages/design-system.png",
    alt: "Component library with buttons, inputs, toggles and design tokens",
    deliverables: ["Component library with variants", "Design tokens synced to code", "Usage docs for designers and developers"],
    stack: ["Figma variables", "Tokens", "Storybook", "Auto layout"],
  },
  "design-proto": {
    image: "/img/services/stages/design-proto.png",
    alt: "Clickable prototype flow from plans to checkout to confirmation",
    deliverables: ["Clickable prototypes on real devices", "Micro-interactions and motion specs", "Flows tested before development"],
    stack: ["Figma prototypes", "ProtoPie", "Smart animate", "Maze"],
  },
  "ai-lead": {
    image: "/img/services/stages/ai-lead.png",
    alt: "Website chat bot qualifying a lead and booking a call",
    deliverables: ["Bot that qualifies visitors around the clock", "Leads routed straight to your CRM", "Meetings booked automatically"],
    stack: ["OpenAI", "HubSpot", "Calendly", "Webhooks"],
  },
  "ai-hr": {
    image: "/img/services/stages/ai-hr.png",
    alt: "Internal HR bot answering a leave question with a cited policy",
    deliverables: ["Answers from your policies and docs", "Onboarding and IT helpdesk flows", "Sources cited in every reply"],
    stack: ["Slack", "RAG", "Notion", "Google Drive"],
  },
  "ai-ecom": {
    image: "/img/services/stages/ai-ecom.png",
    alt: "Shopping assistant recommending products with add to cart buttons",
    deliverables: ["Product recommendations in chat", "Cart recovery and order updates", "Post-purchase support"],
    stack: ["Shopify", "OpenAI", "Klaviyo", "Stripe"],
  },
  "ai-multi": {
    image: "/img/services/stages/ai-multi.png",
    alt: "One bot connected to website, WhatsApp, Messenger, Telegram and Slack",
    deliverables: ["One bot across every channel", "Consistent answers and human handover", "Channel-specific formatting"],
    stack: ["WhatsApp", "Telegram", "Slack", "Web widget"],
  },
  "ai-analytics": {
    image: "/img/services/stages/ai-analytics.png",
    alt: "Bot analytics dashboard with resolution rate, response time and volume",
    deliverables: ["Conversation analytics dashboard", "Fallback and drop-off monitoring", "Monthly tuning and reports"],
    stack: ["Dashboards", "LangSmith", "GA4", "A/B tests"],
  },
  "qa-auto": {
    image: "/img/services/stages/qa-auto.png",
    alt: "Playwright run in a terminal with 128 passing tests",
    deliverables: ["Automated suites for key flows", "Tests running on every push", "Flaky test tracking and fixes"],
    stack: ["Playwright", "Cypress", "Selenium", "GitHub Actions"],
  },
  "qa-mobile": {
    image: "/img/services/stages/qa-mobile.png",
    alt: "Device matrix across iPhone, Pixel and Galaxy with one failing device",
    deliverables: ["Real device and OS coverage", "Gesture, offline and performance checks", "Release-ready device report"],
    stack: ["BrowserStack", "Appium", "TestFlight", "Firebase"],
  },
  "qa-perf": {
    image: "/img/services/stages/qa-perf.png",
    alt: "Load test chart of requests per second and p95 latency",
    deliverables: ["Load and stress test results", "Bottlenecks found and explained", "Capacity plan for real traffic"],
    stack: ["k6", "JMeter", "Grafana", "Lighthouse"],
  },
  "qa-security": {
    image: "/img/services/stages/qa-security.png",
    alt: "OWASP Top 10 audit with pass and medium findings",
    deliverables: ["OWASP based vulnerability scan", "Manual penetration testing", "Prioritised fixes and retest"],
    stack: ["OWASP ZAP", "Burp Suite", "Snyk", "Nessus"],
  },
  "qa-docs": {
    image: "/img/services/stages/qa-docs.png",
    alt: "QA board with test cases and bugs by status",
    deliverables: ["Test plans and test cases", "Bug reports with clear steps", "Coverage and traceability reports"],
    stack: ["Jira", "TestRail", "Confluence", "Xray"],
  },
  "pitch-data": {
    image: "/img/services/stages/pitch-data.png",
    alt: "Traction slide with revenue bars and market size circles",
    deliverables: ["Charts that make the data obvious", "Market and financial slides", "Consistent data styling"],
    stack: ["Excel", "Figma", "Flourish", "Google Sheets"],
  },
  "pitch-visual": {
    image: "/img/services/stages/pitch-visual.png",
    alt: "Grid of designed deck slides in one brand style",
    deliverables: ["Premium slide design", "Brand-consistent templates", "Editable master slides"],
    stack: ["Figma", "Keynote", "PowerPoint", "Brand kit"],
  },
  "pitch-investor": {
    image: "/img/services/stages/pitch-investor.png",
    alt: "Deck outline from problem to the ask next to an 8 million dollar Series A slide",
    deliverables: ["Fundraising story from problem to ask", "Traction and financial slides", "Data room ready PDF"],
    stack: ["Pitch", "DocSend", "Keynote", "Figma"],
  },
  "pitch-saas": {
    image: "/img/services/stages/pitch-saas.png",
    alt: "Launch deck slide with product chart and pricing tiers",
    deliverables: ["Sales and launch decks", "Product demos in slides", "Clear pricing and call to action"],
    stack: ["Google Slides", "Figma", "Loom", "Pitch"],
  },
  "pitch-notes": {
    image: "/img/services/stages/pitch-notes.png",
    alt: "Presenter view with current slide, speaker notes and a timer",
    deliverables: ["Speaker notes for every slide", "Timing and flow guidance", "Q&A preparation list"],
    stack: ["Keynote", "PowerPoint", "Teleprompter", "Notes"],
  },
  "marketing-ppc": {
    image: "/img/services/stages/marketing-ppc.png",
    alt: "Ads manager table of campaigns with spend, conversions and ROAS",
    deliverables: ["Campaigns built for conversions", "Audience and creative testing", "Weekly spend and ROAS reports"],
    stack: ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads"],
  },
  "marketing-social": {
    image: "/img/services/stages/marketing-social.png",
    alt: "Weekly content calendar across Instagram, LinkedIn and TikTok",
    deliverables: ["Content calendar and posts", "Community management", "Growth strategy per platform"],
    stack: ["Instagram", "LinkedIn", "TikTok", "Buffer"],
  },
  "marketing-sea": {
    image: "/img/services/stages/marketing-sea.png",
    alt: "Sponsored search ad preview with sitelinks and bidding stats",
    deliverables: ["Search campaigns and ad copy", "Smart bidding and negative keywords", "Landing page A/B tests"],
    stack: ["Google Ads", "Microsoft Ads", "Keyword Planner", "A/B tests"],
  },
  "marketing-email": {
    image: "/img/services/stages/marketing-email.png",
    alt: "Email automation flow with wait, welcome email and branching",
    deliverables: ["Automated drips and lifecycle flows", "Newsletter design and copy", "List segmentation and testing"],
    stack: ["Klaviyo", "Mailchimp", "HubSpot", "Resend"],
  },
  "marketing-analytics": {
    image: "/img/services/stages/marketing-analytics.png",
    alt: "Monthly report with sessions, conversions, revenue and channel split",
    deliverables: ["Custom dashboards", "Conversion tracking setup", "Monthly reports with next steps"],
    stack: ["GA4", "Looker Studio", "Tag Manager", "Hotjar"],
  },
  "staff-design": {
    image: "/img/services/stages/staff-design.png",
    alt: "Senior product designer profile with portfolio and a start date",
    deliverables: ["Senior product and UI/UX designers", "Working inside your sprints", "Design systems and clean handoff"],
    stack: ["Figma", "Design systems", "UX research", "Prototyping"],
  },
  "staff-qa": {
    image: "/img/services/stages/staff-qa.png",
    alt: "CI pipeline with a QA gate and an embedded QA engineer",
    deliverables: ["Manual and automation testers", "Quality gates in your pipeline", "Clear reporting to your team"],
    stack: ["Playwright", "Cypress", "Jira", "TestRail"],
  },
  "staff-pm": {
    image: "/img/services/stages/staff-pm.png",
    alt: "Quarterly roadmap with phases and a today marker",
    deliverables: ["Experienced delivery managers", "Clear scope, timelines and updates", "Risk tracking and stakeholder reports"],
    stack: ["Jira", "Linear", "Notion", "Scrum"],
  },
  "staff-devops": {
    image: "/img/services/stages/staff-devops.png",
    alt: "Deployment pipeline from build to production with uptime",
    deliverables: ["CI/CD pipelines", "Cloud infrastructure as code", "Monitoring and on-call ready systems"],
    stack: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  "staff-security": {
    image: "/img/services/stages/staff-security.png",
    alt: "Lighthouse scores and passing security headers",
    deliverables: ["Security and performance specialists", "Audits, hardening and fixes", "Monitoring after launch"],
    stack: ["Cloudflare", "OWASP", "Lighthouse", "Sentry"],
  },
};

/* Full Stack panels come from Figma; for the other services the first tab
 * uses the Figma panel and the rest are rendered in the same style. */
export const SERVICE_CAPABILITIES: Record<string, ServiceCapabilities> = {
  web: {
    title: "Everything from interface to infrastructure.",
    body: "Six capabilities, one delivery team. Pick a layer to see what we build and what you walk away with.",
    tabs: [
      { title: "Frontend development", body: "React, Next.js and Vue interfaces that stay pixel perfect and fast on every device.", panel: "web-frontend" },
      { title: "Backend development", body: "Node.js, Django and Laravel services with robust APIs and architecture built for growth.", panel: "web-backend" },
      { title: "Full stack and SaaS", body: "Dashboards, portals and ecommerce on a scalable architecture, from concept to launch.", panel: "web-saas" },
      { title: "WordPress development", body: "Custom themes, plugins and WooCommerce your team can edit with confidence.", panel: "web-wordpress" },
      { title: "Framer websites", body: "Fast marketing sites with advanced animation, CMS and no-code flexibility.", panel: "web-framer" },
      { title: "Security and performance", body: "SSL, CDN, hardening and Core Web Vitals work that keeps your product fast and safe.", panel: "web-security" },
    ],
  },
  mobile: {
    title: "Everything from first screen to App Store.",
    body: "Six capabilities, one team. Pick one to see what we build and what you walk away with.",
    tabs: [
      { title: "iOS development", body: "Native Swift apps for iPhone and iPad with full Apple ecosystem integration.", panel: "mobile" },
      { title: "Android development", body: "Kotlin apps optimised for the full range of Android devices and screen sizes.", panel: "mobile-android" },
      { title: "Cross-platform apps", body: "React Native and Flutter apps that share code and still feel native on both platforms.", panel: "mobile-cross" },
      { title: "API and backend integration", body: "REST and GraphQL APIs, third-party integrations, push notifications and cloud backends.", panel: "mobile-api" },
      { title: "In-app purchases and subscriptions", body: "Subscriptions, one-time purchases, freemium models and payment gateway setup.", panel: "mobile-iap" },
      { title: "App Store launch and ASO", body: "App Store and Play Store submission, optimisation and post-launch support.", panel: "mobile-aso" },
    ],
  },
  design: {
    title: "Everything design, under one roof.",
    body: "Six capabilities, one team. Pick one to see what we design and what you walk away with.",
    tabs: [
      { title: "UI design", body: "Conversion-focused interfaces in Figma with atomic design systems and developer-ready handoff.", panel: "design" },
      { title: "UX research and strategy", body: "Interviews, journey mapping, wireframes and usability testing to validate every decision.", panel: "design-ux" },
      { title: "Graphic design", body: "Logos, guidelines, marketing collateral and social visuals for every touchpoint.", panel: "design-graphic" },
      { title: "Brand identity", body: "Full brand development, from naming to visual language.", panel: "design-brand" },
      { title: "Design systems", body: "Component libraries and design tokens that keep your product consistent as it grows.", panel: "design-system" },
      { title: "Interaction design and prototyping", body: "Interactive prototypes for stakeholder buy-in, investor demos and user testing.", panel: "design-proto" },
    ],
  },
  ai: {
    title: "Intelligent bots, real business results.",
    body: "Six capabilities, one team. Pick one to see what we build and what you walk away with.",
    tabs: [
      { title: "AI support bots", body: "Bots that handle FAQs, tickets, order tracking and escalation to reduce support load.", panel: "ai" },
      { title: "Lead generation bots", body: "Qualify, capture and route leads around the clock, synced with your CRM.", panel: "ai-lead" },
      { title: "Internal HR and operations bots", body: "Onboarding, IT helpdesk, policy Q&A and internal knowledge base chatbots.", panel: "ai-hr" },
      { title: "E-commerce assistants", body: "Product recommendations, cart recovery and post-purchase support in your store.", panel: "ai-ecom" },
      { title: "Multi-platform deployment", body: "Deploy on your website, WhatsApp, Telegram, Slack and more.", panel: "ai-multi" },
      { title: "Analytics and optimisation", body: "Conversation analytics, fallback monitoring and continuous fine-tuning.", panel: "ai-analytics" },
    ],
  },
  qa: {
    title: "Quality at every layer.",
    body: "Six capabilities, one team. Pick one to see how we test and what you walk away with.",
    tabs: [
      { title: "Manual testing", body: "Exploratory, regression, smoke and acceptance testing by engineers who think like your users.", panel: "qa" },
      { title: "Automation testing", body: "Selenium, Cypress and Playwright suites that catch regressions with every push.", panel: "qa-auto" },
      { title: "Mobile QA", body: "Real device testing across iOS and Android versions, screen sizes and OS combinations.", panel: "qa-mobile" },
      { title: "Performance testing", body: "Load, stress and bottleneck analysis so your app holds up under real traffic.", panel: "qa-perf" },
      { title: "Security testing", body: "OWASP-based vulnerability assessments, penetration tests and audit reports.", panel: "qa-security" },
      { title: "QA documentation and bug tracking", body: "Test plans, test cases, bug reports and traceability with every engagement.", panel: "qa-docs" },
    ],
  },
  pitch: {
    title: "Decks that investors remember.",
    body: "Six capabilities, one team. Pick one to see what we craft and what you walk away with.",
    tabs: [
      { title: "Story and narrative", body: "We find the through line that makes investors feel the problem before they see the solution.", panel: "pitch" },
      { title: "Data visualisation", body: "Market data, financials and metrics turned into clear, compelling slides.", panel: "pitch-data" },
      { title: "Visual slide design", body: "Premium slides that reflect your brand and command attention in any room.", panel: "pitch-visual" },
      { title: "Investor decks for Series A, B and C", body: "Problem, solution, market, traction, team and ask, structured for fundraising.", panel: "pitch-investor" },
      { title: "SaaS pitch and launch decks", body: "Sales decks and partnership presentations designed to drive action.", panel: "pitch-saas" },
      { title: "Speaker notes and prep", body: "Full speaker notes with every deck, so you are ready to deliver.", panel: "pitch-notes" },
    ],
  },
  marketing: {
    title: "Full funnel growth on every channel.",
    body: "Six capabilities, one team. Pick one to see what we run and what you walk away with.",
    tabs: [
      { title: "SEO services", body: "Technical audits, on-page optimisation, keyword research, content and link building.", panel: "marketing" },
      { title: "Paid ads and PPC", body: "Google, Meta, LinkedIn and TikTok campaigns built for conversions, not just clicks.", panel: "marketing-ppc" },
      { title: "Social media marketing", body: "Content calendars, community management and growth strategies for every platform.", panel: "marketing-social" },
      { title: "Search engine advertising", body: "Targeted campaigns with smart bidding, A/B testing and conversion optimisation.", panel: "marketing-sea" },
      { title: "Email marketing", body: "Automated drips, newsletters and lifecycle emails that nurture leads.", panel: "marketing-email" },
      { title: "Analytics and reporting", body: "Custom dashboards and monthly reports so you know what to do next.", panel: "marketing-analytics" },
    ],
  },
  staff: {
    title: "Your team, extended.",
    body: "Six roles, one partner. Pick one to see who we place and what you walk away with.",
    tabs: [
      { title: "Frontend and backend developers", body: "React, Next.js, Node, Python and Laravel engineers embedded in your sprints from week one.", panel: "staff" },
      { title: "UI/UX designers", body: "Product and visual designers who collaborate, not just decorate.", panel: "staff-design" },
      { title: "QA engineers", body: "Manual and automation testers who hold the quality bar inside your pipeline.", panel: "staff-qa" },
      { title: "Project managers", body: "PMs who keep scope tight, communication clear and timelines honest.", panel: "staff-pm" },
      { title: "DevOps engineers", body: "CI/CD, cloud infrastructure and deployment pipelines that keep systems stable.", panel: "staff-devops" },
      { title: "Security and performance", body: "SSL, CDN, hardening and Core Web Vitals work that keeps your product fast and safe.", panel: "staff-security" },
    ],
  },
};
