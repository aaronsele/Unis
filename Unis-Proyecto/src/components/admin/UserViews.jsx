import React, { useEffect, useState } from "react";
import { getUsuariosAdminView } from "../../bd/bd.js";
import UserCard from "../../components/admin/UserCard.jsx";
import { ProtectedAdminRoute } from "../../components/ProtectedAdminRoute";
import "./UserViews.css";

function UserViewsContent() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUsuariosAdminView();
      setUsuarios(data);
    }
    fetchData();
  }, []);

  return (
    <div className="user-views-container">
      <h1 className="user-views-title">Usuarios Registrados</h1>
      <div className="user-views-grid">
        {usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <UserCard
              key={usuario.id || usuario.user_id}
              nombre={usuario.nombre}
              foto={usuario.foto}
              rol={usuario.rol}
              email={usuario.email}
            />
          ))
        ) : (
          <p className="user-views-empty">No hay usuarios cargados.</p>
        )}
      </div>
    </div>
  );
}

export default function UserViews() {
  return (
    <ProtectedAdminRoute>
      <UserViewsContent />
    </ProtectedAdminRoute>
  );
}
