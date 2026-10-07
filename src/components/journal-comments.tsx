import type { JournalComment } from "@/data/journal";
import { cn } from "@/lib/utils";

export function JournalComments({
  comments,
  count,
}: {
  comments: JournalComment[];
  count: number;
}) {
  return (
    <section aria-labelledby="comments-h" className="mt-16">
      <h2 id="comments-h" className="font-display text-3xl">
        Reader comments from the original Rho Agenda blog (archived)
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {count} {count === 1 ? "comment" : "comments"}, kept as a read-only
        archive. Comments are closed.
      </p>
      <ol className="mt-8 flex flex-col gap-6">
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} depth={0} />
        ))}
      </ol>
    </section>
  );
}

function CommentItem({
  comment,
  depth,
}: {
  comment: JournalComment;
  depth: number;
}) {
  return (
    <li id={`comment-${comment.id}`} className="scroll-mt-24">
      <div
        className={cn(
          "rounded-xl border border-border p-4 sm:p-5",
          comment.isAuthor ? "bg-muted" : "bg-card",
        )}
      >
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
          <span className="font-medium text-foreground">{comment.author}</span>
          {comment.isAuthor ? (
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Author
            </span>
          ) : null}
          <time
            dateTime={comment.date}
            className="text-xs text-muted-foreground"
          >
            {comment.dateLabel}
          </time>
        </p>
        <div
          className="journal-comment mt-2 text-sm leading-relaxed text-foreground/90"
          // Sanitized with an allowlist when the archive was imported.
          dangerouslySetInnerHTML={{ __html: comment.html }}
        />
      </div>
      {comment.replies.length > 0 ? (
        <ol
          className={cn(
            "mt-4 flex flex-col gap-4 border-l border-border",
            depth < 3 ? "pl-4 sm:pl-6" : "pl-3",
          )}
        >
          {comment.replies.map((r) => (
            <CommentItem key={r.id} comment={r} depth={depth + 1} />
          ))}
        </ol>
      ) : null}
    </li>
  );
}
