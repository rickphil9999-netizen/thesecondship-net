import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AUTHOR } from "@/data/books";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Richard Phillips Novels" },
      {
        name: "description",
        content: `Write Richard Phillips at ${AUTHOR.email}.`,
      },
    ],
  }),
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `${AUTHOR.mailto}?subject=${subject}&body=${body}`;
    toast.success("Opening your mail app.");
  }

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        Direct
      </p>
      <h1 className="mt-3 font-display text-5xl">Contact</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        The fastest path is email. Rights, press, and reader mail all go to the
        same address.
      </p>

      <p className="mt-8 font-display text-3xl">
        <a href={AUTHOR.mailto} className="underline-offset-4 hover:underline">
          {AUTHOR.email}
        </a>
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-12 flex max-w-xl flex-col gap-4 rounded-xl border border-border bg-card p-6"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="c-name">Name</Label>
          <Input
            id="c-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="c-email">Email</Label>
          <Input
            id="c-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="c-msg">Message</Label>
          <Textarea
            id="c-msg"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button type="submit">Open email</Button>
      </form>

      <ul className="mt-10 flex flex-col gap-2 text-sm text-muted-foreground">
        <li>
          <a href={AUTHOR.amazonAuthor} target="_blank" rel="noreferrer">
            Amazon
          </a>
        </li>
        <li>
          <a href={AUTHOR.x} target="_blank" rel="noreferrer">
            @RhoAgenda
          </a>
        </li>
        <li>
          <a href={AUTHOR.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
        </li>
        <li>
          <a href={AUTHOR.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
      </ul>
    </main>
  );
}
