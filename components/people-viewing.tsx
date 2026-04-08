"use client"

import { useEffect, useState } from "react"
import { Eye, Users } from "lucide-react"

interface PeopleViewingProps {
  isFrench?: boolean
}

export function PeopleViewing({ isFrench = false }: PeopleViewingProps) {
  const [viewers, setViewers] = useState(18)
  const [buyers, setBuyers] = useState(24)

  useEffect(() => {
    // Inicial: número aleatório entre 18-45 para viewers
    setViewers(Math.floor(Math.random() * (45 - 18 + 1)) + 18)
    // Inicial: número aleatório entre 20-35 para buyers
    setBuyers(Math.floor(Math.random() * (35 - 20 + 1)) + 20)

    // Muda o número a cada 3-5 segundos
    const interval = setInterval(() => {
      setViewers(Math.floor(Math.random() * (45 - 18 + 1)) + 18)
    }, Math.random() * 2000 + 3000)

    // Muda os compradores a cada 8-15 segundos
    const buyersInterval = setInterval(() => {
      setBuyers(Math.floor(Math.random() * (35 - 20 + 1)) + 20)
    }, Math.random() * 7000 + 8000)

    return () => {
      clearInterval(interval)
      clearInterval(buyersInterval)
    }
  }, [])

  return (
    <div className="space-y-2 mt-3">
      {/* Buyers badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-green-700">
          <span className="font-semibold">{buyers} personnes</span> viennent d&apos;acheter
        </span>
      </div>

      {/* Viewers */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Eye className="h-4 w-4 text-accent" />
        <span>
          <span className="font-medium text-foreground">{viewers} personnes</span>{" "}
          voient ce produit
        </span>
      </div>
    </div>
  )
}
