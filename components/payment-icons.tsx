export function PaymentIcons() {
  return (
    <div className="mt-4 flex items-center justify-center gap-2 flex-wrap border-t border-border pt-4">
      <span className="text-xs text-muted-foreground">Paiement sécurisé :</span>
      {/* Visa */}
      <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center">
        <span className="font-bold text-[#1A1F71] text-xs tracking-tight">VISA</span>
      </div>
      {/* Mastercard */}
      <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center gap-0.5">
        <div className="w-4 h-4 rounded-full bg-red-600 opacity-90" />
        <div className="w-4 h-4 rounded-full bg-yellow-400 opacity-90 -ml-2" />
      </div>
      {/* PayPal */}
      <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center">
        <span className="text-[10px] font-bold">
          <span className="text-blue-900">Pay</span><span className="text-blue-500">Pal</span>
        </span>
      </div>
      {/* Apple Pay */}
      <div className="h-7 px-2 bg-black rounded flex items-center">
        <span className="text-white text-[10px] font-medium"> Pay</span>
      </div>
      {/* SSL */}
      <div className="flex items-center gap-1">
        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
        </svg>
        <span className="text-xs text-muted-foreground">SSL 256-bit</span>
      </div>
    </div>
  )
}
