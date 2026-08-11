import { createFileRoute } from "@tanstack/react-router";
import { PageFooterNav, PageHeader } from "@/components/Page";
import { FeedbackBox } from "@/components/FeedbackBox";
import { ChoiceGroup } from "@/components/ChoiceGroup";
import { typographyDirections } from "@/lib/brand";
import { useReview } from "@/lib/review-store";

export const Route = createFileRoute("/typography")({
  head: () => ({
    meta: [
      { title: "Typography — Clouds & Spirits Draft 01" },
      {
        name: "description",
        content:
          "Compare two type directions for Clouds & Spirits: Gotham Rounded with SF Pro, or DM Serif Display with Inter.",
      },
      { property: "og:title", content: "Typography — Clouds & Spirits Draft 01" },
      { property: "og:description", content: "Two possible type directions for the brand." },
    ],
  }),
  component: Typography,
});

function Typography() {
  const { review, set } = useReview();

  return (
    <>
      <PageHeader
        label="Draft 01"
        title="Typography"
        intro="Two possible type directions for the brand. Look at the name first — the rest follows from it."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {typographyDirections.map((direction) => (
          <article
            key={direction.number}
            className="flex flex-col rounded-2xl border border-border p-6 md:p-8"
          >
            <p className="label-xs">Direction {direction.number}</p>
            <p
              className={`mt-8 text-[34px] leading-tight text-foreground md:text-[42px] ${direction.fontClass}`}
            >
              Clouds &amp; Spirits
            </p>
            <p
              className={`mt-3 text-[12px] tracking-[0.3em] text-muted-foreground uppercase ${direction.fontClass}`}
            >
              Bar &amp; Kitchen
            </p>

            <dl className="mt-10 space-y-3 border-t border-border pt-6 text-[15px]">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Headlines</dt>
                <dd className="text-foreground">{direction.primary}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Supporting</dt>
                <dd className="text-foreground">{direction.secondary}</dd>
              </div>
            </dl>

            <p className="mt-6 text-[15px] text-muted-foreground">{direction.explanation}</p>
            <p className="mt-4 text-[13px] text-muted-foreground">{direction.feels}</p>
          </article>
        ))}
      </div>

      <ChoiceGroup
        legend="Which feels closer to the brand?"
        name="typography"
        value={review.selected_typography}
        onChange={(value) => set("selected_typography", value)}
        options={[
          { value: "gotham", label: "Direction 01", hint: "Gotham Rounded + SF Pro" },
          { value: "dm-serif", label: "Direction 02", hint: "DM Serif Display + Inter" },
          { value: "discuss", label: "I need to discuss this" },
        ]}
      />

      <FeedbackBox
        value={review.typography_note}
        onChange={(value) => set("typography_note", value)}
      />

      <PageFooterNav
        prev={{ to: "/colors", label: "Colors" }}
        next={{ to: "/logos", label: "Logos" }}
      />
    </>
  );
}
