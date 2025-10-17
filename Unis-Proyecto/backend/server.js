// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Ollama } from "@llamaindex/ollama";

const app = express();
app.use(cors()); // permite que el front en otro puerto pueda conectar
app.use(bodyParser.json());

const ollamaLLM = new Ollama({
  model: "gemma3:1b",
  temperature: 0.7,
});

// Historial global de mensajes
const historial = [
  {
    role: "assistant",
    content: "Eres un psicólogo vocacional que ayuda a estudiantes de secundaria a elegir carrera. Haz 3 preguntas abiertas y luego recomienda 2 carreras."
  }
];

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ response: "No enviaste mensaje" });

  historial.push({ role: "user", content: message });

  try {
    const response = await ollamaLLM.chat({ messages: historial });
    const botMessage = response?.message?.content || response?.message || "";
    historial.push({ role: "assistant", content: botMessage.trim() });

    res.json({ response: botMessage.trim() });
  } catch (err) {
    console.error("⚠️ Error al llamar a Ollama:", err);
    res.status(500).json({ response: "⚠️ Error al comunicarse con Ollama" });
  }
});

app.listen(4000, () => console.log("Servidor escuchando en puerto 4000"));
