import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// API Route for AI Photography Session Consultant
app.post("/api/ai-recommendation", async (req, res) => {
  try {
    const { userVision, eventType } = req.body;

    if (!userVision) {
      return res.status(400).json({ error: "Por favor proporciona una descripción de tu visión para la sesión." });
    }

    const ai = getAiClient();
    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured yet
      return res.json({
        recommendation: {
          styleName: "Editorial & Luz Natural",
          suggestedPackage: "Sesión Retrato & Marca Personal",
          recommendedDuration: "2 Horas",
          bestTimeOfDay: "Hora Dorada (1 hora antes del atardecer)",
          colorPalette: ["Tonos Tierra", "Blanco Cálido", "Verde Oliva", "Dorado"],
          locationAdvice: "Ubicación en exterior con vegetación suave o arquitectura moderna minimalista.",
          wardrobeTips: "Ropa con texturas naturales (lino, algodón), evitando estampados recargados o logos grandes.",
          shotList: [
            "Retrato en primer plano con luz lateral suave",
            "Toma de cuerpo entero en movimiento natural",
            "Detalles de accesorios e interacción con el entorno",
            "Silueta estilizada con fondo a contraluz"
          ],
          aiMessage: "Basado en tu idea, recomendamos una sesión enfocada en la autenticidad y la iluminación natural para capturar expresiones relajadas y elegantes."
        }
      });
    }

    const prompt = `Actúa como el director creativo de "FILMACIONES MARÍN", estudio de fotografía profesional y filmación en Manta, Manabí, Ecuador.
Un cliente busca asesoría para su próxima sesión de fotos o video.
Tipo de evento/sesión: ${eventType || 'General'}
Descripción de la visión del cliente: "${userVision}"

Analiza su idea teniendo en cuenta la estética y la luz de Manta, Ecuador, y devuelve una respuesta estructurada en JSON con recomendaciones detalladas en español.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            styleName: { type: Type.STRING, description: "Nombre del estilo fotográfico recomendado" },
            suggestedPackage: { type: Type.STRING, description: "Nombre del paquete ideal" },
            recommendedDuration: { type: Type.STRING, description: "Duración recomendada" },
            bestTimeOfDay: { type: Type.STRING, description: "Mejor momento del día para la luz" },
            colorPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Paleta de colores sugerida para ropa/decoración"
            },
            locationAdvice: { type: Type.STRING, description: "Consejos sobre la locación ideal" },
            wardrobeTips: { type: Type.STRING, description: "Consejos de vestuario y estilismo" },
            shotList: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de 4 tomas sugeridas"
            },
            aiMessage: { type: Type.STRING, description: "Mensaje personalizado y cálido del director creativo" }
          },
          required: ["styleName", "suggestedPackage", "recommendedDuration", "bestTimeOfDay", "colorPalette", "locationAdvice", "wardrobeTips", "shotList", "aiMessage"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text.trim());
      return res.json({ recommendation: data });
    } else {
      throw new Error("No se obtuvo respuesta del modelo.");
    }
  } catch (error: any) {
    console.error("Error in AI Recommendation route:", error);
    return res.status(500).json({ error: "Error al generar la recomendación personalizada." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
