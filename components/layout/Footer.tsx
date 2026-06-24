import Link from 'next/link'
import { Building2 } from '@/components/shared/Icons'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <Building2 size={22} className="text-orange-500" />
            BTP Maroc
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            La plateforme de référence pour trouver les meilleurs artisans et entreprises BTP au Maroc.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/annuaire" className="hover:text-orange-400 transition">Annuaire prestataires</Link></li>
            <li><Link href="/simulateur" className="hover:text-orange-400 transition">Simulateur de coût</Link></li>
            <li><Link href="/inscription" className="hover:text-orange-400 transition">Devenir prestataire</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Catégories populaires</h4>
          <ul className="space-y-2 text-sm">
            {['electricite','plomberie','maconnerie','peinture','carrelage','architecture'].map(s => (
              <li key={s}><Link href={`/annuaire?categorie=${s}`} className="hover:text-orange-400 transition capitalize">{s.replace('-',' ')}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © 2024 BTP Maroc. Tous droits réservés.
      </div>
    </footer>
  )
}
