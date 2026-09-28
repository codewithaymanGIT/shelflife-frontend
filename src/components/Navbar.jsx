import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar({ user, onLogout }) {
  const { count } = useCart()

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Shelf<span>Life</span></Link>
        <span className="student-credit">Mohammed Ayman Siddiqui · CS-H · Roll 13 · PRN 12414007</span>
      </div>
      <div className="nav-links">
        <Link to="/catalogue">Browse</Link>
        <Link to="/cart" className="cart-link">
          Cart{count > 0 && <span className="cart-badge">{count}</span>}
        </Link>
        {user ? (
          <>
            <span className="nav-user">{user.name}</span>
            <button onClick={onLogout} className="btn-text">Log out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-text">Log in</Link>
            <Link to="/register" className="btn-primary-small">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar