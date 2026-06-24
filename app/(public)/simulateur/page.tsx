'use client'
import { useState } from 'react'
import { ChevronRight, ChevronLeft, Calculator } from '@/components/shared/Icons'

const TYPES = [
  { value: 'VILLA', label: 'Villa', emoji: '🏠' },
  { value: 'APPARTEMENT', label: 'Appartement', emoji: '🏢' },
  { value: 'COMMERCIAL', label: 'Commercial', emoji: '🏪' },
  { value: 'INDUSTRIEL', label: 'Industriel', emoji: '🏭' },
]
const REGIONS = ['Casablanca-Settat','Rabat-Salé-Kénitra','Marrakech-Safi','Souss-Massa','Fès-Meknès','Tanger-Tétouan-Al Hoceïma','Oriental','Béni Mellal-Khénifra']
const FINITIONS = [
  { value: 'economique', label: 'Économique', desc: 'Matériaux standards, finitions simples' },
  { value: 'standard', label: 'Standard', desc: 'Bon rapport qualité/prix' },
  { value: 'haut-de-gamme', label: 'Haut de gamme', desc: 'Matériaux premium, finitions soignées' },
]

export default function SimulateurPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ typeConstruction: '', region: '', finition: 'standard', surface: 100, niveaux: 1 })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const simulate = async () => {
    setLoading(true)
    const res = await fetch('/api/simulateur', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, surface: Number(form.surface), niveaux: Number(form.niveaux) }),
    })
    const data = await res.json()
    setResult(data.data)
    setLoading(false)
    setStep(3)
  }

  const fmt = (n: number) => n.toLocaleString('fr-MA') + ' MAD'

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <Calculator size={40} className="text-orange-600 mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-gray-900">Simulateur de coût</h1>
        <p className="text-gray-500 text-sm mt-1">Estimez le budget de votre construction au Maroc</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[1,2,3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${step >= s ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
            {s < 3 && <div className={`w-12 h-1 rounded ${step > s ? 'bg-orange-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-5">Votre projet</h2>
            <div className="mb-5">
              <label className="text-sm text-gray-600 mb-2 block">Type de construction</label>
              <div className="grid grid-cols-2 gap-3">
                {TYPES.map(t => (
                  <button key={t.value} onClick={() => setForm(f => ({ ...f, typeConstruction: t.value }))}
                    className={`p-4 rounded-xl border-2 text-left transition ${form.typeConstruction === t.value ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                    <div className="text-2xl mb-1">{t.emoji}</div>
                    <div className="font-medium text-sm text-gray-800">{t.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-5">
              <label className="text-sm text-gray-600 mb-2 block">Région</label>
              <select value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400">
                <option value="">Choisir une région</option>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="mb-6">
              <label className="text-sm text-gray-600 mb-2 block">Niveau de finition</label>
              <div className="flex flex-col gap-2">
                {FINITIONS.map(f => (
                  <label key={f.value} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition ${form.finition === f.value ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                    <input type="radio" name="finition" value={f.value} checked={form.finition === f.value} onChange={() => setForm(prev => ({ ...prev, finition: f.value }))} className="mt-0.5 accent-orange-600" />
                    <div>
                      <div className="font-medium text-sm text-gray-800">{f.label}</div>
                      <div className="text-xs text-gray-500">{f.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <button onClick={() => setStep(2)} disabled={!form.typeConstruction || !form.region}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition">
              Suivant <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-5">Dimensions</h2>
            <div className="mb-6">
              <label className="text-sm text-gray-600 mb-2 block">Surface par niveau : <span className="font-bold text-orange-600">{form.surface} m²</span></label>
              <input type="range" min="20" max="1000" step="10" value={form.surface}
                onChange={e => setForm(f => ({ ...f, surface: Number(e.target.value) }))}
                className="w-full accent-orange-600 mb-2" />
              <input type="number" min="20" max="1000" value={form.surface}
                onChange={e => setForm(f => ({ ...f, surface: Number(e.target.value) }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-400" />
            </div>
            <div className="mb-8">
              <label className="text-sm text-gray-600 mb-3 block">Nombre de niveaux</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setForm(f => ({ ...f, niveaux: Math.max(1, f.niveaux - 1) }))}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold hover:border-orange-400 transition">−</button>
                <span className="text-2xl font-bold text-orange-600 w-8 text-center">{form.niveaux}</span>
                <button onClick={() => setForm(f => ({ ...f, niveaux: Math.min(4, f.niveaux + 1) }))}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold hover:border-orange-400 transition">+</button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Surface totale : {form.surface * form.niveaux} m²</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-600 font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:border-gray-300 transition">
                <ChevronLeft size={18} /> Précédent
              </button>
              <button onClick={simulate} disabled={loading}
                className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                {loading ? '...' : <>Calculer <ChevronRight size={18} /></>}
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Résultat */}
        {step === 3 && result && (
          <div>
            <h2 className="font-bold text-gray-900 mb-5">Votre estimation</h2>
            <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-xl p-5 text-white text-center mb-5">
              <div className="text-sm opacity-80 mb-1">Estimation pour {result.surfaceTotale} m²</div>
              <div className="text-3xl font-bold">{fmt(result.coutEstimeMin)} — {fmt(result.coutEstimeMax)}</div>
              <div className="text-sm opacity-80 mt-1">{form.typeConstruction.toLowerCase()} · {form.region} · finition {form.finition}</div>
            </div>
            <div className="mb-5">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Détail par poste</h3>
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                {result.detail?.map((d: any) => (
                  <div key={d.poste} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0">
                    <div className="flex-1 text-sm text-gray-700">{d.poste}</div>
                    <div className="text-xs text-gray-400 w-8 text-right">{d.pourcentage}%</div>
                    <div className="text-sm font-medium text-gray-900 w-32 text-right">{fmt(d.coutMin)}–{fmt(d.coutMax)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a href={`/annuaire?wilaya=${encodeURIComponent(form.region)}`}
                className="block text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition">
                Trouver des prestataires →
              </a>
              <button onClick={() => { setStep(1); setResult(null); setForm({ typeConstruction: '', region: '', finition: 'standard', surface: 100, niveaux: 1 }) }}
                className="border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:border-gray-300 transition">
                Nouvelle simulation
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="text-center text-xs text-gray-400 mt-4">Estimation indicative. Les prix varient selon les matériaux et conditions du terrain.</p>
    </div>
  )
}
