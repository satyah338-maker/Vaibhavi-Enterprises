"use client";

import Image from "next/image";
import type { KeyboardEvent as ReactKeyboardEvent, TouchEvent as ReactTouchEvent, SyntheticEvent } from "react";
import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X, ZoomIn, Grid3X3 } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  industryName: string;
}

export function ImageGallery({ images, industryName }: ImageGalleryProps) {
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const openModal = useCallback((index: number) => {
    setModalImageIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setModalImageIndex(null);
  }, []);

  const goToNext = useCallback((e?: SyntheticEvent) => {
    e?.stopPropagation();
    if (modalImageIndex === null) return;
    setModalImageIndex((modalImageIndex + 1) % images.length);
  }, [modalImageIndex, images.length]);

  const goToPrev = useCallback((e?: SyntheticEvent) => {
    e?.stopPropagation();
    if (modalImageIndex === null) return;
    setModalImageIndex((modalImageIndex - 1 + images.length) % images.length);
  }, [modalImageIndex, images.length]);

  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (modalImageIndex === null) return;

      switch (e.key) {
        case "ArrowRight":
          goToNext();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
        case "Escape":
          closeModal();
          break;
      }
    },
    [modalImageIndex, goToNext, goToPrev, closeModal]
  );

  const minSwipeDistance = 50;

  const handleTouchStart = (e: ReactTouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: ReactTouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrev();
    }
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="space-y-6">
        {/* Gallery Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Grid3X3 className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Gallery
            </h3>
            <Badge variant="secondary" className="text-xs">
              {images.length} {images.length === 1 ? "image" : "images"}
            </Badge>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              onClick={() => openModal(i)}
              onMouseEnter={() => setIsHovering(i)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <Image
                src={img}
                alt={`Gallery image ${i + 1} from ${industryName}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />

              {/* Overlay with zoom icon */}
              <div
                className={`absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center ${isHovering === i ? "opacity-100" : "opacity-0"
                  }`}
              >
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
                    <ZoomIn className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Image number badge */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Badge
                  variant="secondary"
                  className="text-xs bg-black/50 text-white border-0"
                >
                  {i + 1}
                </Badge>
              </div>

              {/* Elegant border effect */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 group-hover:ring-2 group-hover:ring-teal-500/50 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog */}
      <Dialog open={modalImageIndex !== null} onOpenChange={closeModal}>
        <DialogContent
          onKeyDown={handleKeyDown}
          className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 border-0 bg-black/95 backdrop-blur-xl"
        >
          <DialogTitle className="sr-only">
            {modalImageIndex !== null
              ? `Image ${modalImageIndex + 1} of ${images.length
              } - ${industryName}`
              : `Image Gallery - ${industryName}`}
          </DialogTitle>

          {/* Header Bar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center space-x-3">
              <Badge
                variant="secondary"
                className="bg-white/10 text-white border-white/20"
              >
                {modalImageIndex !== null ? modalImageIndex + 1 : 0} /{" "}
                {images.length}
              </Badge>
              <span className="text-white/80 text-sm font-medium">
                {industryName}
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={closeModal}
              className="text-white hover:bg-white/10 rounded-full h-10 w-10 p-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Main Image Container */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 pt-20 pb-32"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Buttons */}
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={goToPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 active:scale-95 rounded-full h-10 w-10 sm:h-12 sm:w-12 p-0 transition-all duration-200"
              disabled={images.length <= 1}
            >
              <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 active:scale-95 rounded-full h-10 w-10 sm:h-12 sm:w-12 p-0 transition-all duration-200"
              disabled={images.length <= 1}
            >
              <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
            </Button>

            {/* Main Image */}
            {modalImageIndex !== null && images[modalImageIndex] && (
              <div className="relative w-full h-full max-w-6xl max-h-[calc(100vh-200px)]">
                <Image
                  src={images[modalImageIndex]}
                  alt={`Expanded view - Image ${modalImageIndex + 1
                    } from ${industryName}`}
                  fill
                  className="object-contain rounded-lg"
                  sizes="95vw"
                  priority
                  quality={95}
                />
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {modalImageIndex !== null && images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 to-transparent p-4">
              <div className="w-full">
                <div className="flex gap-2 overflow-x-auto w-full pb-2 px-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setModalImageIndex(idx)}
                      className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${idx === modalImageIndex
                        ? "ring-2 ring-teal-400 ring-offset-2 ring-offset-black/50 opacity-100"
                        : "opacity-60 hover:opacity-100"
                        }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
