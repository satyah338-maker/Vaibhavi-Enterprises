"use client";

import { useState, type SyntheticEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const goToNext = (e?: SyntheticEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = (e?: SyntheticEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) goToNext();
    if (distance < -minSwipeDistance) goToPrev();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrev();
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div 
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={images[currentIndex]}
          alt={`${productName} image ${currentIndex + 1}`}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Zoom Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 bg-white/90 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all shadow-sm">
            <ZoomIn className="text-teal-700" size={24} />
          </div>
        </div>

        {/* Inline Chevrons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
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

      {/* Fullscreen Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent 
          className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 border-0 bg-black/95 backdrop-blur-xl"
          onKeyDown={handleKeyDown}
        >
          <DialogTitle className="sr-only">
            {productName} - Image {currentIndex + 1}
          </DialogTitle>
          
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 pt-16 pb-24"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Modal Navigation */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPrev}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 active:scale-95 rounded-full p-2 transition-all"
                >
                  <ChevronLeft size={36} />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 active:scale-95 rounded-full p-2 transition-all"
                >
                  <ChevronRight size={36} />
                </button>
              </>
            )}

            {/* Modal Image */}
            <div className="relative w-full h-full max-w-5xl max-h-[calc(100vh-160px)]">
              <Image
                src={images[currentIndex]}
                alt={`${productName} full screen ${currentIndex + 1}`}
                fill
                className="object-contain rounded-lg"
                sizes="95vw"
                quality={100}
              />
            </div>
            
            {/* Modal Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center">
                <div className="flex gap-2 overflow-x-auto max-w-full px-4 scrollbar-hide">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative w-16 h-16 shrink-0 rounded-md overflow-hidden transition-all ${
                        idx === currentIndex ? "ring-2 ring-teal-400 opacity-100" : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
