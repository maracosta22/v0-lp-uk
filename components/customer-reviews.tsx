"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ThumbsUp, User } from "lucide-react"

interface Review {
  id: string
  author: string
  rating: number
  title: string
  date: string
  country: string
  verified: boolean
  color?: string
  size?: string
  content: string
  images: string[]
  helpfulCount: number
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Marie Dubois",
    rating: 5,
    title: "Transforme complètement mon salon",
    date: "Février 20, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel",
    size: "270x110cm",
    content:
      "J'adore ce panneau acoustique! L'installation a été très facile et cela rend magnifique derrière la TV. La qualité du son s'est considérablement améliorée dans le salon. Les conversations ne résonnent plus. Je recommande vivement!",
    images: ["/fr-review-music-studio.png"],
    helpfulCount: 42,
  },
  {
    id: "2",
    author: "Jean-Pierre Moreau",
    rating: 5,
    title: "Parfait pour le télétravail",
    date: "Février 18, 2026",
    country: "France",
    verified: true,
    color: "Gris",
    size: "270x110cm",
    content:
      "J'ai installé dans mon bureau et les appels vidéo sont beaucoup meilleurs. Le panneau absorbe le bruit de fond parfaitement. C'est très professionnel derrière moi pendant les réunions en ligne.",
    images: ["/fr-review-bathroom-wall.png"],
    helpfulCount: 38,
  },
  {
    id: "3",
    author: "Béatrice Laurent",
    rating: 5,
    title: "Design et fonction parfaits",
    date: "Février 16, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel",
    size: "270x110cm",
    content:
      "Qualité excellente! Mon mari et moi avons installé autour de la TV. Le panneau est flexible et adaptable - nous avons pu contourner les prises électriques facilement. C'est absolument magnifique!",
    images: ["/fr-review-tv-entertainment.png"],
    helpfulCount: 35,
  },
  {
    id: "4",
    author: "Carlos Rodriguez",
    rating: 5,
    title: "Configuration de gaming professionnel",
    date: "Février 14, 2026",
    country: "France",
    verified: true,
    color: "Noir",
    size: "270x110cm",
    content:
      "J'ai installé avec des LED et c'est épique! L'absorption acoustique est remarquable quand je joue en ligne - mon micro prend beaucoup moins de bruit ambiant. Investissement parfait.",
    images: ["/fr-review-gaming-neon.png"],
    helpfulCount: 51,
  },
  {
    id: "5",
    author: "Fernanda Silva",
    rating: 5,
    title: "Rénovation complète du salon",
    date: "Février 12, 2026",
    country: "France",
    verified: true,
    color: "Chêne Fumé",
    size: "270x110cm",
    content:
      "Je n'imaginais pas qu'un panneau pouvait faire une telle différence! En plus d'améliorer l'acoustique, cela a complètement transformé l'aspect visuel de mon salon. Très recommandé.",
    images: ["/fr-review-intercom-wall.png"],
    helpfulCount: 29,
  },
  {
    id: "6",
    author: "Richard Blanc",
    rating: 5,
    title: "Facile à installer même en construction",
    date: "Février 10, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel",
    size: "270x110cm",
    content:
      "Je suis en phase finale de rénovation de ma maison. Le panneau est arrivé au bon moment et est très facile à travailler. Il s'intègre parfaitement dans ma vision de design. J'en prends d'autres!",
    images: ["/fr-review-curved-wall.png"],
    helpfulCount: 22,
  },
  {
    id: "7",
    author: "Inès Martin",
    rating: 5,
    title: "Solution élégante pour la salle de bain",
    date: "Février 08, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel",
    size: "270x110cm",
    content:
      "Oui, je l'ai mis dans la salle de bain au-dessus du lavabo. Le panneau est résistant et l'absorption acoustique réduit incroyablement l'écho. C'est élégant et minimaliste. Très satisfait du résultat!",
    images: ["/fr-review-dark-tv-wall.png"],
    helpfulCount: 18,
  },
  {
    id: "8",
    author: "Alexandre Ferré",
    rating: 5,
    title: "Configuration de travail premium",
    date: "Février 06, 2026",
    country: "France",
    verified: true,
    color: "Gris",
    size: "270x110cm",
    content:
      "Professionnel du son ici - ce panneau livre ce qu'il promet. L'absorption est cohérente et le design est épuré. Parfait pour un studio maison. Définitivement un investissement de qualité.",
    images: ["/fr-review-white-desk.png"],
    helpfulCount: 44,
  },
  {
    id: "9",
    author: "Suzanne Beaumont",
    rating: 5,
    title: "Mur de panneaux noirs impressionnant",
    date: "Février 04, 2026",
    country: "France",
    verified: true,
    color: "Noir",
    size: "270x110cm",
    content:
      "J'ai créé un mur d'accent avec plusieurs panneaux noirs. Le look est moderne et sophistiqué. L'acoustique de la pièce s'est considérablement améliorée. Tous mes visiteurs adorent!",
    images: ["/fr-review-room-divider.png"],
    helpfulCount: 40,
  },
  {
    id: "10",
    author: "Philippe Mercier",
    rating: 5,
    title: "Polyvalence exceptionnelle",
    date: "Février 02, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel",
    size: "270x110cm",
    content:
      "J'ai utilisé les panneaux dans plusieurs zones de ma maison - salon, bureau, même cuisine ouverte. La flexibilité permet une adaptation parfaite dans n'importe quel espace. Qualité indéniable!",
    images: ["/fr-review-fireplace-tv.png"],
    helpfulCount: 37,
  },
]

