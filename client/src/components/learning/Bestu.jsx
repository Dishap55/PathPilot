/**
 * Bestu.jsx — PathPilot AI Mentor Robot Widget
 *
 * Features:
 *  • Animated SVG robot with multiple poses (sitting, standing, greeting,
 *    listening, thinking, talking, celebrating, helping)
 *  • Smooth Framer Motion transitions between poses
 *  • Hover → standing + speech bubble
 *  • Click → opens compact mentor chat panel
 *  • Text input + voice input (SpeechRecognition)
 *  • Text-to-Speech response playback
 *  • Context-aware quick actions
 *  • Calls /api/bestu/chat using existing apiRequest chain
 *  • Light / dark mode safe
 *  • Fully accessible (ARIA, keyboard)
 *  • Non-intrusive fixed positioning
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X, Minus, Mic, MicOff, Send, Volume2, VolumeX,
  Zap, BookOpen, HelpCircle, ChevronRight, RefreshCw
} from 'lucide-react';
import { aiService } from '../../services/aiService';
import { useBestu } from '../../contexts/BestuContext';

const BESTU_CHAT_TIMEOUT_MS = 45_000;

// ─────────────────────────────────────────────
//  SVG Robot — all poses defined via CSS classes
//  We animate individual parts with Framer Motion
// ─────────────────────────────────────────────

const ROBOT_COLORS = {
  body: '#6574C4',
  bodyLight: '#8B9BD4',
  chest: '#4A57A8',
  face: '#1E2B6B',
  eyeGlow: '#7EDCFF',
  antenna: '#FFD166',
  highlight: '#FFFFFF',
  shadow: 'rgba(0,0,0,0.15)',
  emblem: '#FFFFFF',
};

// Defines vertical offsets per pose for simple animation
const POSE_CONFIG = {
  sitting: { bodyY: 14, headY: 0, armLAngle: 20, armRAngle: -20, legBend: 40 },
  standing: { bodyY: 0, headY: 0, armLAngle: 10, armRAngle: -10, legBend: 0 },
  greeting: { bodyY: 0, headY: -3, armLAngle: -60, armRAngle: -10, legBend: 0 },
  listening: { bodyY: 0, headY: 4, armLAngle: 20, armRAngle: -20, legBend: 0 },
  thinking: { bodyY: 0, headY: -2, armLAngle: -30, armRAngle: 40, legBend: 0 },
  talking: { bodyY: 0, headY: 0, armLAngle: 15, armRAngle: -15, legBend: 0 },
  celebrating: { bodyY: -6, headY: -4, armLAngle: -75, armRAngle: 75, legBend: 0 },
  helping: { bodyY: 0, headY: 2, armLAngle: -45, armRAngle: -10, legBend: 0 },
};

function BestuRobot({ pose = 'sitting', isListening = false, isTalking = false, size = 96 }) {
  const config = POSE_CONFIG[pose] || POSE_CONFIG.standing;
  const scale = size / 120; // base design at 120px

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 4px 12px rgba(101,116,196,0.35))' }}
    >
      {/* ── Antenna ── */}
      <motion.g
        animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '60px', originY: '12px' }}
      >
        <line x1="60" y1="22" x2="60" y2="10" stroke={ROBOT_COLORS.antenna} strokeWidth="3" strokeLinecap="round" />
        <motion.circle
          cx="60" cy="8" r="5"
          fill={ROBOT_COLORS.antenna}
          animate={{ scale: isListening ? [1, 1.4, 1] : [1, 1.1, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: isListening ? 0.6 : 2, repeat: Infinity }}
        />
      </motion.g>

      {/* ── Head ── */}
      <motion.g
        animate={{ y: config.headY }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Head body */}
        <rect x="34" y="18" width="52" height="44" rx="14" fill={ROBOT_COLORS.bodyLight} />
        <rect x="34" y="18" width="52" height="24" rx="14" fill={ROBOT_COLORS.body} />

        {/* Face screen */}
        <rect x="40" y="24" width="40" height="30" rx="8" fill={ROBOT_COLORS.face} />

        {/* Eyes */}
        <motion.g
          animate={isTalking ? { scaleY: [1, 0.2, 1] } : { scaleY: [1, 0.05, 1, 1, 1] }}
          transition={isTalking
            ? { duration: 0.4, repeat: Infinity, repeatDelay: 0.2 }
            : { duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }
          }
          style={{ originY: '35px' }}
        >
          {/* Left eye */}
          <circle cx="50" cy="35" r="6" fill={ROBOT_COLORS.eyeGlow} opacity="0.9" />
          <circle cx="50" cy="35" r="3.5" fill={ROBOT_COLORS.face} />
          <circle cx="51.5" cy="33.5" r="1.5" fill={ROBOT_COLORS.eyeGlow} opacity="0.6" />
          {/* Right eye */}
          <circle cx="70" cy="35" r="6" fill={ROBOT_COLORS.eyeGlow} opacity="0.9" />
          <circle cx="70" cy="35" r="3.5" fill={ROBOT_COLORS.face} />
          <circle cx="71.5" cy="33.5" r="1.5" fill={ROBOT_COLORS.eyeGlow} opacity="0.6" />
        </motion.g>

        {/* Mouth */}
        <motion.path
          d={isTalking ? "M50 47 Q60 52 70 47" : "M50 48 Q60 44 70 48"}
          stroke={ROBOT_COLORS.eyeGlow}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          animate={isTalking ? { d: ["M50 47 Q60 52 70 47", "M50 49 Q60 43 70 49", "M50 47 Q60 52 70 47"] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        />

        {/* "P" chest emblem on lower face area */}
        <text x="56" y="58" fontSize="11" fontWeight="bold" fill={ROBOT_COLORS.emblem} opacity="0.85">P</text>
      </motion.g>

      {/* ── Body ── */}
      <motion.g
        animate={{ y: config.bodyY }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      >
        {/* Torso */}
        <rect x="32" y="64" width="56" height="36" rx="10" fill={ROBOT_COLORS.body} />
        <rect x="32" y="64" width="56" height="18" rx="10" fill={ROBOT_COLORS.bodyLight} />

        {/* Chest panel */}
        <rect x="42" y="70" width="36" height="22" rx="6" fill={ROBOT_COLORS.chest} />
        {/* Chest screen dots */}
        <motion.circle cx="52" cy="79" r="3" fill={ROBOT_COLORS.eyeGlow}
          animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} />
        <motion.circle cx="60" cy="79" r="3" fill={ROBOT_COLORS.eyeGlow}
          animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} />
        <motion.circle cx="68" cy="79" r="3" fill={ROBOT_COLORS.eyeGlow}
          animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }} />
        <rect x="46" y="86" width="28" height="3" rx="1.5" fill={ROBOT_COLORS.eyeGlow} opacity="0.4" />

        {/* Left Arm */}
        <motion.g
          animate={{ rotate: config.armLAngle }}
          style={{ originX: '32px', originY: '72px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <rect x="18" y="64" width="16" height="30" rx="8" fill={ROBOT_COLORS.bodyLight} />
          <rect x="20" y="90" width="12" height="10" rx="6" fill={ROBOT_COLORS.body} />
        </motion.g>

        {/* Right Arm */}
        <motion.g
          animate={{ rotate: config.armRAngle }}
          style={{ originX: '88px', originY: '72px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <rect x="86" y="64" width="16" height="30" rx="8" fill={ROBOT_COLORS.bodyLight} />
          <rect x="88" y="90" width="12" height="10" rx="6" fill={ROBOT_COLORS.body} />
        </motion.g>

        {/* Legs */}
        <motion.g
          animate={{ y: config.legBend > 0 ? config.legBend / 5 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Left leg */}
          <rect x="38" y="98" width="16" height="28" rx="8" fill={ROBOT_COLORS.bodyLight} />
          <rect x="36" y="122" width="20" height="10" rx="5" fill={ROBOT_COLORS.body} />
          {/* Right leg */}
          <rect x="66" y="98" width="16" height="28" rx="8" fill={ROBOT_COLORS.bodyLight} />
          <rect x="64" y="122" width="20" height="10" rx="5" fill={ROBOT_COLORS.body} />
        </motion.g>
      </motion.g>

      {/* ── Listening glow ring ── */}
      <AnimatePresence>
        {isListening && (
          <motion.circle
            cx="60" cy="62"
            r="52"
            stroke={ROBOT_COLORS.eyeGlow}
            strokeWidth="3"
            fill="none"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.7, 0.2, 0.7], scale: [1, 1.12, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
      </AnimatePresence>
    </motion.svg>
  );
}

// ─────────────────────────────────────────────
//  Quick action templates per subject / topic / card / question
// ─────────────────────────────────────────────
function getQuickActions({ subject, topic, section, activeCard, currentQuestion }) {
  if (currentQuestion) {
    return [
      { label: 'Give me a hint', query: "I'm stuck. Can you give me a hint?" },
      { label: 'Why is my answer wrong?', query: 'Why is my answer wrong?' },
      { label: 'Give me the full solution', query: 'Give me the full solution.' },
      { label: 'Explain this problem', query: `Explain ${currentQuestion.title || 'this problem'} step by step.` }
    ];
  }

  if (activeCard) {
    return [
      { label: 'Explain this card', query: `Explain ${activeCard.title} simply.` },
      { label: 'Give an example', query: 'Give me an example.' },
      { label: 'Formula?', query: 'Formula?' },
      { label: 'Where is this card?', query: 'Where can I find that card?' }
    ];
  }

  const base = [
    { label: 'Where is OOPS?', query: 'Can you give me the OOPS part?' },
    { label: 'Where is Aptitude?', query: 'Can you give me the aptitude part?' },
    { label: 'Where is DSA?', query: 'Where is my DSA?' },
    { label: 'Explain this', query: `Explain ${topic || 'this topic'} simply.` },
    { label: 'Give an example', query: `Give me a simple example for ${topic || 'this'}.` }
  ];

  if (topic) {
    base.unshift({ label: 'Formula?', query: 'Formula?' });
  }

  return base.slice(0, 5);
}

// ─────────────────────────────────────────────
//  Speech Recognition hook
// ─────────────────────────────────────────────
function useSpeechRecognition({ onResult, onEnd, onError }) {
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const supported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const start = useCallback(() => {
    if (!supported) { onError?.('Voice input is not supported in this browser.'); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join(' ');
      onResult?.(transcript);
    };
    recognition.onend = () => { setIsListening(false); onEnd?.(); };
    recognition.onerror = (e) => {
      setIsListening(false);
      const msg = e.error === 'not-allowed'
        ? 'Microphone permission denied. Please allow microphone access.'
        : e.error === 'network'
          ? 'Network error during voice recognition. Please check connection.'
          : `Sorry, I couldn't hear that. Please try again.`;
      onError?.(msg);
    };
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [supported, onResult, onEnd, onError]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { isListening, start, stop, supported };
}

// ─────────────────────────────────────────────
//  Text-to-Speech hook
// ─────────────────────────────────────────────
function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const speak = useCallback((text) => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.lang = 'en-IN';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [supported]);

  return { isSpeaking, speak, stop, supported };
}

// ─────────────────────────────────────────────
//  Message component
// ─────────────────────────────────────────────
function ChatMessage({ msg, onSpeak, isSpeaking }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end`}
    >
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-[#6574C4] flex items-center justify-center shrink-0 text-[9px] font-bold text-white">B</div>
      )}
      <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
        isUser
          ? 'bg-[#6574C4] text-white rounded-br-sm'
          : 'bg-[#F0F2FF] dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-sm border border-[#DDE1F5] dark:border-slate-600'
      }`}>
        {msg.content}
        {!isUser && (
          <button
            onClick={() => isSpeaking ? null : onSpeak(msg.content)}
            className="ml-2 inline-flex items-center opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Read response aloud"
          >
            {isSpeaking ? <VolumeX size={11} /> : <Volume2 size={11} />}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  Main Bestu Component
// ─────────────────────────────────────────────

export default function Bestu({
  subject = '',
  category = '',
  topic = '',
  section = '',
  currentExample = '',
  studentAnswer = '',
  currentStep = '',
}) {
  const { context: bestuContext } = useBestu();

  const activeSubject = subject || bestuContext.subject || '';
  const activeCategory = category || bestuContext.category || '';
  const activeTopic = topic || bestuContext.topic || '';
  const activeSection = section || bestuContext.section || '';
  const activeCard = bestuContext.activeCard;
  const currentQuestion = bestuContext.currentQuestion;

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pose, setPose] = useState('sitting');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const [isTalking, setIsTalking] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { isSpeaking, speak, stop: stopSpeaking } = useTTS();

  const { isListening, start: startListening, stop: stopListening, supported: voiceSupported } = useSpeechRecognition({
    onResult: (text) => {
      setInput(prev => (prev ? prev + ' ' + text : text));
      setVoiceError('');
    },
    onEnd: () => { setPose(isOpen ? 'standing' : 'sitting'); },
    onError: (msg) => { setVoiceError(msg); setPose(isOpen ? 'standing' : 'sitting'); },
  });

  // Sync pose with state
  useEffect(() => {
    if (isListening) { setPose('listening'); return; }
    if (loading) { setPose('thinking'); return; }
    if (isTalking) { setPose('talking'); return; }
    if (isOpen) { setPose('standing'); return; }
    if (isHovered) { setPose('greeting'); return; }
    setPose('sitting');
  }, [isListening, loading, isTalking, isOpen, isHovered]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userMessage = (text || input).trim();
    if (!userMessage || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);
    setVoiceError('');
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), BESTU_CHAT_TIMEOUT_MS);

    // Bounded history: keep last 8 messages
    const recentHistory = messages.slice(-8).map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    }));

    try {
      const res = await aiService.bestuChat({
        question: userMessage,
        context: {
          route: bestuContext.route,
          page: bestuContext.page,
          subject: activeSubject,
          category: activeCategory,
          topic: activeTopic,
          topicId: bestuContext.topicId,
          section: activeSection,
          sectionId: bestuContext.sectionId,
          activeCard: activeCard,
          currentQuestion: currentQuestion,
          availableSections: bestuContext.availableSections,
          navigationInfo: bestuContext.navigationInfo
        },
        history: recentHistory,
        // Legacy top-level fields for full backward compatibility
        subject: activeSubject,
        category: activeCategory,
        topic: activeTopic,
        section: activeSection,
        currentExample,
        studentAnswer,
        hint: currentStep,
      }, { signal: abortController.signal });
      const responseText = res?.data?.response || res?.response
        || "I'm having trouble connecting right now. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: responseText, pose: res?.data?.pose || 'talking' }]);
      // Brief talking pose
      setIsTalking(true);
      setTimeout(() => setIsTalking(false), 2000);
    } catch (err) {
      console.error('[Bestu chat error]', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again."
      }]);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const handleVoice = () => {
    if (isListening) { stopListening(); return; }
    if (!voiceSupported) {
      setVoiceError('Voice input isn\'t supported in this browser. You can type your question instead.');
      return;
    }
    startListening();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    if (e.key === 'Escape') setIsOpen(false);
  };

  const quickActions = getQuickActions({
    subject: activeSubject,
    topic: activeTopic,
    section: activeSection,
    activeCard,
    currentQuestion
  });

  // Panel position: opens upward from robot
  const panelVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 12, scale: 0.95 },
  };

  return (
    <div
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-2 select-none"
      style={{ maxWidth: 'calc(100vw - 24px)' }}
    >
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="bestu-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="w-[340px] max-w-[calc(100vw-32px)] bg-white dark:bg-[#1E2233] border border-[#DDE1F5] dark:border-[#2D3352] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: 'min(520px, calc(100vh - 140px))' }}
            role="dialog"
            aria-label="Bestu AI Mentor"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#6574C4] to-[#8B9BD4] text-white shrink-0">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm font-bold">B</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold leading-none">Bestu</div>
                <div className="text-[10px] text-indigo-100 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block animate-pulse" />
                  {isListening ? 'Listening…' : loading ? 'Thinking…' : 'Online'}
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Minimize Bestu"
              >
                <Minus size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close Bestu"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0 scroll-smooth">
              {messages.length === 0 && !loading && (
                <div className="py-4 text-center space-y-3">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Hi! I'm Bestu 👋 I'm here to help you understand{activeTopic ? ` ${activeTopic}` : ' any topic'}.<br />
                    {activeCard ? (
                      <span className="text-[11px] text-[#6574C4] font-semibold mt-1 inline-block">
                        Active: Card {activeCard.cardNumber} · {activeCard.title}
                      </span>
                    ) : (
                      'What would you like to know?'
                    )}
                  </div>
                  {/* Quick actions */}
                  <div className="flex flex-col gap-1.5">
                    {quickActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(action.query)}
                        className="w-full text-left text-xs px-3 py-2 rounded-xl bg-[#F0F2FF] dark:bg-slate-700 text-[#6574C4] dark:text-indigo-300 hover:bg-[#E4E7FA] dark:hover:bg-slate-600 border border-[#DDE1F5] dark:border-slate-600 transition-colors flex items-center gap-2"
                      >
                        <ChevronRight size={11} className="shrink-0" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <ChatMessage
                  key={i}
                  msg={msg}
                  onSpeak={speak}
                  isSpeaking={isSpeaking}
                />
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-end"
                >
                  <div className="w-6 h-6 rounded-full bg-[#6574C4] flex items-center justify-center shrink-0 text-[9px] font-bold text-white">B</div>
                  <div className="bg-[#F0F2FF] dark:bg-slate-700 border border-[#DDE1F5] dark:border-slate-600 rounded-2xl rounded-bl-sm px-4 py-2.5 flex gap-1.5 items-center">
                    {[0, 0.2, 0.4].map((d, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#6574C4]"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: d }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {voiceError && (
                <div className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl px-3 py-2">
                  {voiceError}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="px-3 pb-3 pt-2 border-t border-[#EAECF8] dark:border-[#2D3352] shrink-0 space-y-2">
              {/* Listening indicator */}
              <AnimatePresence>
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-[#6574C4] font-medium flex items-center gap-2 px-1"
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-[#6574C4]"
                      animate={{ scale: [1, 1.6, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                    Listening… speak now
                    <button onClick={stopListening} className="ml-auto text-rose-500 text-[10px] hover:underline" aria-label="Stop voice input">Stop</button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Ask Bestu anything…"
                    className="w-full resize-none rounded-xl border border-[#DDE1F5] dark:border-[#2D3352] bg-[#F8F9FF] dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#6574C4]/50 placeholder-slate-400 dark:placeholder-slate-500 leading-relaxed"
                    style={{ minHeight: 36, maxHeight: 80 }}
                    aria-label="Ask Bestu a question"
                    disabled={loading}
                  />
                </div>
                <button
                  onClick={handleVoice}
                  disabled={loading}
                  aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                      : 'bg-[#F0F2FF] dark:bg-slate-700 text-[#6574C4] hover:bg-[#E4E7FA] dark:hover:bg-slate-600'
                  }`}
                >
                  {isListening ? <MicOff size={15} /> : <Mic size={15} />}
                </button>
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="w-9 h-9 rounded-xl bg-[#6574C4] hover:bg-[#5563B0] text-white flex items-center justify-center shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center px-1">
                Press <kbd className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">Enter</kbd> to send · <kbd className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Speech bubble on hover (only when closed) ── */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            key="bestu-bubble"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#1E2233] border border-[#DDE1F5] dark:border-[#2D3352] rounded-2xl rounded-br-sm px-4 py-2.5 shadow-lg text-xs text-slate-700 dark:text-slate-200 mr-2 pointer-events-none"
          >
            <span className="font-semibold">Hey! 👋</span><br />
            <span className="text-slate-500 dark:text-slate-400">
              {activeTopic ? `Need help with ${activeTopic}?` : 'Are you stuck? Need help?'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Robot button ── */}
      <motion.button
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => { setIsOpen(o => !o); setIsHovered(false); }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6574C4] rounded-full"
        aria-label={isOpen ? 'Close Bestu AI Mentor' : 'Open Bestu AI Mentor'}
        aria-expanded={isOpen}
      >
        <BestuRobot
          pose={pose}
          isListening={isListening}
          isTalking={isTalking || isSpeaking}
          size={isOpen || isHovered ? 100 : 88}
        />
        {/* Notification dot */}
        {!isOpen && messages.length === 0 && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFD166] border-2 border-white dark:border-slate-900 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap size={8} className="text-[#1E2B6B]" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
