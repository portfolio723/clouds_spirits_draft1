import { useState, useEffect } from "react";
import v1 from "@/assets/v1.png";
import v2 from "@/assets/v2.png";
import v3 from "@/assets/v3.png";
import v4 from "@/assets/v4.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export const logoVersions = [
  {
    id: "v1",
    title: "Version 1",
    description: "Logo variation — Version 1",
    image: v1,
  },
  {
    id: "v2",
    title: "Version 2",
    description: "Logo variation — Version 2",
    image: v2,
  },
  {
    id: "v3",
    title: "Version 3",
    description: "Logo variation — Version 3",
    image: v3,
  },
  {
    id: "v4",
    title: "Version 4",
    description: "Logo variation — Version 4",
    image: v4,
  },
];

interface LogoVersionsSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function LogoVersionsSection({
  title = "Logo Versions",
  subtitle = "Explore the logo concepts rendered on dark backgrounds.",
  className = "mt-12 mb-8",
}: LogoVersionsSectionProps) {
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
    <section className={className}>
      <div className="mb-6">
        <h2 className="font-display text-[22px] font-medium text-foreground">{title}</h2>
        {subtitle && <p className="mt-1 text-[14px] text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Mobile Swipeable Carousel */}
      <div className="md:hidden">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-ml-3">
            {logoVersions.map((version, index) => (
              <CarouselItem key={version.id} className="pl-3 basis-[82%] sm:basis-[60%]">
                <div className="group hover-lift relative overflow-hidden rounded-2xl border border-neutral-800 bg-black text-left flex flex-col transition-all duration-300 hover:border-neutral-600 shadow-md h-full">
                  <div className="aspect-square w-full bg-black p-6 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={version.image}
                      alt={version.title}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-4 py-3 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
                    <span className="font-display text-[15px] font-medium text-white">
                      {version.title}
                    </span>
                    <span className="text-[12px] text-neutral-400 font-mono">0{index + 1}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex items-center justify-between px-1">
            <div className="flex gap-2">
              {logoVersions.map((_, idx) => (
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
        {logoVersions.map((version, index) => (
          <div
            key={version.id}
            className="group hover-lift relative overflow-hidden rounded-2xl border border-neutral-800 bg-black text-left flex flex-col transition-all duration-300 hover:border-neutral-600 shadow-md"
          >
            <div className="aspect-square w-full bg-black p-6 flex items-center justify-center relative overflow-hidden">
              <img
                src={version.image}
                alt={version.title}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="px-4 py-3 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
              <span className="font-display text-[15px] font-medium text-white">
                {version.title}
              </span>
              <span className="text-[12px] text-neutral-400 font-mono">0{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
