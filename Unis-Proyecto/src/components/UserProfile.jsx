import { useEffect, useState } from 'react'
import { auth } from './auth/auth'
import { getPerfilByUserId } from '../bd/bd.js'
import './UserProfile.css'

export function UserProfile() {
  const { user, signIn, signOut } = auth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [perfil, setPerfil] = useState(null)

  useEffect(() => {
    if (user) {
      async function fetchPerfil() {
        const data = await getPerfilByUserId(user.id)
        console.log('Perfil obtenido:', data)
        setPerfil(data)
      }
      fetchPerfil()
    }
  }, [user])

  if (!user) {
    const handleLogin = async (e) => {
      e.preventDefault()
      const { error } = await signIn({ email, password })
      if (error) setError(error.message)
    }

    return (
      <div className="login-container">
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
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    )
  }

  if (!perfil) return <p className="loading">Cargando perfil...</p>

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header"></div>
        <div className="profile-info">
        <img src={perfil.foto || "/default-avatar.png"} alt="Foto de perfil" className="profile-avatar" />
  <h2 className="profile-name">{perfil.nombre} {perfil.apellido}</h2>
          <p className="profile-role">Estudiante</p>
        </div>
        <div className="profile-data">
          <div className="profile-section">
            <h3>Información de Contacto</h3>
            <p><strong>Teléfono:</strong> {perfil.telefono || 'Sin registrar'}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>¿Es Admin?:</strong> {perfil.esAdmin ? 'Sí' : 'No'}</p>
          </div>
          <div className="profile-section">
            <h3>Información Académica</h3>
            <p><strong>Secundario:</strong> {perfil.secundario}</p>
          </div>
        </div>
        <div className="profile-buttons">
          <button>Editar Perfil</button>
          <button className="outline" onClick={() => signOut()}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  )
}
