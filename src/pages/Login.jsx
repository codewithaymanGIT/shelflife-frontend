import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Login({ user, setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!data.success) {
        setError(data.message)
        return
      }

      setUser({ name: data.name, email: data.email })
      navigate('/')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="app-shell">
      <Navbar user={user} />
      <div className="auth-page">
        <div className="auth-wrapper-cool">
          <h1>Log in</h1>
          <p className="auth-subtitle">Welcome back to ShelfLife.</p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-full-cool">Log in</button>
          </form>
          <p className="auth-footer">New here? <Link to="/register">Create an account</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login