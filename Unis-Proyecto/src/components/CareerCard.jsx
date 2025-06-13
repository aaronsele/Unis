import React from 'react'
import { ClockIcon, TrendingUpIcon, BriefcaseIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

function CareerCard({ career }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="relative h-48 overflow-hidden">
        <img
          src={career.foto}
          alt={career.nombre}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-blue-700">
            {career.area}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: '#2F2F2F' }}>
          {career.nombre}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {career.descripcion}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="w-4 h-4 mr-2" />
            Duración: {career.duracionGenericaEnAnios} años
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BriefcaseIcon className="w-4 h-4 mr-2" />
            Área: {career.area}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <TrendingUpIcon className="w-4 h-4 mr-2" />
            Demanda: {career.nivelDemanda}
          </div>
        </div>
        <Link to={`/carrera/${career.id}`}>
          <button
            className="w-full py-2 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: '#2560B9' }}
          >
            Ver Detalles
          </button>
        </Link>
      </div>
    </div>
  )
}

export default CareerCard
