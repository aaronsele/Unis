import React, { useEffect, useState } from "react";
import './UserCard.css';
import { getUsuariosAdminView } from "../../bd/bd.js";

export default function UserCard({ nombre, foto, rol }) {
  // State para los usuarios (puedes cambiarlo si usas un contexto o Redux)
  const [usuarios, setUsuarios] = useState([]);
  
  // Cargar los usuarios desde la base de datos
  useEffect(() => {
    async function loadUsers() {
      const usersData = await getUsuariosAdminView();
      setUsuarios(usersData);
    }
    
    loadUsers();
  }, []);

  // Verificar si la foto es válida (es decir, si no es null o vacía)
  const isValidPhoto = foto && foto.startsWith('http'); // Comprobamos que la URL sea válida

  // Función para manejar errores en la carga de imágenes
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/70"; // Mostrar un placeholder si la imagen no se carga
  };

  return (
    <div className="user-card">
      {isValidPhoto ? (
        <img
          src={foto}
          alt={nombre}
          className="user-card-img"
          onError={handleImageError} // Si la imagen no se carga, mostrar el placeholder
        />
      ) : (
        <img
          src="https://via.placeholder.com/70" // Mostrar el placeholder si no hay foto
          alt="default"
          className="user-card-img"
        />
      )}
      <div className="user-card-name">{nombre}</div>
      <div className="user-card-role">{rol}</div>
    </div>
  );
}
