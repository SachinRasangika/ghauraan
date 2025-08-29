/**
 * Touch gesture utilities for mobile carousel interactions
 */

export const useTouchGestures = (onSwipeLeft, onSwipeRight, threshold = 50) => {
  let startX = 0;
  let startY = 0;
  let startTime = 0;

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    startTime = Date.now();
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const endTime = Date.now();
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const deltaTime = endTime - startTime;
    
    // Check if it's a swipe (not a tap and has enough movement)
    if (Math.abs(deltaX) > threshold && Math.abs(deltaY) < threshold * 1.5 && deltaTime < 500) {
      e.preventDefault();
      
      if (deltaX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
};

export const addSwipeSupport = (element, onSwipeLeft, onSwipeRight, threshold = 50) => {
  let startX = 0;
  let startY = 0;
  let startTime = 0;

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    startTime = Date.now();
  };

  const handleTouchMove = (e) => {
    // Prevent scrolling during horizontal swipe
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - startX);
    const deltaY = Math.abs(touch.clientY - startY);
    
    if (deltaX > deltaY) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const endTime = Date.now();
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const deltaTime = endTime - startTime;
    
    // Check if it's a swipe
    if (Math.abs(deltaX) > threshold && Math.abs(deltaY) < threshold * 1.5 && deltaTime < 500) {
      if (deltaX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }
  };

  element.addEventListener('touchstart', handleTouchStart, { passive: true });
  element.addEventListener('touchmove', handleTouchMove, { passive: false });
  element.addEventListener('touchend', handleTouchEnd, { passive: true });

  // Return cleanup function
  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
    element.removeEventListener('touchend', handleTouchEnd);
  };
};

// Utility for smooth scrolling with momentum
export const smoothScroll = (element, targetX, duration = 300) => {
  const startX = element.scrollLeft;
  const distance = targetX - startX;
  const startTime = performance.now();

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    
    element.scrollLeft = startX + (distance * easedProgress);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

// Utility to detect if device supports touch
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Utility for better touch targets
export const createTouchFriendlyTarget = (element, minSize = 44) => {
  const rect = element.getBoundingClientRect();
  
  if (rect.width < minSize || rect.height < minSize) {
    element.style.minWidth = `${minSize}px`;
    element.style.minHeight = `${minSize}px`;
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
  }
};
