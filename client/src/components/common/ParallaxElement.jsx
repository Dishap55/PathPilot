import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * PathPilot Reusable Parallax Layer Component
 * 
 * Provides distinct, highly noticeable multi-layered depth across all public/landing website sections.
 * 
 * Desktop Movement Depths:
 * - 'background' / 'slow': ±35px (inverse direction relative to content for 3D depth separation)
 * - 'content': ±14px
 * - 'decorations' / 'medium': ±38px
 * - 'foreground' / 'fast': ±60px
 * 
 * Mobile Movement: ~45% of desktop movement
 * Reduced Motion: Supported via prefers-reduced-motion
 */
export default function ParallaxElement({
  children,
  depth = 'medium',
  offset,
  containerRef,
  className = '',
  style = {},
  ...props
}) {
  const elementRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [rawY, setRawY] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener);
      }
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  let baseOffset = 38;
  if (typeof offset === 'number') {
    baseOffset = offset;
  } else {
    switch (depth) {
      case 'background':
      case 'slow':
        // Inverse direction: Background moves opposite to foreground to maximize 3D depth perception
        baseOffset = -35;
        break;
      case 'content':
        baseOffset = 14;
        break;
      case 'decorations':
      case 'medium':
        baseOffset = 38;
        break;
      case 'foreground':
      case 'fast':
        baseOffset = 60;
        break;
      default:
        baseOffset = 38;
    }
  }

  // Mobile scaling: ~45% of desktop movement
  const targetOffset = isMobile ? baseOffset * 0.45 : baseOffset;

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Locate actual scrolling DOM container
    let scrollParent = containerRef?.current;
    if (!scrollParent && elementRef.current) {
      scrollParent = elementRef.current.closest('.overflow-y-auto') || 
                     elementRef.current.closest('[data-scroll-container]') || 
                     elementRef.current.closest('main') || 
                     window;
    }
    if (!scrollParent) scrollParent = window;

    const updatePosition = () => {
      if (!elementRef.current) return;

      let containerTop = 0;
      let containerHeight = window.innerHeight;

      if (scrollParent !== window && scrollParent.getBoundingClientRect) {
        const rect = scrollParent.getBoundingClientRect();
        containerTop = rect.top;
        containerHeight = rect.height;
      }

      const elemRect = elementRef.current.getBoundingClientRect();
      
      // Calculate view ratio:
      // 0 when element center aligns with viewport center
      // -1 when element center is at bottom of viewport
      // +1 when element center is at top of viewport
      const viewportCenter = containerTop + containerHeight / 2;
      const elementCenter = elemRect.top + elemRect.height / 2;
      const viewRatio = Math.max(-1.2, Math.min(1.2, (viewportCenter - elementCenter) / (containerHeight / 2)));

      const calculatedY = viewRatio * targetOffset;
      setRawY(calculatedY);
    };

    updatePosition();

    const targetToListen = scrollParent === window ? window : scrollParent;
    targetToListen.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition, { passive: true });

    return () => {
      targetToListen.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [containerRef, targetOffset, prefersReducedMotion]);

  // High-performance spring interpolation
  const springY = useSpring(rawY, { stiffness: 140, damping: 22, mass: 0.1 });

  if (prefersReducedMotion) {
    return <div className={className} style={style} {...props}>{children}</div>;
  }

  return (
    <motion.div
      ref={elementRef}
      style={{
        ...style,
        y: springY,
        willChange: 'transform'
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
