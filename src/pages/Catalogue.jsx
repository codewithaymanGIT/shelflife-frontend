import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Catalogue({ user }) {
  const [books, setBooks] = useState([])
  const [genreFilter, setGenreFilter] = useState('All')
  const [sortBy, setSortBy] = useState('title')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const genres = ['All', ...new Set(books.map(b => b.genre))]

  const filteredBooks = books
    .filter(b => genreFilter === 'All' || b.genre === genreFilter)
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      return 0
    })

  return (
    <div className="app-shell">
      <Navbar user={user} />
      <div className="catalogue-layout">
        <aside className="filter-sidebar">
          <h3>Genre</h3>
          <ul className="filter-list">
            {genres.map(g => (
              <li key={g}>
                <button
                  className={genreFilter === g ? 'filter-active' : ''}
                  onClick={() => setGenreFilter(g)}
                >
                  {g}
                </button>
              </li>
            ))}
          </ul>

          <h3>Sort by</h3>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="title">Title</option>
            <option value="price">Price</option>
          </select>
        </aside>

        <main className="listings">
          {loading ? (
            <p className="loading-state">Loading catalogue...</p>
          ) : filteredBooks.length === 0 ? (
            <p className="empty-state">No books match this filter.</p>
          ) : (
            filteredBooks.map(book => (
              <Link to={`/book/${book.id}`} key={book.id} className="listing-row">
                <img src={book.coverUrl} alt={book.title} className="listing-cover" />
                <div className="listing-info">
                  <h3>{book.title}</h3>
                  <p className="listing-author">{book.author}</p>
                  <p className="listing-meta">
                    <span className="mono">{book.isbn}</span> · {book.edition} · Condition: {book.conditionGrade}
                  </p>
                  <p className="listing-desc">{book.description}</p>
                </div>
                <div className="listing-price">
                  <span>₹{book.price}</span>
                  <span className="stock-tag">{book.stock} in stock</span>
                </div>
              </Link>
            ))
          )}
        </main>
      </div>
    </div>
  )
}

export default Catalogue