/**
 * Performance optimization utilities
 */
import React, { useState, useEffect } from 'react';

// Intersection Observer for lazy loading
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px 0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Debounce function for performance
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
};

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Preload images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Preload multiple images
export const preloadImages = (urls) => {
  return Promise.all(urls.map(preloadImage));
};

// Lazy load component hook
export const useLazyLoad = (ref, callback, options = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            setIsLoaded(true);
            callback?.();
            observer.unobserve(entry.target);
          }
        });
      },
      options
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, callback, isLoaded, options]);

  return isLoaded;
};

// Resource hints for better performance
export const addResourceHint = (href, rel = 'preload', as = null) => {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  if (as) link.as = as;
  document.head.appendChild(link);
};

// Critical CSS injection
export const injectCriticalCSS = (css) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

// Web Workers for heavy computations
export const createWebWorker = (workerFunction) => {
  const blob = new Blob(['(' + workerFunction.toString() + ')()'], {
    type: 'application/javascript'
  });
  return new Worker(URL.createObjectURL(blob));
};

// Virtual scrolling hook
export const useVirtualScrolling = (items, itemHeight, containerHeight) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    setVisibleItems(
      items.slice(startIndex, endIndex).map((item, index) => ({
        ...item,
        index: startIndex + index
      }))
    );
  }, [scrollTop, items, itemHeight, containerHeight]);

  const handleScroll = throttle((e) => {
    setScrollTop(e.target.scrollTop);
  }, 16);

  return {
    visibleItems,
    handleScroll,
    totalHeight: items.length * itemHeight,
    offsetY: Math.floor(scrollTop / itemHeight) * itemHeight
  };
};

// Performance monitoring
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    
    if (window.performance && window.performance.mark) {
      performance.mark(`${name}-start`);
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
    }
    
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  };
};

// Code splitting helper
export const loadComponentAsync = (importFunc) => {
  return React.lazy(() => {
    return importFunc().catch((err) => {
      console.error('Failed to load component:', err);
      return { default: () => <div>Failed to load component</div> };
    });
  });
};

// Service Worker registration
export const registerServiceWorker = (swUrl) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available
              console.log('New content available');
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  }
};

// Cache management
export const cacheResource = (url, cacheName = 'app-cache') => {
  if ('caches' in window) {
    return caches.open(cacheName).then((cache) => {
      return cache.add(url);
    });
  }
  return Promise.resolve();
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if ('memory' in performance) {
    return {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    };
  }
  return null;
};

// Bundle size analysis
export const analyzeBundle = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis available in production build with webpack-bundle-analyzer');
  }
};

// Progressive enhancement check
export const supportsFeature = (feature) => {
  const features = {
    webp: () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    },
    intersectionObserver: () => 'IntersectionObserver' in window,
    serviceWorker: () => 'serviceWorker' in navigator,
    webGL: () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch (e) {
        return false;
      }
    },
    localStorage: () => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    },
    touchEvents: () => 'ontouchstart' in window,
    pointerEvents: () => 'onpointerdown' in window,
    cssGrid: () => CSS.supports('display', 'grid'),
    cssFlexbox: () => CSS.supports('display', 'flex'),
    cssCustomProperties: () => CSS.supports('--custom-property', 'value')
  };

  return features[feature] ? features[feature]() : false;
};

// Resource loading priority
export const loadResourceWithPriority = (url, priority = 'low') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.fetchPriority = priority; // high, low, auto
  document.head.appendChild(link);
};

// Critical resource preloading
export const preloadCriticalResources = (resources) => {
  resources.forEach(({ url, type, priority = 'high' }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = type;
    link.fetchPriority = priority;
    document.head.appendChild(link);
  });
};

// Adaptive loading based on connection
export const getNetworkInfo = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };
  }
  return null;
};

// Adaptive loading hook moved to ProgressiveLoader.js to fix React context issues

const performanceUtils = {
  createIntersectionObserver,
  debounce,
  throttle,
  preloadImage,
  preloadImages,
  useLazyLoad,
  addResourceHint,
  measurePerformance,
  supportsFeature,
  getNetworkInfo
};

export default performanceUtils;
