import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  FacebookIcon,
} from 'lucide-react'
import { SocialLoginButton } from './SocialLoginButton'

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const validarFormulario = () => {
    const nuevosErrores = {}
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = 'Email inválido'
    }
    if (!formData.password) {
      nuevosErrores.password = 'La contraseña es requerida'
    }
    setErrors(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    if (validarFormulario()) {
      console.log('Iniciar sesión con:', formData)
      navigate('/')
    }
  }

  const manejarLoginSocial = (proveedor) => {
    console.log(`Iniciar sesión con ${proveedor}`)
    setTimeout(() => navigate('/'), 1000)
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-md rounded-lg border border-gray-200 p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: '#2F2F2F' }}>
            Iniciar Sesión
          </h2>
          <p className="text-gray-600 mt-1">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>
        <form onSubmit={manejarEnvio} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="bxlock text-sm font-medium text-gray-700 mb-1"
            >
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ejemplo@correo.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircleIcon className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>
          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircleIcon className="w-4 h-4 mr-1" />
                {errors.password}
              </p>
            )}
          </div>
          {/* Recordarme */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Recordarme
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium hover:text-blue-700"
                style={{ color: '#2560B9' }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          {/* Botón enviar */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: '#2560B9' }}
          >
            Iniciar Sesión
          </button>
        </form>
        {/* Separador */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">
            o continúa con
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        {/* Botones sociales */}
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
        {/* Link a registro */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/auth/register"
              className="font-medium hover:text-blue-700"
              style={{ color: '#2560B9' }}
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
