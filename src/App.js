import React from 'react';
import Navbar from './components/Navbar';
import MarketingSection from './components/MarketingSection';
import ExperiencesSection from './components/ExperiencesSection';
import ProductsSection from './components/ProductsSection';
import VisitSection from './components/VisitSection';
import Footer from './components/Footer';
import ResponsiveImage from './components/ResponsiveImage';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Hero Section */}
      <main id="main-content" className="hero-section">
        <Navbar />
        <div className="hero-background">
          <ResponsiveImage
            src="https://api.builder.io/api/v1/image/assets/TEMP/74164a726414b2ec5aef4bc3ab2a81a748b237ed?width=2880"
            alt="Aerial view of winding road through Sri Lankan forest"
            className="hero-bg-image"
            sizes="100vw"
            loading="eager"
            aspectRatio="16/9"
          />
        </div>
        
        <div className="hero-container">
          <div className="hero-content-card">
            <div className="hero-header">
              <div className="hero-caption">
                <span>DISCOVER THE PEARL OF INDIAN OCEAN</span>
              </div>
              <h1 className="hero-title">
                Explore Sri Lanka, Your Way
              </h1>
            </div>
            
            <p className="hero-description">
              Private, luxury tours crafted for unforgettable journeys
            </p>
            
            <div className="hero-buttons">
              <button
                className="hero-btn hero-btn-primary touch-target"
                aria-label="See our travel solutions and tour packages"
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M11.755 4.62749C11.9863 4.74309 12.2414 4.80327 12.5 4.80327C12.7586 4.80327 13.0137 4.74309 13.245 4.62749L16.2942 3.10249C16.4213 3.03896 16.5626 3.009 16.7046 3.01547C16.8466 3.02193 16.9845 3.06461 17.1054 3.13944C17.2262 3.21426 17.3259 3.31875 17.395 3.44298C17.4641 3.5672 17.5002 3.70703 17.5 3.84916V14.4858C17.4999 14.6405 17.4568 14.7922 17.3754 14.9238C17.294 15.0553 17.1776 15.1617 17.0392 15.2308L13.245 17.1283C13.0137 17.2439 12.7586 17.3041 12.5 17.3041C12.2414 17.3041 11.9863 17.2439 11.755 17.1283L8.245 15.3733C8.01367 15.2577 7.75861 15.1975 7.5 15.1975C7.24139 15.1975 6.98634 15.2577 6.755 15.3733L3.70584 16.8983C3.57863 16.9619 3.43727 16.9918 3.29522 16.9853C3.15316 16.9788 3.01513 16.9361 2.89427 16.8612C2.7734 16.7862 2.67372 16.6816 2.60471 16.5573C2.5357 16.433 2.49965 16.293 2.5 16.1508V5.51499C2.50009 5.36027 2.54324 5.20863 2.62463 5.07705C2.70602 4.94547 2.82244 4.83915 2.96084 4.76999L6.755 2.87249C6.98634 2.7569 7.24139 2.69672 7.5 2.69672C7.75861 2.69672 8.01367 2.7569 8.245 2.87249L11.755 4.62749Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.5 4.80334V17.3033" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 2.69666V15.1967" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>See our solutions</span>
              </button>

              <button
                className="hero-btn hero-btn-secondary touch-target"
                aria-label="Contact us to plan your Sri Lanka trip"
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M18.3334 14.1V16.6C18.3344 16.8321 18.2868 17.0618 18.1939 17.2744C18.1009 17.4871 17.9645 17.678 17.7935 17.8349C17.6225 17.9918 17.4206 18.1112 17.2007 18.1856C16.9809 18.2599 16.7479 18.2875 16.5168 18.2666C13.9525 17.988 11.4893 17.1118 9.32511 15.7083C7.31163 14.4289 5.60455 12.7218 4.32511 10.7083C2.91676 8.53432 2.04031 6.05914 1.76677 3.48331C1.74595 3.25287 1.77334 3.02061 1.84719 2.80133C1.92105 2.58205 2.03975 2.38055 2.19575 2.20966C2.35174 2.03877 2.54161 1.90224 2.75327 1.80875C2.96492 1.71526 3.19372 1.66686 3.42511 1.66665H5.92511C6.32953 1.66267 6.7216 1.80588 7.02824 2.06959C7.33488 2.3333 7.53517 2.69952 7.59177 3.09998C7.69729 3.90003 7.89298 4.68558 8.17511 5.44165C8.28723 5.73992 8.31149 6.06407 8.24503 6.37571C8.17857 6.68735 8.02416 6.9734 7.80011 7.19998L6.74177 8.25831C7.92807 10.3446 9.65549 12.072 11.7418 13.2583L12.8001 12.2C13.0267 11.9759 13.3127 11.8215 13.6244 11.7551C13.936 11.6886 14.2602 11.7129 14.5584 11.825C15.3145 12.1071 16.1001 12.3028 16.9001 12.4083C17.3049 12.4654 17.6746 12.6693 17.9389 12.9812C18.2032 13.2931 18.3436 13.6913 18.3334 14.1Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Get in touch</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Marketing and Media Section */}
      <MarketingSection />

      {/* Experiences Section */}
      <ExperiencesSection />

      {/* Products Section */}
      <ProductsSection />

      {/* Visit Section */}
      <VisitSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
