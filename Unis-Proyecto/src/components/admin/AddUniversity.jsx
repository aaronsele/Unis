import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUniversity } from "../../bd/bd.js";
import './AddUniversity.css';

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
    <div className="add-university-container">
      <h2 className="add-university-title">Agregar Universidad</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      <form onSubmit={handleSubmit} className="add-university-form">
        
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">¿Es pública?</label>
          <select name="publica" value={form.publica} onChange={handleChange} className="form-select">
            <option value={true}>Sí (pública)</option>
            <option value={false}>No (privada)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Fecha de Fundación</label>
          <input type="date" name="fechaFundacion" value={form.fechaFundacion} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Cantidad de Estudiantes</label>
          <input type="number" name="cantEstudiantes" value={form.cantEstudiantes} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Cantidad de Carreras</label>
          <input type="number" name="cantCarreras" value={form.cantCarreras} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="form-textarea" />
        </div>

        <div className="form-group">
          <label className="form-label">Logo (URL o archivo)</label>
          <input type="text" name="logo" value={form.logo} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Foto (URL o archivo)</label>
          <input type="text" name="foto" value={form.foto} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Ranking</label>
          <div className="flex gap-2">
            <input type="number" name="rankingNumero" value={form.rankingNumero} onChange={handleChange} className="form-input w-1/2" />
            <select name="rankingTipo" value={form.rankingTipo} onChange={handleChange} className="form-select w-1/2">
              <option value="nacional">Nacional</option>
              <option value="mundial">Mundial</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Acreditación</label>
          <input type="text" name="acreditacion" value={form.acreditacion} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Teléfono</label>
          <input type="text" name="telefono" value={form.telefono} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Sitio Web</label>
          <input type="text" name="sitioWeb" value={form.sitioWeb} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Fecha de Inscripción</label>
          <input type="date" name="fechaInscripcion" value={form.fechaInscripcion} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Costo Mensual Promedio</label>
          <input type="number" name="costoMensualPromedio" value={form.costoMensualPromedio} onChange={handleChange} className="form-input" />
        </div>

        <button type="submit" className="submit-button">
          Guardar
        </button>
      </form>
    </div>
  );
}
