import Image from "next/image"

const CONTENT = {
  en: {
    supra: "Sophistication in Every Detail",
    title: "Acoustic Line",
    subtitle: "Discover the features of our slatted acoustic panels",
    blocks: [
      {
        title: "Acoustic Efficiency",
        text: "Experience unmatched sound quality with our decorative slatted panels, carefully engineered to enhance the acoustics of any room.",
        image: "/images/acustika-efficiency.jpg",
      },
      {
        title: "Easy to Clean",
        text: "Keeping your spaces looking beautiful has never been easier. Our slatted panels are designed to simplify your routine: simply wipe with a dry or slightly damp cloth to remove dust or light marks, without compromising the flawless finish. Functionality and practicality for your everyday life.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Caracteristicas-Facil-de-instalar-tTBaUKwKi4AyDqZpyQSaRsdncnw4Uf.webp",
      },
      {
        title: "European Design for Interiors",
        text: "Bring the timeless elegance of Scandinavian design into your home, the perfect combination of functionality and aesthetics, with our sophisticated slatted wood panels.",
        image: "/images/acustika-european-design.jpg",
      },
    ],
  },
  fr: {
    supra: "Sophistication dans chaque detail",
    title: "Ligne Acoustique",
    subtitle: "Decouvrez les caracteristiques de nos panneaux acoustiques a lattes",
    blocks: [
      {
        title: "Efficacite Acoustique",
        text: "NRC 0.85 — chaque panneau absorbe 85% des ondes sonores. Conversations nettes, musique precise, silence dans les open-spaces. Certifie SGS.",
        image: "/images/acustika-efficiency.jpg",
      },
      {
        title: "Entretien Zero",
        text: "Un chiffon sec suffit. Aucun produit special, aucune precaution particuliere. Le bois garde sa finition premium apres des annees d'utilisation.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Caracteristicas-Facil-de-instalar-tTBaUKwKi4AyDqZpyQSaRsdncnw4Uf.webp",
      },
      {
        title: "Design Europeen",
        text: "Concu en Europe. Lames de chene massif avec ecartement millimetre pour un rendu architectural. Le meme look que les hotels 5 etoiles — a installer soi-meme.",
        image: "/images/acustika-european-design.jpg",
      },
    ],
  },
}

interface AcousticLineSectionProps {
  isFrenchVersion?: boolean
}

export function AcousticLineSection({ isFrenchVersion = false }: AcousticLineSectionProps) {
  const lang = isFrenchVersion ? "fr" : "en"
  const t = CONTENT[lang]

  return (
    <section className="mt-16 sm:mt-24">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          {t.supra}
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3">
          {t.title}
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Content blocks */}
      <div className="space-y-12 sm:space-y-16">
        {t.blocks.map((block, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-6">
            {/* Image */}
            <div className="w-full max-w-lg overflow-hidden rounded-xl">
              <Image
                src={block.image}
                alt={block.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>

            {/* Text */}
            <div className="max-w-md">
              <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-3">
                {block.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {block.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
