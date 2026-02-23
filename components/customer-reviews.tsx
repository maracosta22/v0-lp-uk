"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ThumbsUp, User } from "lucide-react"

interface Review {
  id: string
  author: string
  rating: number
  title: string
  titleFr?: string
  date: string
  dateFr?: string
  country: string
  verified: boolean
  color?: string
  colorFr?: string
  size?: string
  content: string
  contentFr?: string
  images: string[]
  helpfulCount: number
}

interface CustomerReviewsProps {
  isFrench?: boolean
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Marie Dubois",
    rating: 5,
    title: "Transforme complètement mon salon | Completely transformed my living room",
    date: "Février 20, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel | Natural Oak",
    size: "270x110cm",
    content:
      "J'adore ce panneau acoustique! L'installation a été très facile et cela rend magnifique derrière la TV. La qualité du son s'est considérablement améliorée dans le salon. Les conversations ne résonnent plus. Je recommande vivement! | I absolutely love this acoustic panel! Installation was very easy and it looks amazing behind the TV. The sound quality in the living room has improved dramatically. Conversations no longer echo. Highly recommended!",
    images: ["/flexible-panel-natural-oak-living-room.jpg"],
    helpfulCount: 42,
  },
  {
    id: "2",
    author: "Jean-Pierre Moreau",
    rating: 5,
    title: "Parfait pour le télétravail | Perfect for remote work",
    date: "Février 18, 2026",
    country: "France",
    verified: true,
    color: "Gris | Grey",
    size: "270x110cm",
    content:
      "J'ai installé dans mon bureau et les appels vidéo sont beaucoup meilleurs. Le panneau absorbe le bruit de fond parfaitement. C'est très professionnel derrière moi pendant les réunions en ligne. | I installed it in my office and video calls are much better. The panel absorbs background noise perfectly. It looks very professional behind me during online meetings.",
    images: ["/flexible-panel-grey-tv-wall.jpg"],
    helpfulCount: 38,
  },
  {
    id: "3",
    author: "Béatrice Laurent",
    rating: 5,
    title: "Design et fonction parfaits | Perfect design and function",
    date: "Février 16, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel | Natural Oak",
    size: "270x110cm",
    content:
      "Qualité excellente! Mon mari et moi avons installé autour de la TV. Le panneau est flexible et adaptable - nous avons pu contourner les prises électriques facilement. C'est absolument magnifique! | Excellent quality! My husband and I installed it around the TV. The panel is flexible and adaptable - we were able to work around the electrical outlets easily. It's absolutely beautiful!",
    images: ["/flexible-panel-natural-oak-tv-feature.jpg"],
    helpfulCount: 35,
  },
  {
    id: "4",
    author: "Carlos Rodriguez",
    rating: 5,
    title: "Configuration de gaming professionnel | Professional gaming setup",
    date: "Février 14, 2026",
    country: "France",
    verified: true,
    color: "Noir | Black",
    size: "270x110cm",
    content:
      "J'ai installé avec des LED et c'est épique! L'absorption acoustique est remarquable quand je joue en ligne - mon micro prend beaucoup moins de bruit ambiant. Investissement parfait. | I installed it with LED lighting and it's epic! The acoustic absorption is remarkable when I play online - my microphone picks up much less ambient noise. Perfect investment.",
    images: ["/flexible-panel-smoked-oak-entertainment.jpg"],
    helpfulCount: 51,
  },
  {
    id: "5",
    author: "Fernanda Silva",
    rating: 5,
    title: "Rénovation complète du salon | Complete living room renovation",
    date: "Février 12, 2026",
    country: "France",
    verified: true,
    color: "Chêne Fumé | Smoked Oak",
    size: "270x110cm",
    content:
      "Je n'imaginais pas qu'un panneau pouvait faire une telle différence! En plus d'améliorer l'acoustique, cela a complètement transformé l'aspect visuel de mon salon. Très recommandé. | I never imagined that one panel could make such a difference! Beyond improving acoustics, it completely transformed the visual appearance of my living room. Highly recommended.",
    images: ["/flexible-panel-walnut-office.jpg"],
    helpfulCount: 29,
  },
  {
    id: "6",
    author: "Richard Blanc",
    rating: 5,
    title: "Facile à installer même en construction | Easy to install during renovation",
    date: "Février 10, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel | Natural Oak",
    size: "270x110cm",
    content:
      "Je suis en phase finale de rénovation de ma maison. Le panneau est arrivé au bon moment et est très facile à travailler. Il s'intègre parfaitement dans ma vision de design. J'en prends d'autres! | I'm in the final stages of renovating my home. The panel arrived at the perfect time and is very easy to work with. It integrates perfectly with my design vision. I'm ordering more!",
    images: ["/flexible-panel-natural-oak-entryway.jpg"],
    helpfulCount: 22,
  },
  {
    id: "7",
    author: "Inès Martin",
    rating: 5,
    title: "Solution élégante pour la salle de bain | Elegant bathroom solution",
    date: "Février 08, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel | Natural Oak",
    size: "270x110cm",
    content:
      "Oui, je l'ai mis dans la salle de bain au-dessus du lavabo. Le panneau est résistant et l'absorption acoustique réduit incroyablement l'écho. C'est élégant et minimaliste. Très satisfait du résultat! | Yes, I installed it in the bathroom above the vanity. The panel is durable and the acoustic absorption incredibly reduces echo. It's elegant and minimalist. Very satisfied with the result!",
    images: ["/flexible-panel-bathroom-accent.jpg"],
    helpfulCount: 18,
  },
  {
    id: "8",
    author: "Alexandre Ferré",
    rating: 5,
    title: "Configuration de travail premium | Premium workspace setup",
    date: "Février 06, 2026",
    country: "France",
    verified: true,
    color: "Gris | Grey",
    size: "270x110cm",
    content:
      "Professionnel du son ici - ce panneau livre ce qu'il promet. L'absorption est cohérente et le design est épuré. Parfait pour un studio maison. Définitivement un investissement de qualité. | Sound professional here - this panel delivers on its promises. The absorption is consistent and the design is clean. Perfect for a home studio. Definitely a quality investment.",
    images: ["/flexible-panel-desk-workspace.jpg"],
    helpfulCount: 44,
  },
  {
    id: "9",
    author: "Suzanne Beaumont",
    rating: 5,
    title: "Mur de panneaux noirs impressionnant | Impressive black panel wall",
    date: "Février 04, 2026",
    country: "France",
    verified: true,
    color: "Noir | Black",
    size: "270x110cm",
    content:
      "J'ai créé un mur d'accent avec plusieurs panneaux noirs. Le look est moderne et sophistiqué. L'acoustique de la pièce s'est considérablement améliorée. Tous mes visiteurs adorent! | I created an accent wall with multiple black panels. The look is modern and sophisticated. The room's acoustics have improved dramatically. All my visitors love it!",
    images: ["/flexible-panel-grey-tv-wall.jpg"],
    helpfulCount: 40,
  },
  {
    id: "10",
    author: "Philippe Mercier",
    rating: 5,
    title: "Polyvalence exceptionnelle | Exceptional versatility",
    date: "Février 02, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel | Natural Oak",
    size: "270x110cm",
    content:
      "J'ai utilisé les panneaux dans plusieurs zones de ma maison - salon, bureau, même cuisine ouverte. La flexibilité permet une adaptation parfaite dans n'importe quel espace. Qualité indéniable! | I used the panels in multiple areas of my home - living room, office, even open kitchen. The flexibility allows perfect adaptation to any space. Undeniable quality!",
    images: ["/flexible-panel-natural-oak-living-room.jpg"],
    helpfulCount: 37,
  },
  {
    id: "11",
    author: "Luc Fontaine",
    rating: 5,
    title: "Panneau + LED = Combinaison parfaite | Panel + LED = Perfect combination",
    date: "Janvier 28, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel | Natural Oak",
    size: "270x110cm",
    content:
      "J'ai ajouté les bandes LED verticales et c'est magnifique! L'éclairage chaud met en valeur les panneaux acoustiques. Non seulement l'acoustique s'améliore, mais le design de ma pièce est transformé. Installation facile avec le connecteur rapide. | I added the vertical LED strips and it's amazing! The warm lighting showcases the acoustic panels beautifully. Not only has the acoustics improved, but my room's design is completely transformed. Easy installation with the quick connector.",
    images: ["/led-acoustic-panels-living-room.jpg", "/led-bedroom-modern.jpg"],
    helpfulCount: 56,
  },
  {
    id: "12",
    author: "Isabelle Gervais",
    rating: 5,
    title: "Configuration LED chambre à coucher | Bedroom LED setup",
    date: "Janvier 25, 2026",
    country: "France",
    verified: true,
    color: "Gris | Grey",
    size: "270x110cm",
    content:
      "J'ai installé les panneaux gris avec l'éclairage LED blanc chaud dans ma chambre. L'ambiance est devenue très confortable et l'acoustique a réduit les bruits de la rue. C'est comme avoir un mini-spa à la maison! | I installed the grey panels with warm white LED lighting in my bedroom. The atmosphere became very cozy and the acoustics reduced street noise. It's like having a mini-spa at home!",
    images: ["/led-modern-bedroom-decor.jpg", "/led-dining-room-warm-lights.jpg"],
    helpfulCount: 48,
  },
  {
    id: "13",
    author: "Marc Delaunay",
    rating: 5,
    title: "Système d'éclairage professionnel | Professional lighting system",
    date: "Janvier 22, 2026",
    country: "France",
    verified: true,
    color: "Noir | Black",
    size: "270x110cm",
    content:
      "J'ai créé un setup home studio avec les panneaux noirs et les LED adjustables. Le contrôle de luminosité est incroyable - du 10% au 100%. L'absorption acoustique est excellente et les vidéos que je tourne sur ce mur sont professionnelles. | I created a home studio setup with black panels and adjustable LED lights. The brightness control is incredible - from 10% to 100%. The acoustic absorption is excellent and the videos I shoot against this wall look professional.",
    images: ["/led-black-b-specifications.jpg", "/led-4rooms-showcase.jpg"],
    helpfulCount: 62,
  },
  {
    id: "14",
    author: "Nathalie Rousseau",
    rating: 5,
    title: "Cuisine moderne avec LED | Modern kitchen with LED",
    date: "Janvier 19, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel | Natural Oak",
    size: "270x110cm",
    content:
      "J'ai installé les panneaux avec les bandes LED CIR90 au-dessus du comptoir de cuisine. L'éclairage haute luminosité révèle vraiment les détails des panneaux en bois. Cela a créé une cuisine très accueillante et fonctionnelle. L'adhésif personnalisé était très collant! | I installed the panels with CIR90 high-brightness LED strips above my kitchen counter. The high-brightness lighting really reveals the details of the wood panels. It created a very welcoming and functional kitchen. The customized adhesive tape was very sticky!",
    images: ["/led-kitchen-cabinet-lighting.jpg", "/led-adhesive-quality.jpg"],
    helpfulCount: 45,
  },
  {
    id: "15",
    author: "Thomas Arnaud",
    rating: 5,
    title: "Installtion facile avec Quick Connect | Easy installation with Quick Connect",
    date: "Janvier 16, 2026",
    country: "France",
    verified: true,
    color: "Chêne Naturel | Natural Oak",
    size: "270x110cm",
    content:
      "Le système Quick Connect a rendu l'installation des LED tellement simple! Je pensais que ce serait complexe, mais avec le câble de connexion extra-long et le guide d'installation, c'était un jeu d'enfant. Le résultat final est spectaculaire. | The Quick Connect system made LED installation so simple! I thought it would be complex, but with the extra-long connecting cable and installation guide, it was a breeze. The final result is spectacular.",
    images: ["/led-quick-connect-diagram.jpg", "/panel-installation-guide.jpg"],
    helpfulCount: 51,
  },
  {
    id: "16",
    author: "Véronique Blanc",
    rating: 5,
    title: "Certification de sécurité et qualité | Safety certification and quality",
    date: "Janvier 13, 2026",
    country: "France",
    verified: true,
    color: "Walnut | Noyer",
    size: "270x110cm",
    content:
      "J'ai été impressionnée par le rapport de test SGS montrant les faibles émissions de formaldéhyde et l'absorption acoustique NRC 0.80. C'est un produit de qualité véritablement certifié. Les panneaux se posent magnifiquement et l'ajout des LED rend tout cela très haut de gamme. | I was impressed by the SGS test report showing low formaldehyde emissions and NRC 0.80 acoustic absorption. This is truly a certified quality product. The panels look beautiful installed and the LED addition makes everything very high-end.",
    images: ["/panel-safety-certification.jpg", "/panel-acoustic-tested.jpg"],
    helpfulCount: 39,
  },
  {
    id: "17",
    author: "Claude Moreau",
    rating: 5,
    title: "Applications multiples | Multiple applications",
    date: "Janvier 10, 2026",
    country: "France",
    verified: true,
    color: "Gris | Grey",
    size: "270x110cm",
    content:
      "J'ai vu les photos d'application dans différentes pièces (bureau, chambre, salon, mur canapé) et cela m'a inspiré. J'ai acheté le kit complet avec les LED et j'ai transformé mon bureau à domicile. Les panneaux s'adaptent parfaitement à chaque espace. Vraiment impressionné! | I saw the application photos in different rooms (office, bedroom, living room, sofa wall) and it inspired me. I bought the complete kit with LED and transformed my home office. The panels fit perfectly in any space. Truly impressed!",
    images: ["/panel-room-applications.jpg", "/led-4rooms-showcase.jpg"],
    helpfulCount: 44,
  },
]

const totalReviews = 2847

export function CustomerReviews({ isFrench = false }: CustomerReviewsProps) {
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
        <h2 className="font-serif text-xl sm:text-2xl">{isFrench ? 'Avis Clients' : 'Customer Reviews'}</h2>
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
            {averageRating.toFixed(1)} {isFrench ? 'sur' : 'out of'} 5 | {totalReviews} {isFrench ? 'avis' : 'reviews'}
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
                      style={{ width: "auto", height: "auto" }}
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
