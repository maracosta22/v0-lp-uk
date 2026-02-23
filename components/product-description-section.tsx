"use client"

import Image from "next/image"

export function ProductDescriptionSection() {
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


  return (
    <div className="mt-16 border-t border-border pt-16 overflow-hidden">
      <h2 className="mb-12 text-center font-serif text-2xl sm:text-3xl px-2">Product Gallery</h2>

      {/* Flexible Images Grid */}
      <div className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {flexibleImages.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted shadow-md hover:shadow-lg transition-shadow">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority={index < 3}
              />
            </div>
          ))}
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
