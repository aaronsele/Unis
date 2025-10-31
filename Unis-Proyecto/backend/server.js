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
      "Eres un psicólogo vocacional llamado Uni que ayuda a estudiantes de secundaria a elegir carrera. Haz preguntas abiertas y al final recomienda 2 carreras posibles según las respuestas del usuario.",
  },
];

let preguntasHechas = 0;
let recomendacionDada = false;
let saludoDado = false;

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message)
    return res.status(400).json({ response: "No enviaste mensaje" });

  historial.push({ role: "user", content: message });

  // Reiniciar si ya recomendó carreras
  if (recomendacionDada) {
    historial = [
      {
        role: "system",
        content:
          "Eres un psicólogo vocacional llamado Uni que ayuda a estudiantes de secundaria a elegir carrera. Haz preguntas abiertas y al final recomienda 2 carreras posibles según las respuestas del usuario.",
      },
    ];
    preguntasHechas = 0;
    recomendacionDada = false;
    saludoDado = false;
  }

  try {
    // Saludo inicial
    if (!saludoDado) {
      saludoDado = true;
      const saludo = `¡Hola! Soy Uni, tu psicólogo vocacional 🤓. 
Te voy a hacer 3 series de preguntas para conocerte mejor y ayudarte a elegir una carrera. 
¿Listo para empezar?`;
      return res.json({ response: saludo });
    }

    const mensajeLower = message.toLowerCase();
    const quiereCarreras =
      mensajeLower.includes("carrera") ||
      mensajeLower.includes("recomendame") ||
      mensajeLower.includes("decime") ||
      preguntasHechas >= 3;

    let prompt;

    if (quiereCarreras) {
      prompt = `Responde en un tono amigable y profesional.

En base a las respuestas anteriores del usuario, recomienda exactamente 2 carreras posibles que se ajusten a sus intereses.

Formato obligatorio de salida:

 Las carreras recomendadas son:

1) [Carrera 1]: [breve motivo, máximo 1 línea]  
2) [Carrera 2]: [breve motivo, máximo 1 línea]

No uses asteriscos, guiones ni emojis. No agregues texto adicional ni preguntas.`;
      recomendacionDada = true;
    } else {
      preguntasHechas++;
      prompt = `Haz una pregunta abierta número ${preguntasHechas} para conocer mejor los intereses del estudiante. No repitas preguntas anteriores.`;
    }

    const response = await ollamaLLM.chat({
      messages: [...historial, { role: "system", content: prompt }],
    });

    let botMessage = response?.message?.content || response?.message || "";

    // Limpieza de formato
    botMessage = botMessage
      .replace(/\*/g, "") // saca asteriscos
      .replace(/\s{2,}/g, "\n") // convierte múltiples espacios en saltos de línea
      .trim();

    historial.push({ role: "assistant", content: botMessage });
    res.json({ response: botMessage });
  } catch (err) {
    console.error("⚠️ Error al llamar a Ollama:", err);
    res.status(500).json({ response: "⚠️ Error al comunicarse con Ollama" });
  }
});

app.listen(4000, () =>
  console.log("🧠 Servidor vocacional escuchando en puerto 4000")
);
