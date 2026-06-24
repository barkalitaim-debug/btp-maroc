'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Building2 } from '@/components/shared/Icons'

export default function InscriptionPage() {
  const [role, setRole] = useState<'CLIENT' | 'PRESTATAIRE'>('CLIENT')
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue lors de l'inscription")
        setLoading(false)
        return
      }

      // Log in automatically after registration
      const loginRes = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      })

      if (loginRes?.error) {
        router.push('/connexion')
      } else {
        if (role === 'PRESTATAIRE') {
          router.push('/inscription/prestataire')
        } else {
          router.push('/dashboard')
        }
      }
    } catch {
      setError("Une erreur est survenue lors de l'inscription")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-orange-600 mb-2">
            <Building2 size={32} />
            BTP Maroc
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Créer un compte</h2>
          <p className="text-sm text-gray-500 mt-1">Rejoignez-nous en quelques instants</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center">
            {error}
          </div>
        )}

        {/* Choix du rôle */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole('CLIENT')}
            className={`p-4 rounded-xl border-2 text-left transition ${
              role === 'CLIENT' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
            }`}
          >
            <div className="text-2xl mb-1">👤</div>
            <div className="font-semibold text-sm text-gray-800">Particulier</div>
            <div className="text-xs text-gray-500 mt-0.5">Je cherche un prestataire</div>
          </button>
          <button
            type="button"
            onClick={() => setRole('PRESTATAIRE')}
            className={`p-4 rounded-xl border-2 text-left transition ${
              role === 'PRESTATAIRE' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
            }`}
          >
            <div className="text-2xl mb-1">🏗️</div>
            <div className="font-semibold text-sm text-gray-800">Professionnel</div>
            <div className="text-xs text-gray-500 mt-0.5">Je propose mes services BTP</div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Prénom</label>
              <input
                type="text"
                required
                placeholder="Ex: Omar"
                value={form.prenom}
                onChange={e => setForm(p => ({ ...p, prenom: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Nom</label>
              <input
                type="text"
                required
                placeholder="Ex: Alaoui"
                value={form.nom}
                onChange={e => setForm(p => ({ ...p, nom: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Adresse email</label>
            <input
              type="email"
              required
              placeholder="votre@email.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Mot de passe</label>
            <input
              type="password"
              required
              placeholder="Min. 6 caractères"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold py-3 rounded-xl transition text-sm shadow-sm"
          >
            {loading ? 'Création du compte...' : 'S\'inscrire'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà un compte ?{' '}
          <Link href="/connexion" className="text-orange-600 font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
