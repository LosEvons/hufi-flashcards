import React, { useState } from 'react'
import DeckForm from '../components/DeckForm'

function CreateDeckPage() {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

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
        const msg = err && (err.error || err.message) ? err.error || err.message : 'Failed to create deck'
        setError(msg)
        alert(`Error: ${msg}`)
        return
      }

      const created = await res.json()
      setDecks((prev) => [created, ...prev])
      alert('Deck created')
    } catch (e) {
      setError(e.message || 'Network error')
      alert(`Network error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Decks</h2>
      {error && <div style={{ color: 'crimson', marginBottom: '0.5rem' }}>{error}</div>}
      {loading && <div style={{ marginBottom: '0.5rem' }}>Saving...</div>}
      <DeckForm onSubmit={handleCreate} />
    </div>
  )
}

export default CreateDeckPage
