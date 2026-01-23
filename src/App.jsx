import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom'
import ListCardsPage from './pages/CreateCardPage'
import ListDecksPage from './pages/CreateDeckPage'

function Home() {
  return (
    <div className="home">
      <p>Welcome to Hufi Flashcards</p>
      <Link to="/decks" className="primary-button">View Decks</Link>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <NavLink to="/" className="nav-link" end>
            <h1 className="app-title">Hufi Flashcards</h1>
          </NavLink>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<ListCardsPage />} />
            <Route path="/decks" element={<ListDecksPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App