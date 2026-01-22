import React, { useEffect, useState } from 'react'

function ListDecksPage() {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // TODO: Fetch decks/groups from the database here and call setDecks(result)
    // Example (later):
    // setLoading(true)
    // fetch('/api/decks')
    //   .then(r => r.json())
    //   .then(data => setDecks(data))
    //   .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2>Groups</h2>
      {loading ? (
        <p>Loading...</p>
      ) : decks.length === 0 ? (
        <p>No groups available.</p>
      ) : (
        <ul>
          {decks.map((d) => (
            <li key={d.id}>
              <strong>{d.name}</strong>
              {d.description ? ` — ${d.description}` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListDecksPage
