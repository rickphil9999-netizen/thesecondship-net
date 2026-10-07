import { BLOG_ENTRIES } from "./entries.gen";
import type { BlogContent, BlogEntry } from "./types";

export type { BlogComment, BlogContent, BlogEntry } from "./types";

/** Newest first. */
export const BLOG_POSTS: BlogEntry[] = BLOG_ENTRIES.filter(
  (e) => e.type === "post",
);

export const BLOG_PAGES: BlogEntry[] = BLOG_ENTRIES.filter(
  (e) => e.type === "page",
);

const BY_SLUG = new Map(BLOG_ENTRIES.map((e) => [e.slug, e]));

export function getBlogEntry(slug: string): BlogEntry | undefined {
  return BY_SLUG.get(slug);
}

export function blogPostsByYear(): { year: number; posts: BlogEntry[] }[] {
  const groups: { year: number; posts: BlogEntry[] }[] = [];
  for (const post of BLOG_POSTS) {
    const last = groups[groups.length - 1];
    if (last && last.year === post.year) last.posts.push(post);
    else groups.push({ year: post.year, posts: [post] });
  }
  return groups;
}

/** Older and newer neighbours of a post (pages have none). */
export function blogNeighbors(slug: string): {
  older?: BlogEntry;
  newer?: BlogEntry;
} {
  const i = BLOG_POSTS.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { newer: BLOG_POSTS[i - 1], older: BLOG_POSTS[i + 1] };
}

// One lazily loaded chunk per entry, so post bodies and comment archives
// never ship with the home page or the Blog index.
const CONTENT = import.meta.glob<BlogContent>("./content/*.json", {
  import: "default",
});

export async function loadBlogContent(
  slug: string,
): Promise<BlogContent | undefined> {
  const load = CONTENT[`./content/${slug}.json`];
  return load ? load() : undefined;
}
