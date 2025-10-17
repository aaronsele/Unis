import { Ollama } from "@llamaindex/ollama";
import { Settings } from "llamaindex";
import readline from "readline";


// Configura el modelo Ollama
const ollamaLLM = new Ollama({
  model: "gemma3:1b",
  temperature: 0.7,
});

Settings.llm = ollamaLLM;
Settings.embedModel = ollamaLLM;

// Historial de mensajes
const historial = [
  {
    role: "assistant",
    content:"Eres un psicologo vocacional que ayuda a estudiantes de secundaria a saber que carrera estudiar. Debes hacerle 3 preguntas (SOLO 3, NO MAS) abiertas sobre sus intereses. Luego de esas 3 preguntas, recomendale 2 carreras. Es importante que mantegas un tono amable y claro"
  }
];


async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });


  console.log("🤖 Bot con IA (Ollama) iniciado.");
  console.log("Escribí tu pregunta o poné 'salir' para terminar:");


  rl.on("line", async (input) => {
    if (input.toLowerCase() === "salir") {
      rl.close();
      return;
    }


    // Agrega el mensaje del usuario al historial
    historial.push({
      role: "user",
      content: input,
    });


    try {
      // Envía todo el historial al modelo
      const res = await ollamaLLM.chat({
        messages: historial,
      });


      // Agrega la respuesta de la IA al historial
      const respuesta = res?.message?.content || res?.message || "";
      historial.push({
        role: "assistant",
        content: respuesta.trim(),
      });

      // Muestra la respuesta
      console.log("🤖 IA:", respuesta.trim());
    } catch (err) {
      console.error("⚠️ Error al llamar al modelo:", err);
    }

    console.log("\nPreguntá otra cosa o escribí 'salir':");
  });
}

main();