import { useState } from 'react'
import Button from './Button'
import FormField from './FormField'

const DeckForm = ({ onSubmit }) => {
  const [name, setName] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const deck = { id: Date.now(), name: name.trim() }
    onSubmit?.(deck)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
      <FormField label="Deck name">
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </FormField>

      <div>
        <Button type="submit">Create Deck</Button>
      </div>
    </form>
  )
}

export default DeckForm
