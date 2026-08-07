import React, { useState } from 'react';
import { AIRecommendation } from '../types';
import {
  Sparkles,
  X,
  Loader2,
  Clock,
  Sun,
  Palette,
  MapPin,
  Shirt,
  CheckCircle2,
  Package,
  Wand2
} from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendationToForm: (packageTitle: string, notes: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onApplyRecommendationToForm
}) => {
  const [eventType, setEventType] = useState('Retrato Personal');
  const [userVision, setUserVision] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userVision.trim()) {
      setErrorMsg('Por favor describe brevemente lo que imaginas para tu sesión.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/ai-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userVision, eventType })
      });

      const data = await response.json();
      if (response.ok && data.recommendation) {
        setRecommendation(data.recommendation);
      } else {
        throw new Error(data.error || 'Error al obtener respuesta.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('No se pudo conectar con el asistente IA. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!recommendation) return;
    const summaryNotes = `[Recomendación IA]: Estilo "${recommendation.styleName}". ${recommendation.locationAdvice} Vestuario: ${recommendation.wardrobeTips}`;
    onApplyRecommendationToForm(recommendation.suggestedPackage, summaryNotes);
    onClose();
    // Scroll to contact
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-white">
              Asesor de Sesión con Inteligencia Artificial
            </h3>
            <p className="text-xs text-slate-400">
              Describe tu idea y nuestro director creativo IA te diseñará el concepto ideal.
            </p>
          </div>
        </div>

        {/* Form or Result View */}
        {!recommendation ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                Tipo de Evento o Sesión
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Retrato Personal">Retrato Personal / Profesional</option>
                <option value="Boda / Pareja">Boda / Aniversario / Pareja</option>
                <option value="Moda / Lookbook">Moda / Marca de Ropa / Editorial</option>
                <option value="Corporativo / Empresa">Corporativo / Evento Empresarial</option>
                <option value="Arquitectura / Espacio">Arquitectura / Hotel / Interiorismo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                Describe tu visión, lugar deseado, vestuario o ambiente
              </label>
              <textarea
                value={userVision}
                onChange={(e) => setUserVision(e.target.value)}
                rows={4}
                placeholder="Ejemplo: 'Quiero una sesión de fotos romántica y natural en un campo de olivos durante el atardecer. Queremos ropa fluida en tonos crema y un ambiente muy relajado.'"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Analizando concepto con Gemini IA...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generar Recomendación Personalizada</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* RESULT DISPLAY */
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
                Concepto Generado
              </span>
              <h4 className="text-xl font-serif font-bold text-amber-300">
                {recommendation.styleName}
              </h4>
              <p className="text-xs text-slate-300 mt-2 italic">
                "{recommendation.aiMessage}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5 mb-1">
                  <Package className="w-3.5 h-3.5 text-amber-400" />
                  Paquete Sugerido
                </span>
                <span className="font-bold text-white">{recommendation.suggestedPackage}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Duración Recomendada
                </span>
                <span className="font-bold text-white">{recommendation.recommendedDuration}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5 mb-1">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  Mejor Hora para Luz
                </span>
                <span className="font-bold text-white">{recommendation.bestTimeOfDay}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5 mb-1">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  Paleta de Colores
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {recommendation.colorPalette.map((color, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-amber-200">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Consejo de Locación
                </span>
                <p className="text-slate-400 font-light">{recommendation.locationAdvice}</p>
              </div>

              <div>
                <span className="font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <Shirt className="w-3.5 h-3.5 text-amber-400" />
                  Vestuario y Estilismo
                </span>
                <p className="text-slate-400 font-light">{recommendation.wardrobeTips}</p>
              </div>

              <div>
                <span className="font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Tomas Sugeridas
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-400 font-light pl-1">
                  {recommendation.shotList.map((shot, idx) => (
                    <li key={idx}>{shot}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setRecommendation(null)}
                className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Volver a Probar
              </button>

              <button
                onClick={handleApply}
                className="w-2/3 py-3 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20"
              >
                Aplicar Recomendación en Formulario
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
