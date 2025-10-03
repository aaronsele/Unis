import React, { useEffect, useState } from 'react';
import '@splinetool/viewer';
import './VocationalGuidance.css';
import { VocationalCard } from '../components/VocationalCard';
import { VocationalChat } from '../components/VocationalChat';
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
      console.log("Usuario logueado:", user);

      if (user) {
        const { data, error } = await supabase
          .from('Perfil')
          .select('*')
          .eq('user_id', user.id) // buscamos el perfil con el user_id de auth
          .single();

        if (error) {
          console.error("Error trayendo perfil:", error);
        } else {
          console.log("Perfil encontrado:", data);
          setPerfil(data);

          // ⚠️ guardamos el id de Perfil, no el user_id
          setFormData(f => ({ ...f, idProfesional: data.id }));
        }
      }
    };
    fetchPerfil();
  }, []);

  const handleChange = (e) => {
    setFormData(f => ({
      ...f,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const curso = {
        idProfesional: perfil.id,   // 👈 ahora usamos el ID del perfil
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
  console.log("Es profesional?", esProfesional, perfil);

  return (
    <div className="p-4">
      <h1>Orientación Vocacional</h1>

      {esProfesional && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
        >
          {showForm ? 'Cerrar formulario' : 'Agregar curso'}
        </button>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="border p-4 mb-6 rounded bg-gray-50 space-y-2"
        >
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="foto"
            placeholder="URL de la foto"
            value={formData.foto}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="number"
            name="cantSesiones"
            placeholder="Cantidad de sesiones"
            value={formData.cantSesiones}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="modalidad"
            placeholder="Modalidad (presencial/virtual)"
            value={formData.modalidad}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="date"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Guardar curso
          </button>
        </form>
      )}

      <div className="layout-orientacion">
        <VocationalCard />
        <div className="roboAmigo">
          <spline-viewer url="https://prod.spline.design/B8O-mb1DKzVohPvS/scene.splinecode"></spline-viewer>
        </div>
        <VocationalChat />
      </div>
    </div>
  );
}
