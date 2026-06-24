import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star } from '@/components/shared/Icons'

interface Props {
  id: string; raisonSociale: string; ville: string; premium: string
  verifie: boolean; photo?: string | null
  categories: { nom: string; slug: string }[]
  noteMovenne: number; nbAvis: number
}

export default function PrestataireCard({ id, raisonSociale, ville, premium, verifie, photo, categories, noteMovenne, nbAvis }: Props) {
  const stars = Math.round(noteMovenne)
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
      <div className="relative h-44 bg-gray-100">
        {photo ? (
          <Image src={photo} alt={raisonSociale} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🏗️</div>
        )}
        <div className="absolute top-2 left-2 flex gap-1">
          {verifie && <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">✓ Vérifié</span>}
          {premium === 'GOLD' && <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">GOLD</span>}
          {premium === 'SILVER' && <span className="bg-gray-300 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">SILVER</span>}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{raisonSociale}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
          <MapPin size={12} /> {ville}
        </div>
        {categories[0] && (
          <span className="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full mb-3 w-fit">{categories[0].nom}</span>
        )}
        <div className="flex items-center gap-1 mt-auto mb-3">
          {[1,2,3,4,5].map(i => (
            <Star key={i} size={14} className={i <= stars ? 'fill-orange-400 text-orange-400' : 'text-gray-200 fill-gray-200'} />
          ))}
          <span className="text-xs text-gray-500 ml-1">({nbAvis} avis)</span>
        </div>
        <Link href={`/prestataire/${id}`} className="block text-center bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 rounded-lg transition">
          Voir le profil
        </Link>
      </div>
    </div>
  )
}
