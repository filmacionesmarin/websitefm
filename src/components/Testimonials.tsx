import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/servicesData';
import { Testimonial } from '../types';
import { Star, MessageSquare, Quote, Plus, Check } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for new review
  const [clientName, setClientName] = useState('');
  const [roleOrEventType, setRoleOrEventType] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !comment.trim()) return;

    const newRev: Testimonial = {
      id: `rev-${Date.now()}`,
      clientName,
      roleOrEventType: roleOrEventType || 'Sesión Fotográfica',
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop`,
      rating,
      comment,
      date: 'Reciente'
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowAddModal(false);
      setClientName('');
      setRoleOrEventType('');
      setComment('');
    }, 2000);
  };

  return (
    <section id="resenas" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Experiencias Reales de Clientes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
              Testimonios & Reseñas 5 Estrellas
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light mt-2 max-w-xl">
              Descubre las palabras de parejas, modelos, emprendedores y marcas que han confiado sus mejores momentos a FILMACIONES MARÍN.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            id="btn-add-review"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Dejar mi Opinión</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-950 p-8 rounded-3xl border border-slate-800/80 hover:border-amber-500/30 transition-all shadow-xl flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-amber-500/10 absolute top-6 right-6 group-hover:text-amber-500/20 transition-colors" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img
                  src={rev.avatarUrl}
                  alt={rev.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-white font-serif">{rev.clientName}</h4>
                  <span className="text-[11px] text-amber-400 font-mono block">
                    {rev.roleOrEventType} • {rev.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-slate-100">
            <h3 className="text-xl font-serif font-bold text-white mb-4">
              Escribe tu Reseña sobre FILMACIONES MARÍN
            </h3>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold text-white">¡Gracias por tu Opinión!</h4>
                <p className="text-xs text-slate-400">Tu reseña ha sido agregada a la lista.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. Sofia Martínez"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Tipo de Sesión o Evento
                  </label>
                  <input
                    type="text"
                    value={roleOrEventType}
                    onChange={(e) => setRoleOrEventType(e.target.value)}
                    placeholder="Ej. Boda en Manta / Filmación de Evento"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Calificación
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-400 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Tu Comentario
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe detalles sobre la atención, el resultado final de las fotos y tu experiencia..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-300"
                  >
                    Publicar Reseña
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
