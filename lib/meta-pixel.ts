// Meta Pixel client-side utilities
// Primary Pixel ID: 2121061958705826
// Secondary Pixel ID: 1414359356968137

export const META_PIXEL_ID = "2121061958705826"
export const META_PIXEL_ID_PRIMARY = "2121061958705826"
export const META_PIXEL_ID_SECONDARY = "1414359356968137"

// Declare fbq type for TypeScript
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
    _fbq: unknown
  }
}

// Generate unique event ID for deduplication
export function generateEventId(prefix?: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`
}

// Track ViewContent event
export function trackViewContent(params: {
  contentId: string
  contentName: string
  contentType?: string
  value: number
  currency?: string
  eventId?: string
  pixelId?: "primary" | "secondary" | "both"
}) {
  const eventId = params.eventId || generateEventId("vc")
  const trackBoth = params.pixelId === "both" || params.pixelId === undefined

  if (typeof window !== "undefined" && window.fbq) {
    const eventData = {
      content_ids: [params.contentId],
      content_name: params.contentName,
      content_type: params.contentType || "product",
      value: params.value,
      currency: params.currency || "GBP",
    }

    if (params.pixelId === "primary" || trackBoth) {
      window.fbq("track", "ViewContent", eventData, { eventID: eventId })
    }
    if (params.pixelId === "secondary" || trackBoth) {
      window.fbq("track", "ViewContent", eventData, { eventID: eventId })
    }
  }

  return eventId
}

// Track AddToCart event
export function trackAddToCart(params: {
  contentId: string
  contentName: string
  quantity: number
  value: number
  currency?: string
  eventId?: string
  pixelId?: "primary" | "secondary" | "both"
}) {
  const eventId = params.eventId || generateEventId("atc")
  const trackBoth = params.pixelId === "both" || params.pixelId === undefined

  if (typeof window !== "undefined" && window.fbq) {
    const eventData = {
      content_ids: [params.contentId],
      contents: [
        {
          id: params.contentId,
          quantity: params.quantity,
          item_price: params.value / params.quantity,
        },
      ],
      content_name: params.contentName,
      content_type: "product",
      value: params.value,
      currency: params.currency || "GBP",
    }

    if (params.pixelId === "primary" || trackBoth) {
      window.fbq("track", "AddToCart", eventData, { eventID: eventId })
    }
    if (params.pixelId === "secondary" || trackBoth) {
      window.fbq("track", "AddToCart", eventData, { eventID: eventId })
    }
  }

  return eventId
}

// Track InitiateCheckout event
export function trackInitiateCheckout(params: {
  contentIds: string[]
  numItems: number
  value: number
  currency?: string
  eventId?: string
  pixelId?: "primary" | "secondary" | "both"
}) {
  const eventId = params.eventId || generateEventId("ic")
  const trackBoth = params.pixelId === "both" || params.pixelId === undefined

  if (typeof window !== "undefined" && window.fbq) {
    const eventData = {
      content_ids: params.contentIds,
      num_items: params.numItems,
      value: params.value,
      currency: params.currency || "GBP",
    }

    if (params.pixelId === "primary" || trackBoth) {
      window.fbq("track", "InitiateCheckout", eventData, { eventID: eventId })
    }
    if (params.pixelId === "secondary" || trackBoth) {
      window.fbq("track", "InitiateCheckout", eventData, { eventID: eventId })
    }
  }

  return eventId
}

// Track Purchase event
export function trackPurchase(params: {
  orderId: string
  contentIds: string[]
  contents: Array<{ id: string; quantity: number; item_price: number }>
  value: number
  currency?: string
  pixelId?: "primary" | "secondary" | "both"
}) {
  // Event ID for deduplication
  const eventId = `purchase_${params.orderId}`
  const trackBoth = params.pixelId === "both" || params.pixelId === undefined

  if (typeof window !== "undefined" && window.fbq) {
    const eventData = {
      content_ids: params.contentIds,
      contents: params.contents,
      content_type: "product",
      value: params.value,
      currency: params.currency || "GBP",
      order_id: params.orderId,
    }

    if (params.pixelId === "primary" || trackBoth) {
      window.fbq("track", "Purchase", eventData, { eventID: eventId })
    }
    if (params.pixelId === "secondary" || trackBoth) {
      window.fbq("track", "Purchase", eventData, { eventID: eventId })
    }
  }

  return eventId
}

// Track PageView (for SPA navigation)
export function trackPageView() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView")
  }
}
