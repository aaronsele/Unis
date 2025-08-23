import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MailIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  FacebookIcon,
} from 'lucide-react'
import { SocialLoginButton } from './SocialLoginButton'
import { crearPerfil } from '../../bd/bd'
import { supabase } from '../../lib/supabaseClient'
import './Register.css';

export function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
    aceptarTerminos: false,
    foto: "",
    rol: 1,
    especialidad: "",
    empresa: ""
  })
  const [errores, setErrores] = useState({})
  const [mostrarContraseña, setMostrarContraseña] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const navigate = useNavigate()

  const validarFormulario = () => {
    const nuevosErrores = {}
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido'
    }
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = 'Email inválido'
    }
    if (!formData.contraseña) {
      nuevosErrores.contraseña = 'La contraseña es requerida'
    } else if (formData.contraseña.length < 6) {
      nuevosErrores.contraseña = 'La contraseña debe tener al menos 6 caracteres'
    }
    if (!formData.confirmarContraseña) {
      nuevosErrores.confirmarContraseña = 'Debes confirmar tu contraseña'
    } else if (formData.contraseña !== formData.confirmarContraseña) {
      nuevosErrores.confirmarContraseña = 'Las contraseñas no coinciden'
    }
    if (!formData.aceptarTerminos) {
      nuevosErrores.aceptarTerminos = 'Debes aceptar los términos y condiciones'
    }
    if (!formData.rol) {
      nuevosErrores.rol = 'Seleccione su rol'
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    console.log("Registrando con:", formData);

    const { contraseña, confirmarContraseña, rol, aceptarTerminos, foto, ...otrosCampos } = formData;

    let fotoURL = null;

    if (foto) {
      const fileExt = foto.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `fotos/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('perfil')
        .upload(filePath, foto);

      if (uploadError) {
        console.error("Error al subir la foto:", uploadError.message);
      } else {
        const { publicUrl } = supabase
          .storage
          .from('perfil')
          .getPublicUrl(filePath);
        fotoURL = publicUrl;
      }
    }

    const payload = {
      ...otrosCampos,
      contraseña,
      idRol: rol,
      foto: fotoURL
    };

    const data = await crearPerfil(payload);

    if (data) {
      console.log("Perfil agregado:", data);

      setFormData({
        nombre: "",
        email: "",
        contraseña: "",
        confirmarContraseña: "",
        aceptarTerminos: false,
        foto: null,
        rol: "",
        especialidad: "",
        empresa: ""
      });

      navigate("/");
    }
  };

  const manejarLoginSocial = (proveedor) => {
    console.log(`Registrarse con ${proveedor}`)
    setTimeout(() => navigate('/'), 1000)
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Crear Cuenta</h2>
          <p>Crea tu cuenta para comenzar a explorar</p>
        </div>

        <form onSubmit={manejarEnvio}>
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <div className="input-wrapper">
              <UserIcon />
              <input
                id="nombre"
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="input"
                placeholder="Tu nombre completo"
              />
            </div>
            {errores.nombre && (
              <p className="error-text">
                <AlertCircleIcon className="w-4 h-4" />
                {errores.nombre}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-wrapper">
              <MailIcon />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input"
                placeholder="ejemplo@correo.com"
              />
            </div>
            {errores.email && (
              <p className="error-text">
                <AlertCircleIcon className="w-4 h-4" />
                {errores.email}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div className="form-group">
            <label htmlFor="contraseña" className="form-label">Contraseña</label>
            <div className="input-wrapper">
              <LockIcon />
              <input
                id="contraseña"
                type={mostrarContraseña ? 'text' : 'password'}
                value={formData.contraseña}
                onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
                className="input"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setMostrarContraseña(!mostrarContraseña)}
              >
                {mostrarContraseña ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errores.contraseña && (
              <p className="error-text">
                <AlertCircleIcon className="w-4 h-4" />
                {errores.contraseña}
              </p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className="form-group">
            <label htmlFor="confirmar" className="form-label">Confirmar Contraseña</label>
            <div className="input-wrapper">
              <LockIcon />
              <input
                id="confirmar"
                type={mostrarConfirmacion ? 'text' : 'password'}
                value={formData.confirmarContraseña}
                onChange={(e) =>
                  setFormData({ ...formData, confirmarContraseña: e.target.value })
                }
                className="input"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setMostrarConfirmacion(!mostrarConfirmacion)}
              >
                {mostrarConfirmacion ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errores.confirmarContraseña && (
              <p className="error-text">
                <AlertCircleIcon className="w-4 h-4" />
                {errores.confirmarContraseña}
              </p>
            )}
          </div>

          {/* Rol */}
          <div className="form-group">
            <label htmlFor="rol" className="form-label">Rol</label>
            <select
              id="rol"
              value={formData.rol}
              onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
              className="select"
            >
              <option value={1}>Estudiante</option>
              <option value={2}>Profesional</option>
            </select>
            {errores.rol && (
              <p className="error-text">
                <AlertCircleIcon className="w-4 h-4" />
                {errores.rol}
              </p>
            )}
          </div>

          {/* Inputs extra si es profesional */}
          {formData.rol === "2" && (
            <>
              <div className="form-group">
                <label htmlFor="especialidad" className="form-label">Especialidad</label>
                <input
                  id="especialidad"
                  type="text"
                  value={formData.especialidad}
                  onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                  className="input"
                  placeholder="Ej: Ingeniería, Medicina, Diseño..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="empresa" className="form-label">Empresa</label>
                <input
                  id="empresa"
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="input"
                  placeholder="Ej: Google, Hospital Central..."
                />
              </div>
            </>
          )}

          {/* Términos y condiciones */}
          <div className="terms">
            <input
              id="terminos"
              type="checkbox"
              checked={formData.aceptarTerminos}
              onChange={(e) =>
                setFormData({ ...formData, aceptarTerminos: e.target.checked })
              }
            />
            <label htmlFor="terminos">
              Acepto los{' '}
              <a href="#">Términos y Condiciones</a>
            </label>
          </div>
          {errores.aceptarTerminos && (
            <p className="error-text">
              <AlertCircleIcon className="w-4 h-4" />
              {errores.aceptarTerminos}
            </p>
          )}

          <button type="submit" className="submit-btn">
            Registrarse
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">o continúa con</span>
          <div className="divider-line" />
        </div>

        {/* Social login */}
        <div className="social-buttons">
          <SocialLoginButton
            icon={<div className="w-5 h-5">🟢</div>}
            provider="Google"
            onClick={() => manejarLoginSocial('Google')}
          />
          <SocialLoginButton
            icon={<FacebookIcon className="w-5 h-5 text-blue-600" />}
            provider="Facebook"
            onClick={() => manejarLoginSocial('Facebook')}
          />
        </div>

        {/* Footer */}
        <div className="register-footer">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/profile">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
