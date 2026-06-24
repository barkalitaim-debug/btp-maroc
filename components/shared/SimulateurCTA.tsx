import Link from 'next/link'
import { Calculator } from '@/components/shared/Icons'

export default function SimulateurCTA() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-orange-700 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <Calculator size={48} className="mx-auto mb-4 opacity-90" />
        <h2 className="text-3xl font-bold mb-3">Estimez le coût de votre construction</h2>
        <p className="text-orange-100 mb-8 text-lg">
          Notre simulateur calcule une estimation selon votre région, surface et type de projet
        </p>
        <Link href="/simulateur" className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-xl hover:bg-orange-50 transition inline-block">
          Lancer le simulateur
        </Link>
      </div>
    </section>
  )
}
