"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const isExternalImage = (src: string) => src.startsWith("http")

  return (
    <div className="flex flex-col gap-3 overflow-hidden max-w-full">
      <div className="w-full max-w-[350px] sm:max-w-[400px] mx-auto overflow-hidden bg-secondary aspect-square">
        <Image
          src={images[selectedIndex] || "/placeholder.svg"}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          width={400}
          height={400}
          className="h-full w-full object-cover"
          priority
          sizes="(max-width: 350px) 100vw, 400px"
          unoptimized={isExternalImage(images[selectedIndex])}
        />
      </div>

      {images.length > 1 && (
        <div className="max-w-[350px] sm:max-w-[400px] mx-auto w-full overflow-hidden">
          <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            {images.map((image, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 min-w-[40px] sm:min-w-[48px] min-h-[40px] sm:min-h-[48px] overflow-hidden bg-secondary transition-all flex-shrink-0",
                  selectedIndex === index ? "ring-1 ring-foreground" : "opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${productName} thumbnail ${index + 1}`}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  sizes="48px"
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
