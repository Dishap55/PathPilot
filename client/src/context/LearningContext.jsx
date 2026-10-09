import React, { createContext, useState } from 'react';

export const LearningContext = createContext(null);

export function LearningProvider({ children }) {
  const [currentTopic, setCurrentTopic] = useState('Two Pointers & Sliding Window');
  const [activeQuestion, setActiveQuestion] = useState(null);

  return (
    <LearningContext.Provider value={{ currentTopic, setCurrentTopic, activeQuestion, setActiveQuestion }}>
      {children}
    </LearningContext.Provider>
  );
}
