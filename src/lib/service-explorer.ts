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
  "web-1": {
    image: "/img/services/stages/web-1.png",
    alt: "Responsive web app shown on desktop and mobile with Core Web Vitals passing",
    deliverables: ["Responsive UI tuned for every breakpoint", "Reusable component library in code", "Core Web Vitals passing at launch"],
    stack: ["React", "Next.js", "Vue", "TypeScript", "Tailwind"],
  },
  "web-2": {
    image: "/img/services/stages/web-2.png",
    alt: "API console showing a JSON response and a list of endpoints",
    deliverables: ["Documented REST or GraphQL API", "Database schema, migrations and seeds", "Auth, roles and permissions built in"],
    stack: ["Node.js", "Django", "Laravel", "PostgreSQL", "Redis"],
  },
  "web-3": {
    image: "/img/services/stages/web-3.png",
    alt: "SaaS dashboard with MRR, active users and a revenue chart",
    deliverables: ["Multi-tenant SaaS foundations", "Billing, auth and admin dashboards", "Analytics your team can act on"],
    stack: ["Next.js", "Node.js", "Stripe", "AWS", "PostgreSQL"],
  },
  "web-4": {
    image: "/img/services/stages/web-4.png",
    alt: "WordPress page editor with blocks and a WooCommerce sync status",
    deliverables: ["Custom theme with no page builder bloat", "WooCommerce and third party integrations", "Editor training and handover docs"],
    stack: ["WordPress", "WooCommerce", "PHP", "ACF"],
  },
  "web-5": {
    image: "/img/services/stages/web-5.png",
    alt: "Framer timeline editing opacity, offset and spring transitions",
    deliverables: ["Responsive Framer build, ready to edit", "CMS collections for blog and case studies", "Interactions and motion that feel native"],
    stack: ["Framer", "CMS", "Motion", "SEO"],
  },
  "web-6": {
    image: "/img/services/stages/web-6.png",
    alt: "Terminal audit passing SSL, headers and CDN checks next to an uptime monitor",
    deliverables: ["Security hardening and SSL", "CDN, caching and image optimisation", "Monitoring and ongoing maintenance"],
    stack: ["Cloudflare", "SSL", "CI/CD", "Lighthouse"],
  },
  "mobile-1": {
    image: "/img/services/stages/mobile-1.png",
    alt: "Two phone screens from an iOS app with a TestFlight build ready for review",
    deliverables: ["Native iOS app built in Swift", "Smooth performance on iPhone and iPad", "App Store ready build and assets"],
    stack: ["Swift", "SwiftUI", "Xcode", "TestFlight"],
  },
  "mobile-2": {
    image: "/img/services/stages/mobile-2.png",
    alt: "Android projects and settings screens with a Play Console release rolled out",
    deliverables: ["Kotlin app optimised for Android devices", "Material Design that feels native", "Play Store ready release build"],
    stack: ["Kotlin", "Jetpack Compose", "Android Studio", "Firebase"],
  },
  "mobile-3": {
    image: "/img/services/stages/mobile-3.png",
    alt: "Shared React Native code building the same app for iOS and Android",
    deliverables: ["One codebase for iOS and Android", "Native look and feel on both platforms", "Faster releases with shared logic"],
    stack: ["React Native", "Flutter", "Expo", "TypeScript"],
  },
  "mobile-4": {
    image: "/img/services/stages/mobile-4.png",
    alt: "Orders screen with live sync to REST endpoints and an order shipped notification",
    deliverables: ["REST and GraphQL APIs for your app", "Push notifications and real-time sync", "Third-party and cloud integrations"],
    stack: ["GraphQL", "Firebase", "Node.js", "AWS"],
  },
  "mobile-5": {
    image: "/img/services/stages/mobile-5.png",
    alt: "Go Pro paywall with annual and monthly plans and a verified receipt",
    deliverables: ["Subscriptions and one-time purchases", "Free trials and freemium flows", "Receipt validation and payments"],
    stack: ["StoreKit", "Play Billing", "RevenueCat", "Stripe"],
  },
  "mobile-6": {
    image: "/img/services/stages/mobile-6.png",
    alt: "App Store listing with ratings and screenshots next to an approved app review",
    deliverables: ["App Store and Play Store submission", "Store listing and ASO keywords", "Post-launch updates and support"],
    stack: ["App Store Connect", "Play Console", "Fastlane", "ASO"],
  },
  "design-1": {
    image: "/img/services/stages/design-1.png",
    alt: "Figma layers panel and a dashboard card selected for design review",
    deliverables: ["Pixel-perfect screens in Figma", "Atomic design system and tokens", "Developer-ready handoff"],
    stack: ["Figma", "Auto layout", "Variables", "Prototypes"],
  },
  "design-2": {
    image: "/img/services/stages/design-2.png",
    alt: "Research board with pain points, insights and ideas beside a user persona",
    deliverables: ["User interviews and journey mapping", "Wireframes validated before visual design", "Usability testing with real users"],
    stack: ["Maze", "FigJam", "Dovetail", "Hotjar"],
  },
  "design-3": {
    image: "/img/services/stages/design-3.png",
    alt: "Social campaign tiles with a brand kit exported in every format",
    deliverables: ["Social media and campaign visuals", "Marketing collateral and print", "Assets exported for every channel"],
    stack: ["Illustrator", "Photoshop", "Figma", "InDesign"],
  },
  "design-4": {
    image: "/img/services/stages/design-4.png",
    alt: "Brand guidelines with logo, colours and typography marked approved",
    deliverables: ["Logo, wordmark and brand mark", "Colour, type and visual language", "Brand guidelines your team can use"],
    stack: ["Figma", "Illustrator", "Brand book", "Mockups"],
  },
  "design-5": {
    image: "/img/services/stages/design-5.png",
    alt: "Component library with button and input states and published design tokens",
    deliverables: ["Component library with variants", "Design tokens for colour, type and spacing", "Documentation for designers and developers"],
    stack: ["Figma", "Variables", "Storybook", "Tokens Studio"],
  },
  "design-6": {
    image: "/img/services/stages/design-6.png",
    alt: "Prototype flow from choosing a plan to done with interaction settings",
    deliverables: ["Clickable prototypes for user testing", "Micro-interactions and transitions", "Investor and stakeholder demos"],
    stack: ["Figma", "ProtoPie", "Smart Animate", "Maze"],
  },
  "ai-1": {
    image: "/img/services/stages/ai-1.png",
    alt: "Support chatbot tracking an order and handing over to a human agent",
    deliverables: ["Bot trained on your FAQs and documents", "Ticket handling and order tracking", "Smooth handover to a human agent"],
    stack: ["OpenAI", "RAG", "Zendesk", "WhatsApp"],
  },
  "ai-2": {
    image: "/img/services/stages/ai-2.png",
    alt: "Website chat qualifying a lead, logging it to the CRM and booking a meeting",
    deliverables: ["Qualifies visitors around the clock", "Books meetings into your calendar", "Syncs every lead to your CRM"],
    stack: ["OpenAI", "HubSpot", "Calendly", "Webhooks"],
  },
  "ai-3": {
    image: "/img/services/stages/ai-3.png",
    alt: "HR assistant in Slack answering a leave question from the policy document",
    deliverables: ["Answers policy and IT questions", "Onboarding help for new hires", "Answers from your own documents"],
    stack: ["Slack", "Microsoft Teams", "RAG", "Notion"],
  },
  "ai-4": {
    image: "/img/services/stages/ai-4.png",
    alt: "Shop assistant recommending running shoes next to a recovered cart",
    deliverables: ["Product recommendations in chat", "Cart recovery and order updates", "Post-purchase support in your store"],
    stack: ["Shopify", "WooCommerce", "OpenAI", "Klaviyo"],
  },
  "ai-5": {
    image: "/img/services/stages/ai-5.png",
    alt: "One bot live on the website widget, WhatsApp, Telegram, Slack and SMS",
    deliverables: ["One bot on every channel", "Shared knowledge and conversation history", "Channel-specific formatting"],
    stack: ["WhatsApp", "Telegram", "Slack", "Web widget"],
  },
  "ai-6": {
    image: "/img/services/stages/ai-6.png",
    alt: "Bot analytics with conversations, resolution rate and a retraining scheduled",
    deliverables: ["Conversation and resolution analytics", "Fallback monitoring and retraining", "Monthly performance reviews"],
    stack: ["Langfuse", "Mixpanel", "OpenAI", "Looker Studio"],
  },
  "qa-1": {
    image: "/img/services/stages/qa-1.png",
    alt: "Test run results with passes, a failed case and a high severity bug report",
    deliverables: ["Exploratory and regression testing", "Acceptance testing before each release", "Clear bug reports with steps to reproduce"],
    stack: ["Jira", "TestRail", "BrowserStack", "Postman"],
  },
  "qa-2": {
    image: "/img/services/stages/qa-2.png",
    alt: "Playwright run with every automated spec passing on a pull request",
    deliverables: ["Automated suites for critical flows", "Tests run on every pull request", "Fewer regressions reach production"],
    stack: ["Playwright", "Cypress", "Selenium", "GitHub Actions"],
  },
  "qa-3": {
    image: "/img/services/stages/qa-3.png",
    alt: "Device matrix with iPhone, Pixel and Galaxy results across key flows",
    deliverables: ["Real device testing on iOS and Android", "Screen size and OS version coverage", "Crash and performance checks"],
    stack: ["BrowserStack", "TestFlight", "Firebase", "Appium"],
  },
  "qa-4": {
    image: "/img/services/stages/qa-4.png",
    alt: "Load test with response time, throughput and error rate under 2,000 virtual users",
    deliverables: ["Load and stress testing", "Bottleneck analysis and fixes", "Capacity planning for growth"],
    stack: ["k6", "JMeter", "Grafana", "New Relic"],
  },
  "qa-5": {
    image: "/img/services/stages/qa-5.png",
    alt: "Security report with findings grouped by severity and a retest scheduled",
    deliverables: ["OWASP-based vulnerability assessment", "Penetration testing of web and APIs", "Report with prioritised fixes"],
    stack: ["OWASP ZAP", "Burp Suite", "Snyk", "Nmap"],
  },
  "qa-6": {
    image: "/img/services/stages/qa-6.png",
    alt: "Bug report with steps to reproduce linked to a traced test plan",
    deliverables: ["Test plans and test cases", "Bug reports with steps to reproduce", "Traceability from requirement to test"],
    stack: ["Jira", "TestRail", "Confluence", "Loom"],
  },
  "pitch-1": {
    image: "/img/services/stages/pitch-1.png",
    alt: "Seed deck slide on the problem with speaker notes",
    deliverables: ["A clear story arc from problem to ask", "Slide-by-slide outline before design", "Messaging investors remember"],
    stack: ["Figma", "PowerPoint", "Keynote", "Google Slides"],
  },
  "pitch-2": {
    image: "/img/services/stages/pitch-2.png",
    alt: "Market sizing slide with TAM, SAM and SOM and cited sources",
    deliverables: ["Market sizing that reads at a glance", "Financials and traction as clear charts", "Data checked and sourced"],
    stack: ["Figma", "PowerPoint", "Excel", "Flourish"],
  },
  "pitch-3": {
    image: "/img/services/stages/pitch-3.png",
    alt: "Deck overview of twelve slides built on master layouts",
    deliverables: ["Slides designed in your brand", "A consistent layout system", "Polished visuals for every section"],
    stack: ["Figma", "Keynote", "PowerPoint", "Google Slides"],
  },
  "pitch-4": {
    image: "/img/services/stages/pitch-4.png",
    alt: "The ask slide showing use of funds for a $1.5M raise",
    deliverables: ["Problem, solution, market and traction", "Team, business model and the ask", "Structured for Seed to Series C"],
    stack: ["Figma", "PowerPoint", "DocSend", "Notion"],
  },
  "pitch-5": {
    image: "/img/services/stages/pitch-5.png",
    alt: "Launch deck slide on automated reports next to a demo slide",
    deliverables: ["Sales decks that close deals", "Product launch presentations", "Partnership and demo decks"],
    stack: ["Figma", "PowerPoint", "Pitch", "Loom"],
  },
  "pitch-6": {
    image: "/img/services/stages/pitch-6.png",
    alt: "Presenter view with speaker notes, a timer and a rehearsal booked",
    deliverables: ["Speaker notes for every slide", "Rehearsal session before the pitch", "Answers ready for tough questions"],
    stack: ["PowerPoint", "Keynote", "Google Slides", "Zoom"],
  },
  "marketing-1": {
    image: "/img/services/stages/marketing-1.png",
    alt: "Search results with a first position ranking and an organic clicks chart",
    deliverables: ["Technical SEO audit and fixes", "Keyword research and content plan", "On-page optimisation and link building"],
    stack: ["Search Console", "GA4", "Ahrefs", "Screaming Frog"],
  },
  "marketing-2": {
    image: "/img/services/stages/marketing-2.png",
    alt: "Ad campaigns across Google, Meta, LinkedIn and TikTok with cost per lead falling",
    deliverables: ["Google, Meta, LinkedIn and TikTok campaigns", "Creative and audience testing", "Budgets optimised for conversions"],
    stack: ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads"],
  },
  "marketing-3": {
    image: "/img/services/stages/marketing-3.png",
    alt: "Weekly social content calendar with follower growth",
    deliverables: ["Content calendar for every platform", "Community management and replies", "Growth strategy and reporting"],
    stack: ["Instagram", "LinkedIn", "TikTok", "Buffer"],
  },
  "marketing-4": {
    image: "/img/services/stages/marketing-4.png",
    alt: "Sponsored search ad above a competitor with bid strategy settings",
    deliverables: ["Targeted search campaigns", "Smart bidding and A/B testing", "Conversion tracking on every ad"],
    stack: ["Google Ads", "Microsoft Ads", "GA4", "Tag Manager"],
  },
  "marketing-5": {
    image: "/img/services/stages/marketing-5.png",
    alt: "Product update email inside an automated flow with its open rate",
    deliverables: ["Automated drip and lifecycle flows", "Newsletters your audience opens", "Segments and A/B tested subject lines"],
    stack: ["Klaviyo", "Mailchimp", "HubSpot", "Customer.io"],
  },
  "marketing-6": {
    image: "/img/services/stages/marketing-6.png",
    alt: "Marketing dashboard with sessions, conversions and ROAS by channel",
    deliverables: ["Custom dashboards for every channel", "Monthly reports with clear next steps", "Conversion tracking set up properly"],
    stack: ["GA4", "Looker Studio", "Tag Manager", "Hotjar"],
  },
  "staff-1": {
    image: "/img/services/stages/staff-1.png",
    alt: "Sprint board with tasks and a senior engineer matched in 48 hours",
    deliverables: ["Vetted senior developers", "Embedded in your sprints from week one", "Flexible engagement, scale up or down"],
    stack: ["React", "Node.js", "Python", "Laravel"],
  },
  "staff-2": {
    image: "/img/services/stages/staff-2.png",
    alt: "Shortlist of product designers available now with a portfolio review booked",
    deliverables: ["Product and visual designers on demand", "Figma natives who work in your files", "Designers who collaborate with developers"],
    stack: ["Figma", "FigJam", "Maze", "Framer"],
  },
  "staff-3": {
    image: "/img/services/stages/staff-3.png",
    alt: "Pull request checks with unit, E2E and visual tests passing",
    deliverables: ["Manual and automation testers", "Embedded in your release pipeline", "Quality sign-off before every deploy"],
    stack: ["Playwright", "Cypress", "Jira", "TestRail"],
  },
  "staff-4": {
    image: "/img/services/stages/staff-4.png",
    alt: "Project roadmap timeline with a weekly status report on track",
    deliverables: ["Clear scope and honest timelines", "Weekly status reports", "One point of contact for your team"],
    stack: ["Jira", "Linear", "Notion", "Slack"],
  },
  "staff-5": {
    image: "/img/services/stages/staff-5.png",
    alt: "Deploy pipeline from build to production with uptime stats",
    deliverables: ["CI/CD pipelines that just work", "Cloud infrastructure as code", "Monitoring and incident response"],
    stack: ["AWS", "Docker", "Terraform", "GitHub Actions"],
  },
  "staff-6": {
    image: "/img/services/stages/staff-6.png",
    alt: "Lighthouse scores of 98, 100, 100 and 96 with SSL and headers rated A+",
    deliverables: ["Security hardening and SSL", "CDN, caching and image optimisation", "Core Web Vitals passing"],
    stack: ["Cloudflare", "Lighthouse", "Snyk", "Sentry"],
  },
};

