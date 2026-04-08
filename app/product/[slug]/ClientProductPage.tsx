"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Check, Star, Info, ArrowLeft, Truck, RotateCcw, Shield } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/products"
import { ProductGallery } from "@/components/product-gallery"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ColorSelector } from "@/components/color-selector"
import { StyleSelector } from "@/components/style-selector"
import { LedStripCarousel } from "@/components/led-strip-carousel"
import { ProductDescriptionSection } from "@/components/product-description-section"
import { CustomerReviews } from "@/components/customer-reviews"
import { ViewContentTracker } from "@/components/view-content-tracker"
import { useScrollVisibility } from "@/hooks/use-scroll-visibility"
import { PeopleViewing } from "@/components/people-viewing"
import { ProductCard } from "@/components/product-card" // Added import for ProductCard
import { RecessedLedSection } from "@/components/recessed-led-section"
import { SamplesSection } from "@/components/samples-section"
import { AcousticLineSection } from "@/components/acoustic-line-section"
import { CountdownTimerFr } from "@/components/countdown-timer-fr"
import { ExitIntentPopupFr } from "@/components/exit-intent-popup-fr"
import { SurfaceCalculator } from "@/components/surface-calculator"
import { ProductFAQ } from "@/components/product-faq"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { PurchaseNotification } from "@/components/purchase-notification"
import { StickyCartBar } from "@/components/sticky-cart-bar"
import { PaymentIcons } from "@/components/payment-icons"

interface ClientProductPageProps {
  product: any
  relatedProducts: any[]
  decorAndLightingProducts: any[]
  frequentlyBoughtTogether: any[]
  frequentlyBoughtTotal: number
  orderBumpProducts: any[]
  isFlexibleAcousticPanel: boolean
  isRecessedLedStrip?: boolean
  discountPercent: number
  isFrenchVersion?: boolean
}

// French translations for UI text
const frenchTranslations = {
  backToProducts: "Retour aux produits",
  inStock: "En stock",
  outOfStock: "Rupture de stock",
  limitedStock: "Stock limite - Commandez maintenant!",
  selectColor: "Selectionnez la couleur",
  selectStyle: "Selectionnez le style",
  features: "Caracteristiques",
  dimensions: "Dimensions",
  material: "Materiau",
  freeShipping: "Livraison gratuite",
  freeShippingDesc: "Livraison gratuite sur toutes les commandes",
  easyReturns: "Retours faciles",
  easyReturnsDesc: "Retours sous 30 jours",
  securePayment: "Paiement securise",
  securePaymentDesc: "Vos informations sont protegees",
  frequentlyBought: "Frequemment achetes ensemble",
  addBothToCart: "Ajouter les deux au panier",
  youMightLike: "Vous pourriez aussi aimer",
  customerReviews: "Avis clients",
  wasPrice: "etait",
  save: "Economisez",
  off: "de reduction",
}

const englishTranslations = {
  backToProducts: "Back to products",
  inStock: "In stock",
  outOfStock: "Out of stock",
  limitedStock: "Limited Stock - Order Now!",
  selectColor: "Select Color",
  selectStyle: "Select Style",
  features: "Features",
  dimensions: "Dimensions",
  material: "Material",
  freeShipping: "Free Shipping",
  freeShippingDesc: "Free delivery on all orders",
  easyReturns: "Easy Returns",
  easyReturnsDesc: "30-day return policy",
  securePayment: "Secure Payment",
  securePaymentDesc: "Your information is protected",
  frequentlyBought: "Frequently Bought Together",
  addBothToCart: "Add Both to Cart",
  youMightLike: "You Might Also Like",
  customerReviews: "Customer Reviews",
  wasPrice: "was",
  save: "Save",
  off: "off",
}

