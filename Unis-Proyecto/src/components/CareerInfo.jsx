import React from 'react';
import {
  BriefcaseIcon,
  TrendingUpIcon,
  DollarSignIcon,
  CheckIcon,
} from 'lucide-react';
import './CareerInfo.css';

export default function CareerInfo({ career }) {
  if (!career) return null;

  return (
    <div className="career-info-container">
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
    </div>
  );
}
