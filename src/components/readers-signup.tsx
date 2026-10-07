import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  MAILCHIMP_ACTION,
  MAILCHIMP_HONEYPOT,
  isValidEmail,
  subscribeJsonp,
} from "@/lib/mailchimp";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; msg: string }
  | { kind: "error"; msg: string };

const SUCCESS_MSG =
  "Almost done, check your email to confirm your subscription.";

export function ReadersSignup({
  className,
  eyebrow = "Readers list",
  heading = "Join Richard’s readers list",
  copy = "New books, early excerpts, and blog posts, straight to your inbox. No spam, unsubscribe anytime.",
}: {
  className?: string;
  eyebrow?: string;
  heading?: string;
  copy?: string;
}) {
  const id = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [emailError, setEmailError] = useState<string | null>(null);
  // If the inline request cannot reach Mailchimp, the next submit becomes a
  // regular form POST that opens Mailchimp's own page in a new tab.
  const [useFormPost, setUseFormPost] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    if (!isValidEmail(email)) {
      e.preventDefault();
      setEmailError("Please enter a valid email address, like name@example.com.");
      emailRef.current?.focus();
      return;
    }
    setEmailError(null);
    if (useFormPost) return; // let the browser submit the form normally

    e.preventDefault();
    const honeypot = (
      e.currentTarget.elements.namedItem(MAILCHIMP_HONEYPOT) as HTMLInputElement | null
    )?.value;
    setStatus({ kind: "sending" });
    try {
      const res = await subscribeJsonp({
        EMAIL: email.trim(),
        FNAME: firstName.trim(),
        [MAILCHIMP_HONEYPOT]: honeypot ?? "",
      });
      if (res.result === "success") {
        setStatus({ kind: "success", msg: SUCCESS_MSG });
        setEmail("");
        setFirstName("");
      } else {
        setStatus({
          kind: "error",
          msg: res.msg || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setUseFormPost(true);
      setStatus({
        kind: "error",
        msg: "We couldn’t reach the signup service. Press Join again to finish on Mailchimp’s page in a new tab.",
      });
    }
  }

  const sending = status.kind === "sending";
  const describedBy = [
    emailError ? `${id}-email-err` : null,
    status.kind === "error" ? `${id}-status` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      aria-labelledby={`${id}-h`}
      className={cn(
        "rounded-xl border border-border bg-card p-6 sm:p-8",
        className,
      )}
    >
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 id={`${id}-h`} className="mt-3 font-display text-3xl sm:text-4xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {copy}
      </p>

      {/* Always rendered so screen readers announce the confirmation. */}
      <div role="status" aria-live="polite">
        {status.kind === "success" ? (
          <p className="mt-6 rounded-md border border-border bg-secondary px-4 py-3 text-sm text-foreground">
            {status.msg}
          </p>
        ) : null}
      </div>

      {status.kind === "success" ? null : (
        <form
          action={MAILCHIMP_ACTION}
          method="post"
          target="_blank"
          noValidate
          onSubmit={onSubmit}
          className="mt-6"
        >
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] sm:items-end">
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${id}-fname`}>
                First name{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id={`${id}-fname`}
                name="FNAME"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                disabled={sending}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                ref={emailRef}
                id={`${id}-email`}
                name="EMAIL"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={describedBy || undefined}
                placeholder="you@example.com"
                disabled={sending}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto" disabled={sending}>
              {sending ? "Joining…" : "Join"}
            </Button>
          </div>

          {/* Bot trap: hidden from people and screen readers. */}
          <div aria-hidden="true" className="absolute left-[-5000px]">
            <input type="text" name={MAILCHIMP_HONEYPOT} tabIndex={-1} defaultValue="" />
          </div>

          {emailError ? (
            <p id={`${id}-email-err`} className="mt-3 text-sm text-[#e0a397]">
              {emailError}
            </p>
          ) : null}
          <p
            id={`${id}-status`}
            role="alert"
            className={cn(
              "text-sm",
              status.kind === "error" ? "mt-3 text-[#e0a397]" : "sr-only",
            )}
          >
            {status.kind === "error" ? status.msg : ""}
          </p>
        </form>
      )}
    </section>
  );
}
