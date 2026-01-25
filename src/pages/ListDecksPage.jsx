import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

const ListDecksPage = () => {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    
    const fetchDecks = async () => {
      setError(null)
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/api/decks`)
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: res.statusText }))
          throw new Error(err.error || 'Failed to fetch decks')
        }
        const data = await res.json()
        if (mounted) setDecks(data)
      } catch (e) {
        if (mounted) setError(e.message || 'Network error')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchDecks()
    return () => { mounted = false }
  }, [])

  if (loading) return <p>Loading...</p>
  
  return (
    <div>
      <h2>Groups</h2>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {decks.length === 0 ? (
        <p>No decks available.</p>
      ) : (
        <ul>
          {decks.map((d) => (
            <li key={d.id}>
              <strong>{d.name}</strong>
              {d.cardCount !== undefined && ` (${d.cardCount} cards)`}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListDecksPage
