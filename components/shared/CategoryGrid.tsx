import Link from 'next/link'

const ICONES: Record<string, string> = {
  building: '🏗️', wall: '🧱', door: '🚪', window: '🪟',
  droplet: '🔧', bolt: '⚡', grid: '🪵', paint: '🎨',
  bath: '🛁', 'chef-hat': '🍳', wind: '❄️', ruler: '📐',
  palette: '🎭', home: '🏠', compass: '🧭', layers: '🔲',
  pickaxe: '⛏️', scaffold: '🏚️',
}

interface Cat { id: string; nom: string; slug: string; icone?: string | null }
export default function CategoryGrid({ categories }: { categories: Cat[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map(cat => (
        <Link
          key={cat.id}
          href={`/annuaire?categorie=${cat.slug}`}
          className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-100 rounded-xl hover:border-orange-200 hover:bg-orange-50 transition group"
        >
          <span className="text-3xl">{ICONES[cat.icone ?? ''] ?? '🏠'}</span>
          <span className="text-sm font-medium text-gray-700 text-center group-hover:text-orange-600">{cat.nom}</span>
        </Link>
      ))}
    </div>
  )
}
