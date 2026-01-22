import React, { useEffect, useState } from 'react'

function ListCardsPage({ deckId }) {
  const [deckName, setDeckName] = useState('')
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // TODO: Fetch deck name and cards for `deckId` from the database here.
    // Example (later):
    // setLoading(true)
    // fetch(`/api/decks/${deckId}/cards`)
    //   .then(r => r.json())
    //   .then(data => {
    //     setDeckName(data.deckName)
    //     setCards(data.cards)
    //   })
    //   .finally(() => setLoading(false))
  }, [deckId])

  return (
    <div>
      <h2>{deckName || 'Deck'}</h2>
      <p>Cards in this deck will be listed below once fetched from the backend.</p>

      {loading ? (
        <p>Loading...</p>
      ) : cards.length === 0 ? (
        <p>No cards yet.</p>
      ) : (
        <ul>
          {cards.map((c) => (
            <li key={c.id}>
              <strong>{c.finnish}</strong>
              {c.hungarian ? ` — ${c.hungarian}` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListCardsPage
