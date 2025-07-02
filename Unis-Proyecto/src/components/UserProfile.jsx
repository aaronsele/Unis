import React from 'react'
import {
  UserIcon,
  PhoneIcon,
  MailIcon,
  BookOpenIcon,
  PencilIcon,
} from 'lucide-react'

import './UserProfile.css'

const userData = {
  name: 'Astor De La Fuente',
  phone: '113788956',
  email: 'BrbrAstor@gmail.com',
  education: {
    highSchool: 'Ort',
  },
}

// hardcodeadoooo y deberia estar en "pages"
export function UserProfile() {
  return (
    <div className="user-profile-container">
      <div className="user-card">
        {/* Banner decorativo */}
        <div className="user-banner" />

        <div className="user-content">
          {/* Perfil */}
          <div className="user-header">
            <div className="user-avatar-container">
              <div className="user-avatar">
                <UserIcon className="user-icon" />
              </div>
              <button className="edit-avatar-btn">
                <PencilIcon className="edit-avatar-icon" />
              </button>
            </div>

            <div className="user-name-section">
              <h1>{userData.name}</h1>
              <p>Estudiante</p>
            </div>
          </div>

          {/* Info */}
          <div className="user-info-grid">
            {/* Contacto */}
            <div className="info-section">
              <h2>Información de Contacto</h2>
              <div className="info-box">
                <div className="info-item">
                  <PhoneIcon className="info-icon" />
                  <div>
                    <p className="info-label">Teléfono</p>
                    <p>{userData.phone}</p>
                  </div>
                </div>
                <div className="info-item">
                  <MailIcon className="info-icon" />
                  <div>
                    <p className="info-label">Email</p>
                    <p>{userData.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Educación */}
            <div className="info-section">
              <h2>Información Académica</h2>
              <div className="info-box">
                <div className="info-item">
                  <BookOpenIcon className="info-icon" />
                  <div>
                    <p className="info-label">Secundaria</p>
                    <p>{userData.education.highSchool}</p>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="action-buttons">
                <button className="btn-primary">Editar Perfil</button>
                <button className="btn-outline">Cambiar Contraseña</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
