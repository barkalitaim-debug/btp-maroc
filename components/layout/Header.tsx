'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/annuaire', label: 'Annuaire' },
  { href: '/simulateur', label: 'Simulateur' },
  { href: '/materiaux', label: 'Matériaux' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Building2 size={20} className="text-white" />
          </div>
          <span className={`font-bold text-xl transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            BTP <span className="text-orange-500">Maroc</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-orange-50 hover:text-orange-600 ${
                scrolled ? 'text-gray-600' : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/connexion"
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
              scrolled ? 'text-gray-600 hover:text-orange-600' : 'text-white/90 hover:text-white'
            }`}>
            Connexion
          </Link>
          <Link href="/inscription"
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-200">
            Inscription gratuite
          </Link>
        </div>

        <button className="md:hidden p-2 rounded-lg"
          onClick={() => setOpen(!open)}>
          {open
            ? <X size={22} className={scrolled ? 'text-gray-900' : 'text-white'} />
            : <Menu size={22} className={scrolled ? 'text-gray-900' : 'text-white'} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-2">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href}
                className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-orange-50 hover:text-orange-600 transition"
                onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-1 flex flex-col gap-2">
              <Link href="/connexion" className="px-4 py-3 text-gray-600 font-medium" onClick={() => setOpen(false)}>Connexion</Link>
              <Link href="/inscription" className="bg-orange-600 text-white font-semibold px-4 py-3 rounded-xl text-center" onClick={() => setOpen(false)}>Inscription gratuite</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
