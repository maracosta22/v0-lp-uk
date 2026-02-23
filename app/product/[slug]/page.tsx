import { notFound } from "next/navigation"
import { getProductBySlug, products, getProductsByCategory } from "@/lib/products"
import ClientProductPage from "./ClientProductPage"

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const decorAndLightingProducts = products
    .filter((p) => (p.category === "decor" || p.category === "lighting") && p.id !== product.id)
    .slice(0, 4)

  // Check if this is a French version product
  const isFrenchVersion = slug.endsWith("-fr")
  
  // Get products for "Frequently bought together" section (use French versions if on French page)
  const wallCleanerProduct = products.find((p) => 
    p.id === (isFrenchVersion ? "prod_TpSGVBy2LIor3O" : "prod_TpLADpW3LMASwd") && p.id !== product.id
  )
  const ledStripProduct = products.find((p) => 
    p.id === (isFrenchVersion ? "prod_TpSGSQupFVbb2s" : "prod_TpLAwqB6JWNMTv") && p.id !== product.id
  )
  const frequentlyBoughtTogether = [wallCleanerProduct, ledStripProduct].filter(Boolean) as typeof products
  const frequentlyBoughtTotal = frequentlyBoughtTogether.reduce((sum, p) => sum + p.price, 0)
  
  // Combine products for "You Might Also Like" - excluding Frequently bought together items and removing duplicates
  const excludeIds = ["prod_TpLADpW3LMASwd", "prod_TpLAwqB6JWNMTv"]
  const seenIds = new Set<string>()
  const orderBumpProducts = [
    ...relatedProducts.filter((p) => !excludeIds.includes(p.id)),
    ...decorAndLightingProducts.filter((p) => !excludeIds.includes(p.id)),
  ].filter((p) => {
    if (seenIds.has(p.id)) return false
    seenIds.add(p.id)
    return true
  }).slice(0, 6)

  const isFlexibleAcousticPanel = product.id === "prod_TpLABayQWkNTij" || product.id === "prod_TpSFzPytJW9W0s"

  const discountPercent =
    product.onSale && product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

  return (
    <ClientProductPage 
      product={product} 
      relatedProducts={relatedProducts} 
      decorAndLightingProducts={decorAndLightingProducts} 
      frequentlyBoughtTogether={frequentlyBoughtTogether} 
      frequentlyBoughtTotal={frequentlyBoughtTotal} 
      orderBumpProducts={orderBumpProducts} 
      isFlexibleAcousticPanel={isFlexibleAcousticPanel} 
      discountPercent={discountPercent}
      isFrenchVersion={isFrenchVersion}
    />
  )
}
