import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageFooterNav } from "@/components/Page";
import { heroImage } from "@/lib/brand";
import { LogoVersionsSection } from "@/components/LogoVersionsSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clouds & Spirits — Brand Exploration, Draft 01" },
      {
        name: "description",
        content:
          "Review the first brand direction for Clouds & Spirits: colour, typography and two logo directions, with space for your feedback.",
      },
      { property: "og:title", content: "Clouds & Spirits — Brand Exploration, Draft 01" },
      {
        property: "og:description",
        content: "Your first brand direction is ready to review.",
      },
    ],
  }),
  component: Overview,
});

function Overview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="pt-20 pb-4 md:pt-32">
        <p className="label-xs">Brand exploration · Draft 01</p>
        <h1 className="mt-5 text-[40px] leading-[1.05] md:text-[64px]">Clouds &amp; Spirits</h1>
        <p className="mt-6 max-w-[52ch] text-[18px] text-foreground md:text-[20px]">
          Your first brand direction is ready to review.
        </p>
        <p className="mt-4 max-w-[62ch] text-[16px] text-muted-foreground md:text-[17px]">
          We've explored the visual identity across color, typography and logo directions. Take a
          look through the options and tell us what feels right.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/colors"
            className="inline-flex h-12 items-center rounded-xl bg-primary px-6 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            View Draft 01
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="inline-flex h-12 items-center rounded-xl border border-border-strong bg-background px-6 text-[14px] font-medium text-foreground transition-colors hover:bg-surface"
          >
            About this review
          </button>
        </div>

        {open ? (
          <div className="mt-6 max-w-[62ch] rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-[20px]">What is this?</h2>
            <p className="mt-3 text-[15px] text-muted-foreground">
              This is an early visual exploration, not the final brand system. Your feedback will
              help us refine the selected direction before we develop the complete identity.
            </p>
          </div>
        ) : null}
      </section>

      <figure className="group relative mt-14 overflow-hidden rounded-2xl border border-border">
        <img
          src={heroImage}
          alt="Clouds & Spirits brand exploration"
          width={1280}
          height={960}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute top-4 left-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
          <span className="inline-flex items-center rounded-lg bg-black/80 px-3.5 py-1.5 text-[13px] font-medium tracking-wide text-white backdrop-blur-md border border-white/15 shadow-lg">
            Version 1
          </span>
        </div>
      </figure>

      <section className="mt-16 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Color", text: "Six colours drawn from the interior, lighting and materials." },
          { title: "Typography", text: "Two type directions to compare side by side." },
          { title: "Logos", text: "Logo variations and real-world applications showcase." },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-border p-6">
            <h2 className="text-[20px]">{item.title}</h2>
            <p className="mt-2 text-[14px] text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </section>

      <LogoVersionsSection
        title="Logo Directions"
        subtitle="Explore the logo version concepts on dark backgrounds."
        className="mt-16 mb-12"
      />

      <PageFooterNav next={{ to: "/colors", label: "Color direction" }} />
    </>
  );
}
