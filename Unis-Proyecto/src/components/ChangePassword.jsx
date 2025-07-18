import React, { useState } from 'react'
import { auth } from './auth/auth'

export function ChangePassword() {
  const { user, updatePassword } = auth()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  if (!user) return <p>Debés iniciar sesión para cambiar la contraseña.</p>

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    const { error } = await updatePassword(newPassword)
    if (error) {
      setError(error.message)
      setMessage(null)
    } else {
      setMessage('Contraseña cambiada con éxito')
      setError(null)
    }
  }

  return (
    <form onSubmit={handleChangePassword}>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar nueva contraseña"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button type="submit">Cambiar contraseña</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </form>
  )
}
