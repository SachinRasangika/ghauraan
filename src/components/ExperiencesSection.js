import React, { useState, useRef, useEffect } from 'react';
import './ExperiencesSection.css';
import { useTouchGestures, isTouchDevice } from '../utils/touchGestures';

const ExperiencesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const activitiesRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  const activities = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c71c8beb418322e28fefb15399036b3568e1902e?width=901",
      title: "Tea Plantation Tours in Nuwara Eliya",
      alt: "Tea plantation tours in Nuwara Eliya, Sri Lanka",
      details: "Wander through emerald tea fields, meet planters, and sip fresh Ceylon tea at source."
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/f878dba6706b39e4c539d0001d9b9ae130961d66?width=901",
      title: "Surfing in Arugam Bay",
      alt: "Surfing experience in Arugam Bay, Sri Lanka",
      details: "Catch world‑class breaks from May to October with laid‑back beach vibes and cafes."
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/b39a391ff77e30788f2aaaf8561e0114466fab8f?width=901",
      title: "Sigiriya Rock Fortress",
      alt: "Sigiriya Rock Fortress in Sri Lanka",
      details: "Climb the Lion Rock to ancient frescoes and panoramic views over the Cultural Triangle."
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/f3456b5f83b34190d45b8078d37237c636bfd730?width=901",
      title: "Ayurveda Wellness Retreat",
      alt: "Ayurveda wellness retreat in Sri Lanka",
      details: "Rejuvenate with traditional therapies, yoga, and healthy cuisine by the ocean."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(activities.length / getItemsPerSlide()));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(activities.length / getItemsPerSlide())) % Math.ceil(activities.length / getItemsPerSlide()));
  };

  const getItemsPerSlide = () => {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  };

  const totalSlides = Math.ceil(activities.length / getItemsPerSlide());

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
    <section className="experiences-section">
      {/* One country, five experiences */}
      <div className="experiences-top">
        <div className="experiences-container">
          <div className="experiences-content">
            <h2 className="experiences-title">
              One country, five<br />
              experiences
            </h2>
            <p className="experiences-description">
              If you spend at least a week in Sri Lanka, you can do a lot.<br />
              Ride the scenic train through the Hill Country, drive along the southern coast,<br />
              or go on safari in our national parks like Yala and Udawalawe.<br />
              Each region offers something unique.
            </p>
            <a href="#" className="experiences-cta">
              Read more
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path d="M9.0095 18.2778C8.61983 17.889 8.20807 17.4798 7.80142 17.0757L14.5523 10.2577H0.0351562V8.48591H14.5422L7.78189 1.6603L9.0112 0.446289L17.9533 9.36034L9.0095 18.2778Z" fill="#E2DBCF"/>
              </svg>
            </a>
          </div>
          
          <div className="map-container">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/ed4302d48046790f4ec6196b993343609b4cbeb4?width=1392"
              alt="Sri Lanka regions map"
              className="lithuania-map"
            />
            
            {/* Map overlay buttons */}
            <button className="map-overlay map-overlay-1" aria-label="Explore region 1">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M0.549805 8.36349V6.75113H6.73261V0.560059H8.34261V6.74326H14.5388V8.35562H8.35245V14.5494H6.74009V8.36349H0.549805Z" fill="#1D2430"/>
              </svg>
            </button>
            
            <button className="map-overlay map-overlay-2" aria-label="Explore region 2">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M0.110352 7.83321V6.22085H6.29316V0.0297852H7.90316V6.21299H14.0993V7.82535H7.91299V14.0192H6.30063V7.83321H0.110352Z" fill="#1D2430"/>
              </svg>
            </button>
            
            <button className="map-overlay map-overlay-3" aria-label="Explore region 3">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M0.439453 8.53341V6.92105H6.62226V0.72998H8.23226V6.91318H14.4284V8.52554H8.24209V14.7194H6.62973V8.53341H0.439453Z" fill="#1D2430"/>
              </svg>
            </button>
            
            <button className="map-overlay map-overlay-4" aria-label="Explore region 4">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M0.469727 8.68331V7.07095H6.65254V0.879883H8.26254V7.06309H14.4587V8.67544H8.27237V14.8693H6.66001V8.68331H0.469727Z" fill="#1D2430"/>
              </svg>
            </button>
            
            <button className="map-overlay map-overlay-5" aria-label="Explore region 5">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M0.629883 7.86349V6.25113H6.81269V0.0600586H8.42269V6.24326H14.6189V7.85562H8.43252V14.0494H6.82016V7.86349H0.629883Z" fill="#1D2430"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Your own Lithuania */}
      <div className="experiences-bottom">
        <div className="experiences-divider"></div>
        
        <div className="experiences-container">
          <div className="lithuania-header">
            <h2 className="lithuania-title">Your own Sri Lanka</h2>
            <p className="lithuania-description">
              From vibrant cities filled with historical buildings to<br />
              peaceful nature — Sri Lanka has something for everyone.
            </p>
          </div>

          <div className="lithuania-gallery">
            <div
              className="activities-container"
              ref={activitiesRef}
              {...(isTouch ? touchGestures : {})}
              style={{
                touchAction: 'pan-y pinch-zoom',
                userSelect: 'none'
              }}
            >
              <div
                className="activities-track"
                style={{
                  transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                {activities.map((activity, index) => (
                  <div key={index} className="activity-card">
                    <img 
                      src={activity.image} 
                      alt={activity.alt}
                      className="activity-image"
                    />
                    <div className="activity-overlay">
                      <h3 className="activity-title">{activity.title}</h3>
                      <p className="activity-details">{activity.details}</p>
                      <a href="#" className="activity-cta" aria-label={`Show more about ${activity.title}`}>
                        Show more
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lithuania-controls">
              <div className="lithuania-dots">
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    className={`lithuania-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="lithuania-navigation">
                <button
                  className="lithuania-nav-btn lithuania-nav-prev"
                  onClick={handlePrev}
                  disabled={currentSlide === 0}
                  aria-label="Previous slide"
                  
                >
                  prev
                </button>
                <button
                  className="lithuania-nav-btn lithuania-nav-next"
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

export default ExperiencesSection;
