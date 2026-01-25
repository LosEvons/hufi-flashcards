import { useState } from 'react'
import FormField from './FormField'

export default function FlashcardForm({ onSubmit }) {
  const [finnish, setFinnish] = useState('')
  const [hungarian, setHungarian] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({ finnish: finnish.trim(), hungarian: hungarian.trim() })
    setFinnish('')
    setHungarian('')
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <FormField label="Finnish side">
        <textarea value={finnish} onChange={(e) => setFinnish(e.target.value)} rows={4} required />
      </FormField>

      <FormField label="Hungarian side">
        <textarea value={hungarian} onChange={(e) => setHungarian(e.target.value)} rows={4} required />
      </FormField>

      <button type="submit">Save Flashcard</button>
    </form>
  )
}
