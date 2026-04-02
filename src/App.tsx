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
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminCurriculum } from './pages/admin/AdminCurriculum';
import { AdminCurriculumEditor } from './pages/admin/AdminCurriculumEditor';
import { AdminGenerator } from './pages/admin/AdminGenerator';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/dashboard" />;
  return <>{children}</>;
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
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="curriculum" element={<AdminCurriculum />} />
            <Route path="curriculum/:skillId" element={<AdminCurriculumEditor />} />
            <Route path="generator" element={<AdminGenerator />} />
            <Route path="skills" element={<AdminCurriculum />} /> {/* Reusing for now */}
            <Route path="certificates" element={<AdminDashboard />} /> {/* Reusing for now */}
            <Route path="moderation" element={<AdminDashboard />} /> {/* Reusing for now */}
            <Route path="announcements" element={<AdminDashboard />} /> {/* Reusing for now */}
            <Route path="settings" element={<AdminDashboard />} /> {/* Reusing for now */}
          </Route>
          
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

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
