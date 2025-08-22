// UserCard.jsx
import React from "react";
import './UserCard.css';

export default function UserCard({ nombre, foto, rol }) {
  return (
    <div className="user-card">
      <img
        src={foto || "https://via.placeholder.com/100"} // placeholder si no hay foto
        alt={nombre}
        className="user-card-img"
      />
      <div className="user-card-name">{nombre}</div>
      <div className="user-card-role">{rol}</div>
    </div>
  );
}
