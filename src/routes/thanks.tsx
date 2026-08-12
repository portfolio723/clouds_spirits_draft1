import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/thanks")({
  head: () => ({
    meta: [
      { title: "Thanks — Clouds & Spirits Draft 01" },
      {
        name: "description",
        content: "Your Draft 01 feedback for Clouds & Spirits has been received.",
      },
      { property: "og:title", content: "Thanks — Clouds & Spirits Draft 01" },
      { property: "og:description", content: "Your feedback has been received." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Thanks,
});

function Thanks() {
  return (
    <section className="flex min-h-[60dvh] flex-col items-start justify-center py-8 sm:py-12 md:py-24">
      <span
        aria-hidden="true"
        className="inline-flex size-12 items-center justify-center rounded-full border border-accent text-[20px] text-accent"
      >
        ✓
      </span>
      <h1 className="mt-8 text-[36px] md:text-[44px]">Thanks</h1>
      <p className="mt-4 max-w-[52ch] text-[17px] text-muted-foreground">
        Your feedback has been received. We'll use your selections and comments to refine the next
        brand direction.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex h-12 items-center rounded-xl border border-border-strong bg-background px-6 text-[14px] font-medium text-foreground transition-colors hover:bg-surface"
      >
        Back to Draft
      </Link>
    </section>
  );
}
