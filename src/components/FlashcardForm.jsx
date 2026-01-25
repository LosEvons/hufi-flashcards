import { useState } from 'react'
import FormField from './FormField'
import Button from './Button'

const FlashcardForm = ({ onSubmit }) => {
  const [finnish, setFinnish] = useState('')
  const [hungarian, setHungarian] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { finnish: finnish.trim(), hungarian: hungarian.trim() }
    onSubmit?.(data)
    setFinnish('')
    setHungarian('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
      <FormField label="Finnish side">
        <textarea value={finnish} onChange={(e) => setFinnish(e.target.value)} rows={4} required />
      </FormField>

      <FormField label="Hungarian side">
        <textarea value={hungarian} onChange={(e) => setHungarian(e.target.value)} rows={4} required />
      </FormField>

      <div>
        <Button type="submit">Save Flashcard</Button>
      </div>
    </form>
  )
}

export default FlashcardForm
