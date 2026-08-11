import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  Film,
  Camera,
  Wand2,
  Sliders,
  Maximize2,
  Video,
  Layers,
  Zap,
  CheckCircle2,
  Send,
  Loader2,
  Instagram
} from 'lucide-react';
import { TikTokIcon } from './Navbar';

interface AIFilmAnimatorSectionProps {
  onOpenBooking: () => void;
  onOpenAiAssistant: () => void;
}

interface GeneratedScene {
  shotNumber: number;
  type: string;
  cameraMovement: string;
  description: string;
  lighting: string;
  visualPreviewUrl: string;
}

export const AIFilmAnimatorSection: React.FC<AIFilmAnimatorSectionProps> = ({
  onOpenBooking,
  onOpenAiAssistant
}) => {
  // AI Animation Parameters
  const [stylePreset, setStylePreset] = useState<'bodas' | 'maritimo' | 'urbano' | 'comercial'>('bodas');
  const [colorGrade, setColorGrade] = useState<number>(75); // 0 = Cold Teal, 100 = Warm Golden
  const [cameraSpeed, setCameraSpeed] = useState<number>(60); // Slow motion vs Fast cut
  const [lightingMood, setLightingMood] = useState<'golden' | 'dramatic' | 'soft' | 'neon'>('golden');
  
  const [promptText, setPromptText] = useState('Boda al atardecer en Playa Murciélago con vestidos fluidos y tomas aéreas de dron');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(true);

  // Default Storyboard Scenes
  const [storyboard, setStoryboard] = useState<GeneratedScene[]>([
    {
      shotNumber: 1,
      type: 'Toma Aérea Dron 4K',
      cameraMovement: 'Vuelo panorámico descendente sobre la costa',
      description: 'Vista matutina de la costa de Manta con bruma dorada sobre el mar.',
      lighting: 'Hora Dorada (Golden Hour)',
      visualPreviewUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
    },
    {
      shotNumber: 2,
      type: 'Plano Medio Cinematográfico',
      cameraMovement: 'Travelling circular suave de 360° con gimbal',
      description: 'Miradas espontáneas y sonrisas capturadas a 120 FPS en cámara lenta.',
      lighting: 'Contraluz cálido natural',
      visualPreviewUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop'
    },
    {
      shotNumber: 3,
      type: 'Macro / Primer Plano Editorial',
      cameraMovement: 'Foco suave (Rack Focus) f/1.4',
      description: 'Detalle de vestuario, alianzas o textura iluminada por luz reflejada en el agua.',
      lighting: 'Sombra suave con difusor',
      visualPreviewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop'
    }
  ]);

  // Storyboard auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAnimation && storyboard.length > 0) {
      interval = setInterval(() => {
        setActiveFrame((prev) => (prev + 1) % storyboard.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAnimation, storyboard.length]);

  const handleGenerateAIConcept = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Generate preset scenes based on selection
      if (stylePreset === 'bodas') {
        setStoryboard([
          {
            shotNumber: 1,
            type: 'Plano General Dron',
            cameraMovement: 'Aproximación lenta a 50 metros de altura',
            description: `Escena de apertura: ${promptText || 'Entrada triunfal al atardecer'}.`,
            lighting: 'Atardecer cálido en la costa de Manta',
            visualPreviewUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop'
          },
          {
            shotNumber: 2,
            type: 'Cámara Lenta 120FPS',
            cameraMovement: 'Orbital de izquierda a derecha',
            description: 'Abrazo íntimo con partículas de luz y viento de playa.',
            lighting: 'Cálido 5600K con reflector dorado',
            visualPreviewUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop'
          },
          {
            shotNumber: 3,
            type: 'Cierre Cinematográfico',
            cameraMovement: 'Dolly out (alejamiento suave)',
            description: 'Siluetas marcadas frente al horizonte del océano Pacífico.',
            lighting: 'Crepúsculo azul y oro',
            visualPreviewUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop'
          }
        ]);
      } else if (stylePreset === 'maritimo') {
        setStoryboard([
          {
            shotNumber: 1,
            type: 'Tomas de Agua 4K',
            cameraMovement: 'Tracking a nivel del mar',
            description: 'Efecto espejo en el mar con reflejos turquesa.',
            lighting: 'Luz solar cenital natural',
            visualPreviewUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
          },
          {
            shotNumber: 2,
            type: 'Retrato de Moda',
            cameraMovement: 'Vertical 9:16 para Reel TikTok',
            description: 'Mirada a cámara con sombras dramáticas de palmeras.',
            lighting: 'Luz dura con contraste cinematográfico',
            visualPreviewUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop'
          }
        ]);
      } else {
        setStoryboard([
          {
            shotNumber: 1,
            type: 'Comercial 4K FX3',
            cameraMovement: 'Slider motorizado ultra fluido',
            description: 'Presentación de producto o espacio corporativo con iluminación clave.',
            lighting: 'Panel LED 3200K - 5600K',
            visualPreviewUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop'
          },
          {
            shotNumber: 2,
            type: 'Primer Plano Expresivo',
            cameraMovement: 'Handheld estable estilo cine indie',
            description: 'Enfoque directo al rostro destacando personalidad y textura.',
            lighting: 'Softbox octagonal 120cm',
            visualPreviewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop'
          }
        ]);
      }
      setActiveFrame(0);
      setIsGenerating(false);
    }, 1200);
  };

  const currentScene = storyboard[activeFrame] || storyboard[0];

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900 relative overflow-hidden" id="animacion-ia">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Innovación Cinematográfica IA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Simulador de Guión & Animación Cinematográfica
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light mt-3">
            Ajusta parámetros de iluminación, velocidad de cámara y etalonaje en tiempo real. Previsualiza cómo se filmará tu proyecto antes de encender la cámara.
          </p>
        </div>

        {/* Interactive Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: AI Parameters Controls */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-serif">
                <Sliders className="w-4 h-4" />
                <span>Panel Director Creativo IA</span>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Live Studio
              </span>
            </div>

            {/* Style Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Estilo de Filmación
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setStylePreset('bodas')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-center gap-2 ${
                    stylePreset === 'bodas'
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Bodas & Parejas</span>
                </button>

                <button
                  onClick={() => setStylePreset('maritimo')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-center gap-2 ${
                    stylePreset === 'maritimo'
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Playa & Dron 4K</span>
                </button>

                <button
                  onClick={() => setStylePreset('urbano')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-center gap-2 ${
                    stylePreset === 'urbano'
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Moda & Reels</span>
                </button>

                <button
                  onClick={() => setStylePreset('comercial')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-center gap-2 ${
                    stylePreset === 'comercial'
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Comercial / Marca</span>
                </button>
              </div>
            </div>

            {/* Color Grading Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="font-semibold">Temperatura de Color (LUT)</span>
                <span className="font-mono text-amber-400 font-bold">{colorGrade > 50 ? 'Cálido Dorado' : 'Frío Cine Teal'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={colorGrade}
                onChange={(e) => setColorGrade(Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-950 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>3200K (Noche/Cine)</span>
                <span>5600K (Sol/Playa)</span>
              </div>
            </div>

            {/* Camera Motion Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="font-semibold">Velocidad de Movimiento</span>
                <span className="font-mono text-amber-400 font-bold">{cameraSpeed} FPS (Cámara Lenta)</span>
              </div>
              <input
                type="range"
                min="24"
                max="120"
                step="24"
                value={cameraSpeed}
                onChange={(e) => setCameraSpeed(Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-950 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>24 FPS (Estándar Cine)</span>
                <span>120 FPS (Super Slow Motion)</span>
              </div>
            </div>

            {/* Idea Prompt Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Idea o Concepto para la IA:
              </label>
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                rows={2}
                placeholder="Escribe tu idea de video o fotos..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Generate Concept Button */}
            <button
              onClick={handleGenerateAIConcept}
              disabled={isGenerating}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Procesando Animación e Iluminación...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Simular Guión Cinematográfico con IA</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Animated Visual Preview Canvas */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative flex flex-col justify-between min-h-[500px]">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-mono text-slate-300 uppercase tracking-widest font-bold">
                  Previsualización de Cámara IA
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingAnimation(!isPlayingAnimation)}
                  className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-amber-300 hover:border-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  <Play className={`w-3 h-3 ${isPlayingAnimation ? 'fill-amber-400' : ''}`} />
                  <span>{isPlayingAnimation ? 'Pausar Secuencia' : 'Reproducir'}</span>
                </button>
              </div>
            </div>

            {/* Animated Canvas Frame */}
            <div className="relative my-4 rounded-2xl overflow-hidden border border-slate-800/80 aspect-[16/9] shadow-2xl group bg-slate-950">
              {/* Image with Dynamic AI Color Temperature Filter */}
              <img
                src={currentScene.visualPreviewUrl}
                alt={currentScene.type}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isPlayingAnimation ? 'scale-105 transition-transform duration-[4000ms]' : 'scale-100'
                }`}
                style={{
                  filter: `sepia(${Math.max(0, (colorGrade - 50) / 100)}) contrast(${100 + (cameraSpeed - 60) / 4}%)`
                }}
              />

              {/* Viewfinder Overlays */}
              <div className="absolute inset-0 border-[16px] border-slate-950/20 pointer-events-none" />
              <div className="absolute top-4 left-4 font-mono text-[10px] text-amber-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-amber-500/30 backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>REC • 4K UHD 10-BIT</span>
              </div>

              <div className="absolute top-4 right-4 font-mono text-[10px] text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-md">
                FPS: {cameraSpeed} | LUT: {colorGrade > 50 ? 'GOLDEN' : 'TEAL'}
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 text-white">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-amber-300 font-serif">
                    Toma #{currentScene.shotNumber} — {currentScene.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{currentScene.lighting}</span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {currentScene.description}
                </p>
                <div className="text-[10px] text-amber-400 font-mono mt-1">
                  🎥 {currentScene.cameraMovement}
                </div>
              </div>
            </div>

            {/* Storyboard Navigation Thumbnails */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {storyboard.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveFrame(idx);
                    setIsPlayingAnimation(false);
                  }}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    idx === activeFrame
                      ? 'bg-amber-500/10 border-amber-400 text-white'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="block text-[10px] font-mono text-amber-400 font-bold">
                    Escena {item.shotNumber}
                  </span>
                  <span className="block text-[11px] font-medium truncate">{item.type}</span>
                </button>
              ))}
            </div>

            {/* CTA bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-400 font-light">
                ¿Te gusta este concepto? Cotízalo directamente con nuestro equipo en Manta.
              </p>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-500/20 whitespace-nowrap cursor-pointer flex-1 sm:flex-initial text-center"
                >
                  Agendar este Concepto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
