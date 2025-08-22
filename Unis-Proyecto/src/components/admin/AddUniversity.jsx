import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUniversity } from "../../bd/bd.js";

export default function AddUniversity() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    publica: true,
    fechaFundacion: "",
    cantEstudiantes: "",
    cantCarreras: "",
    descripcion: "",
    logo: "",
    foto: "",
    rankingNumero: "",
    rankingTipo: "nacional",
    acreditacion: "",
    telefono: "",
    sitioWeb: "",
    email: "",
    fechaInscripcion: "",
    costoMensualPromedio: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === "number" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!form.nombre || !form.direccion) {
      setError("El nombre y la dirección son obligatorios.");
      return;
    }

    if (form.telefono.length < 8 || form.telefono.length > 13) {
      setError("El teléfono debe tener entre 8 y 13 caracteres.");
      return;
    }

    if (isNaN(form.cantEstudiantes) || isNaN(form.cantCarreras)) {
      setError("Cantidad de estudiantes y carreras deben ser números.");
      return;
    }

    if (isNaN(form.costoMensualPromedio)) {
      setError("El costo mensual debe ser un número.");
      return;
    }

    try {
      const ranking = `${form.rankingNumero} (${form.rankingTipo})`;
      const payload = { 
        ...form, 
        ranking 
      };
      delete payload.rankingNumero;
      delete payload.rankingTipo;

      await addUniversity(payload);
      navigate("/"); // Redirige al home después de crear
    } catch (err) {
      setError("Error al crear universidad.");
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Agregar Universidad</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">¿Es pública?</label>
          <select name="publica" value={form.publica} onChange={handleChange} className="border p-2 w-full">
            <option value={true}>Sí (pública)</option>
            <option value={false}>No (privada)</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Fecha de Fundación</label>
          <input type="date" name="fechaFundacion" value={form.fechaFundacion} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block font-medium">Cantidad de Estudiantes</label>
          <input type="number" name="cantEstudiantes" value={form.cantEstudiantes} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block font-medium">Cantidad de Carreras</label>
          <input type="number" name="cantCarreras" value={form.cantCarreras} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block font-medium">Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block font-medium">Logo (URL o archivo)</label>
          <input type="text" name="logo" value={form.logo} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block font-medium">Foto (URL o archivo)</label>
          <input type="text" name="foto" value={form.foto} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block font-medium">Ranking</label>
          <div className="flex gap-2">
            <input type="number" name="rankingNumero" value={form.rankingNumero} onChange={handleChange} className="border p-2 w-1/2" />
            <select name="rankingTipo" value={form.rankingTipo} onChange={handleChange} className="border p-2 w-1/2">
              <option value="nacional">Nacional</option>
              <option value="mundial">Mundial</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium">Acreditación</label>
          <input type="text" name="acreditacion" value={form.acreditacion} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block font-medium">Teléfono</label>
          <input type="text" name="telefono" value={form.telefono} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block font-medium">Sitio Web</label>
          <input type="text" name="sitioWeb" value={form.sitioWeb} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block font-medium">Fecha de Inscripción</label>
          <input type="date" name="fechaInscripcion" value={form.fechaInscripcion} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block font-medium">Costo Mensual Promedio</label>
          <input type="number" name="costoMensualPromedio" value={form.costoMensualPromedio} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
}
