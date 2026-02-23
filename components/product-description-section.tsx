import Image from "next/image"

export function ProductDescriptionSection() {
  return (
    <div className="mt-16 border-t border-border pt-16 overflow-hidden">
      <h2 className="mb-12 text-center font-serif text-2xl sm:text-3xl px-2">Product Description</h2>

      {/* Installation Steps */}
      <div className="mb-16">
        <h3 className="mb-6 text-center text-lg sm:text-xl font-semibold px-2">
          Six Easy Steps to Install, Enjoy a Convenient Experience!
        </h3>
        
        {/* Step 1: Acoustic Benefits */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
          <Image
            src="/install-step-1-acoustic-benefits.jpg"
            alt="Step 1: Acoustic Benefits - Sound panels noise reducing for walls"
            fill
            className="object-cover"
          />
        </div>

        {/* Step 2: Wide Application */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
          <Image
            src="/install-step-2-wide-application.jpg"
            alt="Step 2: Wide Application - Multiple room installations"
            fill
            className="object-cover"
          />
        </div>

        {/* Step 3: Flexible Panels */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
          <Image
            src="/install-step-3-flexible-panels.jpg"
            alt="Step 3: Flexible Wall Panels - Kitchen, bedroom, and detailed applications"
            fill
            className="object-cover"
          />
        </div>

        {/* Step 4: Before & After */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
          <Image
            src="/install-step-4-before-after.jpg"
            alt="Step 4: Before & After - Room transformation with acoustic panels"
            fill
            className="object-cover"
          />
        </div>

        {/* Step 5: Product Details */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src="/install-step-5-product-details.jpg"
            alt="Step 5: Product Details - Specifications, dimensions, and materials"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Key Features Summary */}
      <div className="mt-12 grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-secondary/50 p-4 sm:p-6 text-center">
          <h4 className="font-semibold text-sm sm:text-base">NRC 0.80</h4>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">Excellent Sound Absorption</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-4 sm:p-6 text-center">
          <h4 className="font-semibold text-sm sm:text-base">E1 Certified</h4>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">Low Formaldehyde Emission</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-4 sm:p-6 text-center">
          <h4 className="font-semibold text-sm sm:text-base">Easy Install</h4>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">DIY Friendly Setup</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-4 sm:p-6 text-center">
          <h4 className="font-semibold text-sm sm:text-base">SGS Certified</h4>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">Safe & Eco-Friendly</p>
        </div>
      </div>
    </div>
  )
}
