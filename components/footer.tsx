import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "Tous les Produits", href: "/products" },
    { name: "Panneaux Muraux", href: "/products?category=wall-panels" },
    { name: "Éclairage", href: "/products?category=lighting" },
    { name: "Miroirs", href: "/products?category=mirrors" },
    { name: "Décoration", href: "/products?category=decor" },
  ],
  company: [
    { name: "À Propos", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Durabilité", href: "/about#sustainability" },
    { name: "Carrières", href: "/about#careers" },
  ],
  support: [
    { name: "Livraison", href: "/contact#shipping" },
    { name: "Retours", href: "/contact#returns" },
    { name: "FAQ", href: "/contact#faq" },
    { name: "Guide d'Entretien", href: "/contact#care" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-2xl font-medium tracking-[0.2em] text-foreground">
              WOOD SHOP
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Panneaux muraux en bois premium, solutions acoustiques et décoration intérieure sélectionnée. Artisanat européen pour les intérieurs modernes.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground">Boutique</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground">Entreprise</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground">Support</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-10 sm:flex-row">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} WOOD SHOP. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Politique de Confidentialité
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Conditions d&apos;Utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
