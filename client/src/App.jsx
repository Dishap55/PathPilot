import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { LoadingProvider } from './context/LoadingContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import AppLayout, { AuthenticatedLayout } from './components/layout/AppLayout.jsx';
import Landing from './pages/public/Landing.jsx';
import Signup from './pages/auth/Signup.jsx';
import Login from './pages/auth/Login.jsx';
import AuthCallback from './pages/auth/AuthCallback.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import ProfileSetup from './pages/student/ProfileSetup.jsx';
import InitialAssessment from './pages/student/InitialAssessment.jsx';
import Roadmap from './pages/student/Roadmap.jsx';
import MilestoneDetail from './pages/student/MilestoneDetail.jsx';
import Reassessment from './pages/student/Reassessment.jsx';
import Dashboard from './pages/student/Dashboard.jsx';
import LearningGardenOnboardingPage from './pages/student/LearningGardenOnboardingPage.jsx';
import Practice from './pages/student/Practice.jsx';
import Progress from './pages/student/Progress.jsx';
import DSALearningPage from './pages/student/DSALearningPage.jsx';
import AptitudeLearningPage from './pages/student/AptitudeLearningPage.jsx';
import OOPSLearningPage from './pages/student/OOPSLearningPage.jsx';
import DBMSLearningPage from './pages/student/DBMSLearningPage.jsx';
import CNLearningPage from './pages/student/CNLearningPage.jsx';
import SubjectLearningPage from './pages/student/SubjectLearningPage.jsx';
import LoaderPreview from './pages/dev/LoaderPreview.jsx';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <LoadingProvider>
          <BrowserRouter>
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
          </BrowserRouter>
        </LoadingProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
