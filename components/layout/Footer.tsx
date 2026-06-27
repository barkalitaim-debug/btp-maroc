import Link from 'next/link'
import { Building2, MapPin, Phone, Mail } from 'lucide-react'

const CATEGORIES_FOOTER = ['Électricité', 'Plomberie', 'Maçonnerie', 'Peinture', 'Carrelage', 'Architecture']
const VILLES_FOOTER = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir']

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center">
                <Building2 size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl text-white">BTP <span className="text-orange-500">Maroc</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              La plateforme de référence pour trouver des artisans et entreprises BTP au Maroc.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2"><Mail size={14} className="text-orange-500" /> contact@btp-maroc.ma</div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-orange-500" /> +212 6XX XXX XXX</div>
              <div className="flex items-center gap-2"><MapPin size={14} className="text-orange-500" /> Casablanca, Maroc</div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Catégories</h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES_FOOTER.map(c => (
                <li key={c}>
                  <Link href={`/annuaire?categorie=${c.toLowerCase()}`} className="hover:text-orange-400 transition flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-orange-500 rounded-full" />{c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Villes principales</h4>
            <ul className="space-y-2.5 text-sm">
              {VILLES_FOOTER.map(v => (
                <li key={v}>
                  <Link href={`/annuaire?ville=${v}`} className="hover:text-orange-400 transition flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-orange-500 rounded-full" />{v}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Liens utiles</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/simulateur', label: 'Simulateur de coût' },
                { href: '/inscription', label: 'Devenir prestataire' },
                { href: '/connexion', label: 'Connexion' },
                { href: '/annuaire', label: 'Annuaire BTP' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-orange-400 transition flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-orange-500 rounded-full" />{l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div>© 2024 BTP Maroc. Tous droits réservés.</div>
          <div className="flex items-center gap-1 text-gray-500">
            Fait avec <span className="text-orange-500 mx-1">♥</span> au Maroc 🇲🇦
          </div>
        </div>
      </div>
    </footer>
  )
}
