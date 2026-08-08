import React, { useState } from 'react';
import { ServicePackage, ServiceAddon, BookingFormState } from '../types';
import { SERVICE_PACKAGES, SERVICE_ADDONS } from '../data/servicesData';
import {
  Calculator,
  Check,
  Sparkles,
  Clock,
  Image as ImageIcon,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Star,
  DollarSign
} from 'lucide-react';

interface ServicesCalculatorProps {
  onApplyQuoteToForm: (quoteData: Partial<BookingFormState>) => void;
}

export const ServicesCalculator: React.FC<ServicesCalculatorProps> = ({ onApplyQuoteToForm }) => {
  // Calculator State
  const [selectedPackageId, setSelectedPackageId] = useState<string>(SERVICE_PACKAGES[0].id);
  const [hours, setHours] = useState<number>(SERVICE_PACKAGES[0].hours);
  const [extraPhotos, setExtraPhotos] = useState<number>(0);
  const [locationType, setLocationType] = useState<'estudio' | 'exterior' | 'fuera'>('estudio');
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  const currentPackage = SERVICE_PACKAGES.find((p) => p.id === selectedPackageId) || SERVICE_PACKAGES[0];

  // Update base hours when package changes
  const handleSelectPackage = (pkg: ServicePackage) => {
    setSelectedPackageId(pkg.id);
    setHours(pkg.hours);
    setExtraPhotos(0);
  };

  const toggleAddon = (addonId: string) => {
    const next = new Set(selectedAddons);
    if (next.has(addonId)) {
      next.delete(addonId);
    } else {
      next.add(addonId);
    }
    setSelectedAddons(next);
  };

  // Calculate live estimate
  const basePrice = currentPackage.basePrice;
  const extraHours = Math.max(0, hours - currentPackage.hours);
  const extraHoursCost = extraHours * 80; // $80/extra hour
  const extraPhotosCost = extraPhotos * 10; // $10/extra retouched photo

  let locationFee = 0;
  if (locationType === 'exterior') locationFee = 50;
  if (locationType === 'fuera') locationFee = 150;

  const addonsTotal: number = [...selectedAddons].reduce((sum: number, addonId: string) => {
    const addon = SERVICE_ADDONS.find((a) => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalEstimate = basePrice + extraHoursCost + extraPhotosCost + locationFee + addonsTotal;

  const handleSendToForm = () => {
    onApplyQuoteToForm({
      serviceType: currentPackage.name,
      estimatedHours: hours,
      additionalPhotos: extraPhotos,
      location: locationType === 'estudio' ? 'Estudio Filmaciones Marín - Manta' : locationType === 'exterior' ? 'Exterior Manta' : 'Fuera de Manta / Destino',
      addons: [...selectedAddons].map((id) => SERVICE_ADDONS.find((a) => a.id === id)?.name || id),
      estimatedTotal: totalEstimate
    });

    // Scroll smoothly to contact form
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Tarifas Transparentes & Calculadora</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Servicios Fotográficos & Planes
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light mt-3">
            Selecciona un paquete estándar o utiliza nuestra calculadora interactiva para personalizar las horas, fotos editadas y servicios adicionales.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {SERVICE_PACKAGES.map((pkg) => {
            const isSelected = pkg.id === selectedPackageId;

            return (
              <div
                key={pkg.id}
                onClick={() => handleSelectPackage(pkg)}
                className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-amber-400 shadow-2xl shadow-amber-500/15 scale-[1.02]'
                    : 'bg-slate-950/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
                id={`pkg-card-${pkg.id}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>Más Popular</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold font-serif text-white mb-2">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 font-light mb-6 min-h-[36px]">
                    {pkg.tagline}
                  </p>

                  <div className="mb-6 pb-6 border-b border-slate-800">
                    <span className="text-3xl font-extrabold text-amber-400 font-serif">
                      ${pkg.basePrice}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">/ sesión base</span>
                  </div>

                  {/* Core specs */}
                  <div className="space-y-2 mb-6 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{pkg.hours} Horas de Cobertura</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{pkg.editedPhotos} Fotos Retocadas en HD</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-8 text-xs text-slate-400">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPackage(pkg);
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {isSelected ? 'Seleccionado en Calculadora' : 'Seleccionar Paquete'}
                </button>
              </div>
            );
          })}
        </div>

        {/* INTERACTIVE CUSTOM PRICING CALCULATOR */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <Calculator className="w-4 h-4" />
                Calculadora de Presupuesto a la Medida
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Personaliza tu Experiencia Fotográfica
              </h3>
            </div>
            <span className="text-xs text-slate-400 max-w-xs">
              Ajusta las horas, locación y adicionales para obtener una estimación en tiempo real.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Controls Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Active Base Package Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  1. Paquete Base Seleccionado
                </label>
                <select
                  value={selectedPackageId}
                  onChange={(e) => {
                    const pkg = SERVICE_PACKAGES.find((p) => p.id === e.target.value);
                    if (pkg) handleSelectPackage(pkg);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-serif"
                  id="calc-package-select"
                >
                  {SERVICE_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} — desde ${pkg.basePrice} ({pkg.hours}h)
                    </option>
                  ))}
                </select>
              </div>

              {/* Hours Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase">
                    2. Duración de la Cobertura: <span className="text-amber-400 font-bold">{hours} Horas</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    (${currentPackage.hours}h base + ${Math.max(0, hours - currentPackage.hours) * 80} extra)
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setHours((h) => Math.max(1, h - 0.5))}
                    className="w-10 h-10 rounded-lg bg-slate-800 text-white font-bold text-lg hover:bg-slate-700 cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="0.5"
                    value={hours}
                    onChange={(e) => setHours(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <button
                    onClick={() => setHours((h) => Math.min(12, h + 0.5))}
                    className="w-10 h-10 rounded-lg bg-slate-800 text-white font-bold text-lg hover:bg-slate-700 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Extra Photos Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase">
                    3. Fotos Retocadas Adicionales: <span className="text-amber-400 font-bold">+{extraPhotos} Fotos</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    (+${extraPhotos * 10})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={extraPhotos}
                  onChange={(e) => setExtraPhotos(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0 extras</span>
                  <span>50 extras</span>
                  <span>100 extras</span>
                </div>
              </div>

              {/* Location Type Option */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  4. Tipo de Locación
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setLocationType('estudio')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                      locationType === 'estudio'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    Estudio Marín ($0)
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationType('exterior')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                      locationType === 'exterior'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    Exterior Local (+$50)
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationType('fuera')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                      locationType === 'fuera'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    Destino / Viaje (+$150)
                  </button>
                </div>
              </div>

              {/* Addons Checklist */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  5. Servicios Adicionales opcionales
                </label>
                <div className="space-y-2">
                  {SERVICE_ADDONS.map((addon) => {
                    const checked = selectedAddons.has(addon.id);

                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          checked
                            ? 'bg-amber-500/10 border-amber-500/40 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                              checked ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-slate-700'
                            }`}
                          >
                            {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-200 block">{addon.name}</span>
                            <span className="text-[11px] text-slate-400 font-light">{addon.description}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-amber-400 shrink-0 ml-2">
                          +${addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1">
                  Resumen Estimado
                </span>
                <h4 className="text-xl font-bold font-serif text-white mb-6">
                  {currentPackage.name}
                </h4>

                <div className="space-y-3 text-xs text-slate-300 mb-6 pb-6 border-b border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Precio Base Paquete:</span>
                    <span className="font-mono text-white">${basePrice}</span>
                  </div>

                  {extraHours > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Horas extras ({extraHours}h):</span>
                      <span className="font-mono text-amber-400">+${extraHoursCost}</span>
                    </div>
                  )}

                  {extraPhotos > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Fotos extras ({extraPhotos}):</span>
                      <span className="font-mono text-amber-400">+${extraPhotosCost}</span>
                    </div>
                  )}

                  {locationFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Suplemento locación:</span>
                      <span className="font-mono text-amber-400">+${locationFee}</span>
                    </div>
                  )}

                  {addonsTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Adicionales ({selectedAddons.size}):</span>
                      <span className="font-mono text-amber-400">+${addonsTotal}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2">
                    <span className="text-slate-400">Fotos Retocadas Totales:</span>
                    <span className="font-semibold text-white">
                      {currentPackage.editedPhotos + extraPhotos} fotografías HD
                    </span>
                  </div>
                </div>

                {/* Big Total Box */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6 text-center">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                    Total Estimado Sesión
                  </span>
                  <span className="text-4xl font-extrabold text-amber-400 font-serif block my-1">
                    ${totalEstimate}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    *Impuestos incluidos. Pago divido en 2 plazos (50% reserva + 50% entrega).
                  </span>
                </div>
              </div>

              {/* Action button */}
              <button
                onClick={handleSendToForm}
                id="btn-apply-quote-to-form"
                className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20 cursor-pointer"
              >
                <span>Usar este Presupuesto para Agendar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
