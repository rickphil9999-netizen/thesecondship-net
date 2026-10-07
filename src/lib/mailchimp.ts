// Mailchimp embedded signup for the "Richard Phillips Readers" audience.
// Submits through Mailchimp's JSONP endpoint so the visitor stays on the page.
// The plain form POST (MAILCHIMP_ACTION) is the no-JavaScript fallback.

export const MAILCHIMP_ACTION =
  "https://thesecondship.us7.list-manage.com/subscribe/post?u=1bb614e472e66d87e93351839&id=bb7a7bd11e&f_id=008daee4f0";

/** Bot trap field. Real visitors never see or fill it. */
export const MAILCHIMP_HONEYPOT = "b_1bb614e472e66d87e93351839_bb7a7bd11e";

const JSONP_TIMEOUT_MS = 15000;

export type MailchimpResult = { result: "success" | "error"; msg: string };

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Mailchimp messages can contain HTML links and a "0 - " field prefix. */
export function cleanMailchimpMessage(msg: unknown): string {
  let text = typeof msg === "string" ? msg : "";
  if (typeof DOMParser !== "undefined") {
    text = new DOMParser().parseFromString(text, "text/html").body.textContent ?? "";
  } else {
    text = text.replace(/<[^>]*>/g, "");
  }
  return text
    .replace(/^\s*\d+\s+-\s+/, "")
    // Mailchimp's "Click here ..." links make no sense once the HTML is gone.
    .replace(/\s*Click here[^.]*\.?\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function mailchimpJsonpUrl(
  fields: Record<string, string>,
  callback: string,
): string {
  const url = new URL(MAILCHIMP_ACTION.replace("/post?", "/post-json?"));
  for (const [k, v] of Object.entries(fields)) url.searchParams.set(k, v);
  url.searchParams.set("c", callback);
  return url.toString();
}

/**
 * Loads the JSONP URL with a script tag and resolves with Mailchimp's reply.
 * Rejects if the script fails to load or nothing comes back in time.
 */
export function subscribeJsonp(fields: Record<string, string>): Promise<MailchimpResult> {
  return new Promise((resolve, reject) => {
    const callback = `rpSignup_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    const w = window as unknown as Record<string, unknown>;
    const script = document.createElement("script");
    let done = false;

    const cleanup = () => {
      done = true;
      window.clearTimeout(timer);
      script.remove();
      // Keep a no-op in place in case a late reply still arrives.
      w[callback] = () => {};
    };

    const timer = window.setTimeout(() => {
      if (done) return;
      cleanup();
      reject(new Error("timeout"));
    }, JSONP_TIMEOUT_MS);

    w[callback] = (data: { result?: string; msg?: unknown }) => {
      if (done) return;
      cleanup();
      resolve({
        result: data?.result === "success" ? "success" : "error",
        msg: cleanMailchimpMessage(data?.msg),
      });
    };

    script.src = mailchimpJsonpUrl(fields, callback);
    script.async = true;
    script.onerror = () => {
      if (done) return;
      cleanup();
      reject(new Error("network"));
    };
    document.body.appendChild(script);
  });
}
