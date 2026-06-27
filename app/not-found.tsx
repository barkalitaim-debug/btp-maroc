import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🏗️</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Page introuvable</h1>
        <p className="text-gray-500 mb-6">Cette page n existe pas.</p>
        <Link href="/" className="bg-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-700 transition">
          Retour à l accueil
        </Link>
      </div>
    </div>
  )
}
