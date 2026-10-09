import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const BestuContext = createContext(null);

const DEFAULT_CONTEXT = {
  route: '',
  page: '',
  subject: '',
  category: '',
  topic: '',
  topicId: '',
  section: '',
  sectionId: '',
  activeCard: null,
  currentQuestion: null,
  availableSections: [],
  navigationInfo: null
};

export function BestuProvider({ children, baseContext = {} }) {
  const [pageContext, setPageContextState] = useState({});

  const setPageContext = useCallback((updater) => {
    setPageContextState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      return next;
    });
  }, []);

  const clearPageContext = useCallback(() => {
    setPageContextState({});
  }, []);

  const mergedContext = useMemo(() => {
    return {
      ...DEFAULT_CONTEXT,
      ...baseContext,
      ...pageContext
    };
  }, [baseContext, pageContext]);

  const value = useMemo(() => ({
    context: mergedContext,
    setPageContext,
    clearPageContext
  }), [mergedContext, setPageContext, clearPageContext]);

  return (
    <BestuContext.Provider value={value}>
      {children}
    </BestuContext.Provider>
  );
}

export function useBestu() {
  const ctx = useContext(BestuContext);
  if (!ctx) {
    return {
      context: DEFAULT_CONTEXT,
      setPageContext: () => {},
      clearPageContext: () => {}
    };
  }
  return ctx;
}
