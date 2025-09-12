import React, { useState, useEffect } from 'react';
import { UniversityCard } from './UniversityCard.jsx';
import { getUniversidades } from '../bd/bd.js';
import { FaSearch } from 'react-icons/fa';
import './UniversityList.css';

export function UniversityList() {
  const [universities, setUniversities] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUniversities() {
      const data = await getUniversidades();
      setUniversities(data);
    }
    fetchUniversities();
  }, []);

  // Filtrar universidades en tiempo real
  const filteredUniversities = universities.filter(university =>
    university.nombre.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <main className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#2F2F2F' }}>
            Universidades Disponibles
          </h2>
          <p className="text-gray-600">
            Explora nuestra selección de universidades y encuentra la que mejor se adapte a tus objetivos académicos.
          </p>
        </header>

        {/* Buscador */}
        <div className="university-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar universidad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Cards */}
        <div className="university-list-grid">
          {filteredUniversities.map(university => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </div>
      </div>
    </main>
  );
}
