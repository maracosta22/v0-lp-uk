"use server"

import { stripe } from "@/lib/stripe"
import { products } from "@/lib/products"
import { getUTMDataFromCookie } from "@/lib/utm-server"

interface CartItem {
  product: {
    id: string
    name: string
    price: number
    salePrice?: number
    currency?: string
  }
  quantity: number
}

interface TrackingData {
  fbc?: string
  fbp?: string
  eventId?: string // pode ser usado como checkout_event_id (se você quiser)
  eventSourceUrl?: string
  clientIp?: string
  clientUserAgent?: string
}

function makeId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

export async function createCheckoutSession(items: CartItem[], origin: string, trackingData?: TrackingData) {
  try {
    // ✓ Extract UTM data server-side from cookies
    const utmData = await getUTMDataFromCookie()

    if (!items?.length) {
      throw new Error("Cart is empty")
    }

    // ✅ Validate each item has valid quantity
    for (const item of items) {
      const quantity = item.quantity
      
      // Check quantity is a valid positive integer
      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error(`Invalid quantity ${quantity} for product ${item.product.name}`)
      }
      
      // Check quantity doesn't exceed maximum
      if (quantity > 100) {
        throw new Error(`Quantity ${quantity} exceeds maximum of 100 for product ${item.product.name}`)
      }
      
      // Check price is valid
      const price = item.product.salePrice || item.product.price
      if (!Number.isFinite(price) || price < 0) {
        throw new Error(`Invalid price for product ${item.product.name}`)
      }
    }

    // Get currency from first product (all items MUST have same currency)
    const firstProduct = products.find((p) => p.id === items[0]?.product.id)
    const checkoutCurrency = (firstProduct?.currency || "gbp").toLowerCase()

    // Validate all items have same currency
    const allSameCurrency = items.every((item) => {
      const serverProduct = products.find((p) => p.id === item.product.id)
      return (serverProduct?.currency || "gbp").toLowerCase() === checkoutCurrency
    })

    if (!allSameCurrency) {
      throw new Error(
        "Cannot mix products with different currencies in the same checkout. All items must use the same currency (GBP or EUR).",
      )
    }

    // Validate items and get prices from server-side product data
    const lineItems = items.map((item) => {
      const serverProduct = products.find((p) => p.id === item.product.id)

      // Use server-side price, not client price
      const unitPrice = serverProduct ? serverProduct.salePrice || serverProduct.price : item.product.salePrice || item.product.price

      // Validate and round price to avoid floating point issues
      const validPrice = Math.round(unitPrice * 100) / 100
      const roundedAmount = Math.round(validPrice * 100)

      return {
        price_data: {
          currency: checkoutCurrency,
          product_data: {
            name: serverProduct?.name || item.product.name,
          },
          unit_amount: roundedAmount,
        },
        quantity: item.quantity,
      }
    })

    // shipping options (if needed)
    const hasNoShippingProducts = items.every((item) => {
      const serverProduct = products.find((p) => p.id === item.product.id)
      return serverProduct?.noShipping === true
    })

    const shippingOptions = !hasNoShippingProducts
      ? [
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: { amount: 700, currency: checkoutCurrency },
              display_name: "Standard Shipping",
              delivery_estimate: {
                minimum: { unit: "business_day" as const, value: 5 },
                maximum: { unit: "business_day" as const, value: 10 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: { amount: 1500, currency: checkoutCurrency },
              display_name: "Express Shipping",
              delivery_estimate: {
                minimum: { unit: "business_day" as const, value: 2 },
                maximum: { unit: "business_day" as const, value: 4 },
              },
            },
          },
        ]
      : []

    // Build metadata for tracking
    // IMPORTANT: Stripe metadata values are limited to 500 characters each
    const contentIds = items.map((item) => item.product.id)
    const contents = items.map((item) => {
      const serverProduct = products.find((p) => p.id === item.product.id)
      return {
        id: item.product.id,
        title: (serverProduct?.name || item.product.name).substring(0, 50),
        category: serverProduct?.category || "product",
        price: serverProduct?.salePrice || serverProduct?.price || item.product.price,
        quantity: item.quantity,
      }
    })

    // Truncate serialized metadata to fit Stripe's 500-char limit per value
    const contentIdsStr = JSON.stringify(contentIds).substring(0, 500)
    const contentsStr = JSON.stringify(contents).substring(0, 500)

    // ✅ IDs: se não veio do client, cria aqui
    const checkoutEventId = trackingData?.eventId || makeId("checkout")
    const purchaseEventId = makeId("purchase") // <- sempre único p/ Purchase

    const sessionConfig: any = {
      ui_mode: "embedded",
      line_items: lineItems,
      mode: "payment",

      // ✅ Coleta telefone no checkout (melhora match quality)
      phone_number_collection: { enabled: true },

      return_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,

      shipping_address_collection: {
        allowed_countries: [
          "GB",
          "IE",
          "GI",
          "AT",
          "BE",
          "BG",
          "HR",
          "CY",
          "CZ",
          "DK",
          "EE",
          "FI",
          "FR",
          "DE",
          "GR",
          "HU",
          "IT",
          "LV",
          "LT",
          "LU",
          "MT",
          "NL",
          "PL",
          "PT",
          "RO",
          "SK",
          "SI",
          "ES",
          "SE",
        ],
      },

      metadata: {
        // produtos (truncated to fit Stripe's 500-char limit)
        content_ids: contentIdsStr,
        contents: contentsStr,

        // ✅ Meta cookies
        ...(trackingData?.fbc ? { fbc: trackingData.fbc } : {}),
        ...(trackingData?.fbp ? { fbp: trackingData.fbp } : {}),

        // ✅ IDs separados (super importante)
        checkout_event_id: checkoutEventId,
        purchase_event_id: purchaseEventId,

        // (mantém compatibilidade com seu código antigo)
        event_id: checkoutEventId,

        ...(trackingData?.eventSourceUrl ? { event_source_url: trackingData.eventSourceUrl } : {}),
        ...(trackingData?.clientIp ? { client_ip: trackingData.clientIp } : {}),
        ...(trackingData?.clientUserAgent ? { client_user_agent: trackingData.clientUserAgent } : {}),

        // ✅ UTM attribution
        ...(utmData.utm_source ? { utm_source: utmData.utm_source } : {}),
        ...(utmData.utm_medium ? { utm_medium: utmData.utm_medium } : {}),
        ...(utmData.utm_campaign ? { utm_campaign: utmData.utm_campaign } : {}),
        ...(utmData.utm_content ? { utm_content: utmData.utm_content } : {}),
        ...(utmData.utm_term ? { utm_term: utmData.utm_term } : {}),
      },
    }

    if (shippingOptions.length > 0) {
      sessionConfig.shipping_options = shippingOptions
    }

    console.log("[Stripe] Creating checkout session with config:", {
      line_items_count: lineItems.length,
      currency: checkoutCurrency,
      has_shipping: shippingOptions.length > 0,
      metadata_content_ids_length: contentIdsStr.length,
      metadata_contents_length: contentsStr.length,
      checkout_event_id: checkoutEventId,
      purchase_event_id: purchaseEventId,
    })

    const session = await stripe.checkout.sessions.create(sessionConfig)

    console.log("[Stripe] Checkout session created:", {
      session_id: session.id,
      client_secret_exists: !!session.client_secret,
    })

    return { clientSecret: session.client_secret }
  } catch (error: any) {
    console.error("[Stripe] Error creating checkout session:", {
      message: error?.message,
      type: error?.type,
      code: error?.code,
      param: error?.param,
      statusCode: error?.statusCode,
    })
    throw error
  }
}

export async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  })

  return {
    status: session.status,
    customerEmail: session.customer_details?.email,
    amountTotal: session.amount_total ? session.amount_total / 100 : 0,
    currency: session.currency?.toUpperCase() || "GBP",
    lineItems:
      session.line_items?.data.map((item) => ({
        name:
          typeof item.price?.product === "object" && item.price.product && "name" in item.price.product
            ? item.price.product.name
            : "Product",
        quantity: item.quantity || 1,
        amount: item.amount_total ? item.amount_total / 100 : 0,
      })) || [],
  }
}
