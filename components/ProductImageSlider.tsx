"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageSliderProps {
  images: string[];
  productName: string;
}

export default function ProductImageSlider({ images, productName }: ProductImageSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
      
      const newIndex = Math.round(scrollLeft / clientWidth);
      setCurrentIndex((prev) => (newIndex !== prev ? newIndex : prev));
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [images, checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToImage = (index: number) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({ left: clientWidth * index, behavior: "smooth" });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Main Image Slider */}
      <div className="relative group">
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full aspect-[4/3] rounded-lg border border-slate-200"
        >
          {images.map((img, i) => (
            <div key={i} className="w-full h-full shrink-0 snap-center relative">
              <Image
                src={img}
                alt={`${productName} image ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            {/* Hover Buttons */}
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-sm transition-opacity ${
                canScrollLeft ? "opacity-100 sm:opacity-0 sm:group-hover:opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-sm transition-opacity ${
                canScrollRight ? "opacity-100 sm:opacity-0 sm:group-hover:opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => scrollToImage(idx)}
              className={`relative w-20 h-20 shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                idx === currentIndex ? "border-teal-600" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
