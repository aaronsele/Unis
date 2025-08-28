import React, { useEffect, useState } from 'react';
import { insertCarrera, getCarreras } from '../../bd/bd.js';
import './AddCareer.css';

export function AddCareer() {
  const [nombre, setNombre] = useState('');
  const [duracionGenericaEnAnios, setDuracionGenericaEnAnios] = useState('');
  const [area, setArea] = useState('');
  const [nivelDemanda, setNivelDemanda] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState('');
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const crr = await getCarreras();
        setCarreras(crr || []);
      } catch (err) {
        console.error("Error obteniendo carreras:", err);
      }
    };
    fetchCarreras();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!nombre || !duracionGenericaEnAnios || !area || !nivelDemanda || !descripcion) {
      setError('Completa todos los campos.');
      return;
    }

    const duracionNum = parseInt(duracionGenericaEnAnios);
    if (isNaN(duracionNum) || duracionNum <= 0) {
      setError('Duración tiene que ser un número entero positivo, no cualquier cosa.');
      return;
    }

    const carreraExistente = carreras.find(c => c.nombre.toLowerCase() === nombre.toLowerCase());
    if (carreraExistente) {
      setError('Ya existe una carrera con ese nombre.');
      return;
    }

    const nuevaCarrera = {
      nombre,
      duracionGenericaEnAnios: duracionNum,
      area,
      nivelDemanda,
      descripcion,
      foto,
    };

    try {
      const result = await insertCarrera(nuevaCarrera);

      if (result) {
        setSuccessMsg('✅ CARRERA AGREGADA, FELICIDADES 🎉');

        // limpiar inputs
        setNombre('');
        setDuracionGenericaEnAnios('');
        setArea('');
        setNivelDemanda('');
        setDescripcion('');
        setFoto('');
      } else {
        setError('✅ CARRERA AGREGADA, FELICIDADES 🎉');
      }
    } catch (err) {
      console.error("Error en insertCarrera:", err);
      setError('Error inesperado al agregar la carrera ⚠️');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Agregar Nueva Carrera</h2>

      {error && <p className="error-msg">{error}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="career-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Duración Genérica (Años):</label>
          <input
            type="number"
            min="1"
            value={duracionGenericaEnAnios}
            onChange={e => setDuracionGenericaEnAnios(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Área:</label>
          <select value={area} onChange={e => setArea(e.target.value)} required>
            <option value="">Selecciona un área</option>
            <option value="TECNOLOGIA">Tecnología</option>
            <option value="CONSTRUCCIONES">Construcciones</option>
            <option value="INGENIERIA">Ingeniería</option>
            <option value="CIENCIAS DE LA SALUD">Ciencias de la Salud</option>
            <option value="COMUNICACION Y DISEÑO">Comunicación y Diseño</option>
          </select>
        </div>

        <div className="form-group">
          <label>Nivel de Demanda:</label>
          <select
            value={nivelDemanda}
            onChange={e => setNivelDemanda(e.target.value)}
            required
          >
            <option value="">Selecciona el nivel de demanda</option>
            <option value="BAJO">Bajo</option>
            <option value="MEDIO">Medio</option>
            <option value="ALTO">Alto</option>
          </select>
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Foto (URL):</label>
          <input
            type="text"
            value={foto}
            onChange={e => setFoto(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">Agregar Carrera</button>
      </form>
    </div>
  );
}
