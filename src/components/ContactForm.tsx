import React, { useState, useEffect } from 'react';
import { BookingFormState } from '../types';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  User,
  DollarSign
} from 'lucide-react';

interface ContactFormProps {
  initialQuoteData?: Partial<BookingFormState>;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialQuoteData }) => {
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: 'Sesión Retrato & Marca Personal',
    eventDate: '',
    location: 'Estudio AURA',
    estimatedHours: 1.5,
    additionalPhotos: 0,
    addons: [],
    estimatedTotal: 280,
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Sync when quote data is updated from calculator or AI assistant
  useEffect(() => {
    if (initialQuoteData) {
      setFormData((prev) => ({
        ...prev,
        ...initialQuoteData
      }));
    }
  }, [initialQuoteData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleWhatsAppClick = () => {
    const textMsg = encodeURIComponent(
      `Hola AURA STUDIO, me interesa agendar una sesión fotográfica.\nNombre: ${formData.fullName || 'Cliente'}\nServicio: ${formData.serviceType}\nFecha Estimada: ${formData.eventDate || 'Por definir'}\nPresupuesto Estimado: $${formData.estimatedTotal}`
    );
    window.open(`https://wa.me/34600000000?text=${textMsg}`, '_blank');
  };

  return (
    <section id="contacto" className="py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Reserva de Fechas & Consultas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Reserva Tu Sesión Fotográfica
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light mt-3">
            Cuéntanos tu visión o selecciona la fecha deseada. Responderemos en menos de 12 horas con disponibilidad de agenda y propuesta personalizada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info & Direct Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <h3 className="text-2xl font-serif font-bold text-white">Información de Contacto</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                ¿Prefieres hablar directamente? Escríbenos por WhatsApp o visítanos en nuestro estudio central con cita previa.
              </p>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Estudio Principal</span>
                    <span className="font-medium text-white block">Calle Velázquez 42, 28001 Madrid</span>
                    <span className="text-[11px] text-slate-400">Atención presencial bajo reserva</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Atención Telefónica</span>
                    <span className="font-mono text-white block font-medium">+34 912 345 678 / +34 600 000 000</span>
                    <span className="text-[11px] text-slate-400">Lun - Sáb: 09:00 - 20:00 h</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Correo Electrónico</span>
                    <span className="font-mono text-amber-300 block font-medium">hola@aurastudio.es</span>
                    <span className="text-[11px] text-slate-400">Cotizaciones corporativas e internacionales</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Launcher Button */}
              <button
                type="button"
                onClick={handleWhatsAppClick}
                id="btn-whatsapp-direct"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Chat Directo por WhatsApp</span>
              </button>
            </div>

            {/* Reassurance Card */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Compromiso AURA STUDIO</span>
              </div>
              <p className="text-slate-400 font-light">
                Reserva con total tranquilidad. Tu fecha queda bloqueada formalmente con contrato digital de servicio y garantía de reprogramación por clima en exteriores.
              </p>
            </div>
          </div>

          {/* Right Booking Form Column */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">¡Solicitud de Reserva Recibida!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Gracias <strong className="text-amber-300">{formData.fullName}</strong>. Hemos registrado tu consulta para <strong className="text-amber-300">{formData.serviceType}</strong>. Nuestro equipo revisará la disponibilidad de la fecha e intentará contactarte en las próximas horas.
                </p>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-left max-w-md mx-auto space-y-1 font-mono text-slate-300">
                  <div><strong>Total Estimado:</strong> ${formData.estimatedTotal}</div>
                  <div><strong>Locación:</strong> {formData.location}</div>
                  {formData.eventDate && <div><strong>Fecha Solicitada:</strong> {formData.eventDate}</div>}
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold hover:bg-slate-700"
                >
                  Enviar Otra Consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-xl font-serif font-bold text-white">Formulario de Reserva</h3>
                  {formData.estimatedTotal > 0 && (
                    <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold font-serif">
                      Estimado: ${formData.estimatedTotal}
                    </span>
                  )}
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ej. Carmen Delgado"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      id="input-full-name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="carmen@ejemplo.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      id="input-email"
                    />
                  </div>
                </div>

                {/* Phone & Service Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+34 600 000 000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      id="input-phone"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Servicio Seleccionado
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400 font-serif"
                      id="input-service-type"
                    >
                      <option value="Sesión Retrato & Marca Personal">Sesión Retrato & Marca Personal</option>
                      <option value="Bodas & Grandes Momentos">Bodas & Grandes Momentos</option>
                      <option value="Editorial, Moda & Producto">Editorial, Moda & Producto</option>
                      <option value="Eventos Corporativos & Fiestas">Eventos Corporativos & Fiestas</option>
                      <option value="Arquitectura & Espacios">Arquitectura & Espacios</option>
                    </select>
                  </div>
                </div>

                {/* Target Date & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Fecha Tentativa del Evento
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                      id="input-event-date"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Locación Preferida
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ej. Estudio AURA, Finca en Girona, Exterior..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      id="input-location"
                    />
                  </div>
                </div>

                {/* Notes & Vision */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Detalles de la visión o requerimientos especiales
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Escribe aquí cualquier detalle: número de personas, cambios de vestuario, horas estimadas o preguntas sobre la propuesta..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    id="input-notes"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  id="btn-submit-contact"
                  className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20 cursor-pointer text-sm"
                >
                  {isSending ? (
                    <span>Enviando Reserva...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirmar Reserva de Fecha</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
