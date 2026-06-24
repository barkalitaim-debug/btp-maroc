import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const categories = await prisma.categorie.findMany({
    where: { actif: true },
    orderBy: { ordre: 'asc' },
  })
  return NextResponse.json({ data: categories })
}
