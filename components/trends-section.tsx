import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TrendsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src="/trend-japandi-interior-natural-wood.jpg"
                  alt="Intérieur Japandi avec éléments en bois naturel"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/trend-acoustic-panel-office-modern.jpg"
                  alt="Bureau moderne avec panneaux acoustiques"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/trend-minimalist-lamp-bedroom.jpg"
                  alt="Lampe minimaliste dans une chambre"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src="/trend-ceramic-decor-shelf.jpg"
                  alt="Décoration céramique sur étagère minimaliste"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Tendances Design</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              L&apos;Art de Vivre Japandi
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Là où le minimalisme japonais rencontre la fonctionnalité scandinave. Notre collection incarne l&apos;équilibre parfait entre chaleur et simplicité, créant des espaces à la fois sereins et accueillants.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-muted-foreground">Matériaux naturels qui vieillissent magnifiquement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-muted-foreground">Lignes épurées avec détails organiques et artisanaux</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-muted-foreground">Palettes neutres qui créent des environnements calmes et focalisés</span>
              </li>
            </ul>
            <Button asChild className="mt-8" size="lg">
              <Link href="/products">
                Explorer la Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
