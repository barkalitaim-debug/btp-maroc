import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MapPin, Star, Phone, Globe } from '@/components/shared/Icons'
import DevisForm from '@/components/prestataire/DevisForm'

export default async function ProfilPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const p = await prisma.prestataire.findUnique({
    where: { id },
    include: {
      photos: { orderBy: { ordre: 'asc' } },
      categories: { include: { categorie: true } },
      avis: { where: { statut: 'APPROUVE' }, include: { client: { select: { nom: true, prenom: true } } }, orderBy: { createdAt: 'desc' }, take: 5 },
      user: { select: { phone: true } },
    },
  })
  if (!p) notFound()

  const noteMovenne = p.avis.length ? p.avis.reduce((s, a) => s + a.note, 0) / p.avis.length : 0
  const photoP = p.photos.find(ph => ph.principale) ?? p.photos[0]

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Colonne principale */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <div className="flex gap-5 items-start">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                {photoP ? <Image src={photoP.url} alt={p.raisonSociale} fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl">🏗️</div>}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-xl font-bold text-gray-900">{p.raisonSociale}</h1>
                  {p.verifie && <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">✓ Vérifié</span>}
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-2"><MapPin size={14} />{p.ville}, {p.wilaya}</div>
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} className={i <= Math.round(noteMovenne) ? 'fill-orange-400 text-orange-400' : 'fill-gray-200 text-gray-200'} />)}
                  <span className="text-sm text-gray-500 ml-1">{noteMovenne.toFixed(1)} ({p.avis.length} avis)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.categories.map(c => <span key={c.categorieId} className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">{c.categorie.nom}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* À propos */}
          {p.description && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-3">À propos</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
              <div className="flex gap-6 mt-4 text-sm text-gray-500">
                {p.anneeCreation && <span>📅 Depuis {p.anneeCreation}</span>}
                {p.employes && <span>👥 {p.employes} employés</span>}
                {p.siteWeb && <a href={p.siteWeb} target="_blank" className="flex items-center gap-1 text-orange-600 hover:underline"><Globe size={14} />{p.siteWeb}</a>}
              </div>
            </div>
          )}

          {/* Galerie */}
          {p.photos.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-4">Galerie photos</h2>
              <div className="grid grid-cols-3 gap-3">
                {p.photos.map(ph => (
                  <div key={ph.id} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image src={ph.url} alt={ph.alt ?? ''} fill className="object-cover hover:scale-105 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Avis */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Avis clients ({p.avis.length})</h2>
            {p.avis.length === 0 ? (
              <p className="text-gray-400 text-sm">Aucun avis pour le moment.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {p.avis.map(a => (
                  <div key={a.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                        {a.client.prenom[0]}{a.client.nom[0]}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">{a.client.prenom} {a.client.nom}</div>
                        <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={12} className={i <= a.note ? 'fill-orange-400 text-orange-400' : 'fill-gray-200 text-gray-200'} />)}</div>
                      </div>
                      <span className="ml-auto text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString('fr-MA')}</span>
                    </div>
                    <p className="text-sm text-gray-600">{a.commentaire}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar devis */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-20">
            <DevisForm prestataireId={p.id} raisonSociale={p.raisonSociale} />
          </div>
        </div>
      </div>
    </div>
  )
}
