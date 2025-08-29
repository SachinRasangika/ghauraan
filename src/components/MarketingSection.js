import React, { useState, useRef, useEffect } from 'react';
import './MarketingSection.css';
import { useTouchGestures, isTouchDevice } from '../utils/touchGestures';
import ResponsiveImage from './ResponsiveImage';

const MarketingSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const galleryRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  const images = [
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/b49ebee3952b6de5dc58e55d1883480205ec414d?width=660",
      alt: "Sri Lankan cuisine and dining"
    },
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/f27c569d58090986e429cb883a87c559f0a1493b?width=660",
      alt: "Eco tourism in Sri Lanka"
    },
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/2ca9c6fab58bef7f32bdf88c190b51a7f81be8f6?width=660",
      alt: "Cultural heritage sites of Sri Lanka"
    },
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/22131ffc59edbdf1c13bc304edcb409c237e00fa?width=660",
      alt: "Seasonal activities in Sri Lanka"
    },
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/432f1ccc3052dee5af94a5e297d02be6c1e03c22?width=660",
      alt: "Media and marketing materials"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(images.length / getItemsPerSlide()));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(images.length / getItemsPerSlide())) % Math.ceil(images.length / getItemsPerSlide()));
  };

  const getItemsPerSlide = () => {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    if (window.innerWidth <= 1440) return 3;
    return 4;
  };

  const totalSlides = Math.ceil(images.length / getItemsPerSlide());

  // Touch gesture support
  const touchGestures = useTouchGestures(nextSlide, prevSlide);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  // Enhanced next/prev functions with boundary checks
  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      nextSlide();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      prevSlide();
    }
  };

  return (
    <section className="marketing-section">
      <div className="marketing-divider"></div>
      
      <div className="marketing-container">
        <div className="marketing-content">
          <div className="marketing-header">
            <h2 className="marketing-title">Marketing and media</h2>
            
            <div className="marketing-info">
              <p className="marketing-description">
                Representational materials about travel opportunities in<br />
                Sri Lanka and more.
              </p>
              <a href="#" className="marketing-cta">
                Visit our media center
              </a>
            </div>
          </div>

          <div className="marketing-gallery">
            <div
              className="gallery-container"
              ref={galleryRef}
              {...(isTouch ? touchGestures : {})}
              style={{
                touchAction: 'pan-y pinch-zoom',
                userSelect: 'none'
              }}
            >
              <div
                className="gallery-track"
                style={{
                  transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                {images.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <ResponsiveImage
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      aspectRatio="16/9"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="gallery-overlay">
                      <h3 className="gallery-overlay-title">{image.alt}</h3>
                      <a href="#" className="gallery-overlay-cta" aria-label={`Show more about ${image.alt}`}>
                        Show more
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gallery-controls">
              <div className="gallery-dots">
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    className={`gallery-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="gallery-navigation">
                <button
                  className="nav-btn nav-prev"
                  onClick={handlePrev}
                  disabled={currentSlide === 0}
                  aria-label="Previous slide"
                  
                >
                  prev
                </button>
                <button
                  className="nav-btn nav-next"
                  onClick={handleNext}
                  disabled={currentSlide === totalSlides - 1}
                  aria-label="Next slide"
                  
                >
                  next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingSection;
