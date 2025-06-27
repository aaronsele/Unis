import React from 'react'
import {
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  MapPinIcon,
  CheckIcon,
} from 'lucide-react'

export function UniversityInfo({ university }) {
  const { descripcion, facilities, admissionProcess, contact } = university

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <div className="lg:col-span-2 space-y-8">
        {/* Descripción */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#2F2F2F' }}>
            Sobre la Universidad
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {descripcion || 'No hay descripción disponible.'}
          </p>
        </section>

        {/* Instalaciones */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#2F2F2F' }}>
            Instalaciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facilities?.length > 0 ? (
              facilities.map((facility, index) => (
                <div key={index} className="flex items-center">
                  <CheckIcon className="w-5 h-5 mr-2" style={{ color: '#2560B9' }} />
                  <span className="text-gray-600">{facility}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No se especificaron instalaciones.</p>
            )}
          </div>
        </section>

        {/* Proceso de Admisión */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#2F2F2F' }}>
            Proceso de Admisión
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Requisitos:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {admissionProcess?.requirements?.length > 0 ? (
                  admissionProcess.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))
                ) : (
                  <li>No especificado</li>
                )}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Fechas de Inscripción:</h3>
              <p className="text-gray-600">
                {admissionProcess?.dates || 'No disponible'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Costo:</h3>
              <p className="text-gray-600">
                {admissionProcess?.cost || 'No disponible'}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Información de contacto */}
      <div>
        <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#2F2F2F' }}>
            Información de Contacto
          </h2>
          <div className="space-y-4">
            {contact?.address && (
              <div className="flex items-start">
                <MapPinIcon className="w-5 h-5 mr-3 mt-1" style={{ color: '#2560B9' }} />
                <span className="text-gray-600">{contact.address}</span>
              </div>
            )}
            {contact?.phone && (
              <div className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-3" style={{ color: '#2560B9' }} />
                <span className="text-gray-600">{contact.phone}</span>
              </div>
            )}
            {contact?.email && (
              <div className="flex items-center">
                <MailIcon className="w-5 h-5 mr-3" style={{ color: '#2560B9' }} />
                <span className="text-gray-600">{contact.email}</span>
              </div>
            )}
            {contact?.website && (
              <div className="flex items-center">
                <GlobeIcon className="w-5 h-5 mr-3" style={{ color: '#2560B9' }} />
                <a
                  href={`https://${contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {contact.website}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
