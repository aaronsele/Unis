import React from 'react';
import {
  BriefcaseIcon,
  TrendingUpIcon,
  DollarSignIcon,
  CheckIcon,
} from 'lucide-react';

//todo esto es parte del hardcodeo (datos Y VARIABLES inventados/as)

export function CareerInfo({ career }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <div className="lg:col-span-2 space-y-8">
        <section>
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: '#2F2F2F',
            }}
          >
            Sobre la Carrera
          </h2>
          <p className="text-gray-600 leading-relaxed">{career.description}</p>
        </section>
        <section>
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: '#2F2F2F',
            }}
          >
            Habilidades que Desarrollarás
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {career.skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <CheckIcon
                  className="w-5 h-5 mr-2"
                  style={{
                    color: '#2560B9',
                  }}
                />
                <span className="text-gray-600">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div>
        <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
          <h2
            className="text-xl font-bold mb-4"
            style={{
              color: '#2F2F2F',
            }}
          >
            Salidas Laborales
          </h2>
          <div className="space-y-4">
            {career.jobOpportunities.map((job, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <h3
                  className="font-semibold mb-2"
                  style={{
                    color: '#2F2F2F',
                  }}
                >
                  {job.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <DollarSignIcon className="w-4 h-4 mr-1" />
                    Salario: {job.salary}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <TrendingUpIcon className="w-4 h-4 mr-1" />
                    Demanda: {job.demand}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
