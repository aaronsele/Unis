import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { spawn } from "child_process";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message;

  // Iniciamos un proceso para ejecutar ollama desde Node
 const ollama = spawn(
  "C:\\Users\\Alexis\\AppData\\Local\\Programs\\Ollama\\ollama.exe",
  ["run", "mistral"]
);

  let modelResponse = "";

  ollama.stdin.write(`Sos un orientador vocacional experto. Ayudá a la persona a elegir una carrera según sus gustos e intereses.\nUsuario: ${userMessage}\nIA:`);
  ollama.stdin.end();

  ollama.stdout.on("data", (data) => {
    modelResponse += data.toString();
  });

  ollama.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  ollama.on("close", () => {
    res.json({ response: modelResponse.trim() });
  });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
