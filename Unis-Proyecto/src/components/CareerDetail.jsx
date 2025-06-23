import React from 'react';

//traer de la bd la carrera cuya id está en la url
//mientras tanto, hardcodeamos:

const careerData = {
  id: 1,
  name: "Ingeniería en Sistemas",
  area: "Tecnología",
  duration: "5 años",
  description:
    "La Ingeniería en Sistemas es una disciplina que combina principios de ingeniería con ciencias de la computación para diseñar, desarrollar y mantener sistemas de software y hardware. Los graduados están preparados para resolver problemas complejos utilizando tecnología y pensamiento sistemático.",
  image:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=400&fit=crop",
  demandLevel: "Alta",
  jobOpportunities: [
    {
      title: "Desarrollador de Software",
      description: "Crear aplicaciones y sistemas informáticos",
      salary: "Alto",
      demand: "Muy alta",
    },
    {
      title: "Arquitecto de Sistemas",
      description: "Diseñar estructuras de sistemas complejos",
      salary: "Muy alto",
      demand: "Alta",
    },
    {
      title: "Analista de Datos",
      description: "Análisis y procesamiento de grandes volúmenes de datos",
      salary: "Alto",
      demand: "Alta",
    },
  ],
  skills: [
    "Pensamiento lógico y analítico",
    "Resolución de problemas complejos",
    "Programación y desarrollo de software",
    "Gestión de proyectos tecnológicos",
    "Trabajo en equipo",
  ],
  studyPlan: {
    yearOne: [
      "Matemática I",
      "Algoritmos y Programación I",
      "Física I",
      "Álgebra",
      "Química",
    ],
    yearTwo: [
      "Matemática II",
      "Algoritmos y Programación II",
      "Física II",
      "Arquitectura de Computadoras",
      "Probabilidad y Estadística",
    ],
    yearThree: [
      "Bases de Datos",
      "Sistemas Operativos",
      "Redes de Computadoras",
      "Ingeniería de Software I",
      "Análisis Matemático III",
    ],
    yearFour: [
      "Inteligencia Artificial",
      "Seguridad Informática",
      "Ingeniería de Software II",
      "Sistemas Distribuidos",
      "Proyecto I",
    ],
    yearFive: [
      "Gestión de Proyectos",
      "Sistemas de Información",
      "Ética Profesional",
      "Proyecto Final",
      "Práctica Profesional",
    ],
  },
};

function CareerBanner({ career }) {
  return (
    <div
      className="w-full h-64 bg-cover bg-center"
      style={{ backgroundImage: `url(${career.image})` }}
    >
      <h1 className="text-white text-4xl font-bold p-8 bg-black bg-opacity-50">
        {career.name}
      </h1>
    </div>
  );
}

function CareerInfo({ career }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-2">Descripción</h2>
      <p>{career.description}</p>

      <h3 className="text-xl font-semibold mt-4">Área: {career.area}</h3>
      <h3 className="text-xl font-semibold">Duración: {career.duration}</h3>
      <h3 className="text-xl font-semibold">Nivel de demanda: {career.demandLevel}</h3>

      <h3 className="text-xl font-semibold mt-4">Oportunidades laborales:</h3>
      <ul className="list-disc list-inside">
        {career.jobOpportunities.map((job, i) => (
          <li key={i}>
            <strong>{job.title}</strong>: {job.description} (Sueldo: {job.salary}, Demanda: {job.demand})
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mt-4">Habilidades requeridas:</h3>
      <ul className="list-disc list-inside">
        {career.skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

function StudyPlan({ plan }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Plan de estudios</h2>
      {Object.entries(plan).map(([year, subjects]) => (
        <div key={year} className="mb-3">
          <h3 className="font-semibold capitalize">{year.replace(/([A-Z])/g, " $1")}</h3>
          <ul className="list-disc list-inside">
            {subjects.map((subject, i) => (
              <li key={i}>{subject}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function CareerUniversities({ careerName }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-2">Universidades que ofrecen {careerName}</h2>
      <p>Esta sección puede contener información sobre universidades disponibles para esta carrera.</p>
      {/* Podés hardcodear una lista acá si querés */}
    </section>
  );
}

export function CareerDetail() {
  return (
    <div className="w-full min-h-screen bg-white">
      <CareerBanner career={careerData} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CareerInfo career={careerData} />
        <StudyPlan plan={careerData.studyPlan} />
        <CareerUniversities careerName={careerData.name} />
      </div>
    </div>
  );
}

