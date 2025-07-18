import React, { useState } from 'react'
import {auth} from './auth/auth'

export function UserProfile() {
  const { user, signIn, signOut } = auth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  if (!user) {
    // No está logueado: muestro formulario para loguearse
    const handleLogin = async (e) => {
      e.preventDefault()
      const { error } = await signIn({ email, password })
      if (error) setError(error.message)
    }

    return (
      <div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar Sesión</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    )
  }

  // Usuario logueado: muestro perfil y botón logout
  return (
    <div>
      <h2>Hola, {user.email}</h2>
      <button onClick={() => signOut()}>Cerrar sesión</button>
    </div>
  )
}
