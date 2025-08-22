import React from "react";
import './UserCard.css';

export default function UserCard({ nombre, foto, rol }) {
  return (
    <div className="user-card">
      <img
        src={foto || "https://via.placeholder.com/70"} // Smaller placeholder
        alt={nombre}
        className="user-card-img"
      />
      <div className="user-card-name">{nombre}</div>
      <div className="user-card-role">{rol}</div>
    </div>
  );
}