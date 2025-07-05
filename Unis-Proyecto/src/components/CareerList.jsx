import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import CareerCard from './CareerCard.jsx'
import { getCarreras } from '../bd/bd.js'
import './CareerList.css'


export function CareerList() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    async function fetchCareers() {
      const data = await getCarreras()
          console.log('📦 DATA CARRERAS:', data)
      setCareers(data)
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


        <div className="Careers-columns">
          {careers.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>
      </div>
    </section>
  )
}

