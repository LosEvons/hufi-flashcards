import { useState } from 'react'
import DeckForm from '../components/DeckForm'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function CreateDeckPage() {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCreate = async (deck) => {
    setError(null)
    setLoading(true)
    
    try {
      const res = await fetch(`${API_BASE}/api/decks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: deck.name }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        throw new Error(err.error || err.message || 'Failed to create deck')
      }

      const created = await res.json()
      setDecks((prev) => [created, ...prev])
      alert('Deck created')
    } catch (e) {
      const message = e.message || 'Network error'
      setError(message)
      alert(`Error: ${message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Decks</h2>
      {error && <div className="error">{error}</div>}
      {loading && <div>Saving...</div>}
      <DeckForm onSubmit={handleCreate} />
    </div>
  )
}
