import React, { useState } from 'react';
import { insertCarrera } from '../../bd/bd.js';

export function AddCareer() {
  const [nombre, setNombre] = useState('');
  const [duracionGenericaEnAnios, setDuracionGenericaEnAnios] = useState('');
  const [area, setArea] = useState('');
  const [nivelDemanda, setNivelDemanda] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState('');
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!nombre || !duracionGenericaEnAnios || !area || !nivelDemanda || !descripcion) {
      setError('Completa todos los campos, gordo.');
      return;
    }

    const duracionNum = parseInt(duracionGenericaEnAnios);
    if (isNaN(duracionNum) || duracionNum <= 0) {
      setError('Duración tiene que ser un número entero positivo, no cualquier cosa.');
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

    const result = await insertCarrera(nuevaCarrera);

    if (result) {
      setSuccessMsg('Carrera agregada con éxito, como la leche que le encanta a tu tío.');
      setNombre('');
      setDuracionGenericaEnAnios('');
      setArea('');
      setNivelDemanda('');
      setDescripcion('');
      setFoto('');
    } else {
      setError('Error al agregar la carrera. Revisa la conexión o la base, gil.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '20px auto', padding: 20, border: '1px solid #ddd' }}>
      <h2>Agregar Nueva Carrera (Admin Mode ON)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br />
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Duración Genérica (Años):</label><br />
          <input type="number" min="1" value={duracionGenericaEnAnios} onChange={e => setDuracionGenericaEnAnios(e.target.value)} required />
        </div>
        <div>
          <label>Área:</label><br />
          <input type="text" value={area} onChange={e => setArea(e.target.value)} required />
        </div>
        <div>
          <label>Nivel de Demanda:</label><br />
          <input type="text" value={nivelDemanda} onChange={e => setNivelDemanda(e.target.value)} required />
        </div>
        <div>
          <label>Descripción:</label><br />
          <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
        </div>
        <div>
          <label>Foto (URL):</label><br />
          <input type="text" value={foto} onChange={e => setFoto(e.target.value)} />
        </div>
        <button type="submit" style={{ marginTop: 10 }}>Agregar Carrera</button>
      </form>
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
    </div>
  );
}


