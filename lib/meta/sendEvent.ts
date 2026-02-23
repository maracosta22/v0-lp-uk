// lib/meta/sendEvent.ts
import crypto from "crypto"
import { hashUserData } from "./hash"

export interface MetaEventData {
  eventName: string
  eventTime?: number
  eventId?: string
  eventSourceUrl?: string
  actionSource?: "website"
  userData?: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    city?: string
    state?: string
    zip?: string
    country?: string
    externalId?: string
    clientIpAddress?: string
    clientUserAgent?: string
    fbc?: string
    fbp?: string
  }
  customData?: {
    value?: number
    currency?: string
    contentIds?: string[]
    contentType?: string
    contentName?: string
    contentCategory?: string
    numItems?: number
    orderId?: string
    contents?: Array<{ id: string; quantity: number; item_price?: number }>
    [key: string]: any
  }
}

export interface MetaApiResponse {
  events_received?: number
  messages?: string[]
  fbtrace_id?: string
  error?: {
    message: string
    type: string
    code: number
    fbtrace_id: string
  }
}

export async function sendMetaEvent(data: MetaEventData): Promise<MetaApiResponse> {
  const pixelId = process.env.META_PIXEL_ID
  const accessToken = process.env.META_ACCESS_TOKEN
  const testEventCode = process.env.META_TEST_EVENT_CODE

  if (!pixelId || !accessToken) {
    throw new Error("Missing META_PIXEL_ID or META_ACCESS_TOKEN")
  }

  const hashed = data.userData
    ? hashUserData({
        email: data.userData.email,
        phone: data.userData.phone,
        firstName: data.userData.firstName,
        lastName: data.userData.lastName,
        city: data.userData.city,
        state: data.userData.state,
        zip: data.userData.zip,
        country: data.userData.country,
        externalId: data.userData.externalId,
      })
    : {}

  const eventPayload = {
    event_name: data.eventName,
    event_time: data.eventTime || Math.floor(Date.now() / 1000),
    event_id: data.eventId || crypto.randomUUID(),
    action_source: data.actionSource || "website",
    event_source_url: data.eventSourceUrl,
    user_data: {
      ...hashed,
      ...(data.userData?.clientIpAddress && { client_ip_address: data.userData.clientIpAddress }),
      ...(data.userData?.clientUserAgent && { client_user_agent: data.userData.clientUserAgent }),
      ...(data.userData?.fbc && { fbc: data.userData.fbc }),
      ...(data.userData?.fbp && { fbp: data.userData.fbp }),
    },
    custom_data: data.customData
      ? {
          ...(data.customData.value !== undefined && { value: data.customData.value }),
          ...(data.customData.currency && { currency: data.customData.currency.toUpperCase() }),
          ...(data.customData.contentIds && { content_ids: data.customData.contentIds }),
          ...(data.customData.contents && { contents: data.customData.contents }),
          ...(data.customData.contentType && { content_type: data.customData.contentType }),
          ...(data.customData.contentName && { content_name: data.customData.contentName }),
          ...(data.customData.contentCategory && { content_category: data.customData.contentCategory }),
          ...(data.customData.numItems !== undefined && { num_items: data.customData.numItems }),
          ...(data.customData.orderId && { order_id: data.customData.orderId }),
          ...Object.fromEntries(
            Object.entries(data.customData).filter(
              ([k]) =>
                ![
                  "value",
                  "currency",
                  "contentIds",
                  "contents",
                  "contentType",
                  "contentName",
                  "contentCategory",
                  "numItems",
                  "orderId",
                ].includes(k),
            ),
          ),
        }
      : undefined,
  }

  const apiPayload: { data: typeof eventPayload[]; test_event_code?: string } = {
    data: [eventPayload],
  }
  if (testEventCode) apiPayload.test_event_code = testEventCode

  const res = await fetch(`https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${accessToken}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(apiPayload),
  })

  const json: MetaApiResponse = await res.json()

  if (!res.ok || json.error) {
    throw new Error(json.error?.message || "Meta API error")
  }

  return json
}

export async function sendPurchaseEvent(params: {
  value: number
  currency: string
  orderId: string
  contentIds?: string[]
  contents?: Array<{ id: string; quantity: number; item_price?: number }>
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  externalId?: string
  clientIpAddress?: string
  clientUserAgent?: string
  fbc?: string
  fbp?: string
  eventSourceUrl?: string
  eventId?: string
  eventTime?: number
}) {
  return sendMetaEvent({
    eventName: "Purchase",
    eventTime: params.eventTime,
    eventId: params.eventId,
    eventSourceUrl: params.eventSourceUrl,
    userData: {
      email: params.email,
      phone: params.phone,
      firstName: params.firstName,
      lastName: params.lastName,
      city: params.city,
      state: params.state,
      zip: params.zip,
      country: params.country,
      externalId: params.externalId,
      clientIpAddress: params.clientIpAddress,
      clientUserAgent: params.clientUserAgent,
      fbc: params.fbc,
      fbp: params.fbp,
    },
    customData: {
      value: params.value,
      currency: params.currency,
      orderId: params.orderId,
      contentIds: params.contentIds,
      contents: params.contents,
      contentType: "product",
    },
  })
}
