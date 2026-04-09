"use client"

import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"

export function FloatingCartButton() {
  const { items, totalPrice } = useCart()
  const router = useRouter()

  // Only show if cart has items
  if (items.length === 0) return null

  const handleCheckout = () => {
    router.push("/checkout-fr")
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#2d2518] px-4 py-4 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
      <div className="mx-auto max-w-md">
        {/* Total */}
        <p className="text-white text-base font-bold mb-3">
          Total : {totalPrice.toFixed(2).replace('.', ',')} EUR
        </p>
        
        {/* Green checkout button - matching reference image exactly */}
        <button
          onClick={handleCheckout}
          className="w-full flex items-center justify-center gap-2.5 bg-[#5cd97f] hover:bg-[#4eca6e] text-white font-medium py-3.5 px-6 rounded-xl transition-colors"
        >
          <Lock className="w-4 h-4" strokeWidth={2.5} />
          <span className="text-base">Finaliser ma commande</span>
        </button>
      </div>
    </div>
  )
}
