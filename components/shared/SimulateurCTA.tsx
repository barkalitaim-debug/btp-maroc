import Link from 'next/link'
import Image from 'next/image'
import { Calculator, ArrowRight } from 'lucide-react'

export default function SimulateurCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative bg-gradient-to-br from-orange-600 to-orange-800 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=30"
              alt="bg" fill className="object-cover" />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-white">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                <Calculator size={32} className="text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                Estimez le coût de votre construction au Maroc
              </h2>
              <p className="text-orange-100 text-lg mb-8 leading-relaxed">
                Notre simulateur calcule une estimation précise selon votre région, surface, type de projet et niveau de finition.
              </p>
              <Link href="/simulateur"
                className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-all hover:scale-105 shadow-xl">
                Lancer le simulateur <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hidden md:block w-64 h-64 relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 flex flex-col justify-between">
                <div className="text-white/60 text-sm">Estimation pour</div>
                <div>
                  <div className="text-white font-bold text-lg">Villa 200m² · Standard</div>
                  <div className="text-white/60 text-sm mt-1">Casablanca</div>
                </div>
                <div>
                  <div className="text-orange-200 text-sm mb-1">Coût estimé</div>
                  <div className="text-white font-black text-3xl">1M – 1.4M</div>
                  <div className="text-orange-200 text-sm">MAD</div>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Gros œuvre', pct: 38 },
                    { label: 'Menuiserie', pct: 14 },
                    { label: 'Électricité', pct: 12 },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs text-white/70 mb-0.5">
                        <span>{item.label}</span><span>{item.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-300 rounded-full" style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
