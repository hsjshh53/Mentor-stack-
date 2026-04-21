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
import { AcademyPathPage } from './pages/AcademyPathPage';
import { CodingLanguagesPage } from './pages/CodingLanguagesPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { SupportPage } from './pages/SupportPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AIGenerator } from './pages/admin/AIGenerator';
import { ManageLessons } from './pages/admin/ManageLessons';
import { ManageSkills } from './pages/admin/ManageSkills';
import { ManageUsers } from './pages/admin/ManageUsers';
import { ManageCurriculum } from './pages/admin/ManageCurriculum';
import { ManagePayments } from './pages/admin/ManagePayments';
import { ManageReceipts } from './pages/admin/ManageReceipts';
import { ManageTickets } from './pages/admin/ManageTickets';
import { ReviewLessonsPage } from './pages/admin/ReviewLessonsPage';
import { useAdmin } from './hooks/useAdmin';
import { SubscriptionGuard } from './components/SubscriptionGuard';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const SubscribedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SubscriptionGuard>
      {children}
    </SubscriptionGuard>
  );
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  
  if (authLoading || adminLoading) return null;
  return user && isAdmin ? <>{children}</> : <Navigate to="/dashboard" />;
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
          <Route path="/subscription" element={
            <PrivateRoute>
              <SubscriptionPage />
            </PrivateRoute>
          } />
          <Route path="/support" element={
            <PrivateRoute>
              <SupportPage />
            </PrivateRoute>
          } />
          
          <Route path="/onboarding" element={
            <PrivateRoute>
              <OnboardingPage />
            </PrivateRoute>
          } />
          
          <Route path="/dashboard" element={
            <SubscribedRoute>
              <DashboardPage />
            </SubscribedRoute>
          } />
          
          <Route path="/lesson/:topic" element={
            <SubscribedRoute>
              <LessonPage />
            </SubscribedRoute>
          } />

          <Route path="/profile" element={
            <SubscribedRoute>
              <ProfilePage />
            </SubscribedRoute>
          } />

          <Route path="/playground" element={
            <SubscribedRoute>
              <PlaygroundPage />
            </SubscribedRoute>
          } />

          <Route path="/playground/:projectId" element={
            <SubscribedRoute>
              <PlaygroundPage />
            </SubscribedRoute>
          } />

          <Route path="/projects" element={
            <SubscribedRoute>
              <ProjectsPage />
            </SubscribedRoute>
          } />

          <Route path="/project/:projectId" element={
            <SubscribedRoute>
              <ProjectDetailsPage />
            </SubscribedRoute>
          } />

          <Route path="/tutor" element={
            <SubscribedRoute>
              <AITutorPage />
            </SubscribedRoute>
          } />

          <Route path="/test/:testId" element={
            <SubscribedRoute>
              <TestPage />
            </SubscribedRoute>
          } />

          <Route path="/exam/:examId" element={
            <SubscribedRoute>
              <ExamPage />
            </SubscribedRoute>
          } />

          <Route path="/certificate/:certificateId" element={
            <SubscribedRoute>
              <CertificatePage />
            </SubscribedRoute>
          } />

          <Route path="/academy/:pathName" element={
            <SubscribedRoute>
              <AcademyPathPage />
            </SubscribedRoute>
          } />

          <Route path="/coding-languages" element={
            <SubscribedRoute>
              <CodingLanguagesPage />
            </SubscribedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/generator" element={
            <AdminRoute>
              <AIGenerator />
            </AdminRoute>
          } />
          <Route path="/admin/lessons" element={
            <AdminRoute>
              <ManageLessons />
            </AdminRoute>
          } />
          <Route path="/admin/skills" element={
            <AdminRoute>
              <ManageSkills />
            </AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          } />
          <Route path="/admin/curriculum" element={
            <AdminRoute>
              <ManageCurriculum />
            </AdminRoute>
          } />
          <Route path="/admin/payments" element={
            <AdminRoute>
              <ManagePayments />
            </AdminRoute>
          } />
          <Route path="/admin/receipts" element={
            <AdminRoute>
              <ManageReceipts />
            </AdminRoute>
          } />
          <Route path="/admin/support" element={
            <AdminRoute>
              <ManageTickets />
            </AdminRoute>
          } />
          <Route path="/admin/review-lessons/:skillId/:moduleId" element={
            <AdminRoute>
              <ReviewLessonsPage />
            </AdminRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
