import React from 'react'

export function SocialLoginButton({ icon, provider, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
    >
      {icon}
      <span>Continuar con {provider}</span>
    </button>
  )
}
