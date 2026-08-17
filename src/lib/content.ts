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
    href: "/case-study",
  },
  {
    pill: "Website Design",
    title: "Skin Care Brand",
    body: "Website design for an international skincare brand with a premium visual approach built to reflect product quality and convert visitors.",
    metric: "3×",
    metricLabel: "faster activation",
    image: "/img/projects/skincare.png",
    href: "/case-study/lend-saas",
  },
  {
    pill: "E-commerce Mobile App",
    title: "CSD Pakistan",
    body: "End-to-end mobile app UI/UX design for one of Pakistan's largest retail networks, designed for scale and ease of use.",
    metric: "2.1×",
    metricLabel: "demo requests",
    image: "/img/projects/csd-pakistan.png",
    href: "/case-study/lend-hub",
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
