export type NewsItem = {
  title: string;
  date: string;
  /** Slug of the Blog post at /blog/$slug. */
  slug: string;
  dek: string;
};

export const NEWS: NewsItem[] = [
  {
    title: "The Storm Is Coming — a first look at Unpunished",
    date: "September 29, 2025",
    slug: "the-storm-is-coming-a-first-look-at-unpunished",
    dek: "A raw excerpt from Book Two of the Rho Agenda Singularity: Rob Gregory, a storm, and an AI-managed world that cannot admit what is happening.",
  },
  {
    title: "The Ripper’s Son — live on Amazon",
    date: "May 10, 2025",
    slug: "the-rippers-son-live-on-amazon",
    dek: "Book One of the Singularity launches. Rob Gregory. Tuscany. A superintelligence that says it is afraid.",
  },
  {
    title: "The Ripper’s Son audiobook",
    date: "May 26, 2025",
    slug: "the-rippers-son-audiobook-is-coming-june-10th-as-an-audible-exclusive",
    dek: "The audiobook follows the Kindle edition as an Audible exclusive.",
  },
];