export default function ClientProductPage({
  product,
  relatedProducts,
  decorAndLightingProducts,
  frequentlyBoughtTogether,
  frequentlyBoughtTotal,
  orderBumpProducts,
  isFlexibleAcousticPanel,
  isRecessedLedStrip = false,
  discountPercent,
  isFrenchVersion = false,
}: ClientProductPageProps) {
  const t = isFrenchVersion ? frenchTranslations : englishTranslations
  const { addItem, totalItems } = useCart()
  const { opacity, isVisible } = useScrollVisibility()
  const [showStickyFr, setShowStickyFr] = useState(false)

  // FR sticky CTA: show when main CTA button scrolls out of view
  useEffect(() => {
    if (!isFrenchVersion) return
    const handleScroll = () => {
      const btn = document.querySelector("[data-add-to-cart]") as HTMLElement | null
      if (btn) {
        const rect = btn.getBoundingClientRect()
        setShowStickyFr(rect.bottom < 0)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isFrenchVersion])

  const handleAddBothToCart = () => {
    frequentlyBoughtTogether.forEach((bundleProduct) => {
      addItem({
        id: bundleProduct.id,
        name: bundleProduct.name,
        price: bundleProduct.price,
        image: bundleProduct.images[0],
        quantity: 1,
      })
    })
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription || product.description,
    image: product.images,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'WOOD SHOP',
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.woodofgreen.com/product/${product.slug}`,
      priceCurrency: 'EUR',
      price: product.price.toFixed(2),
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'WOOD SHOP',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2847',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://www.woodofgreen.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Panneaux Muraux',
        item: 'https://www.woodofgreen.com/products?category=wall-panels',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://www.woodofgreen.com/product/${product.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="py-8 lg:py-12 overflow-x-hidden max-w-full w-full box-border relative">
        <ViewContentTracker product={product} />

      {/* Exit intent popup — FR only */}
      {isFrenchVersion && (
        <ExitIntentPopupFr
          onConfirm={() => {
            const btn = document.querySelector("[data-add-to-cart]") as HTMLButtonElement
            if (btn) {
              btn.scrollIntoView({ behavior: "smooth" })
            }
          }}
        />
      )}

      {/* Purchase Notification - floating at bottom left */}
      {isFlexibleAcousticPanel && <PurchaseNotification />}

      {/* Sticky Cart Bar - appears when main CTA scrolls out of view */}
      {isFrenchVersion && isFlexibleAcousticPanel && (
        <StickyCartBar
          productName={product.name}
          price={product.price}
          originalPrice={product.originalPrice || product.price * 2}
          image={product.images[0]}
          quantity={5}
          selectedColor="Chêne Naturel"
          stock={47}
          onBuyNow={() => {
            const btn = document.querySelector("[data-add-to-cart]") as HTMLButtonElement
            if (btn) btn.click()
          }}
        />
      )}

      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 overflow-hidden w-full">
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Accueil</Link></li>
            <li aria-hidden="true"><span className="mx-1">/</span></li>
            <li><Link href="/products?category=wall-panels" className="hover:text-foreground transition-colors">Panneaux Muraux</Link></li>
            <li aria-hidden="true"><span className="mx-1">/</span></li>
            <li className="font-medium text-foreground" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Gallery - sticky on desktop */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={product.images} productName={product.name} video={product.video} />
          </div>

          {/* Details */}
          <div className="flex flex-col min-w-0 w-full overflow-hidden max-w-full">
            {/* Badge - urgency styling */}
            {product.badge && (
              <span
                className={`mb-4 inline-flex items-center gap-1.5 w-fit px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                  product.onSale ? "bg-red-600 text-white rounded-sm animate-pulse" : "bg-foreground text-background"
                }`}
              >
                {product.onSale ? "Offre de Lancement — Se termine bientôt" : product.badge}
              </span>
            )}

            {/* Title & Price */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-balance break-words">{product.name}</h1>
            {isFlexibleAcousticPanel && (
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Transformez n&apos;importe quel mur en 30 min — courbes, colonnes, piliers. Zéro outil, zéro artisan, zéro chantier.
              </p>
            )}

            {isFlexibleAcousticPanel && (
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">4.9</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-sky-600 hover:text-sky-700 hover:underline cursor-pointer">(2847 avis verifies)</span>
                </div>
                <p className="text-sm">
                  <span className="font-semibold">4500+ achetés</span>{" "}
                  <span className="text-muted-foreground">le mois dernier</span>
                </p>
              </div>
            )}

            {product.onSale && product.originalPrice ? (
              <div className="mt-4">
                <span className="inline-block px-2.5 py-1 text-xs font-medium bg-red-600 text-white rounded-sm mb-3">
                  Offre limitée
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-medium text-red-600">-{discountPercent}%</span>
                  <span className="text-2xl sm:text-3xl font-medium text-foreground">€{Math.floor(product.price)}</span>
                  <span className="text-sm align-top relative -top-2">
                    {((product.price % 1) * 100).toFixed(0).padStart(2, "0")}
                  </span>
                  {isFlexibleAcousticPanel && (
                    <span className="text-sm sm:text-base text-muted-foreground ml-1">/ pièce</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-sm text-muted-foreground">Prix habituel:</span>
                  <span className="text-sm text-muted-foreground line-through">
                    €{product.originalPrice.toFixed(2)}
                  </span>
                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-pointer flex-shrink-0" />
                </div>
                {isFlexibleAcousticPanel && (
                  <div className="mt-3">
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "73%" }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      73% des stocks vendus | Il reste <strong className="text-foreground">47 panneaux</strong>
                    </p>
                  </div>
                )}
                {isFlexibleAcousticPanel && <PeopleViewing isFrench={isFrenchVersion} />}
              </div>
            ) : (
              <div className="mt-4">
                <p className="font-serif text-2xl">€{product.price}</p>
              </div>
            )}



            {isFlexibleAcousticPanel ? (
              <div className="mt-6 space-y-5 max-w-full overflow-hidden">
                {/* Clear Hero Promise */}
                <div className="bg-secondary/50 border border-border/50 rounded-lg p-4">
                  <p className="text-lg sm:text-xl font-serif font-medium text-foreground leading-snug text-center">
                    Transformez Votre Mur en Minutes — Sans Outils, Sans Salissure
                  </p>
                  <div className="flex justify-center gap-3 mt-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-accent">
                      <Check className="h-3.5 w-3.5" /> Flexible
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-accent">
                      <Check className="h-3.5 w-3.5" /> Acoustique
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-accent">
                      <Check className="h-3.5 w-3.5" /> Auto-Adhésif
                    </span>
                  </div>
                </div>

                {/* How It Works - 3 Steps */}
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-center mb-4">
                    Comment Ça Marche
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                        <span className="text-accent font-bold">1</span>
                      </div>
                      <p className="text-xs font-medium">Décollez le film protecteur</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                        <span className="text-accent font-bold">2</span>
                      </div>
                      <p className="text-xs font-medium">Posez & appuyez 30s</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                        <span className="text-accent font-bold">3</span>
                      </div>
                      <p className="text-xs font-medium">Admirez le résultat</p>
                    </div>
                  </div>
                </div>

                <p className="leading-relaxed text-muted-foreground text-sm sm:text-base">
                  Votre mur TV a l&apos;air vide ? Vos appels en visio résonnent dans toute la pièce ? Ce panneau règle les deux problèmes en 30 minutes : il réduit l&apos;écho de 80%, couvre les murs les plus complexes et donne à chaque pièce le look d&apos;un intérieur de magazine.
                </p>
                
                <ul className="space-y-2.5 pt-2">
                  <li className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Flexible</strong> — S&apos;adapte aux courbes, colonnes et piliers sans découpe spéciale</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Installé en 30 min</strong> — Adhésif pré-appliqué, repositionnable 48h, aucun outil requis</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Zéro chantier</strong> — Pas de peinture, pas de colle, pas de poussière, pas de bruit</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>NRC 0.80 certifié SGS</strong> — Élimine les échos et réverbérations, prouvé en laboratoire</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Vrai bois MDF</strong> — Ponçable, teignable. Aspect architecte, prix accessible</span>
                  </li>
                </ul>
                <div className="pt-2 space-y-1.5 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Taille:</span> 270 × 110 cm — couvre jusqu&apos;à 3m²
                  </p>
                  <p className="text-xs italic">
                    Parfait pour les murs TV, les murs de caractéristique et les zones d&apos;accent.
                  </p>
                  <p className="break-words">
                    <span className="font-medium text-foreground">Couleurs disponibles:</span> Chêne Naturel, Chêne Fumé, Noyer, Chêne Gris
                  </p>
                </div>

                {/* Certifications & Features Grid */}
                <div className="mt-8 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg bg-secondary/50 p-3 sm:p-4 text-center">
                    <h4 className="font-semibold text-sm sm:text-base">NRC 0.80</h4>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Excellente absorption sonore</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3 sm:p-4 text-center">
                    <h4 className="font-semibold text-sm sm:text-base">Certifié E1</h4>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Faible émission de formaldéhyde</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3 sm:p-4 text-center">
                    <h4 className="font-semibold text-sm sm:text-base">Facile à installer</h4>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Installation DIY</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3 sm:p-4 text-center">
                    <h4 className="font-semibold text-sm sm:text-base">6 Couleurs</h4>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">S&apos;adapte à tout intérieur</p>
                  </div>
                </div>

                <div className="pt-6 flex items-start gap-3">
                  <p className="text-sm font-medium text-[#b08968] leading-snug">
                    Rejoignez les <strong>4 500+ clients</strong> qui ont transformé leur intérieur ce mois-ci.
                  </p>
                  <span className="flex-shrink-0 text-xs text-muted-foreground whitespace-nowrap mt-0.5">Il reste 47 pièces</span>
                </div>
              </div>
            ) : (
              <p className="mt-6 leading-relaxed text-muted-foreground break-words">{product.longDescription}</p>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && <ColorSelector colors={product.colors} />}
            {product.styles && product.styles.length > 0 && <StyleSelector styles={product.styles} />}

            {/* Add to Cart */}
            <div className="mt-8 flex flex-col gap-4">
              <AddToCartButton product={product} isFrenchVersion={true} />
            </div>

            {/* Trust Badges - improved copy */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border py-6">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-6 w-6 text-muted-foreground" />
                <span className="mt-2 text-xs sm:text-sm text-muted-foreground leading-tight">
                  Livraison offerte dès 80€
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="h-6 w-6 text-muted-foreground" />
                <span className="mt-2 text-xs sm:text-sm text-muted-foreground leading-tight">Retours gratuits 30 jours</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-6 w-6 text-muted-foreground" />
                <span className="mt-2 text-xs sm:text-sm text-muted-foreground leading-tight">Garantie 5 ans</span>
              </div>
            </div>
            
            {/* Payment Icons */}
            <PaymentIcons />

            {/* Frequently Bought Together */}
            {frequentlyBoughtTogether.length > 0 && (
              <div className="mt-8 border-t border-border pt-8">
                <h2 className="text-base font-bold uppercase tracking-wide mb-6">FREQUEMMENT ACHETES ENSEMBLE</h2>
                
                {/* Products row */}
                <div className="flex items-start gap-2 mb-6">
                  {frequentlyBoughtTogether.map((bundleProduct, index) => (
                    <div key={bundleProduct.id} className="flex items-center">
                      <div className="w-32 sm:w-36">
                        <Link href={`/product/${bundleProduct.slug}`} className="block">
                          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                            <Image
                              src={bundleProduct.images[0] || "/placeholder.svg"}
                              alt={bundleProduct.name}
                              width={144}
                              height={144}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
<div className="mt-2">
                            <h3 className="text-sm font-medium leading-tight line-clamp-2 text-blue-600">
                              {bundleProduct.name.includes('STARWAX') 
                                ? 'STARWAX Anti-...' 
                                : bundleProduct.name.includes('LED') 
                                  ? 'Kit Ruban LED Encastre' 
                                  : bundleProduct.name.substring(0, 15) + '...'}
                            </h3>
                            <p className="text-sm font-bold mt-1">€{bundleProduct.price}</p>
                          </div>
                      </div>
                      {index < frequentlyBoughtTogether.length - 1 && (
                        <span className="text-lg font-light text-gray-400 mx-2">+</span>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Price & Button - exactly matching reference image */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-gray-500">Prix total:</p>
                    <p className="text-2xl font-bold">€{frequentlyBoughtTotal.toFixed(2)}</p>
                  </div>
                  <button
                    type="button"
                    className="px-6 py-3 text-base font-medium bg-[#b08968] text-white rounded-lg hover:bg-[#9a7759] transition-colors whitespace-nowrap"
                    onClick={handleAddBothToCart}
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            )}

            {/* Surface Calculator - Only for Flexible Acoustic Panel */}
            {isFlexibleAcousticPanel && <SurfaceCalculator isFrenchVersion={true} />}

            {/* Acoustic Line Section - Only for Flexible Acoustic Panel */}
            {isFlexibleAcousticPanel && <AcousticLineSection isFrenchVersion={true} />}

            {/* You Might Also Like */}
            {orderBumpProducts.length > 0 && (
              <div className="mt-8 border-t border-border pt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-4">Vous pourriez aussi aimer</h2>
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-3 px-3">
                  {orderBumpProducts.map((bumpProduct) => (
                    <div
                      key={bumpProduct.id}
                      className="flex-shrink-0 w-32 sm:w-36 bg-secondary/30 rounded-lg overflow-hidden flex flex-col"
                    >
                      <Link href={`/product/${bumpProduct.slug}`} className="block">
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={bumpProduct.images[0] || "/placeholder.svg"}
                            alt={bumpProduct.name}
                            width={144}
                            height={144}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                          {bumpProduct.badge && (
                            <span className="absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium uppercase bg-foreground text-background">
                              {bumpProduct.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                      <div className="p-2 flex flex-col flex-1">
                        <Link href={`/product/${bumpProduct.slug}`}>
                          <h3 className="text-xs font-medium leading-tight h-8 line-clamp-2 hover:text-accent transition-colors">
                            {bumpProduct.name}
                          </h3>
                        </Link>
                        <p className="text-xs font-semibold mt-1">€{bumpProduct.price}</p>
                        <div className="mt-auto pt-2">
                          <AddToCartButton product={bumpProduct} variant="icon" className="w-full h-7 text-xs" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Details */}
            <div className="mt-8 border-t border-border pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider">{t.features}</h2>
              <dl className="mt-4 space-y-3">
                {product.dimensions && (
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                    <dt className="text-muted-foreground shrink-0">{t.dimensions}</dt>
                    <dd className="text-foreground break-words">{product.dimensions}</dd>
                  </div>
                )}
                {product.material && (
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                    <dt className="text-muted-foreground shrink-0">{t.material}</dt>
                    <dd className="text-foreground break-words">{product.material}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="mt-8 border-t border-border pt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider">{t.features}</h2>
                <ul className="mt-4 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="text-muted-foreground flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* LED Strip Lifestyle Carousel - Only for Recessed LED Strip */}
            {product.id === "prod_led_strip" && <LedStripCarousel />}

            {/* Samples Section - Only for Flexible Acoustic Panel */}
            {isFlexibleAcousticPanel && <SamplesSection isFrenchVersion={true} />}
          </div>
        </div>

        {/* Product Description Section */}
        {isFlexibleAcousticPanel && <ProductDescriptionSection />}

        {/* Product Image Gallery - Only for Flexible Acoustic Panel */}
        {isFlexibleAcousticPanel && <ProductImageGallery images={product.images} productName={product.name} isFrenchVersion={true} />}

        {/* FAQ Section - Only for Flexible Acoustic Panel */}
        {isFlexibleAcousticPanel && <ProductFAQ isFrenchVersion={true} />}

        {/* Customer Reviews Section */}
        {isFlexibleAcousticPanel && <CustomerReviews isFrench={true} />}

        {/* Recessed LED Strip Section */}
        {isRecessedLedStrip && <RecessedLedSection />}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-24">
            <h2 className="mb-6 sm:mb-8 font-serif text-xl sm:text-2xl">Vous pourriez aussi aimer</h2>
            <div className="grid gap-4 sm:gap-8 grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}

        {/* Decor & Lighting cross-sell section */}
        {decorAndLightingProducts.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <h2 className="mb-4 sm:mb-8 font-serif text-xl sm:text-2xl">Complétez Votre Espace</h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground">
              Explorez notre sélection de décoration et d&apos;éclairage pour compléter vos panneaux.
            </p>
            <div className="grid gap-4 sm:gap-8 grid-cols-2 lg:grid-cols-4">
              {decorAndLightingProducts.map((crossProduct) => (
                <ProductCard key={crossProduct.id} product={crossProduct} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* FR Sticky CTA for Mobile — aparece quando o botão principal sai da tela */}
      {isFlexibleAcousticPanel && showStickyFr && (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 bg-white border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.12)] px-4 py-3">
          <button
            onClick={() => {
              const addButton = document.querySelector("[data-add-to-cart]") as HTMLButtonElement
              if (addButton) {
                addButton.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold text-base py-4 transition-colors shadow-lg"
          >
            <ShoppingCart className="h-5 w-5 flex-shrink-0" />
            Buy Now - {product.price.toFixed(2).replace('.', ',')} EUR
          </button>
          <p className="text-center text-[10px] text-muted-foreground mt-1.5">Paiement 100% Sécurisé • Livraison 5-8 jours</p>
        </div>
      )}


    </div>
    </>
  )
}
