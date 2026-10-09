import { useEffect, useRef, useCallback } from 'react';
import { scrollToLearningContent } from '../utils/scrollUtils';

/**
 * useTopicAutoScroll Hook
 *
 * Provides reusable auto-scroll / auto-focus behavior across all subject learning pages:
 * - Triggers smooth auto-scroll when user intentionally selects a topic
 * - Handles initial URL-selected topic (deep links) smoothly on mount if explicit topic is in URL
 * - Does NOT auto-scroll on normal page re-renders, user scrolling, Bestu messages, or notes
 * - Supports React ref or fallback element ID
 *
 * @param {Object} config
 * @param {string} config.activeTopic - Current active topic ID
 * @param {boolean} [config.hasExplicitTopic=false] - True if topic was explicitly chosen or provided via URL
 * @param {string} [config.contentId] - Element ID of the learning content container
 * @param {React.RefObject} [config.contentRef] - Optional React ref to the learning content container
 * @returns {{ contentRef: React.RefObject, scrollToContent: Function }}
 */
export function useTopicAutoScroll({
  activeTopic,
  hasExplicitTopic = false,
  contentId,
  contentRef: externalRef
} = {}) {
  const internalRef = useRef(null);
  const ref = externalRef || internalRef;
  const isFirstMountRef = useRef(true);

  const scrollToContent = useCallback(
    (options = {}) => {
      scrollToLearningContent(ref.current || contentId, options);
    },
    [ref, contentId]
  );

  // Auto-scroll on initial load IF AND ONLY IF an explicit topic was provided in URL / deep link
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      if (hasExplicitTopic && activeTopic) {
        // Subtle delay on initial mount to allow dynamic layout & fonts to settle
        const timer = setTimeout(() => {
          scrollToContent();
        }, 160);
        return () => clearTimeout(timer);
      }
    }
  }, [hasExplicitTopic, activeTopic, scrollToContent]);

  return {
    contentRef: ref,
    scrollToContent
  };
}

export default useTopicAutoScroll;
