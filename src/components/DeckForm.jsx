import { useState } from 'react'
import FormField from './FormField'

export default function DeckForm({ onSubmit }) {
  const [name, setName] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({ name: name.trim() })
    }
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <FormField label="Deck name">
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </FormField>

      <button type="submit">Create Deck</button>
    </form>
  )
}
