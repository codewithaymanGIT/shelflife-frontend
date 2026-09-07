import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()

      if (!data.success) {
        setError(data.message)
        return
      }

      setSuccess(true)
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="app-shell">
      <Navbar user={null} />
      <div className="auth-page">
        <div className="auth-wrapper-cool">
          <h1>Create an account</h1>
          <p className="auth-subtitle">Join to track your book hunt.</p>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Account created! Redirecting to login...</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            <button type="submit" className="btn-full-cool">Sign up</button>
          </form>
          <p className="auth-footer">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register