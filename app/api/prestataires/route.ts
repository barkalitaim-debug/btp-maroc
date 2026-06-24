import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ville = searchParams.get('ville')
  const wilaya = searchParams.get('wilaya')
  const categorieSlug = searchParams.get('categorie')
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '12')

  const where: any = { actif: true }
  if (ville) where.ville = { contains: ville, mode: 'insensitive' }
  if (wilaya) where.wilaya = { contains: wilaya, mode: 'insensitive' }
  if (categorieSlug) where.categories = { some: { categorie: { slug: categorieSlug } } }

  const [total, prestataires] = await Promise.all([
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

  const data = prestataires.map(p => ({
    id: p.id,
    raisonSociale: p.raisonSociale,
    ville: p.ville,
    wilaya: p.wilaya,
    premium: p.premium,
    verifie: p.verifie,
    photo: p.photos[0]?.url ?? null,
    categories: p.categories.map(c => ({ nom: c.categorie.nom, slug: c.categorie.slug })),
    noteMovenne: p.avis.length ? p.avis.reduce((s, a) => s + a.note, 0) / p.avis.length : 0,
    nbAvis: p.avis.length,
  }))

  return NextResponse.json({ data, meta: { total, page, limit, pages: Math.ceil(total / limit) } })
}
