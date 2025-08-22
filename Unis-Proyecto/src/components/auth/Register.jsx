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


export function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
    aceptarTerminos: false,
    foto:"",
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
    if(!rol){
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

  // 1️⃣ Subir la foto si hay archivo
  if (foto) {
    const fileExt = foto.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `fotos/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('perfil') // nombre del bucket
      .upload(filePath, foto);

    if (uploadError) {
      console.error("Error al subir la foto:", uploadError.message);
    } else {
      // Obtener URL pública
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
    <div className="w-full max-w-md">
      <div className="bg-white shadow-md rounded-lg border border-gray-200 p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: '#2F2F2F' }}>
            Crear Cuenta
          </h2>
          <p className="text-gray-600 mt-1">
            Crea tu cuenta para comenzar a explorar
          </p>
        </div>
        <form onSubmit={manejarEnvio} className="space-y-6">
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="nombre"
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tu nombre completo"
              />
            </div>
            {errores.nombre && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircleIcon className="w-4 h-4 mr-1" />
                {errores.nombre}
              </p>
            )}
          </div>

          {/* Foto de perfil
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto de perfil
              </label>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const file = e.dataTransfer.files[0]
                  if (file && file.type.startsWith('image/')) {
                    setFormData({ ...formData, foto: file })
                  }
                }}
                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500"
                onClick={() => document.getElementById('fotoInput').click()}
              >
                {formData.foto ? (
                  <img
                    src={URL.createObjectURL(formData.foto)}
                    alt="Preview"
                    className="h-28 object-contain"
                  />
                ) : (
                  <span className="text-gray-400">Arrastra tu foto aquí o haz click</span>
                )}
              </div>

              <input
                type="file"
                id="fotoInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setFormData({ ...formData, foto: file })
                }}
              />
            </div> */}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ejemplo@correo.com"
              />
            </div>
            {errores.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircleIcon className="w-4 h-4 mr-1" />
                {errores.email}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="contraseña"
                type={mostrarContraseña ? 'text' : 'password'}
                value={formData.contraseña}
                onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setMostrarContraseña(!mostrarContraseña)}
              >
                {mostrarContraseña ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errores.contraseña && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircleIcon className="w-4 h-4 mr-1" />
                {errores.contraseña}
              </p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="confirmar" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmar"
                type={mostrarConfirmacion ? 'text' : 'password'}
                value={formData.confirmarContraseña}
                onChange={(e) =>
                  setFormData({ ...formData, confirmarContraseña: e.target.value })
                }
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setMostrarConfirmacion(!mostrarConfirmacion)}
              >
                {mostrarConfirmacion ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errores.confirmarContraseña && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircleIcon className="w-4 h-4 mr-1" />
                {errores.confirmarContraseña}
              </p>
            )}
          </div>
{/* Rol */}
          <div>
            <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <div className="relative">
              <select
                id="rol"
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>Estudiante</option>
                <option value={2}>Profesional</option>
              </select>
            </div>
            {errores.rol && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircleIcon className="w-4 h-4 mr-1" />
                {errores.rol}
              </p>
            )}
          </div>

        {/* Inputs extra solo si es profesional */}
        {formData.rol === "2" && (
          <>
            {/* Especialidad */}
            <div>
              <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700 mb-1">
                Especialidad
              </label>
              <input
                id="especialidad"
                type="text"
                value={formData.especialidad}
                onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Ingeniería, Medicina, Diseño..."
              />
              {errores.especialidad && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircleIcon className="w-4 h-4 mr-1" />
                  {errores.especialidad}
                </p>
              )}
            </div>

              {/* Empresa */}
              <div>
                <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa
                </label>
                <input
                  id="empresa"
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Google, Hospital Central..."
                />
                {errores.empresa && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircleIcon className="w-4 h-4 mr-1" />
                    {errores.empresa}
                  </p>
                )}
              </div>
              </>
            )}

          {/* Términos y condiciones */}
          <div className="flex items-start">
            <input
              id="terminos"
              type="checkbox"
              checked={formData.aceptarTerminos}
              onChange={(e) =>
                setFormData({ ...formData, aceptarTerminos: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terminos" className="ml-2 text-sm text-gray-700">
              Acepto los{' '}
              <a href="#" className="underline" style={{ color: '#2560B9' }}>
                Términos y Condiciones
              </a>
            </label>
          </div>
          {errores.aceptarTerminos && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircleIcon className="w-4 h-4 mr-1" />
              {errores.aceptarTerminos}
            </p>
          )}

          {/* Botón */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: '#2560B9' }}
          >
            Registrarse
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-200" />
          <span className="flex-shrink mx-4 text-gray-400 text-sm">o continúa con</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Social login */}
        <div className="space-y-3">
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

        {/* Ya tienes cuenta */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/auth/login"
              className="font-medium hover:text-blue-700"
              style={{ color: '#2560B9' }}
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
