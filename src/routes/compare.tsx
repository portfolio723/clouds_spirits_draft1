import { createFileRoute } from "@tanstack/react-router";
import { PageFooterNav, PageHeader } from "@/components/Page";
import { ChoiceGroup } from "@/components/ChoiceGroup";
import { FeedbackBox } from "@/components/FeedbackBox";
import { logoAssets } from "@/lib/brand";
import { useReview } from "@/lib/review-store";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Logo Variations — Clouds & Spirits Draft 01" },
      {
        name: "description",
        content:
          "Compare the Clouds & Spirits logo variations side by side and select your preference.",
      },
      { property: "og:title", content: "Compare Logo Variations — Clouds & Spirits" },
      {
        property: "og:description",
        content: "Which variation feels more appropriate for Clouds & Spirits?",
      },
    ],
  }),
  component: Compare,
});

function Compare() {
  const { review, set } = useReview();

  return (
    <>
      <PageHeader
        label="Draft 01"
        title="Compare Logo Variations"
        intro="Compare the logo options side by side and choose the variation that best represents the venue."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {logoAssets.map((asset) => (
          <article key={asset.id} className="overflow-hidden rounded-2xl border border-border">
            <img
              src={asset.image}
              alt={asset.title}
              width={1280}
              height={960}
              loading="lazy"
              className="w-full object-cover"
            />
            <div className="px-6 py-6">
              <p className="label-xs">{asset.index}</p>
              <h2 className="mt-2 text-[22px]">{asset.title}</h2>
              <p className="mt-3 text-[15px] text-muted-foreground">{asset.description}</p>
            </div>
          </article>
        ))}
      </div>

      <ChoiceGroup
        legend="Which variation feels most appropriate for Clouds & Spirits?"
        name="logo"
        value={review.selected_logo}
        onChange={(value) => set("selected_logo", value)}
        options={[
          { value: "variation-01", label: "Variation 01" },
          { value: "variation-02", label: "Variation 02" },
          { value: "variation-03", label: "Variation 03" },
          { value: "variation-04", label: "Variation 04" },
          { value: "undecided", label: "Not decided" },
        ]}
      />

      <FeedbackBox value={review.logo_note} onChange={(value) => set("logo_note", value)} />

      <PageFooterNav
        prev={{ to: "/logos", label: "Logos" }}
        next={{ to: "/review", label: "Your review" }}
      />
    </>
  );
}
