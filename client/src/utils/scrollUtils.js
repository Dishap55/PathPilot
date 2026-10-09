/**
 * PathPilot Global Topic Scroll Utilities
 *
 * Smooth, responsive, dynamic auto-scroll utility for subject learning studios:
 * - Dynamically calculates sticky header / navbar height (supports mobile & desktop)
 * - Applies responsive buffer spacing (12px on mobile <640px, 20px on desktop)
 * - Prevents content from clipping underneath sticky headers or fixed elements
 * - Uses requestAnimationFrame for guaranteed DOM readiness post-state change
 * - Reusable across all subjects: DSA, Aptitude, OOPS, DBMS, OS, CN
 */

export function getStickyHeaderHeight() {
  if (typeof document === 'undefined') return 64;
  const header = document.querySelector('header') || document.querySelector('nav');
  if (header) {
    const rect = header.getBoundingClientRect();
    if (rect.height > 0) return rect.height;
  }
  return 64; // Default fallback for PathPilot navbar (h-16 = 64px)
}

export function getResponsiveBuffer() {
  if (typeof window === 'undefined') return 16;
  return window.innerWidth < 640 ? 12 : 20;
}

/**
 * Smoothly scrolls to a learning content section with dynamic header compensation.
 *
 * @param {React.RefObject|HTMLElement|string} target - Ref object, DOM element, or selector/ID string
 * @param {Object} [options]
 * @param {number} [options.extraBuffer] - Custom buffer spacing override in pixels
 * @param {ScrollBehavior} [options.behavior='smooth'] - Scroll behavior ('smooth' | 'auto')
 * @param {Function} [options.onComplete] - Optional callback after scroll request is scheduled
 */
export function scrollToLearningContent(target, options = {}) {
  if (typeof window === 'undefined') return;

  requestAnimationFrame(() => {
    let element = null;

    if (target && typeof target === 'object' && 'current' in target) {
      element = target.current;
    } else if (target instanceof HTMLElement) {
      element = target;
    } else if (typeof target === 'string') {
      const cleanId = target.replace(/^#/, '');
      element = document.getElementById(cleanId) || document.querySelector(target);
    }

    // Fallback: search common subject learning container IDs
    if (!element) {
      element =
        document.getElementById('dsa-learning-section') ||
        document.getElementById('aptitude-learning-section') ||
        document.getElementById('oops-learning-section') ||
        document.getElementById('subject-learning-section') ||
        document.getElementById('milestone-learning-section') ||
        document.querySelector('[data-learning-content="true"]');
    }

    if (!element) return;

    const headerHeight = getStickyHeaderHeight();
    const buffer = options.extraBuffer !== undefined ? options.extraBuffer : getResponsiveBuffer();

    const elementRect = element.getBoundingClientRect();
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const targetScrollY = Math.max(0, elementRect.top + currentScrollY - headerHeight - buffer);

    window.scrollTo({
      top: targetScrollY,
      behavior: options.behavior || 'smooth'
    });

    if (typeof options.onComplete === 'function') {
      options.onComplete();
    }
  });
}
