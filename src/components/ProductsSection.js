import React, { useState } from 'react';
import './ProductsSection.css';

const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState('Cities');

  const tabsData = {
    'Cities': {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/5f5e0d6870669c8b5a33409d8014b089dc035243?width=3532",
      title: "Major cities",
      description: "Sri Lankan cities offer a rich mix of heritage and modern life. From the bustling capital Colombo to the sacred city of Kandy and the colonial charm of Galle, there is something for everyone!",
      buttonText: "More information"
    },
    'Nature': {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/f27c569d58090986e429cb883a87c559f0a1493b?width=3532",
      title: "Natural wonders",
      description: "Sri Lanka's diverse landscapes offer breathtaking experiences—from golden beaches and coral reefs to misty tea plantations and rainforest waterfalls. Discover the natural beauty that makes Sri Lanka a nature lover's paradise.",
      buttonText: "Explore nature"
    },
    'Undiscovered gems': {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/2ca9c6fab58bef7f32bdf88c190b51a7f81be8f6?width=3532",
      title: "Hidden treasures",
      description: "Venture off the beaten path to discover Sri Lanka's best‑kept secrets. From hidden mountain temples to quiet coastal villages and local artisan workshops, these gems offer authentic experiences away from the crowds.",
      buttonText: "Discover gems"
    },
    'History, culture, art': {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/b39a391ff77e30788f2aaaf8561e0114466fab8f?width=3532",
      title: "Cultural heritage",
      description: "Immerse yourself in Sri Lanka's rich cultural tapestry—ancient cities, UNESCO World Heritage sites, living temples, and contemporary art that showcase centuries of tradition and creativity.",
      buttonText: "Learn more"
    },
    'Lithuanian cuisine': {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/b49ebee3952b6de5dc58e55d1883480205ec414d?width=3532",
      title: "Culinary traditions",
      description: "Savor the authentic flavors of Sri Lanka—from fragrant rice and curry to hoppers, kottu, and seafood fresh from the Indian Ocean. Experience our culinary heritage in cozy eateries and bustling markets.",
      buttonText: "Taste Sri Lanka"
    },
    'Ecotourism': {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/22131ffc59edbdf1c13bc304edcb409c237e00fa?width=3532",
      title: "Sustainable travel",
      description: "Experience Sri Lanka's commitment to conservation through eco‑friendly travel. Explore national parks, watch wildlife like leopards and elephants, and stay in sustainable accommodations that protect our natural heritage.",
      buttonText: "Go green"
    },
    'Seasonal highlights': {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/432f1ccc3052dee5af94a5e297d02be6c1e03c22?width=3532",
      title: "Year-round experiences",
      description: "Sri Lanka offers unique experiences year‑round. From East and South coast beach seasons to Hill Country hikes and cultural festivals, there's always somewhere perfect to explore.",
      buttonText: "See seasons"
    }
  };

  const tabs = [
    'Cities',
    'Nature', 
    'Undiscovered gems',
    'History, culture, art',
    'Lithuanian cuisine',
    'Ecotourism',
    'Seasonal highlights'
  ];

  const currentContent = tabsData[activeTab];

  return (
    <section className="products-section">
      <div className="products-container">
        <div className="products-header">
          <h2 className="products-title">Our products</h2>
          <div className="products-info">
            <p className="products-description">
              From beaches to mountains — discover our travel experiences.
            </p>
            <a href="#" className="products-cta">
              See all
            </a>
          </div>
        </div>

        <div className="products-tabs">
          <div className="tablist" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`tabpanel-${tab}`}
              >
                {tab}
                {activeTab === tab && <div className="tab-indicator" />}
              </button>
            ))}
          </div>
        </div>

        <div className="products-content">
          <div 
            className="tabpanel"
            role="tabpanel" 
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            <div className="content-image-container">
              <img 
                src={currentContent.image}
                alt={`${activeTab} in Sri Lanka`}
                className="content-image"
              />
              <div className="info-overlay">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path d="M0.50002 10.9625C0.489141 5.44495 4.99874 0.946631 10.5343 0.970062C16.0084 0.993074 20.5192 5.47633 20.4791 11.0378C20.4406 16.4926 15.9732 20.9914 10.4113 20.9512C4.94226 20.9115 0.489141 16.4454 0.50002 10.9625ZM10.4891 2.54412C5.85021 2.47299 2.08872 6.30562 2.05651 10.8889C2.02262 15.6588 5.91506 19.3337 10.3615 19.3935C15.0603 19.4562 18.9259 15.6232 18.9213 10.9546C18.9163 6.34202 15.1473 2.47383 10.4891 2.54412Z" fill="white"/>
                  <path d="M11.2636 15.9436H9.71545V9.91846H11.2636V15.9436Z" fill="white"/>
                  <path d="M10.4825 6.41799C10.9716 6.41506 11.3394 6.7774 11.3389 7.26192C11.3402 7.37309 11.3195 7.48343 11.2778 7.58652C11.2362 7.68958 11.1744 7.78334 11.0962 7.86238C11.018 7.94142 10.9249 8.0041 10.8222 8.04681C10.7196 8.08958 10.6095 8.1115 10.4984 8.11129C10.387 8.11451 10.2761 8.09522 10.1723 8.05464C10.0686 8.01401 9.97408 7.95292 9.8945 7.87493C9.81488 7.79698 9.75182 7.7038 9.70906 7.60092C9.6663 7.49803 9.64471 7.38757 9.64563 7.27615C9.64019 6.78117 9.99124 6.42008 10.4825 6.41799Z" fill="white"/>
                </svg>
              </div>
            </div>

            <div className="content-card">
              <h3 className="content-title">{currentContent.title}</h3>
              <p className="content-description">{currentContent.description}</p>
              <a href="#" className="content-cta">
                {currentContent.buttonText}
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <path d="M9.66972 18.0783C9.28005 17.6895 8.86829 17.2803 8.46164 16.8762L15.2126 10.0582H0.695374V8.28645H15.2024L8.44211 1.46084L9.67142 0.246826L18.6135 9.16088L9.66972 18.0783Z" fill="white"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
