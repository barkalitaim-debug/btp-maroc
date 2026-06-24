'use client'
import { useState } from 'react'

export default function DevisForm({ prestataireId, raisonSociale }: { prestataireId: string; raisonSociale: string }) {
  const [form, setForm] = useState({ prenom: '', email: '', telephone: '', message: '', budget: '' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  const handleSubmit = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, prestataireId }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  if (status === 'success') return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
      <div className="text-3xl mb-2">✅</div>
      <h3 className="font-bold text-green-800 mb-1">Demande envoyée !</h3>
      <p className="text-green-700 text-sm">Le prestataire vous contactera bientôt.</p>
    </div>
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h3 className="font-bold text-gray-900 mb-4">Demander un devis à {raisonSociale}</h3>
      <div className="flex flex-col gap-3">
        {[
          { key: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Votre prénom' },
          { key: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
          { key: 'telephone', label: 'Téléphone', type: 'tel', placeholder: '06 XX XX XX XX' },
          { key: 'budget', label: 'Budget estimé (MAD)', type: 'text', placeholder: 'Ex: 50 000' },
        ].map(f => (
          <div key={f.key}>
            <label className="text-xs font-medium text-gray-600 mb-1 block">{f.label}</label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={(form as any)[f.key]}
              onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
            />
          </div>
        ))}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Description du projet</label>
          <textarea
            rows={4}
            placeholder="Décrivez votre projet..."
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold py-3 rounded-xl transition text-sm"
        >
          {status === 'loading' ? 'Envoi...' : 'Envoyer la demande'}
        </button>
        {status === 'error' && <p className="text-red-500 text-xs text-center">Erreur lors de l'envoi. Réessayez.</p>}
      </div>
    </div>
  )
}
