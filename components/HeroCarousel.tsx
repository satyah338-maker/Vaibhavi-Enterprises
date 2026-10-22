"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface Slide {
  id: string;
  image: string;
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
    title: "Automotive Component Coatings",
    subtitle:
      "Low-friction PTFE and fluoropolymer coatings for automotive parts, fasteners, and assemblies.",
    ctaText: "Explore Automotive",
    ctaHref: "/applications/automotive",
    alt: "Automotive Component Coatings",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    if (!isPlaying || isHovered) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPlaying, isHovered]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) goToNext();
    if (distance < -minSwipeDistance) goToPrev();
  }, [touchStart, touchEnd, goToNext, goToPrev]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {SLIDES.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scale(1)" : "scale(1.02)",
              transition: "opacity 1200ms ease-in-out, transform 1200ms ease-in-out",
              zIndex: isActive ? 10 : 0,
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              width={1920}
              height={720}
              priority={index === 0}
              className="w-full h-[72vh] md:h-[60vh] object-cover"
              sizes="100vw"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, rgba(13,119,119,0.75) 0%, rgba(13,119,119,0.45) 60%, rgba(0,0,0,0.2) 100%)",
              }}
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center px-6 md:px-0">
              <div className="container relative z-10 max-w-4xl text-center md:text-left">
                <span
                  style={{
                    display: "inline-block",
                    marginBottom: "0.75rem",
                    padding: "0.4rem 1rem",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "#5eead4",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    borderRadius: "4px",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  Est. 1989 · Mumbai, India
                </span>
                <h2
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 3rem)",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1.2,
                    margin: "0 0 1rem",
                    maxWidth: "700px",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {slide.title}
                </h2>
                <p
                  style={{
                    fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.7,
                    margin: "0 0 1.75rem",
                    maxWidth: "560px",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.ctaHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "#ffffff",
                    color: "#0d7777",
                    padding: "0.7rem 1.5rem",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  {slide.ctaText}
                  <span
                    style={{
                      display: "inline-block",
                      width: "16px",
                      height: "16px",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={goToPrev}
        type="button"
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/90 text-[#0d7777] hover:bg-white flex items-center justify-center transition-all shadow-sm"
        style={{ opacity: 0.85 }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNext}
        type="button"
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/90 text-[#0d7777] hover:bg-white flex items-center justify-center transition-all shadow-sm"
        style={{ opacity: 0.85 }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <button
        onClick={togglePlay}
        type="button"
        aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
        className="absolute bottom-4 left-4 z-40 w-9 h-9 rounded-full bg-white/90 text-[#0d7777] hover:bg-white flex items-center justify-center transition-all shadow-sm text-xs"
        style={{ opacity: 0.85 }}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-[#0d7777] w-6"
                : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
