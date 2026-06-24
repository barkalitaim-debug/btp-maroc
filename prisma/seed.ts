import { PrismaClient, TypeConstruction } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding...')

  const categories = [
    { nom: 'Gros œuvre', nomAr: 'أعمال البناء', slug: 'gros-oeuvre', icone: 'building', ordre: 1 },
    { nom: 'Maçonnerie', nomAr: 'البناء', slug: 'maconnerie', icone: 'wall', ordre: 2 },
    { nom: 'Menuiserie bois', nomAr: 'النجارة', slug: 'menuiserie-bois', icone: 'door', ordre: 3 },
    { nom: 'Menuiserie alu/PVC', nomAr: 'نجارة الألمنيوم', slug: 'menuiserie-alu', icone: 'window', ordre: 4 },
    { nom: 'Plomberie', nomAr: 'السباكة', slug: 'plomberie', icone: 'droplet', ordre: 5 },
    { nom: 'Électricité', nomAr: 'الكهرباء', slug: 'electricite', icone: 'bolt', ordre: 6 },
    { nom: 'Carrelage & revêtement', nomAr: 'البلاط', slug: 'carrelage', icone: 'grid', ordre: 7 },
    { nom: 'Peinture', nomAr: 'الطلاء', slug: 'peinture', icone: 'paint', ordre: 8 },
    { nom: 'Salle de bain', nomAr: 'الحمام', slug: 'salle-de-bain', icone: 'bath', ordre: 9 },
    { nom: 'Cuisine équipée', nomAr: 'المطبخ المجهز', slug: 'cuisine', icone: 'chef-hat', ordre: 10 },
    { nom: 'Climatisation', nomAr: 'التكيiff', slug: 'climatisation', icone: 'wind', ordre: 11 },
    { nom: 'Architecture', nomAr: 'الهندسة المعمارية', slug: 'architecture', icone: 'ruler', ordre: 12 },
    { nom: 'Décoration intérieure', nomAr: 'الديكور', slug: 'decoration', icone: 'palette', ordre: 14 },
    { nom: 'Toiture & étanchéité', nomAr: 'السقف', slug: 'toiture', icone: 'home', ordre: 16 },
  ]
  for (const cat of categories) {
    await prisma.categorie.upsert({ where: { slug: cat.slug }, update: {}, create: cat })
  }

  const villes = [
    { nom: 'Casablanca', nomAr: 'الدار البيضاء', wilaya: 'Casablanca-Settat', slug: 'casablanca' },
    { nom: 'Rabat', nomAr: 'الرباط', wilaya: 'Rabat-Salé-Kénitra', slug: 'rabat' },
    { nom: 'Marrakech', nomAr: 'مراكش', wilaya: 'Marrakech-Safi', slug: 'marrakech' },
    { nom: 'Fès', nomAr: 'فاس', wilaya: 'Fès-Meknès', slug: 'fes' },
    { nom: 'Tanger', nomAr: 'طنجة', wilaya: 'Tanger-Tétouan-Al Hoceïma', slug: 'tanger' },
    { nom: 'Agadir', nomAr: 'أكادير', wilaya: 'Souss-Massa', slug: 'agadir' },
    { nom: 'Meknès', nomAr: 'مكناس', wilaya: 'Fès-Meknès', slug: 'meknes' },
    { nom: 'Oujda', nomAr: 'وجدة', wilaya: 'Oriental', slug: 'oujda' },
    { nom: 'Kénitra', nomAr: 'القنيطرة', wilaya: 'Rabat-Salé-Kénitra', slug: 'kenitra' },
    { nom: 'Tétouan', nomAr: 'تطوان', wilaya: 'Tanger-Tétouan-Al Hoceïma', slug: 'tetouan' },
    { nom: 'El Jadida', nomAr: 'الجديدة', wilaya: 'Casablanca-Settat', slug: 'el-jadida' },
    { nom: 'Béni Mellal', nomAr: 'بني ملال', wilaya: 'Béni Mellal-Khénifra', slug: 'beni-mellal' },
    { nom: 'Settat', nomAr: 'سطات', wilaya: 'Casablanca-Settat', slug: 'settat' },
    { nom: 'Salé', nomAr: 'سلا', wilaya: 'Rabat-Salé-Kénitra', slug: 'sale' },
    { nom: 'Témara', nomAr: 'تمارة', wilaya: 'Rabat-Salé-Kénitra', slug: 'temara' },
  ]
  for (const ville of villes) {
    await prisma.ville.upsert({ where: { slug: ville.slug }, update: {}, create: ville })
  }

  const tarifs = [
    { region: 'Casablanca-Settat', typeConst: TypeConstruction.VILLA, finition: 'economique', prixMinM2: 3800, prixMaxM2: 4500 },
    { region: 'Casablanca-Settat', typeConst: TypeConstruction.VILLA, finition: 'standard', prixMinM2: 5000, prixMaxM2: 7000 },
    { region: 'Casablanca-Settat', typeConst: TypeConstruction.VILLA, finition: 'haut-de-gamme', prixMinM2: 7500, prixMaxM2: 12000 },
    { region: 'Casablanca-Settat', typeConst: TypeConstruction.APPARTEMENT, finition: 'standard', prixMinM2: 4500, prixMaxM2: 6500 },
    { region: 'Rabat-Salé-Kénitra', typeConst: TypeConstruction.VILLA, finition: 'standard', prixMinM2: 4800, prixMaxM2: 6800 },
    { region: 'Rabat-Salé-Kénitra', typeConst: TypeConstruction.APPARTEMENT, finition: 'standard', prixMinM2: 4200, prixMaxM2: 6000 },
    { region: 'Marrakech-Safi', typeConst: TypeConstruction.VILLA, finition: 'standard', prixMinM2: 4500, prixMaxM2: 6500 },
    { region: 'Marrakech-Safi', typeConst: TypeConstruction.VILLA, finition: 'haut-de-gamme', prixMinM2: 7000, prixMaxM2: 13000 },
    { region: 'Souss-Massa', typeConst: TypeConstruction.VILLA, finition: 'standard', prixMinM2: 4200, prixMaxM2: 6000 },
    { region: 'Fès-Meknès', typeConst: TypeConstruction.VILLA, finition: 'standard', prixMinM2: 3800, prixMaxM2: 5500 },
    { region: 'Tanger-Tétouan-Al Hoceïma', typeConst: TypeConstruction.VILLA, finition: 'standard', prixMinM2: 4500, prixMaxM2: 6500 },
    { region: 'Oriental', typeConst: TypeConstruction.VILLA, finition: 'standard', prixMinM2: 3200, prixMaxM2: 4800 },
  ]
  for (const tarif of tarifs) {
    await prisma.tarifRegion.upsert({
      where: { region_typeConst_finition: { region: tarif.region, typeConst: tarif.typeConst, finition: tarif.finition } },
      update: {},
      create: tarif,
    })
  }

  console.log('Seed terminé !')
}

main().catch(console.error).finally(() => prisma.$disconnect())
