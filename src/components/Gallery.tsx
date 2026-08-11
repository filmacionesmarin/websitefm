import React, { useState, useMemo } from 'react';
import { PhotoItem } from '../types';
import {
  Grid,
  LayoutGrid,
  Search,
  Eye,
  Heart,
  Maximize2,
  Camera,
  Tag,
  Play,
  Film,
  Image as ImageIcon
} from 'lucide-react';

interface GalleryProps {
  photos: PhotoItem[];
  onOpenLightbox: (photo: PhotoItem) => void;
  onToggleLike: (photoId: string) => void;
  likedPhotos: Set<string>;
}

const CATEGORIES = [
  'Todas',
  'Video & Filmación',
  'Bodas & Parejas',
  'Retrato Editorial',
  'Moda & Comercial',
  'Arquitectura & Espacios',
  'Naturaleza & Viajes'
] as const;

export const Gallery: React.FC<GalleryProps> = ({
  photos,
  onOpenLightbox,
  onToggleLike,
  likedPhotos
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'masonry' | 'uniform'>('masonry');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter items based on media type, category, search, and tag
  const filteredPhotos = useMemo(() => {
    return photos.filter((item) => {
      const isVideo = item.mediaType === 'video';
      const matchesMediaType =
        mediaTypeFilter === 'all' ||
        (mediaTypeFilter === 'video' && isVideo) ||
        (mediaTypeFilter === 'photo' && !isVideo);

      const matchesCategory =
        selectedCategory === 'Todas' || item.category === selectedCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = !selectedTag || item.tags.includes(selectedTag);

      return matchesMediaType && matchesCategory && matchesSearch && matchesTag;
    });
  }, [photos, mediaTypeFilter, selectedCategory, searchQuery, selectedTag]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    photos.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [photos]);

  return (
    <section id="galeria" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Portafolio de Fotografía & Filmación</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
              Galería & Producciones Audiovisuales
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light mt-2 max-w-xl">
              Explora nuestro trabajo en fotografía en alta resolución y producciones de video cinematográfico. Haz clic en cualquier foto o video para reproducirlo o ver sus datos en detalle.
            </p>
          </div>

          {/* Search Input & Layout Toggle Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar foto o video..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/80 transition-colors"
                id="gallery-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Layout Mode Toggles */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setLayoutMode('masonry')}
                className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === 'masonry'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Vista Mosaico Dinámica"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Mosaico</span>
              </button>

              <button
                onClick={() => setLayoutMode('uniform')}
                className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === 'uniform'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Vista Cuadrícula Uniforme"
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline">Uniforme</span>
              </button>
            </div>
          </div>
        </div>

        {/* Media Type Filter Bar (Todos / Fotos / Videos) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-2 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold pl-2 hidden sm:inline">Tipo de Contenido:</span>
            <button
              onClick={() => setMediaTypeFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mediaTypeFilter === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>Todos los Medios</span>
            </button>

            <button
              onClick={() => setMediaTypeFilter('photo')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mediaTypeFilter === 'photo'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Fotografías</span>
            </button>

            <button
              onClick={() => setMediaTypeFilter('video')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mediaTypeFilter === 'video'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
              <span>Videos & Filmaciones</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 pr-2">
            Mostrando <span className="text-amber-400 font-mono font-bold">{filteredPhotos.length}</span> elementos
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar border-b border-slate-800/80">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedTag(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/40 font-bold shadow-lg scale-[1.02]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
              id={`filter-cat-${category.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tags Quick Filter Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1 shrink-0">
            <Tag className="w-3 h-3 text-amber-400" />
            Etiquetas:
          </span>

          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shrink-0"
            >
              <span>{selectedTag}</span>
              <span className="font-bold">×</span>
            </button>
          )}

          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-2.5 py-1 rounded-md transition-colors shrink-0 ${
                tag === selectedTag
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Photos Grid Container */}
        {filteredPhotos.length === 0 ? (
          <div className="py-20 text-center bg-slate-900/50 rounded-3xl border border-slate-800">
            <Camera className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-lg font-serif text-slate-300">No se encontraron fotografías</p>
            <p className="text-xs text-slate-500 mt-1">Prueba a borrar la búsqueda o cambiar de categoría</p>
            <button
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
                setSelectedTag(null);
              }}
              className="mt-4 px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold hover:bg-amber-500/30"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div
            className={
              layoutMode === 'masonry'
                ? 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            }
          >
            {filteredPhotos.map((photo) => {
              const isLiked = likedPhotos.has(photo.id);
              const isVideo = photo.mediaType === 'video';

              return (
                <div
                  key={photo.id}
                  onClick={() => onOpenLightbox(photo)}
                  className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800/80 hover:border-amber-500/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 break-inside-avoid cursor-pointer"
                >
                  {/* Aspect ratio control for uniform mode */}
                  <div className={layoutMode === 'uniform' ? 'aspect-[4/3] relative overflow-hidden' : 'relative overflow-hidden'}>
                    <img
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Central Play Icon Overlay for Videos */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-slate-950/70 border border-amber-400/80 text-amber-300 backdrop-blur-md flex items-center justify-center shadow-2xl group-hover:scale-115 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all duration-300">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Dark gradient hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-between p-5" />

                    {/* Top badges: Category & Video tag */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-amber-300 text-[11px] font-semibold flex items-center gap-1.5">
                        {isVideo ? <Film className="w-3 h-3 text-amber-400 fill-amber-400/20" /> : <Camera className="w-3 h-3 text-amber-400" />}
                        <span>{photo.category}</span>
                      </div>

                      {isVideo && photo.duration && (
                        <div className="px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 font-mono text-[10px] font-bold shadow-md">
                          {photo.duration}
                        </div>
                      )}
                    </div>

                    {/* Like button (Always accessible) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(photo.id);
                      }}
                      className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-rose-500 text-white border-rose-400 scale-110 shadow-lg'
                          : 'bg-slate-950/70 text-slate-300 border-slate-700/80 hover:text-rose-400 hover:border-rose-400'
                      }`}
                      title="Me gusta"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                    </button>

                    {/* Hover Content Bar */}
                    <div className="absolute inset-0 z-10 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="pointer-events-auto">
                        <span className="text-[10px] text-amber-400 font-mono tracking-wider uppercase block mb-1">
                          {isVideo ? `${photo.videoQuality || '4K Video'} • ${photo.exif.camera}` : `${photo.exif.camera} • ${photo.exif.aperture}`}
                        </span>
                        <h3 className="text-lg font-serif font-bold text-white leading-tight mb-2 flex items-center gap-2">
                          <span>{photo.title}</span>
                        </h3>

                        <p className="text-xs text-slate-300 line-clamp-2 mb-4 font-light">
                          {photo.description}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5 text-slate-500" />
                              {photo.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                              {photo.likes + (isLiked ? 1 : 0)}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenLightbox(photo);
                            }}
                            className="px-3.5 py-1.5 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-amber-300 transition-colors shadow-lg cursor-pointer"
                            id={`btn-open-photo-${photo.id}`}
                          >
                            {isVideo ? <Play className="w-3.5 h-3.5 fill-current" /> : <Maximize2 className="w-3.5 h-3.5" />}
                            <span>{isVideo ? 'Reproducir' : 'Ver HD'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
