"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";

interface Slide {
  id: string;
  image: string;
  label: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    id: "ptfe",
    image: "/assets/poster1.png",
    label: "Fluoropolymer Coatings",
    title: "Viflon Fluoropolymer Coatings",
    subtitle:
      "PTFE, HALAR, ECTFE, PVDF, FEP & PFA coatings for superior corrosion resistance and non-stick performance.",
    ctaText: "Explore Coatings",
    ctaHref: "/applications/chemical-processing",
    alt: "Viflon Fluoropolymer Coatings",
  },
  {
    id: "vaicon",
    image: "/assets/poster2.png",
    label: "Porous Plastic Filters",
    title: "Vaicon Porous Plastic Filters",
    subtitle:
      "Sintered UHMWPE/PE filter media for pharmaceutical, chemical, and pneumatic applications.",
    ctaText: "Explore Filters",
    ctaHref: "/applications/pharmaceutical-medical",
    alt: "Vaicon Porous Plastic Filters",
  },
  {
    id: "fbe",
    image: "/assets/poster3.png",
    label: "Fusion Bonded Epoxy",
    title: "Fusion Bonded Epoxy Coatings",
    subtitle:
      "Superior corrosion protection for pipelines, tanks, valves, and structural steel since 1994.",
    ctaText: "Explore FBE",
    ctaHref: "/applications/oil-gas",
    alt: "Fusion Bonded Epoxy Coatings",
  },
  {
    id: "food",
    image: "/assets/poster4.png",
    label: "Food-Grade Coatings",
    title: "Food-Grade Non-Stick Coatings",
    subtitle:
      "FDA-compliant PTFE coatings for food processing equipment, cookware, and beverage production.",
    ctaText: "Explore Food Grade",
    ctaHref: "/applications/food-beverage",
    alt: "Food-Grade Non-Stick Coatings",
  },
  {
    id: "water",
    image: "/assets/poster5.png",
    label: "Water Treatment",
    title: "Water Treatment Solutions",
    subtitle:
      "Porous plastic filter media and corrosion-resistant coatings for water and wastewater treatment plants.",
    ctaText: "Explore Water Treatment",
    ctaHref: "/applications/water-treatment",
    alt: "Water Treatment Solutions",
  },
  {
    id: "auto",
    image: "/assets/poster6.png",
    label: "Automotive Coatings",
    title: "Automotive Component Coatings",
    subtitle:
      "Low-friction PTFE and fluoropolymer coatings for automotive parts, fasteners, and assemblies.",
    ctaText: "Explore Automotive",
    ctaHref: "/applications/automotive",
    alt: "Automotive Component Coatings",
  },
  {
    id: "turnkey",
    image: "/assets/poster7.png",
    label: "Turnkey Solutions",
    title: "End-to-End Coating Solutions",
    subtitle:
      "From surface preparation to final coating — fully equipped in-house facility with controlled processes and fast turnaround.",
    ctaText: "Our Capabilities",
    ctaHref: "/about",
    alt: "End-to-End Coating Solutions",
  },
  {
    id: "legacy",
    image: "/assets/poster8.png",
    label: "Established 1989",
    title: "Trusted by Industry Since 1989",
    subtitle:
      "Three decades of surface engineering serving ONGC, L&T, Godrej, Tata, Mahindra and leading pharma and chemical plants.",
    ctaText: "Our Story",
    ctaHref: "/about",
    alt: "Trusted by Industry Since 1989",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const [carouselRef, api] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ delay: 6000, stopOnMouseEnter: true, stopOnInteraction: false })]
  );

  const autoplayApi = api?.plugins().autoplay ?? null;
  const isPlaying = autoplayApi?.isPlaying() ?? true;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const handler = () => setReducedMotion(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      const selected = api.selectedScrollSnap();
      setCurrentIndex(selected % SLIDES.length);
    };
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const onPrev = useCallback(() => {
    api?.scrollPrev();
    autoplayApi?.stop();
    autoplayApi?.play();
  }, [api, autoplayApi]);

  const onNext = useCallback(() => {
    api?.scrollNext();
    autoplayApi?.stop();
    autoplayApi?.play();
  }, [api, autoplayApi]);

  const onGoTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
      autoplayApi?.stop();
      autoplayApi?.play();
    },
    [api, autoplayApi]
  );

  const onTogglePlay = useCallback(() => {
    if (!autoplayApi) return;
    if (autoplayApi.isPlaying()) {
      autoplayApi.stop();
    } else {
      autoplayApi.play();
    }
  }, [autoplayApi]);

  return (
    <section className="relative w-full overflow-hidden bg-[#0d7777]">
      {/* ── Embla Carousel ── */}
      <div
        className="hero-carousel w-full h-[72vh] md:h-[82vh] relative overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured solutions"
      >
        <div
          ref={carouselRef}
          className="embla__viewport w-full h-full overflow-hidden"
        >
          <div className="embla__container flex h-full">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className="embla__slide min-w-[100%] shrink-0 grow-0 basis-full h-full flex flex-col justify-center relative"
              >
                {/* Background image with Ken Burns effect */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover w-full h-full"
                    style={{
                      animation: reducedMotion
                        ? "none"
                        : "kenBurns 9s ease-in-out infinite alternate",
                    }}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>

                {/* Depth overlays */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(13,119,119,0.72) 0%, rgba(13,119,119,0.35) 45%, rgba(13,119,119,0.12) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.5) 100%)",
                  }}
                />

                {/* Slide content */}
                <div className="relative z-20 flex h-full items-center px-6 md:px-[6%] pt-10 md:pt-0">
                  <div className="w-full max-w-[700px] text-center md:text-left">
                    <span
                      className="inline-block mb-3 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[0.68rem] font-bold tracking-widest text-[#5eead4] uppercase backdrop-blur-sm"
                    >
                      Est. 1989 · Mumbai, India
                    </span>
                    <h2
                      className="text-3xl md:text-[3.75rem] font-extrabold text-white leading-[1.15] mb-4 tracking-tight"
                      style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
                    >
                      {slide.title}
                    </h2>
                    <p
                      className="text-base md:text-lg text-slate-200 leading-relaxed mb-7 max-w-[460px] mx-auto md:mx-0"
                      style={{ textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}
                    >
                      {slide.subtitle}
                    </p>
                    <Link
                      href={slide.ctaHref}
                      className="inline-flex items-center gap-2 bg-white text-[#0d7777] px-5 py-2.5 rounded-lg font-bold text-sm shadow-xl hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:scale-[1.02] transition-all duration-200"
                    >
                      {slide.ctaText}
                      <span
                        style={{
                          display: "inline-block",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Visually hidden live region for screen readers ── */}
      <div className="sr-only" aria-live="polite">
        Slide {currentIndex + 1} of {SLIDES.length}.{" "}
        {SLIDES[currentIndex]?.title}.
      </div>

      {/* ── Navigation Arrows ── */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous slide"
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 text-[#0d7777] flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all",
          !reducedMotion && "hover:-translate-y-1"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="sr-only">Previous slide</span>
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 text-[#0d7777] flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all",
          !reducedMotion && "hover:-translate-y-1"
        )}
      >
        <ChevronRight className="w-5 h-5" />
        <span className="sr-only">Next slide</span>
      </button>

      {/* ── Play / Pause ── */}
      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
        className="absolute bottom-6 left-6 z-30 w-9 h-9 rounded-full bg-white/90 text-[#0d7777] flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        <span className="sr-only">
          {isPlaying ? "Pause autoplay" : "Resume autoplay"}
        </span>
      </button>

      {/* ── Slide Counter ── */}
      <div className="absolute bottom-6 right-6 z-30 text-right hidden md:block">
        <span
          className="block text-[#0d7777] font-extrabold text-xs tracking-wider uppercase opacity-70"
        >
          Featured Solution
        </span>
        <span className="block text-white font-bold text-sm">
          {String(currentIndex + 1).padStart(2, "0")} /
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Pagination Dots ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onGoTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 ease-out",
              index === currentIndex
                ? "bg-[#0d7777] w-8 shadow-[0_0_0_3px_rgba(13,119,119,0.3)]"
                : "bg-white/40 hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-white"
            )}
          />
        ))}
      </div>
    </section>
  );
}