/* One panel per tab, from the Figma "Capability panels" developer handoff
 * frame on the Screens page (one row per service, one column per tab). */
export const SERVICE_CAPABILITIES: Record<string, ServiceCapabilities> = {
  web: {
    title: "Everything from interface to infrastructure.",
    body: "Six capabilities, one delivery team. Pick a layer to see what we build and what you walk away with.",
    tabs: [
      { title: "Frontend development", body: "React, Next.js and Vue interfaces that stay pixel perfect and fast on every device.", panel: "web-1" },
      { title: "Backend development", body: "Node.js, Django and Laravel services with robust APIs and architecture built for growth.", panel: "web-2" },
      { title: "Full stack and SaaS", body: "Dashboards, portals and ecommerce on a scalable architecture, from concept to launch.", panel: "web-3" },
      { title: "WordPress development", body: "Custom themes, plugins and WooCommerce your team can edit with confidence.", panel: "web-4" },
      { title: "Framer websites", body: "Fast marketing sites with advanced animation, CMS and no-code flexibility.", panel: "web-5" },
      { title: "Security and performance", body: "SSL, CDN, hardening and Core Web Vitals work that keeps your product fast and safe.", panel: "web-6" },
    ],
  },
  mobile: {
    title: "Everything from first screen to App Store.",
    body: "Six capabilities, one team. Pick one to see what we build and what you walk away with.",
    tabs: [
      { title: "iOS development", body: "Native Swift apps for iPhone and iPad with full Apple ecosystem integration.", panel: "mobile-1" },
      { title: "Android development", body: "Kotlin apps optimised for the full range of Android devices and screen sizes.", panel: "mobile-2" },
      { title: "Cross-platform apps", body: "React Native and Flutter apps that share code and still feel native on both platforms.", panel: "mobile-3" },
      { title: "API and backend integration", body: "REST and GraphQL APIs, third-party integrations, push notifications and cloud backends.", panel: "mobile-4" },
      { title: "In-app purchases and subscriptions", body: "Subscriptions, one-time purchases, freemium models and payment gateway setup.", panel: "mobile-5" },
      { title: "App Store launch and ASO", body: "App Store and Play Store submission, optimisation and post-launch support.", panel: "mobile-6" },
    ],
  },
  design: {
    title: "Everything design, under one roof.",
    body: "Six capabilities, one team. Pick one to see what we design and what you walk away with.",
    tabs: [
      { title: "UI design", body: "Conversion-focused interfaces in Figma with atomic design systems and developer-ready handoff.", panel: "design-1" },
      { title: "UX research and strategy", body: "Interviews, journey mapping, wireframes and usability testing to validate every decision.", panel: "design-2" },
      { title: "Graphic design", body: "Logos, guidelines, marketing collateral and social visuals for every touchpoint.", panel: "design-3" },
      { title: "Brand identity", body: "Full brand development, from naming to visual language.", panel: "design-4" },
      { title: "Design systems", body: "Component libraries and design tokens that keep your product consistent as it grows.", panel: "design-5" },
      { title: "Interaction design and prototyping", body: "Interactive prototypes for stakeholder buy-in, investor demos and user testing.", panel: "design-6" },
    ],
  },
  ai: {
    title: "Intelligent bots, real business results.",
    body: "Six capabilities, one team. Pick one to see what we build and what you walk away with.",
    tabs: [
      { title: "AI support bots", body: "Bots that handle FAQs, tickets, order tracking and escalation to reduce support load.", panel: "ai-1" },
      { title: "Lead generation bots", body: "Qualify, capture and route leads around the clock, synced with your CRM.", panel: "ai-2" },
      { title: "Internal HR and operations bots", body: "Onboarding, IT helpdesk, policy Q&A and internal knowledge base chatbots.", panel: "ai-3" },
      { title: "E-commerce assistants", body: "Product recommendations, cart recovery and post-purchase support in your store.", panel: "ai-4" },
      { title: "Multi-platform deployment", body: "Deploy on your website, WhatsApp, Telegram, Slack and more.", panel: "ai-5" },
      { title: "Analytics and optimisation", body: "Conversation analytics, fallback monitoring and continuous fine-tuning.", panel: "ai-6" },
    ],
  },
  qa: {
    title: "Quality at every layer.",
    body: "Six capabilities, one team. Pick one to see how we test and what you walk away with.",
    tabs: [
      { title: "Manual testing", body: "Exploratory, regression, smoke and acceptance testing by engineers who think like your users.", panel: "qa-1" },
      { title: "Automation testing", body: "Selenium, Cypress and Playwright suites that catch regressions with every push.", panel: "qa-2" },
      { title: "Mobile QA", body: "Real device testing across iOS and Android versions, screen sizes and OS combinations.", panel: "qa-3" },
      { title: "Performance testing", body: "Load, stress and bottleneck analysis so your app holds up under real traffic.", panel: "qa-4" },
      { title: "Security testing", body: "OWASP-based vulnerability assessments, penetration tests and audit reports.", panel: "qa-5" },
      { title: "QA documentation and bug tracking", body: "Test plans, test cases, bug reports and traceability with every engagement.", panel: "qa-6" },
    ],
  },
  pitch: {
    title: "Decks that investors remember.",
    body: "Six capabilities, one team. Pick one to see what we craft and what you walk away with.",
    tabs: [
      { title: "Story and narrative", body: "We find the through line that makes investors feel the problem before they see the solution.", panel: "pitch-1" },
      { title: "Data visualisation", body: "Market data, financials and metrics turned into clear, compelling slides.", panel: "pitch-2" },
      { title: "Visual slide design", body: "Premium slides that reflect your brand and command attention in any room.", panel: "pitch-3" },
      { title: "Investor decks for Series A, B and C", body: "Problem, solution, market, traction, team and ask, structured for fundraising.", panel: "pitch-4" },
      { title: "SaaS pitch and launch decks", body: "Sales decks and partnership presentations designed to drive action.", panel: "pitch-5" },
      { title: "Speaker notes and prep", body: "Full speaker notes with every deck, so you are ready to deliver.", panel: "pitch-6" },
    ],
  },
  marketing: {
    title: "Full funnel growth on every channel.",
    body: "Six capabilities, one team. Pick one to see what we run and what you walk away with.",
    tabs: [
      { title: "SEO services", body: "Technical audits, on-page optimisation, keyword research, content and link building.", panel: "marketing-1" },
      { title: "Paid ads and PPC", body: "Google, Meta, LinkedIn and TikTok campaigns built for conversions, not just clicks.", panel: "marketing-2" },
      { title: "Social media marketing", body: "Content calendars, community management and growth strategies for every platform.", panel: "marketing-3" },
      { title: "Search engine advertising", body: "Targeted campaigns with smart bidding, A/B testing and conversion optimisation.", panel: "marketing-4" },
      { title: "Email marketing", body: "Automated drips, newsletters and lifecycle emails that nurture leads.", panel: "marketing-5" },
      { title: "Analytics and reporting", body: "Custom dashboards and monthly reports so you know what to do next.", panel: "marketing-6" },
    ],
  },
  staff: {
    title: "Your team, extended.",
    body: "Six roles, one partner. Pick one to see who we place and what you walk away with.",
    tabs: [
      { title: "Frontend and backend developers", body: "React, Next.js, Node, Python and Laravel engineers embedded in your sprints from week one.", panel: "staff-1" },
      { title: "UI/UX designers", body: "Product and visual designers who collaborate, not just decorate.", panel: "staff-2" },
      { title: "QA engineers", body: "Manual and automation testers who hold the quality bar inside your pipeline.", panel: "staff-3" },
      { title: "Project managers", body: "PMs who keep scope tight, communication clear and timelines honest.", panel: "staff-4" },
      { title: "DevOps engineers", body: "CI/CD, cloud infrastructure and deployment pipelines that keep systems stable.", panel: "staff-5" },
      { title: "Security and performance", body: "SSL, CDN, hardening and Core Web Vitals work that keeps your product fast and safe.", panel: "staff-6" },
    ],
  },
};
