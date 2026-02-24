"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus, Package } from "lucide-react"

const SAMPLES = [
  {
    id: "tauari-preto",
    name: "Tauari Feltro Preto",
    price: 19,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202026-02-24%20a%CC%80s%2011.20.14-hmvJN206hoKoteDbvNVqppOgsAXQf6.png",
  },
  {
    id: "tauari-cinza",
    name: "Tauari Feltro Cinza",
    price: 19,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202026-02-24%20a%CC%80s%2011.20.21-f8QIJqgfEUV95fmTGCMsvSV42pElRv.png",
  },
  {
    id: "freijo",
    name: "Freijó",
    price: 19,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PANEL0202-ShqTBvqxVBT3VyP9RT9DsqQtOkU0C4.jpg",
  },
  {
    id: "blanchonella",
    name: "Blanchonella",
    price: 19,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202026-02-24%20a%CC%80s%2011.20.38-7yn3TxLx1KQCVVp0uCtZSWrOana1nZ.png",
  },
  {
    id: "branco",
    name: "Branco",
    price: 19,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202026-02-24%20a%CC%80s%2011.20.48-rs8DHfWAYFQ7Pz4WTowbUtxddV1fW3.png",
  },
  {
    id: "preto",
    name: "Preto",
    price: 19,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202026-02-24%20a%CC%80s%2011.20.56-HNI3SCgLyLpHUPjCTmslzY5jnG8rQc.png",
  },
]

export function SamplesSection() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const total = selected.length * 19

  return (
    <div className="mt-8 border-t border-border pt-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">Amostras de Cores</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Está em dúvida sobre qual cor escolher? Você pode receber uma amostra física antes de tomar sua decisão.
          Selecione as tonalidades desejadas e receba com{" "}
          <span className="font-semibold text-foreground">frete grátis!</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left panel — preview */}
        <div className="rounded-xl border border-border bg-secondary/20 flex flex-col items-center justify-center p-8 min-h-[260px]">
          {selected.length === 0 ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <Package className="h-12 w-12 text-muted-foreground/40" strokeWidth={1.2} />
              <p className="text-xs text-muted-foreground">
                Clique nas amostras desejadas para adicioná-las.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex flex-wrap justify-center gap-2 max-w-[200px]">
                {selected.map((id) => {
                  const sample = SAMPLES.find((s) => s.id === id)!
                  return (
                    <div
                      key={id}
                      className="w-14 h-14 rounded-lg overflow-hidden border-2 border-accent shadow-sm"
                    >
                      <Image
                        src={sample.image}
                        alt={sample.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {selected.length} {selected.length === 1 ? "amostra selecionada" : "amostras selecionadas"}
              </p>
            </div>
          )}
        </div>

        {/* Right panel — list */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Escolha as suas amostras:</span>
            <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full font-medium">
              {selected.length} {selected.length === 1 ? "selecionada" : "selecionadas"}
            </span>
          </div>

          <div className="space-y-2 flex-1">
            {SAMPLES.map((sample) => {
              const isSelected = selected.includes(sample.id)
              return (
                <div
                  key={sample.id}
                  className={`flex items-center gap-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? "border-accent bg-accent/5"
                      : "border-border bg-background hover:border-muted-foreground/40"
                  }`}
                  onClick={() => toggle(sample.id)}
                >
                  <div className="w-16 h-12 flex-shrink-0 overflow-hidden rounded-l-lg">
                    <Image
                      src={sample.image}
                      alt={sample.name}
                      width={64}
                      height={48}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-2">
                    <p className="text-sm font-medium leading-tight">{sample.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">+ R$ {sample.price},00</p>
                  </div>
                  <button
                    type="button"
                    aria-label={isSelected ? `Remover ${sample.name}` : `Adicionar ${sample.name}`}
                    className={`mr-3 w-7 h-7 rounded-full flex items-center justify-center border flex-shrink-0 transition-colors ${
                      isSelected
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-background text-foreground hover:border-muted-foreground"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggle(sample.id)
                    }}
                  >
                    {isSelected ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="mt-4 border-t border-border pt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Total</span>
              <span className="font-medium">R$ {total},00</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <span>Envio entre <strong className="text-foreground">2 a 5 dias úteis</strong></span>
              <span className="bg-foreground text-background text-[10px] font-semibold px-2 py-0.5 rounded">
                Frete Grátis
              </span>
            </div>
            <button
              type="button"
              disabled={selected.length === 0}
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
