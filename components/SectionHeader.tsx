type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function SectionHeader({ eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        {eyebrow ? <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-accent-soft)]">{eyebrow}</p> : null}
        <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-900 md:text-3xl">{title}</h2>
        {description ? <p className="max-w-2xl text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
