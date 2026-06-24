'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from '@/components/shared/Icons'

const VILLES = ['Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès','Oujda','Kénitra','Tétouan','El Jadida','Salé','Témara','Béni Mellal','Settat']

export default function SearchBar() {
  const [q, setQ] = useState('')
  const [ville, setVille] = useState('')
  const router = useRouter()
  const handleSearch = () => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (ville) params.set('ville', ville)
    router.push(`/annuaire?${params.toString()}`)
  }
  return (
    <div className="bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Quelle prestation cherchez-vous ?"
        value={q}
        onChange={e => setQ(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch()}
        className="flex-1 px-4 py-3 text-gray-700 outline-none rounded-xl text-sm"
      />
      <select
        value={ville}
        onChange={e => setVille(e.target.value)}
        className="px-4 py-3 text-gray-600 outline-none rounded-xl text-sm border-l border-gray-100 bg-white"
      >
        <option value="">Toutes les villes</option>
        {VILLES.map(v => <option key={v} value={v}>{v}</option>)}
      </select>
      <button
        onClick={handleSearch}
        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition"
      >
        <Search size={18} /> Rechercher
      </button>
    </div>
  )
}
