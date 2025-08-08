import React, { useEffect, useState } from 'react'
// import { CareerCard } from './CareerCard';
import { getCarrerasByUniversidadId } from '../bd/bd'
import './UniversityCareerList.css'

export function UniversityCareerList({ universityId }) {
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCareers() {
      const data = await getCarrerasByUniversidadId(universityId)
      setCareers(data)
      setLoading(false)
    }

    fetchCareers()
  }, [universityId])

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#2F2F2F' }}>
          Carreras Disponibles
        </h2>
        <p className="text-gray-600">
          Explora las carreras que ofrece esta universidad y encuentra la que mejor se adapte a tus intereses.
        </p>
      </div>

      {loading ? (
        <p>Cargando carreras...</p>
      ) : careers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No se encontraron carreras para esta universidad.</p>
      )}
    </section>
  )
}
