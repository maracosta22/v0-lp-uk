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

// Price per unit
const UNIT_PRICE = 14.49

export function AddToCartButton({ product, variant = "default", className, isFrenchVersion = true }: AddToCartButtonProps) {
  const { addItem, items } = useCart()
  const router = useRouter()

  // Simple quantity state - default to 5 as shown in the image
  const [quantity, setQuantity] = useState(5)

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

    const qty = overrideQty ?? quantity
    const unitPrice = overridePrice ?? UNIT_PRICE
    const totalValue = overridePrice ?? (UNIT_PRICE * quantity)

    const eventId = generateEventId("atc")
    const currency = "EUR"

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

    // Add to cart with unit price
    const productToAdd = { ...product, price: UNIT_PRICE }
    addItem(productToAdd, qty)

    // FR: persist order in sessionStorage so /checkout-fr always has data
    if (isFrenchVersion) {
      const orderData = {
        productId: product.id,
        name: product.name,
        price: UNIT_PRICE,
        totalPrice: UNIT_PRICE * qty,
        quantity: qty,
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

  // Add to cart WITHOUT redirecting (for FR version)
  const handleAddToCart = () => {
    const cartHasProducts = items.length > 0
    if (cartHasProducts) {
      const existingProduct = items[0]?.product
      const existingCurrency = existingProduct?.currency
      const newProductCurrency = product.currency

      if (existingCurrency !== newProductCurrency) {
        alert(`Cannot mix products from different markets. Please clear your cart and try again.`)
        return
      }
    }

    const totalValue = UNIT_PRICE * quantity
    const eventId = generateEventId("atc")

    // Track Meta
    trackAddToCart({
      contentId: product.id,
      contentName: product.name,
      quantity: quantity,
      value: totalValue,
      currency: "EUR",
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
          price: UNIT_PRICE,
          num_items: quantity,
          brand: 'Acoustic Design',
        }
      ],
      value: totalValue,
      currency: "EUR",
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
          contents: [{ id: product.id, quantity: quantity, item_price: UNIT_PRICE }],
          content_name: product.name,
          content_type: "product",
          value: totalValue,
          currency: "EUR",
          ...utms,
        },
        fbp,
        fbc,
      }),
    }).catch(console.error)

    // Add to cart with unit price - NO REDIRECT
    const productToAdd = { ...product, price: UNIT_PRICE }
    addItem(productToAdd, quantity)

    // Store order in sessionStorage
    const orderData = {
      productId: product.id,
      name: product.name,
      price: UNIT_PRICE,
      totalPrice: UNIT_PRICE * quantity,
      quantity: quantity,
      image: product.images?.[0] || product.image || "",
      currency: "EUR",
    }
    try {
      sessionStorage.setItem("checkout_order_fr", JSON.stringify(orderData))
    } catch (e) {
      // sessionStorage not available
    }
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
        <span>Ajouter</span>
      </Button>
    )
  }

  // French version: simple quantity selector + black CTA button with price (like reference image)
  if (isFrenchVersion) {
    const totalPrice = UNIT_PRICE * quantity
    
    return (
      <div className="flex flex-col gap-4 w-full">
        {/* Quantity Selector - centered, matching reference image */}
        <div className="flex justify-center">
          <div className="inline-flex items-center border border-gray-300 rounded-lg">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-11 w-14 items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Diminuer"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center text-lg font-medium text-gray-900">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-11 w-14 items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Augmenter"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Black rounded CTA button with price - like reference image "Buy Now - 72,45 EUR" */}
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => handleAddToCart()}
          data-add-to-cart="true"
          className="w-full flex items-center justify-center gap-3 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white py-4 px-8 transition-colors disabled:opacity-50"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-base font-medium">
            Buy Now - {totalPrice.toFixed(2).replace('.', ',')} EUR
          </span>
        </button>
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
          aria-label="Diminuer la quantité"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-12 text-center text-sm font-medium">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="flex h-full w-10 items-center justify-center transition-colors hover:bg-secondary rounded-r-md"
          aria-label="Augmenter la quantité"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      <Button onClick={() => handleBuyNow()} size="lg" className="h-12 w-full" disabled={!product.inStock} data-add-to-cart="true">
        <ShoppingBag className="mr-2 h-4 w-4" />
        {`Acheter - €${(displayPrice * quantity).toFixed(2)}`}
      </Button>
    </div>
  )
}
