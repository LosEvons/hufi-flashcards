import FlashcardForm from '../components/FlashcardForm'

export default function CreateCardPage() {
  const handleSubmit = (data) => {
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
