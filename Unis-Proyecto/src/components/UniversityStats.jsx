import React from 'react'
import {
  Users2Icon,
  BookOpenIcon,
  AwardIcon,
  Building2Icon,
} from 'lucide-react'

export function UniversityStats({ university }) {
  const stats = [
    {
      label: 'Estudiantes',
      value: university.cantEstudiantes,
      icon: Users2Icon,
    },
    {
      label: 'Carreras',
      value: university.cantCarreras,
      icon: BookOpenIcon,
    },
    {
      label: 'Ranking',
      value: university.ranking,
      icon: AwardIcon,
    },
    {
      label: 'Acreditación',
      value: university.acreditacion,
      icon: Building2Icon,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map(({ label, value, icon: Icon }, index) => (
        <div
          key={label} // mejor usar label que index para keys únicas
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center mb-2">
            <Icon
              className="w-5 h-5 mr-2"
              style={{
                color: '#2560B9',
              }}
            />
            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
          </div>
          <p
            className="text-2xl font-semibold"
            style={{
              color: '#2F2F2F',
            }}
          >
            {value || 'No disponible'}
          </p>
        </div>
      ))}
    </div>
  )
}
