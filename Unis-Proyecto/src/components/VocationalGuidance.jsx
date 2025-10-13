import React, { useEffect, useState } from 'react';
import '@splinetool/viewer';
import './VocationalGuidance.css';
import { VocationalCard } from '../components/VocationalCard';
import {VocationalChat}  from '../components/VocationalChat';
import { addCursoOV } from '../bd/bd';
import { supabase } from '../lib/supabaseClient';

export function VocationalGuidance() {
  const [perfil, setPerfil] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    idProfesional: '',
    precio: '',
    foto: '',
    titulo: '',
    descripcion: '',
    cantSesiones: '',
    modalidad: '',
    fechaInicio: '',
  });

  // traer perfil logueado
  useEffect(() => {
    const fetchPerfil = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('Perfil')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (!error) {
          setPerfil(data);
          setFormData(f => ({ ...f, idProfesional: data.id }));
        }
      }
    };
    fetchPerfil();
  }, []);

  const handleChange = (e) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const curso = {
        idProfesional: perfil.id,
        precio: formData.precio,
        foto: formData.foto,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        cantSesiones: formData.cantSesiones,
        modalidad: formData.modalidad,
        fechaInicio: formData.fechaInicio,
      };
      await addCursoOV(curso);
      alert('Curso agregado con éxito 🚀');
      setShowForm(false);
      setFormData({
        idProfesional: perfil?.id || '',
        precio: '',
        foto: '',
        titulo: '',
        descripcion: '',
        cantSesiones: '',
        modalidad: '',
        fechaInicio: '',
      });
    } catch (err) {
      console.error("Error al guardar curso:", err);
      alert('Error al agregar curso');
    }
  };

  const esProfesional = perfil?.especialidad && perfil.especialidad.trim() !== '';

  return (
    <div className="p-4">
      <h1>Orientación Vocacional</h1>

      <div className="layout-orientacion">
        <VocationalCard />
        <div className="roboAmigo">
          <spline-viewer url="https://prod.spline.design/B8O-mb1DKzVohPvS/scene.splinecode"></spline-viewer>
        </div>
        <VocationalChat />
      </div>

      {/* Botón abajo */}
      {esProfesional && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="boton-agregar-curso"
        >
          {showForm ? 'Cerrar formulario' : 'Agregar curso'}
        </button>
      )}

      {/* Formulario debajo del botón */}
      {showForm && (
        <form onSubmit={handleSubmit} className="form-agregar-curso">
          <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} />
          <input type="text" name="foto" placeholder="URL de la foto" value={formData.foto} onChange={handleChange} />
          <input type="text" name="titulo" placeholder="Título" value={formData.titulo} onChange={handleChange} />
          <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} />
          <input type="number" name="cantSesiones" placeholder="Cantidad de sesiones" value={formData.cantSesiones} onChange={handleChange} />
          <input type="text" name="modalidad" placeholder="Modalidad (presencial/virtual)" value={formData.modalidad} onChange={handleChange} />
          <input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} />
          <button type="submit" className="boton-guardar-curso">Guardar curso</button>
        </form>
      )}
    </div>
  );
}
