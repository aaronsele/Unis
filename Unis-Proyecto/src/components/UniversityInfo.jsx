import React from 'react'
import {
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  MapPinIcon,
  CheckIcon,
} from 'lucide-react'
import './UniversityInfo.css'

export function UniversityInfo({ university }) {
  const { descripcion, facilities, admissionProcess, contact } = university

  return (
    <div className="university-info-grid">
      <div className="university-info-main">
        {/* Descripción */}
        <section className="university-info-section">
          <h2>Sobre la Universidad</h2>
          <p>
            {descripcion || 'No hay descripción disponible.'}
          </p>
        </section>

        {/* Instalaciones */}
        <section className="university-info-section">
          <h2>Instalaciones</h2>
          <div className="university-info-facilities">
            {facilities?.length > 0 ? (
              facilities.map((facility, index) => (
                <div key={index} className="university-info-facility">
                  <CheckIcon className="icon" />
                  <span>{facility}</span>
                </div>
              ))
            ) : (
              <p>No se especificaron instalaciones.</p>
            )}
          </div>
        </section>

        {/* Proceso de Admisión */}
        <section className="university-info-section">
          <h2>Proceso de Admisión</h2>
          <div className="admission-box">
            <div className="mb-4">
              <h3>Requisitos:</h3>
              <ul>
                {admissionProcess?.requirements?.length > 0 ? (
                  admissionProcess.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))
                ) : (
                  <li>No especificado</li>
                )}
              </ul>
            </div>
            <div className="mb-4">
              <h3>Fechas de Inscripción:</h3>
              <p>
                {admissionProcess?.dates || 'No disponible'}
              </p>
            </div>
            <div>
              <h3>Costo:</h3>
              <p>
                {admissionProcess?.cost || 'No disponible'}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Información de contacto */}
      <div className="contact-box">
        <h2>Información de Contacto</h2>
        <div className="contact-items">
          {contact?.address && (
            <div className="contact-item">
              <MapPinIcon className="icon" />
              <span>{contact.address}</span>
            </div>
          )}
          {contact?.phone && (
            <div className="contact-item">
              <PhoneIcon className="icon" />
              <span>{contact.phone}</span>
            </div>
          )}
          {contact?.email && (
            <div className="contact-item">
              <MailIcon className="icon" />
              <span>{contact.email}</span>
            </div>
          )}
          {contact?.website && (
            <div className="contact-item">
              <GlobeIcon className="icon" />
              <a
                href={`https://${contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.website}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
