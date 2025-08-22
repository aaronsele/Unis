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
  const [fieldErrors, setFieldErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "nombre":
        if (!value.trim()) error = "El nombre es obligatorio";
        break;
      case "direccion":
        if (!value.trim()) error = "La dirección es obligatoria";
        break;
      case "telefono":
        if (value && (value.length < 8 || value.length > 13)) {
          error = "El teléfono debe tener entre 8 y 13 caracteres";
        }
        break;
      case "cantEstudiantes":
      case "cantCarreras":
      case "costoMensualPromedio":
        if (value && isNaN(Number(value))) {
          error = "Debe ser un número";
        }
        break;
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Formato de email inválido";
        }
        break;
      case "sitioWeb":
        if (value && !/^https?:\/\/.+\..+/.test(value)) {
          error = "Formato de URL inválido";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;
    setForm({ ...form, [name]: newValue });
    const error = validateField(name, newValue);
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.direccion) {
      setError("El nombre y la dirección son obligatorios.");
      return;
    }
    try {
      const ranking = `${form.rankingNumero} (${form.rankingTipo})`;
      const payload = { ...form, ranking };
      delete payload.rankingNumero;
      delete payload.rankingTipo;

      await addUniversity(payload);
      navigate("/");
    } catch (err) {
      setError("Error al crear universidad.");
      console.error(err);
    }
  };

  return (
    <div className="add-career-university-container">
      <h2 className="add-career-university-title">Agregar Universidad</h2>
      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit} className="add-career-university-form">

        {/* Nombre */}
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="form-input" required />
          {fieldErrors.nombre && <p className="form-error">{fieldErrors.nombre}</p>}
        </div>

        {/* Dirección */}
        <div className="form-group">
          <label className="form-label">Dirección</label>
          <input type="text" name="direccion" value={form.direccion} onChange={handleChange} className="form-input" required />
          {fieldErrors.direccion && <p className="form-error">{fieldErrors.direccion}</p>}
        </div>

        {/* Pública */}
        <div className="form-group">
          <label className="form-label">¿Es pública?</label>
          <select name="publica" value={form.publica} onChange={handleChange} className="form-select">
            <option value={true}>Sí (pública)</option>
            <option value={false}>No (privada)</option>
          </select>
        </div>

        {/* Fecha fundación */}
        <div className="form-group">
          <label className="form-label">Fecha de Fundación</label>
          <input type="date" name="fechaFundacion" value={form.fechaFundacion} onChange={handleChange} className="form-input" />
        </div>

        {/* Cantidades */}
        <div className="form-group">
          <label className="form-label">Cantidad de Estudiantes</label>
          <input type="number" name="cantEstudiantes" value={form.cantEstudiantes} onChange={handleChange} className="form-input" />
          {fieldErrors.cantEstudiantes && <p className="form-error">{fieldErrors.cantEstudiantes}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Cantidad de Carreras</label>
          <input type="number" name="cantCarreras" value={form.cantCarreras} onChange={handleChange} className="form-input" />
          {fieldErrors.cantCarreras && <p className="form-error">{fieldErrors.cantCarreras}</p>}
        </div>

        {/* Descripción */}
        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="form-textarea" />
        </div>

        {/* Logo */}
        <div className="form-group">
          <label className="form-label">Logo (URL)</label>
          <input type="text" name="logo" value={form.logo} onChange={handleChange} className="form-input" />
        </div>

        {/* Foto */}
        <div className="form-group">
          <label className="form-label">Foto (URL)</label>
          <input type="text" name="foto" value={form.foto} onChange={handleChange} className="form-input" />
        </div>

        {/* Ranking */}
        <div className="form-group">
          <label className="form-label">Ranking</label>
          <div className="flex gap-2">
            <input type="number" name="rankingNumero" value={form.rankingNumero} onChange={handleChange} className="form-input" />
            <select name="rankingTipo" value={form.rankingTipo} onChange={handleChange} className="form-select">
              <option value="nacional">Nacional</option>
              <option value="mundial">Mundial</option>
            </select>
          </div>
        </div>

        {/* Acreditación */}
        <div className="form-group">
          <label className="form-label">Acreditación</label>
          <input type="text" name="acreditacion" value={form.acreditacion} onChange={handleChange} className="form-input" />
        </div>

        {/* Teléfono */}
        <div className="form-group">
          <label className="form-label">Teléfono</label>
          <input type="text" name="telefono" value={form.telefono} onChange={handleChange} className="form-input" />
          {fieldErrors.telefono && <p className="form-error">{fieldErrors.telefono}</p>}
        </div>

        {/* Web */}
        <div className="form-group">
          <label className="form-label">Sitio Web</label>
          <input type="text" name="sitioWeb" value={form.sitioWeb} onChange={handleChange} className="form-input" />
          {fieldErrors.sitioWeb && <p className="form-error">{fieldErrors.sitioWeb}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="form-input" />
          {fieldErrors.email && <p className="form-error">{fieldErrors.email}</p>}
        </div>

        {/* Fecha inscripción */}
        <div className="form-group">
          <label className="form-label">Fecha de Inscripción</label>
          <input type="date" name="fechaInscripcion" value={form.fechaInscripcion} onChange={handleChange} className="form-input" />
        </div>

        {/* Costo */}
        <div className="form-group">
          <label className="form-label">Costo Mensual Promedio</label>
          <input type="number" name="costoMensualPromedio" value={form.costoMensualPromedio} onChange={handleChange} className="form-input" />
          {fieldErrors.costoMensualPromedio && <p className="form-error">{fieldErrors.costoMensualPromedio}</p>}
        </div>

        {/* Botón */}
        <button type="submit" className="submit-button">
          Guardar
        </button>
      </form>
    </div>
  );
}
