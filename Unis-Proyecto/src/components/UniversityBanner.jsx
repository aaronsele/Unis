import React from 'react';
import { MapPinIcon, GraduationCapIcon, CalendarIcon } from 'lucide-react';
import './UniversityBanner.css';

export function UniversityBanner({ university }) {
  return (
    <div className="university-banner">
      <div className="banner-bg">
        <img
          src={university.foto}
          alt={university.nombre}
          className="banner-image"
        />
        <div className="banner-overlay" />
      </div>

      <div className="banner-content">
        <div className="banner-details">
          <span
            className="type-badge"
            style={{
              backgroundColor: university.publica ? '#2560B9' : '#2F2F2F',
            }}
          >
            <GraduationCapIcon className="icon-small" />
            {university.publica ? 'Pública' : 'Privada'}
          </span>

          <h1 className="university-name">{university.nombre}</h1>

          <div className="university-meta">
            <div className="meta-item">
              <MapPinIcon className="icon" />
              {university.direccion}
            </div>
            <div className="meta-item">
              <CalendarIcon className="icon" />
              Fundada en {university.fechaFundacion}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
