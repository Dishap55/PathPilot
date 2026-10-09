import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { LoadingProvider } from './context/LoadingContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import Loader from './components/common/Loader.jsx';

// Route-level code-splitting: Pages load dynamically on-demand
const Landing = lazy(() => import('./pages/public/Landing.jsx'));
const Signup = lazy(() => import('./pages/auth/Signup.jsx'));
const Login = lazy(() => import('./pages/auth/Login.jsx'));
const AuthCallback = lazy(() => import('./pages/auth/AuthCallback.jsx'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword.jsx'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword.jsx'));
const ProfileSetup = lazy(() => import('./pages/student/ProfileSetup.jsx'));
const InitialAssessment = lazy(() => import('./pages/student/InitialAssessment.jsx'));
const Roadmap = lazy(() => import('./pages/student/Roadmap.jsx'));
const MilestoneDetail = lazy(() => import('./pages/student/MilestoneDetail.jsx'));
const Reassessment = lazy(() => import('./pages/student/Reassessment.jsx'));
const Dashboard = lazy(() => import('./pages/student/Dashboard.jsx'));
const LearningGardenOnboardingPage = lazy(() => import('./pages/student/LearningGardenOnboardingPage.jsx'));
const Practice = lazy(() => import('./pages/student/Practice.jsx'));
const Progress = lazy(() => import('./pages/student/Progress.jsx'));
const DSALearningPage = lazy(() => import('./pages/student/DSALearningPage.jsx'));
const AptitudeLearningPage = lazy(() => import('./pages/student/AptitudeLearningPage.jsx'));
const OOPSLearningPage = lazy(() => import('./pages/student/OOPSLearningPage.jsx'));
const DBMSLearningPage = lazy(() => import('./pages/student/DBMSLearningPage.jsx'));
const CNLearningPage = lazy(() => import('./pages/student/CNLearningPage.jsx'));
const SubjectLearningPage = lazy(() => import('./pages/student/SubjectLearningPage.jsx'));
const LoaderPreview = lazy(() => import('./pages/dev/LoaderPreview.jsx'));

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <LoadingProvider>
          <BrowserRouter>
            <Suspense
              fallback={
                <div className="min-h-screen w-full flex items-center justify-center bg-[#FAFBFD] p-6 font-sans select-none">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Loader size="lg" />
                    <p className="text-xs font-semibold text-slate-500 tracking-wide mt-2">Loading PathPilot...</p>
                  </div>
                </div>
              }
            >
              <Routes>
                {/* Public & Authentication Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Development / Inspection Routes */}
                <Route path="/loader-preview" element={<LoaderPreview />} />

                {/* Student Profile Setup (Standalone Initial Onboarding Wizard) */}
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/setup" element={<ProfileSetup />} />

                {/* Diagnostic Assessment Routes */}
                <Route path="/assessment" element={<InitialAssessment />} />
                <Route path="/assessment/initial" element={<InitialAssessment />} />
                <Route path="/assessment/:id" element={<InitialAssessment />} />

                {/* First-Time Learning Garden Onboarding */}
                <Route path="/onboarding/garden" element={<LearningGardenOnboardingPage />} />
                <Route path="/onboarding" element={<LearningGardenOnboardingPage />} />

                {/* Student Shared Authenticated Layout Routes */}
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  <Route path="/roadmap/milestone/:id" element={<MilestoneDetail />} />
                  <Route path="/subjects" element={<Practice />} />
                  <Route path="/subjects/dsa" element={<DSALearningPage />} />
                  <Route path="/aptitude" element={<AptitudeLearningPage />} />
                  <Route path="/subjects/aptitude" element={<AptitudeLearningPage />} />
                  <Route path="/oops" element={<OOPSLearningPage />} />
                  <Route path="/subjects/oops" element={<OOPSLearningPage />} />
                  <Route path="/dbms" element={<DBMSLearningPage />} />
                  <Route path="/subjects/dbms" element={<DBMSLearningPage />} />
                  <Route path="/os" element={<SubjectLearningPage />} />
                  <Route path="/subjects/os" element={<SubjectLearningPage />} />
                  <Route path="/cn" element={<CNLearningPage />} />
                  <Route path="/subjects/cn" element={<CNLearningPage />} />
                  <Route path="/subjects/:subjectCode" element={<SubjectLearningPage />} />
                  <Route path="/practice" element={<Navigate to="/subjects" replace />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/profile" element={<ProfileSetup isEmbedded={true} />} />
                  <Route path="/reassessment" element={<Reassessment />} />
                  <Route path="/reassessment/:id" element={<Reassessment />} />
                </Route>

                {/* Catch-all redirect to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </LoadingProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
