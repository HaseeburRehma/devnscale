/* ============================================================
   Blog — posts from the Figma "Blog" section (6283:85747).
   The MVP article body is transcribed from the "Blog Article" frame; the
   other six posts only exist as cards in Figma, so their bodies are written
   in the same voice and structure and should be reviewed by their authors.
   ============================================================ */

import { TEAM_MEMBERS } from "./content";

export const BLOG_CATEGORIES = ["Engineering", "AI", "Design", "Marketing", "Mobile", "QA", "Strategy"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; by: string }
  | { type: "callout"; title: string; text: string }
  | { type: "figure"; src: string; alt: string; caption: string }
  | { type: "code"; filename: string; code: string };

export type BlogAuthor = { name: string; role: string; photo: string; bio: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** Title Case headline for the article hero, as the Figma header sets it. */
  headline: string;
  excerpt: string;
  subtitle: string;
  category: BlogCategory;
  date: string; // ISO
  author: BlogAuthor;
  cover: string;
  tags: string[];
  featured?: boolean;
  body: BlogBlock[];
};

function author(name: string, role: string, bio: string, title = role): BlogAuthor {
  const m = TEAM_MEMBERS.members.find((x) => x.name === name && x.role === role);
  if (!m?.photo) throw new Error(`No team photo for ${name}`);
  return { name, role: title, photo: m.photo, bio };
}

