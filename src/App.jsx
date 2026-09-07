import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import BookDetail from './pages/BookDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/catalogue" element={<Catalogue user={user} />} />
          <Route path="/book/:id" element={<BookDetail user={user} />} />
          <Route path="/cart" element={<Cart user={user} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App