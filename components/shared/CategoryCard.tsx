'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Cat {
  slug: string; nom: string; nomAr: string
  emoji: string; color: string; photo: string
}

export default function CategoryCard({ cat, index }: { cat: Cat; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={`/annuaire?categorie=${cat.slug}`}
        className="group relative block rounded-2xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <Image
          src={cat.photo}
          alt={cat.nom}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3">
          <span className="text-3xl mb-2 drop-shadow-lg group-hover:scale-125 transition-transform">{cat.emoji}</span>
          <span className="font-bold text-sm text-center drop-shadow-md">{cat.nom}</span>
          <span className="text-xs opacity-80 mt-0.5">{cat.nomAr}</span>
        </div>
        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Voir →
        </div>
      </Link>
    </motion.div>
  )
}
