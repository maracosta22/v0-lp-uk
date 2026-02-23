import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { hashUserData } from "@/lib/meta/hash"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const { session_id } = await request.json()

    if (!session_id) {
      return NextResponse.json(
        { error: "session_id is required" },
        { status: 400 }
      )
    }

    console.log("[Meta Purchase] Retrieving Stripe session:", session_id)

    // Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "customer"],
    })

    // Extract data
    const amount_total = session.amount_total || 0
    const currency = (session.currency || "gbp").toUpperCase()
    const value = Math.round((amount_total / 100) * 100) / 100 // Convert cents to decimal
    const email = session.customer_details?.email || ""
    const phone = session.customer_details?.phone || ""

    // Extract FBC/FBP from session metadata if available
    const fbc = (session.metadata?.fbc as string) || undefined
    const fbp = (session.metadata?.fbp as string) || undefined

    console.log("[Meta Purchase] Session data extracted:", {
      session_id,
      value,
      currency,
      has_email: !!email,
      has_fbc: !!fbc,
      has_fbp: !!fbp,
    })

    // Prepare user data with hashing
    const userData: Record<string, any> = {
      ...hashUserData({
        email,
        phone,
      }),
    }

    // Add FBC/FBP if available
    if (fbc) userData.fbc = fbc
    if (fbp) userData.fbp = fbp

    // Prepare custom data
    const customData: Record<string, any> = {
      value,
      currency,
    }

    // Prepare Meta Conversions API request
    const metaPayload = {
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
          event_id: `purchase_${session_id}`,
          event_source_url: process.env.APP_URL || "https://example.com",
          action_source: "website",
          user_data: userData,
          custom_data: customData,
        },
      ],
      access_token: process.env.META_ACCESS_TOKEN,
      pixel_id: process.env.META_PIXEL_ID,
    }

    console.log("[Meta Purchase] Sending to Meta CAPI:", {
      event_name: "Purchase",
      event_id: metaPayload.data[0].event_id,
      value,
      currency,
      user_data_keys: Object.keys(userData),
    })

    // Send to Meta Conversions API
    const metaResponse = await fetch(
      `https://graph.facebook.com/v20.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metaPayload),
      }
    )

    const metaResult = await metaResponse.json()

    console.log("[Meta Purchase] Response:", {
      status: metaResponse.status,
      events_received: metaResult.events_received,
      fbtrace_id: metaResult.fbtrace_id,
    })

    if (!metaResponse.ok) {
      console.error("[Meta Purchase] Failed:", {
        status: metaResponse.status,
        error: metaResult.error,
        fbtrace_id: metaResult.fbtrace_id,
      })
      return NextResponse.json(
        {
          ok: false,
          error: metaResult.error || "Failed to send event to Meta",
          fbtrace_id: metaResult.fbtrace_id,
        },
        { status: metaResponse.status }
      )
    }

    return NextResponse.json({
      ok: true,
      events_received: metaResult.events_received,
      fbtrace_id: metaResult.fbtrace_id,
    })
  } catch (error) {
    console.error("[Meta Purchase] Error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    )
  }
}
