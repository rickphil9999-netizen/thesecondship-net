export type BlogEntry = {
  slug: string;
  type: "post" | "page";
  title: string;
  /** Original WordPress publish date, site-local time (ISO without zone). */
  date: string;
  dateLabel: string;
  year: number;
  excerpt: string;
  commentCount: number;
  words: number;
  image: string | null;
  /** Optional alt text for the catalog/featured image. Falls back to the post title. */
  imageAlt?: string;
  /** Where the entry lived on rhoagenda.me before the move. */
  oldUrl: string;
};

export type BlogComment = {
  id: number;
  author: string;
  isAuthor: boolean;
  date: string;
  dateLabel: string;
  /** Sanitized at import time. */
  html: string;
  replies: BlogComment[];
};

export type BlogContent = {
  slug: string;
  /** Sanitized at import time. */
  html: string;
  featuredImage: string | null;
  /** Optional alt text for featuredImage. Falls back to BlogEntry.imageAlt, then the post title. */
  featuredImageAlt?: string;
  comments: BlogComment[];
};
