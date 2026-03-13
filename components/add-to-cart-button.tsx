"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react"
import { trackAddToCart, generateEventId } from "@/lib/meta-pixel"
import { trackAddToCart as trackTikTokAddToCart } from "@/lib/tiktok-events"
import { getFbpFbc } from "@/lib/fbp-fbc"
import { getStoredUTMs } from "@/lib/utm-client"

interface AddToCartButtonProps {
  product: Product
  variant?: "default" | "icon"
  className?: string
  isFrenchVersion?: boolean
}

// FR upsell quantity options with coverage context
const frQuantities = [
  { qty: 2, price: 59.00, label: "2 Panneaux", badge: null, savings: null, freeShipping: true, coverage: "~6 m2", ideal: "Coin TV ou colonne", pricePerPanel: "29,50" },
  { qty: 6, price: 179.00, label: "6 Panneaux", badge: "Meilleure Valeur", savings: "€30,40", freeShipping: true, coverage: "~18 m2", ideal: "Mur entier standard", pricePerPanel: "29,83" },
  { qty: 8, price: 229.00, label: "8 Panneaux", badge: "Le Plus Populaire", savings: "€50,20", freeShipping: true, coverage: "~24 m2", ideal: "Grand salon", pricePerPanel: "28,63" },
  { qty: 10, price: 279.00, label: "10 Panneaux", badge: null, savings: "€70,00", freeShipping: true, coverage: "~30 m2", ideal: "Mur + accent", pricePerPanel: "27,90" },
  { qty: 12, price: 329.00, label: "12 Panneaux", badge: "Pack Pro - LED Offert", savings: "€89,80", freeShipping: true, coverage: "~36 m2", ideal: "Suite complete", pricePerPanel: "27,42" },
]

