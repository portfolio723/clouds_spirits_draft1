import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageFooterNav, PageHeader } from "@/components/Page";
import { Lightbox } from "@/components/Lightbox";
import { logoAssets } from "@/lib/brand";
import { LogoVersionsSection } from "@/components/LogoVersionsSection";

export const Route = createFileRoute("/logos/")({
  head: () => ({
    meta: [
      { title: "Logos — Clouds & Spirits Draft 01" },
      {
        name: "description",
        content: "Logo variations and applications for Clouds & Spirits.",
      },
      { property: "og:title", content: "Logos — Clouds & Spirits Draft 01" },
      {
        property: "og:description",
        content: "Logo variations and applications showcase.",
      },
    ],
  }),
  component: LogosIndex,
});

function LogosIndex() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        label="Draft 01"
        title="Logos"
        intro="Explore the logo variations and real-world applications for Clouds & Spirits."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {logoAssets.map((asset, index) => (
          <button
            key={asset.id}
            type="button"
            onClick={() => setOpen(index)}
            className="group hover-lift overflow-hidden rounded-2xl border border-border text-left hover:border-border-strong relative"
          >
            <div className="relative">
              <img
                src={asset.image}
                alt={`${asset.title} — ${asset.description}`}
                width={1280}
                height={960}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {asset.versionTag && (
                <div className="absolute top-4 left-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                  <span className="inline-flex items-center rounded-lg bg-black/80 px-3.5 py-1.5 text-[13px] font-medium tracking-wide text-white backdrop-blur-md border border-white/15 shadow-lg">
                    {asset.versionTag}
                  </span>
                </div>
              )}
            </div>
            <span className="block px-5 py-4">
              <span className="label-xs">{asset.index}</span>
              <span className="mt-1 block text-[17px] text-foreground">{asset.title}</span>
              <span className="mt-1 block text-[14px] text-muted-foreground">
                {asset.description}
              </span>
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        items={logoAssets}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />

      <LogoVersionsSection
        title="Logo Version Concepts"
        subtitle="Version 1 through Version 4 rendered on black backgrounds."
        className="mt-14 mb-8"
      />

      <PageFooterNav
        prev={{ to: "/typography", label: "Typography" }}
        next={{ to: "/review", label: "Review" }}
      />
    </>
  );
}
