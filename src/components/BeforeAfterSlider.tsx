import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Sparkles, Wand2 } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=60&w=1200&auto=format&fit=crop&sat=-50&con=0',
  afterImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop',
  beforeLabel = 'RAW Sin Retoque',
  afterLabel = 'Edición Fine Art AURA',
  title = 'Calidad de Retoque & Revelado Digital',
  description = 'Desliza el divisor para comprobar el acabado profesional de piel, la corrección de color cinemática y la profundidad de luces y sombras.'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <section id="comparativa" className="py-20 bg-slate-900/60 border-y border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Wand2 className="w-3.5 h-3.5" />
            <span>Procesamiento de Archivos RAW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            {description}
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 select-none cursor-ew-resize group"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* AFTER / RETOUCHED IMAGE (Full background) */}
          <img
            src={afterImage}
            alt="Edición profesional"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* AFTER LABEL */}
          <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{afterLabel}</span>
          </div>

          {/* BEFORE / RAW IMAGE (Clipped by slider percentage) */}
          <div
            className="absolute top-0 bottom-0 left-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImage}
              alt="RAW original"
              className="absolute top-0 left-0 h-full max-w-none object-cover object-center"
              style={{
                width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%'
              }}
            />

            {/* BEFORE LABEL */}
            <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-300 text-xs font-semibold shadow-lg">
              <span>{beforeLabel}</span>
            </div>
          </div>

          {/* SLIDER DIVIDER LINE */}
          <div
            className="absolute top-0 bottom-0 z-20 w-1 bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* DRAG HANDLE BUTTON */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl border-2 border-slate-950 group-hover:scale-110 transition-transform">
              <Sliders className="w-5 h-5 rotate-90" />
            </div>
          </div>
        </div>

        {/* Helpful hint below slider */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Haz clic y arrastra a izquierda/derecha para comparar la revelación fotográfica</span>
        </div>
      </div>
    </section>
  );
};
