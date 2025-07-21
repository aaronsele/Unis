import { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { getPerfilByUserId } from '../bd/bd.js';

export function usePerfil() {
  const { usuario } = useUser();
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    if (usuario) {
      getPerfilByUserId(usuario.id).then(setPerfil);
    } else {
      setPerfil(null); // limpiar perfil al desloguear
    }
  }, [usuario]);

  return { perfil, setPerfil };
}
