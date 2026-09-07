import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'

function BookDetail({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [book, setBook] = useState(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:8080/api/books/${id}`)
      .then(res => res.json())
      .then(setBook)
  }, [id])

  const handleAddToCart = () => {
    addToCart(book)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!book) return (
    <div className="app-shell">
      <Navbar user={user} />
      <p className="loading-state">Loading...</p>
    </div>
  )

  return (
    <div className="app-shell">
      <Navbar user={user} />
      <div className="detail-layout">
        <button className="back-link" onClick={() => navigate('/catalogue')}>&larr; Back to catalogue</button>
        <div className="detail-content">
          <img src={book.coverUrl} alt={book.title} className="detail-cover" />
          <div className="detail-info">
            <h1>{book.title}</h1>
            <p className="detail-author">{book.author}</p>
            <p className="detail-meta">
              <span className="mono">ISBN {book.isbn}</span><br />
              Edition: {book.edition}<br />
              Condition: <strong>{book.conditionGrade}</strong>
            </p>
            <p className="detail-desc">{book.description}</p>
            <div className="detail-purchase">
              <span className="detail-price">₹{book.price}</span>
              <span className="stock-tag">{book.stock} in stock</span>
            </div>
            <button className="btn-primary-cool" onClick={handleAddToCart}>
              {added ? 'Added ✓' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetail