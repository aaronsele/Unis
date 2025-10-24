import { useEffect, useState } from 'react';
import { auth } from './auth/auth';
import { getPerfilByUserId, getSuscripcionesPorEstudiante } from '../bd/bd.js';
import './UserProfile.css';
import { Link } from 'react-router-dom';

export function UserProfile() {
  const { user, signIn, signOut } = auth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [suscripciones, setSuscripciones] = useState([]);

  useEffect(() => {
    if (user) {
      async function fetchPerfil() {
        const data = await getPerfilByUserId(user.id);
        setPerfil(data);

        if (data?.secundario?.trim() !== '') {
          const susData = await getSuscripcionesPorEstudiante(data.id);
          setSuscripciones(susData);
        }
      }
      fetchPerfil();
    }
  }, [user]);

  if (!user) {
    const handleLogin = async (e) => {
      e.preventDefault();
      const { error } = await signIn({ email, password });
      if (error) setError(error.message);
    };

    return (
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
          <div className="options-row">
            <label><input type="checkbox" /> Recordarme</label>
            <a href="#" className="link">¿Olvidaste tu contraseña?</a>
          </div>
          <button type="submit">Iniciar Sesión</button>
          {error && <p className="error-message">{error}</p>}
          <div className="separator">o continuá con</div>
          <button type="button" className="social-btn google">
            <img src="src/icons/google.png" alt="Google" /> Continuar con Google
          </button>
          <button type="button" className="social-btn facebook">
            <img src="src/icons/facebook.png" alt="Facebook" /> Continuar con Facebook
          </button>
          <p className="register-text">¿No tienes una cuenta? <Link to='/register'>Registrate</Link></p>
        </form>
      </div>
    );
  }

  if (!perfil) return <p className="loading">Cargando perfil...</p>;

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
            <p><strong>Teléfono:</strong> {perfil.telefono || 'No especificado'}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>

        {perfil?.secundario?.trim() !== '' && (
          <div className="profile-section">
            <h3>Mis suscripciones</h3>
            <div className="suscripciones-grid">
              {suscripciones.length === 0 ? (
                <p>No estás suscripto a ningún curso todavía.</p>
              ) : (
                suscripciones.map((sub) => (
                  <div key={sub.id} className="suscripcion-card">
                    <img src={sub.cursoOV?.foto} alt={sub.cursoOV?.titulo} />
                    <div className="suscripcion-card-content">
                    <h4>{sub.cursoOV?.titulo}</h4>
                    <p>{sub.cursoOV?.descripcion}</p>
                    </div>
                    <div className="suscripcion-card-footer">
                    <span>{sub.cursoOV?.modalidad}</span>
                  </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <div className="profile-buttons">
          <button>Editar Perfil</button>
          <button className="outline" onClick={() => signOut()}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
}
