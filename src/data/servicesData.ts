import { ServicePackage, ServiceAddon, Testimonial, GearItem } from '../types';

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'pkg-retrato',
    name: 'Sesión Retrato & Marca Personal',
    tagline: 'Ideal para profesionales, creadores de contenido, actores o retratos íntimos.',
    basePrice: 280,
    hours: 1.5,
    editedPhotos: 15,
    deliveryTimeDays: 5,
    features: [
      'Asesoramiento de vestuario y concepto previo',
      'Galería privada online en alta resolución',
      'Retoque de piel profesional sutil y natural',
      'Licencia de uso comercial para redes y web',
      'Hasta 2 cambios de vestuario incluidos'
    ],
    popular: false,
    iconName: 'User'
  },
  {
    id: 'pkg-bodas',
    name: 'Bodas & Grandes Momentos',
    tagline: 'Cobertura completa para preservar la emoción del día más especial de tu vida.',
    basePrice: 1250,
    hours: 8,
    editedPhotos: 250,
    deliveryTimeDays: 15,
    features: [
      'Preparativos, ceremonia, banquete y fiesta',
      'Fotógrafo principal + asistente de iluminación',
      'Fotos aéreas con dron profesional (si la zona lo permite)',
      'Caja de madera artesanal con 20 impresiones Fine Art',
      'Entrega de galería completa en alta y baja resolución'
    ],
    popular: true,
    iconName: 'Heart'
  },
  {
    id: 'pkg-comercial',
    name: 'Editorial, Moda & Producto',
    tagline: 'Campañas visuales impactantes para marcas, catálogos y colecciones.',
    basePrice: 650,
    hours: 4,
    editedPhotos: 40,
    deliveryTimeDays: 7,
    features: [
      'Dirección de arte e iluminación de estudio / exterior',
      'Edición avanzada y corrección de color corporativo',
      'Gestión de modelos e integración con equipo creativo',
      'Licencia publicitaria completa de uso libre',
      'Entrega en formato listo para impresión y digital'
    ],
    popular: false,
    iconName: 'Briefcase'
  },
  {
    id: 'pkg-eventos',
    name: 'Eventos Corporativos & Fiestas',
    tagline: 'Reportaje dinámico para congresos, lanzamientos de marca y galas.',
    basePrice: 420,
    hours: 3,
    editedPhotos: 80,
    deliveryTimeDays: 3,
    features: [
      'Fotos espontáneas de invitados y momentos clave',
      'Photocall o zona de prensa con iluminación dedicada',
      'Adelanto express de 10 fotos en 24h para redes sociales',
      'Derechos de uso corporativo e institucional',
      'Galería protegida por contraseña para asistentes'
    ],
    popular: false,
    iconName: 'Camera'
  }
];

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: 'addon-makeup',
    name: 'Maquillaje & Peinado Profesional',
    price: 120,
    description: 'Stylist en estudio o locación para asegurar un acabado impecable en cámara.'
  },
  {
    id: 'addon-album',
    name: 'Álbum Fine Art Impreso HD (30x30 cm)',
    price: 250,
    description: 'Encuadernación artesanal en lino con papel fotográfico de alta durabilidad.'
  },
  {
    id: 'addon-drone',
    name: 'Cobertura Adicional con Dron 4K',
    price: 150,
    description: 'Tomas aéreas cinematográficas del recinto y momentos clave.'
  },
  {
    id: 'addon-express',
    name: 'Entrega Express en 48 horas',
    price: 100,
    description: 'Procesamiento prioritario para tener todas tus fotos en tiempo récord.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Carla & Mateo',
    roleOrEventType: 'Boda en Manta, Manabí',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    comment: 'Contratar a Filmaciones Marín para nuestra boda fue la mejor decisión. La delicadeza con la que capturaron y filmaron los momentos espontáneos nos hace revivir la emoción cada vez que vemos el video y álbum.',
    photoCoverUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
    date: 'Junio 2025'
  },
  {
    id: 'test-2',
    clientName: 'David Sola',
    roleOrEventType: 'Marca Personal & CEO',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    comment: 'Buscaba renovar mi imagen profesional sin caer en la típica foto corporativa aburrida. El resultado superó mis expectativas: fotos modernas, naturales y con una iluminación sublime.',
    date: 'Febrero 2025'
  },
  {
    id: 'test-3',
    clientName: 'Valeria Rivas',
    roleOrEventType: 'Directora de Marca - Atelier Moda',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    comment: 'La precisión en el color y la textura de nuestras prendas en el Lookbook fue extraordinaria. Además, el flujo de trabajo en el estudio fue ágil y muy profesional.',
    photoCoverUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
    date: 'Abril 2025'
  }
];

export const GEAR_ITEMS: GearItem[] = [
  {
    id: 'gear-1',
    category: 'Cámara',
    name: 'Sony Alpha 7R V & Canon EOS R5',
    specs: '61 Megapíxeles | Sensor Full Frame | Rango Dinámico 15 EV',
    description: 'Cámaras insignia con enfoque automático por IA para nitidez milimétrica y detalle excepcional en impresiones de gran formato.',
    iconName: 'Camera'
  },
  {
    id: 'gear-2',
    category: 'Lentes',
    name: 'Serie Sony G Master & Canon L f/1.2',
    specs: '24mm, 35mm, 50mm f/1.2, 85mm f/1.4, 135mm f/1.8',
    description: 'Ópticas fijas de la más alta gama que producen un efecto bokeh cremoso y una separación sujeto-fondo única.',
    iconName: 'Aperture'
  },
  {
    id: 'gear-3',
    category: 'Iluminación',
    name: 'Profoto B10X Plus & Octabox Softboxes',
    specs: '500Ws de potencia continua y destello ultra rápido',
    description: 'Luz limpia, constante y moldeada con precisión tanto en estudio como en exteriores en cualquier condición meteorológica.',
    iconName: 'Sun'
  },
  {
    id: 'gear-4',
    category: 'Dron / Accesorios',
    name: 'DJI Mavic 3 Pro Cine',
    specs: 'Cámara Hasselblad de triple lente | Video RAW / 4K 120fps',
    description: 'Perspectivas aéreas cinematográficas homologadas para eventos al aire libre y paisajes de ensueño.',
    iconName: 'Wind'
  }
];
