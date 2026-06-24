import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const Schema = z.object({
  surface: z.number().min(20).max(10000),
  typeConstruction: z.enum(['VILLA', 'APPARTEMENT', 'COMMERCIAL', 'INDUSTRIEL', 'AUTRE']),
  region: z.string().min(2),
  niveaux: z.number().int().min(1).max(10).default(1),
  finition: z.enum(['economique', 'standard', 'haut-de-gamme']).default('standard'),
})

const POSTES = {
  'Gros œuvre & fondations': 0.38,
  'Menuiserie (bois + alu)': 0.14,
  'Plomberie & sanitaire': 0.12,
  'Électricité': 0.10,
  'Carrelage & revêtements': 0.10,
  'Peinture & enduits': 0.07,
  'Étanchéité & isolation': 0.05,
  'Divers & imprévus': 0.04,
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parse = Schema.safeParse(body)
  if (!parse.success) return NextResponse.json({ error: 'Données invalides' }, { status: 400 })

  const { surface, typeConstruction, region, niveaux, finition } = parse.data
  const facteur = niveaux === 1 ? 1 : 1 + (niveaux - 1) * 0.08
  const surfaceTotale = surface * niveaux

  let tarif = await prisma.tarifRegion.findUnique({
    where: { region_typeConst_finition: { region, typeConst: typeConstruction, finition } },
  })
  if (!tarif) tarif = await prisma.tarifRegion.findFirst({ where: { typeConst: typeConstruction, finition } })
  if (!tarif) return NextResponse.json({ error: 'Région non trouvée' }, { status: 404 })

  const coutMin = Math.round(tarif.prixMinM2 * surfaceTotale * facteur)
  const coutMax = Math.round(tarif.prixMaxM2 * surfaceTotale * facteur)

  const detail = Object.entries(POSTES).map(([poste, pct]) => ({
    poste, pourcentage: Math.round(pct * 100),
    coutMin: Math.round(coutMin * pct),
    coutMax: Math.round(coutMax * pct),
  }))

  await prisma.simulation.create({
    data: { surface, typeConstruction, region, niveaux, finition, coutEstimeMin: coutMin, coutEstimeMax: coutMax, detail },
  })

  return NextResponse.json({ data: { coutEstimeMin: coutMin, coutEstimeMax: coutMax, detail, devise: 'MAD' } })
}
