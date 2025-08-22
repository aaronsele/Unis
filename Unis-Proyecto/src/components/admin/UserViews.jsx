import React, { useEffect, useState } from "react";
import { getUsuariosAdminView } from "../../bd/bd.js";
import UserCard from "../../components/admin/UserCard.jsx";
import { ProtectedAdminRoute } from "../../components/ProtectedAdminRoute";

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Usuarios Registrados</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {usuarios.length > 0 ? (
          usuarios.map((usuario) => <UserCard key={usuario.id} usuario={usuario} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">No hay usuarios cargados.</p>
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
