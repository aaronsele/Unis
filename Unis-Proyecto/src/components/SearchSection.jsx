import React from 'react'
import { SearchIcon } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import {useState, useEffect} from 'react'

export function SearchSection() {

  const [universities, setUniversities] = useState([])

  useEffect(() => {
    async function fetchUniversities() {
      const data = await getUniversidades()
      setUniversities(data)
    }
    fetchUniversities()
  }, [])

  return (
    <div className="bg-white py-12 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{
            color: '#2F2F2F',
          }}
        >
          Encontrá tu carrera académica
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Qué te gustaría estudiar?
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Buscar área de estudio"
              />
              <SearchIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Dónde te gustaría estudiar?
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
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
            style={{
              backgroundColor: '#2560B9',
            }}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  )
}
