"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

interface ProductFAQProps {
  isFrenchVersion?: boolean
}

const FAQ_ITEMS: { fr: FAQItem[]; en: FAQItem[] } = {
  fr: [
    {
      question: "Est-ce que ça tient vraiment sur un mur courbe ou une colonne ?",
      answer: "Oui, c'est sa conception principale. Le feutre acoustique de 5mm au dos permet une flexibilité jusqu'à un rayon de 20cm. Des clients l'ont installé sur des colonnes de 18cm de diamètre et des arches. Photos disponibles dans les avis ci-dessous.",
    },
    {
      question: "De quoi ai-je besoin pour installer ? Faut-il un artisan ?",
      answer: "Un cutter et une règle. C'est tout. L'adhésif est pré-appliqué et repositionnable pendant 48h. 94% de nos clients posent seuls, sans expérience préalable de rénovation. Temps moyen : 25 minutes par panneau.",
    },
    {
      question: "Que se passe-t-il si je commande trop de panneaux ?",
      answer: "Les retours sont gratuits sous 30 jours pour les panneaux non découpés. Notre calculateur inclut 10% de marge pour les chutes. Vous pouvez aussi en commander l'exact minimum et revenir pour compléter si besoin.",
    },
    {
      question: "Est-ce du vrai bois ou un revêtement plastique ?",
      answer: "Vrai bois. Les lames sont en MDF massif avec finition bois véritable. Vous pouvez le poncer et le teindre comme n'importe quel bois. Aucun film PVC, aucun papier bois.",
    },
    {
      question: "Le panneau tient-il dans les pièces humides (salle de bain, cuisine) ?",
      answer: "Oui pour une utilisation normale. Plusieurs clients l'ont installé en salle de bain et au-dessus de plans de travail. Il ne faut pas l'exposer à de l'eau courante ou à la vapeur directe.",
    },
    {
      question: "Quand vais-je recevoir ma commande ?",
      answer: "Expédition sous 24-48h, livraison en 5 à 8 jours ouvrables en France métropolitaine. Vous recevez un email de suivi dès l'expédition. La livraison est gratuite sur toutes les commandes.",
    },
  ],
  en: [
    {
      question: "Does it really hold on a curved wall or column?",
      answer: "Yes, that's its main design feature. The 5mm acoustic felt backing allows flexibility up to a 20cm radius. Customers have installed it on 18cm diameter columns and arches. Photos available in the reviews below.",
    },
    {
      question: "What do I need to install? Do I need a tradesperson?",
      answer: "A cutter and a ruler. That's all. The adhesive is pre-applied and repositionable for 48h. 94% of our customers install alone, without prior renovation experience. Average time: 25 minutes per panel.",
    },
    {
      question: "What if I order too many panels?",
      answer: "Returns are free within 30 days for uncut panels. Our calculator includes a 10% margin for waste. You can also order the exact minimum and come back to complete if needed.",
    },
    {
      question: "Is it real wood or a plastic coating?",
      answer: "Real wood. The slats are solid MDF with a real wood finish. You can sand and stain it like any wood. No PVC film, no wood paper.",
    },
    {
      question: "Does the panel work in wet rooms (bathroom, kitchen)?",
      answer: "Yes for normal use. Several customers have installed it in bathrooms and above countertops. Just don't expose it to running water or direct steam.",
    },
    {
      question: "When will I receive my order?",
      answer: "Shipping within 24-48h, delivery in 5 to 8 business days in metropolitan France. You receive a tracking email as soon as it ships. Shipping is free on all orders.",
    },
  ],
}

export function ProductFAQ({ isFrenchVersion = false }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const lang = isFrenchVersion ? "fr" : "en"
  const items = FAQ_ITEMS[lang]

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="font-serif text-xl sm:text-2xl mb-6">
        {isFrenchVersion ? "Questions fréquentes" : "Frequently Asked Questions"}
      </h2>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-secondary/30 transition-colors"
            >
              <span className="font-medium text-sm sm:text-base pr-4">{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200",
                  openIndex === index && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
