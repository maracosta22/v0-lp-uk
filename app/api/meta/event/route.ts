// app/api/meta/purchase-from-session/route.ts
import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { getMetaCookies, getClientIpFromHeaders, getUserAgentFromHeaders } from "@/lib/meta/cookies"
import { sendMetaEvent } from "@/lib/meta/sendEvent"

export const runtime = "nodejs"

function splitName(full?: string) {
  if (!full) return { firstName: undefined as string | undefined, lastName: undefined as string | undefined }
  const parts = full.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return { firstName: undefined, lastName: undefined }
  if (parts.length === 1) return { firstName: parts[0], lastName: undefined }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") }
}

/**
 * Best-effort E.164 normalize.
 * - Stripe normalmente já manda +44..., +33..., etc.
 * - Se vier sem "+", tenta aplicar regras básicas (principalmente UK).
 */
function normalizePhoneE164(phone?: string, country?: string) {
  if (!phone) return undefined
  const raw = phone.trim()
  if (!raw) return undefined

  // já parece E.164
  if (raw.startsWith("+")) return raw

  const digits = raw.replace(/[^\d]/g, "")
  if (!digits) return undefined

  const c = (country || "").toUpperCase()

  // UK heuristic: 07xxxxxxxxx -> +447xxxxxxxxx  OR 44xxxxxxxxxx -> +44...
  if (c === "GB") {
    if (digits.startsWith("44")) return `+${digits}`
    if (digits.startsWith("0")) return `+44${digits.slice(1)}`
    // se já vier como 7xxxxxxxxx (sem zero)
    if (digits.length >= 9 && digits.startsWith("7")) return `+44${digits}`
    // fallback
    return `+44${digits}`
  }

  // IE heuristic
  if (c === "IE") {
    if (digits.startsWith("353")) return `+${digits}`
    if (digits.startsWith("0")) return `+353${digits.slice(1)}`
    return `+353${digits}`
  }

  // fallback: se não tem "+", pelo menos retorna os dígitos (hash ainda ajuda um pouco)
  // Se você quiser, podemos mapear mais países depois.
  return digits
}

export async function POST(req: NextRequest) {
  try {
    const { session_id } = (await req.json()) as { session_id?: string }

    if (!session_id) {
      return NextResponse.json({ ok: false, error: "Missing session_id" }, { status: 400 })
    }

    // 1) Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price.product", "customer"],
    })

    // 2) Customer data (Stripe)
    const cd = session.customer_details
    const email = cd?.email || undefined
    const name = cd?.name || undefined
    const { firstName, lastName } = splitName(name)

    const addr = cd?.address
    const city = addr?.city || undefined
    const state = addr?.state || undefined
    const zip = addr?.postal_code || undefined
    const country = addr?.country || undefined

    const phoneRaw = cd?.phone || undefined
    const phone = normalizePhoneE164(phoneRaw, country)

    // 3) Purchase data
    const currency = (session.currency || "GBP").toUpperCase()
    const value = session.amount_total ? session.amount_total / 100 : 0

    const orderId = (typeof session.payment_intent === "string" && session.payment_intent) || session.id

    // 4) contents/content_ids (ajuda relatório / qualidade)
    const lineItems = session.line_items?.data || []
    const contents = lineItems
      .map((li) => {
        const qty = li.quantity || 1
        const unit = li.amount_total ? li.amount_total / 100 / qty : undefined

        const product = li.price?.product as any
        const pid =
          typeof product === "string"
            ? product
            : product?.id || li.price?.id || "unknown"

        return { id: pid, quantity: qty, item_price: unit }
      })
      .filter((x) => x.id && x.id !== "unknown")

    const contentIds = contents.map((c) => c.id)

    // 5) IP/UA (server)
    const clientIpAddress = getClientIpFromHeaders(req.headers)
    const clientUserAgent = getUserAgentFromHeaders(req.headers)

    // 6) fbc/fbp + event_id: PRIORIDADE = metadata do Stripe -> cookie -> fallback
    const metaCookies = await getMetaCookies()

    const metaFromStripe = session.metadata || {}
    const fbc = (metaFromStripe.fbc as string | undefined) || metaCookies.fbc || undefined
    const fbp = (metaFromStripe.fbp as string | undefined) || metaCookies.fbp || undefined

    // Se você criou purchase_event_id no createCheckoutSession, usa ele aqui.
    // Isso é o que mais ajuda o Meta a reconciliar corretamente.
    const purchaseEventId =
      (metaFromStripe.purchase_event_id as string | undefined) ||
      (metaFromStripe.event_id as string | undefined) ||
      `purchase_${orderId}`

    const eventSourceUrl =
      (metaFromStripe.event_source_url as string | undefined) ||
      req.headers.get("referer") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://slatura.eu"

    // external_id (se você quiser melhorar match ainda mais)
    const externalId = (typeof session.customer === "string" && session.customer) || undefined

    // 7) Envia Purchase via CAPI com TODOS os campos prioritários
    const metaRes = await sendMetaEvent({
      eventName: "Purchase",
      eventTime: session.created || Math.floor(Date.now() / 1000),
      eventId: purchaseEventId,
      eventSourceUrl,
      actionSource: "website",
      userData: {
        email,
        phone,
        firstName,
        lastName,
        city,
        state,
        zip,
        country,
        externalId,
        clientIpAddress,
        clientUserAgent,
        fbc,
        fbp,
      },
      customData: {
        value,
        currency,
        orderId,
        contentIds,
        contentType: "product",
        contents, // ok: campo extra, vai como custom_data.contents
      },
    })

    return NextResponse.json({
      ok: true,
      metaRes,
      debug: {
        session_id,
        orderId,
        purchaseEventId,
        has_email: !!email,
        has_phone: !!phone,
        has_fbc: !!fbc,
        has_fbp: !!fbp,
        value,
        currency,
      },
    })
  } catch (err) {
    console.error("[purchase-from-session] error:", err)
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    )
  }
}
