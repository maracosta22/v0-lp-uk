"use client"

import { useEffect, useState } from "react"

interface PeopleViewingProps {
  isFrench?: boolean
}

export function PeopleViewing({ isFrench = false }: PeopleViewingProps) {
  const [buyers, setBuyers] = useState(35)

  useEffect(() => {
    // Inicial: número aleatório entre 30-45 para buyers
    setBuyers(Math.floor(Math.random() * (45 - 30 + 1)) + 30)

    // Muda os compradores a cada 8-15 segundos
    const buyersInterval = setInterval(() => {
      setBuyers(Math.floor(Math.random() * (45 - 30 + 1)) + 30)
    }, Math.random() * 7000 + 8000)

    return () => {
      clearInterval(buyersInterval)
    }
  }, [])

  return (
    <div className="mt-3">
      {/* Buyers badge - inline style matching the reference image */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-300 text-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-gray-700">
          <span className="font-semibold text-gray-900">{buyers} personnes</span> viennent d&apos;acheter
        </span>
      </div>
    </div>
  )
}
