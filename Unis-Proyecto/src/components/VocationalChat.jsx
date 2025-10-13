import { useState } from "react";
import axios from "axios";

export default function VocationalChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:4000/api/chat", {
        message: input,
      });

      const botMessage = { role: "bot", text: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
      const botMessage = { role: "bot", text: "⚠️ Error al comunicarse con el servidor" };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>🧠 Orientador Vocacional</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "300px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <b>{msg.role === "user" ? "Vos:" : "Asistente:"}</b> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "80%", padding: "5px" }}
          placeholder="Escribí tu duda..."
        />
        <button onClick={sendMessage} style={{ padding: "5px 10px", marginLeft: "5px" }}>
          Enviar
        </button>
      </div>
    </div>
  );
}
