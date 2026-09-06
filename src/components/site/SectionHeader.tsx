/**
 * SECTION HEADER — one masthead shape for every section.
 * Index, title, and a right-hand kicker on one line. It draws no rule of its
 * own — the section wrapper owns the full-bleed borders around it.
 */
export function SectionHeader({
  index,
  title,
  kicker,
  note,
}: {
  index: string;
  title: string;
  kicker?: string;
  note?: string;
}) {
  return (
    <header>
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
        <span className="label tabular-nums text-clay">{index}</span>
        <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">{title}</h2>
        {kicker ? <span className="label ml-auto text-clay">{kicker}</span> : null}
      </div>
      {note ? (
        <p className="mt-4 max-w-measure text-[15px] leading-relaxed text-ink-soft">{note}</p>
      ) : null}
    </header>
  );
}