export function AddToCartButton({ product, variant = "default", className, isFrenchVersion = false }: AddToCartButtonProps) {
  const { addItem, items } = useCart()
  const router = useRouter()

  // FR: default to 6 panels option (index 1) - Meilleure Valeur
  const [selectedQtyOption, setSelectedQtyOption] = useState(frQuantities[1])
  // Non-FR: simple quantity
  const [quantity, setQuantity] = useState(1)

  const handleBuyNow = (overrideQty?: number, overridePrice?: number) => {
    // Check if cart has products with different currency
    const cartHasProducts = items.length > 0
    if (cartHasProducts) {
      const existingProduct = items[0]?.product
      const existingCurrency = existingProduct?.currency
      const newProductCurrency = product.currency

      // Prevent mixing EUR and GBP products
      if (existingCurrency !== newProductCurrency) {
        alert(`Cannot mix products from different markets. Please clear your cart and try again.`)
        return
      }
    }

    const qty = overrideQty ?? (isFrenchVersion ? selectedQtyOption.qty : quantity)
    const unitPrice = overridePrice ?? (isFrenchVersion ? selectedQtyOption.price / selectedQtyOption.qty : (product.salePrice || product.price))
    const totalValue = overridePrice ?? (isFrenchVersion ? selectedQtyOption.price : (product.salePrice || product.price) * quantity)

    const eventId = generateEventId("atc")
    const currency = isFrenchVersion ? "EUR" : "GBP"

    // Track Meta
    trackAddToCart({
      contentId: product.id,
      contentName: product.name,
      quantity: qty,
      value: totalValue,
      currency: currency,
      eventId,
    })

    // Track TikTok
    trackTikTokAddToCart({
      contents: [
        {
          content_id: product.id,
          content_type: 'product',
          content_name: product.name,
          content_category: product.category,
          price: unitPrice,
          num_items: qty,
          brand: 'Acoustic Design',
        }
      ],
      value: totalValue,
      currency: currency,
      description: product.name,
    })

    // Send CAPI event
    const { fbp, fbc } = getFbpFbc()
    const utms = getStoredUTMs()

    fetch("/api/meta/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "AddToCart",
        eventId,
        pageUrl: window.location.href,
        customData: {
          content_ids: [product.id],
          contents: [{ id: product.id, quantity: qty, item_price: unitPrice }],
          content_name: product.name,
          content_type: "product",
          value: totalValue,
          currency: currency,
          ...utms,
        },
        fbp,
        fbc,
      }),
    }).catch(console.error)

    // For FR upsell, add the selected qty as a single cart entry with adjusted price
    const productToAdd = isFrenchVersion
      ? { ...product, price: selectedQtyOption.price / selectedQtyOption.qty }
      : product
    addItem(productToAdd, qty)

    // FR: persist order in sessionStorage so /checkout-fr always has data
    if (isFrenchVersion) {
      const orderData = {
        productId: product.id,
        name: product.name,
        price: selectedQtyOption.price / selectedQtyOption.qty,
        totalPrice: selectedQtyOption.price,
        quantity: selectedQtyOption.qty,
        image: product.images?.[0] || product.image || "",
        currency: "EUR",
      }
      try {
        sessionStorage.setItem("checkout_order_fr", JSON.stringify(orderData))
      } catch (e) {
        // sessionStorage not available — cart context will be used as fallback
      }
    }

    // FR version goes to optimized pre-checkout summary page
    router.push(isFrenchVersion ? "/checkout-fr" : "/cart")
  }

  const displayPrice = product.salePrice || product.price

  // Icon variant for order bump - compact add to cart button
  if (variant === "icon") {
    return (
      <Button
        onClick={() => handleBuyNow(1, displayPrice)}
        size="sm"
        variant="outline"
        className={`gap-1 ${className || ""}`}
        disabled={!product.inStock}
      >
        <ShoppingBag className="h-3 w-3" />
        <span>Add</span>
      </Button>
    )
  }

  // French version: upsell quantity selector + orange CTA button
  if (isFrenchVersion) {
    return (
      <div className="flex flex-col gap-3 w-full">
        {/* Quantity upsell cards */}
        <div className="space-y-2" data-bundle-selector>
          {frQuantities.map((option) => {
            const isSelected = selectedQtyOption.qty === option.qty
            return (
              <button
                key={option.qty}
                type="button"
                onClick={() => setSelectedQtyOption(option)}
                data-bundle={option.qty}
                className={`w-full rounded-lg border-2 px-4 py-3 transition-all ${
                  isSelected
                    ? "border-[#FF6B00] bg-orange-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-900">{option.label}</span>
                    {option.badge && (
                      <span className={`text-white text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        option.badge === "Le Plus Populaire" ? "bg-green-600" : option.badge.includes("LED") ? "bg-purple-600" : "bg-amber-600"
                      }`}>
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{option.price.toFixed(0)} EUR</span>
                </div>
                {/* Coverage context */}
                <div className="text-xs text-gray-500 mb-1.5">
                  {option.coverage} - Ideal pour {option.ideal}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {option.savings ? (
                      <span className="text-green-700 font-medium">Economisez {option.savings}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-500">{option.pricePerPanel} EUR / panneau</span>
                  </div>
                  {option.freeShipping && (
                    <span className="text-green-700 font-medium">Livraison gratuite</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Orange CTA button with dynamic copy */}
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => handleBuyNow()}
          data-add-to-cart="true"
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold text-base py-4 px-8 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
        >
          <ShoppingCart className="h-5 w-5 flex-shrink-0" />
          Transformer mes {selectedQtyOption.coverage} — {selectedQtyOption.price.toFixed(0)} EUR
        </button>

        {/* Trust signal row */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Paiement securise
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            Livraison gratuite
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
            Retour 30j gratuit
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Garantie 5 ans
          </span>
        </div>
      </div>
    )
  }

  // Default English version
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Quantity Selector - compact and centered */}
      <div className="flex h-10 w-32 items-center justify-center border border-border rounded-md">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-full w-10 items-center justify-center transition-colors hover:bg-secondary rounded-l-md"
          aria-label="Decrease quantity"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-12 text-center text-sm font-medium">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="flex h-full w-10 items-center justify-center transition-colors hover:bg-secondary rounded-r-md"
          aria-label="Increase quantity"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      <Button onClick={() => handleBuyNow()} size="lg" className="h-12 w-full" disabled={!product.inStock} data-add-to-cart="true">
        <ShoppingBag className="mr-2 h-4 w-4" />
        {product.currency === "BRL"
          ? `Comprar - R$${(displayPrice * quantity).toFixed(2)}`
          : `Buy Now - £${displayPrice * quantity}`}
      </Button>
    </div>
  )
}
