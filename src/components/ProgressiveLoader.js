import React, { Suspense, useState, useEffect } from 'react';

// Adaptive loading hook moved here to fix React context issues
const useAdaptiveLoading = () => {
  const getNetworkInfo = () => {
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

  const [networkInfo, setNetworkInfo] = useState(getNetworkInfo());
  
  useEffect(() => {
    if ('connection' in navigator) {
      const updateNetworkInfo = () => setNetworkInfo(getNetworkInfo());
      navigator.connection.addEventListener('change', updateNetworkInfo);
      
      return () => {
        navigator.connection.removeEventListener('change', updateNetworkInfo);
      };
    }
  }, []);

  const shouldLoadHighQuality = networkInfo
    ? !networkInfo.saveData && networkInfo.effectiveType !== 'slow-2g'
    : true;

  return {
    networkInfo,
    shouldLoadHighQuality,
    isSlowConnection: networkInfo?.effectiveType === 'slow-2g' || networkInfo?.saveData
  };
};

// Loading skeleton component
const LoadingSkeleton = ({ type = 'default', className = '' }) => {
  const skeletonStyles = {
    default: {
      width: '100%',
      height: '200px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      animation: 'pulse 1.5s ease-in-out infinite alternate'
    },
    text: {
      width: '100%',
      height: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      animation: 'pulse 1.5s ease-in-out infinite alternate'
    },
    image: {
      width: '100%',
      height: '300px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      animation: 'pulse 1.5s ease-in-out infinite alternate'
    },
    card: {
      width: '100%',
      height: '400px',
      backgroundColor: '#f0f0f0',
      borderRadius: '12px',
      animation: 'pulse 1.5s ease-in-out infinite alternate'
    }
  };

  return (
    <div 
      className={`loading-skeleton ${className}`}
      style={skeletonStyles[type]}
      role="progressbar"
      aria-label="Content loading"
    >
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

// Progressive loader component
const ProgressiveLoader = ({ 
  children, 
  fallback = null, 
  delay = 0,
  timeout = 10000,
  onError = null,
  adaptiveLoading = true 
}) => {
  const [showFallback, setShowFallback] = useState(delay > 0);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const { isSlowConnection } = useAdaptiveLoading();

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setShowFallback(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasTimedOut(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  const handleError = (error, errorInfo) => {
    console.error('ProgressiveLoader error:', error, errorInfo);
    onError?.(error, errorInfo);
  };

  // Adaptive fallback based on connection speed
  const adaptiveFallback = adaptiveLoading && isSlowConnection 
    ? <LoadingSkeleton type="card" />
    : fallback || <LoadingSkeleton />;

  if (hasTimedOut) {
    return (
      <div className="progressive-loader-timeout">
        <p>Content is taking longer than expected to load.</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (showFallback) {
    return adaptiveFallback;
  }

  return (
    <ErrorBoundary onError={handleError}>
      <Suspense fallback={adaptiveFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="progressive-loader-error">
          <h3>Something went wrong</h3>
          <p>Failed to load content. Please try again.</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy component loader with progressive enhancement
export const LazyComponentLoader = ({ 
  importFunc, 
  fallback = <LoadingSkeleton />, 
  chunkName = 'lazy-component' 
}) => {
  const LazyComponent = React.lazy(() => {
    // Add webpack chunk name for better debugging
    return importFunc().catch((error) => {
      console.error(`Failed to load ${chunkName}:`, error);
      // Return a fallback component
      return {
        default: () => (
          <div className="lazy-load-error">
            <p>Failed to load component</p>
            <button onClick={() => window.location.reload()}>
              Reload page
            </button>
          </div>
        )
      };
    });
  });

  return (
    <ProgressiveLoader fallback={fallback}>
      <LazyComponent />
    </ProgressiveLoader>
  );
};

// Image progressive loader
export const ProgressiveImage = ({ 
  src, 
  alt, 
  placeholder = null,
  className = '',
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { shouldLoadHighQuality } = useAdaptiveLoading();

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  // Use lower quality image for slow connections
  const adaptiveSrc = shouldLoadHighQuality 
    ? src 
    : src.replace(/width=\d+/, 'width=800').replace(/quality=\d+/, 'quality=60');

  return (
    <div className={`progressive-image-container ${className}`}>
      {!imageLoaded && !imageError && (
        placeholder || <LoadingSkeleton type="image" />
      )}
      
      {imageError && (
        <div className="progressive-image-error">
          <p>Failed to load image</p>
        </div>
      )}
      
      <img
        src={adaptiveSrc}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        {...props}
      />
    </div>
  );
};

// Progressive section loader for viewport-based loading
export const ProgressiveSection = ({ 
  children, 
  threshold = 0.1, 
  rootMargin = '50px 0px',
  fallback = <LoadingSkeleton type="card" />,
  disabled = false 
}) => {
  const [isVisible, setIsVisible] = useState(disabled);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref || disabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, threshold, rootMargin, disabled]);

  return (
    <div ref={setRef}>
      {isVisible ? children : fallback}
    </div>
  );
};

// Performance monitoring wrapper
export const withPerformanceMonitoring = (Component, componentName) => {
  return React.forwardRef((props, ref) => {
    useEffect(() => {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        if (renderTime > 16) { // More than one frame at 60fps
          console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`);
        }
      };
    });

    return <Component {...props} ref={ref} />;
  });
};

export default ProgressiveLoader;
export { LoadingSkeleton, ErrorBoundary };
