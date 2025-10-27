import React, { useState, useEffect } from 'react';
import { UniversityCard } from './UniversityCard.jsx';
import { getUniversidades } from '../bd/bd.js';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './UniversityList.css';

export function UniversityList() {
  const [universities, setUniversities] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    async function fetchUniversities() {
      const data = await getUniversidades();
      setUniversities(data);
    }
    fetchUniversities();
  }, []);

  const filteredUniversities = universities.filter(university =>
    university.nombre.toLowerCase().startsWith(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUniversities.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const visibleUniversities = filteredUniversities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <main className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
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
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>

        {/* Contenedor con flechas */}
        <div className="slider-container">
          {currentPage > 0 && (
            <button className="arrow left" onClick={prevPage}>
              <FaChevronLeft />
            </button>
          )}

          <div className="university-list-grid">
            {visibleUniversities.map(university => (
              <UniversityCard key={university.id} university={university} />
            ))}
          </div>

          {currentPage < totalPages - 1 && (
            <button className="arrow right" onClick={nextPage}>
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
