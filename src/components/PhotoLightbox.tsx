import React, { useState, useEffect } from 'react';
import { PhotoItem } from '../types';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Calendar,
  Sliders,
  Check,
  Tag
} from 'lucide-react';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  onClose: () => void;
  onSelectPhoto: (photo: PhotoItem) => void;
  onToggleLike: (photoId: string) => void;
  likedPhotos: Set<string>;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  photos,
  onClose,
  onSelectPhoto,
  onToggleLike,
  likedPhotos
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showExif, setShowExif] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Reset zoom level when photo changes
    setZoomLevel(1);
  }, [photo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, photos]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      onSelectPhoto(photos[currentIndex + 1]);
    } else {
      onSelectPhoto(photos[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectPhoto(photos[currentIndex - 1]);
    } else {
      onSelectPhoto(photos[photos.length - 1]);
    }
  };

  const isLiked = likedPhotos.has(photo.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-white animate-fade-in">
      {/* Lightbox Top Control Bar */}
      <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            {photo.category}
          </span>
          <h3 className="text-sm font-semibold truncate max-w-xs sm:max-w-md font-serif text-slate-200">
            {photo.title}
          </h3>
          <span className="text-xs text-slate-400 hidden sm:inline">
            ({currentIndex + 1} de {photos.length})
          </span>
        </div>

        {/* Toolbar buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-800/80 rounded-xl p-1 border border-slate-700/60">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.25))}
              className="p-1.5 hover:text-amber-400 rounded-lg text-slate-300"
              title="Alejar"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-2 text-slate-400">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
              className="p-1.5 hover:text-amber-400 rounded-lg text-slate-300"
              title="Acercar"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoomLevel !== 1 && (
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 hover:text-amber-400 rounded-lg text-slate-300 border-l border-slate-700 ml-1"
                title="Restablecer Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Toggle EXIF Drawer */}
          <button
            onClick={() => setShowExif(!showExif)}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              showExif
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Datos EXIF"
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden md:inline">EXIF</span>
          </button>

          {/* Like button */}
          <button
            onClick={() => onToggleLike(photo.id)}
            className={`p-2 rounded-xl border transition-all ${
              isLiked
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 scale-105'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-rose-400'
            }`}
            title="Favorito"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
            title="Copiar Enlace"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Close Lightbox */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-colors ml-2 cursor-pointer"
            title="Cerrar (Esc)"
            id="btn-close-lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Lightbox Body */}
      <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-30 p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white shadow-2xl hover:scale-110 transition-all cursor-pointer"
          title="Anterior (Flecha Izquierda)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-30 p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white shadow-2xl hover:scale-110 transition-all cursor-pointer"
          title="Siguiente (Flecha Derecha)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* High Resolution Image Container */}
        <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
          <img
            src={photo.url}
            alt={photo.title}
            className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-200 select-none"
            style={{ transform: `scale(${zoomLevel})` }}
          />
        </div>

        {/* EXIF Drawer Panel */}
        {showExif && (
          <div className="absolute right-4 bottom-4 z-20 w-80 max-w-[calc(100vw-2rem)] bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-xl text-xs space-y-3 animate-slide-up">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                Información Técnica EXIF
              </span>
              <button
                onClick={() => setShowExif(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div className="p-2 rounded-lg bg-slate-800/50">
                <span className="block text-[10px] text-slate-500 uppercase">Cámara</span>
                <span className="font-mono text-white font-medium">{photo.exif.camera}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/50">
                <span className="block text-[10px] text-slate-500 uppercase">Lente</span>
                <span className="font-mono text-white font-medium">{photo.exif.lens}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/50">
                <span className="block text-[10px] text-slate-500 uppercase">Apertura</span>
                <span className="font-mono text-amber-300 font-medium">{photo.exif.aperture}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/50">
                <span className="block text-[10px] text-slate-500 uppercase">Velocidad</span>
                <span className="font-mono text-amber-300 font-medium">{photo.exif.shutterSpeed}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/50">
                <span className="block text-[10px] text-slate-500 uppercase">ISO</span>
                <span className="font-mono text-amber-300 font-medium">{photo.exif.iso}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/50">
                <span className="block text-[10px] text-slate-500 uppercase">Focal</span>
                <span className="font-mono text-white font-medium">{photo.exif.focalLength}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1 text-slate-300">
              <div className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{photo.exif.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{photo.exif.date}</span>
              </div>
            </div>

            <p className="text-slate-300 italic pt-1 border-t border-slate-800">
              "{photo.description}"
            </p>

            <div className="flex flex-wrap gap-1 pt-1">
              {photo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 flex items-center gap-1"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Footer Thumbnail Navigation */}
      <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex items-center justify-center gap-2 overflow-x-auto">
        {photos.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectPhoto(item)}
            className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
              item.id === photo.id
                ? 'border-amber-400 scale-105 opacity-100 shadow-lg shadow-amber-500/30'
                : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
