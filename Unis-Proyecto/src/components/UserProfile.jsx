import { useEffect, useState } from 'react'
import { auth } from './auth/auth'
import { getPerfilByUserId } from '../bd/bd.js'
import './UserProfile.css'
import {Link} from 'react-router-dom'

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
          <div className="options-row">
            <label>
              <input type="checkbox" /> Recordarme
            </label>
            <a href="#" className="link">¿Olvidaste tu contraseña?</a>
          </div>
          <button type="submit">Iniciar Sesión</button>
          {error && <p className="error-message">{error}</p>}

          <div className="separator">o continuá con</div>

          <button type="button" className="social-btn google">
            <img src="src/icons/google.png" alt="Google" />
            Continuar con Google
          </button>

          <button type="button" className="social-btn facebook">
            <img src="src\icons\facebook.png" alt="Facebook" />
            Continuar con Facebook
          </button>

          <p className="register-text">
            ¿No tienes una cuenta?
            <Link to='/register'>Registrate</Link>
          </p>
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
          <p className="profile-role">Unis</p>
        </div>
        <div className="profile-data">
          <div className="profile-section">
            <h3>Información de Contacto</h3>
            <p><strong>Teléfono:</strong> {perfil.telefono || 'Sin registrar'}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {perfil.esAdmin ? <p><strong>Rol: Administrador</strong></p> : null}
          </div>
          <div className="profile-section">
            <h3>Mas informacion</h3>
            {perfil.esAdmin ? <p><strong>Historia: Co-fundador</strong></p> : null}
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
