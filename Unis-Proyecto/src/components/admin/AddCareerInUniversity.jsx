import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCareerInUniversity, getUniversidades, getCarreras } from '../../bd/bd.js';
import './AddCareerInUniversity.css';

export default function AddCareerInUniversity() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
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
    descripcion: ""
  });

  const [errors, setErrors] = useState({
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
    descripcion: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [universitiesData, careersData] = await Promise.all([
        getUniversidades(),
        getCarreras()
      ]);
      setUniversities(universitiesData);
      setCareers(careersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "duracionAnios":
        if (!value) error = "La duración es requerida";
        else if (isNaN(value) || value <= 0) error = "La duración debe ser un número positivo";
        break;
      
      case "modalidad":
        if (!value) error = "La modalidad es requerida";
        else if (!["presencial", "virtual", "híbrido"].includes(value)) {
          error = "La modalidad debe ser: presencial, virtual o híbrido";
        }
        break;
      
      case "costoMensual":
        if (!value) error = "El costo mensual es requerido";
        else if (isNaN(value) || value < 0) error = "El costo debe ser un número positivo o cero";
        break;
      
      case "telefono":
        if (!value) error = "El teléfono es requerido";
        else if (!/^\d{10,}$/.test(value.replace(/\D/g, ''))) error = "El teléfono debe tener al menos 10 dígitos";
        break;
      
      case "email":
        if (!value) error = "El email es requerido";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "El email debe tener un formato válido";
        break;
      
      case "horarioAtencion":
        if (!value) error = "El horario de atención es requerido";
        else if (!/^\d{2}:\d{2} - \d{2}:\d{2}$/.test(value)) error = "El formato debe ser HH:MM - HH:MM";
        break;
      
      case "idUniversidad":
        if (!value) error = "Debe seleccionar una universidad";
        break;
      
      case "idCarrera":
        if (!value) error = "Debe seleccionar una carrera";
        break;
      
      case "direccion":
        if (!value) error = "La dirección es requerida";
        break;
      
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Validate field on change
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Por favor, corrija los errores en el formulario");
      return;
    }

    setLoading(true);
    try {
      await addCareerInUniversity(form);
      alert("Carrera vinculada correctamente a la universidad 🚀");
      navigate("/admin/universidades");
    } catch (error) {
      let errorMessage = "Hubo un error al vincular la carrera ❌";
      
      if (error.code === '23505') {
        errorMessage = "Esta carrera ya está vinculada a esta universidad";
      } else if (error.code === '23503') {
        errorMessage = "La universidad o carrera seleccionada no existe";
      } else if (error.code === '400') {
        errorMessage = "Datos inválidos en la solicitud";
      } else if (error.code === '401') {
        errorMessage = "No autorizado para realizar esta acción";
      } else if (error.code === '404') {
        errorMessage = "Recurso no encontrado";
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    const isOptional = field === "foto" || field === "descripcion";
    
    switch (field) {
      case "idUniversidad":
        return (
          <div className="form-group">
            <label className="form-label">Universidad</label>
            <select
              name="idUniversidad"
              value={form.idUniversidad}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccionar universidad</option>
              {universities.map(uni => (
                <option key={uni.id} value={uni.id}>
                  {uni.nombre}
                </option>
              ))}
            </select>
            {errors.idUniversidad && <span className="form-error">{errors.idUniversidad}</span>}
          </div>
        );

      case "idCarrera":
        return (
          <div className="form-group">
            <label className="form-label">Carrera</label>
            <select
              name="idCarrera"
              value={form.idCarrera}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccionar carrera</option>
              {careers.map(career => (
                <option key={career.id} value={career.id}>
                  {career.nombre}
                </option>
              ))}
            </select>
            {errors.idCarrera && <span className="form-error">{errors.idCarrera}</span>}
          </div>
        );

      case "modalidad":
        return (
          <div className="form-group">
            <label className="form-label">Modalidad</label>
            <select
              name="modalidad"
              value={form.modalidad}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccionar modalidad</option>
              <option value="presencial">Presencial</option>
              <option value="virtual">Virtual</option>
              <option value="híbrido">Híbrido</option>
            </select>
            {errors.modalidad && <span className="form-error">{errors.modalidad}</span>}
          </div>
        );

      case "duracionAnios":
        return (
          <div className="form-group">
            <label className="form-label">Duración (años)</label>
            <input
              type="number"
              name="duracionAnios"
              value={form.duracionAnios}
              onChange={handleChange}
              className="form-input"
              min="1"
              step="0.5"
              required
            />
            {errors.duracionAnios && <span className="form-error">{errors.duracionAnios}</span>}
          </div>
        );

      case "costoMensual":
        return (
          <div className="form-group">
            <label className="form-label">Costo Mensual</label>
            <input
              type="number"
              name="costoMensual"
              value={form.costoMensual}
              onChange={handleChange}
              className="form-input"
              min="0"
              step="0.01"
              required
            />
            {errors.costoMensual && <span className="form-error">{errors.costoMensual}</span>}
          </div>
        );

      case "telefono":
        return (
          <div className="form-group">
            <label className="form-label">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="form-input"
              pattern="[0-9]{10,}"
              required
            />
            {errors.telefono && <span className="form-error">{errors.telefono}</span>}
          </div>
        );

      case "email":
        return (
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-input"
              required
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
        );

      case "horarioAtencion":
        return (
          <div className="form-group">
            <label className="form-label">Horario de Atención (HH:MM - HH:MM)</label>
            <input
              type="text"
              name="horarioAtencion"
              value={form.horarioAtencion}
              onChange={handleChange}
              className="form-input"
              placeholder="08:00 - 17:00"
              required
            />
            {errors.horarioAtencion && <span className="form-error">{errors.horarioAtencion}</span>}
          </div>
        );

      case "foto":
        return (
          <div className="form-group">
            <label className={`form-label ${isOptional ? 'optional' : ''}`}>URL de la Foto</label>
            <input
              type="url"
              name="foto"
              value={form.foto}
              onChange={handleChange}
              className="form-input"
              placeholder="https://ejemplo.com/foto.jpg"
            />
            {errors.foto && <span className="form-error">{errors.foto}</span>}
          </div>
        );

      case "descripcion":
        return (
          <div className="form-group">
            <label className={`form-label ${isOptional ? 'optional' : ''}`}>Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="form-textarea"
              rows="3"
            />
            {errors.descripcion && <span className="form-error">{errors.descripcion}</span>}
          </div>
        );

      default:
        return (
          <div className="form-group">
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="form-input"
              required={!isOptional}
            />
            {errors[field] && <span className="form-error">{errors[field]}</span>}
          </div>
        );
    }
  };

  return (
    <div className="add-career-university-container">
      <h2 className="add-career-university-title">Vincular Carrera a Universidad</h2>
      
      <form onSubmit={handleSubmit} className="add-career-university-form">
        {renderField("idUniversidad")}
        {renderField("idCarrera")}
        {renderField("duracionAnios")}
        {renderField("modalidad")}
        {renderField("costoMensual")}
        {renderField("direccion")}
        {renderField("telefono")}
        {renderField("email")}
        {renderField("horarioAtencion")}
        {renderField("foto")}
        {renderField("descripcion")}

        <button
          type="submit"
          disabled={loading}
          className={`submit-button ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Guardando...' : 'Vincular Carrera'}
        </button>
      </form>
    </div>
  );
}
