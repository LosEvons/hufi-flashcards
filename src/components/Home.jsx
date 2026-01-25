import { Link } from 'react-router-dom'

const Home = () => (
  <div className="home">
    <p>Welcome to Hufi Flashcards</p>
    <Link to="/decks" className="primary-button">View Decks</Link>
  </div>
)

export default Home