const totalReviews = 2847

export function CustomerReviews() {
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([])

  const handleHelpful = (reviewId: string) => {
    if (!helpfulReviews.includes(reviewId)) {
      setHelpfulReviews([...helpfulReviews, reviewId])
    }
  }

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

  return (
    <section className="mt-16 border-t border-border pt-12 overflow-hidden">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-serif text-xl sm:text-2xl">Avis Clients</h2>
        <div className="mt-3 flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 sm:h-5 w-4 sm:w-5 ${star <= averageRating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {averageRating.toFixed(1)} sur 5 | {totalReviews} avis
          </span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.map((review) => (
          <article key={review.id} className="border-b border-border pb-8 last:border-0">
            {/* Author */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full bg-muted flex-shrink-0">
                <User className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground" />
              </div>
              <span className="font-medium text-sm sm:text-base">{review.author}</span>
            </div>

            {/* Rating & Title */}
            <div className="flex items-start gap-2 mb-1 flex-wrap">
              <div className="flex flex-shrink-0">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 sm:h-4 w-3.5 sm:w-4 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="font-semibold text-sm sm:text-base break-words">{review.title}</span>
            </div>

            {/* Date & Location */}
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">
              Avis postés en {review.country} le {review.date}
            </p>

            {/* Product Details */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm mb-3">
              {review.size && <span className="text-muted-foreground">Taille: {review.size}</span>}
              {review.size && review.color && <span className="text-muted-foreground">|</span>}
              {review.color && <span className="text-muted-foreground">Couleur: {review.color}</span>}
              {review.verified && (
                <>
                  <span className="text-muted-foreground">|</span>
                  <span className="font-medium text-amber-600">Achat Vérifié</span>
                </>
              )}
            </div>

            {/* Content */}
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">{review.content}</p>

            {/* Images */}
            {review.images.length > 0 && (
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {review.images.map((image, index) => (
                  <div
                    key={index}
                    className="h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Review image ${index + 1}`}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Helpful */}
            <div className="flex items-center gap-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {review.helpfulCount + (helpfulReviews.includes(review.id) ? 1 : 0)} personnes trouvent cet avis utile
              </p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => handleHelpful(review.id)}
                disabled={helpfulReviews.includes(review.id)}
                className={`flex items-center gap-1.5 rounded-full border px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm transition-colors ${
                  helpfulReviews.includes(review.id)
                    ? "border-amber-300 bg-amber-50 text-amber-700"
                    : "border-border hover:bg-muted"
                }`}
              >
                <ThumbsUp className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                Utile
              </button>
              <button className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                Signaler
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="text-xs sm:text-sm font-medium text-accent hover:underline">
          Voir tous les {totalReviews} avis
        </button>
      </div>
    </section>
  )
}
