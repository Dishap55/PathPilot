import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '../components/common/Loader';

/**
 * PathPilot Global Loading System Context
 * Provides centralized async loading triggers across pages, APIs, and components.
 */

const LoadingContext = createContext({
  isLoading: false,
  loadingText: '',
  showLoading: () => {},
  hideLoading: () => {}
});

export function LoadingProvider({ children }) {
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    text: ''
  });

  const showLoading = useCallback((text = 'Loading...') => {
    setLoadingState({
      isLoading: true,
      text: typeof text === 'string' ? text : 'Loading...'
    });
  }, []);

  const hideLoading = useCallback(() => {
    setLoadingState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  const value = useMemo(
    () => ({
      isLoading: loadingState.isLoading,
      loadingText: loadingState.text,
      showLoading,
      hideLoading
    }),
    [loadingState.isLoading, loadingState.text, showLoading, hideLoading]
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}

      {/* Global Full-Screen Glassmorphic Loader Overlay */}
      <AnimatePresence>
        {loadingState.isLoading && (
          <Loader
            fullScreen
            size="lg"
            text={loadingState.text}
          />
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
}

/**
 * Custom Hook to access global loading controls
 */
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    console.warn('[useLoading] Used outside of <LoadingProvider />. Returning fallback no-op handlers.');
    return {
      isLoading: false,
      loadingText: '',
      showLoading: () => {},
      hideLoading: () => {}
    };
  }
  return context;
}

export default LoadingContext;
