import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <p>Welcome to Hufi Flashcards</p>
      <Link to="/decks" className="primary-button">View Decks</Link>
    </div>
  )
}
