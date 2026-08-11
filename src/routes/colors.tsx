import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageFooterNav, PageHeader } from "@/components/Page";
import { FeedbackBox } from "@/components/FeedbackBox";
import { brandColors } from "@/lib/brand";
import { useReview } from "@/lib/review-store";

export const Route = createFileRoute("/colors")({
  head: () => ({
    meta: [
      { title: "Color Direction — Clouds & Spirits Draft 01" },
      {
        name: "description",
        content:
          "The Clouds & Spirits Draft 01 palette: espresso, ivory, champagne, gold, taupe and olive, shown across menu, packaging and social.",
      },
      { property: "og:title", content: "Color Direction — Clouds & Spirits Draft 01" },
      {
        property: "og:description",
        content: "A palette drawn from the interior, warm lighting, marble and wood.",
      },
    ],
  }),
  component: Colors,
});

function Colors() {
  const { review, set } = useReview();
  const [active, setActive] = useState<string | null>(null);
  const activeColor = brandColors.find((color) => color.name === active) ?? null;

  return (
    <>
      <PageHeader
        label="Draft 01"
        title="Color Direction"
        intro="The initial palette is inspired by the restaurant interior, warm lighting, marble, wood and premium hospitality atmosphere."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brandColors.map((color) => {
          const selected = active === color.name;
          return (
            <button
              key={color.hex}
              type="button"
              onClick={() => setActive(selected ? null : color.name)}
              aria-pressed={selected}
              className={`overflow-hidden rounded-2xl border text-left transition-colors ${
                selected ? "border-accent" : "border-border hover:border-border-strong"
              }`}
            >
              <span
                className="block h-32 w-full md:h-40"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              <span className="block px-5 py-4">
                <span className="block text-[17px] text-foreground">{color.name}</span>
                <span className="mt-1 block text-[14px] text-muted-foreground">
                  {color.hex} · {color.role}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {activeColor ? (
        <div className="mt-6 rounded-2xl border border-border bg-surface p-6" aria-live="polite">
          <div className="flex items-start gap-4">
            <span
              className="mt-1 size-10 shrink-0 rounded-lg border border-border"
              style={{ backgroundColor: activeColor.hex }}
              aria-hidden="true"
            />
            <div>
              <h2 className="text-[20px]">{activeColor.name}</h2>
              <p className="text-[14px] text-muted-foreground">{activeColor.hex}</p>
              <p className="mt-4 text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
                Used for
              </p>
              <ul className="mt-2 space-y-1 text-[15px] text-foreground">
                {activeColor.usage.map((use) => (
                  <li key={use}>{use}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-[14px] text-muted-foreground">
          Tap a colour to see where it would be used.
        </p>
      )}

      <FeedbackBox
        value={review.colors_note}
        onChange={(value) => set("colors_note", value)}
        label="Anything you'd like us to change about the colours?"
      />

      <PageFooterNav
        prev={{ to: "/", label: "Overview" }}
        next={{ to: "/typography", label: "Typography" }}
      />
    </>
  );
}
