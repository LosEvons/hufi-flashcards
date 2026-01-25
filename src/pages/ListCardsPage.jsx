import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

const ListCardsPage = ({ deckId }) => {
  const [deckName, setDeckName] = useState('')
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // TODO: Fetch deck name and cards for `deckId` from the database
    // Example:
    // setLoading(true)
    // fetch(`${API_BASE}/api/decks/${deckId}/cards`)
    //   .then(r => r.json())
    //   .then(data => {
    //     setDeckName(data.deckName)
    //     setCards(data.cards)
    //   })
    //   .finally(() => setLoading(false))
  }, [deckId])

  if (loading) return <p>Loading...</p>
  
  if (cards.length === 0) return (
    <div>
      <h2>{deckName || 'Deck'}</h2>
      <p>No cards yet.</p>
    </div>
  )

  return (
    <div>
      <h2>{deckName || 'Deck'}</h2>
      <ul>
        {cards.map((c) => (
          <li key={c.id}>
            <strong>{c.finnish}</strong>
            {c.hungarian && ` — ${c.hungarian}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListCardsPage
