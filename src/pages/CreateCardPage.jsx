import React from 'react'
import FlashcardForm from '../components/FlashcardForm'

function CreateCardPage() {
  const handleSubmit = (data) => {
    // Placeholder: replace with real persistence later
    console.log('New flashcard:', data)
    alert('Flashcard saved (check console)')
  }

  return (
    <div>
      <h2>Add a new flashcard</h2>
      <FlashcardForm onSubmit={handleSubmit} />
    </div>
  )
}

export default CreateCardPage
