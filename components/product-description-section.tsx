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
        
        {/* Step 1: Product Details & Dimensions */}
        <div className="w-full overflow-hidden rounded-lg mb-8">
          <Image
            src="/fr-step-1-product-details.png"
            alt="Step 1: Product Details - Bedroom with slatted panels, wood-textured laminate, eco-friendly MDF, high-density acoustical polyester fiber, dimensions 94.5 x 23.6 inch"
            width={1400}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Step 2: Wide Application */}
        <div className="w-full overflow-hidden rounded-lg mb-8">
          <Image
            src="/fr-step-2-wide-application.png"
            alt="Step 2: Wide Application - Living room, office, dining area and modern spaces with acoustic panels"
            width={1400}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Step 3: Acoustic Benefits */}
        <div className="w-full overflow-hidden rounded-lg mb-8">
          <Image
            src="/fr-step-3-acoustic-benefits.png"
            alt="Step 3: Sound panels noise reducing for walls - Bedroom with acoustic panels and sound absorption illustration"
            width={1400}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Step 4: Before & After */}
        <div className="w-full overflow-hidden rounded-lg mb-8">
          <Image
            src="/fr-step-4-before-after.png"
            alt="Step 4: Before & After - Bedroom transformation with dark and natural oak acoustic panels"
            width={1400}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Step 5: Flexible Wall Panels */}
        <div className="w-full overflow-hidden rounded-lg">
          <Image
            src="/fr-step-5-flexible-panels.png"
            alt="Step 5: Flexible Wall Panels - Kitchen island, bedroom applications, flat panel and rolled flexible panel"
            width={1400}
            height={600}
            className="h-auto w-full object-cover"
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
