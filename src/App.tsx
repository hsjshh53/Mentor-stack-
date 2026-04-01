import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { LessonPage } from './pages/LessonPage';
import { ProfilePage } from './pages/ProfilePage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { AITutorPage } from './pages/AITutorPage';
import { TestPage } from './pages/TestPage';
import { ExamPage } from './pages/ExamPage';
import { VerificationPage } from './pages/VerificationPage';
import { CertificatePage } from './pages/CertificatePage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminCurriculum } from './pages/admin/AdminCurriculum';
import { AdminLessonGenerator } from './pages/admin/AdminLessonGenerator';
import { AdminSkillsTools } from './pages/admin/AdminSkillsTools';
import { AdminSettings } from './pages/admin/AdminSettings';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const ADMIN_EMAIL = 'olynqsociallimited@gmail.com';

  if (loading) return null;
  
  const isAdmin = user && user.email === ADMIN_EMAIL;
  
  return isAdmin ? <>{children}</> : <Navigate to="/dashboard" />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
          <Route path="/verify/:certificateId" element={<VerificationPage />} />
          
          <Route path="/onboarding" element={
            <PrivateRoute>
              <OnboardingPage />
            </PrivateRoute>
          } />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
          
          <Route path="/lesson/:topic" element={
            <PrivateRoute>
              <LessonPage />
            </PrivateRoute>
          } />

          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />

          <Route path="/playground" element={
            <PrivateRoute>
              <PlaygroundPage />
            </PrivateRoute>
          } />

          <Route path="/playground/:projectId" element={
            <PrivateRoute>
              <PlaygroundPage />
            </PrivateRoute>
          } />

          <Route path="/projects" element={
            <PrivateRoute>
              <ProjectsPage />
            </PrivateRoute>
          } />

          <Route path="/project/:projectId" element={
            <PrivateRoute>
              <ProjectDetailsPage />
            </PrivateRoute>
          } />

          <Route path="/ai-tutor" element={
            <PrivateRoute>
              <AITutorPage />
            </PrivateRoute>
          } />

          <Route path="/test/:testId" element={
            <PrivateRoute>
              <TestPage />
            </PrivateRoute>
          } />

          <Route path="/exam/:examId" element={
            <PrivateRoute>
              <ExamPage />
            </PrivateRoute>
          } />

          <Route path="/certificate/:certificateId" element={
            <PrivateRoute>
              <CertificatePage />
            </PrivateRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<AdminOverview />} />
            <Route path="curriculum" element={<AdminCurriculum />} />
            <Route path="generator" element={<AdminLessonGenerator />} />
            <Route path="skills" element={<AdminSkillsTools />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
