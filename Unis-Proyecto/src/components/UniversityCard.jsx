import React from 'react';
import { Link } from 'react-router-dom'
import { MapPinIcon, UsersIcon, BookOpenIcon } from 'lucide-react';

export function UniversityCard({ university }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="relative h-48 overflow-hidden">
        <img
          src={university.foto}
          alt={university.nombre}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span
            className="px-2 py-1 text-xs font-medium text-white rounded-full"
            style={{
              backgroundColor:
                university.publica ? '#2560B9' : '#2F2F2F',
            }}
          >
            {university.publica ? 'Pública' : 'Privada'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: '#2F2F2F' }}
        >
          {university.nombre}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {university.descripcion}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 mr-2" />
            {university.direccion}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <UsersIcon className="w-4 h-4 mr-2" />
            {university.cantEstudiantes} estudiantes
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BookOpenIcon className="w-4 h-4 mr-2" />
            {university.cantCarreras} carreras disponibles
          </div>
        </div>
        <Link>
        <button
          className="w-full py-2 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-opacity duration-200"
          style={{ backgroundColor: '#2560B9' }}
        >
          Ver Detalles
        </button>
        </Link>
        
      </div>
    </div>
  );
}
