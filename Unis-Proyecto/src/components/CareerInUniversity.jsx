import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCareerInUniversity } from '../bd/bd.js';

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
      <div className="career-header">
  <div className="career-texts">
    <h1 className="career-title">{info.nombreCarrera}</h1>
    <h2 className="career-university">en {info.nombreUniversidad}</h2>
  </div>
  <img src={info.foto} alt={`Carrera ${info.nombreCarrera}`} className="career-image" />
</div>
      
      
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
          <p className="label">Costo Mensual</p>
          <p className="value">${info.costoMensual}</p>
        </div>
      </div>

      <div className="career-section">
        <h3>Proceso de Admisión</h3>
        <div className="career-section-content">
          Contenido y requisitos de ingreso según la universidad...
        </div>
      </div>

      <div className="career-section">
        <h3>Programa de Estudios</h3>
        <div className="career-section-content">
          Plan de materias, asignaturas y descripción...
        </div>
      </div>

      <div className="career-contact">
        <p><strong>Dirección:</strong> {info.direccion}</p>
        <p><strong>Teléfono:</strong> {info.telefono}</p>
        <p><strong>Email:</strong> {info.email}</p>
        <p><strong>Horario de atención:</strong> {info.horarioAtencion}</p>
      </div>
    </div>
  );
}
