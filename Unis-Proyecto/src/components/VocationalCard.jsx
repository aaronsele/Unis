import React, { useEffect, useState } from 'react';
import { getCursosOV } from '../bd/bd';
import './VocationalCard.css';

export function VocationalCard() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    async function fetchCursos() {
      const data = await getCursosOV();
      console.log('Cursos que llegaron:', data);
      setCursos(data);
    }
    fetchCursos();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cursos.map((curso) => (
        <div
          key={curso.id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <img
            src={curso.foto}
            alt={curso.titulo}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-1">{curso.titulo}</h3>
          <p className="text-sm text-gray-600 mb-2">{curso.descripcion}</p>

          <div className="flex items-center mb-3 gap-3">
            <img
              src={curso.profesional?.fotoPerfil}
              alt={`${curso.profesional?.nombre} ${curso.profesional?.apellido}`}
              className="w-12 h-12 object-cover rounded-full border"
            />
            <div>
              <p className="font-semibold text-gray-800">
                {curso.profesional?.nombre} {curso.profesional?.apellido}
              </p>
              <p className="text-sm text-gray-500">
                {curso.profesional?.profesion}
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-700 mb-1">
            <strong>Modalidad:</strong> {curso.modalidad}
          </div>
          <div className="text-sm text-gray-700 mb-1">
            <strong>Inicio:</strong> {curso.fechaInicio}
          </div>
          <div className="text-sm text-gray-700 mb-1">
            <strong>Sesiones:</strong> {curso.cantSesiones}
          </div>
          <div className="text-sm text-gray-700 mb-4">
            <strong>Precio:</strong> ${curso.precio}
          </div>

          <button className="career-button">Inscribirme</button>
        </div>
      ))}
    </div>
  );
}
