import React, { useState, useEffect } from 'react';
import { SearchIcon } from 'lucide-react';
import { getUniversidades, getCarreras } from '../bd/bd.js';
import './SearchSections.css';

export function SearchSection() {
  const [universities, setUniversities] = useState([]);
  const [careers, setCareers] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');

  useEffect(() => {
    async function fetchData() {
      const unis = await getUniversidades();
      const carreras = await getCarreras();
      setUniversities(unis);
      setCareers(carreras);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white py-12 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: '#2F2F2F' }}
        >
          Encontrá tu carrera académica
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">

          {/* Input de búsqueda por área */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Qué te gustaría estudiar?
            </label>
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una carrera</option>
              {careers.map((career) => (
                <option key={career.id} value={career.id}>
                  {career.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de universidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Dónde te gustaría estudiar?
            </label>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una universidad</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="px-8 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity duration-200"
            onClick={() => {
              console.log('🔎 Buscar con:', {
                universidad: selectedUniversity,
                carrera: selectedCareer
              });
              // podés usar navigate(`/lo-que-sea`) si querés redirigir después
            }}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}

