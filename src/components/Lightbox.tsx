import { useCallback, useEffect } from "react";

export type LightboxItem = { image: string; title: string; description: string };

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const isOpen = index !== null;

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, step]);

  if (index === null) return null;
  const item = items[index];
  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex flex-col bg-background/97 backdrop-blur-sm"
    >
      <div className="flex h-16 items-center justify-end px-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="inline-flex size-11 items-center justify-center rounded-full text-[20px] text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
        >
          ×
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-auto px-4">
        <img
          src={item.image}
          alt={`${item.title} — ${item.description}`}
          className="max-h-[70dvh] w-auto max-w-full rounded-xl border border-border object-contain"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-8">
        <button
          type="button"
          onClick={() => step(-1)}
          className="inline-flex h-11 items-center rounded-xl border border-border-strong px-4 text-[14px] font-medium"
        >
          ← Previous
        </button>
        <p className="order-first w-full text-center text-[14px] text-muted-foreground sm:order-none sm:w-auto">
          {item.title}
        </p>
        <button
          type="button"
          onClick={() => step(1)}
          className="inline-flex h-11 items-center rounded-xl border border-border-strong px-4 text-[14px] font-medium"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
