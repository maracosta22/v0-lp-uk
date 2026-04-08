"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"

interface SurfaceCalculatorProps {
  isFrenchVersion?: boolean
}

const LABELS = {
  fr: {
    title: "Calculateur de surface",
    subtitle: "Combien de panneaux pour votre mur?",
    description: "Entrez les dimensions de votre mur. Nous calculons la quantité exacte, avec marge de sécurité.",
    width: "Largeur du mur",
    height: "Hauteur du mur",
    unit: "m",
    coverage: "Pourcentage du mur à couvrir",
    calculate: "Calculer ma quantité",
    result: "Résultat",
    panelsNeeded: "panneaux nécessaires",
    coverageArea: "Surface à couvrir",
    totalArea: "Surface totale du mur",
    withMargin: "(incluant 10% de marge)",
    coverageOptions: {
      "25": "25%",
      "50": "50%",
      "75": "75%",
      "100": "Mur entier",
    },
  },
  en: {
    title: "Surface Calculator",
    subtitle: "How many panels for your wall?",
    description: "Enter your wall dimensions. We calculate the exact quantity, with a safety margin.",
    width: "Wall width",
    height: "Wall height",
    unit: "m",
    coverage: "Percentage of wall to cover",
    calculate: "Calculate my quantity",
    result: "Result",
    panelsNeeded: "panels needed",
    coverageArea: "Coverage area",
    totalArea: "Total wall area",
    withMargin: "(including 10% margin)",
    coverageOptions: {
      "25": "25%",
      "50": "50%",
      "75": "75%",
      "100": "Full wall",
    },
  },
}

// Panel covers approximately 3m² (270cm x 110cm = 2.97m²)
const PANEL_COVERAGE = 2.97

export function SurfaceCalculator({ isFrenchVersion = false }: SurfaceCalculatorProps) {
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [coverage, setCoverage] = useState("100")
  const [result, setResult] = useState<number | null>(null)

  const lang = isFrenchVersion ? "fr" : "en"
  const t = LABELS[lang]

  const handleCalculate = () => {
    const w = parseFloat(width)
    const h = parseFloat(height)
    const coveragePercent = parseInt(coverage) / 100

    if (w > 0 && h > 0) {
      const wallArea = w * h
      const areaToCover = wallArea * coveragePercent
      // Add 10% margin for cuts and waste
      const areaWithMargin = areaToCover * 1.1
      const panelsNeeded = Math.ceil(areaWithMargin / PANEL_COVERAGE)
      setResult(panelsNeeded)
    }
  }

  const wallArea = parseFloat(width) * parseFloat(height) || 0
  const areaToCover = wallArea * (parseInt(coverage) / 100)

  return (
    <div className="mt-8 border-t border-border pt-8">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-5 w-5 text-accent" />
        <h2 className="text-sm font-semibold uppercase tracking-wider">{t.title}</h2>
      </div>
      
      <div className="bg-secondary/30 rounded-xl p-5 sm:p-6">
        <h3 className="font-serif text-lg sm:text-xl mb-2">{t.subtitle}</h3>
        <p className="text-sm text-muted-foreground mb-6">{t.description}</p>

        <div className="space-y-5">
          {/* Width and Height inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t.width}</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="0.0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {t.unit}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t.height}</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="0.0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {t.unit}
                </span>
              </div>
            </div>
          </div>

          {/* Coverage percentage */}
          <div>
            <label className="block text-sm font-medium mb-2">{t.coverage}</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(t.coverageOptions).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCoverage(value)}
                  className={`py-2 px-2 text-xs sm:text-sm font-medium rounded-lg border transition-all ${
                    coverage === value
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-background text-foreground hover:border-muted-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Calculate button */}
          <button
            type="button"
            onClick={handleCalculate}
            disabled={!width || !height}
            className="w-full py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t.calculate}
          </button>

          {/* Result */}
          {result !== null && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">{t.result}</p>
              <p className="text-3xl font-bold text-accent mb-1">{result}</p>
              <p className="text-sm font-medium">{t.panelsNeeded}</p>
              <p className="text-xs text-muted-foreground mt-2">{t.withMargin}</p>
              <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                <p>{t.totalArea}: {wallArea.toFixed(1)}m²</p>
                <p>{t.coverageArea}: {areaToCover.toFixed(1)}m²</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
