import React from 'react';
import { GraduationCapIcon, UserCheckIcon, BookOpenIcon } from 'lucide-react';
import './FeatureSection.css';

export function FeatureSection() {
  const features = [
    {
      icon: GraduationCapIcon,
      title: 'Orientación inteligente',
      description:
        'Programa especializado basado en inteligencia artificial que te ayuda a elegir la carrera más adecuada para ti.',
    },
    {
      icon: BookOpenIcon,
      title: 'Información completa',
      description:
        'Accede a datos detallados sobre universidades, carreras, planes de estudio y requisitos de admisión.',
    },
    {
      icon: UserCheckIcon,
      title: 'Comunidad de estudiantes',
      description:
        'Conecta con estudiantes que ya están cursando la carrera que te interesa y comparte experiencias.',
    },
  ];

  return (
    <section className="feature-section">
      <div className="feature-container">
        <h2 className="feature-title">¿Por qué elegir UNIS?</h2>
        <div className="feature-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="feature-card-header">
                  <Icon className="feature-icon" />
                  <h3 className="feature-card-title">{feature.title}</h3>
                </div>
                <p className="feature-card-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
