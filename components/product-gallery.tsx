"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const mainScrollRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const isExternalImage = (src: string) => src.startsWith("http")

  // Handle swipe on main image
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && selectedIndex < images.length - 1) {
        setSelectedIndex((prev) => prev + 1)
      } else if (diff < 0 && selectedIndex > 0) {
        setSelectedIndex((prev) => prev - 1)
      }
    }
  }, [selectedIndex, images.length])

  return (
    <div className="flex flex-col gap-3 max-w-full">
      {/* Main image - full width, no constrained max-w, swipeable */}
      <div
        className="relative w-full overflow-hidden bg-secondary aspect-square flex items-center justify-center touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[selectedIndex] || "/placeholder.svg"}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          width={600}
          height={600}
          className="h-full w-full object-contain"
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
          unoptimized={isExternalImage(images[selectedIndex])}
        />

        {/* Dot indicators for mobile swipe */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "block h-1.5 rounded-full transition-all",
                  selectedIndex === index
                    ? "w-4 bg-foreground"
                    : "w-1.5 bg-foreground/30"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip - horizontally scrollable with touch */}
      {images.length > 1 && (
        <div className="w-full overflow-hidden" ref={mainScrollRef}>
          <div
            className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {images.map((image, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "w-16 h-16 sm:w-20 sm:h-20 min-w-[64px] sm:min-w-[80px] overflow-hidden bg-secondary transition-all flex-shrink-0 snap-start",
                  selectedIndex === index
                    ? "ring-2 ring-foreground ring-offset-1"
                    : "opacity-50 hover:opacity-100",
                )}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${productName} thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  sizes="80px"
                  unoptimized={isExternalImage(image)}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
