import { JOURNAL_ENTRIES } from "./entries.gen";
import type { JournalContent, JournalEntry } from "./types";

export type { JournalComment, JournalContent, JournalEntry } from "./types";

/** Newest first. */
export const JOURNAL_POSTS: JournalEntry[] = JOURNAL_ENTRIES.filter(
  (e) => e.type === "post",
);

export const JOURNAL_PAGES: JournalEntry[] = JOURNAL_ENTRIES.filter(
  (e) => e.type === "page",
);

const BY_SLUG = new Map(JOURNAL_ENTRIES.map((e) => [e.slug, e]));

export function getJournalEntry(slug: string): JournalEntry | undefined {
  return BY_SLUG.get(slug);
}

export function journalPostsByYear(): { year: number; posts: JournalEntry[] }[] {
  const groups: { year: number; posts: JournalEntry[] }[] = [];
  for (const post of JOURNAL_POSTS) {
    const last = groups[groups.length - 1];
    if (last && last.year === post.year) last.posts.push(post);
    else groups.push({ year: post.year, posts: [post] });
  }
  return groups;
}

/** Older and newer neighbours of a post (pages have none). */
export function journalNeighbors(slug: string): {
  older?: JournalEntry;
  newer?: JournalEntry;
} {
  const i = JOURNAL_POSTS.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { newer: JOURNAL_POSTS[i - 1], older: JOURNAL_POSTS[i + 1] };
}

// One lazily loaded chunk per entry, so post bodies and comment archives
// never ship with the home page or the Journal index.
const CONTENT = import.meta.glob<JournalContent>("./content/*.json", {
  import: "default",
});

export async function loadJournalContent(
  slug: string,
): Promise<JournalContent | undefined> {
  const load = CONTENT[`./content/${slug}.json`];
  return load ? load() : undefined;
}
