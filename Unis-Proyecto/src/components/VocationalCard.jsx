import React, { useEffect, useState } from 'react';
import { getCursosOV } from '../bd/bd';
import './VocationalCard.css';
import { FaCalendarAlt, FaLaptop, FaClipboardCheck, FaUserCheck, FaFileAlt } from 'react-icons/fa';

export function VocationalCard() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    async function fetchCursos() {
      const data = await getCursosOV();
      setCursos(data);
      console.log('Cursos que llegaron:', data);

    }
    fetchCursos();
  }, []);

  return (
    <div className="cursos-container">
      {cursos.map((curso) => (
        <div className="curso-wrapper" key={curso.id}>
          <img src={curso.foto} alt={curso.titulo} className="curso-imagen" />

          <div className="curso-detalle">
            <div className="curso-header">
              <h3>{curso.titulo}</h3>
              <p className="curso-precio">
                ${String(curso.precio).slice(0, 2)}<span>000</span>
              </p>
            </div>

            <div className="profesional-info">
              <img
                src={curso.Profesional?.foto}
                alt="profesional"
                className="profesional-foto"
              />
              <div>
                <p className="profesional-nombre">
                   {curso.Profesional?.nombre} {curso.Profesional?.apellido}
                </p>
                <p className="profesional-profesion">{curso.Profesional?.profesion}</p>
              </div>
            </div>

            <p className="curso-descripcion">{curso.descripcion}</p>

            <div className="curso-datos">
              <div><FaClipboardCheck /> {curso.cantSesiones} sesiones</div>
              <div><FaLaptop /> {curso.modalidad}</div>
              <div><FaCalendarAlt /> Próximo inicio: {curso.fechaInicio}</div>
            </div>

            <div className="curso-beneficios">
              <div><FaClipboardCheck /> Test de aptitudes</div>
              <div><FaUserCheck /> Evaluación de intereses</div>
              <div><FaUserCheck /> Entrevista personal</div>
              <div><FaFileAlt /> Informe detallado</div>
            </div>

            <div className="curso-botones">
              <button className="boton-inscribirme">Inscribirme</button>
              <button className="boton-mas-info">Más información</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
