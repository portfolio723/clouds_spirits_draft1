import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageFooterNav } from "@/components/Page";
import { heroImage } from "@/lib/brand";
import { LogoVersionsSection } from "@/components/LogoVersionsSection";
import hc1 from "@/assets/hc1.png";
import hc2 from "@/assets/hc2.png";
import hc3 from "@/assets/hc3.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

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

const heroSlides = [
  {
    id: "hero-1",
    image: heroImage,
    alt: "Clouds & Spirits hero concept 1",
    label: "Version 1",
  },
  {
    id: "hero-hc1",
    image: hc1,
    alt: "Clouds & Spirits hero concept 2",
    label: "Hero Concept 1",
  },
  {
    id: "hero-hc2",
    image: hc2,
    alt: "Clouds & Spirits hero concept 3",
    label: "Hero Concept 2",
  },
  {
    id: "hero-hc3",
    image: hc3,
    alt: "Clouds & Spirits hero concept 4",
    label: "Hero Concept 3",
  },
];

function Overview() {
  const [open, setOpen] = useState(false);
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
    <div className="flex flex-col">
      <section className="order-1 pt-6 sm:pt-10 pb-2 md:pt-32 md:pb-4">
        <p className="label-xs">Brand exploration · Draft 01</p>
        <h1 className="mt-3 text-[36px] leading-[1.05] sm:text-[40px] md:text-[64px]">
          Clouds &amp; Spirits
        </h1>
        <p className="mt-4 max-w-[52ch] text-[17px] text-foreground sm:text-[18px] md:text-[20px]">
          Your first brand direction is ready to review.
        </p>
        <p className="mt-3 max-w-[62ch] text-[15px] text-muted-foreground sm:text-[16px] md:text-[17px]">
          We've explored the visual identity across color, typography and logo directions. Take a
          look through the options and tell us what feels right.
        </p>
      </section>

      {/* Hero Image Carousel (Order 2 on mobile, Order 3 on desktop) */}
      <div className="order-2 md:order-3 relative mt-6 md:mt-14">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <figure className="group relative overflow-hidden rounded-2xl border border-border">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    width={1280}
                    height={960}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-4 left-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                    <span className="inline-flex items-center rounded-lg bg-black/80 px-3.5 py-1.5 text-[13px] font-medium tracking-wide text-white backdrop-blur-md border border-white/15 shadow-lg">
                      {slide.label}
                    </span>
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 border-white/20 bg-black/60 text-white hover:bg-black/90 hover:text-white" />
          <CarouselNext className="right-4 top-1/2 -translate-y-1/2 border-white/20 bg-black/60 text-white hover:bg-black/90 hover:text-white" />
        </Carousel>

        <div className="mt-4 flex justify-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => api?.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === idx ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2 CTAs and About Box (Order 3 on mobile, Order 2 on desktop) */}
      <div className="order-3 md:order-2 mt-6 md:mt-10">
        <div className="flex flex-wrap items-center gap-3">
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
      </div>

      {/* Feature Cards Section */}
      <section className="order-4 mt-12 md:mt-16 grid gap-4 sm:grid-cols-3">
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

      {/* Logo Directions Carousel */}
      <div className="order-5">
        <LogoVersionsSection
          title="Logo Directions"
          subtitle="Explore the logo version concepts on dark backgrounds."
          className="mt-12 md:mt-16 mb-8 md:mb-12"
        />
      </div>

      <div className="order-6">
        <PageFooterNav next={{ to: "/colors", label: "Color direction" }} />
      </div>
    </div>
  );
}
