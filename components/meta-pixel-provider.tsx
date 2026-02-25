"use client"

import Script from "next/script"
import { useEffect } from "react"

declare global {
  interface Window {
    fbq?: (...args: any[]) => void
    _fbq?: any
    __META_PIXEL_INITED__?: boolean
  }
}

// Pixel principal (base) — ID fixo fornecido pelo cliente
const PIXEL_ID_PRIMARY = "1139772708143683"

// IDs por moeda: configurados via env vars (NEXT_PUBLIC_META_PIXEL_ID_GBP, etc.)
// Fallback para o pixel principal caso a variável não esteja definida.
const PIXEL_ID_GBP  = process.env.NEXT_PUBLIC_META_PIXEL_ID_GBP  || PIXEL_ID_PRIMARY
const PIXEL_ID_USD  = process.env.NEXT_PUBLIC_META_PIXEL_ID_USD  || PIXEL_ID_PRIMARY
const PIXEL_ID_EUR  = process.env.NEXT_PUBLIC_META_PIXEL_ID_EUR  || PIXEL_ID_PRIMARY

// Lista deduplicada de todos os pixels a inicializar
const ALL_PIXEL_IDS = Array.from(
  new Set([PIXEL_ID_PRIMARY, PIXEL_ID_GBP, PIXEL_ID_USD, PIXEL_ID_EUR])
)

export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // trava global: impede init duplicado mesmo em SPA / re-render
    if (window.__META_PIXEL_INITED__) return
    window.__META_PIXEL_INITED__ = true

    // se algum script já criou fbq, não recria do zero; só garante init
    if (typeof window.fbq === "function") {
      try {
        for (const id of ALL_PIXEL_IDS) window.fbq("init", id)
        window.fbq("track", "PageView")
      } catch {}
      return
    }

    // cria o stub do fbq (padrão meta)
    ;(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return
      n = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      })
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = true
      n.version = "2.0"
      n.queue = []
      t = b.createElement(e)
      t.async = true
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js")

    try {
      for (const id of ALL_PIXEL_IDS) window.fbq?.("init", id)
      window.fbq?.("track", "PageView")
    } catch {}
  }, [])

  return (
    <>
      {/* Fallback para ambientes sem JS */}
      <noscript>
        {ALL_PIXEL_IDS.map((id) => (
          <img
            key={id}
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
            alt=""
          />
        ))}
      </noscript>

      {/* guard redundante para evitar re-init por scripts externos */}
      <Script id="meta-pixel-loader" strategy="afterInteractive">
        {`window.__META_PIXEL_INITED__ = window.__META_PIXEL_INITED__ ?? true;`}
      </Script>

      {children}
    </>
  )
}
