
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import AdminRoute from '@/components/AdminRoute.jsx';
import HomePage from '@/pages/HomePage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import SignupPage from '@/pages/SignupPage.jsx';
import OTPVerificationPage from '@/pages/OTPVerificationPage.jsx';
import DashboardPage from '@/pages/DashboardPage.jsx';
import ProfilePage from '@/pages/ProfilePage.jsx';
import SettingsPage from '@/pages/SettingsPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import TradingBenefitsPage from '@/pages/TradingBenefitsPage.jsx';
import ProductsPage from '@/pages/ProductsPage.jsx';
import NewsPage from '@/pages/NewsPage.jsx';
import NewsDetailPage from '@/pages/NewsDetailPage.jsx';
import BlogPage from '@/pages/BlogPage.jsx';
import BlogDetailPage from '@/pages/BlogDetailPage.jsx';
import RecruitmentPage from '@/pages/RecruitmentPage.jsx';
import InvestmentKnowledgePage from '@/pages/InvestmentKnowledgePage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import MarketCalendarPage from '@/pages/MarketCalendarPage.jsx';
import PeriodicReportPage from '@/pages/PeriodicReportPage.jsx';
import CommodityDerivativesPage from '@/pages/CommodityDerivativesPage.jsx';
import BasicAnalysisPage from '@/pages/BasicAnalysisPage.jsx';
import KnowledgePlatformPage from '@/pages/KnowledgePlatformPage.jsx';
import MarketAnalysisPage from '@/pages/MarketAnalysisPage.jsx';
import MarketAnalysisDetailPage from '@/pages/MarketAnalysisDetailPage.jsx';
import CoursesPage from '@/pages/CoursesPage.jsx';
import MyCoursesPage from '@/pages/MyCoursesPage.jsx';
import CourseDetailPage from '@/pages/CourseDetailPage.jsx';
import PaymentPage from '@/pages/PaymentPage.jsx';
import EbookPage from '@/pages/EbookPage.jsx';
import AdminDataPage from '@/pages/AdminDataPage.jsx';
import AdminPanel from '@/pages/AdminPanel.jsx';
import CustomerSupportChat from '@/components/CustomerSupportChat.jsx';
import { Toaster } from '@/components/ui/toaster.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/trading-benefits" element={<TradingBenefitsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/recruitment" element={<RecruitmentPage />} />
          <Route path="/investment-knowledge" element={<InvestmentKnowledgePage />} />
          <Route path="/market-calendar" element={<MarketCalendarPage />} />
          <Route path="/periodic-report" element={<PeriodicReportPage />} />
          <Route path="/commodity-derivatives" element={<CommodityDerivativesPage />} />
          <Route path="/basic-analysis" element={<BasicAnalysisPage />} />
          <Route path="/knowledge-platform" element={<KnowledgePlatformPage />} />
          <Route path="/knowledge-platform/:id" element={<NewsDetailPage />} />
          <Route path="/market-analysis" element={<MarketAnalysisPage />} />
          <Route path="/market-analysis/:id" element={<MarketAnalysisDetailPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/ebook" element={<EbookPage />} />
          
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
          
          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:courseId"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/data"
            element={
              <ProtectedRoute>
                <AdminDataPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <CustomerSupportChat />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
