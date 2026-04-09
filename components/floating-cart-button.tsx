"use client"

import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"

export function FloatingCartButton() {
  const { items, total } = useCart()
  const router = useRouter()

  // Only show if cart has items
  if (items.length === 0) return null

  const handleCheckout = () => {
    router.push("/checkout-fr")
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#3d3529] px-4 py-3 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
      <div className="mx-auto max-w-lg">
        {/* Total */}
        <p className="text-white text-base font-semibold mb-2">
          Total : {total.toFixed(2).replace('.', ',')} EUR
        </p>
        
        {/* Green checkout button */}
        <button
          onClick={handleCheckout}
          className="w-full flex items-center justify-center gap-2 bg-[#4ade80] hover:bg-[#22c55e] text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          <Lock className="w-4 h-4" />
          <span>Finaliser ma commande</span>
        </button>
      </div>
    </div>
  )
}
