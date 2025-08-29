import React, { useState } from 'react';
import './VisitSection.css';

const VisitSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const experiences = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/90baf4a6bba1a72e713dcca511a79f2121aa2403?width=901",
      title: "Ella Nine Arch Bridge",
      alt: "Ella Nine Arch Bridge in Sri Lanka",
      details: "Take the scenic train and capture iconic views across the lush valley."
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/b54a43831736f7c956354aa0288bfb4841bb4670?width=901",
      title: "Meet a Local in Galle",
      alt: "Meet a local experience in Galle, Sri Lanka",
      details: "Stroll the Dutch Fort and hear stories from generations of coastal life."
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/22c3f339eb6de8f36a0bd47fd387c18934a6023c?width=901",
      title: "Mirissa Whale Watching",
      alt: "Whale watching in Mirissa, Sri Lanka",
      details: "Spot blue whales and dolphins with responsible operators at sunrise."
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/1dfcc36cc90fe84844b60d0d16618a7413edaae3?width=901",
      title: "Colombo Art Deco",
      alt: "Colombo Art Deco architecture in Sri Lanka",
      details: "Discover tropical modernism and Art Deco gems on a guided city walk."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(experiences.length / getItemsPerSlide()));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(experiences.length / getItemsPerSlide())) % Math.ceil(experiences.length / getItemsPerSlide()));
  };

  const getItemsPerSlide = () => {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  };

  const totalSlides = Math.ceil(experiences.length / getItemsPerSlide());

  return (
    <section className="visit-section">
      <div className="visit-container">
        <div className="visit-header">
          <h2 className="visit-title">More than a visit</h2>
          <p className="visit-description">
            There are many reasons to choose Sri Lanka, but here<br />
            are some of the most essential
          </p>
        </div>

        <div className="visit-gallery">
          <div className="experiences-container">
            <div 
              className="experiences-track"
              style={{
                transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`
              }}
            >
              {experiences.map((experience, index) => (
                <div key={index} className="experience-card">
                  <img 
                    src={experience.image} 
                    alt={experience.alt}
                    className="experience-image"
                  />
                  <div className="experience-overlay">
                    <h3 className="experience-title">{experience.title}</h3>
                    <p className="experience-details">{experience.details}</p>
                    <a href="#" className="experience-cta" aria-label={`Show more about ${experience.title}`}>
                      Show more
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="visit-controls">
            <div className="visit-dots">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  className={`visit-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="visit-navigation">
              <button 
                className="visit-nav-btn visit-nav-prev"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                aria-label="Previous slide"
              >
                prev
              </button>
              <button 
                className="visit-nav-btn visit-nav-next"
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                aria-label="Next slide"
              >
                next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitSection;
