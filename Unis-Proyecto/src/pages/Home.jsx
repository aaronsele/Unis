import React from 'react'
import { SearchSection } from '../components/SearchSection.jsx'
import { FeatureSection } from '../components/FeatureSection.jsx'
import { CareerList } from '../components/CareerList.jsx'
import { UniversityList } from '../components/UniversityList.jsx'
import './Home.css'

{/*
queda:

1. hacerlo funcional con el hardcodeo de MG
2. entender y reemplazar el hardcodeo por datos de la base de datos
3. trabajo terminado
*/}

export function Home() {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Encuentra tu universidad ideal y construye tu futuro
            </h1>
            <p className="hero-subtitle">
              Explora más de 100 universidades y 1000 carreras en toda Argentina
            </p>
            <button className="cta-button">Comenzar ahora</button>
          </div>
        </div>
      </div>

      <SearchSection />

      <FeatureSection />

      <section className="section-spacing">
        <UniversityList />
      </section>


      <CareerList />

      <section className="section-spacing bg-light">
        <div className="cta-final-container">
          <h2 className="cta-final-title">¿Listo para encontrar tu camino académico?</h2>
          <p className="cta-final-text">
            Únete a miles de estudiantes que ya han encontrado su universidad y define tu futuro con UNIS
          </p>
          <button className="cta-button">Registrarse gratis</button>
        </div>
      </section>
    </div>
  )
}
