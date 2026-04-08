"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"

interface PeopleViewingProps {
  isFrench?: boolean
}

export function PeopleViewing({ isFrench = false }: PeopleViewingProps) {
  const [viewers, setViewers] = useState(29)
  const [buyers, setBuyers] = useState(35)

  useEffect(() => {
    // Inicial: número aleatório entre 25-45 para viewers
    setViewers(Math.floor(Math.random() * (45 - 25 + 1)) + 25)
    // Inicial: número aleatório entre 30-45 para buyers
    setBuyers(Math.floor(Math.random() * (45 - 30 + 1)) + 30)

    // Muda o número a cada 3-5 segundos
    const interval = setInterval(() => {
      setViewers(Math.floor(Math.random() * (45 - 25 + 1)) + 25)
    }, Math.random() * 2000 + 3000)

    // Muda os compradores a cada 8-15 segundos
    const buyersInterval = setInterval(() => {
      setBuyers(Math.floor(Math.random() * (45 - 30 + 1)) + 30)
    }, Math.random() * 7000 + 8000)

    return () => {
      clearInterval(interval)
      clearInterval(buyersInterval)
    }
  }, [])

  return (
    <div className="space-y-2 mt-3">
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

      {/* Viewers - with eye icon */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Eye className="h-4 w-4" />
        <span>
          <span className="font-semibold text-gray-900">{viewers} personnes</span>{" "}
          voient ce produit
        </span>
      </div>
    </div>
  )
}
