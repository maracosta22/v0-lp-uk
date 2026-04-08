export interface ProductColor {
  id: string
  name: string
  hex: string
  image?: string
}

export interface ProductStyle {
  id: string
  name: string
  image: string
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  currency: string
  category: string
  images: string[]
  features: string[]
  dimensions?: string
  material?: string
  inStock: boolean
  badge?: string
  onSale?: boolean
  colors?: ProductColor[]
  video?: string // URL to a product demo video (MP4)
  styles?: ProductStyle[] // Added styles for product variants
  noShipping?: boolean // Skip shipping for this product
  hidden?: boolean // Hide from product listings (only accessible via direct link)
}

export const categories = [
  { id: "wall-panels", name: "Panneaux Muraux", slug: "wall-panels" },
  { id: "lighting", name: "Éclairage", slug: "lighting" },
  { id: "decor", name: "Décoration", slug: "decor" },
]

export const products: Product[] = [
  {
    id: "prod_U2rumuoWXebtgj",
    slug: "panneau-acoustique-flexible",
    name: "Panneau Acoustique Flexible",
    description:
      "Panneau acoustique pliable révolutionnaire qui s'adapte à toute surface. Parfait pour les murs courbés, les piliers et les installations créatives.",
    longDescription:
      "Découvrez notre Panneau Acoustique Flexible révolutionnaire - la solution de revêtement mural la plus polyvalente du marché. Contrairement aux panneaux rigides traditionnels, ce design innovant dispose d'un support en feutre flexible spécialement conçu qui permet au panneau de se plier et de s'adapter aux surfaces courbées, aux piliers et aux caractéristiques architecturales non conventionnelles. Disponible en plusieurs tons de bois dont Chêne Naturel, Chêne Fumé, Noyer et Chêne Gris, chaque panneau offre une absorption sonore exceptionnelle tout en transformant n'importe quel espace en une déclaration de design. Avec des dimensions incroyables de 270x110cm, chaque panneau couvre près de 3m² de surface murale, ce qui en fait la solution acoustique premium la plus rentable disponible.",
    price: 14.49,
    originalPrice: 28.98,
    currency: "EUR",
    category: "wall-panels",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneu01-COvuniuy0UAMH2wAwPKmS9Tlev4Qrt.avif",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneau02-qeu9jY1J99l7kquJK3L2fnpKCxJuHj.avif",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneau03-Ji8b2j4tKYBnBXpeqNu9khj7yL7wvV.avif",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneau05-GkWwFoSwI1tdI52JGtLrfokd39EcZ6.avif",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneau06-RN0no924w98dCR2WLKu9Lc5ix1yxsd.avif",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneau08-MDTCtLoI5jgKXB9aMNIgb6jn6rpRlj.avif",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panneau10-st1uB7l391OAmADvAE7RopRDYVevb6.avif",
    ],
    video: "/videos/akupanel-demo.mp4",
    features: [
      "Support flexible - s'adapte à toute courbe",
      "Couverture de 270x110cm par pièce",
      "Indice NRC supérieur de 0.85",
      "Plusieurs tons de bois disponibles",
      "Installation facile à faire soi-même",
      "Noyau en feutre acoustique haute densité",
      "Faible émission de formaldéhyde (0.05 mg/m³)",
      "Testé et certifié SGS",
    ],
    dimensions: "270cm x 110cm x 2.1cm",
    material: "Lattes en MDF / Support en Feutre Acoustique",
    inStock: true,
    badge: "Meilleure Vente",
    onSale: true,
    colors: [
      { id: "natural", name: "Naturel", hex: "#D4B896", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_gv77m0gv77m0gv77-2ZuSE03hVAhko9zJULiZyynQuzvSro.png" },
      { id: "walnut", name: "Noyer", hex: "#5D4037", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_v6k2hsv6k2hsv6k2-WlF4p8OnMPN9VN2jMsVPIoGPJUxmAU.png" },
      { id: "black", name: "Noir", hex: "#2D2D2D", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_y18qr9y18qr9y18q-nzi1de1MXOo3sji65NDIhMdbxWOdIk.png" },
      { id: "grey", name: "Gris", hex: "#9E9E9E", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_hoylswhoylswhoyl-IspXGlydLXx9MoShiAKqZWmOiQQpwj.png" },
    ],
  },
  {
    id: "prod_oak_slat_panel",
    slug: "panneau-mural-lattes-chene",
    name: "Panneau Mural en Lattes de Chêne",
    description:
      "Panneau artisanal en lattes de chêne naturel aux tons chauds. Parfait pour créer une atmosphère scandinave chaleureuse.",
    longDescription:
      "Transformez votre espace avec notre Panneau Mural en Lattes de Chêne premium, méticuleusement fabriqué à partir de chêne européen provenant de sources durables. Chaque panneau présente des lattes espacées avec précision qui créent de magnifiques jeux d'ombre et de lumière tout au long de la journée. Les variations naturelles du grain rendent chaque panneau unique, apportant chaleur et texture à n'importe quelle pièce. Idéal pour les salons, les chambres ou les espaces de bureau recherchant cette esthétique nordique authentique.",
    price: 16,
    currency: "EUR",
    category: "wall-panels",
    images: [
      "/oak-wood-slat-wall-panel-natural-texture-scandinav.jpg",
      "/oak-slat-panel-installed-living-room-modern.jpg",
      "/oak-wood-panel-close-up-grain-detail.jpg",
    ],
    features: ["100% chêne européen", "Système d'installation facile", "Propriétés d'absorption acoustique", "Bois certifié FSC"],
    dimensions: "120cm x 60cm x 2cm",
    material: "Chêne Européen Massif",
    inStock: true,
    badge: "Meilleure Vente",
  },
  {
    id: "prod_walnut_acoustic",
    slug: "panneau-acoustique-noyer",
    name: "Panneau Acoustique Noyer",
    description: "Panneau acoustique premium en noyer alliant esthétique élégante et absorption sonore supérieure.",
    longDescription:
      "Découvrez la fusion parfaite de la forme et de la fonction avec notre Panneau Acoustique Noyer. Conçu avec un noyau acoustique haute densité et recouvert d'un luxueux placage de noyer américain, ce panneau réduit considérablement l'écho et la réverbération tout en ajoutant une chaleur sophistiquée à votre intérieur. Les tons chocolat profonds du noyer créent un impact visuel saisissant qui sublime n'importe quel espace contemporain ou traditionnel.",
    price: 29,
    currency: "EUR",
    category: "wall-panels",
    images: [
      "/walnut-acoustic-panel-dark-wood-elegant-modern.jpg",
      "/walnut-panel-home-office-professional.jpg",
      "/acoustic-panel-sound-studio-walnut.jpg",
    ],
    features: ["Indice NRC 0.85", "Placage noyer américain", "Noyau ignifuge", "Système de design modulaire"],
    dimensions: "120cm x 60cm x 4cm",
    material: "Placage Noyer / Noyau Acoustique",
    inStock: true,
    badge: "Nouveau",
  },
  {
    id: "prod_arc_lamp",
    slug: "lampe-arc-minimaliste",
    name: "Lampadaire Arc Minimaliste",
    description: "Lampadaire élégant au design arc courbé. Finition laiton avec abat-jour en lin.",
    longDescription:
      "Le Lampadaire Arc Minimaliste incarne l'essence de la philosophie du design scandinave — une belle simplicité avec une fonction réfléchie. L'arc gracieux en laiton s'étend élégamment au-dessus des espaces de vie, fournissant une lumière ambiante chaleureuse à travers son abat-jour en lin naturel. La base en marbre lesté assure la stabilité tout en ajoutant une touche de luxe. Parfait pour les coins lecture ou comme pièce maîtresse dans votre espace de vie.",
    price: 185,
    currency: "EUR",
    category: "lighting",
    images: ["/minimalist-arc-floor-lamp-brass-linen-shade.jpg"],
    features: ["Hauteur d'arc ajustable", "Abat-jour en lin naturel", "Base en marbre", "Compatible ampoule E27"],
    dimensions: "Hauteur: 180cm, Portée de l'arc: 120cm",
    material: "Laiton / Marbre / Lin",
    inStock: true,
  },
  {
    id: "prod_ceramic_vase",
    slug: "vase-ceramique-organique",
    name: "Vase Céramique Organique",
    description: "Vase en céramique tourné à la main aux courbes organiques et finition mate.",
    longDescription:
      "Chaque Vase Céramique Organique est individuellement tourné à la main par des artisans qualifiés dans notre atelier portugais, faisant de chaque pièce une œuvre véritablement unique. Les imperfections délibérées et les courbes organiques célèbrent la beauté de l'artisanat, tandis que le doux émail mat dans notre ton d'argile signature ajoute une élégance discrète. Qu'il soit exposé vide comme objet sculptural ou rempli de plantes séchées, ce vase apporte une chaleur artisanale à n'importe quelle surface.",
    price: 92,
    currency: "EUR",
    category: "decor",
    images: [
      "/organic-ceramic-vase-matte-beige-handmade.jpg",
      "/ceramic-vase-dried-flowers-minimalist.jpg",
      "/handmade-pottery-vase-detail-texture.jpg",
    ],
    features: ["Fabriqué à la main au Portugal", "Émail alimentaire", "Intérieur imperméable", "Pièce unique"],
    dimensions: "Hauteur: 28cm, Diamètre: 15cm",
    material: "Céramique Grès",
    inStock: true,
    styles: [
      { id: "matte-white", name: "Blanc Mat", image: "/organic-ceramic-vase-matte-beige-handmade.jpg" },
      { id: "natural-dried", name: "Naturel avec Fleurs Séchées", image: "/ceramic-vase-dried-flowers-minimalist.jpg" },
      { id: "blue-painted", name: "Bleu Peint", image: "/handmade-pottery-vase-detail-texture.jpg" },
    ],
  },
  {
    id: "prod_U2rv6g1To7VPTZ",
    slug: "kit-ruban-led-encastre",
    name: "Kit Ruban LED Encastré",
    description: "Ruban LED blanc chaud 3000K pour éclairage de panneaux encastrés. Auto-adhésif avec variateur tactile. 8 pièces incluses.",
    longDescription:
      "Améliorez vos panneaux muraux avec notre Kit Ruban LED Encastré professionnel, conçu spécifiquement pour l'installation derrière les panneaux. Ce kit complet de 8 pièces comprend des rubans LED de plusieurs tailles (18\", 26\", 34\", 42\" - 2 de chaque), un driver LED premium, un variateur tactile, et tous les câbles de connexion. La température de couleur chaude de 3000K crée une ambiance chaleureuse, tandis que le variateur tactile permet un réglage de 10% à 100% de luminosité avec fonction mémoire. Caractérisé par un ruban adhésif plus épais pour un montage supérieur et un boîtier en aluminium noir qui disparaît derrière les panneaux. Le système de connexion rapide rend l'installation simple. Parfait pour chambres, salons, bureaux et murs de canapé.",
    price: 175,
    currency: "EUR",
    category: "lighting",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LED0101-NcQN4b3GARfX7EQhQSIcnMbQB9NsFa.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LED0202-FgYEc2VLFBKleJV7PYlgETikXoR8mG.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LED0303-gogSHAtk3fgrlc95hSLuauXIeSc1We.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LED0333-aAgFPx9MLEjZ1qUmRjKyg0TTMx5AlI.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LED030303-P4LLJ1QfKkKzSLlIC8ahDalqeFtXkt.jpg",
    ],
    features: [
      "8 rubans LED inclus (2x chaque taille)",
      "Température de couleur blanc chaud 3000K",
      "Variateur tactile 10%-100% avec mémoire",
      "Ruban auto-adhésif épais premium",
      "Boîtier en aluminium noir",
      "Transformateur LED inclus",
      "Câbles de connexion rapide (2m)",
      "Parfait pour installation encastrée",
    ],
    dimensions: "18\", 26\", 34\", 42\" rubans (2 de chaque)",
    material: "Aluminium Noir / LED",
    inStock: true,
    badge: "Populaire",
  },
  {
    id: "prod_U2rvHwRWU8IYTd",
    slug: "nettoyant-preparation-mur",
    name: "Nettoyant Anti-moisissures STARWAX 500ML",
    description: "Idéal pour éliminer les moisissures sur les murs, plafonds, contours de fenêtres des pièces à vivre. Sans rinçage, sans odeur incommodante, ne décolore pas les supports. Sans Javel.",
    longDescription:
      "STARWAX Anti-moisissures pour murs et pièces à vivre 500ML - Idéal pour éliminer les moisissures sur les murs, plafonds, contours de fenêtres des pièces à vivre. Prêt à l'emploi : sans rinçage, sans odeur incommodante, ne tache pas. Fongicide selon EN1650 et EN13697 en 15 min à 20°C. Bactéricide selon les normes EN1276 et EN13697 en 5 min à 20°C. Virucide sur virus enveloppés selon la norme EN 14476 en 1 min à 20°C. Utilisable sur chambres, salon, murs et plafonds peints, papier vinyl, contours de fenêtres, surfaces lavables dures. Flacon pulvérisateur de 500ml. Sans Javel.",
    price: 17,
    currency: "EUR",
    category: "decor",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CLEAN04-jsHtrQ87vwg45Qyo5RrSkzrJbV2MXC.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CLEAN05-OrCyYhiGFlNOZJ6uMPv729KBWN6jHG.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CLEAN05E-ImqfbNfWohct5EliXBJBJy3edDfAHq.jpg",
    ],
    features: [
      "Sans rinçage, sans odeur incommodante",
      "Ne décolore pas les supports",
      "Fongicide selon EN1650 et EN13697 en 15 min",
      "Bactéricide selon EN1276 et EN13697 en 5 min",
      "Virucide selon EN 14476 en 1 min",
      "Sans Javel",
      "Flacon pulvérisateur 500ml",
      "Fabriqué en France",
    ],
    dimensions: "500 ml",
    material: "Solution Anti-moisissures",
    inStock: true,
    badge: "Essentiel",
  },
  {
    id: "prod_U2rvgYxfRGaGl7",
    slug: "tableau-madrid-santiago-bernabeu",
    name: "Tableau Madrid Stade Santiago Bernabéu en Noir et Blanc",
    description:
      "Tableau décoratif exclusif du Stade Santiago Bernabéu en noir et blanc. Impression haute définition sur papier photographique 240g. Disponible en plusieurs tailles et types de finition.",
    longDescription:
      "Avec un design exclusif et une finition de haute qualité, le Tableau Madrid Stade Santiago Bernabéu en Noir et Blanc va sublimer la décoration de votre intérieur avec un style moderne, élégant et qui vous ressemble. Choisissez votre moldure et les dimensions souhaitées ci-dessous. Impression en haute définition sur papier photographique 240g avec des couleurs intenses, soigneusement emballé et envoyé en tube postal résistant. Impression avec encre écologique et non toxique.",
    price: 87.90,
    originalPrice: 109.90,
    currency: "EUR",
    category: "decor",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11_50_05_829_11_2_1_169_lr01427destaque-3rTBVWdA4H0XQmcV9lYEdKBX5Mv0eo.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17_39_26_187_lr01427-filete-preta%20%281%29-9tbzZKTDsBeo3Zh5UCm6vWsOFY4A2q.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11_50_13_758_11_2_1_119_lr01427ambiente03%20%282%29-rKVz9Zs6yc0iLmDktTFO4xdy6Wk4Rh.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_ho4ec5ho4ec5ho4e-2UOOEE3fBhit8jtumSwUCqnRq9qgrb.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_iflkykiflkykiflk-14ui5eCJO8pRc8M5c39UDE3wbYdvWl.png",
    ],
    inStock: true,
    badge: "Nouveau",
    onSale: true,
    colors: [
      { id: "noir", name: "Noir", hex: "#1a1a1a" },
      { id: "blanc", name: "Blanc", hex: "#f5f5f5" },
      { id: "naturel", name: "Naturel", hex: "#D4B896" },
      { id: "freijo", name: "Freijó", hex: "#8B6343" },
      { id: "noyer", name: "Noyer", hex: "#3E2010" },
    ],
    styles: [
      {
        id: "moldura-filete",
        name: "1. Moldure Filet",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202026-02-24%20a%CC%80s%2018.45.03-NTFToD4wrDKpV1RFrnvW7mTw9peTDT.png",
      },
      {
        id: "moldura-premium-vidro",
        name: "2. Moldure Premium avec Verre",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202026-02-24%20a%CC%80s%2018.45.23-G7bxIKBuZznu8W7rUxPelmIGP6JOPH.png",
      },
      {
        id: "moldura-premium-sem-vidro",
        name: "3. Moldure Premium sans Verre",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202026-02-24%20a%CC%80s%2018.45.23-G7bxIKBuZznu8W7rUxPelmIGP6JOPH.png",
      },
      {
        id: "canvas",
        name: "4. Canvas avec Cadre",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202026-02-24%20a%CC%80s%2018.46.39-g1dRjZY79eMT0M1qQGmgtaYlDPnfzu.png",
      },
      {
        id: "papel-fotografico",
        name: "5. Papier Photographique",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202026-02-24%20a%CC%80s%2018.46.39-g1dRjZY79eMT0M1qQGmgtaYlDPnfzu.png",
      },
      {
        id: "placa-decorativa",
        name: "6. Plaque Décorative",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202026-02-24%20a%CC%80s%2018.44.29-h5L4XO5SWUCqL2AlrrlxdX377ONxH6.png",
      },
    ],
    features: [
      "Impression haute définition sur papier 240g",
      "Disponible en 6 tailles : 21x30, 30x40, 40x60, 50x70, 70x100, 100x150 cm",
      "6 types de finition disponibles",
      "5 couleurs de moldure disponibles",
      "Encre écologique et non toxique",
      "Emballage soigné en tube postal résistant",
      "Fait à la main avec soin",
      "Certificat de qualité inclus",
    ],
    dimensions: "21x30 cm | 30x40 cm | 40x60 cm | 50x70 cm | 70x100 cm | 100x150 cm",
    material: "Papier Photographique 240g / Bois de Pin 100% reboisement",
  },
  // Test Product FR
  {
    id: "prod_U2rwsqAu2lmXwH",
    slug: "produit-test",
    name: "Produit Test",
    description: "Produit de test pour vérification du système - Prix symbolique de 2 euros",
    longDescription:
      "Ceci est un produit de test créé pour vérifier le bon fonctionnement du système de commerce électronique avec la devise EUR (Euro). Ce produit a un prix symbolique de 2,00 € et ne doit être utilisé qu'à des fins de test et de validation.",
    price: 2.00,
    currency: "EUR",
    category: "decor",
    hidden: true,
    noShipping: true,
    images: [
      "/placeholder.svg",
    ],
    features: [
      "Produit de test uniquement",
      "Prix symbolique 2,00 €",
      "Ne pas utiliser en production",
      "Pour validation du système",
    ],
    dimensions: "Test",
    material: "Test",
    inStock: true,
    badge: "Test",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

// Get only visible products (exclude hidden products)
export function getVisibleProducts(): Product[] {
  return products.filter((p) => !p.hidden)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category && !p.hidden)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge && !p.hidden)
}
