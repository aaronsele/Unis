
import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePerfil } from '../contexts/usePerfil'; 

export function ProtectedAdminRoute({ children }) {
  const { perfil } = usePerfil();

  if (perfil === null) {
    return <p>Cargando permisos...</p>;
  }

  if (!perfil?.esAdmin) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
