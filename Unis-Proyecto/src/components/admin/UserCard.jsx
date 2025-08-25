import React from "react";
import './UserCard.css';

export default function UserCard({ nombre, foto, rol, email }) {
  const isValidPhoto = foto && foto.startsWith("http");

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/70";
  };

  return (
    <div className="user-card">
      {isValidPhoto ? (
        <img
          src={foto}
          alt={nombre}
          className="user-card-img"
          onError={handleImageError}
        />
      ) : (
        <img
          src="https://via.placeholder.com/70"
          alt="default"
          className="user-card-img"
        />
      )}

      <div className="user-card-name">{nombre}</div>
      <div className="user-card-role">{rol}</div>
      <div className="user-card-email">{email}</div>
    </div>
  );
}
