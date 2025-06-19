import React from 'react'
import { SearchSection } from './SearchSection'
//import { FeatureSection } from './FeatureSection'
//import { UniversityList } from './UniversityList'
import  CareerList  from '../components/CareerList'
{/*
queda:

1. hacerlo funcional con el hardcodeo de MG
2. entender y reemplazar el hardcodeo por datos de la base de datos
3. trabajo terminado
*/}

function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1800&h=500&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-2xl">
              Encuentra tu universidad ideal y construye tu futuro
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl">
              Explora más de 100 universidades y 1000 carreras en toda Argentina
            </p>
            <button
              className="px-8 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity duration-200 w-fit"
              style={{
                backgroundColor: '#2560B9',
              }}
            >
              Comenzar ahora
            </button>
          </div>
        </div>
      </div>
   
      <SearchSection />
      
      <FeatureSection />
      
      <section className="py-16">
        <UniversityList />
      </section>
     
      <CareerList />
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              color: '#2F2F2F',
            }}
          >
            ¿Listo para encontrar tu camino académico?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a miles de estudiantes que ya han encontrado su universidad y
            define tu futuro con UNIS
          </p>
          <button
            className="px-8 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity duration-200"
            style={{
              backgroundColor: '#2560B9',
            }}
          >
            Registrarse gratis
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home