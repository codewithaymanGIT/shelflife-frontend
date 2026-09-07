import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = (book) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === book.id)
      if (existing) {
        return prev.map(i => i.id === book.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...book, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}