"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ProductDescriptionSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const flexibleImages = [
    { src: "/flexible01.jpg", alt: "Flexible Acoustic Panel - Image 1" },
    { src: "/flexible02.jpg", alt: "Flexible Acoustic Panel - Image 2" },
    { src: "/flexible03.jpg", alt: "Flexible Acoustic Panel - Image 3" },
    { src: "/flexible04.jpg", alt: "Flexible Acoustic Panel - Image 4" },
    { src: "/flexible05.jpg", alt: "Flexible Acoustic Panel - Image 5" },
    { src: "/flexible06.jpg", alt: "Flexible Acoustic Panel - Image 6" },
    { src: "/flexible07.jpg", alt: "Flexible Acoustic Panel - Image 7" },
    { src: "/flexible08.jpg", alt: "Flexible Acoustic Panel - Image 8" },
    { src: "/flexible09.jpg", alt: "Flexible Acoustic Panel - Image 9" },
  ]

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % flexibleImages.length)
  }

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + flexibleImages.length) % flexibleImages.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNext()
    }
    if (touchStart - touchEnd < -75) {
      goToPrev()
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-16 border-t border-border pt-16 overflow-hidden">
      <h2 className="mb-12 text-center font-serif text-2xl sm:text-3xl px-2">Product Gallery</h2>

      {/* Flexible Images Carousel */}
      <div className="mb-16">
        <div
          className="relative w-full overflow-hidden rounded-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Image Container */}
          <div className="relative aspect-[4/3] w-full bg-muted">
            {flexibleImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1400}
                  height={1050}
                  className="h-auto w-full object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 bg-white/70 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 bg-white/70 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {flexibleImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-amber-500 w-5" : "bg-white/60 w-2 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/50 text-white px-2.5 py-1 rounded-full text-xs sm:text-sm">
            {currentSlide + 1} / {flexibleImages.length}
          </div>
        </div>
      </div>

      {/* Key Features Summary */}
      <div className="mt-12 grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-secondary/50 p-4 sm:p-6 text-center">
          <h4 className="font-semibold text-sm sm:text-base">NRC 0.80</h4>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">Excellent Sound Absorption</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-4 sm:p-6 text-center">
          <h4 className="font-semibold text-sm sm:text-base">E1 Certified</h4>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">Low Formaldehyde Emission</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-4 sm:p-6 text-center">
          <h4 className="font-semibold text-sm sm:text-base">Easy Install</h4>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">DIY Friendly Setup</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-4 sm:p-6 text-center">
          <h4 className="font-semibold text-sm sm:text-base">SGS Certified</h4>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">Safe & Eco-Friendly</p>
        </div>
      </div>
    </div>
  )
}
