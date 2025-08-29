import React, { useState, useRef, useEffect } from 'react';
import './ResponsiveImage.css';

const ResponsiveImage = ({ 
  src, 
  alt, 
  className = '', 
  sizes = '100vw',
  aspectRatio,
  loading = 'lazy',
  placeholder = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="%23f8f9fa"/></svg>',
  onLoad,
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);

  // Generate responsive srcSet from base URL
  const generateSrcSet = (baseUrl) => {
    if (!baseUrl) return '';
    
    // If it's a Builder.io URL, we can generate multiple sizes
    if (baseUrl.includes('api.builder.io')) {
      const widths = [320, 480, 640, 768, 1024, 1280, 1440, 1920, 2560];
      return widths
        .map(width => `${baseUrl.replace(/width=\d+/, `width=${width}`)} ${width}w`)
        .join(', ');
    }
    
    // For other URLs, provide 1x and 2x versions if possible
    return `${baseUrl} 1x, ${baseUrl.replace(/\.(jpg|jpeg|png|webp)$/i, '@2x.$1')} 2x`;
  };

  // These functions are available but not used in this implementation
  // They can be used for future enhancements

  const handleImageLoad = (e) => {
    setImageLoaded(true);
    setImageError(false);
    onLoad?.(e);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    const element = imgRef.current;
    if (!element || loading !== 'lazy') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            const srcset = img.dataset.srcset;

            if (src) img.src = src;
            if (srcset) img.srcset = srcset;

            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '50px 0px' }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [loading]);

  // Generate responsive image attributes
  const srcSet = generateSrcSet(src);
  const isLazy = loading === 'lazy';

  const imageProps = {
    ref: imgRef,
    alt,
    className: `responsive-image ${className} ${imageLoaded ? 'loaded' : ''} ${imageError ? 'error' : ''}`,
    loading: loading === 'eager' ? 'eager' : undefined,
    onLoad: handleImageLoad,
    onError: handleImageError,
    sizes,
    style: {
      opacity: imageLoaded ? 1 : 0,
      transition: 'opacity 0.3s ease',
      aspectRatio: aspectRatio || 'auto',
      ...props.style
    },
    ...props
  };

  if (isLazy) {
    imageProps['data-src'] = src;
    imageProps['data-srcset'] = srcSet;
    imageProps.src = placeholder;
  } else {
    imageProps.src = src;
    imageProps.srcSet = srcSet;
  }

  return (
    <div className="responsive-image-container" style={{ position: 'relative' }}>
      <img {...imageProps} />
      
      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div 
          className="image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: imageLoaded ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          <div 
            style={{
              width: '24px',
              height: '24px',
              border: '2px solid #e9ecef',
              borderTop: '2px solid #336361',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
        </div>
      )}
      
      {/* Error fallback */}
      {imageError && (
        <div 
          className="image-error"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6c757d',
            fontSize: '14px'
          }}
        >
          Image not available
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Higher-order component for automatic image optimization
export const withImageOptimization = (WrappedComponent) => {
  return function OptimizedImageComponent(props) {
    const optimizeImageUrl = (url, width, quality = 80) => {
      if (!url) return url;
      
      // Builder.io URL optimization
      if (url.includes('api.builder.io')) {
        const urlObj = new URL(url);
        urlObj.searchParams.set('width', width);
        urlObj.searchParams.set('quality', quality);
        urlObj.searchParams.set('format', 'webp');
        return urlObj.toString();
      }
      
      return url;
    };

    const enhancedProps = {
      ...props,
      optimizeImageUrl
    };

    return <WrappedComponent {...enhancedProps} />;
  };
};

// Utility function to generate responsive image URLs
export const getResponsiveImageUrl = (baseUrl, width, quality = 80, format = 'webp') => {
  if (!baseUrl) return baseUrl;
  
  if (baseUrl.includes('api.builder.io')) {
    const url = new URL(baseUrl);
    url.searchParams.set('width', width);
    url.searchParams.set('quality', quality);
    url.searchParams.set('format', format);
    return url.toString();
  }
  
  return baseUrl;
};

// Hook for responsive image handling
export const useResponsiveImage = (src, options = {}) => {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !src) return;

    const updateImageSrc = () => {
      const containerWidth = element.getBoundingClientRect().width;
      const devicePixelRatio = window.devicePixelRatio || 1;
      const targetWidth = Math.ceil(containerWidth * devicePixelRatio);

      const optimized = getResponsiveImageUrl(src, targetWidth, options.quality, options.format);
      setOptimizedSrc(optimized);
    };

    updateImageSrc();

    const resizeObserver = new ResizeObserver(updateImageSrc);
    resizeObserver.observe(element);

    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, [src, options.quality, options.format]);

  return {
    containerRef,
    optimizedSrc,
    isLoading,
    setIsLoading
  };
};

export default ResponsiveImage;
