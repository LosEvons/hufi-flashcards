import React, { useState } from 'react'
import DeckForm from '../components/DeckForm'

function CreateDeckPage() {
  const [decks, setDecks] = useState([])

  const handleCreate = (deck) => {
    const next = [...decks, deck]
    setDecks(next)
    alert('Deck created')
  }

  return (
    <div>
      <h2>Decks</h2>
      <DeckForm onSubmit={handleCreate} />
    </div>
  )
}

export default CreateDeckPage
