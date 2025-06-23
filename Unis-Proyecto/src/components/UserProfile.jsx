import React from 'react'
import {
  UserIcon,
  PhoneIcon,
  MailIcon,
  BookOpenIcon,
  PencilIcon,
} from 'lucide-react'
const userData = {
  name: 'Astor De La Fuente',
  phone: '113788956',
  email: 'BrbrAstor@gmail.com',
  education: {
    highSchool: 'Ort',
  },
}
//hardcodeadoooo
export function UserProfile() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Banner decorativo */}
        <div
          className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"
          style={{
            backgroundColor: '#2560B9',
          }}
        />
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          {/* Sección de perfil principal */}
          <div className="flex flex-col items-center sm:flex-row sm:items-end -mt-16 mb-8">
            {/* Avatar placeholder */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center">
                <UserIcon className="w-16 h-16 text-gray-400" />
              </div>
              <button
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
                style={{
                  color: '#2560B9',
                }}
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
            {/* Información básica */}
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h1
                className="text-2xl font-bold"
                style={{
                  color: '#2F2F2F',
                }}
              >
                {userData.name}
              </h1>
              <p className="text-gray-600">Estudiante</p>
            </div>
          </div>
          {/* Grid de información */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información de contacto */}
            <div className="space-y-6">
              <div>
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{
                    color: '#2F2F2F',
                  }}
                >
                  Información de Contacto
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex items-center">
                    <PhoneIcon
                      className="w-5 h-5 mr-3"
                      style={{
                        color: '#2560B9',
                      }}
                    />
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <p className="text-gray-900">{userData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MailIcon
                      className="w-5 h-5 mr-3"
                      style={{
                        color: '#2560B9',
                      }}
                    />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{userData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Información académica */}
            <div className="space-y-6">
              <div>
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{
                    color: '#2F2F2F',
                  }}
                >
                  Información Académica
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex items-center">
                    <BookOpenIcon
                      className="w-5 h-5 mr-3"
                      style={{
                        color: '#2560B9',
                      }}
                    />
                    <div>
                      <p className="text-sm text-gray-500">Secundaria</p>
                      <p className="text-gray-900">
                        {userData.education.highSchool}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Acciones */}
              <div className="flex gap-4 mt-6">
                <button
                  className="flex-1 py-2 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-opacity duration-200"
                  style={{
                    backgroundColor: '#2560B9',
                  }}
                >
                  Editar Perfil
                </button>
                <button
                  className="flex-1 py-2 px-4 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  style={{
                    color: '#2F2F2F',
                  }}
                >
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
