import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const values = [
  {
    title: "Artisanat",
    description:
      "Chaque pièce de notre collection est fabriquée avec une attention méticuleuse aux détails, utilisant des techniques ancestrales transmises de génération en génération.",
  },
  {
    title: "Durabilité",
    description:
      "Nous approvisionnons nos matériaux de manière responsable, travaillons avec des fournisseurs certifiés FSC et concevons des produits qui résistent à l'épreuve du temps — réduisant les déchets par la longévité.",
  },
  {
    title: "Design Intemporel",
    description:
      "Nous croyons en un design qui transcende les tendances. Nos pièces sont créées pour devenir des éléments chéris de votre intérieur pour les années à venir.",
  },
]

const team = [
  {
    name: "Lena Bergström",
    role: "Fondatrice & Directrice Créative",
    image: "/professional-scandinavian-blonde-woman-founder-por.jpg",
  },
  {
    name: "Anders Nilsson",
    role: "Responsable Production",
    image: "/professional-scandinavian-man-production-manager-p.jpg",
  },
  {
    name: "Sofia Lindqvist",
    role: "Designer Principal",
    image: "/professional-scandinavian-brunette-woman-designer-.jpg",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl text-balance">
              Un Design Qui Vit Avec Vous
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              WOOD SHOP a été fondé à Copenhague en 2019 avec une mission simple : apporter la chaleur et l&apos;authenticité de l&apos;artisanat du bois premium dans les maisons modernes à travers l&apos;Europe.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="aspect-[4/5] overflow-hidden">
              <Image
                src="/woodworking-workshop-craftsman-working-on-wood-sla.jpg"
                alt="Atelier WOOD SHOP avec artisan travaillant sur des panneaux en bois"
                width={600}
                height={750}
                className="w-full h-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Notre Histoire</span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Née d&apos;un Amour des Matériaux Naturels</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Notre fondatrice, Lena Bergström, a grandi entourée des forêts de Suède. Son grand-père était menuisier et lui a appris que le bois a une âme — chaque grain raconte une histoire, chaque nœud porte un caractère.
                </p>
                <p>
                  Après des années de travail dans la production de meubles industriels, Lena s&apos;est sentie déconnectée des matériaux qu&apos;elle aimait. En 2019, elle est revenue à ses racines, s&apos;associant à de petits ateliers à travers la Scandinavie pour créer une collection qui honore l&apos;artisanat traditionnel tout en répondant aux besoins de la vie contemporaine.
                </p>
                <p>
                  Aujourd&apos;hui, WOOD SHOP travaille avec plus de 20 ateliers artisanaux, des forêts de chêne du Danemark aux studios de céramique du Portugal. Chaque produit que nous proposons a été touché par des mains humaines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="sustainability" className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl sm:text-4xl">Ce Que Nous Défendons</h2>
            <p className="mt-4 text-muted-foreground">
              Nos valeurs guident chaque décision, des matériaux que nous approvisionnons aux partenaires avec lesquels nous travaillons.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <div key={index} className="bg-background p-8">
                <h3 className="font-serif text-xl">{value.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="careers" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl">Les Personnes Derrière WOOD SHOP</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Une équipe passionnée de designers, artisans et rêveurs dédiés à apporter un beau design dans votre maison.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto aspect-square w-48 overflow-hidden rounded-full bg-secondary">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    sizes="192px"
                  />
                </div>
                <h3 className="mt-6 font-serif text-lg">{member.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl sm:text-4xl">Prêt à Transformer Votre Espace ?</h2>
            <p className="mt-4 text-muted-foreground">
              Explorez notre collection de panneaux muraux en bois premium et de décoration intérieure sélectionnée pour l&apos;ajout parfait à votre maison.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/products">
                Voir la Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
