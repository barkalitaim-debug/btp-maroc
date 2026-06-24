import { prisma } from '@/lib/prisma'
import PrestataireCard from '@/components/prestataire/PrestataireCard'
import Link from 'next/link'

const VILLES = ['Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès','Oujda','Kénitra','Tétouan','El Jadida','Salé']

interface SearchParams { q?: string; ville?: string; categorie?: string; page?: string; verifie?: string }

export default async function AnnuairePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const page = parseInt(sp.page ?? '1')
  const limit = 12

  const categories = await prisma.categorie.findMany({ where: { actif: true }, orderBy: { ordre: 'asc' } })

  const where: any = { actif: true }
  if (sp.ville) where.ville = { contains: sp.ville, mode: 'insensitive' }
  if (sp.verifie === '1') where.verifie = true
  if (sp.categorie) where.categories = { some: { categorie: { slug: sp.categorie } } }

  const [total, rawPrestataires] = await Promise.all([
    prisma.prestataire.count({ where }),
    prisma.prestataire.findMany({
      where,
      include: {
        photos: { where: { principale: true }, take: 1 },
        categories: { include: { categorie: true }, where: { principal: true } },
        avis: { where: { statut: 'APPROUVE' }, select: { note: true } },
      },
      orderBy: [{ premium: 'desc' }, { vues: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
  ])

  const prestataires = rawPrestataires.map(p => ({
    id: p.id, raisonSociale: p.raisonSociale, ville: p.ville,
    premium: p.premium, verifie: p.verifie, photo: p.photos[0]?.url ?? null,
    categories: p.categories.map(c => ({ nom: c.categorie.nom, slug: c.categorie.slug })),
    noteMovenne: p.avis.length ? p.avis.reduce((s, a) => s + a.note, 0) / p.avis.length : 0,
    nbAvis: p.avis.length,
  }))

  const pages = Math.ceil(total / limit)
  const buildUrl = (newParams: Record<string, string>) => {
    const params = new URLSearchParams({ ...(sp.ville && {ville: sp.ville}), ...(sp.categorie && {categorie: sp.categorie}), ...(sp.verifie && {verifie: sp.verifie}), ...newParams })
    return `/annuaire?${params.toString()}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filtres */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-4">Filtres</h3>
            <form method="GET" action="/annuaire" className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Ville</label>
                <select name="ville" defaultValue={sp.ville ?? ''} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option value="">Toutes</option>
                  {VILLES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Catégorie</label>
                <select name="categorie" defaultValue={sp.categorie ?? ''} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option value="">Toutes</option>
                  {categories.map(c => <option key={c.id} value={c.slug}>{c.nom}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" name="verifie" value="1" defaultChecked={sp.verifie === '1'} className="accent-orange-600" />
                Vérifiés uniquement
              </label>
              <button type="submit" className="bg-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition">Filtrer</button>
              <Link href="/annuaire" className="text-center text-sm text-gray-500 hover:text-orange-600">Réinitialiser</Link>
            </form>
          </div>
        </aside>

        {/* Résultats */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-900">
              {total} prestataire{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}
              {sp.ville ? ` à ${sp.ville}` : ''}
            </h1>
          </div>
          {prestataires.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-medium text-lg">Aucun prestataire trouvé</p>
              <p className="text-sm mt-2">Essayez de modifier vos filtres</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {prestataires.map(p => <PrestataireCard key={p.id} {...p} />)}
            </div>
          )}
          {pages > 1 && (
            <div className="flex justify-center gap-3 mt-10">
              {page > 1 && <Link href={buildUrl({ page: String(page - 1) })} className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-orange-400 transition">← Précédent</Link>}
              <span className="px-4 py-2 text-sm text-gray-500">Page {page} / {pages}</span>
              {page < pages && <Link href={buildUrl({ page: String(page + 1) })} className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-orange-400 transition">Suivant →</Link>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
