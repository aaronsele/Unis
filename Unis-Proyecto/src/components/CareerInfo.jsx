import React, { useEffect, useState } from 'react';
import {
  TrendingUpIcon,
  DollarSignIcon,
  CheckIcon,
  StarIcon,
} from 'lucide-react';
import './CareerInfo.css';
import UniversityInCareerCard from './UniversityInCareerCard';
import { getUniversitiesForCareer, esCarreraFavorita, agregarCarreraFavorita, quitarCarreraFavorita } from '../bd/bd.js';
import { supabase } from '../lib/supabaseClient';

export default function CareerInfo({ career }) {
  const [universities, setUniversities] = useState([]);
  const [loadingUnis, setLoadingUnis] = useState(true);
  const [perfil, setPerfil] = useState(null);
  const [favorita, setFavorita] = useState(false);

  // Traer perfil logueado y chequear favorito
  useEffect(() => {
    const fetchPerfil = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: perfilData, error } = await supabase
        .from('Perfil')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!error && perfilData) {
        setPerfil(perfilData);

        if (perfilData.secundario) {
          const fav = await esCarreraFavorita(perfilData.id, career.id);
          setFavorita(fav);
        }
      } else if (error) {
        console.error('Error al traer perfil:', error);
      }
    };

    fetchPerfil();
  }, [career]);

  // Traer universidades asociadas a la carrera
  useEffect(() => {
    async function fetchUnis() {
      if (career?.id) {
        setLoadingUnis(true);
        const data = await getUniversitiesForCareer(career.id);
        setUniversities(data);
        setLoadingUnis(false);
      }
    }
    fetchUnis();
  }, [career]);

  const toggleFavorito = async () => {
    if (!perfil?.secundario) return;

    if (favorita) {
      await quitarCarreraFavorita(perfil.id, career.id);
      setFavorita(false);
    } else {
      await agregarCarreraFavorita(perfil.id, career.id);
      setFavorita(true);
    }
  };

  if (!career) return null;

  return (
    <div className="career-info-container">
      <div className="career-header">
        <h1>{career.name || career.nombre}</h1>
        {perfil?.secundario && (
          <StarIcon
            size={28}
            className={`star-icon ${favorita ? 'active' : ''}`}
            onClick={toggleFavorito}
            style={{ cursor: 'pointer', transition: '0.3s' }}
          />
        )}
      </div>

      <div className="career-info-main">
        <section className="career-section">
          <h2 className="career-section-title">Sobre la Carrera</h2>
          <p className="career-description">
            {career.description || career.descripcion || 'Descripción no disponible'}
          </p>
        </section>

        <section className="career-section">
          <h2 className="career-section-title">Habilidades que Desarrollarás</h2>
          <div className="career-skills-list">
            {(career.skills || []).map((skill, index) => (
              <div key={index} className="career-skill-item">
                <CheckIcon className="career-icon-skill" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="career-sidebar">
        <h2 className="career-sidebar-title">Salidas Laborales</h2>
        <div className="career-job-list">
          {(career.jobOpportunities || []).map((job, index) => (
            <div key={index} className="career-job-card">
              <h3 className="career-job-title">{job.title}</h3>
              <p className="career-job-description">{job.description}</p>
              <div className="career-job-details">
                <div className="career-job-detail">
                  <DollarSignIcon className="career-job-icon" />
                  Salario: {job.salary}
                </div>
                <div className="career-job-detail">
                  <TrendingUpIcon className="career-job-icon" />
                  Demanda: {job.demand}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de universidades */}
      <section className="career-section-career-universities">
        <h2 className="career-section-title">
          Dónde estudiar {career.name || career.nombre}
        </h2>
        <div className="university-cards-container">
          {loadingUnis ? (
            <p>Cargando universidades...</p>
          ) : universities.length > 0 ? (
            universities.map((uni) => (
              <UniversityInCareerCard
                key={uni.id}
                university={uni}
                career={career}
              />
            ))
          ) : (
            <p>No hay universidades disponibles para esta carrera.</p>
          )}
        </div>
      </section>
    </div>
  );
}
