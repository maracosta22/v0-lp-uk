"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { CheckCircle, Home, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackPurchase } from "@/lib/tiktok-events"

export default function ThankYouClient({ sessionId }: { sessionId: string | null }) {
  const firedRef = useRef(false)
  const [isLoading, setIsLoading] = useState(true)
  const [purchaseData, setPurchaseData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("[v0] ThankYouClient mounted - sessionId:", sessionId)
  }, [sessionId])

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found")
      setIsLoading(false)
      return
    }
    if (firedRef.current) return
    firedRef.current = true

    ;(async () => {
      try {
        // 1) Fetch session details (optional UI)
        const sessionRes = await fetch(`/api/stripe/session?session_id=${sessionId}`)
        if (sessionRes.ok) {
          const data = await sessionRes.json()
          setPurchaseData(data)
          console.log("[v0] Thank You - Session data loaded")
        }

        // 2) Send Purchase event to Meta
        console.log("[v0] Thank You - Sending Purchase event to Meta")
        const metaRes = await fetch("/api/meta/purchase-from-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
          keepalive: true,
        })

        const metaJson = await metaRes.json().catch(() => ({}))
        console.log("[v0] META RESPONSE", { status: metaRes.status, metaJson })

        if (!metaRes.ok || metaJson?.ok === false) {
          throw new Error(metaJson?.error || metaJson?.message || `Meta failed (${metaRes.status})`)
        }

        // 3) Track TikTok Purchase
        console.log("[v0] Thank You - Tracking Purchase to TikTok")
        const purchaseDataStored = sessionStorage.getItem('tiktok_purchase_data')
        
        if (purchaseDataStored) {
          try {
            const data = JSON.parse(purchaseDataStored)
            await trackPurchase({
              contents: data.contents || [],
              value: data.value || 0,
              currency: data.currency || 'GBP',
              status: 'completed',
              description: 'Purchase completed',
            })
            sessionStorage.removeItem('tiktok_purchase_data')
          } catch (e) {
            console.error('[v0] Error parsing TikTok purchase data:', e)
          }
        } else {
          // If no stored data, track with session info
          await trackPurchase({
            value: (purchaseData?.amount_total || 0) / 100,
            currency: (purchaseData?.currency || 'GBP').toUpperCase(),
            status: 'completed',
          })
        }

        console.log("[v0] Thank You - Purchase accepted")
        setIsLoading(false)
      } catch (e) {
        console.error("[v0] Thank You - Error:", e)
        setError(e instanceof Error ? e.message : "An error occurred")
        setIsLoading(false)
      }
    })()
  }, [sessionId])

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-6xl text-destructive">⚠️</div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">No Order Found</h1>
            <p className="text-muted-foreground">
              We couldn't find your order. Please check your email for confirmation.
            </p>
          </div>
          <Link href="/">
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircle className="h-20 w-20 text-green-600" />
        </div>

        {/* Message */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-foreground">
            {purchaseData?.metadata?.content_ids?.includes('-fr') ? 'Félicitations !' : 'Thank You!'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {purchaseData?.metadata?.content_ids?.includes('-fr')
              ? 'Félicitations pour votre achat, vous recevrez votre commande dans 14 à 15 jours ! En cas de questions, envoyez un email à homepanel@panel.com'
              : 'Your order has been confirmed. You will receive an email confirmation shortly.'}
          </p>
        </div>

        {/* Order Details */}
        {purchaseData && !isLoading && (
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono text-sm font-semibold break-all">{sessionId}</p>
            </div>

            {purchaseData.amount_total && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold">
                  {(purchaseData.amount_total / 100).toLocaleString("en-GB", {
                    style: "currency",
                    currency: purchaseData.currency?.toUpperCase() || "GBP",
                  })}
                </p>
              </div>
            )}

            {purchaseData.customer_details?.email && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm">{purchaseData.customer_details.email}</p>
              </div>
            )}
          </div>
        )}

        {/* Status */}
        {isLoading && (
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">Processing your order...</p>
            <div className="flex justify-center">
              <div className="animate-spin h-4 w-4 border-2 border-foreground border-t-transparent rounded-full" />
            </div>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>

          <Link href="/products">
            <Button className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Debug Info */}
        <div className="text-xs text-muted-foreground text-center space-y-1 pt-4 border-t">
          <p>Session ID: {sessionId}</p>
          <p>Status: {isLoading ? "Loading..." : "Complete"}</p>
        </div>
      </div>
    </main>
  )
}
