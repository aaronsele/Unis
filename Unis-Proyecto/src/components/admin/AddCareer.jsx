import React, { useState } from 'react';
import { insertCarrera } from '../../bd/bd.js';

export function AddCareer() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [duracion, setDuracion] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [tituloOtorgado, setTituloOtorgado] = useState('');
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!nombre || !descripcion) {
      setError('Completa los campos obligatorios.');
      return;
    }

    const nuevaCarrera = {
      nombre,
      descripcion,
      duracion,
      modalidad,
      tituloOtorgado,
    };

    const result = await insertCarrera(nuevaCarrera);

    if (result) {
      setSuccessMsg('Carrera agregada con éxito, como la leche que le encanta a tu tío.');
      setNombre('');
      setDescripcion('');
      setDuracion('');
      setModalidad('');
      setTituloOtorgado('');
    } else {
      setError('Error al agregar la carrera. Revisa la conexión o la base.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ddd' }}>
      <h2>Agregar Nueva Carrera (Admin Mode ON)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la Carrera:</label><br />
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Descripción:</label><br />
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </div>
        <div>
          <label>Duración:</label><br />
          <input type="text" value={duracion} onChange={(e) => setDuracion(e.target.value)} />
        </div>
        <div>
          <label>Modalidad:</label><br />
          <input type="text" value={modalidad} onChange={(e) => setModalidad(e.target.value)} />
        </div>
        <div>
          <label>Título Otorgado:</label><br />
          <input type="text" value={tituloOtorgado} onChange={(e) => setTituloOtorgado(e.target.value)} />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Agregar Carrera</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
    </div>
  );
}

