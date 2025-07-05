import React from 'react'
import { ClockIcon, TrendingUpIcon, BriefcaseIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import './CareerCard.css'

function CareerCard({ career }) {
  return (
    <div className="career-card">
      <div className="career-image-container">
        <img
          src={career.foto || 'https://via.placeholder.com/300x200.png'}
          alt={career.nombre}
          className="career-image"
        />
        <span className="career-badge">{career.area}</span>
      </div>

      <div className="career-content">
        <h3 className="career-title">{career.nombre}</h3>
        <p className="career-description">{career.descripcion}</p>

        <div className="career-info">
          <div className="career-info-item">
            <ClockIcon className="career-icon" />
            <span>Duración: {career.duracionGenericaEnAnios} años</span>
          </div>
          <div className="career-info-item">
            <BriefcaseIcon className="career-icon" />
            <span>Salida Laboral: Desarrollador de Software</span>
          </div>
          <div className="career-info-item">
            <TrendingUpIcon className="career-icon" />
            <span>Demanda: {career.nivelDemanda}</span>
          </div>
        </div>

        <Link to={`/careers/${career.id}`}>
          <button className="career-button">Ver Detalles</button>
        </Link>
      </div>
    </div>
  )
}

export default CareerCard
