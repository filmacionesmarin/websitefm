import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for leads/contact form submissions
interface ContactLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  eventDate?: string;
  location?: string;
  notes?: string;
  estimatedTotal?: number;
  createdAt: string;
  emailSent: boolean;
}

const savedLeads: ContactLead[] = [];

// API Route for Sending Contact & Booking Emails
app.post("/api/contact", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      serviceType,
      eventDate,
      location,
      notes,
      estimatedTotal
    } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        error: "Los campos Nombre, Correo y Teléfono son requeridos."
      });
    }

    const leadId = `MARIN-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdAt = new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" });

    const newLead: ContactLead = {
      id: leadId,
      fullName,
      email,
      phone,
      serviceType: serviceType || "Fotografía & Filmación General",
      eventDate: eventDate || "Por acordar",
      location: location || "Manta, Manabí",
      notes: notes || "Sin notas adicionales",
      estimatedTotal: estimatedTotal || 0,
      createdAt,
      emailSent: false
    };

    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || "sistemasweb.ec@gmail.com";
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER || recipientEmail;

    let emailSent = false;
    let emailStatusMessage = "";

    // Attempt email dispatch if App Password or SMTP password is key-configured
    if (gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailAppPassword
          }
        });

        // Email to Studio Owner / Admin
        const adminMailOptions = {
          from: `"Filmaciones Marín Web" <${gmailUser}>`,
          to: recipientEmail,
          replyTo: email,
          subject: `✨ NUEVA RESERVA [${leadId}]: ${fullName} - ${serviceType}`,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px; borderRadius: 16px;">
              <div style="border-bottom: 2px solid #f59e0b; padding-bottom: 12px; margin-bottom: 16px;">
                <h2 style="color: #fbbf24; margin: 0;">🎬 FILMACIONES MARÍN — Nueva Solicitud</h2>
                <p style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Ticket de Reserva: <strong>${leadId}</strong> | ${createdAt}</p>
              </div>

              <div style="background-color: #1e293b; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <h3 style="color: #ffffff; margin-top: 0; font-size: 16px;">Datos del Cliente:</h3>
                <p><strong>Nombre:</strong> ${fullName}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #fbbf24;">${email}</a></p>
                <p><strong>Teléfono / WhatsApp:</strong> <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #34d399;">${phone}</a></p>
              </div>

              <div style="background-color: #1e293b; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <h3 style="color: #ffffff; margin-top: 0; font-size: 16px;">Detalles del Evento:</h3>
                <p><strong>Servicio:</strong> ${serviceType}</p>
                <p><strong>Fecha Solicitada:</strong> ${eventDate || "Por definir"}</p>
                <p><strong>Locación:</strong> ${location || "Manta, Manabí"}</p>
                <p><strong>Notas / Visión:</strong> ${notes || "Sin especificaciones adicionales"}</p>
              </div>

              <div style="text-align: center; margin-top: 24px;">
                <a href="https://wa.me/593969771348?text=${encodeURIComponent(`Hola ${fullName}, recibimos tu solicitud ${leadId} para ${serviceType}.`)}" style="background-color: #25d366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Responder por WhatsApp
                </a>
              </div>
            </div>
          `
        };

        await transporter.sendMail(adminMailOptions);
        emailSent = true;
        emailStatusMessage = `Correo enviado exitosamente a ${recipientEmail}`;
      } catch (mailErr: any) {
        console.error("Error al enviar correo por nodemailer:", mailErr);
        emailStatusMessage = `No se pudo enviar el email automático: ${mailErr.message}`;
      }
    } else {
      emailStatusMessage = `Solicitud registrada correctamente en el servidor. (Para habilitar el envío automático por Gmail a ${recipientEmail}, agrega la variable GMAIL_APP_PASSWORD en la configuración).`;
    }

    newLead.emailSent = emailSent;
    savedLeads.push(newLead);

    return res.json({
      success: true,
      ticketId: leadId,
      emailSent,
      emailStatusMessage,
      message: `¡Gracias ${fullName}! Tu solicitud ${leadId} ha sido procesada con éxito.`
    });
  } catch (error: any) {
    console.error("Error en la ruta /api/contact:", error);
    return res.status(500).json({
      error: "Ocurrió un error al procesar tu solicitud."
    });
  }
});

// Endpoint to view leads stored in current session
app.get("/api/contact/leads", (req, res) => {
  res.json({ total: savedLeads.length, leads: savedLeads });
});

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
