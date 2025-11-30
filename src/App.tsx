// ============================================
// Main App Component with Router Configuration
// ============================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from '@/components/common';
import { MainLayout, ProtectedRoute } from '@/components/layout';
import { Login } from '@/pages/Login';
import { Home } from '@/pages/Home';

// Lazy load pages por rol para code splitting
import { lazy, Suspense } from 'react';
import { Spinner } from '@/components/common';

const CajeroDashboard = lazy(() => 
  import('@/pages/cajero/Dashboard').then(m => ({ default: m.CajeroDashboard }))
);

const AdminDashboard = lazy(() => 
  import('@/pages/admin/Dashboard').then(m => ({ default: m.AdminDashboard }))
);

const MarketingDashboard = lazy(() => 
  import('@/pages/marketing/Dashboard').then(m => ({ default: m.MarketingDashboard }))
);

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            
            {/* Protected Routes */}
            <Route element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="/cajero" element={
                <ProtectedRoute allowedRoles={['cajero']}>
                  <CajeroDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/marketing" element={
                <ProtectedRoute allowedRoles={['marketing']}>
                  <MarketingDashboard />
                </ProtectedRoute>
              } />
            </Route>

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

