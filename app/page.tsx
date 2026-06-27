import Link from 'next/link'
import Image from 'next/image'
import SearchBar from '@/components/shared/SearchBar'
import CategoryCard from '@/components/shared/CategoryCard'
import SimulateurCTA from '@/components/shared/SimulateurCTA'

const CATEGORIES = [
  { slug: 'gros-oeuvre',    nom: 'Gros Œuvre',      nomAr: 'أعمال البناء',  emoji: '🏗️', color: 'from-orange-500 to-red-500',    photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80' },
  { slug: 'electricite',    nom: 'Électricité',      nomAr: 'الكهرباء',      emoji: '⚡', color: 'from-yellow-400 to-orange-500',  photo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80' },
  { slug: 'plomberie',      nom: 'Plomberie',        nomAr: 'السباكة',       emoji: '🔧', color: 'from-blue-500 to-cyan-500',      photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { slug: 'carrelage',      nom: 'Carrelage',        nomAr: 'البلاط',        emoji: '🪵', color: 'from-stone-500 to-amber-600',    photo: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80' },
  { slug: 'peinture',       nom: 'Peinture',         nomAr: 'الطلاء',        emoji: '🎨', color: 'from-pink-500 to-rose-500',      photo: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80' },
  { slug: 'menuiserie-bois', nom: 'Menuiserie',      nomAr: 'النجارة',       emoji: '🚪', color: 'from-amber-600 to-yellow-500',   photo: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80' },
  { slug: 'architecture',   nom: 'Architecture',     nomAr: 'الهندسة',       emoji: '📐', color: 'from-gray-600 to-gray-800',      photo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80' },
  { slug: 'climatisation',  nom: 'Climatisation',    nomAr: 'التكييف',       emoji: '❄️', color: 'from-sky-400 to-blue-500',       photo: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80' },
  { slug: 'salle-de-bain',  nom: 'Salle de Bain',   nomAr: 'الحمام',        emoji: '🛁', color: 'from-teal-500 to-emerald-500',   photo: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80' },
  { slug: 'cuisine',        nom: 'Cuisine Équipée',  nomAr: 'المطبخ',        emoji: '🍳', color: 'from-orange-400 to-amber-500',   photo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80' },
  { slug: 'decoration',     nom: 'Décoration',       nomAr: 'الديكور',       emoji: '🎭', color: 'from-purple-500 to-pink-500',    photo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
  { slug: 'toiture',        nom: 'Toiture',          nomAr: 'السقف',         emoji: '🏠', color: 'from-red-600 to-orange-600',     photo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
]

const STATS = [
  { value: '500+', label: 'Prestataires', sub: 'dans tout le Maroc' },
  { value: '12', label: 'Catégories', sub: 'de métiers BTP' },
  { value: '15', label: 'Villes', sub: 'couvertes' },
  { value: '4.8★', label: 'Note moyenne', sub: 'satisfaction client' },
]

const ETAPES = [
  { num: '01', emoji: '🎯', titre: 'Décrivez votre projet', desc: 'Précisez vos travaux, votre ville et votre budget.' },
  { num: '02', emoji: '🔍', titre: 'Comparez les experts', desc: 'Explorez des profils vérifiés avec avis clients réels.' },
  { num: '03', emoji: '✅', titre: 'Recevez vos devis', desc: 'Les prestataires vous contactent sous 24h.' },
]

export default async function HomePage() {
  return (
    <div className="overflow-hidden">

      {/* ══════ HERO ══════ */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Construction au Maroc"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/75 to-orange-900/60" />
        </div>

        {/* Animated shapes */}
        <div className="absolute top-32 right-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-10 w-48 h-48 bg-orange-600/15 rounded-full blur-2xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 backdrop-blur-sm text-orange-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            La référence BTP au Maroc
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            Trouvez les meilleurs
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              artisans du Maroc
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Maâlems, entreprises BTP et architectes — vérifiés, notés et disponibles dans votre ville
          </p>

          <SearchBar />

          {/* Popular searches */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['Électricien à Casablanca', 'Plombier à Marrakech', 'Architecte à Rabat', 'Carrelage à Agadir'].map(s => (
              <span key={s} className="text-xs text-gray-400 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 cursor-pointer transition">
                🔍 {s}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
          <span className="text-xs">Découvrir</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-bounce" />
        </div>
      </section>

      {/* ══════ STATS ══════ */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl font-black text-orange-600 group-hover:scale-110 transition-transform">{s.value}</div>
                <div className="font-semibold text-gray-900 mt-1">{s.label}</div>
                <div className="text-sm text-gray-400">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CATÉGORIES ══════ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-widest">Nos expertises</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">Tous les corps de métiers</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Des professionnels qualifiés pour chaque type de travaux</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.slug} cat={cat} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/annuaire" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-200">
              Voir tous les prestataires →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ COMMENT ÇA MARCHE ══════ */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-widest">Simple & rapide</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">Comment ça marche ?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ETAPES.map((e, i) => (
              <div key={i} className="relative text-center group">
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px border-t-2 border-dashed border-orange-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-orange-50 border-2 border-orange-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 group-hover:bg-orange-100 transition-all">
                    {e.emoji}
                  </div>
                  <div className="text-orange-500 font-black text-sm mb-2">Étape {e.num}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{e.titre}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SIMULATEUR CTA ══════ */}
      <SimulateurCTA />

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-widest">Témoignages</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">Ils nous font confiance</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { nom: 'Karim B.', ville: 'Casablanca', note: 5, text: "Excellent service ! J'ai trouvé un électricien en 2h. Travail impeccable et prix honnête.", avatar: 'K' },
              { nom: 'Fatima Z.', ville: 'Marrakech', note: 5, text: "La plateforme m'a permis de comparer plusieurs artisans. J'ai choisi le meilleur pour ma salle de bain.", avatar: 'F' },
              { nom: 'Ahmed M.', ville: 'Rabat', note: 5, text: "Le simulateur de coût m'a aidé à budgétiser ma villa. Très pratique et précis !", avatar: 'A' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.note)].map((_, j) => <span key={j} className="text-orange-400">★</span>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 font-bold rounded-full flex items-center justify-center">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.nom}</div>
                    <div className="text-gray-400 text-xs">{t.ville}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA PRESTATAIRE ══════ */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=40')] bg-cover bg-center opacity-10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🏗️</div>
          <h2 className="text-4xl font-black text-white mb-4">Vous êtes un professionnel BTP ?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Rejoignez notre réseau et développez votre clientèle au Maroc. Inscription 100% gratuite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inscription?role=prestataire"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-xl shadow-orange-900/50">
              Créer mon profil gratuitement
            </Link>
            <Link href="/annuaire"
              className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition">
              Voir l&apos;annuaire
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
