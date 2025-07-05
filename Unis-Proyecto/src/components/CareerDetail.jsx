import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarreraById } from '../bd/bd.js';
import CareerInfo from './CareerInfo';
import './CareerDetail.css';

function CareerBanner({ career }) {
  return (
    <div
      className="career-banner"
      style={{
        backgroundImage: `url(${career.foto || career.image || 'https://via.placeholder.com/1200x400'})`,
      }}
    >
      <h1 className="career-banner-title">
        {career.nombre || career.name}
      </h1>
    </div>
  );
}

export default function CareerDetail() {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCareer() {
      setLoading(true);
      const data = await getCarreraById(id);
      setCareer(data);
      setLoading(false);
    }
    fetchCareer();
  }, [id]);

  if (loading) return <p className="career-loading">Cargando carrera...</p>;
  if (!career) return <p className="career-notfound">No se encontró la carrera con id {id}.</p>;

  return (
    <div className="career-detail-wrapper">
      <CareerBanner career={career} />
      <div className="career-detail-content">
        <CareerInfo career={career} />
      </div>
    </div>
  );
}


