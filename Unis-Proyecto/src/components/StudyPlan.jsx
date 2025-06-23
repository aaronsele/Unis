import React from 'react';
import { BookOpenIcon } from 'lucide-react';

export function StudyPlan({ plan }) {
  const years = [
    { key: 'yearOne', label: 'Primer Año' },
    { key: 'yearTwo', label: 'Segundo Año' },
    { key: 'yearThree', label: 'Tercer Año' },
    { key: 'yearFour', label: 'Cuarto Año' },
    { key: 'yearFive', label: 'Quinto Año' },
  ];

  return (
    <section className="mb-12">
      <h2
        className="text-2xl font-bold mb-6"
        style={{ color: '#2F2F2F' }}
      >
        Plan de Estudios
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {years.map((year) => (
          <div
            key={year.key}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <h3
              className="flex items-center text-lg font-semibold mb-4"
              style={{ color: '#2F2F2F' }}
            >
              <BookOpenIcon
                className="w-5 h-5 mr-2"
                style={{ color: '#2560B9' }}
              />
              {year.label}
            </h3>
            <ul className="space-y-2">
              {plan[year.key].map((subject, index) => (
                <li key={index} className="text-gray-600">
                  • {subject}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
