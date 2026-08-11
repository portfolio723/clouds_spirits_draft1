export function ChoiceGroup({
  legend,
  name,
  options,
  value,
  onChange,
  columns = 2,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string; hint?: string }[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2;
}) {
  return (
    <fieldset className="mt-10">
      <legend className="text-[18px] text-foreground md:text-[20px]">{legend}</legend>
      <div
        className={`mt-5 grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1"}`}
        role="radiogroup"
        aria-label={legend}
      >
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              name={name}
              onClick={() => onChange(selected ? "" : option.value)}
              className={`min-h-12 rounded-xl border px-5 py-3 text-left transition-colors ${
                selected
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border-strong bg-background text-foreground hover:bg-surface"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`inline-flex size-4 shrink-0 items-center justify-center rounded-full border ${
                    selected ? "border-accent" : "border-border-strong"
                  }`}
                >
                  {selected ? <span className="size-2 rounded-full bg-accent" /> : null}
                </span>
                <span className="text-[15px] font-medium">{option.label}</span>
              </span>
              {option.hint ? (
                <span className="mt-1 block pl-7 text-[13px] text-muted-foreground">
                  {option.hint}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
