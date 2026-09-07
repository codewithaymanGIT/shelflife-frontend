import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home({ user }) {
  return (
    <div className="app-shell">
      <Navbar user={user} />
      <section className="hero-cool">
        <h1>Find the copy you've been hunting for.</h1>
        <p>Secondhand and rare technical books, catalogued by condition and edition — not just "used."</p>
        <Link to="/catalogue" className="btn-primary-cool">Search the catalogue</Link>
      </section>
    </div>
  )
}

export default Home