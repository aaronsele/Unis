import React, { useEffect, useState } from 'react';
import { getCursosOV, deleteCursoOV, crearSuscripcion, eliminarSuscripcion, getEstudiantesPorCurso } from '../bd/bd';
import './VocationalCard.css';
import { FaCalendarAlt, FaLaptop, FaClipboardCheck, FaUserCheck, FaFileAlt } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../lib/supabaseClient';

export function VocationalCard() {
  const [cursos, setCursos] = useState([]);
  const [perfil, setPerfil] = useState(null);
  const [suscripciones, setSuscripciones] = useState([]);
  const [showEstudiantes, setShowEstudiantes] = useState(false);
  const [estudiantesCurso, setEstudiantesCurso] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const { usuario } = useUser();

  // Traer cursos
  useEffect(() => {
    async function fetchCursos() {
      const data = await getCursosOV();
      setCursos(data);
    }
    fetchCursos();
  }, []);

  // Traer perfil completo del usuario logueado
  useEffect(() => {
    const fetchPerfil = async () => {
      if (!usuario) return;
      const { data, error } = await supabase
        .from('Perfil')
        .select('*')
        .eq('user_id', usuario.id)
        .single();

      if (error) console.error("Error trayendo perfil:", error);
      else setPerfil(data);
    };
    fetchPerfil();
  }, [usuario]);

  // Traer suscripciones del estudiante logueado
  useEffect(() => {
    const fetchSuscripciones = async () => {
      if (!perfil?.id || !perfil?.secundario) return;
      const { data, error } = await supabase
        .from('Suscripciones')
        .select('id_curso')
        .eq('id_estudiante', perfil.id);

      if (error) console.error("Error trayendo suscripciones:", error);
      else setSuscripciones(data.map(s => s.id_curso));
    };
    fetchSuscripciones();
  }, [perfil]);

  // Eliminar curso (profesional dueño)
  const handleDelete = async (cursoId) => {
    const confirm = window.confirm("¿Seguro querés eliminar este curso?");
    if (!confirm) return;
    try {
      await deleteCursoOV(cursoId);
      setCursos(cursos.filter(c => c.id !== cursoId));
      alert('Curso eliminado ✅');
    } catch (err) {
      console.error("Error eliminando curso:", err);
      alert('No se pudo eliminar el curso');
    }
  };

  // Suscribirse
  const handleSuscribirse = async (cursoId) => {
    try {
      await crearSuscripcion(perfil.id, cursoId);
      setSuscripciones(prev => [...prev, cursoId]);
    } catch (err) {
      console.error("Error al suscribirse:", err);
      alert('No se pudo inscribir');
    }
  };

  // Desuscribirse
  const handleDesuscribirse = async (cursoId) => {
    try {
      await eliminarSuscripcion(perfil.id, cursoId);
      setSuscripciones(prev => prev.filter(id => id !== cursoId));
    } catch (err) {
      console.error("Error al desuscribirse:", err);
      alert('No se pudo desuscribir');
    }
  };

  // Ver estudiantes inscriptos
  const handleVerEstudiantes = async (curso) => {
    try {
      const estudiantes = await getEstudiantesPorCurso(curso.id);
      setCursoSeleccionado(curso);
      setEstudiantesCurso(estudiantes);
      setShowEstudiantes(true);
    } catch (err) {
      console.error("Error trayendo estudiantes:", err);
      alert("No se pudo traer los estudiantes");
    }
  };

  return (
    <div className="cursos-container">
      {cursos.map((curso) => {
        const esDueño = perfil?.especialidad?.trim() !== '' && curso.idProfesional === perfil?.id;
        const esEstudiante = perfil?.secundario?.trim() !== '';
        const estaSuscripto = suscripciones.includes(curso.id);

        return (
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
                <div><FaCalendarAlt /> Inicio: {curso.fechaInicio}</div>
              </div>

              <div className="curso-beneficios">
                <div><FaClipboardCheck /> Test de aptitudes</div>
                <div><FaUserCheck /> Evaluación de intereses</div>
                <div><FaUserCheck /> Entrevista personal</div>
                <div><FaFileAlt /> Informe detallado</div>
              </div>

              <div className="curso-botones">
                {esEstudiante && !estaSuscripto && (
                  <button
                    className="boton-inscribirme"
                    onClick={() => handleSuscribirse(curso.id)}
                  >
                    Inscribirme
                  </button>
                )}
                {esEstudiante && estaSuscripto && (
                  <>
                    <button className="boton-inscripto">Inscripto ✅</button>
                    <button
                      className="boton-desuscribirse"
                      onClick={() => handleDesuscribirse(curso.id)}
                    >
                      Desuscribirse
                    </button>
                  </>
                )}
                <button className="boton-mas-info">Más información</button>
                {esDueño && (
                  <>
                    <button
                      className="boton-eliminar"
                      onClick={() => handleDelete(curso.id)}
                    >
                      Eliminar curso
                    </button>
                    <button
                      className="boton-inscribirme"
                      onClick={() => handleVerEstudiantes(curso)}
                    >
                      Ver estudiantes
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal de estudiantes */}
      {showEstudiantes && (
        <div className="modal">
          <div className="modal-content">
            <h3>Estudiantes inscriptos en {cursoSeleccionado?.titulo}</h3>
            <button className="close-btn" onClick={() => setShowEstudiantes(false)}>Cerrar</button>
            <ul>
              {estudiantesCurso.length === 0 && <li>No hay estudiantes inscriptos</li>}
              {estudiantesCurso.map(est => (
                <li key={est.id} style={{display: 'flex', alignItems: 'center', gap: '10px', margin: '6px 0'}}>
                  <img src={est.foto} alt={est.nombre} style={{width: '40px', height: '40px', borderRadius: '50%'}} />
                  <span>{est.nombre} {est.apellido} - {est.email}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
