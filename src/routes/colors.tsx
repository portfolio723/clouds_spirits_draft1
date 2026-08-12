import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageFooterNav, PageHeader } from "@/components/Page";
import { FeedbackBox } from "@/components/FeedbackBox";
import { Lightbox } from "@/components/Lightbox";
import { brandColors } from "@/lib/brand";
import { useReview } from "@/lib/review-store";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import mockup17 from "@/assets/17.png";
import mockup18 from "@/assets/18.png";
import mockup19 from "@/assets/19.png";
import mockup20 from "@/assets/20.png";

const colorMockups = [
  {
    title: "Instagram Mockup",
    description: "Social media and digital campaign mockup",
    image: mockup17,
  },
  {
    title: "Menu Application 01",
    description: "Physical print menu mockup 01",
    image: mockup18,
  },
  {
    title: "Menu Application 02",
    description: "Physical print menu mockup 02",
    image: mockup19,
  },
  {
    title: "Board Signboard",
    description: "Exterior signage and board branding",
    image: mockup20,
  },
];

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
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <PageHeader
        label="Draft 01"
        title="Color Direction"
        intro="Hover or tap any color card to expand it and see where it is used across the brand identity."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-6 pb-2">
        {brandColors.map((color) => {
          const isHovered = hoveredColor === color.name;
          return (
            <div
              key={color.hex}
              onMouseEnter={() => setHoveredColor(color.name)}
              onMouseLeave={() => setHoveredColor(null)}
              onClick={() => setHoveredColor(isHovered ? null : color.name)}
              style={
                isHovered
                  ? {
                      borderColor: color.hex,
                      boxShadow: `0 12px 28px -6px ${color.hex}40, 0 0 0 1px ${color.hex}`,
                    }
                  : undefined
              }
              className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-out cursor-pointer ${
                isHovered
                  ? "-translate-y-3 bg-surface z-10"
                  : "border-border hover:-translate-y-2 hover:border-border-strong hover:shadow-md bg-card"
              }`}
            >
              <span
                className="block h-32 w-full md:h-36 transition-transform duration-300 group-hover:scale-[1.01]"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              <div className="p-5">
                <span className="block font-display text-[18px] text-foreground font-medium">
                  {color.name}
                </span>
                <span className="mt-1 block text-[14px] text-muted-foreground">
                  {color.hex} · {color.role}
                </span>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isHovered
                      ? "grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-border"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[12px] font-semibold tracking-wider text-accent uppercase">
                      Used for
                    </p>
                    <ul className="mt-2 space-y-1.5 text-[14px] text-foreground">
                      {color.usage.map((use) => (
                        <li key={use} className="flex items-center gap-2">
                          <span
                            className="size-2 rounded-full shrink-0 border border-black/10 shadow-xs"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[14px] text-muted-foreground">
        Hover over any colour above to see its applications.
      </p>

      {/* Colour Applications & Mockups Section */}
      <div className="mt-12 mb-8">
        <div className="mb-6">
          <h2 className="font-display text-[22px] font-medium text-foreground">
            Colour Applications & Mockups
          </h2>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Real-world applications showing how the colour palette translates across social media,
            print menus, and signage.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent className="-ml-3">
              {colorMockups.map((item, idx) => (
                <CarouselItem key={item.title} className="pl-3 basis-[82%] sm:basis-[60%]">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="group hover-lift w-full h-full relative overflow-hidden rounded-2xl border border-border text-left hover:border-border-strong bg-card flex flex-col"
                  >
                    <div className="aspect-[3/4] w-full overflow-hidden bg-surface relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-[15px] font-medium text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-[12px] text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 flex items-center justify-between px-1">
              <div className="flex gap-2">
                {colorMockups.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => api?.scrollTo(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === idx ? "w-6 bg-primary" : "w-2 bg-border"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-1.5">
                <CarouselPrevious className="static translate-y-0 h-9 w-9 border-border bg-surface text-foreground" />
                <CarouselNext className="static translate-y-0 h-9 w-9 border-border bg-surface text-foreground" />
              </div>
            </div>
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {colorMockups.map((item, idx) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group hover-lift relative overflow-hidden rounded-2xl border border-border text-left hover:border-border-strong bg-card flex flex-col"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-surface relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-[15px] font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-[12px] text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        items={colorMockups}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />

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
