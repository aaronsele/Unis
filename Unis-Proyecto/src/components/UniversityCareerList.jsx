import React, { useEffect, useState } from 'react'
import CareerCard from './CareerCard'
import { getCarrerasByUniversidadId } from '../bd/bd'
import './UniversityCareerList.css'

export function UniversityCareerList({ universityId }) {
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)
  const [startIndex, setStartIndex] = useState(0)
  const cardsPerPage = 3

  useEffect(() => {
    async function fetchCareers() {
      const data = await getCarrerasByUniversidadId(universityId)
      setCareers(data)
      setLoading(false)
    }
    fetchCareers()
  }, [universityId])

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - cardsPerPage, 0))
  }

  const handleNext = () => {
    setStartIndex(prev =>
      Math.min(prev + cardsPerPage, careers.length - cardsPerPage)
    )
  }

  return (
    <section className="university-career-section">
      <div className="header">
        <h2>Carreras Disponibles</h2>
        <p>
          Explora las carreras que ofrece esta universidad y encuentra la que mejor se adapte a tus intereses.
        </p>
      </div>

      {loading ? (
        <p>Cargando carreras...</p>
      ) : careers.length > 0 ? (
        <div className="slider-container">
          <button
            className="slider-btn left"
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            ◀
          </button>

          <div className="cards-viewport">
            <div
              className="cards-track"
              style={{
                transform: `translateX(-${(100 / cardsPerPage) * startIndex}%)`,
              }}
            >
              {careers.map((career) => (
                <div key={career.id} className="card-item">
                  <CareerCard career={career} />
                </div>
              ))}
            </div>
          </div>

          <button
            className="slider-btn right"
            onClick={handleNext}
            disabled={startIndex + cardsPerPage >= careers.length}
          >
            ▶
          </button>
        </div>
      ) : (
        <p>No se encontraron carreras para esta universidad.</p>
      )}
    </section>
  )
}
