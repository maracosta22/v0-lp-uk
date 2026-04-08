"use client"

import Image from "next/image"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
  isFrenchVersion?: boolean
}

const GALLERY_IMAGES = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneu01-COvuniuy0UAMH2wAwPKmS9Tlev4Qrt.avif",
    alt: { en: "Flexible Acoustic Panel - Product Pack", fr: "Panneau Acoustique Flexible - Pack Produit" },
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneau02-qeu9jY1J99l7kquJK3L2fnpKCxJuHj.avif",
    alt: { en: "Flexible Acoustic Panel - Live Application Bedroom", fr: "Panneau Acoustique Flexible - Application Chambre" },
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneau03-Ji8b2j4tKYBnBXpeqNu9khj7yL7wvV.avif",
    alt: { en: "Flexible Acoustic Panel - Living Room & Dining Room", fr: "Panneau Acoustique Flexible - Salon & Salle à Manger" },
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneau05-GkWwFoSwI1tdI52JGtLrfokd39EcZ6.avif",
    alt: { en: "Flexible Acoustic Panel - Tested and Proved NRC 0.80", fr: "Panneau Acoustique Flexible - Testé et Prouvé NRC 0.80" },
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneau06-RN0no924w98dCR2WLKu9Lc5ix1yxsd.avif",
    alt: { en: "Flexible Acoustic Panel - SGS Safety Certificate", fr: "Panneau Acoustique Flexible - Certificat de Sécurité SGS" },
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneau08-MDTCtLoI5jgKXB9aMNIgb6jn6rpRlj.avif",
    alt: { en: "Flexible Acoustic Panel - Technical Specifications", fr: "Panneau Acoustique Flexible - Spécifications Techniques" },
  },
]

const CERTIFICATIONS = {
  fr: [
    { title: "NRC 0.80", description: "Excellente absorption sonore" },
    { title: "Certifié E1", description: "Faible émission de formaldéhyde" },
    { title: "Facile à installer", description: "Installation DIY" },
    { title: "Certifié SGS", description: "Sûr et écologique" },
  ],
  en: [
    { title: "NRC 0.80", description: "Excellent Sound Absorption" },
    { title: "E1 Certified", description: "Low Formaldehyde Emission" },
    { title: "Easy Install", description: "DIY Friendly Setup" },
    { title: "SGS Certified", description: "Safe & Eco-Friendly" },
  ],
}

export function ProductImageGallery({ images, productName, isFrenchVersion = false }: ProductImageGalleryProps) {
  const lang = isFrenchVersion ? "fr" : "en"
  const certifications = CERTIFICATIONS[lang]
  const title = isFrenchVersion ? "Galerie Produit" : "Product Gallery"

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="font-serif text-xl sm:text-2xl mb-8">{title}</h2>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {GALLERY_IMAGES.map((image, index) => (
          <div
            key={index}
            className="aspect-square overflow-hidden rounded-lg bg-secondary/30"
          >
            <Image
              src={image.src}
              alt={image.alt[lang]}
              width={400}
              height={400}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Certifications Grid */}
      <div className="mt-8 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, index) => (
          <div key={index} className="rounded-lg bg-secondary/50 p-3 sm:p-4 text-center">
            <h4 className="font-semibold text-sm sm:text-base">{cert.title}</h4>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{cert.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
