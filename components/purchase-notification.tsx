"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"

export function PurchaseNotification() {
  const [buyers, setBuyers] = useState(19)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show notification after a short delay
    const showTimeout = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    // Update buyers count periodically
    const updateInterval = setInterval(() => {
      setBuyers(Math.floor(Math.random() * (35 - 15 + 1)) + 15)
    }, 8000)

    // Toggle visibility to create appearing/disappearing effect
    const visibilityInterval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setBuyers(Math.floor(Math.random() * (35 - 15 + 1)) + 15)
        setIsVisible(true)
      }, 3000)
    }, 12000)

    return () => {
      clearTimeout(showTimeout)
      clearInterval(updateInterval)
      clearInterval(visibilityInterval)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-24 sm:bottom-6 left-3 sm:left-6 z-40 animate-in slide-in-from-left-full duration-500">
      <div className="flex items-center gap-2.5 bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2.5 w-auto">
        {/* User icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
          <Users className="h-5 w-5 text-green-600" />
        </div>
        
        {/* Text */}
        <div className="flex-1">
          <p className="text-sm text-gray-900">
            <span className="font-bold">{buyers} personnes</span>
          </p>
          <p className="text-sm text-gray-500">viennent d&apos;acheter</p>
        </div>
        
        {/* Green dot indicator */}
        <div className="flex-shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
        </div>
      </div>
    </div>
  )
}