const FAISAL = author(
  "Faisal",
  "Technical Partner",
  "Faisal leads architecture and delivery on our product builds, from the first scope call to production launch.",
);
const HASEEB = author(
  "Haseeb",
  "AI and ML Developer",
  "Haseeb builds the retrieval, chat and automation features in our AI products, and the evaluation sets that keep them honest.",
);
const USAMA = author(
  "Usama",
  "Product Designer",
  "Usama designs product interfaces and the component libraries behind them, and works closely with our frontend team on handoff.",
);
const ABDUL = author(
  "Abdul Rehman",
  "SEO and Digital Marketing",
  "Abdul runs technical SEO and paid campaigns for our clients, and the launch checks every new site goes through.",
);
const ANAS = author(
  "Anas",
  "Frontend Developer",
  "Anas builds web and mobile frontends, and helps clients choose the right stack before the first line of code.",
);
const UZAIR = author(
  "Uzair",
  "SQA Engineer",
  "Uzair leads quality assurance on our builds, from test plans in week one to the final pass before release.",
);
const ROHAN = author(
  "Rohan",
  "Product Analyst",
  "Rohan shapes product strategy and the story behind it, including the pitch decks founders take to investors.",
);

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "mvp-in-eight-weeks",
    title: "How we ship an MVP in eight weeks without cutting corners",
    headline: "How We Ship An MVP In Eight Weeks Without Cutting Corners.",
    excerpt:
      "Scope that fits, two-week sprints with a demo at the end of each, and a release checklist we never skip. The playbook behind our last twelve launches.",
    subtitle: "Scope That Fits, Two-Week Sprints With A Demo At The End Of Each, And A Release Checklist We Never Skip.",
    category: "Engineering",
    date: "2026-10-24",
    author: FAISAL,
    cover: "/img/blog/mvp-in-eight-weeks.jpg",
    tags: ["MVP", "Product strategy", "Delivery"],
    featured: true,
    body: [
      { type: "p", text: "Most first releases fail in the same way. The scope grows every week, the launch date slips, and by the time the product reaches real users the budget is gone. Over the last twelve launches we settled on a simple rhythm that avoids this: eight weeks, four sprints, one clear goal." },
      { type: "h2", text: "Why eight weeks" },
      { type: "p", text: "Eight weeks is long enough to build something real and short enough that nobody loses focus. It forces the hard conversation early: what does this product need to do on day one, and what can wait until people are actually using it?" },
      { type: "p", text: "It also gives clients a date they can plan around. Marketing, hiring and investor updates all get easier when launch day is fixed and visible from the start." },
      { type: "quote", text: "If a feature can wait until after launch, it waits. The first release has one job: prove the core loop works for real users.", by: "Faisal, Technical Partner" },
      { type: "h2", text: "Week 1: scope that fits" },
      { type: "p", text: "The first week is all about deciding what not to build. We map the core user journey, list every feature anyone has mentioned, and then sort each one into launch, later or never." },
      { type: "list", items: ["One primary user and one core journey, written down in a single page", "Every screen sketched before any code is written", "A fixed launch date agreed with the client in week one"] },
      { type: "callout", title: "Rule of thumb", text: "If a feature needs more than one sprint to explain, it belongs in version two." },
      { type: "h2", text: "Weeks 2 to 7: build in sprints" },
      { type: "p", text: "Weeks two to seven run as three two-week sprints. Each one ends with a live demo on a staging link, so the client sees working software every fortnight instead of status reports." },
      { type: "figure", src: "/img/blog/qa-pass-vs-unit-tests.jpg", alt: "Green check tiles in a row with a bug caught in a net", caption: "Every sprint ends with a demo and a QA pass on real devices, not just the simulator." },
      { type: "p", text: "QA is part of every sprint, not a phase at the end. Bugs found in week three cost minutes to fix; the same bugs found in week eight cost the launch date." },
      { type: "h2", text: "Week 8: the launch checklist" },
      { type: "p", text: "The final week is for hardening, not new features. We run the same checklist on every project, and nothing ships until every line is ticked." },
      { type: "code", filename: "release-checklist.ts", code: 'const releaseChecklist = [\n  "Core flow tested on real devices",\n  "Error tracking and alerts live",\n  "Backups verified with a restore",\n  "Rollback plan written down",\n];' },
      { type: "h2", text: "What we cut, and why" },
      { type: "p", text: "Admin dashboards, advanced settings and most integrations usually wait for version two. None of them help a first user get value, and all of them are easier to design once real usage data exists." },
      { type: "p", text: "The result is a smaller first release that works properly. From there, every new feature is a decision based on what users actually do, not what we guessed in a workshop." },
    ],
  },
  {
    slug: "rag-in-production",
    title: "RAG in production: what we learned building enterprise search",
    headline: "RAG In Production: What We Learned Building Enterprise Search.",
    excerpt: "Chunking, hybrid retrieval and citations. The decisions that took retrieval quality from 65 percent to over 90.",
    subtitle: "Chunking, Hybrid Retrieval And Citations. The Decisions That Took Retrieval Quality From 65 Percent To Over 90.",
    category: "AI",
    date: "2026-10-17",
    author: HASEEB,
    cover: "/img/blog/rag-in-production.jpg",
    tags: ["AI", "RAG", "Search"],
    body: [
      { type: "p", text: "A retrieval-augmented search demo takes an afternoon. Making it answer correctly for thousands of real documents takes much longer. On our enterprise search build, the first version found the right passage about 65 percent of the time. These are the changes that moved it past 90." },
      { type: "h2", text: "Measure before you tune" },
      { type: "p", text: "Before changing anything we wrote an evaluation set: real questions from the client's team, each paired with the passage that answers it. Every change after that was scored against the same set, so we always knew whether we had made things better or just different." },
      { type: "callout", title: "Start small", text: "Fifty good questions with known answers beat five hundred generated ones. Write them with the people who will use the search." },
      { type: "h2", text: "Chunk by meaning, not by length" },
      { type: "p", text: "Fixed-size chunks split tables, lists and procedures in half. Splitting on headings and paragraphs, and keeping each chunk's section title with it, gave the model context that fixed windows threw away." },
      { type: "h2", text: "Hybrid retrieval" },
      { type: "p", text: "Vector search is good at meaning and bad at exact terms like product codes and policy numbers. Keyword search is the opposite. Running both and merging the results fixed most of the misses our evaluation set exposed." },
      { type: "list", items: ["Vector and keyword search run side by side", "Results merged and re-ranked before they reach the model", "Filters for department and document date applied before ranking"] },
      { type: "h2", text: "Citations build trust" },
      { type: "p", text: "Every answer links to the passages it came from. Users check the source when it matters, and when the model has nothing to cite it says so instead of guessing." },
      { type: "quote", text: "An answer without a source is a guess. Show the passage and let people decide.", by: "Haseeb, AI and ML Developer" },
    ],
  },
  {
    slug: "design-systems-developers-want",
    title: "Design systems developers actually want to use",
    headline: "Design Systems Developers Actually Want To Use.",
    excerpt: "Tokens, naming and handoff habits that keep Figma and code in step long after launch.",
    subtitle: "Tokens, Naming And Handoff Habits That Keep Figma And Code In Step Long After Launch.",
    category: "Design",
    date: "2026-10-12",
    author: USAMA,
    cover: "/img/blog/design-systems-developers-want.jpg",
    tags: ["Design systems", "Figma", "Handoff"],
    body: [
      { type: "p", text: "A design system only works if developers reach for it before they write their own button. Most systems that get ignored are not badly designed; they are hard to map to code. These are the habits that keep ours in use." },
      { type: "h2", text: "Tokens first" },
      { type: "p", text: "Colours, spacing, type sizes and radii live as variables in Figma with the same names they have in code. When a developer inspects a frame, they see a token they can paste, not a hex value they have to look up." },
      { type: "code", filename: "tokens.css", code: ":root {\n  --brand-green-950: #012a1c;\n  --accent-lime-500: #bdc61d;\n  --radius-card: 20px;\n  --space-section: 120px;\n}" },
      { type: "h2", text: "Name things the way code does" },
      { type: "p", text: "Component and variant names follow the props developers will write. A button with State=Hover and Size=Small maps straight to a component with state and size props, so nobody has to translate." },
      { type: "list", items: ["Variants mirror props, not visual descriptions", "Every component has a short usage note in Figma", "Deprecated components are marked, not deleted"] },
      { type: "h2", text: "Handoff is a conversation" },
      { type: "p", text: "We review each new component with the developer who will build it before it is marked ready. Ten minutes on a call saves a week of guessing at hover states and empty states." },
      { type: "callout", title: "Rule of thumb", text: "If a developer has to ask how a component behaves, the answer belongs in the component's description." },
    ],
  },
  {
    slug: "technical-seo-launch-checklist",
    title: "The technical SEO checklist we run before every launch",
    headline: "The Technical SEO Checklist We Run Before Every Launch.",
    excerpt: "Crawlability, Core Web Vitals and schema. Twenty checks that stop a new site from starting at zero.",
    subtitle: "Crawlability, Core Web Vitals And Schema. Twenty Checks That Stop A New Site From Starting At Zero.",
    category: "Marketing",
    date: "2026-10-08",
    author: ABDUL,
    cover: "/img/blog/technical-seo-launch-checklist.jpg",
    tags: ["SEO", "Launch", "Performance"],
    body: [
      { type: "p", text: "A new site can launch looking perfect and still be invisible to search engines for months. Most of the reasons are technical and easy to fix before launch, and much harder to fix after. This is the checklist every site we build goes through." },
      { type: "h2", text: "Can search engines reach it?" },
      { type: "list", items: ["robots.txt allows the pages that should rank", "An XML sitemap lists every public page and is submitted", "Every page returns the right status code, including a real 404", "Redirects from the old site are mapped one to one"] },
      { type: "h2", text: "Is it fast on a real phone?" },
      { type: "p", text: "We test Core Web Vitals on a mid-range Android phone over a slow connection, not on a developer laptop. Images are sized and compressed, fonts load without shifting the layout, and nothing blocks the first paint." },
      { type: "callout", title: "Test like a visitor", text: "If the site feels slow on a three-year-old phone, it is slow. Lab scores on a fast laptop hide the problems real users have." },
      { type: "h2", text: "Does it explain itself?" },
      { type: "p", text: "Every page gets a unique title and description, one clear H1, and a canonical URL. Organisation, breadcrumb and article schema help search engines understand what the site is and who runs it." },
      { type: "h2", text: "After launch" },
      { type: "p", text: "We connect Search Console on day one and check coverage and errors weekly for the first month. Most launch issues show up there before they show up in traffic." },
    ],
  },
  {
    slug: "react-native-or-flutter",
    title: "React Native or Flutter? How we choose for each client",
    headline: "React Native Or Flutter? How We Choose For Each Client.",
    excerpt: "Team skills, native features and long-term cost. The four questions that settle it in one call.",
    subtitle: "Team Skills, Native Features And Long-Term Cost. The Four Questions That Settle It In One Call.",
    category: "Mobile",
    date: "2026-10-02",
    author: ANAS,
    cover: "/img/blog/react-native-or-flutter.jpg",
    tags: ["Mobile", "React Native", "Flutter"],
    body: [
      { type: "p", text: "Both frameworks ship excellent apps, so the question is never which one is better. It is which one fits this client, this team and this product. We settle it with four questions." },
      { type: "h2", text: "1. Who maintains it after launch?" },
      { type: "p", text: "If the client's team already writes React or TypeScript, React Native lets them own the app without learning a new language. If they are starting fresh, that advantage disappears." },
      { type: "h2", text: "2. How much native work is there?" },
      { type: "p", text: "Apps that lean on Bluetooth, background location or custom camera work spend more time in native code either way. We check which framework has mature, maintained libraries for the exact features on the roadmap." },
      { type: "h2", text: "3. How custom is the interface?" },
      { type: "p", text: "Flutter draws every pixel itself, which makes highly custom, brand-heavy interfaces consistent across platforms. React Native uses native components, which makes apps feel at home on each platform with less effort." },
      { type: "h2", text: "4. Is there a web app too?" },
      { type: "p", text: "When a product needs a web app alongside mobile, sharing logic and types with a React web codebase is a real saving over the life of the product." },
      { type: "callout", title: "Our default", text: "With no strong pull either way, we pick the stack the client's future team is most likely to hire for." },
    ],
  },
  {
    slug: "qa-pass-vs-unit-tests",
    title: "What a proper QA pass catches that unit tests miss",
    headline: "What A Proper QA Pass Catches That Unit Tests Miss.",
    excerpt: "Real devices, slow networks and odd user paths. Where most launch-day bugs actually come from.",
    subtitle: "Real Devices, Slow Networks And Odd User Paths. Where Most Launch-Day Bugs Actually Come From.",
    category: "QA",
    date: "2026-09-26",
    author: UZAIR,
    cover: "/img/blog/qa-pass-vs-unit-tests.jpg",
    tags: ["QA", "Testing", "Release"],
    body: [
      { type: "p", text: "Unit tests prove that each piece of code does what its developer intended. They cannot prove that the product works for a person on a cheap phone, on a train, who taps the back button at the worst possible moment. That is what a QA pass is for." },
      { type: "h2", text: "Real devices" },
      { type: "p", text: "Simulators do not run out of memory, overheat or have a notch in the wrong place. We test every release on a small set of real phones, including at least one older, slower model." },
      { type: "h2", text: "Bad networks" },
      { type: "p", text: "We throttle the connection, drop it mid-request and switch between Wi-Fi and mobile data. Loading states, retries and offline messages only get tested when the network misbehaves on purpose." },
      { type: "list", items: ["Slow 3G and offline on every key screen", "Requests interrupted halfway through", "App sent to the background during a payment or upload"] },
      { type: "h2", text: "Odd user paths" },
      { type: "p", text: "Real users double-tap submit buttons, paste emoji into phone fields and come back to a form three days later. Exploratory testing follows those paths deliberately, because nobody writes unit tests for them." },
      { type: "quote", text: "Most launch-day bugs are not in the code anyone was worried about. They are in the paths nobody thought a user would take.", by: "Uzair, SQA Engineer" },
    ],
  },
  {
    slug: "pitch-decks-investors-read",
    title: "Pitch decks investors read to the very last slide",
    headline: "Pitch Decks Investors Read To The Very Last Slide.",
    excerpt: "Story first, numbers second, design third. How we structure decks that keep the room listening.",
    subtitle: "Story First, Numbers Second, Design Third. How We Structure Decks That Keep The Room Listening.",
    category: "Strategy",
    date: "2026-09-19",
    author: ROHAN,
    cover: "/img/blog/pitch-decks-investors-read.jpg",
    tags: ["Pitch deck", "Fundraising", "Strategy"],
    body: [
      { type: "p", text: "Investors see a lot of decks, and most lose them in the first few slides. The ones that hold attention are not the most beautiful. They tell a clear story, back it with honest numbers, and only then use design to make both easy to follow." },
      { type: "h2", text: "Story first" },
      { type: "p", text: "Before opening a slide tool we write the deck as a one-page story: the problem, who has it, why now, what you built and why you will win. If the story does not work as plain text, no design will save it." },
      { type: "list", items: ["One idea per slide, stated in the title", "The problem told through a real customer", "A clear ask on the final slide"] },
      { type: "h2", text: "Numbers second" },
      { type: "p", text: "Traction, market size and unit economics should answer the questions the story raises, in the order it raises them. We show fewer numbers, chosen carefully, and make sure every one can be defended in the meeting." },
      { type: "callout", title: "Rule of thumb", text: "If a chart needs explaining, replace it with one sentence and the number that matters." },
      { type: "h2", text: "Design third" },
      { type: "p", text: "Good deck design is mostly restraint: consistent layouts, a single accent colour, and enough white space that each slide reads in a few seconds. The goal is that nobody remembers the design, only the company." },
    ],
  },
];

export const getPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);

/** Minutes at ~220 words a minute, from the article itself rather than a guess. */
export function readMinutes(post: BlogPost) {
  const words = post.body
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : "code" in b ? b.code : ""))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
