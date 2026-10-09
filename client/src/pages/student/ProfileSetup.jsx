import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';
import { profileService } from '../../services/profileService';
import { assessmentService } from '../../services/assessmentService';
import { createAssessmentInputsFromForm, saveAssessmentInputToStorage } from '../../services/assessmentInputService';

import Loader from '../../components/common/Loader';
import PersonalDetailsForm from '../../components/profile/PersonalDetailsForm';
import AcademicDetailsForm from '../../components/profile/AcademicDetailsForm';
import PreparationTimeForm from '../../components/profile/PreparationTimeForm';
import TargetDateField from '../../components/profile/TargetDateField';
import CompanyField from '../../components/profile/CompanyField';
import LanguageSelector from '../../components/profile/LanguageSelector';
import SubjectLevelSelector from '../../components/profile/SubjectLevelSelector';
import InitialAssessmentSummaryCard from '../../components/dashboard/InitialAssessmentSummaryCard';
import AssessmentHistoryCard from '../../components/profile/AssessmentHistoryCard';
import { useTheme } from '../../contexts/ThemeContext';
import {
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Compass,
  UserCheck,
  Target,
  TrendingUp,
  Layers,
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  BookOpen,
  Check
} from 'lucide-react';

const APPEARANCE_OPTIONS = [
  { id: 'light', label: 'Light Mode', description: 'The normal PathPilot appearance.', icon: Sun },
  { id: 'dark', label: 'Dark Mode', description: 'A calm, low-light interface.', icon: Moon },
  { id: 'study', label: 'Study Mode', description: 'Warm colors for longer reading sessions.', icon: BookOpen }
];

function ThemePreview({ mode }) {
  return (
    <div className={`appearance-preview appearance-preview-${mode}`} aria-hidden="true">
      <span className="appearance-preview-sidebar" />
      <span className="appearance-preview-content"><i /><i /><i /></span>
    </div>
  );
}

const EMPTY_FORM_DATA = {
  full_name: '',
  profile_photo_url: '',
  degree: '',
  branch: '',
  current_year: '',
  current_semester: '',
  graduation_year: '',
  preparation_value: '',
  preparation_unit: 'Months',
  target_date: '',
  target_company: '',
  preferred_language: '',
  subjectLevels: {}
};

