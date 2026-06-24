import { prisma } from '@/lib/prisma'
import SearchBar from '@/components/shared/SearchBar'
import CategoryGrid from '@/components/shared/CategoryGrid'
import PrestataireCard from '@/components/prestataire/PrestataireCard'
import StatsSection from '@/components/shared/StatsSection'
import SimulateurCTA from '@/components/shared/SimulateurCTA'
import Link from 'next/link'

export default async function HomePage() {
  const [categories, rawPrestataires, nbPrestataires, nbClients, nbAvis, nbVilles] = await Promise.all([
    prisma.categorie.findMany({ where: { actif: true }, orderBy: { ordre: 'asc' }, take: 12 }),
    prisma.prestataire.findMany({
      where: { actif: true },
      include: {
        photos: { where: { principale: true }, take: 1 },
        categories: { include: { categorie: true }, where: { principal: true } },
        avis: { where: { statut: 'APPROUVE' }, select: { note: true } },
      },
      orderBy: [{ premium: 'desc' }, { vues: 'desc' }],
      take: 8,
    }),
    prisma.prestataire.count({ where: { actif: true } }),
    prisma.user.count(),
    prisma.avis.count({ where: { statut: 'APPROUVE' } }),
    prisma.ville.count(),
  ])

  const prestataires = rawPrestataires.map(p => ({
    id: p.id,
    raisonSociale: p.raisonSociale,
    ville: p.ville,
    premium: p.premium,
    verifie: p.verifie,
    photo: p.photos[0]?.url ?? null,
    categories: p.categories.map(c => ({ nom: c.categorie.nom, slug: c.categorie.slug })),
    noteMovenne: p.avis.length ? p.avis.reduce((s, a) => s + a.note, 0) / p.avis.length : 0,
    nbAvis: p.avis.length,
  }))

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Trouvez les meilleurs prestataires BTP au Maroc
          </h1>
          <p className="text-orange-100 text-xl mb-10 max-w-2xl mx-auto">
            Artisans, maâlems, entreprises — vérifiés et notés par des clients réels
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Stats */}
      <StatsSection nbPrestataires={nbPrestataires} nbClients={nbClients} nbAvis={nbAvis} nbVilles={nbVilles} />

      {/* Catégories */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nos catégories</h2>
            <p className="text-gray-500 mt-1">Tous les corps de métiers du BTP</p>
          </div>
          <Link href="/annuaire" className="text-orange-600 text-sm font-medium hover:underline">Voir tout →</Link>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      {/* Top Prestataires */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Prestataires recommandés</h2>
              <p className="text-gray-500 mt-1">Les mieux notés du Maroc</p>
            </div>
            <Link href="/annuaire" className="text-orange-600 text-sm font-medium hover:underline">Voir tous →</Link>
          </div>
          {prestataires.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">🏗️</div>
              <p className="text-lg font-medium">Aucun prestataire pour l'instant</p>
              <p className="text-sm mt-2">Soyez le premier à vous inscrire !</p>
              <Link href="/inscription" className="mt-4 inline-block bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition">Créer mon profil</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {prestataires.map(p => <PrestataireCard key={p.id} {...p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Simulateur CTA */}
      <SimulateurCTA />

      {/* Comment ça marche */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Comment ça marche ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { emoji: '📋', step: '01', titre: 'Décrivez votre projet', desc: "Indiquez votre type de travaux, ville et budget." },
            { emoji: '🔍', step: '02', titre: 'Comparez les prestataires', desc: "Parcourez les profils et lisez les avis vérifiés." },
            { emoji: '✅', step: '03', titre: 'Recevez vos devis', desc: "Les prestataires vous répondent directement." },
          ].map(item => (
            <div key={item.step}>
              <div className="text-5xl mb-4">{item.emoji}</div>
              <div className="text-orange-600 font-bold text-sm mb-2">Étape {item.step}</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.titre}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Prestataire */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Vous êtes un professionnel BTP ?</h2>
          <p className="text-gray-400 mb-8">Rejoignez des milliers d'artisans qui développent leur activité.</p>
          <Link href="/inscription?role=prestataire" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-xl transition inline-block">
            Créer mon profil gratuitement
          </Link>
        </div>
      </section>
    </div>
  )
}
