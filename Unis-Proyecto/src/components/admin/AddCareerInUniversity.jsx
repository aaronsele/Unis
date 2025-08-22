import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCareerInUniversity } from '../../bd/bd.js';

export default function AddCareerInUniversity() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    duracionAnios: "",
    modalidad: "",
    costoMensual: "",
    direccion: "",
    telefono: "",
    email: "",
    horarioAtencion: "",
    idUniversidad: "",
    idCarrera: "",
    foto: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCareerInUniversity(form);
      alert("Carrera agregada correctamente 🚀");
      navigate("/admin/universidades");
    } catch (error) {
      alert("Hubo un error al agregar la carrera ❌");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Vincular Carrera a una Universidad</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-medium capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="border rounded-lg p-2"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
