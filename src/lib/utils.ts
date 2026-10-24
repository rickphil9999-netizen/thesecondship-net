import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function amazonDp(asin: string) {
  return `https://www.amazon.com/dp/${asin}`;
}

/**
 * Trim to the last whole word within `max` characters.
 * Text that already fits is returned unchanged. A cut ends with an ellipsis.
 */
export function truncateAtWord(text: string, max = 160): string {
  if (text.length <= max) return text;

  const window = text.slice(0, max);
  const next = text.charAt(max);
  const onBoundary = /\s/.test(next) || /\s$/.test(window);
  const space = window.lastIndexOf(" ");
  const cut = onBoundary || space <= 0 ? window : window.slice(0, space);
  const trimmed = cut.trimEnd().replace(/[,;:]+$/u, "");
  return `${trimmed}…`;
}
