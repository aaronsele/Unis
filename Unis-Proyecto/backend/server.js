import express from "express";
import cors from "cors";
import { Ollama } from "@llamaindex/ollama";

const app = express();
app.use(cors());
app.use(express.json());

// Configuración del modelo Ollama
const ollamaLLM = new Ollama({
  model: "gemma3:1b", // modelo ligero para test
  temperature: 0.7,
});

// Historial de mensajes
const historial = [
  {
    role: "assistant",
    content:
      "Eres un psicologo vocacional que ayuda a estudiantes de secundaria a saber qué carrera estudiar. Debes hacerle 3 preguntas (SOLO 3, NO MÁS) abiertas sobre sus intereses. Luego de esas 3 preguntas, recomendale 2 carreras. Es importante que mantengas un tono amable y claro.",
  },
];

// Endpoint para chat
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  historial.push({ role: "user", content: userMessage });

  try {
    const response = await ollamaLLM.chat({ messages: historial });
    const respuesta = response?.message?.content || response?.message || "";
    historial.push({ role: "assistant", content: respuesta.trim() });
    res.json({ response: respuesta.trim() });
  } catch (err) {
    console.error("⚠️ ERROR COMPLETO:", err); // <--- imprimir todo
    res.status(500).json({ error: "Error al llamar al modelo", details: err.toString() });
  }
});


// Levantar el servidor
app.listen(4000, () =>
  console.log("Servidor corriendo en http://localhost:4000")
);
