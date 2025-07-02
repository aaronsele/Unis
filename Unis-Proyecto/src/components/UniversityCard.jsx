import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, UsersIcon, BookOpenIcon } from 'lucide-react';
import './UniversityCard.css';

export function UniversityCard({ university }) {
  return (
    <div className="university-card">
      <div style={{ position: 'relative' }}>
        <img
          src={university.foto}
          alt={university.nombre}
          className="university-image"
        />
        <span
          className="university-badge"
          style={{
            backgroundColor: university.publica ? '#2560B9' : '#2F2F2F',
          }}
        >
          {university.publica ? 'Pública' : 'Privada'}
        </span>
      </div>

      <div className="university-content">
        <h3 className="university-title">{university.nombre}</h3>
        <p className="university-desc">{university.descripcion}</p>

        <div className="university-info">
          <div>
            <MapPinIcon />
            {university.direccion}
          </div>
          <div>
            <UsersIcon />
            {university.cantEstudiantes} estudiantes
          </div>
          <div>
            <BookOpenIcon />
            {university.cantCarreras} carreras disponibles
          </div>
        </div>

        <Link to={`/universities/${university.id}`}>
          <button className="university-button">Ver Detalles</button>
        </Link>
      </div>
    </div>
  );
}
