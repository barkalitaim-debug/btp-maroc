'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Building2, Menu, X } from '@/components/shared/Icons'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-orange-600">
          <Building2 size={28} />
          BTP Maroc
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-orange-600 transition">Accueil</Link>
          <Link href="/annuaire" className="hover:text-orange-600 transition">Annuaire</Link>
          <Link href="/simulateur" className="hover:text-orange-600 transition">Simulateur</Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/connexion" className="text-sm font-medium text-gray-600 hover:text-orange-600">Connexion</Link>
          <Link href="/inscription" className="bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-700 transition">Inscription</Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <Link href="/" className="text-gray-700 font-medium" onClick={() => setOpen(false)}>Accueil</Link>
          <Link href="/annuaire" className="text-gray-700 font-medium" onClick={() => setOpen(false)}>Annuaire</Link>
          <Link href="/simulateur" className="text-gray-700 font-medium" onClick={() => setOpen(false)}>Simulateur</Link>
          <Link href="/connexion" className="text-gray-700 font-medium" onClick={() => setOpen(false)}>Connexion</Link>
          <Link href="/inscription" className="bg-orange-600 text-white font-medium px-4 py-2 rounded-lg text-center" onClick={() => setOpen(false)}>Inscription</Link>
        </div>
      )}
    </header>
  )
}