export default function ProfileSetup({ isEmbedded = false }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refetchProfile } = useProfile();
  const { theme, setTheme } = useTheme();
  const LearningPreferencesWrapper = isEmbedded ? 'section' : React.Fragment;
  const learningPreferencesWrapperProps = isEmbedded
    ? { id: 'profile-learning-preferences', 'aria-labelledby': 'profile-learning-preferences-heading', className: 'scroll-mt-24 space-y-4' }
    : {};

  const [formData, setFormData] = useState(EMPTY_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [assessmentSnapshot, setAssessmentSnapshot] = useState({ status: 'idle', completed: false, result: null });

  const isUserScrollingRef = useRef(false);

  useEffect(() => {
    if (!isEmbedded) return undefined;
    if (!user?.id) {
      setAssessmentSnapshot({ status: 'signed-out', completed: false, result: null });
      return undefined;
    }

    let isMounted = true;
    setAssessmentSnapshot({ status: 'loading', completed: false, result: null });

    assessmentService.getInitialAssessmentResult()
      .then((response) => {
        if (!isMounted) return;
        const data = response?.data || response || {};
        setAssessmentSnapshot({
          status: 'loaded',
          completed: data.assessmentCompleted === true,
          result: data.result || null
        });
      })
      .catch((error) => {
        console.warn('[Profile] Initial assessment summary is unavailable:', error.message);
        if (isMounted) setAssessmentSnapshot({ status: 'error', completed: false, result: null });
      });

    return () => {
      isMounted = false;
    };
  }, [isEmbedded, user?.id]);

  // 1. Load existing profile strictly for the current authenticated user
  useEffect(() => {
    let isMounted = true;

    async function loadExistingProfile() {
      if (!user?.id) {
        setIsFetching(false);
        return;
      }

      try {
        const profileResponse = await profileService.getProfile();
        const p = profileResponse?.data || null;

        // The authenticated profile row is the source of truth, including for
        // students whose setup was saved before setup_completed was introduced.
        if (isMounted && p) {
          const levelsResponse = await profileService.getSubjectLevels().catch(() => null);
          const levelsData = Array.isArray(levelsResponse?.data) ? levelsResponse.data : [];

          const levelsMap = {};
          levelsData.forEach((item) => {
            if (item.subject) levelsMap[item.subject] = item.level;
          });

          setFormData({
            full_name: p.full_name || '',
            profile_photo_url: p.profile_photo_url || '',
            degree: p.degree || '',
            branch: p.branch || '',
            current_year: p.current_year || '',
            current_semester: p.current_semester || '',
            graduation_year: p.graduation_year || '',
            preparation_value: p.preparation_value || '',
            preparation_unit: p.preparation_unit || 'Months',
            target_date: p.target_date || '',
            target_company: p.target_company || '',
            preferred_language: p.preferred_language || '',
            subjectLevels: levelsMap
          });
        } else if (isMounted) {
          // Fresh user: start completely empty
          setFormData(EMPTY_FORM_DATA);
        }
      } catch (err) {
        console.warn('[ProfileSetup] Error checking existing profile:', err);
        if (isMounted) {
          setFormData(EMPTY_FORM_DATA);
        }
      } finally {
        if (isMounted) {
          setIsFetching(false);
        }
      }
    }

    loadExistingProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // 2. Observe scroll position to dynamically update active section in header
  useEffect(() => {
    const handleScroll = () => {
      if (isUserScrollingRef.current) return;
      const scrollPos = window.scrollY + 200;

      const sections = isEmbedded
        ? [
            [1, 'profile-section-1'],
            [2, 'profile-appearance'],
            [3, 'profile-assessment'],
            [4, 'profile-learning-preferences']
          ]
        : [[1, 'profile-section-1'], [2, 'profile-section-2'], [3, 'profile-section-3']];

      let currentSection = 1;
      sections.forEach(([section, id]) => {
        const element = document.getElementById(id);
        if (element && scrollPos >= element.offsetTop) currentSection = section;
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEmbedded]);

  // 3. Section navigation interaction
  const handleSectionClick = (sectionNum, targetId = null) => {
    const embeddedFormSection = isEmbedded && !targetId && sectionNum > 1;
    setActiveSection(embeddedFormSection ? 4 : sectionNum);
    isUserScrollingRef.current = true;

    const el = document.getElementById(targetId || `profile-section-${sectionNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 700);
  };

  const isFormSectionActive = (sectionNum) => !isEmbedded && activeSection === sectionNum;

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubjectLevelChange = (code, level) => {
    setFormData((prev) => ({
      ...prev,
      subjectLevels: {
        ...prev.subjectLevels,
        [code]: level
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const newErrors = {};

    // Validate Required Fields
    if (!formData.full_name?.trim()) {
      newErrors.full_name = 'Full name is required.';
    }

    if (!formData.degree?.trim()) {
      newErrors.degree = 'Degree is required.';
    }

    if (!formData.branch?.trim()) {
      newErrors.branch = 'Branch is required.';
    }

    // MANDATORY REQUIREMENT: Target date is required
    if (!formData.target_date) {
      newErrors.target_date = 'Target date is required.';
    }

    setErrors(newErrors);

    // Validation Interaction: Navigate & smoothly scroll to missing required fields
    if (newErrors.full_name || newErrors.degree || newErrors.branch) {
      setActiveSection(1);
      setErrorMessage('Please complete all required personal and academic details.');
      isUserScrollingRef.current = true;

      const firstEl = document.getElementById(
        newErrors.full_name ? 'full_name_input' : newErrors.degree ? 'degree_input' : 'branch_input'
      );

      if (firstEl) {
        firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstEl.focus();
      }

      setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 700);
      return;
    }

    if (newErrors.target_date) {
      setActiveSection(2);
      setErrorMessage('Target date is required.');
      isUserScrollingRef.current = true;

      const targetDateWrapper = document.getElementById('target-date-wrapper');
      if (targetDateWrapper) {
        targetDateWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const btn = document.getElementById('target-date-button');
        btn?.focus();
      }

      setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 700);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        full_name: formData.full_name.trim(),
        profile_photo_url: formData.profile_photo_url.trim() || null,
        degree: formData.degree.trim(),
        branch: formData.branch.trim(),
        current_year: formData.current_year ? Number(formData.current_year) : (isEmbedded ? null : 4),
        current_semester: formData.current_semester ? Number(formData.current_semester) : (isEmbedded ? null : 7),
        graduation_year: formData.graduation_year ? Number(formData.graduation_year) : null,
        preparation_value: formData.preparation_value ? Number(formData.preparation_value) : (isEmbedded ? null : 6),
        preparation_unit: formData.preparation_unit || (isEmbedded ? null : 'Months'),
        target_date: formData.target_date,
        target_company: formData.target_company.trim() || null,
        preferred_language: formData.preferred_language || null,
        subjectLevels: formData.subjectLevels
      };

      // Persist through the authenticated backend profile service.
      await profileService.updateProfile(payload);

      const selectedSubjectLevels = payload.subjectLevels || {};
      if (Object.keys(selectedSubjectLevels).length > 0) {
        // Persist the baseline rows before leaving Profile Setup. The profile
        // endpoint stores personal details; subject levels have their own API.
        await profileService.updateSubjectLevels(selectedSubjectLevels);
      }

      if (refetchProfile) {
        await refetchProfile();
      }

      if (isEmbedded) {
        setSuccessMessage('Profile changes saved successfully. Redirecting to dashboard...');
        setIsLoading(false);
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
        return;
      }

      // Connect submitted level information to Assessment Input (Step 1)
      let assessmentInput = null;
      try {
        assessmentInput = createAssessmentInputsFromForm(payload.subjectLevels);
        saveAssessmentInputToStorage(assessmentInput);
      } catch (inputErr) {
        console.warn('[ProfileSetup] Assessment input preparation notice:', inputErr.message);
      }

      // Check whether initial assessment has already been completed
      let isAssessmentCompleted = false;
      try {
        const statusRes = await assessmentService.checkAssessmentStatus().catch(() => null);
        if (statusRes?.assessmentCompleted) {
          isAssessmentCompleted = true;
        }
      } catch (e) {}

      if (!isAssessmentCompleted && user?.id) {
        try {
          isAssessmentCompleted = localStorage.getItem(`pathpilot_assessment_completed_${user.id}`) === 'true';
        } catch (e) {}
      }

      const subjectsCount = assessmentInput?.subjects?.length || (assessmentInput?.subject ? 1 : 0);

      // Route to Assessment Intro if assessment not completed and student has selected subjects
      if (!isAssessmentCompleted && subjectsCount > 0) {
        setSuccessMessage('Profile saved successfully! Proceeding to your initial skill assessment...');
        setTimeout(() => {
          navigate('/assessment/initial');
        }, 800);
      } else {
        setSuccessMessage('Profile setup completed successfully! Redirecting to your dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      }

    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred during profile setup.');
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className={`relative ${isEmbedded ? 'w-full py-16' : 'min-h-screen w-full'} flex items-center justify-center p-4`}>
        {!isEmbedded && (
          <div
            className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: `url('/background.jpg')` }}
          >
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" />
          </div>
        )}
        <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center gap-3 shadow-xl border border-slate-200/80">
          <Loader size="lg" text="Loading your PathPilot profile..." />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${isEmbedded ? 'w-full py-2' : 'min-h-screen w-full'} flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 overflow-x-hidden font-sans select-none`}>
      {/* Background Wallpaper - Only in standalone onboarding mode */}
      {!isEmbedded && (
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url('/background.jpg')` }}
        >
          <div className="absolute inset-0 bg-slate-900/25 backdrop-blur-[3px]" />
        </div>
      )}

      {/* Back to Home CTA - Only in standalone onboarding mode */}
      {!isEmbedded && (
        <button
          type="button"
          onClick={() => navigate('/')}
          className="fixed top-6 left-6 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-white/60 shadow-lg text-xs sm:text-sm font-bold text-slate-800 hover:text-indigo-600 hover:bg-white hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      )}

      {/* Main Glass Form Container */}
      <div className={`relative z-10 w-full ${isEmbedded ? 'max-w-5xl theme-surface border shadow-sm' : 'max-w-3xl bg-white/85 backdrop-blur-2xl border border-white/80 shadow-[0_25px_70px_rgba(0,0,0,0.18)]'} rounded-3xl p-5 sm:p-8 lg:p-10 my-4 sm:my-8`}>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm mb-3">
            <Compass className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {isEmbedded ? 'Your Profile' : 'Set Up Your PathPilot'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 max-w-lg mx-auto">
            {isEmbedded
              ? 'Manage your personal details, appearance, assessment progress and learning preferences.'
              : 'Tell us a little about yourself so we can personalize your learning journey.'}
          </p>
        </div>

        {/* Profile navigation inside the existing Profile page */}
        {isEmbedded ? (
          <nav aria-label="Profile sections" className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 sticky top-4 z-20 shadow-sm">
            {[
              { id: 1, target: 'profile-section-1', label: 'Personal Information', compact: 'Personal', icon: UserCheck },
              { id: 2, target: 'profile-appearance', label: 'Appearance', compact: 'Appearance', icon: Sun },
              { id: 3, target: 'profile-assessment', label: 'Assessment & Progress', compact: 'Progress', icon: TrendingUp },
              { id: 4, target: 'profile-learning-preferences', label: 'Learning Preferences', compact: 'Learning', icon: Layers }
            ].map((item) => {
              const Icon = item.icon;
              const selected = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={selected ? 'location' : undefined}
                  onClick={() => handleSectionClick(item.id, item.target)}
                  className={`flex items-center justify-center gap-1.5 min-w-0 py-2.5 px-2 rounded-xl font-bold text-xs transition-all duration-200 cursor-pointer ${selected ? 'bg-white text-indigo-600 shadow-md border border-indigo-100' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${selected ? 'text-indigo-600' : 'text-slate-500'}`} />
                  <span className="hidden sm:inline truncate">{item.label}</span>
                  <span className="sm:hidden truncate">{item.compact}</span>
                </button>
              );
            })}
          </nav>
        ) : (
          <div className="grid grid-cols-3 gap-2 mb-8 bg-slate-100/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/80 sticky top-4 z-20 shadow-sm">
            <button type="button" id="nav-section-1" onClick={() => handleSectionClick(1)} className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold text-xs transition-all duration-200 cursor-pointer ${activeSection === 1 ? 'bg-white text-indigo-600 shadow-md scale-[1.02] border border-indigo-100' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}>
              <UserCheck className={`w-3.5 h-3.5 shrink-0 ${activeSection === 1 ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">1. Personal & Academic</span><span className="sm:hidden">1. Info</span>
            </button>
            <button type="button" id="nav-section-2" onClick={() => handleSectionClick(2)} className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold text-xs transition-all duration-200 cursor-pointer ${activeSection === 2 ? 'bg-white text-indigo-600 shadow-md scale-[1.02] border border-indigo-100' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}>
              <Target className={`w-3.5 h-3.5 shrink-0 ${activeSection === 2 ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">2. Preparation Goal</span><span className="sm:hidden">2. Goal</span>
            </button>
            <button type="button" id="nav-section-3" onClick={() => handleSectionClick(3)} className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold text-xs transition-all duration-200 cursor-pointer ${activeSection === 3 ? 'bg-white text-indigo-600 shadow-md scale-[1.02] border border-indigo-100' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}>
              <Layers className={`w-3.5 h-3.5 shrink-0 ${activeSection === 3 ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">3. Subject Levels</span><span className="sm:hidden">3. Subjects</span>
            </button>
          </div>
        )}

        {/* Global Feedback Banners */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-8">
          
          {/* SECTION 1 — PERSONAL & ACADEMIC INFORMATION */}
          <div
            id="profile-section-1"
            className={`border rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 transition-all duration-300 scroll-mt-24 ${
              isFormSectionActive(1)
                ? 'bg-white/80 border-indigo-300 ring-2 ring-indigo-500/10'
                : 'bg-white/60 border-white/90'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shadow-sm ${
                  isFormSectionActive(1) ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  1
                </span>
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                  {isEmbedded ? 'Personal Information' : 'Personal & Academic Information'}
                </h2>
              </div>
            </div>

            <PersonalDetailsForm data={formData} onChange={handleFieldChange} errors={errors} />
            {isEmbedded && (
              <div>
                <label htmlFor="profile_email" className="block text-xs font-bold text-slate-700 mb-1.5">Email</label>
                <input
                  id="profile_email"
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  aria-describedby="profile-email-help"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-slate-100/70 text-sm font-medium text-slate-600"
                />
                <p id="profile-email-help" className="mt-1.5 text-xs text-slate-500">Email is managed by your sign-in account.</p>
              </div>
            )}
            <AcademicDetailsForm data={formData} onChange={handleFieldChange} errors={errors} />

            {!isEmbedded && <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleSectionClick(2)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all cursor-pointer"
              >
                <span>Next: Preparation Goal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>}
          </div>

          {isEmbedded && (
            <>
              <section id="profile-appearance" aria-labelledby="profile-appearance-heading" className="theme-surface border rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 scroll-mt-24">
                <div>
                  <h2 id="profile-appearance-heading" className="text-base font-extrabold">Appearance</h2>
                  <p className="theme-copy mt-1 text-sm">Choose a comfortable look for PathPilot. Your choice applies throughout the app and is saved on this device.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="group" aria-label="Appearance mode">
                  {APPEARANCE_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const selected = theme === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setTheme(option.id)}
                        className={`appearance-option text-left ${selected ? 'is-selected' : ''}`}
                      >
                        <ThemePreview mode={option.id} />
                        <span className="mt-3 flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2 font-bold"><Icon size={17} aria-hidden="true" />{option.label}</span>
                          {selected && <Check size={18} aria-label="Selected" className="appearance-selected-check" />}
                        </span>
                        <span className="theme-copy mt-1 block text-sm">{option.description}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="theme-copy text-xs" role="status" aria-live="polite">
                  Current appearance: <span className="font-bold capitalize">{theme}</span>
                </p>
              </section>

              <section id="profile-assessment" aria-labelledby="profile-assessment-heading" className="theme-surface border rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 scroll-mt-24">
                <div>
                  <h2 id="profile-assessment-heading" className="text-base font-extrabold">Assessment &amp; Progress</h2>
                  <p className="theme-copy mt-1 text-sm">Your persisted Initial Assessment baseline and available progress summary.</p>
                </div>
                {assessmentSnapshot.status === 'loading' && (
                  <div className="theme-surface-secondary rounded-xl border p-4 text-sm theme-copy" role="status">Loading your assessment summary…</div>
                )}
                {assessmentSnapshot.status === 'signed-out' && (
                  <div className="theme-surface-secondary rounded-xl border p-4 text-sm theme-copy">Sign in to view your assessment progress.</div>
                )}
                {assessmentSnapshot.status === 'error' && (
                  <div className="theme-surface-secondary rounded-xl border p-4 text-sm theme-copy" role="status">Your assessment summary is temporarily unavailable.</div>
                )}
                {assessmentSnapshot.status === 'loaded' && assessmentSnapshot.completed && assessmentSnapshot.result && (
                  <>
                    <div className="theme-surface-secondary rounded-xl border px-4 py-3 text-sm theme-copy flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold">Latest persisted Initial Assessment</span>
                      {Number.isInteger(assessmentSnapshot.result.attemptNumber) && (
                        <span className="text-xs">Attempt {assessmentSnapshot.result.attemptNumber}</span>
                      )}
                    </div>
                    <InitialAssessmentSummaryCard
                      assessmentResult={assessmentSnapshot.result}
                      showUnassessedSubjects={false}
                    />
                  </>
                )}
                {assessmentSnapshot.status === 'loaded' && !assessmentSnapshot.completed && (
                  <InitialAssessmentSummaryCard assessmentResult={null} />
                )}
                {assessmentSnapshot.status === 'loaded' && assessmentSnapshot.completed && !assessmentSnapshot.result && (
                  <div className="theme-surface-secondary rounded-xl border p-4 text-sm theme-copy">Your assessment is marked complete, but its result details are not available right now.</div>
                )}
                <AssessmentHistoryCard />
              </section>

            </>
          )}

          <LearningPreferencesWrapper {...learningPreferencesWrapperProps}>
          {isEmbedded && (
            <div className="px-1">
              <h2 id="profile-learning-preferences-heading" className="text-xl font-extrabold text-slate-900">Learning Preferences</h2>
              <p className="text-sm text-slate-500 mt-1">Manage the goals and starting subject levels already saved to your profile.</p>
            </div>
          )}

          {/* SECTION 2 — PREPARATION GOAL */}
          <div
            id="profile-section-2"
            className={`border rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 transition-all duration-300 scroll-mt-24 ${
              isFormSectionActive(2)
                ? 'bg-white/80 border-indigo-300 ring-2 ring-indigo-500/10'
                : 'bg-white/60 border-white/90'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shadow-sm ${
                  isFormSectionActive(2) ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {isEmbedded ? <Target className="w-3.5 h-3.5" /> : '2'}
                </span>
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Preparation Goal &amp; Career Targets
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              <PreparationTimeForm data={formData} onChange={handleFieldChange} errors={errors} />
              
              <TargetDateField
                value={formData.target_date}
                onChange={(val) => handleFieldChange('target_date', val)}
                error={errors.target_date}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <CompanyField value={formData.target_company} onChange={(val) => handleFieldChange('target_company', val)} />
                <LanguageSelector value={formData.preferred_language} onChange={(val) => handleFieldChange('preferred_language', val)} />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleSectionClick(1)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Section</span>
              </button>
              <button
                type="button"
                onClick={() => handleSectionClick(3)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all cursor-pointer"
              >
                <span>Next: Subject Levels</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SECTION 3 — SUBJECT LEVELS */}
          <div
            id="profile-section-3"
            className={`border rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 transition-all duration-300 scroll-mt-24 ${
              isFormSectionActive(3)
                ? 'bg-white/80 border-indigo-300 ring-2 ring-indigo-500/10'
                : 'bg-white/60 border-white/90'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shadow-sm ${
                  isFormSectionActive(3) ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {isEmbedded ? <Layers className="w-3.5 h-3.5" /> : '3'}
                </span>
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                  {isEmbedded ? 'Starting Subject Levels' : 'Subject Baseline Self-Assessment'}
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Select your current baseline proficiency level for each core PathPilot placement subject.
            </p>

            <SubjectLevelSelector
              levels={formData.subjectLevels}
              onChange={handleSubjectLevelChange}
            />

            <div className="pt-2 flex justify-start">
              <button
                type="button"
                onClick={() => handleSectionClick(2)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Section</span>
              </button>
            </div>
          </div>

          </LearningPreferencesWrapper>

          {/* Submit Action CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm sm:text-base shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-[1.01] active:scale-95 transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving Profile Setup...</span>
                </span>
              ) : (
                <>
                  <span>{isEmbedded ? 'Save Profile Changes' : 'Continue to PathPilot'}</span>
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
