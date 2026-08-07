import React, { useState } from 'react';
import { GEAR_ITEMS } from '../data/servicesData';
import { Camera, Aperture, Sun, Wind, Award, CheckCircle, Shield } from 'lucide-react';

export const AboutGear: React.FC = () => {
  const [activeGearCategory, setActiveGearCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Cámara', 'Lentes', 'Iluminación', 'Dron / Accesorios'];

  const filteredGear = activeGearCategory === 'Todas'
    ? GEAR_ITEMS
    : GEAR_ITEMS.filter((g) => g.category === activeGearCategory);

  const getGearIcon = (cat: string) => {
    switch (cat) {
      case 'Cámara':
        return <Camera className="w-5 h-5 text-amber-400" />;
      case 'Lentes':
        return <Aperture className="w-5 h-5 text-amber-400" />;
      case 'Iluminación':
        return <Sun className="w-5 h-5 text-amber-400" />;
      default:
        return <Wind className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="sobre-mi" className="py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Bio + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Photographer Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl aspect-[4/5] group">
              <img
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1000&auto=format&fit=crop"
                alt="Fotógrafa Principal AURA STUDIO"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800">
                <h4 className="text-lg font-serif font-bold text-white">Elena Rostova</h4>
                <p className="text-xs text-amber-400 font-mono">Fundadora & Directora de Fotografía</p>
              </div>
            </div>

            {/* Decorative Floating Award Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-amber-500/40 shadow-2xl backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-white font-serif">Sony Alpha Master 2025</span>
                <span className="text-[10px] text-slate-400">Premio Internacional de Retrato</span>
              </div>
            </div>
          </div>

          {/* Bio Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Sobre la Creadora</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
              "La fotografía no se trata de lo que ves, sino de lo que logras hacer sentir."
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Con más de una década de trayectoria capturando editoriales de moda, bodas exclusivas y campañas de marca en toda Europa y Latinoamérica, mi enfoque fusiona la precisión técnica del estudio con la espontaneidad y emoción de la luz natural.
            </p>

            <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
              Cada sesión está diseñada sin prisas, en un ambiente cómodo y relajado para sacar a relucir la personalidad auténtica de las personas ante el objetivo.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div>
                <span className="text-amber-400 font-bold block text-lg font-serif">10+ Años</span>
                <span className="text-slate-400">De Trayectoria Profesional</span>
              </div>
              <div>
                <span className="text-amber-400 font-bold block text-lg font-serif">15+ Países</span>
                <span className="text-slate-400">Publicaciones y Coberturas</span>
              </div>
              <div>
                <span className="text-amber-400 font-bold block text-lg font-serif">100% 4K/61MP</span>
                <span className="text-slate-400">Estándar de Calidad Máxima</span>
              </div>
            </div>
          </div>
        </div>

        {/* GEAR BAG SECTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-1">
                Equipamiento de Vanguardia
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Nuestro Maletín Técnico & Lentes
              </h3>
            </div>

            {/* Gear category filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveGearCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    activeGearCategory === cat
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGear.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 hover:border-amber-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                  {getGearIcon(item.category)}
                </div>
                <span className="text-[10px] font-mono text-amber-400 uppercase block mb-1">
                  {item.category}
                </span>
                <h4 className="text-base font-bold font-serif text-white mb-2">{item.name}</h4>
                <p className="text-xs text-amber-300 font-mono mb-3 bg-slate-900 p-2 rounded-lg border border-slate-800">
                  {item.specs}
                </p>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
