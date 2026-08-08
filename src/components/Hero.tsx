import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, ArrowRight, Award, Star, CheckCircle, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreGallery: () => void;
  onOpenAiAssistant: () => void;
  onOpenBooking: () => void;
}

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop',
    title: 'Fotografía Bodas & Parejas',
    subtitle: 'Momentos eternos congelados con belleza natural'
  },
  {
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1920&auto=format&fit=crop',
    title: 'Retratos Editoriales & Moda',
    subtitle: 'Estilo cinematográfico con dirección artística'
  },
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1920&auto=format&fit=crop',
    title: 'Arquitectura e Interiorismo',
    subtitle: 'Luz y geometría en perfecta sincronía'
  }
];

export const Hero: React.FC<HeroProps> = ({ onExploreGallery, onOpenAiAssistant, onOpenBooking }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950" id="inicio">
      {/* Background Image Carousel with Overlay */}
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={img.url}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
          } transition-transform duration-[7000ms]`}
        >
          <img
            src={img.url}
            alt={img.title}
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
        </div>
      ))}

      {/* Dark Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/50 to-slate-950" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs font-medium backdrop-blur-md mb-6 shadow-xl animate-fade-in">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Filmaciones Marín — Manta, Manabí, Ecuador</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif text-white tracking-tight leading-[1.1] mb-6">
          Fotografía & Filmación Profesional en <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent italic font-serif">
            Manta, Ecuador
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-sans font-light leading-relaxed mb-8">
          Capturamos emociones genuinas, campañas editoriales y eventos inolvidables.
          Explora nuestra galería de alta resolución y cotiza tu sesión personalizada.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
          <button
            onClick={onExploreGallery}
            id="btn-hero-gallery"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-amber-500/25 cursor-pointer text-sm"
          >
            <Camera className="w-5 h-5" />
            <span>Ver Galería Completa</span>
          </button>

          <button
            onClick={onOpenAiAssistant}
            id="btn-hero-ai"
            className="w-full sm:w-auto px-6 py-4 bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-semibold rounded-2xl border border-amber-500/40 flex items-center justify-center gap-2 transition-all hover:border-amber-400 cursor-pointer text-sm shadow-lg backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Asesor de Sesión con IA</span>
          </button>
        </div>

        {/* Feature Checkmarks */}
        <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-6 text-xs text-slate-300 font-medium mb-12">
          <div className="flex items-center gap-1.5 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-800/60">
            <CheckCircle className="w-4 h-4 text-amber-400" />
            <span>Sensores Full Frame 61MP</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-800/60">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Garantía de Satisfacción 100%</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-800/60">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>4.9/5 Estrellas (850+ Sesiones)</span>
          </div>
        </div>

        {/* Key Stats Counter Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 bg-slate-900/80 border border-slate-800/80 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="p-3 text-center border-r border-slate-800/80 last:border-none">
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">10+</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Años Experiencia</span>
          </div>

          <div className="p-3 text-center border-r border-slate-800/80 last:border-none">
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">850+</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Sesiones Entregadas</span>
          </div>

          <div className="p-3 text-center border-r border-slate-800/80 last:border-none">
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">100%</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Calidad Ultra HD</span>
          </div>

          <div className="p-3 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">24/48h</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Adelanto Express</span>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center gap-2 mt-8">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Ir a diapositiva ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
