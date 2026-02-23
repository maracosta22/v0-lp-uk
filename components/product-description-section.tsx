"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ProductDescriptionSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

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

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="mt-16 border-t border-border pt-16 overflow-hidden">
      <h2 className="mb-12 text-center font-serif text-2xl sm:text-3xl px-2">Product Gallery</h2>

      {/* Flexible Images Carousel with Scroll */}
      <div className="mb-16">
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {flexibleImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 sm:w-80 lg:w-96"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted shadow-md hover:shadow-lg transition-shadow">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority={index < 3}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg z-10 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg z-10 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
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
