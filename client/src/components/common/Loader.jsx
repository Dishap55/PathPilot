import React, { useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * PathPilot Global Brand Loader
 *
 * Visual Architecture:
 * - Center Element: PathPilot Brand Logo (COMPLETELY STATIONARY)
 * - Orbiting Ring: Thin metallic circular ring rotating continuously 360°
 * - Ring Aesthetics:
 *   - Brushed platinum / chrome gradient with pastel iridescent hues
 *     (soft lavender, sky blue, rose pink, specular white)
 *   - Luminous moving metallic reflection / shimmer along the perimeter
 *   - Glowing specular highlight bead
 *   - Whisper-thin inner glass refraction hairline
 *   - Subtle ambient aura with calm pulsing glow
 * - Scalable: xs (22px), sm (34px), md (56px), lg (84px), xl (112px), or numeric px
 * - Modes: inline, card overlay, or fullScreen glassmorphic backdrop
 */

// Dimension tokens for standardized sizes
const SIZE_MAP = {
  xs: { box: 22, ringStroke: 2.4, logoBox: 12, iconSize: 7, text: 'text-[10px]' },
  sm: { box: 34, ringStroke: 2.2, logoBox: 19, iconSize: 11, text: 'text-xs' },
  md: { box: 56, ringStroke: 2.0, logoBox: 30, iconSize: 17, text: 'text-xs' },
  lg: { box: 84, ringStroke: 1.8, logoBox: 46, iconSize: 26, text: 'text-sm' },
  xl: { box: 112, ringStroke: 1.6, logoBox: 62, iconSize: 34, text: 'text-base' }
};

export default function Loader({
  size = 'md',
  text = '',
  fullScreen = false,
  overlay = false,
  className = '',
  logoVariant = 'icon', // 'icon' (paper plane pilot) or 'text' ('PP')
}) {
  const instanceId = useId().replace(/:/g, '');
  const metallicGradId = `pp-metallic-${instanceId}`;
  const highlightGradId = `pp-highlight-${instanceId}`;
  const glowFilterId = `pp-glow-${instanceId}`;

  // Resolve dimensions
  const dims = typeof size === 'number'
    ? {
        box: size,
        ringStroke: Math.max(1.4, (size / 56) * 2.0),
        logoBox: Math.round(size * 0.54),
        iconSize: Math.round(size * 0.3),
        text: size < 40 ? 'text-xs' : 'text-sm'
      }
    : SIZE_MAP[size] || SIZE_MAP.md;

  const ringRadius = 43; // based on viewBox 0 0 100 100
  const circumference = 2 * Math.PI * ringRadius; // ~270.18
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, filter: shouldReduceMotion ? 'none' : 'blur(4px)' }}
      transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      role="status"
      aria-label={text || 'Loading'}
    >
      {/* Container for Loader Graphic */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: dims.box, height: dims.box }}
      >
        {/* 1. Subtle Ambient Pastel Aura (Soft breathing glow) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.45, scale: 1 }
              : {
                  scale: [0.94, 1.06, 0.94],
                  opacity: [0.35, 0.65, 0.35]
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 rounded-full pointer-events-none -z-10"
          style={{
            background:
              'radial-gradient(circle, rgba(199, 210, 254, 0.45) 0%, rgba(186, 230, 253, 0.35) 45%, rgba(251, 207, 232, 0.25) 75%, transparent 100%)',
            filter: 'blur(6px)'
          }}
        />

        {/* 2. Rotating Metallic Circular Ring Layer */}
        {/* ONLY this container rotates 360° continuously */}
        <motion.div
          animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              {/* Premium Metallic Gradient with Iridescent Pastel Lighting */}
              <linearGradient
                id={metallicGradId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="14%" stopColor="#C7D2FE" stopOpacity="0.85" /> {/* Soft lavender */}
                <stop offset="32%" stopColor="#BAE6FD" stopOpacity="0.8" />  {/* Sky blue */}
                <stop offset="50%" stopColor="#E2E8F0" stopOpacity="0.9" />  {/* Platinum steel */}
                <stop offset="68%" stopColor="#FBCFE8" stopOpacity="0.85" /> {/* Soft pink */}
                <stop offset="84%" stopColor="#818CF8" stopOpacity="0.85" /> {/* Iridescent violet */}
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
              </linearGradient>

              {/* Intense Moving Metallic Specular Highlight */}
              <linearGradient
                id={highlightGradId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="45%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="80%" stopColor="#C7D2FE" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              {/* Very Subtle Filter for Specular Shimmer */}
              <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Continuous Metallic Ring */}
            <circle
              cx="50"
              cy="50"
              r={ringRadius}
              fill="none"
              stroke={`url(#${metallicGradId})`}
              strokeWidth={dims.ringStroke}
              strokeLinecap="round"
              className="opacity-90"
            />

            {/* Whisper-Thin Inner Refraction Hairline (Glass / Chrome depth) */}
            <circle
              cx="50"
              cy="50"
              r={ringRadius - 3.2}
              fill="none"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth={Math.max(0.6, dims.ringStroke * 0.35)}
              strokeDasharray="8 12"
              className="opacity-50"
            />

            {/* Moving Metallic Shimmer Arc */}
            <circle
              cx="50"
              cy="50"
              r={ringRadius}
              fill="none"
              stroke={`url(#${highlightGradId})`}
              strokeWidth={dims.ringStroke + 0.8}
              strokeDasharray={`${circumference * 0.28} ${circumference * 0.72}`}
              strokeLinecap="round"
              filter={`url(#${glowFilterId})`}
            />

            {/* Specular Bead (Luminous gleam on ring) */}
            <circle
              cx="50"
              cy={50 - ringRadius}
              r={Math.max(1.2, dims.ringStroke * 0.85)}
              fill="#FFFFFF"
              className="drop-shadow-[0_0_3px_rgba(255,255,255,0.95)]"
            />
          </svg>
        </motion.div>

        {/* 3. Center Element: PathPilot Brand Logo (COMPLETELY STATIONARY) */}
        {/* Placed outside the rotating container so it never rotates */}
        <div
          className="relative z-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-500 text-white shadow-[0_4px_14px_rgba(79,70,229,0.3),inset_0_1px_1px_rgba(255,255,255,0.45)] transition-transform duration-200"
          style={{
            width: dims.logoBox,
            height: dims.logoBox,
            borderRadius: Math.max(6, Math.round(dims.logoBox * 0.32))
          }}
        >
          {logoVariant === 'text' || dims.iconSize < 10 ? (
            <span
              className="font-black tracking-tighter select-none"
              style={{ fontSize: Math.max(9, Math.round(dims.iconSize * 0.95)) }}
            >
              PP
            </span>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: dims.iconSize, height: dims.iconSize }}
              className="text-white drop-shadow-xs -rotate-12 translate-x-[1px]"
            >
              {/* Canonical PathPilot navigation pilot / paper plane glyph */}
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          )}

          {/* Inner specular glass highlight on top half of logo badge */}
          <div
            className="absolute inset-x-0 top-0 h-1/2 rounded-t-[inherit] bg-gradient-to-b from-white/35 to-transparent pointer-events-none"
          />
        </div>
      </div>

      {/* 4. Optional Text Label with Calm Shimmer */}
      {text && (
        <motion.p
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className={`mt-3 font-semibold text-slate-600 tracking-wide text-center max-w-xs ${dims.text}`}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  // Full-Screen Glassmorphic Modal Overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 backdrop-blur-md transition-all">
        {content}
      </div>
    );
  }

  // Card / Container Overlay Mode
  if (overlay) {
    return (
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-xs rounded-[inherit] transition-all">
        {content}
      </div>
    );
  }

  // Standard inline loader
  return content;
}

/**
 * Convenient Full-Page Loader Helper
 */
export function PageLoader({ text = 'Loading PathPilot...', size = 'lg' }) {
  return (
    <div className="min-h-[55vh] flex flex-col items-center justify-center p-6">
      <Loader size={size} text={text} />
    </div>
  );
}

/**
 * Convenient Card / Block Loader Helper
 */
export function CardLoader({ text = '', size = 'md' }) {
  return (
    <div className="py-8 flex flex-col items-center justify-center w-full">
      <Loader size={size} text={text} />
    </div>
  );
}
