import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCareerInUniversity } from '../bd/bd.js';
import './CareerInUniversity.css';

export default function CareerInUniversity() {
  const { universityId, careerId } = useParams();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getCareerInUniversity(universityId, careerId);
      if (data) {
        setInfo(data);
        setError('');
      } else {
        setError('No se encontró información para esta carrera en esta universidad.');
      }
      setLoading(false);
    }
    fetchData();
  }, [universityId, careerId]);

  if (loading) return <p>Cargando info de la carrera en la universidad...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="career-page">
      {/* HEADER */}
      <div className="career-header">
        <img src={info.foto} alt={`Carrera ${info.nombreCarrera}`} className="career-image" />
        <div className="overlay"></div>
        <div className="career-header-text">
          <span className="career-tag">Tecnología</span>
          <span className="career-tag">Pública</span>
          <h1>{info.nombreCarrera}</h1>
          <h2>en {info.nombreUniversidad}</h2>
          <div className="career-meta">
            <span>{info.facultad}</span>
            <span>{info.duracionAnios} años</span>
            <span>{info.modalidad}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="career-main">
        <div className="career-left">
          {/* INFO CARDS */}
          <div className="career-info-grid">
            <div className="career-info-card">
              <p className="label">Duración</p>
              <p className="value">{info.duracionAnios} años</p>
            </div>
            <div className="career-info-card">
              <p className="label">Modalidad</p>
              <p className="value">{info.modalidad}</p>
            </div>
            <div className="career-info-card">
              <p className="label">Costo</p>
              <p className="value">{info.costoMensual === 0 ? 'Gratuito' : `$${info.costoMensual}`}</p>
            </div>
          </div>

          {/* PROCESO ADMISION */}
          <div className="career-section">
            <h3>Proceso de Admisión</h3>
            <div className="career-section-content">
              {info.procesoAdmision || 'Contenido y requisitos de ingreso según la universidad...'}
            </div>
          </div>

          {/* PROGRAMA */}
          <div className="career-section">
            <h3>Programa de Estudios</h3>
            <div className="career-section-content">
              {info.programaEstudios || 'Plan de materias, asignaturas y descripción...'}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="career-right">
          <div className="career-side-card">
            <h4>Fechas Importantes</h4>
            <ul>
              <li>Inscripción CBC 1º cuatrimestre - Febrero 2024</li>
              <li>Inscripción CBC 2º cuatrimestre - Julio 2024</li>
              <li>Inicio de clases CBC - Marzo/Agosto 2024</li>
            </ul>
          </div>

          <div className="career-side-card">
            <h4>Información de Contacto</h4>
            <p><strong>Dirección:</strong> {info.direccion}</p>
            <p><strong>Teléfono:</strong> {info.telefono}</p>
            <p><strong>Email:</strong> {info.email}</p>
            <p><strong>Horario:</strong> {info.horarioAtencion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
