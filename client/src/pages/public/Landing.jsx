import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  LayoutGrid,
  BookOpen,
  Briefcase,
  Settings,
  Users,
  Info,
  UserCircle2,
  ArrowRight,
  Sparkles,
  Code2,
  Package,
  BarChart3,
  Database,
  Cpu,
  Share2,
  GraduationCap,
  Layers,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Star,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxElement from '../../components/common/ParallaxElement.jsx';
import GradientCarousel from '../../components/common/GradientCarousel.jsx';
import SubjectsSection from '../../components/common/SubjectsSection.jsx';
import PreparationSection from '../../components/common/PreparationSection.jsx';
import HowItWorksSection from '../../components/common/HowItWorksSection.jsx';
import ForStudentsSection from '../../components/common/ForStudentsSection.jsx';
import AboutUsSection from '../../components/common/AboutUsSection.jsx';
import Footer from '../../components/layout/Footer.jsx';

export default function Landing() {
  const navigate = useNavigate();
  const mainScrollRef = useRef(null);
  const [activeNav, setActiveNav] = useState('Home');
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHomeVisible, setIsHomeVisible] = useState(true);
  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);
  const [isSubjectsVisible, setIsSubjectsVisible] = useState(false);
  const [isPrepVisible, setIsPrepVisible] = useState(false);
  const [isHowItWorksVisible, setIsHowItWorksVisible] = useState(false);
  const [isStudentsVisible, setIsStudentsVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const subjectsRef = useRef(null);
  const prepRef = useRef(null);
  const howItWorksRef = useRef(null);
  const studentsRef = useRef(null);
  const aboutRef = useRef(null);

  // Sidebar navigation items matching Image 2
  const sidebarItems = [
    { id: 'Home', label: 'Home', icon: Home, targetRef: homeRef },
    { id: 'Features', label: 'Features', icon: LayoutGrid, targetRef: featuresRef },
    { id: 'Subjects', label: 'Subjects', icon: BookOpen, targetRef: subjectsRef },
    { id: 'Placement Prep', label: 'Placement Prep', icon: Briefcase, targetRef: prepRef },
    { id: 'How It Works', label: 'How It Works', icon: Settings, targetRef: howItWorksRef },
    { id: 'For Students', label: 'For Students', icon: Users, targetRef: studentsRef },
    { id: 'About Us', label: 'About Us', icon: Info, targetRef: aboutRef },
  ];

  // 6 Placement curriculum subject orbital nodes
  const subjectNodes = [
    {
      id: 'dsa',
      name: 'DSA',
      icon: Code2,
      nodeClass: 'bg-amber-100 border-amber-400 text-amber-800 shadow-amber-300/60 ring-4 ring-amber-300/30',
      badgeClass: 'bg-white/95 text-amber-900 border-amber-200 shadow-sm',
      badge: 'Problem Solving + Practice',
      style: { top: '0%', left: '50%', transform: 'translate(-50%, 0)' },
      calloutStyle: 'top-[-36px] left-1/2 -translate-x-1/2'
    },
    {
      id: 'oops',
      name: 'OOPS',
      icon: Package,
      nodeClass: 'bg-rose-100 border-rose-400 text-rose-800 shadow-rose-300/60 ring-4 ring-rose-300/30',
      badgeClass: 'bg-white/95 text-rose-900 border-rose-200 shadow-sm',
      badge: 'Concepts + Practice + MCQs',
      style: { top: '16%', left: '84%', transform: 'translate(-50%, -50%)' },
      calloutStyle: 'top-[-10px] left-[110%]'
    },
    {
      id: 'aptitude',
      name: 'Aptitude',
      icon: BarChart3,
      nodeClass: 'bg-purple-100 border-purple-400 text-purple-800 shadow-purple-300/60 ring-4 ring-purple-300/30',
      badgeClass: 'bg-white/95 text-purple-900 border-purple-200 shadow-sm',
      badge: 'Quantitative + Verbal + Logical',
      style: { top: '70%', left: '84%', transform: 'translate(-50%, -50%)' },
      calloutStyle: 'top-[10px] left-[110%]'
    },
    {
      id: 'dbms',
      name: 'DBMS',
      icon: Database,
      nodeClass: 'bg-emerald-100 border-emerald-400 text-emerald-800 shadow-emerald-300/60 ring-4 ring-emerald-300/30',
      badgeClass: 'bg-white/95 text-emerald-900 border-emerald-200 shadow-sm',
      badge: 'SQL Practice + Concepts + Questions',
      style: { bottom: '0%', left: '50%', transform: 'translate(-50%, 0)' },
      calloutStyle: 'bottom-[-36px] left-1/2 -translate-x-1/2'
    },
    {
      id: 'os',
      name: 'OS',
      icon: Cpu,
      nodeClass: 'bg-sky-100 border-sky-400 text-sky-800 shadow-sky-300/60 ring-4 ring-sky-300/30',
      badgeClass: 'bg-white/95 text-sky-900 border-sky-200 shadow-sm',
      badge: 'Theory + Numericals + Practice',
      style: { top: '70%', left: '16%', transform: 'translate(-50%, -50%)' },
      calloutStyle: 'top-[10px] right-[110%]'
    },
    {
      id: 'cn',
      name: 'CN',
      icon: Share2,
      nodeClass: 'bg-pink-100 border-pink-400 text-pink-800 shadow-pink-300/60 ring-4 ring-pink-300/30',
      badgeClass: 'bg-white/95 text-pink-900 border-pink-200 shadow-sm',
      badge: 'Concepts + Diagrams + Practice',
      style: { top: '16%', left: '16%', transform: 'translate(-50%, -50%)' },
      calloutStyle: 'top-[-10px] right-[110%]'
    }
  ];

  // Navigate smoothly to target section
  const handleNavClick = (item) => {
    setActiveNav(item.id);
    setMobileMenuOpen(false);

    if (item.targetRef && item.targetRef.current) {
      item.targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Precise IntersectionObserver to synchronize the active sidebar nav item with scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'home') {
            setActiveNav('Home');
            setIsHomeVisible(true);
          } else if (entry.target.id === 'features') {
            setActiveNav('Features');
            setIsFeaturesVisible(true);
          } else if (entry.target.id === 'subjects') {
            setActiveNav('Subjects');
            setIsSubjectsVisible(true);
          } else if (entry.target.id === 'placement-prep') {
            setActiveNav('Placement Prep');
            setIsPrepVisible(true);
          } else if (entry.target.id === 'how-it-works') {
            setActiveNav('How It Works');
            setIsHowItWorksVisible(true);
          } else if (entry.target.id === 'for-students') {
            setActiveNav('For Students');
            setIsStudentsVisible(true);
          } else if (entry.target.id === 'about-us') {
            setActiveNav('About Us');
            setIsAboutVisible(true);
          }
        } else {
          if (entry.target.id === 'home') {
            setIsHomeVisible(false);
          } else if (entry.target.id === 'features') {
            setIsFeaturesVisible(false);
          } else if (entry.target.id === 'subjects') {
            setIsSubjectsVisible(false);
          } else if (entry.target.id === 'placement-prep') {
            setIsPrepVisible(false);
          } else if (entry.target.id === 'how-it-works') {
            setIsHowItWorksVisible(false);
          } else if (entry.target.id === 'for-students') {
            setIsStudentsVisible(false);
          } else if (entry.target.id === 'about-us') {
            setIsAboutVisible(false);
          }
        }
      });
    }, observerOptions);

    if (homeRef.current) observer.observe(homeRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (subjectsRef.current) observer.observe(subjectsRef.current);
    if (prepRef.current) observer.observe(prepRef.current);
    if (howItWorksRef.current) observer.observe(howItWorksRef.current);
    if (studentsRef.current) observer.observe(studentsRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen w-full flex bg-slate-900 overflow-x-hidden font-sans select-none">
      
      {/* Mobile Top Header (< 1024px) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 -rotate-12 translate-x-0.5"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            PathPilot
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* ========================================================================= */}
      {/* 2> RESPONSIVE COLLAPSIBLE / EXPANDABLE SIDEBAR (MATCHING IMAGE 2)          */}
      {/* ========================================================================= */}
      <aside
        className={`fixed top-0 left-0 bottom-0 h-screen z-50 bg-white/95 backdrop-blur-2xl border-r border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col justify-between py-6 px-3 shrink-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header & Logo + Minimize/Expand Toggle Button */}
          <div className="flex items-center justify-between px-2 py-1 mb-6">
            <div
              onClick={() => handleNavClick({ id: 'Home', targetRef: homeRef })}
              className={`flex items-center gap-3 cursor-pointer group ${isCollapsed ? 'mx-auto' : ''}`}
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-50/90 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 -rotate-12 translate-x-0.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </div>
              {!isCollapsed && (
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                  PathPilot
                </span>
              )}
            </div>

            {/* Desktop Minimize/Expand Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/80 transition-all duration-200"
              title={isCollapsed ? 'Expand sidebar' : 'Minimize sidebar'}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Minimize sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation Menu List */}
          <nav className="space-y-1.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`w-full flex items-center gap-3.5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 text-left cursor-pointer ${
                      isCollapsed ? 'justify-center px-0' : 'px-3.5'
                    } ${
                      isActive
                        ? 'bg-[#EDE9FE] text-[#5850EC] shadow-sm ring-1 ring-[#5850EC]/20'
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-indigo-600 hover:shadow-sm'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 shrink-0 ${
                        isActive ? 'text-[#5850EC]' : 'text-slate-500 group-hover:text-indigo-600'
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="whitespace-nowrap transition-opacity duration-200">
                        {item.label}
                      </span>
                    )}
                    {!isCollapsed && isActive && (
                      <span className="ml-auto w-1.5 h-4 rounded-full bg-[#5850EC]" />
                    )}
                  </button>

                  {/* Tooltip on Hover when Sidebar is Collapsed */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Divider + Login Button */}
        <div className="pt-4 border-t border-slate-200/80">
          <div className="relative group">
            <button
              onClick={() => {
                navigate('/login');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center py-3 rounded-2xl text-sm font-bold text-slate-800 hover:bg-white/95 hover:text-indigo-700 transition-all duration-200 group border border-transparent hover:border-indigo-100 shadow-sm hover:shadow cursor-pointer ${
                isCollapsed ? 'justify-center px-0' : 'justify-between px-3.5'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCircle2 className="w-6 h-6 text-slate-700 group-hover:text-indigo-600 transition-colors shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">Login</span>}
              </div>
              {!isCollapsed && (
                <ArrowRight className="w-5 h-5 text-slate-700 group-hover:text-indigo-600 group-hover:translate-x-1.5 transition-all duration-200 shrink-0" />
              )}
            </button>

            {isCollapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                Login
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT WRAPPER: HOME SECTION + FEATURES SECTION (WITH SCROLL ANIM) */}
      {/* ========================================================================= */}
      <div
        ref={mainScrollRef}
        className={`relative flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out h-screen overflow-y-auto snap-y snap-mandatory ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}
      >
        
        {/* ======================================================================= */}
        {/* 1. HOME SECTION (HERO WITH ROTATING ARROWS CIRCLE & FLOATING HEADLINE)  */}
        {/* ======================================================================= */}
        <section
          ref={homeRef}
          id="home"
          className="relative min-h-screen lg:h-screen lg:max-h-screen snap-start snap-always w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 transition-all duration-500 overflow-y-auto lg:overflow-hidden select-none py-10 lg:py-0"
        >
          {/* Authentic Desk Background Layer */}
          <ParallaxElement depth="background" containerRef={mainScrollRef} className="absolute -top-12 -bottom-12 inset-x-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/home_bg.jpg')` }}
            >
              <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px]" />
            </div>
          </ParallaxElement>

          <div className="relative z-10 w-full max-w-[1550px] mx-auto my-auto py-6 lg:py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center justify-center">
              
              {/* Left Column: Headlines & CTA Buttons - Centered on Mobile/Tablet */}
              <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-5 lg:space-y-7">
                <ParallaxElement depth="content" containerRef={mainScrollRef} className="w-full flex flex-col items-center lg:items-start space-y-5 lg:space-y-7">
                  {/* Top AI Badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-indigo-200/90 shadow-md text-xs sm:text-sm font-semibold text-indigo-900 cursor-default hover:shadow-lg transition-all duration-700 ease-out transform mx-auto lg:mx-0 ${
                      isHomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>AI-Powered Adaptive Learning & Placement Coach</span>
                  </div>

                  {/* Main Headline */}
                  <div className="space-y-1.5 flex flex-col items-center lg:items-start font-sans">
                    {/* Line 1: Learn Smarter. */}
                    <h1
                      className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)] transition-all duration-700 delay-150 ease-out transform ${
                        isHomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                    >
                      <motion.span
                        animate={{ y: [0, -6, 0, 6, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="inline-block"
                      >
                        Learn Smarter.
                      </motion.span>
                    </h1>

                    {/* Line 2: Practice Better. */}
                    <h1
                      className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)] transition-all duration-700 delay-250 ease-out transform ${
                        isHomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                    >
                      Practice Better.
                    </h1>

                    {/* Line 3: Become Placement Ready. */}
                    <div
                      className={`transition-all duration-700 delay-350 ease-out transform ${
                        isHomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                    >
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
                        Become{' '}
                        <span className="relative inline-block text-indigo-600">
                          Placement Ready.
                          <svg
                            className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3.5 text-indigo-500/80"
                            viewBox="0 0 240 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M 2 9.5 C 50 2.5 150 2 238 9.5"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </h1>
                    </div>
                  </div>

                  {/* 2> HOVER EFFECTS ON ACTION BUTTONS */}
                  <div
                    className={`flex items-center justify-center lg:justify-start gap-3 sm:gap-4 flex-wrap pt-2 transition-all duration-700 delay-[450ms] ease-out transform ${
                      isHomeVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                    }`}
                  >
                    <button
                      onClick={() => navigate('/signup')}
                      className="group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-indigo-600/35 hover:shadow-2xl hover:shadow-indigo-600/60 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
                    >
                      <span className="relative z-10">Get Started</span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <button
                      onClick={() => handleNavClick({ id: 'Subjects', targetRef: subjectsRef })}
                      className="group inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/95 backdrop-blur-md border-2 border-indigo-200 text-slate-800 font-bold text-base sm:text-lg shadow-md hover:border-indigo-500 hover:bg-white hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      <span>Explore</span>
                      <span className="text-indigo-600 group-hover:underline underline-offset-4">
                        Subjects
                      </span>
                    </button>
                  </div>
                </ParallaxElement>

                {/* 3 Value Pillars */}
                <ParallaxElement depth="foreground" containerRef={mainScrollRef} className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 max-w-2xl w-full mx-auto lg:mx-0">
                    <div
                      className={`flex items-center gap-3 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-700 delay-[550ms] ease-out transform ${
                        isHomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                          Structured
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-tight">
                          Learning Path
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-3 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-700 delay-[650ms] ease-out transform ${
                        isHomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                          Topic-wise
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-tight">
                          Practice
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-3 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-700 delay-[750ms] ease-out transform ${
                        isHomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                          Company-wise
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-tight">
                          Mock Tests
                        </p>
                      </div>
                    </div>
                  </div>
                </ParallaxElement>
              </div>

              {/* Right Column: CIRCULAR ADAPTIVE LOOP WITH SCROLL FLOAT APPEAR & GENTLE BREATHING */}
              <div className="lg:col-span-6 xl:col-span-5 flex justify-center items-center py-4 lg:py-6 w-full">
                <ParallaxElement depth="decorations" containerRef={mainScrollRef} className="flex justify-center items-center w-full">
                  <div
                    className={`relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] xl:w-[460px] xl:h-[460px] 2xl:w-[480px] 2xl:h-[480px] flex items-center justify-center animate-float-gentle transition-all duration-1000 delay-200 ease-out transform ${
                      isHomeVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-12'
                    }`}
                  >
                  {/* 1> THE INFINITE ROTATING ARROWS SVG RING */}
                  <div
                    className={`absolute inset-0 pointer-events-none z-10 flex items-center justify-center animate-spin-infinite transition-opacity duration-1000 delay-400 ${
                      isHomeVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <svg
                      viewBox="0 0 400 400"
                      className="w-full h-full text-indigo-600 drop-shadow-[0_2px_4px_rgba(79,70,229,0.3)]"
                    >
                      <defs>
                        <marker
                          id="arrowhead-clockwise"
                          markerWidth="9"
                          markerHeight="9"
                          refX="6"
                          refY="4.5"
                          orient="auto"
                        >
                          <path
                            d="M 1 1.5 L 7.5 4.5 L 1 7.5 Z"
                            fill="#4F46E5"
                            stroke="#4F46E5"
                          />
                        </marker>
                      </defs>

                      {/* 6 Clockwise Connecting Curved Arcs */}
                      <path
                        d="M 230 42 A 165 165 0 0 1 315 95"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="3.2"
                        markerEnd="url(#arrowhead-clockwise)"
                      />
                      <path
                        d="M 352 165 A 165 165 0 0 1 352 235"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="3.2"
                        markerEnd="url(#arrowhead-clockwise)"
                      />
                      <path
                        d="M 315 305 A 165 165 0 0 1 230 358"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="3.2"
                        markerEnd="url(#arrowhead-clockwise)"
                      />
                      <path
                        d="M 170 358 A 165 165 0 0 1 85 305"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="3.2"
                        markerEnd="url(#arrowhead-clockwise)"
                      />
                      <path
                        d="M 48 235 A 165 165 0 0 1 48 165"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="3.2"
                        markerEnd="url(#arrowhead-clockwise)"
                      />
                      <path
                        d="M 85 95 A 165 165 0 0 1 170 42"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="3.2"
                        markerEnd="url(#arrowhead-clockwise)"
                      />
                    </svg>
                  </div>

                  {/* Center Placement Ready Hub */}
                  <div
                    className={`relative z-20 w-32 h-32 sm:w-40 sm:h-40 xl:w-44 xl:h-44 rounded-full bg-white/95 backdrop-blur-xl border-4 border-indigo-100 shadow-[0_20px_50px_rgba(79,70,229,0.25)] flex flex-col items-center justify-center p-3 text-center transition-all duration-700 delay-300 ease-out transform hover:scale-105 ${
                      isHomeVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-6'
                    }`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-1 text-indigo-600 shadow-inner">
                      <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="font-black text-slate-900 text-sm sm:text-base xl:text-lg leading-tight tracking-tight">
                      Placement<br />Ready
                    </h3>
                  </div>

                  {/* 6 Orbital Subject Nodes (Staggered Pop & Float Into Orbit) */}
                  {subjectNodes.map((node, index) => {
                    const Icon = node.icon;
                    const isHovered = hoveredNode === node.id;
                    const nodeDelays = [450, 560, 670, 780, 890, 1000];
                    const delayMs = nodeDelays[index] || 500;

                    return (
                      <div
                        key={node.id}
                        style={node.style}
                        onClick={() => navigate(`/signup?subject=${node.id}`)}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="absolute z-20 flex flex-col items-center group cursor-pointer"
                        title={`Start learning ${node.name}`}
                      >
                        <div
                          style={{ transitionDelay: `${delayMs}ms` }}
                          className={`transition-all duration-700 ease-out transform ${
                            isHomeVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-8'
                          }`}
                        >
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 xl:w-16 xl:h-16 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-300 shadow-xl ${
                              node.nodeClass
                            } ${
                              isHovered ? 'scale-125 z-30 shadow-2xl' : 'hover:scale-115'
                            }`}
                          >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6" />
                            <span className="text-[9px] sm:text-[10px] xl:text-xs font-black tracking-wider uppercase mt-0.5">
                              {node.name}
                            </span>
                          </div>

                          <div
                            className={`hidden md:block absolute ${
                              node.calloutStyle
                            } whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-bold border backdrop-blur-md shadow-md transition-all duration-200 ${
                              node.badgeClass
                            } ${
                              isHovered ? 'scale-110 shadow-lg' : 'opacity-95'
                            }`}
                          >
                            {node.badge}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ParallaxElement>
            </div>
          </div>
        </div>
      </section>

        {/* ======================================================================= */}
        {/* 2. FEATURES SECTION (PROPORTIONAL 1:1 SCREEN RATIO MATCHING HOME)      */}
        {/* ======================================================================= */}
        <section
          ref={featuresRef}
          id="features"
          className="relative min-h-screen lg:h-screen lg:max-h-screen snap-start snap-always w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 overflow-y-auto lg:overflow-hidden select-none py-10 lg:py-0"
        >
          {/* Authentic Sunny City Features Background Layer */}
          <ParallaxElement depth="background" containerRef={mainScrollRef} className="absolute -top-12 -bottom-12 inset-x-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/features_bg.jpg')` }}
            >
              <div className="absolute inset-0 bg-white/25 backdrop-blur-[0.5px]" />
            </div>
          </ParallaxElement>

          {/* Section Main Content Area - Form-fitted to 1 Viewport Height */}
          <div className="relative z-10 w-full max-w-[1300px] mx-auto my-auto flex flex-col items-center justify-center text-center py-2">
            
            {/* Header & Headline in Content Layer */}
            <ParallaxElement depth="content" containerRef={mainScrollRef} className="w-full flex flex-col items-center justify-center">
              {/* Powerful Features Badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-indigo-200/90 shadow-sm text-xs font-semibold text-indigo-900 cursor-default hover:shadow-md transition-all duration-700 ease-out transform ${
                  isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>Powerful Features for Your Placement Journey</span>
              </div>

              {/* Features Master Headline */}
              <div
                className={`relative mt-2 mb-1 max-w-3xl mx-auto transition-all duration-700 delay-150 ease-out transform ${
                  isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
                  'Everything You Need
                </h2>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
                    to Get{' '}
                    <span className="text-indigo-600">Placement Ready</span>
                    {' \''}
                  </h2>
                </div>

                {/* Hand-drawn Underline Accent */}
                <div className="flex justify-center -mt-1">
                  <svg
                    className="w-56 sm:w-72 h-2 text-indigo-500/80"
                    viewBox="0 0 350 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 9C80 2 240 2 347 9"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* "All in One Place" Doodle Annotation */}
                <div
                  className={`hidden lg:flex items-center gap-1.5 absolute -right-20 xl:-right-24 top-0 text-indigo-700 pointer-events-none transition-all duration-700 delay-300 ease-out transform ${
                    isFeaturesVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'
                  }`}
                >
                  <svg
                    className="w-10 h-10 -rotate-12"
                    viewBox="0 0 50 50"
                    fill="none"
                  >
                    <path
                      d="M 40 40 C 25 35 15 20 20 8"
                      stroke="#4338CA"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 14 14 L 20 8 L 26 12"
                      stroke="#4338CA"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="font-extrabold text-xs sm:text-sm tracking-wide text-slate-800 rotate-6 font-serif leading-tight text-left">
                    All in<br />One Place
                  </div>
                </div>
              </div>
            </ParallaxElement>

            {/* 3> REACT GRADIENT CAROUSEL IN FOREGROUND LAYER */}
            <ParallaxElement depth="foreground" containerRef={mainScrollRef} className="w-full mt-1">
              <div
                className={`w-full transition-all duration-900 delay-250 ease-out transform ${
                  isFeaturesVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                }`}
              >
                <GradientCarousel />
              </div>
            </ParallaxElement>

            {/* Bottom 4-Value Feature Strip IN DECORATIONS LAYER */}
            <ParallaxElement depth="decorations" containerRef={mainScrollRef} className="w-full max-w-4xl mx-auto mt-2">
              <div
                className={`w-full transition-all duration-700 delay-400 ease-out transform ${
                  isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md">
                  <div
                    className={`flex items-center justify-center gap-2 p-1.5 rounded-xl hover:bg-indigo-50/60 transition-all duration-700 delay-[450ms] ease-out transform ${
                      isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <h5 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Structured</h5>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 leading-tight">Learning Path</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center justify-center gap-2 p-1.5 rounded-xl hover:bg-amber-50/60 transition-all duration-700 delay-[550ms] ease-out transform ${
                      isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                      <Star className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <h5 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Topic-wise</h5>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 leading-tight">Practice</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center justify-center gap-2 p-1.5 rounded-xl hover:bg-purple-50/60 transition-all duration-700 delay-[650ms] ease-out transform ${
                      isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <h5 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Company-wise</h5>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 leading-tight">Mock Tests</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center justify-center gap-2 p-1.5 rounded-xl hover:bg-emerald-50/60 transition-all duration-700 delay-[750ms] ease-out transform ${
                      isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <h5 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Placement</h5>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 leading-tight">Focused</p>
                    </div>
                  </div>
                </div>
              </div>
            </ParallaxElement>

          </div>
        </section>

        {/* ======================================================================= */}
        {/* 3. SUBJECTS SECTION (2x3 GRID WITH HOVER & STAGGERED SCROLL EFFECTS)   */}
        {/* ======================================================================= */}
        <section
          ref={subjectsRef}
          id="subjects"
          className="relative min-h-screen lg:h-screen lg:max-h-screen snap-start snap-always w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 overflow-y-auto lg:overflow-hidden select-none py-10 lg:py-0"
        >
          {/* Authentic Clean Subjects Background Layer */}
          <ParallaxElement depth="background" containerRef={mainScrollRef} className="absolute -top-12 -bottom-12 inset-x-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/subjects_bg.jpg')` }}
            >
              <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px]" />
            </div>
          </ParallaxElement>

          <ParallaxElement depth="foreground" containerRef={mainScrollRef} className="relative z-10 w-full flex flex-col items-center justify-center">
            <SubjectsSection isVisible={isSubjectsVisible} />
          </ParallaxElement>
        </section>

        {/* ======================================================================= */}
        {/* 4. PLACEMENT PREPARATION (8-STEP WINDING ROADMAP WITH HOVER EFFECTS)   */}
        {/* ======================================================================= */}
        <section
          ref={prepRef}
          id="placement-prep"
          className="relative min-h-screen lg:h-screen lg:max-h-screen snap-start snap-always w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 overflow-y-auto lg:overflow-hidden select-none py-10 lg:py-0"
        >
          {/* Authentic Clean Mountains and Floating Islands Background Layer */}
          <ParallaxElement depth="background" containerRef={mainScrollRef} className="absolute -top-16 -bottom-16 inset-x-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/prep_bg.jpg')` }}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.2px]" />
            </div>
          </ParallaxElement>

          <ParallaxElement depth="foreground" containerRef={mainScrollRef} className="relative z-10 w-full flex flex-col items-center justify-center">
            <PreparationSection isVisible={isPrepVisible} />
          </ParallaxElement>
        </section>

        {/* ======================================================================= */}
        {/* 5. HOW IT WORKS SECTION (5-STEP PROCESS FLOW & CHROME GRID EFFECT)      */}
        {/* ======================================================================= */}
        <section
          ref={howItWorksRef}
          id="how-it-works"
          className="relative min-h-screen lg:h-screen lg:max-h-screen snap-start snap-always w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 overflow-y-auto lg:overflow-hidden select-none py-10 lg:py-0"
        >
          {/* Authentic Clean Pastel Dunes/Waves Background Layer */}
          <ParallaxElement depth="background" containerRef={mainScrollRef} className="absolute -top-16 -bottom-16 inset-x-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/how_it_works_bg.png')` }}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.2px]" />
            </div>
          </ParallaxElement>

          <ParallaxElement depth="foreground" containerRef={mainScrollRef} className="relative z-10 w-full flex flex-col items-center justify-center">
            <HowItWorksSection isVisible={isHowItWorksVisible} />
          </ParallaxElement>
        </section>

        {/* ======================================================================= */}
        {/* 6. FOR STUDENTS SECTION (ACCORDION GALLERY & 3D BENEFIT CARDS)          */}
        {/* ======================================================================= */}
        <section
          ref={studentsRef}
          id="for-students"
          className="relative min-h-screen lg:h-screen lg:max-h-screen snap-start snap-always w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 overflow-y-auto lg:overflow-hidden select-none py-10 lg:py-0"
        >
          {/* Clean Study Room Wallpaper Background Layer */}
          <ParallaxElement depth="background" containerRef={mainScrollRef} className="absolute -top-16 -bottom-16 inset-x-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/for_students_bg.png')` }}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.2px]" />
            </div>
          </ParallaxElement>

          <ParallaxElement depth="foreground" containerRef={mainScrollRef} className="relative z-10 w-full flex flex-col items-center justify-center">
            <ForStudentsSection isVisible={isStudentsVisible} />
          </ParallaxElement>
        </section>

        {/* ======================================================================= */}
        {/* 7. ABOUT US SECTION (MISSION, STATS & START YOUR JOURNEY CTA)           */}
        {/* ======================================================================= */}
        <section
          ref={aboutRef}
          id="about-us"
          className="relative min-h-screen lg:h-screen lg:max-h-screen snap-start snap-always w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 overflow-y-auto lg:overflow-hidden select-none py-10 lg:py-0"
        >
          {/* Authentic Clean Background Layer with Soft Overlay */}
          <ParallaxElement depth="background" containerRef={mainScrollRef} className="absolute -top-16 -bottom-16 inset-x-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/home_bg.jpg')` }}
            >
              <div className="absolute inset-0 bg-slate-50/85 backdrop-blur-[1px]" />
            </div>
          </ParallaxElement>

          <ParallaxElement depth="foreground" containerRef={mainScrollRef} className="relative z-10 w-full flex flex-col items-center justify-center">
            <AboutUsSection isVisible={isAboutVisible} />
          </ParallaxElement>
        </section>

        {/* Footer Section */}
        <section className="snap-end w-full">
          <Footer />
        </section>

      </div>
    </div>
  );
}
