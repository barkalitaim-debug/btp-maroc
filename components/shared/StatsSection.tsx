interface Props { nbPrestataires: number; nbClients: number; nbAvis: number; nbVilles: number }
export default function StatsSection({ nbPrestataires, nbClients, nbAvis, nbVilles }: Props) {
  const stats = [
    { value: `${nbPrestataires}+`, label: 'Prestataires actifs' },
    { value: `${nbClients}+`, label: 'Clients satisfaits' },
    { value: `${nbAvis}+`, label: 'Avis vérifiés' },
    { value: `${nbVilles}`, label: 'Villes couvertes' },
  ]
  return (
    <div className="bg-gray-50 border-y border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-bold text-orange-600">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
