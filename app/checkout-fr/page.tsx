"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { StripeCheckoutFr } from "@/components/stripe-checkout-fr"
import { ArrowLeft, Lock, Package, RotateCcw, Shield, Star } from "lucide-react"
import { trackInitiateCheckout, generateEventId } from "@/lib/meta-pixel"
import { getFbpFbc } from "@/lib/fbp-fbc"
import { getStoredUTMs } from "@/lib/utm-client"

export default function CheckoutFrPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [initiated, setInitiated] = useState(false)

  // Filter only FR/EUR items
  const frItems = items.filter((item) => item.product.currency === "EUR")
  const totalEur = frItems.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price
    return sum + price * item.quantity
  }, 0)
  const isFreeShipping = totalEur >= 80

  const handleInitiateCheckout = () => {
    if (initiated) return
    setInitiated(true)

    const eventId = generateEventId("ic")
    const contentIds = frItems.map((item) => item.product.id)
    const numItems = frItems.reduce((sum, item) => sum + item.quantity, 0)

    trackInitiateCheckout({
      contentIds,
      numItems,
      value: totalEur,
      currency: "EUR",
      eventId,
    })

    const { fbp, fbc } = getFbpFbc()
    const utms = getStoredUTMs()

    fetch("/api/meta/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "InitiateCheckout",
        eventId,
        pageUrl: window.location.href,
        customData: {
          content_ids: contentIds,
          num_items: numItems,
          value: totalEur,
          currency: "EUR",
          ...utms,
        },
        fbp,
        fbc,
      }),
    }).catch(console.error)
  }

  if (frItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Votre panier est vide.</p>
          <Link href="/product/flexible-acoustic-panel-fr" className="mt-4 inline-block text-sm text-[#FF6B00] hover:underline">
            Retour au produit
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f7f4] py-8 px-4">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/product/flexible-acoustic-panel-fr"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
          <div className="flex-1 flex items-center justify-center gap-2">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Commande 100% Sécurisée</span>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="rounded-xl bg-white border border-border shadow-sm p-5 mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4">Récapitulatif de la commande</h2>

          {/* Items */}
          <div className="space-y-3 mb-4">
            {frItems.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-secondary/30 flex-shrink-0">
                  {item.product.image && (
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight line-clamp-2">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Qté: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold flex-shrink-0">
                  €{((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Livraison</span>
              <span className={isFreeShipping ? "text-green-600 font-semibold" : ""}>
                {isFreeShipping ? "GRATUITE" : `€7.00`}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-lg">€{totalEur.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="rounded-xl bg-white border border-border shadow-sm p-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <Lock className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-muted-foreground">Paiement 100% sécurisé SSL</span>
            </div>
            <div className="flex items-start gap-2">
              <Package className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-muted-foreground">Livraison 5-8 jours ouvrables</span>
            </div>
            <div className="flex items-start gap-2">
              <RotateCcw className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-muted-foreground">Retour gratuit sous 30 jours</span>
            </div>
            <div className="flex items-start gap-2">
              <Star className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-muted-foreground">4.8/5 — 2 847 avis clients</span>
            </div>
          </div>
        </div>

        {/* CTA + Stripe Embedded */}
        <div className="rounded-xl bg-white border border-border shadow-sm p-5 mb-4">
          <StripeCheckoutFr items={frItems} onInitiateCheckout={handleInitiateCheckout} />

          {/* Payment method icons */}
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            {["Visa", "MC", "Amex", "PayPal", "Klarna"].map((method) => (
              <span
                key={method}
                className="inline-block border border-border rounded px-2 py-0.5 text-[10px] font-medium text-muted-foreground bg-secondary/30"
              >
                {method}
              </span>
            ))}
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" />
            Vos données sont cryptées et 100% sécurisées
          </p>
        </div>
      </div>
    </div>
  )
}
