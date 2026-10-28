/* ============================================================
   Careers — copy from the Figma "Careers" section (6283:85746).
   ============================================================ */

export const CAREERS_EMAIL = "careers@devnscale.com";

export const CAREERS_HERO = {
  eyebrow: "CAREERS",
  title: "Build What’s Next With Us.",
  subtitle:
    "We’re Designers, Developers And Marketers Shipping Real Products For Clients In Pakistan, The US And Europe. If You Care About Craft And Like Owning Your Work, You’ll Fit Right In.",
};

export type Job = {
  title: string;
  department: "Marketing" | "Design";
  summary: string;
  type: string;
  location: string;
  experience: string;
};

export const JOBS: Job[] = [
  {
    title: "Digital Marketing Specialist",
    department: "Marketing",
    summary:
      "Plan, launch and optimise paid and organic campaigns across Meta, Google and LinkedIn for our clients and for Dev N Scale.",
    type: "Full-time",
    location: "Islamabad, hybrid",
    experience: "2+ years",
  },
  {
    title: "SEO Specialist",
    department: "Marketing",
    summary:
      "Own technical and on-page SEO for client websites, from audits and keyword strategy to content briefs and monthly reporting.",
    type: "Full-time",
    location: "Islamabad, hybrid",
    experience: "2+ years",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    summary:
      "Design web and mobile products end to end in Figma, from user flows and wireframes to polished UI and clean developer handoff.",
    type: "Full-time",
    location: "Islamabad, hybrid",
    experience: "3+ years",
  },
];

export const CAREERS_ROLES = {
  title: "Open Roles.",
  subtitle: "Three positions open right now. All roles are full-time, based in our Islamabad office with hybrid days.",
  openTitle: "Don’t see your role?",
  openBody: `We’re always glad to meet good people. Send your CV or portfolio to ${CAREERS_EMAIL} and tell us what you’d like to work on.`,
};

export const HIRING = {
  title: "How Hiring Works.",
  subtitle: "Four steps, usually done within two weeks. You will always know where you stand and what comes next.",
  steps: [
    { day: "DAY 1", title: "Apply", duration: "Reply within 5 days", icon: "send", body: "Send your CV, portfolio or a few links that show your best work." },
    { day: "DAY 5", title: "Intro call", duration: "30 - 60 minutes", icon: "chat", body: "A relaxed 30 minute call with the team lead about your work and what you want next." },
    { day: "DAY 9", title: "Practical task", duration: "3 to 4 hours", icon: "pen", body: "A short, paid task based on a real brief, reviewed together with you afterwards." },
    { day: "DAY 14", title: "Offer", duration: "Within a week", icon: "check", body: "Meet the founders, agree the details and pick a start date that works for you." },
  ],
} as const;

export const WHY_JOIN = {
  title: "Why People Stay.",
  subtitle: "Small teams, real clients and room to grow. Here is what working at Dev N Scale looks like day to day.",
  perks: [
    { icon: "globe", title: "Real products, real users", body: "You ship work that goes live for paying clients, not internal demos that never launch." },
    { icon: "user", title: "Senior people next to you", body: "Reviews and pairing with leads who have shipped dozens of products, every single week." },
    { icon: "star", title: "Budget to keep learning", body: "A yearly allowance for courses, books and conference tickets that you choose yourself." },
    { icon: "pin", title: "Hybrid in Islamabad", body: "A studio office in Pakistan Town with flexible home days once you are settled in." },
  ],
} as const;
