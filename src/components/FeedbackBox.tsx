import { useId } from "react";

export function FeedbackBox({
  label = "Anything you'd like us to change?",
  value,
  onChange,
  rows = 4,
  placeholder = "Tell us what feels right, what doesn't, or anything you'd like us to explore.",
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div className="mt-10">
      <label htmlFor={id} className="text-[18px] text-foreground md:text-[20px]">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-4 w-full resize-y rounded-xl border border-border-strong bg-background px-4 py-3 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
      />
      <p className="mt-2 text-[13px] text-muted-foreground">
        Optional. Your notes are saved automatically as you type.
      </p>
    </div>
  );
}
