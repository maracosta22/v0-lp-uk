'use client'

import { useEffect, useState } from 'react'

export function StickyCartBarFr() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show when the add-to-cart button is out of view
      const addToCartBlock = document.querySelector('[data-add-to-cart]')
      if (addToCartBlock) {
        const rect = addToCartBlock.getBoundingClientRect()
        setVisible(rect.bottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    const addToCartBlock = document.querySelector('[data-add-to-cart]')
    addToCartBlock?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div
      className={`fixed left-0 right-0 z-[999] bg-[#2C1810] border-t border-white/10 px-4 py-3 transition-all duration-300 ease-out ${
        visible ? 'bottom-0' : '-bottom-20'
      }`}
      style={{ 
        boxShadow: visible ? '0 -4px 20px rgba(0,0,0,0.15)' : 'none' 
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        {/* Product info - hidden on mobile */}
        <div className="hidden sm:flex flex-col gap-0.5">
          <span className="text-sm font-medium text-[#FAF7F2]">
            Panneau Acoustique Flexible
          </span>
          <span className="text-xs text-[#FAF7F2]/60">
            4.9 - 2847 avis
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base sm:text-lg font-bold text-[#FAF7F2]">
            a partir de 59 EUR
          </span>
          <span className="text-xs sm:text-sm text-[#FAF7F2]/50 line-through">
            96,80 EUR
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleClick}
          className="flex-1 sm:flex-none px-6 py-2.5 bg-[#C8522A] text-white rounded-lg font-medium text-sm hover:bg-[#A8421A] active:scale-[0.97] transition-all whitespace-nowrap"
        >
          Choisir mon pack
        </button>
      </div>
    </div>
  )
}
