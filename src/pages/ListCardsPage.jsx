import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function ListCardsPage({ deckId }) {
  const [deckName, setDeckName] = useState('')
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!deckId) return
    
    setLoading(true)
    fetch(`${API_BASE}/api/decks/${deckId}/cards`)
      .then(r => r.json())
      .then(data => {
        setDeckName(data.deckName)
        setCards(data.cards)
      })
      .catch(err => console.error('Failed to fetch cards:', err))
      .finally(() => setLoading(false))
  }, [deckId])

  if (loading) return <p>Loading...</p>
  
  return (
    <div>
      <h2>{deckName || 'Deck'}</h2>
      {cards.length === 0 ? (
        <p>No cards yet.</p>
      ) : (
        <ul>
          {cards.map((c) => (
            <li key={c.id}>
              <strong>{c.finnish}</strong>
              {c.hungarian && ` — ${c.hungarian}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
