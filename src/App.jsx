import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom'
import ListCardsPage from './pages/CreateCardPage'
import ListDecksPage from './pages/CreateDeckPage'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <NavLink to="/" className="nav-link" end>
            <h1 className="app-title">Home</h1>
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