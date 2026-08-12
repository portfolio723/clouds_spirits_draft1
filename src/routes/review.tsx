import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/Page";
import { ChoiceGroup } from "@/components/ChoiceGroup";
import { FeedbackBox } from "@/components/FeedbackBox";
import { useReview } from "@/lib/review-store";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Your Draft 01 Review — Clouds & Spirits" },
      {
        name: "description",
        content:
          "Tell us which colour, typography and logo directions to take forward into the next Clouds & Spirits draft.",
      },
      { property: "og:title", content: "Your Draft 01 Review — Clouds & Spirits" },
      {
        property: "og:description",
        content: "Review the directions and tell us what to take forward.",
      },
    ],
  }),
  component: Review,
});

function Review() {
  const { review, set, reset } = useReview();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send() {
    setSending(true);
    setError(null);

    const payload = {
      project_slug: "clouds-and-spirits",
      name: review.name || null,
      age: review.age || null,
      gender: review.gender || null,
      selected_logo: review.selected_logo || null,
      selected_typography: review.selected_typography || null,
      color_feedback: review.color_feedback || null,
      colors_note: review.colors_note || null,
      typography_note: review.typography_note || null,
      logo_note: review.logo_note || null,
      overall_feedback: review.overall_feedback || null,
    };

    const { error: insertError } = await supabase.from("client_feedback").insert(payload);

    setSending(false);

    if (insertError) {
      console.error("Supabase submission error:", insertError);
      const details = [insertError.message, insertError.details, insertError.hint]
        .filter(Boolean)
        .join(" — ");
      setError(`Submission error: ${details || "Could not insert record into client_feedback."}`);
      return;
    }

    reset();
    navigate({ to: "/thanks" });
  }

  return (
    <>
      <PageHeader
        label="Draft 01"
        title="Your Draft 01 Review"
        intro="Review the directions above and tell us what you would like us to take forward."
      />

      <div className="mb-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="font-display text-[20px] font-medium text-foreground">Your Details</h2>
        <p className="mt-1 text-[14px] text-muted-foreground">
          Please share your name, age, and gender before reviewing the brand variations.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <div>
            <label
              htmlFor="reviewer-name"
              className="block text-[14px] font-medium text-foreground mb-2"
            >
              Name
            </label>
            <input
              id="reviewer-name"
              type="text"
              placeholder="Your name"
              value={review.name || ""}
              onChange={(e) => set("name", e.target.value)}
              className="w-full h-11 rounded-xl border border-border bg-background px-4 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="reviewer-age"
              className="block text-[14px] font-medium text-foreground mb-2"
            >
              Age
            </label>
            <input
              id="reviewer-age"
              type="number"
              min="1"
              max="120"
              placeholder="Your age"
              value={review.age || ""}
              onChange={(e) => set("age", e.target.value)}
              className="w-full h-11 rounded-xl border border-border bg-background px-4 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="reviewer-gender"
              className="block text-[14px] font-medium text-foreground mb-2"
            >
              Gender
            </label>
            <select
              id="reviewer-gender"
              value={review.gender || ""}
              onChange={(e) => set("gender", e.target.value)}
              className="w-full h-11 rounded-xl border border-border bg-background px-4 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <ChoiceGroup
        legend="Logo Variation"
        name="review-logo"
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

      <ChoiceGroup
        legend="Typography"
        name="review-typography"
        value={review.selected_typography}
        onChange={(value) => set("selected_typography", value)}
        options={[
          { value: "gotham", label: "Gotham Rounded + SF Pro" },
          { value: "dm-serif", label: "DM Serif Display + Inter" },
          { value: "undecided", label: "Not decided" },
        ]}
      />

      <ChoiceGroup
        legend="Colors"
        name="review-colors"
        value={review.color_feedback}
        onChange={(value) => set("color_feedback", value)}
        options={[
          { value: "proceed", label: "Good to proceed" },
          { value: "minor", label: "Minor changes" },
          { value: "another", label: "Need another direction" },
        ]}
      />

      <FeedbackBox
        label="Overall feedback"
        rows={6}
        placeholder="What should we keep, change or explore in the next draft?"
        value={review.overall_feedback}
        onChange={(value) => set("overall_feedback", value)}
      />

      {error ? (
        <p role="alert" className="mt-6 text-[15px] text-destructive">
          {error}
        </p>
      ) : null}

      <div className="mt-10 border-t border-border py-10">
        <button
          type="button"
          onClick={send}
          disabled={sending}
          className="inline-flex h-12 items-center rounded-xl bg-primary px-7 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send feedback"}
        </button>
        <p className="mt-3 text-[13px] text-muted-foreground">
          Nothing here is mandatory — send whatever you have.
        </p>
      </div>
    </>
  );
}
