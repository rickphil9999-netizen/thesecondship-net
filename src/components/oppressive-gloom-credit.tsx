export function OppressiveGloomCredit({
  className = "",
}: {
  className?: string;
}) {
  return (
    <p
      className={`mt-2 text-xs leading-relaxed text-muted-foreground ${className}`.trim()}
    >
      Music: “Oppressive Gloom” by Kevin MacLeod (
      <a
        href="https://incompetech.com/"
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-2 hover:text-foreground"
      >
        incompetech.com
      </a>
      ), licensed under Creative Commons: By Attribution 4.0 —{" "}
      <a
        href="https://creativecommons.org/licenses/by/4.0/"
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-2 hover:text-foreground"
      >
        creativecommons.org/licenses/by/4.0/
      </a>
    </p>
  );
}
