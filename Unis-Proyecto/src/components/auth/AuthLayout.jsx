import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { GraduationCapIcon } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Encabezado */}
      <header className="w-full bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: '#2560B9',
              }}
            >
              <GraduationCapIcon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-3">
              <h1
                className="text-2xl font-bold"
                style={{
                  color: '#2F2F2F',
                }}
              >
                Unis
              </h1>
              <p className="text-sm text-gray-600">
                Encuentra tu universidad ideal
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Pie de página */}
      <footer className="py-4 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          © 2024 Unis. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
