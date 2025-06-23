import React from 'react';

const universityData = {
  id: 1,
  name: 'Universidad de Buenos Aires (UBA)',
  location: 'Buenos Aires',
  type: 'Pública',
  founded: '1821',
  students: '280,000+',
  careers: 120,
  description:
    'La Universidad de Buenos Aires es la mayor universidad de Argentina y una de las más prestigiosas de América Latina. Reconocida internacionalmente por su excelencia académica, investigación y contribución al desarrollo del país.',
  image:
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop',
  logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop',
  accreditation: 'CONEAU',
  ranking: 'Top 3 en Latinoamérica',
  contact: {
    address: 'Viamonte 430, C1053 CABA',
    phone: '+54 11 5285-5000',
    email: 'info@uba.ar',
    website: 'www.uba.ar',
  },
  facilities: [
    'Bibliotecas',
    'Laboratorios',
    'Centros deportivos',
    'Comedores universitarios',
    'Residencias estudiantiles',
  ],
  admissionProcess: {
    requirements: [
      'Título secundario',
      'CBC (Ciclo Básico Común)',
      'Documentación personal',
      'Certificado de salud',
    ],
    dates: 'Inscripciones de Marzo a Abril y de Agosto a Septiembre',
    cost: 'Gratuito',
  },
};

export function UniversityDetail() {
  return (
    <div className="w-full min-h-screen bg-white">
      <UniversityBanner university={universityData} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UniversityStats university={universityData} />
        <UniversityInfo university={universityData} />
        <UniversityCareerList universityId={universityData.id} />
      </div>
    </div>
  );
}
