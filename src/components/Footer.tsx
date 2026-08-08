import React from 'react';
import { Camera, Heart, Instagram, Globe, Mail, Phone, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-indigo-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Camera className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white font-serif tracking-wider">
                FILMACIONES <span className="text-amber-400 font-light">MARÍN</span>
              </span>
            </div>
            <p className="text-slate-400 font-light leading-relaxed">
              Servicios profesionales de filmación y fotografía para bodas, eventos corporativos, producciones audiovisuales y retratos en Manta, Ecuador.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold font-serif text-white uppercase tracking-wider mb-4">Navegación</h4>
            <ul className="space-y-2.5 font-light">
              <li><a href="#galeria" className="hover:text-amber-300 transition-colors">Galería de Alta Resolución</a></li>
              <li><a href="#comparativa" className="hover:text-amber-300 transition-colors">Antes & Después (RAW)</a></li>
              <li><a href="#servicios" className="hover:text-amber-300 transition-colors">Servicios & Calculadora</a></li>
              <li><a href="#sobre-mi" className="hover:text-amber-300 transition-colors">Sobre la Creadora & Equipo</a></li>
              <li><a href="#resenas" className="hover:text-amber-300 transition-colors">Opiniones de Clientes</a></li>
              <li><a href="#contacto" className="hover:text-amber-300 transition-colors">Reserva de Citas</a></li>
            </ul>
          </div>

          {/* Specialty Categories */}
          <div>
            <h4 className="text-xs font-bold font-serif text-white uppercase tracking-wider mb-4">Especialidades</h4>
            <ul className="space-y-2.5 font-light">
              <li><span className="text-slate-300">Retrato Editorial & Personal Branding</span></li>
              <li><span className="text-slate-300">Bodas & Cobertura Cinematográfica</span></li>
              <li><span className="text-slate-300">Moda, Lookbooks & Catálogos</span></li>
              <li><span className="text-slate-300">Fotografía Arquitectónica 4K</span></li>
              <li><span className="text-slate-300">Eventos Corporativos Express</span></li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-serif text-white uppercase tracking-wider mb-4">Atención Directa</h4>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-slate-200">sistemasweb.ec@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-slate-200">+593 96 977 1348</span>
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              Manta, Manab&iacute;, Ecuador.
            </p>
          </div>
        </div>

        {/* Bottom copyright & scroll button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} FILMACIONES MARÍN. Todos los derechos reservados. Manta, Ecuador.</p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Volver arriba"
          >
            <span>Subir</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
