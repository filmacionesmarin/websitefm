import React, { useState } from 'react';
import { PORTFOLIO_PHOTOS } from './data/portfolioData';
import { PhotoItem, BookingFormState } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { AboutGear } from './components/AboutGear';
import { AIFilmAnimatorSection } from './components/AIFilmAnimatorSection';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { PhotoLightbox } from './components/PhotoLightbox';
import { AIAssistantModal } from './components/AIAssistantModal';
import { Footer } from './components/Footer';

export default function App() {
  const [photos] = useState<PhotoItem[]>(PORTFOLIO_PHOTOS);
  const [selectedLightboxPhoto, setSelectedLightboxPhoto] = useState<PhotoItem | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set(['photo-1', 'photo-2']));
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [quoteForContact, setQuoteForContact] = useState<Partial<BookingFormState>>({});

  const handleToggleLike = (photoId: string) => {
    setLikedPhotos((prev) => {
      const next = new Set(prev);
      if (next.has(photoId)) {
        next.delete(photoId);
      } else {
        next.add(photoId);
      }
      return next;
    });
  };

  const handleExploreGallery = () => {
    const el = document.getElementById('galeria');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenBooking = () => {
    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyQuoteToForm = (quoteData: Partial<BookingFormState>) => {
    setQuoteForContact(quoteData);
  };

  const handleApplyAiRecommendationToForm = (packageTitle: string, notes: string) => {
    setQuoteForContact((prev) => ({
      ...prev,
      serviceType: packageTitle,
      notes: notes
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreGallery={handleExploreGallery}
          onOpenAiAssistant={() => setAiAssistantOpen(true)}
          onOpenBooking={handleOpenBooking}
        />

        {/* High-Resolution Interactive Gallery */}
        <Gallery
          photos={photos}
          onOpenLightbox={(photo) => setSelectedLightboxPhoto(photo)}
          onToggleLike={handleToggleLike}
          likedPhotos={likedPhotos}
        />

        {/* RAW vs Retouched Before/After Comparison Slider */}
        <BeforeAfterSlider />

        {/* AI Storyboard & Cinematic Animation Simulator */}
        <AIFilmAnimatorSection
          onOpenBooking={handleOpenBooking}
          onOpenAiAssistant={() => setAiAssistantOpen(true)}
        />

        {/* About Photographer & Equipment Bag */}
        {/*<AboutGear />*/}

        {/* Client Testimonials */}
        <Testimonials />

        {/* Integrated Contact & Booking Form */}
        <ContactForm initialQuoteData={quoteForContact} />
      </main>

      {/* Footer */}
      <Footer />

      {/* High-Res Photo Lightbox Modal */}
      <PhotoLightbox
        photo={selectedLightboxPhoto}
        photos={photos}
        onClose={() => setSelectedLightboxPhoto(null)}
        onSelectPhoto={(photo) => setSelectedLightboxPhoto(photo)}
        onToggleLike={handleToggleLike}
        likedPhotos={likedPhotos}
      />

      {/* AI Photography Session Assistant Modal */}
      <AIAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onApplyRecommendationToForm={handleApplyAiRecommendationToForm}
      />
    </div>
  );
}
