import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import ListCardsPage from './pages/CreateCardPage'
import ListDecksPage from './pages/CreateDeckPage'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState('home')

  return (
    <div className="App">
      <h1 style={{ margin: 0 }}>Hufi Flashcards</h1>
      
      <header style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
        <nav>
          <Button onClick={() => setPage('home')}>Home</Button>
          <Button onClick={() => setPage('add')}>Add Card</Button>
          <Button onClick={() => setPage('decks')}>Decks</Button>
        </nav>
      </header>

      <main style={{ marginTop: '1rem' }}>
        {page === 'add' && <ListCardsPage />}
        {page === 'decks' && <ListDecksPage />}
      </main>
    </div>
  )
}

export default App
