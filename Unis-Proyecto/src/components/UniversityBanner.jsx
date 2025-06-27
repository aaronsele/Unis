  import React from 'react'
  import { MapPinIcon, GraduationCapIcon, CalendarIcon } from 'lucide-react'


  export function UniversityBanner({ university }) {
    return (
      <div className="relative h-[400px] w-full">
        <div className="absolute inset-0">

          <img
            src={university.foto}
            alt={university.nombre}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-end h-full pb-8">
          <span
  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit"
  style={{
    backgroundColor: university.publica ? '#2560B9' : '#2F2F2F',
  }}
>
  <GraduationCapIcon className="w-4 h-4 mr-2" />
  {university.publica ? 'Pública' : 'Privada'}
</span>

            <h1 className="text-4xl font-bold text-white mb-4">
              {university.nombre}
            </h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2" />
                {university.direccion}
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Fundada en {university.fechaFundacion}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
