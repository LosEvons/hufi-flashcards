import FlashcardForm from '../components/FlashcardForm'

const CreateCardPage = () => {
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

export default CreateCardPage
