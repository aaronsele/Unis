import React, { useState, useEffect } from "react";
import "./Settings.css";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [color, setColor] = useState("azul");
  const [fontSize, setFontSize] = useState("normal");

  // 🔹 Al montar: leer lo guardado
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("settings"));
    if (saved) {
      setTheme(saved.theme || "light");
      setColor(saved.color || "azul");
      setFontSize(saved.fontSize || "normal");
      document.body.className = `${saved.theme} ${saved.color} ${saved.fontSize}`;
    } else {
      document.body.className = `${theme} ${color} ${fontSize}`;
    }
  }, []);

  // 🔹 Cada vez que cambia algo: actualizar body + guardar
  useEffect(() => {
    document.body.className = `${theme} ${color} ${fontSize}`;
    localStorage.setItem("settings", JSON.stringify({ theme, color, fontSize }));
  }, [theme, color, fontSize]);

  return (
    <div className="settings-container">
      <h1>⚙️ Configuración</h1>

      <section>
        <h2>🎨 Modo</h2>
        <div className="options">
          <button
            onClick={() => setTheme("light")}
            className={theme === "light" ? "active" : ""}
          >
            Claro
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={theme === "dark" ? "active" : ""}
          >
            Oscuro
          </button>
        </div>
      </section>

      <section>
        <h2>🌈 Color principal</h2>
        <div className="options">
          <button
            onClick={() => setColor("azul")}
            className={color === "azul" ? "active" : ""}
          >
            Azul
          </button>
          <button
            onClick={() => setColor("violeta")}
            className={color === "violeta" ? "active" : ""}
          >
            Violeta
          </button>
          <button
            onClick={() => setColor("verde")}
            className={color === "verde" ? "active" : ""}
          >
            Verde
          </button>
        </div>
      </section>

      <section>
        <h2>🔠 Tamaño de fuente</h2>
        <div className="options">
          <button
            onClick={() => setFontSize("normal")}
            className={fontSize === "normal" ? "active" : ""}
          >
            Normal
          </button>
          <button
            onClick={() => setFontSize("grande")}
            className={fontSize === "grande" ? "active" : ""}
          >
            Grande
          </button>
          <button
            onClick={() => setFontSize("extra-grande")}
            className={fontSize === "extra-grande" ? "active" : ""}
          >
            Extra grande
          </button>
        </div>
      </section>
    </div>
  );
}
