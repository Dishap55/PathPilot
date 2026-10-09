import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Bestu from '../learning/Bestu';

import { BestuProvider } from '../../contexts/BestuContext';
import { APTITUDE_TOPIC_REGISTRY } from '../../data/aptitudeTopicDataRegistry';
import { DSA_TOPIC_REGISTRY } from '../../data/dsaTopicDataRegistry';
import { OOPS_TOPIC_REGISTRY, getOOPSTopic } from '../../data/oops/oopsTopicDataRegistry';

/**
 * PathPilot Responsive AppLayout
 *
 * Standard wrapper for authenticated student views:
 * - Top sticky Navbar with mobile menu toggle
 * - Responsive Sidebar (desktop sticky aside + mobile slide-over drawer)
 * - Main content area with responsive padding and light canvas background
 * - Prevents horizontal scroll clipping
 * - Bestu AI Mentor widget — globally available, fixed bottom-right with rich context
 */

function getBestuBaseContext(pathname, search) {
  const params = new URLSearchParams(search);
  const topicParam = params.get('topic') || '';
  const currentRoute = `${pathname}${search || ''}`;

  if (pathname.startsWith('/subjects/dsa') || (pathname.includes('/dsa') && !pathname.includes('aptitude') && !pathname.includes('oops'))) {
    const dsaConfig = DSA_TOPIC_REGISTRY[topicParam] || DSA_TOPIC_REGISTRY['two-pointers'];
    return {
      route: currentRoute,
      page: 'DSA Learning Studio',
      subject: 'DSA',
      category: 'Data Structures & Algorithms',
      topic: dsaConfig?.name || 'Two Pointers',
      topicId: topicParam || 'two-pointers',
      section: 'Introduction',
      availableSections: ['1. Introduction', '2. Problem Examples', '3. Practice Questions', '4. Common Patterns', '5. Summary & Notes']
    };
  }

  if (pathname.startsWith('/aptitude') || pathname.includes('aptitude')) {
    const aptConfig = APTITUDE_TOPIC_REGISTRY[topicParam] || APTITUDE_TOPIC_REGISTRY['percentages'];
    const sectionParam = params.get('section') || 'introduction';
    const sectionNameMap = {
      introduction: 'Introduction',
      examples: 'Problem Examples',
      practice: 'Practice Questions',
      patterns: 'Common Patterns',
      summary: 'Summary & Notes'
    };
    const activeSectionName = sectionNameMap[sectionParam] || 'Introduction';

    return {
      route: currentRoute,
      page: 'Aptitude Learning Studio',
      subject: 'Aptitude',
      category: aptConfig?.category || 'Quantitative Aptitude',
      topic: aptConfig?.topicName || 'Percentages',
      topicId: topicParam || 'percentages',
      section: activeSectionName,
      availableSections: [
        '1. Introduction',
        '2. Problem Examples',
        '3. Practice Questions',
        '4. Common Patterns',
        '5. Summary & Notes'
      ]
    };
  }

  if (pathname.startsWith('/subjects/oops') || pathname === '/oops' || pathname.includes('/oops')) {
    const oopsConfig = getOOPSTopic(topicParam);
    const sectionParam = params.get('section') || 'introduction';
    const sectionNameMap = {
      introduction: 'Introduction',
      examples: 'Problem Examples',
      practice: 'Practice Questions',
      patterns: 'Common Patterns',
      summary: 'Summary & Notes'
    };
    const activeSectionName = sectionNameMap[sectionParam] || 'Introduction';

    return {
      route: currentRoute,
      page: 'OOPS Learning Studio',
      subject: 'OOPS',
      category: 'Object-Oriented Programming',
      topic: oopsConfig?.topicName || 'Class and Object',
      topicId: topicParam || 'classes-and-objects',
      section: activeSectionName,
      availableSections: [
        '1. Introduction',
        '2. Problem Examples',
        '3. Practice Questions',
        '4. Common Patterns',
        '5. Summary & Notes'
      ]
    };
  }

  if (pathname === '/subjects') {
    return {
      route: '/subjects',
      page: 'Core Subjects Practice',
      subject: 'Core Subjects',
      category: 'Placement Subjects',
      topic: '',
      section: 'Subject Selection',
      availableSections: ['DSA', 'Aptitude', 'OOPS', 'DBMS', 'OS', 'Computer Networks']
    };
  }

  if (pathname.includes('/roadmap')) {
    return {
      route: currentRoute,
      page: 'Roadmap',
      subject: 'Roadmap',
      category: 'Personalized Learning Plan',
      topic: '',
      section: 'Milestones Overview'
    };
  }

  if (pathname.includes('/dashboard')) {
    return {
      route: '/dashboard',
      page: 'Dashboard',
      subject: 'General',
      category: 'Dashboard',
      topic: '',
      section: 'Daily Progress & Activity'
    };
  }

  if (pathname.includes('/progress')) {
    return {
      route: '/progress',
      page: 'Progress Analytics',
      subject: 'Analytics',
      category: 'Student Performance',
      topic: '',
      section: 'Performance Metrics'
    };
  }

  return {
    route: currentRoute,
    page: 'PathPilot',
    subject: 'General',
    category: '',
    topic: '',
    section: 'Learning'
  };
}

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const baseContext = getBestuBaseContext(location.pathname, location.search);

  return (
    <BestuProvider baseContext={baseContext}>
      <div className="theme-app-shell min-h-screen flex flex-col text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
        {/* Sticky Navbar */}
        <Navbar onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)} />

        <div className="flex flex-1 w-full max-w-full overflow-x-hidden">
          {/* Responsive Sidebar */}
          <Sidebar
            mobileOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />

          {/* Main Content Area */}
          <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto w-full transition-all duration-300">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Global Bestu AI Mentor — context-aware */}
        <Bestu />
      </div>
    </BestuProvider>
  );
}

// Reusable authenticated layout alias
export const AuthenticatedLayout = AppLayout;
