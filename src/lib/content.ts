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

export const PROJECTS = [
  {
    pill: "FinTech Mobile App Design",
    title: "Merchant Cash Advance Calculator (MCA)",
    body: "MCA professionals often rely on multiple tools to calculate deals, manage templates, and review previous calculations. We designed one connected experience to bring these tasks together in a faster, more organized workflow.",
    metric: "38+",
    metricLabel: "Screens Designed",
    image: "/img/projects/halo-health-mca.png",
  },
  {
    pill: "Website Design",
    title: "Skin Care Brand",
    body: "Website design for an international skincare brand with a premium visual approach built to reflect product quality and convert visitors.",
    metric: "3×",
    metricLabel: "faster activation",
    image: "/img/projects/skincare.png",
  },
  {
    pill: "E-commerce Mobile App",
    title: "CSD Pakistan",
    body: "End-to-end mobile app UI/UX design for one of Pakistan's largest retail networks, designed for scale and ease of use.",
    metric: "2.1×",
    metricLabel: "demo requests",
    image: "/img/projects/csd-pakistan.png",
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
    heading: "We Launch And Scale",
    body: "Going live with the support you need to keep growing after launch.",
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
  { icon: "mail", label: "EMAIL", value: "hello@devnscale.com" },
  { icon: "phone", label: "PHONE", value: "+49 211 000 000" },
  { icon: "pin", label: "OFFICE", value: "Düsseldorf, Germany" },
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

export const FOOTER_LINKS = {
  main: [
    { label: "Home", href: "/", active: true },
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Careers", href: "#" },
    { label: "Blogs", href: "#" },
  ],
  other: [
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Term & Condition", href: "#" },
  ],
  contact: ["+49 211 555 0199", "hello@devnscale.com"],
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
  title: "From a small studio to a partner at scale.",
  intro:
    "A few hundred products later, the same belief holds — small teams, close to the work, do the best work.",
  milestones: [
    {
      year: "2019",
      title: "Where it started",
      body: "Two people, one rule: design and engineering in the same room. The first products shipped weeks faster for it.",
    },
    {
      year: "2021",
      title: "Built for scale",
      body: "A senior team took shape. We moved from one-off builds to full products — strategy, design, and delivery under one roof.",
    },
    {
      year: "2023",
      title: "Across borders",
      body: "Clients in 50+ countries. Remote by default, senior by design, shipping across time zones without losing the thread.",
    },
    {
      year: "2025",
      title: "Still close to the work",
      body: "500+ projects in, the model hasn't changed. Small teams, real ownership, software built to last.",
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
    { icon: "mail", label: "Email", value: "hello@devnscale.com" },
    { icon: "phone", label: "Phone", value: "+49 211 555 0199" },
    { icon: "pin", label: "Office", value: "Königsallee 92, Düsseldorf" },
  ],
} as const;

/* ============================================================
   Case Study page — copy from Figma "DEV N SCALE — Case Study" (4850:15665)
   Images are empty frames in Figma → branded placeholders in the build.
   ============================================================ */

export const CASE_STUDY = {
  eyebrow: "CASE STUDY · MCA Calculator",
  title: "Simplifying MCA Calculations Into One Powerful Workflow.",
  subtitle:
    "A smarter way to calculate, manage, and structure Merchant Cash Advances.",
  meta: [
    { value: "2024", label: "YEAR" },
    { value: "UX/UI, Development", label: "SERVICES" },
    { value: "FinTech · Alternative Finance", label: "INDUSTRY" },
    { value: "iOS · Android", label: "PLATFORM" },
  ],
  heroImage: "/img/case/hero.png",
  overview: {
    eyebrow: "THE CHALLENGE",
    title: "From scattered tools to one clear view.",
    body: "MCA professionals often rely on multiple tools to calculate deals, manage templates, and review previous calculations. We designed one connected experience to bring these tasks together in a faster, more organized workflow.",
    stats: [
      { value: "38+", label: "Screens Designed" },
      { value: "120+", label: "Product Components" },
      { value: "100%", label: "Mobile-First Experience" },
    ],
  },
  problem: {
    eyebrow: "THE PROBLEM",
    title: "A system that could grow with the workflow.",
    body: "The challenge was to simplify complex MCA calculations without removing the flexibility professionals need. The experience had to support different deal structures, reusable templates, calculations, and proposals while staying easy to navigate.",
    image: "/img/case/system.png",
  },
  designSystem: {
    eyebrow: "DESIGNED FOR REAL WORK",
    title: "Built for the field, not the boardroom.",
    body: "Every interaction was designed around the way MCA professionals actually work — from entering deal information and running calculations to reviewing results and preparing proposals.",
    image: "/img/case/product.png",
  },
  results: {
    eyebrow: "THE RESULT",
    title: "Faster deals, fewer repeated steps.",
    body: "By bringing calculations, templates, history, and proposals into one product, the experience reduces unnecessary switching and makes repetitive tasks easier to manage.",
    image: "/img/case/results.png",
    stats: [
      { value: "31%", label: "Fewer Workflow Steps" },
      { value: "2.4x", label: "Faster Repeat Calculations" },
    ],
  },
  experience: {
    eyebrow: "THE EXPERIENCE",
    title: "Every screen, working together.",
    body: "From onboarding and user profiles to calculations, templates, history, and proposals, every screen was designed as part of one connected experience with consistent navigation and components.",
    mock1: "/img/case/mock-1.png",
    mock2: "/img/case/mock-2.png",
  },
  gallery: {
    eyebrow: "THE FULL PICTURE",
    title: "Every screen, working together.",
    image: "/img/case/gallery.png",
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
      },
      {
        name: "Ledgerly",
        url: "ledgerly.io.com",
        year: "2025",
        badge: "Web Platform",
        tags: ["Web App", "Design", "QA"],
        cover: "/img/case/cover-ledgerly.png",
      },
    ],
  },
} as const;

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

// 6 case cards. Cover images pulled from the Figma Work grid (only 3
// unique renders — Figma cycles them across the 6 cases). Category
// badge appears top-left on the cover.
export const WORK = {
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
      cover: "/img/case/cover-1.png",
      href: "/case-study",
    },
    {
      name: "Ledgerly",
      url: "ledgerly.io.com",
      year: "2025",
      badge: "Web Platform",
      tags: ["Web App", "Design", "QA"],
      cover: "/img/case/cover-2.png",
      href: "/case-study",
    },
    {
      name: "Northbeam",
      url: "northbeam.co",
      year: "2024",
      badge: "Brand + Site",
      tags: ["Branding", "Website", "SEO"],
      cover: "/img/case/cover-2.png",
      href: "/case-study",
    },
    {
      name: "Aster Studio",
      url: "asterstudio.com",
      year: "2024",
      badge: "SaaS",
      tags: ["UI/UX", "Web App", "Motion"],
      cover: "/img/case/cover-3.png",
      href: "/case-study",
    },
    {
      name: "Fieldnote",
      url: "fieldnote.app",
      year: "2023",
      badge: "Logistics",
      tags: ["Mobile", "Web", "API"],
      cover: "/img/case/cover-3.png",
      href: "/case-study",
    },
    {
      name: "Vantage Labs",
      url: "vantagelabs.ai",
      year: "2023",
      badge: "AI Platform",
      tags: ["AI", "Backend", "QA"],
      cover: "/img/case/cover-1.png",
      href: "/case-study",
    },
  ],
} as const;
