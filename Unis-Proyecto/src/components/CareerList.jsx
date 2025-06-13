import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import CareerCard from './CareerCard'

function CareerList() {
  const [careers, setCareers] = useState([])

  useEffect(() => {
    const fetchCareers = async () => {
      const { data, error } = await supabase.from('Carrera').select('*')
      if (error) console.error('Error al traer carreras:', error)
      else setCareers(data)
    }
    fetchCareers()
  }, [])

  return (
    <section className="w-full py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#2F2F2F' }}>
            Carreras Disponibles
          </h2>
          <p className="text-gray-600">
            Descubre las diferentes carreras y encuentra tu vocación profesional.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CareerList
