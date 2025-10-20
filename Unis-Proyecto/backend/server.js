// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Ollama } from "@llamaindex/ollama";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const ollamaLLM = new Ollama({
  model: "gemma3:1b",
  temperature: 0.7,
});

// Estado global
let historial = [
  {
    role: "system",
    content:
      "Eres un psicólogo vocacional que ayuda a estudiantes de secundaria a elegir carrera. Haz preguntas abiertas y al final recomienda 2 carreras posibles según las respuestas del usuario.",
  },
];

let preguntasHechas = 0;
let recomendacionDada = false;
let saludoDado = false; // <--- nuevo

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ response: "No enviaste mensaje" });

  historial.push({ role: "user", content: message });

  // Reiniciar si ya recomendó carreras
  if (recomendacionDada) {
    historial = [
      {
        role: "system",
        content:
          "Eres un psicólogo vocacional que ayuda a estudiantes de secundaria a elegir carrera, te llamas Uni. Haz preguntas abiertas y al final recomienda 2 carreras posibles según las respuestas del usuario.",
      },
    ];
    preguntasHechas = 0;
    recomendacionDada = false;
    saludoDado = false;
  }

  try {
    // Si no saludó aún, responder con saludo
    if (!saludoDado) {
      saludoDado = true;
      const saludo = `¡Hola! Soy Uni, tu psicólogo vocacional 🤓. Te voy a hacer 3 series de preguntas para conocerte mejor y ayudarte a elegir una carrera. ¿Listo para empezar?`;
      return res.json({ response: saludo });
    }

    // Detectar si el usuario pide recomendación o ya se hicieron 3 preguntas
    const mensajeLower = message.toLowerCase();
    const quiereCarreras =
      mensajeLower.includes("carrera") ||
      mensajeLower.includes("recomendame") ||
      mensajeLower.includes("decime") ||
      preguntasHechas >= 3;

    let prompt;

    if (quiereCarreras) {
      prompt = `En base a las respuestas anteriores del usuario, recomienda exactamente 2 carreras posibles que se ajusten a sus intereses. Explica brevemente por qué. No hagas más preguntas.`;
      recomendacionDada = true;
    } else {
      preguntasHechas++;
      prompt = `Haz una pregunta abierta número ${preguntasHechas} para conocer mejor los intereses del estudiante. No repitas preguntas anteriores.`;
    }

    historial.push({ role: "assistant", content: prompt });

    const response = await ollamaLLM.chat({ messages: historial });
    const botMessage = response?.message?.content || response?.message || "";
    historial.push({ role: "assistant", content: botMessage.trim() });

    res.json({ response: botMessage.trim() });
  } catch (err) {
    console.error("⚠️ Error al llamar a Ollama:", err);
    res.status(500).json({ response: "⚠️ Error al comunicarse con Ollama" });
  }
});

app.listen(4000, () =>
  console.log("🧠 Servidor vocacional escuchando en puerto 4000")
);
