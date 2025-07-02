import React from 'react'
import {
  Users2Icon,
  BookOpenIcon,
  AwardIcon,
  Building2Icon,
} from 'lucide-react'
import './UniversityStats.css'

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
    <div className="stats-grid">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="stat-card">
          <div className="stat-header">
            <Icon className="stat-icon" />
            <h3 className="stat-label">{label}</h3>
          </div>
          <p className="stat-value">{value || 'No disponible'}</p>
        </div>
      ))}
    </div>
  )
}
