export interface ExifData {
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: number;
  location: string;
  date: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: 'Retrato Editorial' | 'Bodas & Parejas' | 'Moda & Comercial' | 'Arquitectura & Espacios' | 'Naturaleza & Viajes' | 'Video & Filmación' | 'Eventos & Producciones';
  mediaType?: 'photo' | 'video';
  url: string;
  thumbnailUrl: string;
  videoUrl?: string;
  duration?: string;
  videoQuality?: string;
  rawUrl?: string; // For before/after slider comparison
  retouchedUrl?: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  description: string;
  tags: string[];
  exif: ExifData;
  likes: number;
  views: number;
  featured?: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  basePrice: number;
  hours: number;
  editedPhotos: number;
  deliveryTimeDays: number;
  features: string[];
  popular?: boolean;
  iconName: string;
}

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  roleOrEventType: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  photoCoverUrl?: string;
  date: string;
}

export interface GearItem {
  id: string;
  category: 'Cámara' | 'Lentes' | 'Iluminación' | 'Dron / Accesorios';
  name: string;
  specs: string;
  description: string;
  iconName: string;
}

export interface BookingFormState {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  eventDate: string;
  location: string;
  estimatedHours: number;
  additionalPhotos: number;
  addons: string[];
  estimatedTotal: number;
  notes: string;
}

export interface AIRecommendation {
  styleName: string;
  suggestedPackage: string;
  recommendedDuration: string;
  bestTimeOfDay: string;
  colorPalette: string[];
  locationAdvice: string;
  wardrobeTips: string;
  shotList: string[];
  aiMessage: string;
}
