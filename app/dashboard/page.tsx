import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/connexion')

  const userId = (session.user as any).id
  const role = (session.user as any).role

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      prestataire: {
        include: {
          avis: { where: { statut: 'APPROUVE' }, select: { note: true } },
          devisRecus: { select: { id: true, statut: true, createdAt: true } },
        },
      },
    },
  })

  if (!user) redirect('/connexion')

  const prestataire = user.prestataire
  const nbDevis = prestataire?.devisRecus.length ?? 0
  const nbAvis = prestataire?.avis.length ?? 0
  const noteMoyenne = nbAvis > 0
    ? (prestataire!.avis.reduce((s, a) => s + a.note, 0) / nbAvis).toFixed(1)
    : '—'
  const vues = prestataire?.vues ?? 0
  const devisEnAttente = prestataire?.devisRecus.filter(d => d.statut === 'EN_ATTENTE').length ?? 0

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {user.prenom} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          {role === 'PRESTATAIRE'
            ? 'Voici un aperçu de votre activité sur BTP Maroc'
            : 'Bienvenue sur votre espace BTP Maroc'}
        </p>
      </div>

      {/* Bandeau si prestataire sans profil */}
      {role === 'PRESTATAIRE' && !prestataire && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-orange-800">Votre profil professionnel est incomplet</p>
            <p className="text-sm text-orange-600 mt-0.5">Complétez votre profil pour apparaître dans l'annuaire</p>
          </div>
          <Link
            href="/inscription/prestataire"
            className="shrink-0 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
          >
            Compléter mon profil
          </Link>
        </div>
      )}

      {/* Stats (prestataire uniquement) */}
      {role === 'PRESTATAIRE' && prestataire && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Vues du profil', value: vues, emoji: '👁️' },
            { label: 'Devis reçus', value: nbDevis, emoji: '📋' },
            { label: 'Note moyenne', value: noteMoyenne, emoji: '⭐' },
            { label: 'Avis approuvés', value: nbAvis, emoji: '💬' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {role === 'PRESTATAIRE' && prestataire && (
          <>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4">
                Devis en attente
                {devisEnAttente > 0 && (
                  <span className="ml-2 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {devisEnAttente}
                  </span>
                )}
              </h2>
              {devisEnAttente === 0 ? (
                <p className="text-gray-400 text-sm">Aucun devis en attente pour l'instant.</p>
              ) : (
                <p className="text-sm text-gray-600">{devisEnAttente} devis attend votre réponse.</p>
              )}
              <Link
                href="/dashboard/devis"
                className="mt-4 inline-block text-sm text-orange-600 font-medium hover:underline"
              >
                Voir tous les devis →
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4">Mon profil public</h2>
              <p className="text-sm text-gray-500 mb-4">
                Votre profil est {prestataire.actif ? 'visible' : 'masqué'} dans l'annuaire.
              </p>
              <div className="flex gap-3">
                <Link
                  href={`/prestataire/${prestataire.id}`}
                  className="text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:border-orange-400 transition"
                >
                  Voir le profil
                </Link>
                <Link
                  href="/dashboard/profil"
                  className="text-sm bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                >
                  Modifier
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Pour tous */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Accès rapide</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/annuaire" className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition">
                🔍 <span>Parcourir l'annuaire</span>
              </Link>
            </li>
            <li>
              <Link href="/simulateur" className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition">
                🧮 <span>Lancer le simulateur de coût</span>
              </Link>
            </li>
            {role === 'PRESTATAIRE' && !prestataire && (
              <li>
                <Link href="/inscription/prestataire" className="flex items-center gap-2 text-sm text-orange-600 font-medium hover:underline">
                  🏗️ <span>Compléter mon profil prestataire</span>
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Mon compte</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex justify-between">
              <span className="text-gray-400">Nom</span>
              <span className="font-medium">{user.prenom} {user.nom}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Email</span>
              <span className="font-medium">{user.email}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Rôle</span>
              <span className={`font-medium ${role === 'PRESTATAIRE' ? 'text-orange-600' : role === 'ADMIN' ? 'text-red-600' : 'text-gray-700'}`}>
                {role === 'PRESTATAIRE' ? 'Prestataire' : role === 'ADMIN' ? 'Admin' : 'Particulier'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
