import React, { useState } from 'react'
import Button from './Button'
import FormField from './FormField'

function DeckForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const deck = { id: Date.now(), name: name.trim(), description: description.trim() }
    if (onSubmit) onSubmit(deck)
    setName('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
      <FormField label="Deck name">
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </FormField>

      <FormField label="Description">
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
      </FormField>

      <div>
        <Button type="submit">Create Deck</Button>
      </div>
    </form>
  )
}

export default DeckForm
