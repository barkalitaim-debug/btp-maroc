'use client'
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html><body>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Une erreur est survenue</h2>
        <p>{error.message}</p>
        <button onClick={reset}>Réessayer</button>
      </div>
    </body></html>
  )
}
