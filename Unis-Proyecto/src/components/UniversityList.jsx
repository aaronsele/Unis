import React from 'react';
import { UniversityCard } from './UniversityCard.jsx';
import { getUniversidades } from '../bd/bd.js';
import { useState, useEffect } from 'react';



export function UniversityList() {
  const [universities, setUniversities] = useState([])

  useEffect(() => {
    async function fetchUniversities() {
      const data = await getUniversidades()
      
      console.log("Datos de universidades:", data);

      setUniversities(data)
    }
    fetchUniversities()
  }, [])

return (
    <main className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2
            className="text-3xl font-bold mb-2"
            style={{ color: '#2F2F2F' }}
          >
            Universidades Disponibles
          </h2>
          <p className="text-gray-600">
            Explora nuestra selección de universidades y encuentra la que mejor se adapte a tus objetivos académicos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((university) => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </div>
      </div>
    </main>
  );
}
