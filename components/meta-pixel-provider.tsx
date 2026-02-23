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

const PIXEL_ID_PRIMARY = "2121061958705826"
const PIXEL_ID_SECONDARY = "1414359356968137"

export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // trava global: impede init duplicado mesmo em SPA / re-render
    if (window.__META_PIXEL_INITED__) return
    window.__META_PIXEL_INITED__ = true

    // se algum script já criou fbq, não recria do zero; só garante init
    if (typeof window.fbq === "function") {
      try {
        window.fbq("init", PIXEL_ID_PRIMARY)
        window.fbq("init", PIXEL_ID_SECONDARY)
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
      window.fbq?.("init", PIXEL_ID_PRIMARY)
      window.fbq?.("init", PIXEL_ID_SECONDARY)
      window.fbq?.("track", "PageView")
    } catch {}
  }, [])

  return (
    <>
      {/* se JS estiver desabilitado */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID_PRIMARY}&ev=PageView&noscript=1`}
          alt=""
        />
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID_SECONDARY}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* não carregue outro script do meta fora daqui */}
      <Script id="meta-pixel-loader" strategy="afterInteractive">
        {`
          // guard redundante: evita 2 init caso scripts externos tentem reiniciar
          window.__META_PIXEL_INITED__ = window.__META_PIXEL_INITED__ ?? true;
        `}
      </Script>

      {children}
    </>
  )
}
