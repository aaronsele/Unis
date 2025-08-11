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
  if (error) return <p style={{color:'red'}}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Detalles de la Carrera en la Universidad</h1>
      <p><strong>Duración (años):</strong> {info.duracionAnios}</p>
      <p><strong>Modalidad:</strong> {info.modalidad}</p>
      <p><strong>Costo mensual:</strong> ${info.costoMensual}</p>
      <p><strong>Dirección:</strong> {info.direccion}</p>
      <p><strong>Teléfono:</strong> {info.telefono}</p>
      <p><strong>Email:</strong> {info.email}</p>
      <p><strong>Horario de atención:</strong> {info.horarioAtencion}</p>
    </div>
  );
}
