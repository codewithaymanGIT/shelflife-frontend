import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'

function Cart({ user }) {
  const { items, removeFromCart, total } = useCart()

  return (
    <div className="app-shell">
      <Navbar user={user} />
      <div className="cart-layout">
        <h1>Your cart</h1>

        {items.length === 0 ? (
          <div className="empty-state">
            <p>Your cart is empty.</p>
            <Link to="/catalogue" className="btn-primary-cool">Browse the catalogue</Link>
          </div>
        ) : (
          <>
            {items.map(item => (
              <div key={item.id} className="cart-row">
                <img src={item.coverUrl} alt={item.title} className="cart-cover" />
                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p className="listing-author">{item.author}</p>
                  <p className="cart-qty">Qty: {item.qty}</p>
                </div>
                <div className="cart-price">
                  <span>₹{(item.price * item.qty).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)} className="remove-link">Remove</button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart