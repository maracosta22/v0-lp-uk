'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface StickyCartBarProps {
  productName: string
  price: number
  originalPrice: number
  image: string
  quantity: number
  selectedColor: string
  stock: number
  onBuyNow: () => void
}

export function StickyCartBar({
  productName, price, originalPrice, image,
  quantity, selectedColor, stock, onBuyNow
}: StickyCartBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const btn = document.querySelector("[data-add-to-cart]") as HTMLElement | null
      if (btn) {
        const rect = btn.getBoundingClientRect()
        setVisible(rect.bottom < 0)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-2xl px-3 py-2.5 sm:px-6 sm:py-3 animate-in slide-in-from-bottom-full duration-300">
      <div className="mx-auto max-w-7xl flex items-center gap-2 sm:gap-3">
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-secondary">
          <Image src={image} alt={productName} width={40} height={40} className="object-contain w-full h-full" unoptimized />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground truncate hidden sm:block">{productName}</p>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-sm font-bold">{price.toFixed(2).replace('.', ',')}€</span>
            <span className="text-xs text-muted-foreground line-through hidden sm:inline">{originalPrice.toFixed(2).replace('.', ',')}€</span>
            <span className="text-xs font-bold text-red-600">-{discount}%</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <span>{selectedColor}</span>
          <span>·</span>
          <span>{quantity} pcs</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-orange-600 font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
          </span>
          Il reste {stock}
        </div>
        <button
          onClick={onBuyNow}
          className="flex-shrink-0 rounded-full bg-[#1a1a1a] hover:bg-[#333] text-white font-semibold text-sm py-2.5 px-5 transition-colors whitespace-nowrap"
        >
          Commander
        </button>
      </div>
    </div>
  )
}
