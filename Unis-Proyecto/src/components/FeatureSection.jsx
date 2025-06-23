import React from 'react';
import { GraduationCapIcon, UserCheckIcon, BookOpenIcon } from 'lucide-react';

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: '#2F2F2F' }}
        >
          ¿Por qué elegir UNIS?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <Icon
                    className="w-6 h-6 mr-2"
                    style={{ color: '#2560B9' }}
                  />
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: '#2F2F2F' }}
                  >
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
